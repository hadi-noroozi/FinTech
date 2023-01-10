import { Component, OnInit, enableProdMode } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
// import { of } from 'rxjs';
// import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from "xlsx";

import { AddtransactionService, FormList, Longtab, Record } from './addtransaction.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-addtransaction',
  templateUrl: './addtransaction.component.html',
  styleUrls: ['./addtransaction.component.scss']
})
export class AddtransactionComponent implements OnInit {

  dataSource: FormList[];

  popupVisible = false;

  longtabs: Longtab[];
  selectedIndex: number = 0;
  proccesseddata: any[];
  selectItem: boolean = false;

  public records: any[] = [];
  public headRecords: any[] = [];

  btnOne: boolean = true;
  btnTwo: boolean = false;
  btnThree: boolean = false;
  btnFour: boolean = false;
  btnFive: boolean = false;

  constructor(
    addTransactionService: AddtransactionService,
    private router: Router
  ) {
    this.dataSource = addTransactionService.getFormListData();
    this.longtabs = addTransactionService.getLongtabs();
  }

  ngOnInit() {
  }

  buttonsValidatior(rowData) {
    const result = rowData.status ? rowData.id : 0;
    return result;
  }

  showInfo() {
    this.popupVisible = true;
  }

  uploadListener(event) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      const proccesseddata = data;
      proccesseddata.map(x => {
        x['PERSON_ID'] = 
          (x['PERSON_ID'].length == 8) ? '00' + x['PERSON_ID'] :
          (x['PERSON_ID'].length == 9) ? "0" + x['PERSON_ID'] : 
          x['PERSON_ID'];
      })
      this.records = proccesseddata;
      this.headRecords = this.records.slice(0,5);
      console.log(data)
      //console.log(data); // Data will be logged in array format containing objects
    };
  }

  fileReset() {
    // this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  submitOne() {
    this.btnOne = false;
    this.btnTwo = true;
    this.longtabs[1].disabled = false;
    this.selectedIndex = 1;
  }

  submitTwo() {
    this.btnTwo = false;
    this.btnThree = true;
    this.longtabs[2].disabled = false;
    this.selectedIndex = 2;
  }

  submitThree() {
    this.btnThree = false;
    this.btnFour = true;
    this.longtabs[3].disabled = false;
    this.selectedIndex = 3;
  }

  returnOne() {
    this.btnOne = true;
    this.btnTwo = false;
    this.longtabs[1].disabled = true;
    this.selectedIndex = 0;
  }

  returnTwo() {
    this.btnTwo = true;
    this.btnThree = false;
    this.longtabs[2].disabled = true;
    this.selectedIndex = 1;
  }

  returnThree() {
    this.btnThree = true;
    this.btnFour = false;
    this.longtabs[3].disabled = true;
    this.selectedIndex = 2;
  }  
}

