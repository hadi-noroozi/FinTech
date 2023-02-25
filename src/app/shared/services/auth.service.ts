import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

const defaultPath = '/';
const defaultUser = {
  ID: 15200144,
  email: 'alirezaomrani@iic.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/07.png',
  FirstName: 'علیرضا',
  LastName: 'عمرانی',
  name: "علیرضا عمرانی",
  Position: 'کارشناس',
  PositionId: 2,
  role: 'user',
  BirthDate: new Date('1974/11/15').toLocaleString('fa-IR').split("،")[0],
  HireDate: new Date('2005/05/11').toLocaleString('fa-IR').split("،")[0],
  /* tslint:disable-next-line:max-line-length */
  Notes: 'معاون بخش آمار و اطلاعات بیمه ایران',
  categoryCode: 1,
  validatorId: 1
};

const adminUser = {
  ID: 1,
  email: 'nastarankolahchi@iic.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/04.png',
  FirstName: 'نسترن',
  LastName: 'کلاهچی',
  name: "نسترن کلاهچی",
  Position: 'ناظر',
  PositionId: 1,
  role: 'admin',
  BirthDate: new Date('1974/11/15').toLocaleString('fa-IR').split("،")[0],
  HireDate: new Date('2005/05/11').toLocaleString('fa-IR').split("،")[0],
  /* tslint:disable-next-line:max-line-length */
  Notes: 'مدیریت بخش آمار و اطلاعات بیمه ایران',
  categoryCode: '',
  validatorId: 1
};

@Injectable()
export class AuthService {
  //private _user = defaultUser;
  private _user;
 
  private resourceUrl = 'https://arz-yab.ir/iic_finance/API/v0.1/controller.php?login';

  get loggedIn(): boolean {
    if(localStorage.getItem('STATE')) {
      this._user = JSON.parse(localStorage.getItem('USER'));
    }
    
    return !!this._user;
  }

  get rememberMe(): string {
    if(localStorage.getItem('AUTH_ATTRIBUTES')) {
      return localStorage.getItem('AUTH_ATTRIBUTES')
    } else {
      return null
    }
  }

  get role(): string {
    return JSON.parse(localStorage.getItem('USER')).role;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(
    private router: Router
  ) { }

  async logIn(
    email: string, 
    password: string, 
    rememberMe: boolean, 
    forgotMe: boolean
    ) {

    try {
      // Send request
      // console.log(email, password);
      // this.router.navigate(['addform']);
      // return {
      //   isOk: true,
      //   data: this._user
      // };

      const body = {
        'username': email,
        'password': password
      }
      const config = {
          method: 'POST',
          body: this.getFormData(body)
      }
      let result;
      const response = await fetch(this.resourceUrl, config)
                        .then((response) => response.json())
                        .then((res) => {
                          if(res.status == 200) {
                            this._user = res.data;
                            const routePath = (res.data.role == "user") ? 'addform' : this._lastAuthenticatedPath;
                            this.router.navigate([routePath]);
                            localStorage.setItem('STATE', 'true');
                            localStorage.setItem('USER', JSON.stringify(this._user));
                            if(rememberMe) {
                              localStorage.setItem('AUTH_ATTRIBUTES', JSON.stringify(
                                {
                                  email: email,
                                  password: password
                                }
                              ));
                            }
                            if(forgotMe) {
                              localStorage.removeItem('AUTH_ATTRIBUTES')
                            }
                            result = {
                              isOk: true,
                              data: this._user
                            };
                            
                          } else {
                            result = {
                              isOk: false,
                              message: "حساب کاربری یا گذرواژه صحیح نمی باشد"
                            };
                          }
                        });
      
      return result;

      // if(email == defaultUser.email && password == 'Aa123!@#') {
      //   this._user = { ...defaultUser, email };
      //   this.router.navigate(['addform']);
      //   localStorage.setItem('STATE', 'true');
      //   localStorage.setItem('USER', JSON.stringify(this._user));
      //   return {
      //     isOk: true,
      //     data: this._user
      //   };
      // } else if(email == adminUser.email && password == 'Aa12#$') {
      //   this._user = { ...adminUser, email };
      //   this.router.navigate([this._lastAuthenticatedPath]);
      //   localStorage.setItem('STATE', 'true');
      //   localStorage.setItem('USER', JSON.stringify(this._user));
      //   return {
      //     isOk: true,
      //     data: this._user
      //   };
      // } else {
      //   return {
      //     isOk: false,
      //     message: "حساب کاربری یا گذرواژه صحیح نمی باشد"
      //   };
      // }
    }
    catch {
      return {
        isOk: false,
        message: "حساب کاربری یا گذرواژه صحیح نمی باشد"
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false
      };
    }
  }

  async createAccount(email, password) {
    try {
      // Send request
      console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(email: string) {
    try {
      // Send request
      if(email == 'alirezaomrani@iic.com') {
        console.log(email);

        return {
          isOk: true
        };
      } else {
        return {
          isOk: false,
          message: "رایانامه وارد شده معتبر نیست"
        };
      }
    }
    catch {
      return {
        isOk: false,
        message: "در فرآیند تغییر رمز عبور مشکلی پیش  آمده دوباره سعی کنید"
      };
    }
  }

  async logOut() {
    this._user = null;
    localStorage.removeItem('STATE');
    localStorage.removeItem('USER');
    this.router.navigate(['/login-form']);
  }

  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }

}

@Injectable()
export class AuthGuardService implements CanActivate {



  constructor(private router: Router, private authService: AuthService) {
    
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data.role;
    const isLoggedIn = this.authService.loggedIn;

    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig.path);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      const roleUser = this.authService.role;

      if (role && role.indexOf(roleUser) === -1 && roleUser=="user") {
        this.router.navigate(['/addform']);
        return false;
      }

      if (role && role.indexOf(roleUser) === -1 && roleUser=="admin") {
        this.router.navigate(['/home']);
        return false;
      }

      this.authService.lastAuthenticatedPath = route.routeConfig.path;
    }

    return isLoggedIn || isAuthForm;
  }
}



