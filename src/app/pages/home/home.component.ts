import { Component } from '@angular/core';
import { AddtransactionService, FormList } from '../addtransaction/addtransaction.service';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {

  dataSource: FormList[];

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
}
