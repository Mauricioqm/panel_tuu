import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.sass']
})
export class PublicidadComponent implements OnInit {

  nombre: string;
  url: string;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  picture: any;

  img: any;
  publicidad: any;
  pub: any;

  publicidadLista: AngularFireList<any>;

  keys: any;

  constructor
  (
    private firebaseStorage: AngularFireStorage,
    private AngularFireDatabase: AngularFireDatabase
  )
  {
    this.AngularFireDatabase.list('/publicidad/').snapshotChanges().subscribe((data) => {
      console.log(data);
      this.publicidad = data;
    });

    this.AngularFireDatabase.list('/publicidad/').snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const id = action.payload.key;
        console.log(id);
        this.keys = id;
      });
    });
  }


  Agregar() {
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
        this.picture.subscribe((p) => {
          this.img = p;
          // console.log(p);
          const record = {};
          // tslint:disable-next-line:no-string-literal
          record['nombre'] = this.nombre;
          // tslint:disable-next-line:no-string-literal
          record['url'] = this.url;
          // tslint:disable-next-line:no-string-literal
          record['img'] = p;
          this.AngularFireDatabase.list('/publicidad/').push(record);
          this.nombre = '';
          this.url = '';
        });
      }).catch((error) => {
        console.log(error);
      });

    } else {}
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
      // show cropper
  }

  cropperReady() {
      // cropper ready
  }

  loadImageFailed() {
      // show message
  }


  eliminar(i) {
    this.AngularFireDatabase.list('/publicidad/').remove(i);
  }

}
