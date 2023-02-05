import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { 
  DxDataGridModule,
  DxButtonModule,
  DxPopupModule,
  DxScrollViewModule,
  DxTemplateModule,
  DxTabsModule,
  DxTextAreaModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
  DxNumberBoxModule,
  DxFormModule,
  DxToastModule,
  DxSwitchModule,
  DxTextBoxModule
} from 'devextreme-angular';
import { AddtransactionComponent } from './pages/addtransaction/addtransaction.component';
import { GridCellDataPipe } from './grid-cell-data.pipe';


const routes: Routes =  [
  {
    path: 'addform',
    component: AddtransactionComponent,
    canActivate: [ AuthGuardService ],
    data: {
      role: 'user'
    }
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ],
    data: {
      role: ['admin', 'user']
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule ,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTemplateModule,
    DxTabsModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxNumberBoxModule,
    DxFormModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxToastModule,
    DxSwitchModule
    ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent, 
    ProfileComponent, 
    TasksComponent, 
    AddtransactionComponent,
    GridCellDataPipe
  ]
})

export class AppRoutingModule {

  

}
