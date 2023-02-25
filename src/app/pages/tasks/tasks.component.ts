import { Component } from '@angular/core';
import notify from 'devextreme/ui/notify';

import { AddtransactionService, FormList } from '../addtransaction/addtransaction.service';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: [ './tasks.component.scss' ]
})

export class TasksComponent {
  dataSource: FormList[];
  popupVisible2 = false;
  popupInfoTitle: string;
  popupVisibleInfo = false;
  popupEvents= false;
  popup2Title: String;
  popup2Content: String;

  public popupInfo: any;
  public popupInfoFormData: any[];
  public arrayKey2: any;
  public formItem2: any[];
  public colCountByScreen: any;

  popupVisible = false;
  popupEventsTitle: String;
  popupEventsData: any[];
  private comment: String;
  comments: any[] = [];
  mentionUsers: any[];

  userInfo: any;
  public user: any;
  public statuses: any[];
  popupOption: any;

  constructor( 
    private addTransactionService: AddtransactionService,
    private authService: AuthService,
  ) {
    this.userInfo = authService.getUser();
    this.user = this.userInfo.__zone_symbol__value.data;    

    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3
    };

    this.statuses = [{
        text: 'تایید شده',
        value: ['status', '=', '200'],
      }, {
        text: 'در انتظار ویرایشگر',
        value: ['status', '=', '0'],
      }, {
        text: 'منتظر تایید',
        value: ['status', '=', '100'],
      }
    ];

