import { Component } from '@angular/core';
import 'devextreme/data/odata/store';

import { AddtransactionService, FormList } from '../addtransaction/addtransaction.service';

@Component({
  templateUrl: 'tasks.component.html',
  styleUrls: [ './tasks.component.scss' ]
})

export class TasksComponent {
  dataSource: FormList[];
  popupVisible2 = false;
  popup2Title: String;
  popup2Content: String;

  constructor( addTransactionService: AddtransactionService,) {
    this.dataSource = addTransactionService.getFormListData();
    // this.dataSource = {
    //   store: {
    //     type: 'odata',
    //     key: 'Task_ID',
    //     url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks'
    //   },
    //   expand: 'ResponsibleEmployee',
    //   select: [
    //     'Task_ID',
    //     'Task_Subject',
    //     'Task_Start_Date',
    //     'Task_Due_Date',
    //     'Task_Status',
    //     'Task_Priority',
    //     'Task_Completion',
    //     'ResponsibleEmployee/Employee_Full_Name'
    //   ]
    // };
  }

  buttonsValidatior(rowData) {
    const result = [rowData.id,rowData.status];
    return result;
  }

  showDescription(id) {
    this.popup2Title = "توضیحات " + this.dataSource.filter(item => item.id == id )[0].title;
    this.popup2Content = this.dataSource.filter(item => item.id == id )[0].description;
    this.popupVisible2 = true;
  }
}
