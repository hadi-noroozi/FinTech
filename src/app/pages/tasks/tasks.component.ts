import { Component } from '@angular/core';
import 'devextreme/data/odata/store';

import { AddtransactionService, FormList } from '../addtransaction/addtransaction.service';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: [ './tasks.component.scss' ]
})

export class TasksComponent {
  dataSource: FormList[];
  popupVisible2 = false;
  popup2Title: String;
  popup2Content: String;

  userInfo: any;
  public user: any;

  constructor( 
    addTransactionService: AddtransactionService,
    authService: AuthService,
  ) {
    this.userInfo = authService.getUser();
    this.user = this.userInfo.__zone_symbol__value.data;    
    this.dataSource = addTransactionService.getFormListData();
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
}
