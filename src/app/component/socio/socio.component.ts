import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styleUrls: ['./socio.component.sass']
})
export class SocioComponent implements OnInit {

    /*name of the excel-file which will be downloaded. */
    fileName = 'Socios.xlsx';

  socios: any;

  constructor
  (
    private angularFiredatabase: AngularFireDatabase,
  )
  {
    this.angularFiredatabase.list('users').valueChanges().subscribe(data => {
      console.log(data);
      this.socios = data;
    });
  }

  ngOnInit() {
  }

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
