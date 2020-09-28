import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.sass']
})
export class AreasComponent implements OnInit {

  areas: any;
  nombreArea: string;
  nombre: string;
  id: string;

  constructor
  (
    private angularfireDatabase: AngularFireDatabase,
  )
  {
    this.angularfireDatabase.list('areas-laborales').valueChanges().subscribe(data => {
      this.areas = data;
      console.log(this.areas);
    });
   }

  ngOnInit() {
  }

  crear() {
    const areas = {
      nombre: this.nombreArea,
    };
    this.angularfireDatabase.list('areas-laborales').push(areas).then(data => {
      console.log(data.key);
      const key = data.key;
      this.angularfireDatabase.object('areas-laborales/' + data.key + '/id').set(key);
    });
    this.nombreArea = '';
    console.log(this.nombreArea);
  }

  eliminar(item) {
    this.angularfireDatabase.object('areas-laborales/' + item).remove();
    // console.log(item);
  }

  editar(item) {
    // console.log(item);
    this.id = item;
  }

  getNombre() {
    // console.log(this.nombre);
    // console.log(this.id);
    this.angularfireDatabase.object('areas-laborales/' + this.id + '/nombre').set(this.nombre);
  }

}
