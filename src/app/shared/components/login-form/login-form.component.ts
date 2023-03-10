import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};
  remembering: boolean;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    if(this.authService.rememberMe) {
      this.formData = JSON.parse(this.authService.rememberMe)
      this.remembering = true;
    } else {
      this.remembering = false;
    }
  }

  async onSubmit(e) {
    e.preventDefault();
    const { email, password, rememberMe, forgotMe } = this.formData;

    this.loading = true;

    const result = await this.authService.logIn(email, password, rememberMe, forgotMe);
    if (!result.isOk) {
      this.loading = false;
      notify(result.message, 'error', 2000);
    }
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ LoginFormComponent ],
  exports: [ LoginFormComponent ]
})
export class LoginFormModule { }
