import { Injectable } from '@angular/core';

export class FormList {
  id: String;
  correctiveCode?: String;
  title: String;
  category: String;
  creatingDate: Date;
  editor: String;
  lastEditDate: Date;
  validator: String;
  status: String;
  description: String;
  comment: String;
  address: String;
  fiscalPeriod: String;
  fiscalYear: String;
}

const formList: FormList[] = [
  {
    id: '1223421456',
    title: 'خسارت معوقه قبولی اصلاحی سال 1401',
    category: "خسارت معوقه اتکایی",
    creatingDate: new Date("1400/09/30"),
    editor: "علیرضا عمرانی",
    lastEditDate: new Date("1400/10/20"),
    validator: "نسترن کلاهچی",
    status: "در انتظار تایید",
    description: "توضیحات یک",
    comment: "نظر یک",
    address: "../../../assets/sample-file/sample1.xlsx",
    fiscalPeriod: "سالانه",
    fiscalYear: "1400"
  }, {
    id: '1546411457',
    title: 'خسارت معوقه قبولی اصلاحی سال 1400',
    category: "خسارت معوقه اتکایی",
    creatingDate: new Date("1400/09/25"),
    editor: "علیرضا عمرانی",
    lastEditDate: new Date("1400/10/01"),
    validator: "نسترن کلاهچی",
    status: "تایید شده",
    description: "توضیحات دو",
    comment: "نظر دو",
    address: "../../../assets/sample-file/sample1.xlsx",
    fiscalPeriod: "نیمه اول سال",
    fiscalYear: "1400"
  }, {
    id: '5442111456',
    correctiveCode: '1546411456',
    title: 'خسارت معوقه قبولی اصلاحی سال 1399 -اصلاحیه',
    category: "خسارت معوقه اتکایی",
    creatingDate: new Date("1400/08/30"),
    editor: "علیرضا عمرانی",
    lastEditDate: new Date("1400/09/21"),
    validator: "نسترن کلاهچی",
    status: "تایید شده",
    description: "توضیحات سه",
    comment: "نظر سه",
    address: "../../../assets/sample-file/sample1.xlsx",
    fiscalPeriod: "فصل بهار",
    fiscalYear: "1400"
  }, {
    id: '1546411456',
    title: 'خسارت معوقه قبولی اصلاحی سال 1400',
    category: "خسارت معوقه اتکایی",
    creatingDate: new Date("1400/07/30"),
    editor: "علیرضا عمرانی",
    lastEditDate: new Date("1400/08/30"),
    validator: "نسترن کلاهچی",
    status: "نیازمند ویرایش",
    description: "توضیحات چهار",
    comment: "نظر چهار",
    address: "../../../assets/sample-file/sample1.xlsx",
    fiscalPeriod: "فصل بهار",
    fiscalYear: "1400"
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
