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
  popupEvents= false;
  popupInfoTitle: string;
  popup2Title: String;
  popup2Content: String;
  popupInfo: any;
  popupInfoFormData: any[];
  arrayKey2: any[] = [];
  formItem2: any[];
  popupEventsTitle: String;
  popupEventsData: any[];
  private comment: String;
  comments: any[] = [];
  mentionUsers: any[];

  correctiveId: Number;

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
  public statuses: any[];
  popupOption: any;

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

    this.statuses = [{
        text: '?????????? ??????',
        value: ['status', '=', '200'],
      }, {
        text: '???? ???????????? ????????????????',
        value: ['status', '=', '0'],
      }, {
        text: '?????????? ??????????',
        value: ['status', '=', '100'],
      }
    ];

    this.popupOption = {
      cancel: '??????',
      ok: '??????????',
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

  showInfo(id? : Number) {
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
        //     text: "???? ??????",
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
            text: "?????????? ??????",
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
            placeholder:"?????? ?????? ???? ?????????? ????????",
            onValueChanged(data) {
              this.infoForm = {...this.infoForm ,catgory: data.value};
            },
          },
          label: {
            text: "???????? ????????",
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
            text: "?????????? ??????????",
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
            text: "???????????? ??????????",
          }
        },
        {
          dataField: 'validator',
          editorType: "dxSelectBox",
          editorOptions: {
            dataSource: this.validators,
            displayExpr:"name",
            valueExpr:"name",
            placeholder:"?????????? ???????? ???? ?????????? ????????",
            stylingMode: 'filled',
            readOnly: true,
            onValueChanged(data) {
              this.infoForm = {...this.infoForm ,validator: data.value};
            },
          },
          label: {
            text: "????????",
          }
        },
        {
          dataField: 'fiscalYear',
          editorType: this.correctiveId ?  "dxTextBox" : "dxSelectBox",
          editorOptions: {
            readOnly: this.correctiveId,
            dataSource: this.fiscalYearList,
            placeholder:"?????? ???????? ???? ???????? ????????",
            stylingMode: 'filled',
            onValueChanged(data) {
              this.infoForm = {...this.infoForm ,fiscalYear: data.value};
            },
          },
          label: {
            text: "?????? ????????",
          }
        },  
        {
          dataField: 'fiscalPeriod',
          editorType: this.correctiveId ?  "dxTextBox" : "dxSelectBox",
          editorOptions: {
            dataSource: [
              "??????????????",
              "????????????????",
              "??????????",
              "??????",
              "??????????",
              "????????????",
              "??????",
              "????????",
              "??????",
              "????",
              "????????",
              "??????????",
            ],
            readOnly: this.correctiveId,
            placeholder:"???????? ???????? ???? ???????? ????????",
            stylingMode: 'filled',
            onValueChanged(data) {
              this.infoForm = {...this.infoForm ,fiscalPeriod: data.value};
              
            },
          },
          label: {
            text: "???????? ????????",
          }
        },      
        {
          dataField: 'description',
          editorType: 'dxTextBox',
          colSpan: 2,
          editorOptions: {
            readOnly: this.correctiveId,
            maxLength: 280,
            placeholder:"?????????????? ?????????? ???? ???????? ????????",
            stylingMode: 'filled',
            onValueChanged(data) {
              this.infoForm = {...this.infoForm ,description: data.value};
             
            },
          },
          label: {
            text: "??????????????",
          }
        },      
      ];

      if(this.correctiveId) {
        let formindex = this.dataSource.filter(item => item.id == this.correctiveId)[0];
        this.infoForm = {
          title: formindex.title,
          creatingDate: formindex.creatingDate,
          editor: formindex.editor,
          category: formindex.category,
          validator: formindex.validator,
          fiscalYear: formindex.fiscalYear,
          fiscalPeriod: formindex.fiscalPeriod,
          description: formindex.description,
          correctiveCode: this.correctiveId ? this.correctiveId : null,
        };
      } else {
        this.infoForm = {
          title: ws.A1.h,
          creatingDate: new Date(Date.now()).toLocaleDateString('fa-IR'),
          editor: this.user.name,
          category: this.categories.filter(item => item.id == this.user.categorycode)[0].title ,
          validator: this.validators.filter(item => item.id == this.user['validator_id'])[0].name ,
          correctiveCode: null,
        };
      }

      let data;

      if(this.user.categorycode == 1) {
  
        if(
          ws.A2.h == "???????? ???????? ???? " &&
          ws.B2.h == "100%?????????? ???????? ?????? ???????? " &&
          ws.C2.h == "?????????? ???????? ?????? ???????? ???????? ???????????? " &&
          ws.D2.h == "?????????? ???????? ?????? ????????" &&
          ws.E2.h == "???????? ?????? "
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
          notify("?????????? ?????????? ???????????? ???????? ???????? ?????? ?????????? ???? ?????? ???????????? ?????? ?????? ?????????? ???????? ?????? ???????? ???? ?????????? ????????", 'error', 2000)
          this.fileReset('error');
        }

      } else if(this.user.categorycode == 2) {

        if(
          ws.A2.h == "?????? ??????????????" &&
          ws.B2.h == "?????? ????????????" &&
          ws.C2.h == "????"
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
          notify("?????????? ?????????? ???????????? ???????? ???????? ?????? ?????????? ???? ?????? ???????????? ?????? ?????? ?????????? ???????? ?????? ???????? ???? ?????????? ????????", 'error', 2000)
          this.fileReset('error');
        }
        
      } else if( this.user.categorycode == 3) {
  
        if(
          ws.B2.h == "????????" &&
          ws.C2.h == "??????????????" &&
          ws.D2.h == "?????? ????????" &&
          ws.E2.h == "???????? ??????" &&
          ws.F2.h == "?????????? ???????? ?????? ???????? ?????????? " &&
          ws.G2.h == "?????? ???????? ???????? ???????????? - ????????????" &&
          ws.H2.h == "?????? ???????? ???????? ???????????? - ??????????????" &&
          ws.I2.h == "?????? ???????? ???????? ???????????? - ????????????????" &&
          ws.J2.h == "?????????? ?????? ???????? ???????? ????????????" &&
          ws.K2.h == "?????????? ???????? ?????? ???????? ???????? ?????????? "
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
          notify("?????????? ?????????? ???????????? ???????? ???????? ?????? ?????????? ???? ?????? ???????????? ?????? ?????? ?????????? ???????? ?????? ???????? ???? ?????????? ????????", 'error', 2000)
          this.fileReset('error');
        }

      }

      for (const [key, value] of Object.entries(data[0])) {
        this.arrayKey.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
      }      

      this.records = data;
      this.headRecords = this.records.slice(0,3);

    }

  }

  fileReset(text? : string) {
    this.infoForm = {};
    this.headRecords = [];
    this.records = [];
    this.arrayKey = [];
    this.popupVisible = false;
    if( text == 'error') {
      this.correctiveId = null;
    }
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
    console.log(JSON.stringify(this.records).length)
  }

  submitThree() {
    if(this.correctiveId) {
      let fileData = {
        'add_file':'add_file',
        'form_id': this.correctiveId,
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
    } else {
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
          notify("???????? ???????????? ?????? ?????????? ?????? ?????????? ???????? ???????????? ???????? ??????", 'error', 2000)
          this.authService.logOut();
        }
        else if(res.status == 300) {
          notify("?????????? ?????? ???????????? ?????????? ???????? ???????? ???? ???????????? ???????? ???? ???? ?????????? ?????????????? ???????????? ???????? ????????", 'error', 2000)
          setTimeout(function(){
            location.reload()
          },2100);
        } else {
          notify("???? ???????????? ?????????? ?????? ?????????? ???????? ?????????? ???????? ???????????? ???????? ????????", 'error', 2000)
          setTimeout(function(){
            location.reload()
          },2100);
        }
      })
    }
  }

  submitFour(id?: Number) {
    let data = {
      'transfer':'transfer',
      'form_id': id ? id : this.transferingForm,
      'token': this.user.token,
    }
    this.addTransactionService.sendForm(data).then( res => {
      if(res.status == 200) {
        notify(`?????? ${id || this.transferingForm} ???? ???????? ?????????? ????`, 'success', 2000)
        this.btnOne = false;
        this.btnFour = false;
        this.longtabs[0].disabled = false;
        this.longtabs[3].disabled = true;
        this.selectedIndex = 0;
        this.popupVisible = false;
        this.fileReset();
        setTimeout(function(){
          location.reload()
        },2100);
      } else if(res.status == 300) {
        notify("???????? ???????????? ?????? ???????????? ?????????? ???????? ???????? ???? ??????????", 'error', 2000)
        setTimeout(function(){
          location.reload()
        },2100);
      } else {
        notify("???? ?????? ???????? ???? ???????????? ?????????? ?????? ?????????? ?????? ???????? ??????", 'error', 2000)
        setTimeout(function(){
          location.reload()
        },2100);
      }
    })

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
    location.reload();
  }  

  showDescription(id) {
    this.popup2Title = "?????????????? " + this.dataSource.filter(item => item.id == id )[0].title;
    this.popup2Content = this.dataSource.filter(item => item.id == id )[0].description;
    this.popupVisible2 = true;
  }

  StatusValidatior(rowData) {
    return rowData;
  }
  
  // showComment(id) {
  //   this.popup2Title = "?????? ???????? | " + this.dataSource.filter(item => item.id == id )[0].title;
  //   this.popup2Content = this.dataSource.filter(item => item.id == id )[0].comment;
  //   this.popupVisible2 = true;
  // }

  showEvents(id) {
    this.popupEventsTitle = "?????????????? ?????????????????? | " + this.dataSource.filter(item => item.id == id )[0].title;

    let data = {
      'token': this.user.token,
      'form_id': id
    }
    this.addTransactionService.getEventsData(data).then(res => {
      if(res.status == 200) {
        this.popupEventsData = res.data;
        this.popupEvents = true;
      } else if(res.status == 404) {
        notify("???????? ???????????? ?????? ?????????? ?????? ?????????? ???????? ???????????? ???????? ??????", 'error', 2000)
        this.authService.logOut();
      } else if(res.status == 300) {
        notify("?????????? ?????? ???????????? ???????????? ?????????????? ?????? ?????? ???? ??????????", 'error', 2000)
      } else {
        notify("???? ?????? ?????????? ???? ???????????? ?????????????? ?????? ?????? ?????????? ???? ???????? ???????? ??????", 'error', 2000)
        this.popupEventsData = null;
      }
    });

    //this.popup2Content = this.dataSource.filter(item => item.id == id )[0].comment;

  }

  getData(rowData) {
    this.arrayKey2 = [];
    this.popupVisibleInfo = true;
    this.popupInfo = rowData.data;
    this.popupInfoTitle = "?????? " + rowData.data.title;

    this.formItem2 = [
      {
        dataField: 'id',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled'
        },
        label: {
          text: "???? ??????",
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
          text: "?????????? ??????",
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
          placeholder:"?????? ?????? ???? ?????????? ????????",
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,catgory: data.value};
          },
        },
        label: {
          text: "???????? ????????",
        }
      },
      {
        dataField: 'creatingDate',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled',
          displayFormat:'yyyy/MM/dd',
        },
        label: {
          text: "?????????? ??????????",
        }
      },
      {
        dataField: 'lastEditDate',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled',
          displayFormat:'yyyy/MM/dd',
        },
        label: {
          text: "?????????? ?????????? ????????????",
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
          text: "???????????? ??????????",
        }
      },
      {
        dataField: 'validator',
        editorType: "dxSelectBox",
        editorOptions: {
          dataSource: this.validators,
          displayExpr:"name",
          valueExpr:"name",
          placeholder:"?????????? ???????? ???? ?????????? ????????",
          stylingMode: 'filled',
          readOnly: true,
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,validator: data.value};
          },
        },
        label: {
          text: "????????",
        }
      },
      {
        dataField: 'fiscalYear',
        editorType: "dxTextBox",
        editorOptions: {
          maxLength: 200,
          readOnly: true,
          placeholder:"?????? ???????? ???? ???????? ????????",
          stylingMode: 'filled',
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,fiscalYear: data.value};
          },
        },
        label: {
          text: "?????? ????????",
        }
      },  
      {
        dataField: 'fiscalPeriod',
        editorType: "dxTextBox",
        editorOptions: {
          maxLength: 200,
          placeholder:"???????? ???????? ???? ???????? ????????",
          readOnly: true,
          stylingMode: 'filled',
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,fiscalPeriod: data.value};
          },
        },
        label: {
          text: "???????? ????????",
        }
      },      
      {
        dataField: 'description',
        editorType: 'dxTextBox',
        colSpan: 2,
        editorOptions: {
          maxLength: 200,
          placeholder:"?????????????? ?????????? ???? ???????? ????????",
          stylingMode: 'filled',
          readOnly: true,
          onValueChanged(data) {
            this.infoForm = {...this.infoForm ,description: data.value};
          },
        },
        label: {
          text: "??????????????",
        }
      },      
    ]

    let data = {
      'token': this.user.token,
      'form_id': rowData.data.id
    }
    
    let users = [
      rowData.data.validator,
      rowData.data.editor,
      rowData.data.applicent
    ]

    this.mentionUsers = [...new Set(users)];

    this.addTransactionService.getFormDataSet(data).then(res => {
      if(res.status == 200) {
        this.popupInfoFormData = JSON.parse(res.data.content);
        if(typeof this.popupInfoFormData == 'object') {
          for (const [key, value] of Object.entries(this.popupInfoFormData[0])) {
            this.arrayKey2.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
          }
        }
      } else if(res.status == 404) {
        notify("???????? ???????????? ?????? ?????????? ?????? ?????????? ???????? ???????????? ???????? ??????", 'error', 2000)
        this.authService.logOut();
      } else if(res.status == 300) {
        notify("?????????? ?????? ???????????? ???????????? ?????????????? ?????? ?????? ???? ??????????", 'error', 2000)
      } else {
        notify("???? ?????? ?????????? ???? ???????????? ?????????????? ?????? ?????? ?????????? ???? ???????? ???????? ??????", 'error', 2000)
        this.popupInfoFormData = null;
      }
    });

    this.addTransactionService.getEventsData(data).then(res => {
      if(res.status == 200) {
        this.comments = res.data.filter(item => item.status.id == 0);
      } else if(res.status == 404) {
        notify("???????? ???????????? ?????? ?????????? ?????? ?????????? ???????? ???????????? ???????? ??????", 'error', 2000)
        this.authService.logOut();
      } else if(res.status == 300) {
        notify("?????????? ?????? ???????????? ???????????? ?????????????? ?????? ?????? ???? ??????????", 'error', 2000)
      } else {
        notify("???? ?????? ?????????? ???? ???????????? ?????????????? ?????? ?????? ?????????? ???? ???????? ???????? ??????", 'error', 2000)
        this.comments = null
      }
    });
  }

  onWheelRight(event: WheelEvent): void {
    document.getElementById('right-elm').scrollTop += event.deltaY;
  }

  onWheelLeft(event: WheelEvent): void {
    document.getElementById('chat-window').scrollTop += event.deltaY;
  }

  sendComment() {
    let data = {
      'content': this.comment,
      'form_id': this.popupInfo.id,
      'token': this.user.token,
    }
    this.addTransactionService.addComment(data).then(res => {
      if(res.status==200){
        notify("???????????? ?????? ?????? ????", 'success', 2000)
        setTimeout(function(){
          location.reload()
        },2100);
      } else {
        notify("???? ???????????? ?????? ???????????? ?????? ?????????? ?????? ??????", 'success', 2000)
      }
    })
    
  }


}

