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
    comment: null,
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

const formInfo: any[] = [
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 128946.98,
      "deferredDamagesShareOfInsurer": 1823,
      "netBalanceOfCompanyShare": 127123.98,
      "currency": "پوند انگلیس"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 142599.04,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 142599.04,
      "currency": "درهم مراكش"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 4511120.29,
      "deferredDamagesShareOfInsurer": 4511120.29,
      "netBalanceOfCompanyShare": 0,
      "currency": "دلار آمریکا"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 179704307.84,
      "deferredDamagesShareOfInsurer": 55942973.55,
      "netBalanceOfCompanyShare": 123761334.29,
      "currency": "روپیه هند"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 60000,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 60000,
      "currency": "دینار اردن"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 86930.25,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 86930.25,
      "currency": "دینار كویت"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 897060.635,
      "deferredDamagesShareOfInsurer": 48889.27,
      "netBalanceOfCompanyShare": 848171.365,
      "currency": "رینگیت مالزی"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 55991,
      "deferredDamagesShareOfInsurer": 55991,
      "netBalanceOfCompanyShare": 0,
      "currency": "ریال عمان"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 2050947.15,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 2050947.15,
      "currency": "درهم امارات"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 5449688.07,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 5449688.07,
      "currency": "دینار الجزایر"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 272613,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 272613,
      "currency": "دینارتونس"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 283038.65,
      "deferredDamagesShareOfInsurer": 283038.65,
      "netBalanceOfCompanyShare": 0,
      "currency": "دلار استرالیا"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 54950946.13,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 54950946.13,
      "currency": "فرانك جامعه آفریقایی"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 268965.02,
      "deferredDamagesShareOfInsurer": 88837.21,
      "netBalanceOfCompanyShare": 180127.81,
      "currency": "یورو"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 22041679,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 22041679,
      "currency": "پزو دومنیکن"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 1760178172852,
      "deferredDamagesShareOfInsurer": 1590000000000,
      "netBalanceOfCompanyShare": 170178172852,
      "currency": "ریال ایران"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 281290335.95,
      "deferredDamagesShareOfInsurer": 281290335.95,
      "netBalanceOfCompanyShare": 0,
      "currency": "روپیه اندونزی"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 279492.5,
      "deferredDamagesShareOfInsurer": 279492.5,
      "netBalanceOfCompanyShare": 0,
      "currency": "شلینگ کنیا"
  },
  {
      "field": "آتش سوزی",
      "deferredLossOfCompanyShare": 2246335.61,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 2246335.61,
      "currency": "بوتانیس نگولتروم"
  },
  {
      "field": "باربری",
      "deferredLossOfCompanyShare": 3461934.24,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 3461934.24,
      "currency": "دلار آمریکا"
  },
  {
      "field": "باربری",
      "deferredLossOfCompanyShare": 47871760.89,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 47871760.89,
      "currency": "روپیه هند"
  },
  {
      "field": "باربری",
      "deferredLossOfCompanyShare": 3723197.39,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 3723197.39,
      "currency": "دینار الجزایر"
  },
  {
      "field": "باربری",
      "deferredLossOfCompanyShare": 2377502,
      "deferredDamagesShareOfInsurer": 590193.95,
      "netBalanceOfCompanyShare": 1787308.05,
      "currency": "یورو"
  },
  {
      "field": "باربری",
      "deferredLossOfCompanyShare": 749200000000,
      "deferredDamagesShareOfInsurer": 489200000000,
      "netBalanceOfCompanyShare": 260000000000,
      "currency": "ریال ایران"
  },
  {
      "field": "باربری",
      "deferredLossOfCompanyShare": 18781.5,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 18781.5,
      "currency": "پوند انگلیس"
  },
  {
      "field": "انرژی",
      "deferredLossOfCompanyShare": 2190671.495,
      "deferredDamagesShareOfInsurer": 1259.99,
      "netBalanceOfCompanyShare": 2189411.505,
      "currency": "دلار آمریکا"
  },
  {
      "field": "انرژی",
      "deferredLossOfCompanyShare": 159813.69,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 159813.69,
      "currency": "یورو"
  },
  {
      "field": "انرژی",
      "deferredLossOfCompanyShare": 539555029000,
      "deferredDamagesShareOfInsurer": 539555029000,
      "netBalanceOfCompanyShare": 0,
      "currency": "ریال ایران"
  },
  {
      "field": "انرژی",
      "deferredLossOfCompanyShare": 270.464,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 270.464,
      "currency": "دینار كویت"
  },
  {
      "field": "مهندسی",
      "deferredLossOfCompanyShare": 93289.08,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 93289.08,
      "currency": "پوند انگلیس"
  },
  {
      "field": "مهندسی",
      "deferredLossOfCompanyShare": 85138,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 85138,
      "currency": "دلار آمریکا"
  },
  {
      "field": "مهندسی",
      "deferredLossOfCompanyShare": 67485527.109,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 67485527.109,
      "currency": "روپیه هند"
  },
  {
      "field": "مهندسی",
      "deferredLossOfCompanyShare": 109234.05,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 109234.05,
      "currency": "یورو"
  },
  {
      "field": "مهندسی",
      "deferredLossOfCompanyShare": 2815.03,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 2815.03,
      "currency": "درهم امارات"
  },
  {
      "field": "مهندسی",
      "deferredLossOfCompanyShare": 6573.15,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 6573.15,
      "currency": "ریال عمان"
  },
  {
      "field": "مهندسی",
      "deferredLossOfCompanyShare": 3381.73,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 3381.73,
      "currency": "دینار كویت"
  },
  {
      "field": "مهندسی",
      "deferredLossOfCompanyShare": 140727.5,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 140727.5,
      "currency": "درهم مراكش"
  },
  {
      "field": "مهندسی",
      "deferredLossOfCompanyShare": 943497840478,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 943497840478,
      "currency": "ریال ایران"
  },
  {
      "field": "اتومبیل(ثالث)",
      "deferredLossOfCompanyShare": 600000000,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 600000000,
      "currency": "ریال ایران"
  },
  {
      "field": "اتومبیل(ثالث)",
      "deferredLossOfCompanyShare": 65976206.57,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 65976206.57,
      "currency": "روپیه هند"
  },
  {
      "field": "اعتباری",
      "deferredLossOfCompanyShare": 179692500,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 179692500,
      "currency": "ریال ایران"
  },
  {
      "field": "مسئولیت",
      "deferredLossOfCompanyShare": 9963740.232,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 9963740.232,
      "currency": "دلار آمریکا"
  },
  {
      "field": "مسئولیت",
      "deferredLossOfCompanyShare": 1985389.689,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 1985389.689,
      "currency": "یورو"
  },
  {
      "field": "مسئولیت",
      "deferredLossOfCompanyShare": 163578632201,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 163578632201,
      "currency": "ریال ایران"
  },
  {
      "field": "حوادث",
      "deferredLossOfCompanyShare": 27378.2,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 27378.2,
      "currency": "پوند انگلیس"
  },
  {
      "field": "حوادث",
      "deferredLossOfCompanyShare": 172.24,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 172.24,
      "currency": "لیره ترکیه"
  },
  {
      "field": "حوادث",
      "deferredLossOfCompanyShare": 4.14,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 4.14,
      "currency": "یورو"
  },
  {
      "field": "بدنه كشتی",
      "deferredLossOfCompanyShare": 47385.14,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 47385.14,
      "currency": "پوند انگلیس"
  },
  {
      "field": "بدنه كشتی",
      "deferredLossOfCompanyShare": 1053345.465,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 1053345.465,
      "currency": "دلار آمریکا"
  },
  {
      "field": "بدنه كشتی",
      "deferredLossOfCompanyShare": 7649556.19,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 7649556.19,
      "currency": "روپیه هند"
  },
  {
      "field": "بدنه كشتی",
      "deferredLossOfCompanyShare": 1004924.85,
      "deferredDamagesShareOfInsurer": 1004924.85,
      "netBalanceOfCompanyShare": 0,
      "currency": "یورو"
  },
  {
      "field": "بدنه كشتی",
      "deferredLossOfCompanyShare": 1.82,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 1.82,
      "currency": "دینار كویت"
  },
  {
      "field": "بدنه كشتی",
      "deferredLossOfCompanyShare": 82.41,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 82.41,
      "currency": "لیره ترکیه"
  },
  {
      "field": "بدنه كشتی",
      "deferredLossOfCompanyShare": 104015634390,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 104015634390,
      "currency": "ریال ایران"
  },
  {
      "field": "هواپیما",
      "deferredLossOfCompanyShare": 14330300,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 14330300,
      "currency": "روپیه هند"
  },
  {
      "field": "هواپیما",
      "deferredLossOfCompanyShare": 24272.84,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 24272.84,
      "currency": "دلار آمریکا"
  },
  {
      "field": "هواپیما",
      "deferredLossOfCompanyShare": 3749.2,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 3749.2,
      "currency": "یورو"
  },
  {
      "field": "هواپیما",
      "deferredLossOfCompanyShare": 35.13,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 35.13,
      "currency": "لیره ترکیه"
  },
  {
      "field": "هواپیما",
      "deferredLossOfCompanyShare": 130469847112,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 130469847112,
      "currency": "ریال ایران"
  },
  {
      "field": "تمام خطر ",
      "deferredLossOfCompanyShare": 26577,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 26577,
      "currency": "دلار آمریکا"
  },
  {
      "field": "وقفه در کار",
      "deferredLossOfCompanyShare": 994433400,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 994433400,
      "currency": "ریال ایران"
  },
  {
      "field": "درمان",
      "deferredLossOfCompanyShare": 27000000000,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 27000000000,
      "currency": "ریال ایران"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 315780.9,
      "deferredDamagesShareOfInsurer": 1823,
      "netBalanceOfCompanyShare": 313957.9,
      "currency": "پوند انگلیس"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 21316799.562,
      "deferredDamagesShareOfInsurer": 4512380.28,
      "netBalanceOfCompanyShare": 16804419.281999998,
      "currency": "دلار آمریکا"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 383017658.599,
      "deferredDamagesShareOfInsurer": 55942973.55,
      "netBalanceOfCompanyShare": 327074685.04899997,
      "currency": "روپیه هند"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 60000,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 60000,
      "currency": "دینار اردن"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 90584.26400000001,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 90584.26400000001,
      "currency": "دینار كویت"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 897060.635,
      "deferredDamagesShareOfInsurer": 48889.27,
      "netBalanceOfCompanyShare": 848171.365,
      "currency": "رینگیت مالزی"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 62564.15,
      "deferredDamagesShareOfInsurer": 55991,
      "netBalanceOfCompanyShare": 6573.1500000000015,
      "currency": "ریال عمان"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 2053762.18,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 2053762.18,
      "currency": "درهم امارات"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 9172885.46,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 9172885.46,
      "currency": "دینار الجزایر"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 283038.65,
      "deferredDamagesShareOfInsurer": 283038.65,
      "netBalanceOfCompanyShare": 0,
      "currency": "دلار استرالیا"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 5909582.6389999995,
      "deferredDamagesShareOfInsurer": 1683956.0099999998,
      "netBalanceOfCompanyShare": 4225626.629,
      "currency": "یورو"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 4419269281933,
      "deferredDamagesShareOfInsurer": 2618755029000,
      "netBalanceOfCompanyShare": 1800514252933,
      "currency": "ریال ایران"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 281290335.95,
      "deferredDamagesShareOfInsurer": 281290335.95,
      "netBalanceOfCompanyShare": 0,
      "currency": "روپیه اندونزی"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 279492.5,
      "deferredDamagesShareOfInsurer": 279492.5,
      "netBalanceOfCompanyShare": 0,
      "currency": "شلینگ کنیا"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 272613,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 272613,
      "currency": "دینار تونس"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 283326.54000000004,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 283326.54000000004,
      "currency": "درهم مراكش"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 54950946.13,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 54950946.13,
      "currency": "فرانك جامعه آفریقایی"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 22041679,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 22041679,
      "currency": "پزو دومنیکن"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 289.78000000000003,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 289.78000000000003,
      "currency": "لیره ترکیه"
  },
  {
      "field": "جمع كل",
      "deferredLossOfCompanyShare": 2246335.61,
      "deferredDamagesShareOfInsurer": 0,
      "netBalanceOfCompanyShare": 2246335.61,
      "currency": "بوتانیس نگولتروم"
  }
]

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

  getFormInfo(): any[] {
    return formInfo;
  }
}
