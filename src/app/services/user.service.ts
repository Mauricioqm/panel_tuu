import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor
  (
    private angularFireDatabase: AngularFireDatabase,
  ) { }

  getUsers() {
    return this.angularFireDatabase.list('/users');
  }

  obtenerEmprendedor(uid) {
    return this.angularFireDatabase.object('emprendedores/' + uid);
  }

  getUserById(uid) {
    return this.angularFireDatabase.object('/users/' + uid);
  }
  createUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  editUser(user) {
    return this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }

  createPub(publicidad, nombre) {
    return this.angularFireDatabase.object('/publicidad/' + nombre).set(publicidad);
  }
}
