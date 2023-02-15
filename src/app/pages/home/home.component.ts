import { Component } from '@angular/core';
import { AddtransactionService, FormList } from '../addtransaction/addtransaction.service';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {

  dataSource: FormList[];
  popupVisible2 = false;
  popupVisibleInfo = false;
  popupInfoTitle: string;
  popup2Title: String;
  popup2Content: String;

  public popupInfo: any;
  public popupInfoFormData: any[];
  public arrayKey2: any;
  public formItem2: any[];
  public colCountByScreen: any;

  notCheckedForms: Number;
  validateForms: Number;
  notValidateForms: Number;
  allForms: Number;

  userInfo: any;
  public user: any;

  constructor( 
    public addTransactionService: AddtransactionService,
    public authService: AuthService,
  ) {
    this.userInfo = authService.getUser();
    this.user = this.userInfo.__zone_symbol__value.data;    
    let fullData = addTransactionService.getFormListData();
    this.dataSource = addTransactionService.getFormListData().filter(
      item => item.status == "در انتظار تایید"
    );

    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3
    };

    this.allForms = fullData.length;
    this.notCheckedForms = fullData.filter(item => item.status=="در انتظار تایید").length;
    this.validateForms = fullData.filter(item => item.status=="تایید شده").length;
    this.notValidateForms = fullData.filter(item => item.status=="نیازمند ویرایش").length;
  }

  
  buttonsValidatior(rowData) {
    const result = [rowData.id,rowData.status, rowData.address];
    return result;
  }

  showDescription(id) {
    this.popup2Title = "توضیحات " + this.dataSource.filter(item => item.id == id )[0].title;
    this.popup2Content = this.dataSource.filter(item => item.id == id )[0].description;
    this.popupVisible2 = true;
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  getData(rowData) {
    this.arrayKey2 = [];
    this.popupVisibleInfo = true;
    this.popupInfo = rowData.data;
    this.popupInfoTitle = "فرم " + rowData.data.title;

    this.formItem2 = [    
      {
        dataField: 'comment',
        editorType: "dxTextArea",
        colSpan: 2,
        editorOptions: {
          stylingMode: 'filled',
          placeholder:"نظر خود را وارد کنید",
          onValueChanged(data) {
            this.popupInfo = {...this.popupInfo ,comment: data.value};
          },
        },
        label: {
          text: "نظر ناظر",
        }
      },
      {
        itemType: "group",
        colCount: 2,
        label: {
          text: "آیا اطلاعات و مشخصات فرم را تایید می کنید؟",
        },
        items: [
          {
            
            editorType: 'dxButton',
            editorOptions: {
              width: '100%',
              icon: 'check',
              type:"success",
              stylingMode: 'outlined',
              text: "بلی",
              onClick() {
                this.popupInfo = {...this.popupInfo ,status: "تایید شده"};
              },
            },
            label: {
              visible: false,
            },
          },
          {
            
            editorType: 'dxButton',
            editorOptions: {
              width: '100%',
              icon: 'close',
              type:"danger",
              stylingMode: 'outlined',
              text: "خیر",
              onClick() {
                this.popupInfo = {...this.popupInfo ,status: "نیازمند ویرایش"};
              },
            },
            label: {
              visible: false,
            },
          }
        ]
      },        
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
        editorType: "dxTextBox",
        editorOptions: {
          stylingMode: 'filled',
          readOnly: true,
          placeholder:"نوع فرم را تعیین کنید",
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
        editorType: "dxTextBox",
        editorOptions: {
          placeholder:"کاربر ناظر را تعیین کنید",
          stylingMode: 'filled',
          readOnly: true,
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
          placeholder:"توضیحات پیوست را وارد کنید",
          stylingMode: 'filled',
          readOnly: true,
        },
        label: {
          text: "توضیحات",
        }
      }, 
      {
        dataField: 'address',
        editorType: 'dxButton',
        editorOptions: {
          icon: 'download',
          type:"success",
          cssClass:"ml-auto",
          onClick() {
            this.goToLink(rowData.data.address)
          },
        },
        label: {
          text: "لینک دانلود"
        }
      }     
    ]

    this.popupInfoFormData = this.addTransactionService.getFormInfo();
    for (const [key, value] of Object.entries(this.popupInfoFormData[0])) {
      this.arrayKey2.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
    }    
    //console.log(this.popupInfo);
  }
}
