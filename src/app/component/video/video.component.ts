import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.sass']
})
export class VideoComponent implements OnInit {

  ubicacion: any;
    // Upload Task
    task: AngularFireUploadTask;

    // Progress in percentage
    percentage: Observable<number>;

    // Snapshot of uploading file
    snapshot: Observable<any>;

    // Uploaded File URL
    UploadedFileURL: Observable<string>;

    // Uploaded Image List
    images: Observable<MyData[]>;

    // File details
    fileName: string;
    fileSize: number;

    // Status check
    isUploading: boolean;
    isUploaded: boolean;
    videos: any;
    data: any;

    private imageCollection: AngularFirestoreCollection<MyData>;



  constructor
  (
    private storage: AngularFireStorage,
    private database: AngularFirestore,
    private angularFireDatabase: AngularFireDatabase,
  )
  {
    this.isUploading = false;
    this.isUploaded = false;
    // Set collection where our documents/ images info will save
    this.imageCollection = database.collection<MyData>('video');
    this.images = this.imageCollection.valueChanges();
  }

  ngOnInit() {
    this.obtenerVideo().subscribe(data => {
      this.videos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          filepath: e.payload.doc.data()['filepath'],
          name: e.payload.doc.data()['name'],
        };
      });
      console.log(this.videos);
    });
  }

  obtenerVideo() {
    return this.database.collection('video').snapshotChanges();
  }


  uploadFile(event: FileList) {
    // The File object
    const file = event.item(0);

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;

    // The storage path
    const path = `pictures/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'magenes Tuu' };

    // File reference
    const fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();

        this.UploadedFileURL.subscribe(resp => {
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize,
          });
          this.ubicacion = resp;
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        });
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    );
  }

  addImagetoDB(image: MyData) {
    // Create an ID for document
    const id = this.database.createId();

    // Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log('error ' + error);
    });
    // this.angularFireDatabase.list('/videos/').push(this.ubicacion);
  }

  eliminar(i) {
    this.database.doc('video/' + i).delete();
    // console.log(i);
  }

}