    this.popupOption = {
      cancel: 'لغو',
      ok: 'تایید',
    };
  }

  ngOnInit() {
   
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

  showDescription(id) {
    this.popup2Title = "توضیحات " + this.dataSource.filter(item => item.id == id )[0].title;
    this.popup2Content = this.dataSource.filter(item => item.id == id )[0].description;
    this.popupVisible2 = true;
  }

  goToLink(id: Number){
    //window.open(id, "_blank");
    let data = {
      'token': this.user.token,
      'form_id': id
    }

    this.addTransactionService.getFormDataSet(data).then(res => {
      if(res.status == 200) {
        window.open(`https://arz-yab.ir/iic_finance/uploads/excel/${res.data.file_url}`, "_blank");
      } else if(res.status == 404) {
        notify("حساب کاربری شما معتبر نمی باشد، لطفا دوباره وارد شود", 'error', 2000)
        this.authService.logOut();
      } else if(res.status == 300) {
        notify("کاربر شما دسترسی مشاهده اطلاعات این فرم را ندارد", 'error', 2000)
      } else {
        notify("با عرض پوزش، در دریافت اطلاعات این فرم مشکلی به وجود آمده است", 'error', 2000)
      } 
    })
  }

  StatusValidatior(rowData) {
    return rowData;
  }
  
  showEvents(id) {
    this.popupEventsTitle = "تاریخچه رویدادهای | " + this.dataSource.filter(item => item.id == id )[0].title;

    let data = {
      'token': this.user.token,
      'form_id': id
    }
    this.addTransactionService.getEventsData(data).then(res => {
      if(res.status == 200) {
        this.popupEventsData = res.data;
        this.popupEvents = true;
      } else if(res.status == 404) {
        notify("حساب کاربری شما معتبر نمی باشد، لطفا دوباره وارد شود", 'error', 2000)
        this.authService.logOut();
      } else if(res.status == 300) {
        notify("کاربر شما دسترسی مشاهده اطلاعات این فرم را ندارد", 'error', 2000)
      } else {
        notify("با عرض پوزش، در دریافت اطلاعات این فرم مشکلی به وجود آمده است", 'error', 2000)
        this.popupEventsData = null;
      }
    });

    //this.popup2Content = this.dataSource.filter(item => item.id == id )[0].comment;

  }

  // getData(rowData) {
  //   this.arrayKey2 = [];
  //   this.popupVisibleInfo = true;
  //   this.popupInfo = rowData.data;
  //   this.popupInfoTitle = "فرم " + rowData.data.title;

  //   this.formItem2 = [    
  //     {
  //       itemType: "group",
  //       colSpan: 1,
  //       colCount: 2,
  //       label: {
  //         text: (rowData.data.status != "100") ? "وضعیت فرم" : "آیا اطلاعات و مشخصات فرم را تایید می کنید؟",
  //       },
  //       items: [
  //         {
  //           visible: (rowData.data.status == "100"),
  //           editorType: 'dxButton',
  //           editorOptions: {
  //             width: '100%',
  //             icon: 'check',
  //             type:"success",
  //             stylingMode: 'outlined',
  //             text: "بلی",
  //             onClick() {
  //               this.popupInfo = {...this.popupInfo ,status: "200"};
  //             },
  //           },
  //           label: {
  //             visible: false,
  //           },
  //         },
  //         {
  //           visible: (rowData.data.status == "100"),
  //           editorType: 'dxButton',
  //           editorOptions: {
  //             width: '100%',
  //             icon: 'close',
  //             type:"danger",
  //             stylingMode: 'outlined',
  //             text: "خیر",
  //             onClick() {
  //               this.popupInfo = {...this.popupInfo ,status: "0"};
  //             },
  //           },
  //           label: {
  //             visible: false,
  //           },
  //         },
  //         {
  //           visible: (rowData.data.status != "100"),
  //           editorType: "dxTextBox",
  //           colSpan: 2,
  //           editorOptions: {
  //             value: (rowData.data.status == "0") ? 'در انتظار ویرایشگر' : "تایید شده",
  //             readOnly: true,
  //             stylingMode: 'filled'
  //           },
  //           label: {
  //             visible: false
  //           }
  //         },
  //       ]
  //     }, 
  //     {
  //       colSpan:2
  //     },  
  //     {
  //       dataField: 'id',
  //       editorType: "dxTextBox",
  //       editorOptions: {
  //         readOnly: true,
  //         stylingMode: 'filled'
  //       },
  //       label: {
  //         text: "کد فرم",
  //       }
  //     },
  //     {
  //       dataField: 'title',
  //       editorType: "dxTextBox",
  //       colSpan: 2,
  //       editorOptions: {
  //         readOnly: true,
  //         stylingMode: 'filled',
  //       },
  //       label: {
  //         text: "عنوان فرم",
  //       }
  //     },
  //     {
  //       dataField: 'category',
  //       editorType: "dxTextBox",
  //       editorOptions: {
  //         stylingMode: 'filled',
  //         readOnly: true,
  //         placeholder:"نوع فرم را تعیین کنید",
  //       },
  //       label: {
  //         text: "دسته بندی",
  //       }
  //     },
  //     {
  //       dataField: 'creatingDate',
  //       editorType: "dxDateBox",
  //       editorOptions: {
  //         readOnly: true,
  //         stylingMode: 'filled',
  //         displayFormat:'yyyy/MM/dd',

  //       },
  //       label: {
  //         text: "تاریخ ایجاد",
  //       }
  //     },
  //     {
  //       dataField: 'editor',
  //       editorType: "dxTextBox",
  //       editorOptions: {
  //         readOnly: true,
  //         stylingMode: 'filled',
  //       },
  //       label: {
  //         text: "ویرایش کننده",
  //       }
  //     },
  //     {
  //       dataField: 'validator',
  //       editorType: "dxTextBox",
  //       editorOptions: {
  //         placeholder:"کاربر ناظر را تعیین کنید",
  //         stylingMode: 'filled',
  //         readOnly: true,
  //       },
  //       label: {
  //         text: "ناظر",
  //       }
  //     },
  //     {
  //       dataField: 'fiscalYear',
  //       editorType: "dxTextBox",
  //       editorOptions: {
  //         maxLength: 200,
  //         readOnly: true,
  //         placeholder:"سال مالی را وارد کنید",
  //         stylingMode: 'filled',
  //       },
  //       label: {
  //         text: "سال مالی",
  //       }
  //     },  
  //     {
  //       dataField: 'fiscalPeriod',
  //       editorType: "dxTextBox",
  //       editorOptions: {
  //         maxLength: 200,
  //         placeholder:"دوره مالی را وارد کنید",
  //         readOnly: true,
  //         stylingMode: 'filled',
  //       },
  //       label: {
  //         text: "دوره مالی",
  //       }
  //     },      
  //     {
  //       dataField: 'description',
  //       editorType: 'dxTextBox',
  //       colSpan: 2,
  //       editorOptions: {
  //         placeholder:"توضیحات پیوست را وارد کنید",
  //         stylingMode: 'filled',
  //         readOnly: true,
  //       },
  //       label: {
  //         text: "توضیحات",
  //       }
  //     }, 
  //     {
  //       dataField: 'address',
  //       editorType: 'dxButton',
  //       editorOptions: {
  //         icon: 'download',
  //         type:"success",
  //         cssClass:"ml-auto",
  //         onClick() {
  //           this.goToLink(rowData.data.address)
  //         },
  //       },
  //       label: {
  //         text: "لینک دانلود"
  //       }
  //     }     
  //   ]

  //   this.popupInfoFormData = this.addTransactionService.getFormInfo();
  //   for (const [key, value] of Object.entries(this.popupInfoFormData[0])) {
  //     this.arrayKey2.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
  //   }    
  // }

  
  getData(rowData) {
    this.arrayKey2 = [];
    this.popupVisibleInfo = true;
    this.popupInfo = rowData.data;
    this.popupInfoTitle = "فرم " + rowData.data.title;
    const token = this.user.token;
    const addTransactionService = this.addTransactionService;
    
    this.formItem2 = [    
      {
        itemType: "group",
        colSpan: 1,
        colCount: 2,
        label: {
          text: (rowData.data.status != "100") ? "وضعیت فرم" : "آیا اطلاعات و مشخصات فرم را تایید می کنید؟",
        },
        items: [
          {
            visible: (rowData.data.status == "100"),
            editorType: 'dxButton',
            editorOptions: {
              width: '100%',
              icon: 'check',
              type:"success",
              stylingMode: 'outlined',
              text: "بلی",
              onClick() {
                let data = {
                  'answer': 'accept',
                  'token': token,
                  'form_id': rowData.data.id
                }
                const reply = "تایید شده" ;
                addTransactionService.addAnswer(data).then(res => {
                  if(res.status == 200) {
                    this.popupInfo = {...this.popupInfo ,status: "200"};
                    notify(`کاربر گرامی فرم ${data.form_id} در وضعیت ${reply} قرار داده شد`, 'success', 2000)
                    setTimeout(function(){
                      location.reload()
                    },2100);
                  }else if(res.status == 404) {
                    notify("حساب کاربری شما معتبر نمی باشد، لطفا دوباره وارد شود", 'error', 2000)
                    this.authService.logOut();
                  } else if(res.status == 300) {
                    notify("حساب شما دسترسی انجام این فرآیند را ندارد", 'error', 2000)
                  } else {
                    notify("با عرض پوزش، در اجرای این فرآیند مشکلی به وجود آمده است", 'error', 2000)
                  }
                })
              },
            },
            label: {
              visible: false,
            },
          },
          {
            visible: (rowData.data.status == "100"),
            editorType: 'dxButton',
            editorOptions: {
              width: '100%',
              icon: 'close',
              type:"danger",
              stylingMode: 'outlined',
              text: "خیر",
              onClick() {
                let data = {
                  'answer': 'reject',
                  'token': token,
                  'form_id': rowData.data.id
                }
                const reply = "نیازمند ویرایش" ;
                addTransactionService.addAnswer(data).then(res => {
                  if(res.status == 200) {
                    this.popupInfo = {...this.popupInfo ,status: "0"};
                    notify(`کاربر گرامی فرم ${data.form_id} در وضعیت ${reply} قرار داده شد`, 'success', 2000)
                    setTimeout(function(){
                      location.reload()
                    },2100);
                  }else if(res.status == 404) {
                    notify("حساب کاربری شما معتبر نمی باشد، لطفا دوباره وارد شود", 'error', 2000)
                    this.authService.logOut();
                  } else if(res.status == 300) {
                    notify("حساب شما دسترسی انجام این فرآیند را ندارد", 'error', 2000)
                  } else {
                    notify("با عرض پوزش، در اجرای این فرآیند مشکلی به وجود آمده است", 'error', 2000)
                  }
                })
              },
            },
            label: {
              visible: false,
            },
          },
          {
            visible: (rowData.data.status != "100"),
            editorType: "dxTextBox",
            colSpan: 2,
            editorOptions: {
              value: (rowData.data.status == "0") ? 'در انتظار ویرایشگر' : "تایید شده",
              readOnly: true,
              stylingMode: 'filled'
            },
            label: {
              visible: false
            }
          },
        ]
      }, 
      {
        dataField: 'address',
        editorType: 'dxButton',
        editorOptions: {
          icon: 'download',
          type:"success",
          text:'دانلود فرم',
          cssClass:"ml-auto",
          onClick() {
            window.open(`https://arz-yab.ir/iic_finance/uploads/excel/${address}`, "_blank");
          },
        },
        label: {
          text: "لینک دانلود"
        },
        colSpan:2
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
        editorType: "dxTextBox",
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
        dataField: 'lastEditDate',
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
          stylingMode: 'filled',
          displayFormat:'yyyy/MM/dd',
        },
        label: {
          text: "تاریخ آخرین ویرایش",
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
      }  
    ];

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

    let address;

    this.addTransactionService.getFormDataSet(data).then(res => {
      if(res.status == 200) {
        address = res.data.file_url;
        this.popupInfoFormData = JSON.parse(res.data.content);
        if(typeof this.popupInfoFormData == 'object') {
          for (const [key, value] of Object.entries(this.popupInfoFormData[0])) {
            this.arrayKey2.push(JSON.parse(`{"key": "${key}" , "type": "${typeof value}"}`))
          }
        }
      } else if(res.status == 404) {
        notify("حساب کاربری شما معتبر نمی باشد، لطفا دوباره وارد شود", 'error', 2000)
        this.authService.logOut();
      } else if(res.status == 300) {
        notify("کاربر شما دسترسی مشاهده اطلاعات این فرم را ندارد", 'error', 2000)
      } else {
        notify("با عرض پوزش، در دریافت اطلاعات این فرم مشکلی به وجود آمده است", 'error', 2000)
        this.popupInfoFormData = null;
      }
    });

    this.addTransactionService.getEventsData(data).then(res => {
      if(res.status == 200) {
        this.comments = res.data.filter(item => item.status.id == 0);
      } else if(res.status == 404) {
        notify("حساب کاربری شما معتبر نمی باشد، لطفا دوباره وارد شود", 'error', 2000)
        this.authService.logOut();
      } else if(res.status == 300) {
        notify("حساب شما دسترسی مشاهده اطلاعات این فرم را ندارد", 'error', 2000)
      } else {
        notify("با عرض پوزش، در دریافت اطلاعات این فرم مشکلی به وجود آمده است", 'error', 2000)
        this.comments = null
      }
    });
  }

  answer(id: Number, type: String) {
    let data = {
      'answer': type,
      'token': this.user.token,
      'form_id': id
    }
    const reply = (type == 'accept') ? "تایید شده" : "در انتظار ویرایش";
    this.addTransactionService.addAnswer(data).then(res => {
      if(res.status == 200) {
        notify(`کاربر گرامی فرم ${data.form_id} در وضعیت ${reply} قرار داده شد`, 'success', 2000)
        setTimeout(function(){
          location.reload()
        },2100);
      }else if(res.status == 404) {
        notify("حساب کاربری شما معتبر نمی باشد، لطفا دوباره وارد شود", 'error', 2000)
        this.authService.logOut();
      } else if(res.status == 300) {
        notify("حساب شما دسترسی انجام این فرآیند را ندارد", 'error', 2000)
      } else {
        notify("با عرض پوزش، در اجرای این فرآیند مشکلی به وجود آمده است", 'error', 2000)
      }
    })
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
        notify("دیدگاه شما ثبت شد", 'success', 2000)
        setTimeout(function(){
          location.reload()
        },2100);
      } else {
        notify("در فرایند ثبت دیدگاه شما مشکلی پیش آمد", 'success', 2000)
      }
    })
    
  }

}
