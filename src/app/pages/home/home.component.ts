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
    this.dataSource = addTransactionService.getFormListData().filter(
      item => item.status == "در انتظار تایید"
    );
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
