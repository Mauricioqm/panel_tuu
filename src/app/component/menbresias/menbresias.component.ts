import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-menbresias',
  templateUrl: './menbresias.component.html',
  styleUrls: ['./menbresias.component.sass']
})
export class MenbresiasComponent implements OnInit {

  nombre: string;
  precio: number;
  descripcion: string

  planes: any;

  constructor
  (
    private AngularFireDatabase: AngularFireDatabase
  )
  {
    this.AngularFireDatabase.list('/planes/').snapshotChanges().subscribe((_data) => {
      console.log(_data);
      this.planes = _data;
    });
  }

  ngOnInit() {
  }

  agregar() {
    const record = {};
    record['nombre'] = this.nombre;
    record['precio'] = this.precio;
    record['descripcion'] = this.descripcion;
    this.AngularFireDatabase.list('planes').push(record);
  }

  eliminar(i) {
    this.AngularFireDatabase.list('/planes/').remove(i);
  }

}
