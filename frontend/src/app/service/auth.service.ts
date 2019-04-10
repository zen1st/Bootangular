import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private config: ConfigService,
  ) { }

  login(user) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `username=${user.username}&password=${user.password}&rememberMe=${user.rememberMe}`;
    return this.apiService.post(this.config.login_url, body, loginHeaders).map(() => {
      console.log("Login success");
      this.userService.getMyInfo().subscribe();
    });
  }

  signup(user){
    const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.signup_url, JSON.stringify(user), signupHeaders).map(() =>{
      console.log("Sign up success");
    });
  }
  
  logout() {
    return this.apiService.post(this.config.logout_url, {})
      .map(() => {
        this.userService.currentUser = null;
      });
  }
  
  changePassword(passwordChanger) {
    return this.apiService.post(this.config.change_password_url, passwordChanger);
  }

  resendEmailVerification(token) {
    return this.apiService.get(this.config.resend_email_verification_url+"?token="+token);
  }
  
}
