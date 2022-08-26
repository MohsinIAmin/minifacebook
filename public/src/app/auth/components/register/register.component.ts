import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLogin: boolean = false;
  username: string = '';
  password: string = '';
  errorUsername: boolean = false;
  errorPassword: boolean = false;
  successMessage: string = '';

  constructor(private _auth: AuthService, private _api: ApiService, private _router: Router) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  private validate(): boolean {
    if (!this.username.length) {
      this.errorUsername = true;
    } else {
      this.errorUsername = false;
    }
    if (!this.password.length) {
      this.errorPassword = true;
    } else {
      this.errorPassword = false;
    }
    if (!this.errorUsername && !this.errorPassword) {
      return true;
    }
    return false;
  }

  signup() {
    if (!this.validate()) {
      return;
    }
    this._api.postTypeRequest('user/register', { email: this.username, password: this.password }).subscribe((res: any) => {
      const status = res.status;
      if (status == 201) {
        this._router.navigate(['login']);
      } else if (status == 409) {
        this.successMessage = "Email already taken";
      } else if (status == 500) {
        this.successMessage = "An error occured. Please try again";
      } else if (status == 400) {
        this.successMessage = "All input required";
      } else {
        this.successMessage = "Broken";
      }
    });
  }

  private isUserLogin() {
    if (this._auth.getToken() != null) {
      this.isLogin = true;
    }
  }

  logout() {
    this._auth.clearStorage();
    this.isLogin = false;
    this._router.navigate(['register']);
  }

}
