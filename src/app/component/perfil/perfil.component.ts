import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass']
})
export class PerfilComponent implements OnInit {

  usuarioUid: any;
  usuario: any;
  dataUser: any;
  licencia: any;
  contrataciones: any;
  titulo: string;
  texto: string;

  constructor
  (
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private angularfireDatabase: AngularFireDatabase,
    private angularfireAuth: AngularFireAuth,
    public router: Router,
    private http: HttpClient,
  )
  {
    this.usuarioUid = this.activatedRoute.snapshot.params['uid'];
    // console.log(this.usuarioUid);

    this.userService.obtenerEmprendedor(this.usuarioUid).valueChanges().subscribe(data =>  {
      this.usuario = data;
      this.contrataciones = this.usuario.contrataciones;
      console.log(this.contrataciones);
      this.angularfireDatabase.list('emprendedores/' + this.usuarioUid + '/contrataciones').valueChanges().subscribe(contrataciones => {
        console.log(contrataciones);
        this.contrataciones = contrataciones;
      });
    });

    this.angularfireDatabase.object('users/' + this.usuarioUid).valueChanges().subscribe(data2 => {
      console.log(data2);
      this.dataUser = data2;
    });
  }

  ngOnInit() {
  }

  enviarNotificacion() {
    let header: HttpHeaders = new HttpHeaders();
    // tslint:disable-next-line:max-line-length
    header = header.set('Authorization', 'key=AAAA4HoZqC0:APA91bHPlRg_Nc9g4aoF2znQFykLVYrxaCV41uk0iEKtKHofEb2kjMhwIGbvFmmNkltpOpPhvg7Gvcb_T_CJr6HoVdRSaPd4sdRbtyL2DrYlFSdBNObYx8KsP_MehnmsMf_uqGvaaWVU'); 
    header = header.append('Content-Type', 'application/json');
    const body = {
      to: this.dataUser.token,
      priority: 'high',
      notification: {
        title: this.titulo,
        body: this.texto,
        click_action: 'FCM_PLUGIN_ACTIVITY',
        sound: 'default',
        forceStart: '1',
      },
    };
    const URL = 'https://fcm.googleapis.com/fcm/send';
    this.http.post(URL, body, { headers: header }).subscribe(data => {
      console.log(data);
    });
  }

  membresia() {
    console.log(this.licencia);
    this.angularfireDatabase.object('users/' + this.usuarioUid + '/membresia').set(this.licencia);
    this.angularfireDatabase.object('emprendedores/' + this.usuarioUid + '/membresia').set(this.licencia);
  }

  habilitar() {
    this.angularfireDatabase.object('users/' + this.usuarioUid + '/estado').set('activo');
    this.angularfireDatabase.object('emprendedores/' + this.usuarioUid + '/estado').set('activo');
  }

  inhabilitar() {
    this.angularfireDatabase.object('users/' + this.usuarioUid + '/estado').set('inactivo');
    this.angularfireDatabase.object('emprendedores/' + this.usuarioUid + '/estado').set('inactivo');
  }

  eliminar() {
    this.angularfireAuth.signInWithEmailAndPassword(this.usuario.email, this.dataUser.password).then(function (info) {
      console.log(info);
      const user = firebase.auth().currentUser;
      user.delete();
      });
    this.angularfireDatabase.object('users/' + this.usuarioUid).remove();
    this.angularfireDatabase.object('emprendedores/' + this.usuarioUid).remove();
    this.router.navigateByUrl('/home');
  }

}
