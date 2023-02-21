import { Component, OnInit, enableProdMode } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
// import { of } from 'rxjs';
// import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
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
  popupVisibleInfo = false;
  popupInfoTitle: string;
  popup2Title: String;
  popup2Content: String;
  popupInfo: any;
  popupInfoFormData: any[];
  arrayKey2: any[] = [];
  formItem2: any[];

  correctiveId: String;

  longtabs: Longtab[];
  selectedIndex: number = 0;
  selectItem: boolean = false;

  public records: any[] = [];
  public headRecords: any[] = [];
  public arrayKey: any[] = [];
  public file: FileList;
  public transferingForm: Number;

  userInfo: any;
  public user: any;

  public validators: any[];

  public categories: any[];
  slectedCategroy: any;

  btnOne: boolean = true;
  btnTwo: boolean = false;
  btnThree: boolean = false;
  btnFour: boolean = false;
  nextBtn: boolean = true;

  public colCountByScreen: any;
  public infoForm: any;
  public formData: any;
  public formItem: any[];

  formType: String;
  fiscalYearList: any[];

  constructor(
    private addTransactionService: AddtransactionService,
    private authService: AuthService,
    private router: Router
  ) {

    this.userInfo = authService.getUser();
    this.user = this.userInfo.__zone_symbol__value.data;

    this.longtabs = addTransactionService.getLongtabs();

    this.fiscalYearList = [
      parseInt(new Intl.DateTimeFormat('fa-u-ca-persian-nu-latn').format(new Date()).split("/")[0]),
      parseInt(new Intl.DateTimeFormat('fa-u-ca-persian-nu-latn').format(new Date()).split("/")[0]) + 1,
      parseInt(new Intl.DateTimeFormat('fa-u-ca-persian-nu-latn').format(new Date()).split("/")[0]) + 2,
      parseInt(new Intl.DateTimeFormat('fa-u-ca-persian-nu-latn').format(new Date()).split("/")[0]) + 3,
      parseInt(new Intl.DateTimeFormat('fa-u-ca-persian-nu-latn').format(new Date()).split("/")[0]) + 4
    ];

    this.colCountByScreen = {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3
    };

  }

  ngOnInit() {
    this.addTransactionService.getCategories().then( res =>{
      this.categories = res.data;
      this.formType = (this.user['position_id']==0) ? 
                        this.categories.filter(item => item.id == this.user.categorycode)[0].title : null;
      this.slectedCategroy = this.categories.filter(item => item.id == this.user.categorycode)[0];
    });

    this.addTransactionService.getValidators().then( res => {
      this.validators = res.data;
    });
   
    let data = {
      'token': this.user.token
    }
    this.addTransactionService.getForms(data).then(res => {
      if(res.status == 200) {
        this.dataSource = res.data
      }
    });

  }

  buttonsValidatior(rowData) {
    const result = [rowData.id,rowData.status, rowData.address];
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
    this.file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.formItem = [
        // {
        //   dataField: 'id',
        //   editorType: "dxTextBox",
        //   editorOptions: {
        //     readOnly: true,
        //     stylingMode: 'filled'
        //   },
        //   label: {
        //     text: "کد فرم",
        //   }
        // },
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
          dataField: 'fiscalYear',
          editorType: "dxSelectBox",
          editorOptions: {
            dataSource: this.fiscalYearList,
            maxLength: 200,
            placeholder:"سال مالی را وارد کنید",
            stylingMode: 'filled',
            onValueChanged(data) {
              this.infoForm = {...this.infoForm ,fiscalYear: data.value};
            },
          },
          label: {
            text: "سال مالی",
          }
        },  
        {
          dataField: 'fiscalPeriod',
          editorType: "dxSelectBox",
          editorOptions: {
            dataSource: [
              "فروردین",
              "اردیبهشت",
              "خرداد",
              "تیر",
              "مرداد",
              "شهریور",
              "مهر",
              "آبان",
              "آذر",
              "دی",
              "بهمن",
              "اسفند",
            ],
            maxLength: 200,
            placeholder:"دوره مالی را وارد کنید",
            stylingMode: 'filled',
            onValueChanged(data) {
              this.infoForm = {...this.infoForm ,fiscalPeriod: data.value};
              
            },
          },
          label: {
            text: "دوره مالی",
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
      ];

      this.infoForm = {
        // id: Math.floor(Math.random() * 10000000000) + 1,
        title: ws.A1.h,
        creatingDate: new Date(Date.now()).toLocaleDateString('fa-IR'),
        editor: this.user.name,
        category: this.categories.filter(item => item.id == this.user.categorycode)[0].title ,
        validator: this.validators.filter(item => item.id == this.user['validator_id'])[0].name ,
        // correctiveCode: this.correctiveId,
        // status: 'در انتظار تایید',
        // comment: null,
        // address: this.slectedCategroy.sample
      };

      let data;

      if(this.user.categorycode == 1) {
  
        if(
          ws.A2.h == "رشته بيمه اي " &&
          ws.B2.h == "100%خسارت معوق سهم شركت " &&
          ws.C2.h == "خسارت معوق سهم بيمه گران اتكايي " &&
          ws.D2.h == "مانده خالص سهم شرکت" &&
          ws.E2.h == "واحد ارز "
        ) {
          const dataLength = Object.keys(ws).filter(item => !item.indexOf("B")).length + 1
  
          const { 
            A1, 
            ...wd }  = ws;
    
          wd['!ref']=`A2:E${dataLength}`;
          wd.A2.h, wd.A2.v, wd.A2.w = "field";
          wd.B2.h, wd.B2.v, wd.B2.w = "deferredLossOfCompanyShare";
          wd.C2.h, wd.C2.v, wd.C2.w = "deferredDamagesShareOfInsurer";
          wd.D2.h, wd.D2.v, wd.D2.w = "netBalanceOfCompanyShare";
          wd.E2.h, wd.E2.v, wd.E2.w = "currency";
    
          data = XLSX.utils.sheet_to_json(wd, {blankrows: false});
        } else {
          notify("کاربر گرامی ساختار فایل مورد نظر مطابق با فرم مربوطه شما نمی باشد، لطفا فرم صحیح را ارسال کنید", 'error', 2000)
          this.fileReset();
        }

      } else if(this.user.categorycode == 2) {

        if(
          ws.A2.h == "سهم نگهداری" &&
          ws.B2.h == "سهم اتکایی" &&
          ws.C2.h == "کل"
        ) {
          const dataLength = Object.keys(ws).filter(item => !item.indexOf("B")).length + 1

          const { 
            A1, 
            ...wd }  = ws;
    
          wd['!ref']=`A2:C${dataLength}`;
          wd.A2.h, wd.A2.v, wd.A2.w = "maintenanceShare";
          wd.B2.h, wd.B2.v, wd.B2.w = "reinsuranceShare";
          wd.C2.h, wd.C2.v, wd.C2.w = "total";

          data = XLSX.utils.sheet_to_json(wd, {blankrows: false});          
        } else {
          notify("کاربر گرامی ساختار فایل مورد نظر مطابق با فرم مربوطه شما نمی باشد، لطفا فرم صحیح را ارسال کنید", 'error', 2000)
          this.fileReset();
        }
        
      } else if( this.user.categorycode == 3) {
  
        if(
          ws.B2.h == "رشته" &&
          ws.C2.h == "زیررشته" &&
          ws.D2.h == "سال صدور" &&
          ws.E2.h == "واحد ارز" &&
          ws.F2.h == "خسارت معوق سهم بیمه ایران " &&
          ws.G2.h == "سهم بیمه گران اتکایی - اجباری" &&
          ws.H2.h == "سهم بیمه گران اتکایی - اختیاری" &&
          ws.I2.h == "سهم بیمه گران اتکایی - قراردادی" &&
          ws.J2.h == "مجموع سهم بیمه گران اتکایی" &&
          ws.K2.h == "خسارت معوق سهم خالص بیمه ایران "
        ) {
          
          const dataLength = Object.keys(ws).filter(item => !item.indexOf("B")).length + 1
    
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
        } else {
          notify("کاربر گرامی ساختار فایل مورد نظر مطابق با فرم مربوطه شما نمی باشد، لطفا فرم صحیح را ارسال کنید", 'error', 2000)
          this.fileReset();
        }

      }

      for (const [key, value] of Object.entries(data[0])) {
        this.arrayKey.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
      }      

      this.records = data;
      this.headRecords = this.records.slice(0,3);

    }

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
    let data = {
      'title': this.infoForm.title,
      'fiscalYear':this.infoForm.fiscalYear,
      'fiscalPeriod': this.infoForm.fiscalPeriod,
      'description': this.infoForm.description,
      'editor': this.user.user_id,
      'category': this.user.categorycode,
      'validator': this.user['validator_id'],
      'token': this.user.token
    }
    this.addTransactionService.addForm(data).then(res => {
      if(res.status == 200) {
        //console.log(res)
        let fileData = {
          'add_file':'add_file',
          'form_id': res.db['inserted_id'],
          'token': this.user.token,
          'content': JSON.stringify(this.records),
          'file': this.file
        }
        this.addTransactionService.addFile(fileData).then ( res => {
          if(res.status == 200) {
            this.btnThree = false;
            this.btnFour = true;
            this.longtabs[2].disabled = true;
            this.longtabs[3].disabled = false;
            this.selectedIndex = 3;
            this.transferingForm = fileData['form_id'];
          }

        })
      }
      else if(res.status == 404) {
        notify("حساب کاربری شما معتبر نمی باشد، لطفا دوباره وارد شود", 'error', 2000)
        this.authService.logOut();
      }
      else if(res.status == 300) {
        notify("کاربر شما دسترسی ایجاد چنین فرمی را ندارد، لطفا پس از تصحیح اطلاعات دوباره تلاش کنید", 'error', 2000)
        setTimeout(function(){
          location.reload()
        },2100);
      } else {
        notify("در فرآیند ایجاد فرم مشکلی وجود دارد، لطفا دوباره تلاش کنید", 'error', 2000)
        setTimeout(function(){
          location.reload()
        },2100);
      }
    })
    //this.dataSource.unshift(this.infoForm);
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

  getData(rowData) {
    this.arrayKey2 = [];
    this.popupVisibleInfo = true;
    this.popupInfo = rowData.data;
    this.popupInfoTitle = "فرم " + rowData.data.title;

    this.formItem2 = [
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
          stylingMode: 'filled',
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
          },
        },
        label: {
          text: "دسته بندی",
        }
      },
      {
        dataField: 'creatingDate',
        editorType: "dxDateBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled',
          displayFormat:'yyyy/MM/dd',

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
          },
        },
        label: {
          text: "ناظر",
        }
      },
      {
        dataField: 'fiscalYear',
        editorType: "dxTextBox",
        editorOptions: {
          maxLength: 200,
          readOnly: true,
          placeholder:"سال مالی را وارد کنید",
          stylingMode: 'filled',
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,fiscalYear: data.value};
          },
        },
        label: {
          text: "سال مالی",
        }
      },  
      {
        dataField: 'fiscalPeriod',
        editorType: "dxTextBox",
        editorOptions: {
          maxLength: 200,
          placeholder:"دوره مالی را وارد کنید",
          readOnly: true,
          stylingMode: 'filled',
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,fiscalPeriod: data.value};
          },
        },
        label: {
          text: "دوره مالی",
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
          readOnly: true,
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,description: data.value};
          },
        },
        label: {
          text: "توضیحات",
        }
      },      
    ]

    this.popupInfoFormData = this.addTransactionService.getFormInfo();
    for (const [key, value] of Object.entries(this.popupInfoFormData[0])) {
      this.arrayKey2.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
    }    
    //console.log(this.popupInfo,this.popupInfoFormData);
  }
}

