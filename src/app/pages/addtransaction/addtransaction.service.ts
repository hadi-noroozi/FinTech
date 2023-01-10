import { Injectable } from '@angular/core';

export class FormList {
  id: String;
  title: String;
  category: String;
  creatingDate: Date;
  editor: String;
  lastEditDate: Date;
  validator: String;
  status: Boolean;
}

const formList: FormList[] = [
  {
    id: '122342',
    title: 'فرم سود و زیان 1',
    category: "مالی",
    creatingDate: new Date("1400/09/30"),
    editor: "علیرضا عمرانی",
    lastEditDate: new Date("1400/10/20"),
    validator: "نسترن کلاهچی",
    status: true
  }, {
    id: '154641',
    title: 'فرم سود و زیان 2',
    category: "مالی",
    creatingDate: new Date("1400/09/25"),
    editor: "علیرضا عمرانی",
    lastEditDate: new Date("1400/10/01"),
    validator: "نسترن کلاهچی",
    status: false
  },
  {
    id: '544211',
    title: 'فرم سود و زیان 3',
    category: "مالی",
    creatingDate: new Date("1400/08/30"),
    editor: "علیرضا عمرانی",
    lastEditDate: new Date("1400/09/21"),
    validator: "نسترن کلاهچی",
    status: true
  }, {
    id: '154641',
    title: 'فرم سود و زیان 4',
    category: "مالی",
    creatingDate: new Date("1400/07/30"),
    editor: "علیرضا عمرانی",
    lastEditDate: new Date("1400/08/30"),
    validator: "نسترن کلاهچی",
    status: true
  },
]

export class Longtab {
  text: string;
  icon: string;
  disabled: boolean;
  link: string;
  focusStateEnabled: boolean;
  
}

let longtabs: Longtab[] = [
  {
      text: "1. بارگذاری داده ها",
      icon:'upload',
      disabled: false,
      link:'step-one',
      focusStateEnabled: false,
  },
  {
      text: "2. ویرایش اطلاعات",
      icon:'edit',
      disabled: true,
      link:'step-two',
      focusStateEnabled: false
  },
  {
      text: "3. تایید اولیه و ارجاع به ناظر",
      icon:'selectall',
      disabled: true,
      link:'step-three',
      focusStateEnabled: false
  },
  {
      text: "4. تایید نهایی توسط ناظر",
      icon:'check',
      disabled: true,
      link:'step-five',
      focusStateEnabled: false
  }
];

export class Record {
  POLICY_NO: String;
  PERSON_ID: String;	
  PERSON_NAME: String;
  FIELD_NAME: String;
  SUBFIELD_NAME: String;
  PORVINCE_NAME: String;
  ISSUE_DATE: Date;	
  START_DATE: Date;
  END_DATE: Date;
  PREMIUM: Number;
  DUE_DEBT: Number;
  NOT_DUE_DEBT: Number;
  DAMAGE: Number;
  OVERDUE_DAMAGE: Number;
}

@Injectable({
  providedIn: 'root'
})
export class AddtransactionService {

  constructor() { }
  
  getFormListData() {
    return formList;
  }

  getLongtabs(): Longtab[] {
      return longtabs;
  }
}
