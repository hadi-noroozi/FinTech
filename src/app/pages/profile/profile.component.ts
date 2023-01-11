import { Component } from '@angular/core';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  employee: any;
  colCountByScreen: object;

  constructor() {
    this.employee = {
      ID: 7,
      FirstName: 'علیرضا',
      LastName: 'عمرانی',
      Prefix: 'آقای',
      Position: 'Controller',
      Picture: 'images/employees/07.png',
      BirthDate: new Date('1974/11/15'),
      HireDate: new Date('2005/05/11'),
      /* tslint:disable-next-line:max-line-length */
      Notes: 'معاون بخش آمار و اطلاعات بیمه ایران',
      Address: 'تهران، برزیل غربی، ساختمان مرکزی بیمه ایران، طبقه 12، بخش آمار و برنامه ریزی'
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }
}
