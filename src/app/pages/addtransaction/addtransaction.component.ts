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
  popupVisible2 = false;
  popup2Title: String;
  popup2Content: String;

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
          stylingMode: 'filled'
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
          stylingMode: 'filled'
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
          stylingMode: 'filled',
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
          stylingMode: 'filled',
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
          stylingMode: 'filled',
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
          stylingMode: 'filled',
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
          stylingMode: 'filled',
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
      {
        dataField: 'description',
        editorType: 'dxTextArea',
        editorOptions: {
          height: 90,
          maxLength: 200,
          placeholder:"توضیحات پیوست را وارد کنید",
          stylingMode: 'filled',
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,description: data.value};
          },
        },
        label: {
          text: "توضیحات",
        }
      },      
    ]
  }

  ngOnInit() {
  }

  buttonsValidatior(rowData) {
    const result = [rowData.id,rowData.status];
    return result;
  }

  showInfo() {
    this.popupVisible = true;
  }

  uploadListener(event) {
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
      const { 
        A1, 
        A2, 
        A3,
        A22,
        A28,
        A32,
        A41,
        A43,
        A44,
        A47,
        A50,
        A57,
        A62,
        A63,
        A64,
        A65, 
        ...wd }  = ws;

      wd['!ref']="B2:E85";
      delete ws.C86;
      // delete 
      //   ws.A1,
      //   ws.A2,
      //   ws.A3,
      //   ws.A22,
      //   ws.A28,
      //   ws.A32,
      //   ws.A44,
      //   ws.A47,
      //   ws.A50,
      //   ws.A57,
      //   ws.A62,
      //   ws.A63,
      //   ws.A64,
      //   ws.A65;

      const data = XLSX.utils.sheet_to_json(wd, {blankrows: false});

      this.records = data;
      this.headRecords = this.records.slice(0,5);

      this.infoForm = {
        id: Math.floor(Math.random() * 10000000000) + 1,
        title: ws.A1.h,
        creatingDate: new Date(Date.now()).toLocaleDateString('fa-IR'),
        lastEditDate: new Date(event.target.files[0].lastModified).toLocaleDateString('fa-IR'),
        editor: this.user,
        status: 'در انتظار تایید',
        comment: null
      }

      // this.infoForm = {
      //   id: event.target.files[0].name.split('-')[1].split('.')[0],
      //   title: event.target.files[0].name.split('-')[0],
      //   creatingDate: new Date(Date.now()).toLocaleDateString('fa-IR'),
      //   lastEditDate: new Date(event.target.files[0].lastModified).toLocaleDateString('fa-IR'),
      //   editor: this.user,
      //   status: 'در انتظار تایید',
      //   comment: null
      // }

      console.log(ws);
    }

    /* wire up file reader */
    // const target: DataTransfer = <DataTransfer>(event.target);
    
    // if (target.files.length !== 1) {
    //   throw new Error('Cannot use multiple files');
    // }
    // const reader: FileReader = new FileReader();
    // reader.readAsBinaryString(target.files[0]);
    // reader.onload = (e: any) => {
    //   /* create workbook */
    //   const binarystr: string = e.target.result;
    //   const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

    //   /* selected the first sheet */
    //   const wsname: string = wb.SheetNames[0];
    //   const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    //   /* save data */
    //   const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
    //   data.map(x => {
    //     x['PERSON_ID'] = 
    //       (x['PERSON_ID'].length == 8) ? '00' + x['PERSON_ID'] :
    //       (x['PERSON_ID'].length == 9) ? "0" + x['PERSON_ID'] : 
    //       x['PERSON_ID'];
    //   });

    //   for (const [key, value] of Object.entries(data[0])) {
    //     this.arrayKey.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
    //   }

    //   this.records = data;
    //   this.headRecords = this.records.slice(0,5);

    //   this.infoForm = {
    //     id: event.target.files[0].name.split('-')[1].split('.')[0],
    //     title: event.target.files[0].name.split('-')[0],
    //     creatingDate: new Date(Date.now()).toLocaleDateString('fa-IR'),
    //     lastEditDate: new Date(event.target.files[0].lastModified).toLocaleDateString('fa-IR'),
    //     editor: this.user,
    //     status: 'در انتظار تایید',
    //     comment: null
    //   }

    //   //console.log(this.infoForm);
    //   //console.log(this.arrayKey)
    //   //console.log(data); // Data will be logged in array format containing objects
    // };
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

  showDescription(id) {
    this.popup2Title = "توضیحات " + this.dataSource.filter(item => item.id == id )[0].title;
    this.popup2Content = this.dataSource.filter(item => item.id == id )[0].description;
    this.popupVisible2 = true;
  }
  showComment(id) {
    this.popup2Title = "نظر ناظر | " + this.dataSource.filter(item => item.id == id )[0].title;
    this.popup2Content = this.dataSource.filter(item => item.id == id )[0].comment;
    this.popupVisible2 = true;
  }
}

