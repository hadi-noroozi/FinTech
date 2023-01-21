import { Component } from '@angular/core';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  employee: any;
  colCountByScreen: object;
  public formItem: any[];

  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  constructor() {
    this.employee = {
      ID: 15200144,
      FirstName: 'علیرضا',
      LastName: 'عمرانی',
      Position: 'ناظر',
      Picture: 'images/employees/07.png',
      BirthDate: new Date('1974/11/15').toLocaleString('fa-IR').split("،")[0],
      HireDate: new Date('2005/05/11').toLocaleString('fa-IR').split("،")[0],
      /* tslint:disable-next-line:max-line-length */
      Notes: 'معاون بخش آمار و اطلاعات بیمه ایران'
    };
    this.formItem = [
      {
        dataField: 'ID',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled'
        },
        label: {
          text: "کد کاربری",
        }
      },
      {
        dataField: 'FirstName',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled'
        },
        label: {
          text: "نام کاربر",
        }
      },
      {
        dataField: 'LastName',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled',
        },
        label: {
          text: "نام خانوادگی",
        }
      },
      {
        dataField: 'Position',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled',
        },
        label: {
          text: "نقش کاربر",
        }
      },
      {
        dataField: 'BirthDate',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled',
          
        },
        label: {
          text: "تاریخ تولد",
        }
      },    
      {
        dataField: 'HireDate',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled',
        },
        label: {
          text: "تاریخ ایجاد حساب",
        }
      }, 
      {
        dataField: 'Notes',
        editorType: "dxTextBox",
        colSpan: 2,
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled',
        },
        label: {
          text: "توضیحات",
        }
      }, 
    ]
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }
}
