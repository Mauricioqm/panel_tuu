import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from 'src/app/services/user.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.sass']
})
export class BannerComponent implements OnInit {

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

  constructor(
    private firebaseStorage: AngularFireStorage,
    private userService: UserService,
    // tslint:disable-next-line:no-shadowed-variable
    private AngularFireDatabase: AngularFireDatabase
  )
  {

    this.AngularFireDatabase.list('/banner/').snapshotChanges().subscribe((_data) => {
      console.log(_data);
      this.publicidad = _data;
    });

    this.AngularFireDatabase.list('/banner/').snapshotChanges().subscribe(actions => {
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
          // record['url'] = this.url;
          // tslint:disable-next-line:no-string-literal
          record['img'] = p;
          this.AngularFireDatabase.list('/banner/').push(record);
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
    this.AngularFireDatabase.list('/banner/').remove(i);
  }


}
