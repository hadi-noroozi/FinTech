import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  employee: any;
  user: any;
  colCountByScreen: object;
  public formItem: any[];

  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  constructor(authService: AuthService) {
    this.user = authService.getUser();
    this.employee = this.user.__zone_symbol__value.data;
    // this.employee = {
    //   ID: 15200144,
    //   FirstName: 'علیرضا',
    //   LastName: 'عمرانی',
    //   Position: 'ناظر',
    //   Picture: 'images/employees/07.png',
    //   BirthDate: new Date('1974/11/15').toLocaleString('fa-IR').split("،")[0],
    //   HireDate: new Date('2005/05/11').toLocaleString('fa-IR').split("،")[0],
    //   /* tslint:disable-next-line:max-line-length */
    //   Notes: 'معاون بخش آمار و اطلاعات بیمه ایران'
    // };
    this.formItem = [
      {
        dataField: 'user_id',
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
        dataField: 'firstname',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled'
        },
        label: {
          text: "نام",
        }
      },
      {
        dataField: 'lastname',
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
        dataField: 'position',
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
        dataField: 'birthdate',
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
        dataField: 'hiredate',
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
        dataField: 'notes',
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
