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
  selectItem: boolean = false;

  public records: any[] = [];
  public headRecords: any[] = [];
  public arrayKey: any[] = [];

  public user: String;
  public validators: any[] = ["نسترن کلاهچی" , "علیرضا عمرانی"];
  public categories: any[] = ["مالی", "ذخایر", "سود و زیان"]

  btnOne: boolean = true;
  btnTwo: boolean = false;
  btnThree: boolean = false;
  btnFour: boolean = false;
  btnFive: boolean = false;
  nextBtn: boolean = true;

  public colCountByScreen: any;
  public infoForm: any;
  public formItem: any[];

  constructor(
    addTransactionService: AddtransactionService,
    private router: Router
  ) {
    this.dataSource = addTransactionService.getFormListData();
    this.longtabs = addTransactionService.getLongtabs();
    this.user = "علیرضا عمرانی";
    this.colCountByScreen = {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3
    };
    this.formItem = [
      {
        dataField: 'id',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
        },
        label: {
          text: "کد فرم",
        }
      },
      {
        dataField: 'title',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
        },
        label: {
          text: "عنوان فرم",
        }
      },
      {
        dataField: 'category',
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: this.categories,
          placeholder:"نوع فرم را تعیین کنید",
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,catgory: data.value};
            // if(
            //   this.infoForm.validator != undefined && 
            //   this.infoForm.category != undefined
            //   ) {
            //   this.nextBtn = false;
            // } else {
            //   this.nextBtn = true;
            // }
          },
        },
        label: {
          text: "دسته بندی",
        }
      },
      {
        dataField: 'creatingDate',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
        },
        label: {
          text: "تاریخ ایجاد",
        }
      },
      {
        dataField: 'lastEditDate',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
        },
        label: {
          text: "تاریخ آخرین ویرایش",
        }
      },
      {
        dataField: 'editor',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
        },
        label: {
          text: "ویرایش کننده",
        }
      },
      {
        dataField: 'validator',
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: this.validators,
          placeholder:"کاربر ناظر را تعیین کنید",
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,validator: data.value};
            // if(
            //   this.infoForm.validator != undefined && 
            //   this.infoForm.category != undefined
            //   ) {
            //   this.nextBtn = false;
            // } else {
            //   this.nextBtn = true;
            // }
          },
        },
        label: {
          text: "ناظر",
        }
      },
    ]
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
      data.map(x => {
        x['PERSON_ID'] = 
          (x['PERSON_ID'].length == 8) ? '00' + x['PERSON_ID'] :
          (x['PERSON_ID'].length == 9) ? "0" + x['PERSON_ID'] : 
          x['PERSON_ID'];
      });

      for (const [key, value] of Object.entries(data[0])) {
        this.arrayKey.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
      }

      this.records = data;
      this.headRecords = this.records.slice(0,5);

      this.infoForm = {
        id: event.target.files[0].name.split('-')[1].split('.')[0],
        title: event.target.files[0].name.split('-')[0],
        creatingDate: new Date(Date.now()).toLocaleDateString('fa-IR'),
        lastEditDate: new Date(event.target.files[0].lastModified).toLocaleDateString('fa-IR'),
        editor: this.user,
        status: true,
      }

      //console.log(this.infoForm);
      //console.log(this.arrayKey)
      //console.log(data); // Data will be logged in array format containing objects
    };
  }

  fileReset() {

    this.infoForm = {};
    this.headRecords = [];
    this.records = [];
  }

  submitOne() {
    this.btnOne = false;
    this.btnTwo = true;
    this.longtabs[0].disabled = true;
    this.longtabs[1].disabled = false;
    this.selectedIndex = 1;
  }

  submitTwo() {
    this.btnTwo = false;
    this.btnThree = true;
    this.longtabs[1].disabled = true;
    this.longtabs[2].disabled = false;
    this.selectedIndex = 2;
  }

  submitThree() {
    this.btnThree = false;
    this.btnFour = true;
    this.longtabs[2].disabled = true;
    this.longtabs[3].disabled = false;
    this.selectedIndex = 3;
    this.dataSource.push(this.infoForm);
  }

  returnOne() {
    this.btnOne = true;
    this.btnTwo = false;
    this.longtabs[0].disabled = false;
    this.longtabs[1].disabled = true;
    this.selectedIndex = 0;
  }

  returnTwo() {
    this.btnTwo = true;
    this.btnThree = false;
    this.longtabs[1].disabled = false;
    this.longtabs[2].disabled = true;
    this.selectedIndex = 1;
  }

  returnThree() {
    this.popupVisible = false;
    this.fileReset();
    this.longtabs[0].disabled = false;
    this.longtabs[1].disabled = true;
    this.longtabs[2].disabled = true;
    this.longtabs[3].disabled = true;
  }  
}
