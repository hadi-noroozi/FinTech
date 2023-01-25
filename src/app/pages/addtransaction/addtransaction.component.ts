import { Component, OnInit, enableProdMode } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
// import { of } from 'rxjs';
// import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from "xlsx";


import { AddtransactionService, FormList, Longtab } from './addtransaction.service';
import { AuthService } from 'src/app/shared/services';

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

  correctiveId: String;

  longtabs: Longtab[];
  selectedIndex: number = 0;
  selectItem: boolean = false;

  public records: any[] = [];
  public headRecords: any[] = [];
  public arrayKey: any[] = [];

  userInfo: any;
  public user: any;
  public validators: any[] = [
    {
      id: 1,
      name: "نسترن کلاهچی"
    },{
      id: 2,
      name: "علیرضا عمرانی"
    }
  ];
  public categories: any[] = [
    {
      id: 1,
      title: "خسارت معوقه اتکایی"
    }, {
      id: 2,
      title: "ذخیره ریاضی"
    }, {
      id: 3,
      title: "آمار کل اصلاحی"
    }
  ]

  btnOne: boolean = true;
  btnTwo: boolean = false;
  btnThree: boolean = false;
  btnFour: boolean = false;
  nextBtn: boolean = true;

  public colCountByScreen: any;
  public infoForm: any;
  public formItem: any[];

  formType: String;

  constructor(
    addTransactionService: AddtransactionService,
    authService: AuthService,
    private router: Router
  ) {
    this.userInfo = authService.getUser();
    this.user = this.userInfo.__zone_symbol__value.data;
    this.formType = (this.user.PositionId==2) ? 
      this.categories.filter(item => item.id == this.user.categoryCode)[0].title : null;
                  
    this.dataSource = addTransactionService.getFormListData();
    this.longtabs = addTransactionService.getLongtabs();
    // this.user = {
    //   id: 15200144,
    //   name: "علیرضا عمرانی",
    //   role: "ویرایشگر",
    //   categoryCode: 1,
    //   validatorId: 1
    // };
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
        colSpan: 2,
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
          displayExpr:"title",
          valueExpr:"title",
          readOnly: true,
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
          displayExpr:"name",
          valueExpr:"name",
          placeholder:"کاربر ناظر را تعیین کنید",
          stylingMode: 'filled',
          readOnly: true,
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
        editorType: 'dxTextBox',
        colSpan: 2,
        editorOptions: {
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
    //console.log(this.user)
  }

  buttonsValidatior(rowData) {
    const result = [rowData.id,rowData.status];
    return result;
  }

  showInfo(id? : String) {
    this.fileReset();
    this.popupVisible = true;
    this.correctiveId = id ? id: null;
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

      // const { 
      //   A1, 
      //   A2, 
      //   A3,
      //   A22,
      //   A28,
      //   A32,
      //   A41,
      //   A43,
      //   A44,
      //   A47,
      //   A50,
      //   A57,
      //   A62,
      //   A63,
      //   A64,
      //   A65, 
      //   ...wd }  = ws;

      this.infoForm = {
        id: Math.floor(Math.random() * 10000000000) + 1,
        title: ws.A1.h,
        creatingDate: new Date(Date.now()).toLocaleDateString('fa-IR'),
        editor: this.user.name,
        category: this.categories.filter(item => item.id == this.user.categoryCode)[0].title ,
        validator: this.validators.filter(item => item.id == this.user.validatorId)[0].name ,
        correctiveCode: this.correctiveId,
        status: 'مشاهده نشده',
        comment: null
      }

      let data;

      if(this.user.categoryCode == 1) {
  
        const dataLength = Object.keys(ws).filter(item => !item.indexOf("B")).length + 1
  
        // for(let i=1; i<dataLength + 1; i++) {
        //   if (ws[`A${i}`] == undefined) {
        //     ws[`A${i}`] = ws[`A${i-1}`];
        //   }
        // }
  
        const { 
          A1, 
          // C86,
          ...wd }  = ws;
  
        wd['!ref']=`A2:E${dataLength}`;
        wd.A2.h, wd.A2.v, wd.A2.w = "field";
        wd.B2.h, wd.B2.v, wd.B2.w = "deferredLossOfCompanyShare";
        wd.C2.h, wd.C2.v, wd.C2.w = "deferredDamagesShareOfInsurer";
        wd.D2.h, wd.D2.v, wd.D2.w = "netBalanceOfCompanyShare";
        wd.E2.h, wd.E2.v, wd.E2.w = "currency";
  
        data = XLSX.utils.sheet_to_json(wd, {blankrows: false});
  
        //console.log(data);

      } else if(this.user.categoryCode == 2) {

        
        const dataLength = Object.keys(ws).filter(item => !item.indexOf("B")).length + 1

        const { 
          A1, 
          ...wd }  = ws;
  
        wd['!ref']=`A2:C${dataLength}`;
        wd.A2.h, wd.A2.v, wd.A2.w = "maintenanceShare";
        wd.B2.h, wd.B2.v, wd.B2.w = "reinsuranceShare";
        wd.C2.h, wd.C2.v, wd.C2.w = "total";

        data = XLSX.utils.sheet_to_json(wd, {blankrows: false});
        
      } else if( this.user.categoryCode == 3) {
  
        const dataLength = Object.keys(ws).filter(item => !item.indexOf("B")).length + 1
  
        // for(let i=1; i<dataLength + 1; i++) {
        //   if (ws[`A${i}`] == undefined) {
        //     ws[`A${i}`] = ws[`A${i-1}`];
        //   }
        // }
  
        const { 
          A1, 
          ...wd }  = ws;
  
        wd['!ref']=`B2:K${dataLength}`;
        wd.A2.h, wd.A2.v, wd.A2.w = "mandatoryRatio";
        wd.B2.h, wd.B2.v, wd.B2.w = "field";
        wd.C2.h, wd.C2.v, wd.C2.w = "subfield";
        wd.D2.h, wd.D2.v, wd.D2.w = "issueYear";
        wd.E2.h, wd.E2.v, wd.E2.w = "currency";
        wd.F2.h, wd.F2.v, wd.F2.w = "shareOfDeferredLossOfCompany";
        wd.G2.h, wd.G2.v, wd.G2.w = "mandatoryReinsurersShare";
        wd.H2.h, wd.H2.v, wd.H2.w = "optionalReinsurersShare";
        wd.I2.h, wd.I2.v, wd.I2.w = "contractualReinsurersShare";
        wd.J2.h, wd.J2.v, wd.J2.w = "totalReinsurersShare";
        wd.K2.h, wd.K2.v, wd.K2.w = "netDeferredLossOfCompanyShare";

        data = XLSX.utils.sheet_to_json(wd, {blankrows: false});
  
        console.log(data);
      }

      for (const [key, value] of Object.entries(data[0])) {
        this.arrayKey.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
      }      

      this.records = data;
      this.headRecords = this.records.slice(0,5);

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
    this.arrayKey = [];
    this.correctiveId = null;
    //console.log(this.infoForm, this.records, this.arrayKey, this.correctiveId)
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
    this.dataSource.unshift(this.infoForm);
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
    this.btnOne = false;
    this.btnFour = false;
    this.longtabs[0].disabled = false;
    this.longtabs[3].disabled = true;
    this.selectedIndex = 0;
    this.popupVisible = false;
    this.fileReset();
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

