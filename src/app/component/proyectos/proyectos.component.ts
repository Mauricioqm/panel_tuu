import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.sass']
})
export class ProyectosComponent implements OnInit {

    /*name of the excel-file which will be downloaded. */
    fileName = 'Proyectos.xlsx';

  proyectos: any;

  constructor
  (
    private angularFiredatabase: AngularFireDatabase,
  )
  {
    this.angularFiredatabase.list('proyectos').valueChanges().subscribe(data => {
      this.proyectos = data;
    });
  }

  ngOnInit() {}

  exportexcel(): void {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
