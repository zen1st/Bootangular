import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';

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
	
    return this.apiService.post(this.config.login_url, body, loginHeaders).map((data) => {
		console.log("Login success");
		
		//console.log(user);
		
		this.userService.getMyInfo().subscribe();
		
		
		if(!user.rememberMe)
		{
			//console.log(data.expires_in);
			
			localStorage.setItem("rememberMe","false");

			setTimeout(()=>{    //<<<---    using ()=> syntax
				//setInterval(()=>{this.apiService.get(this.config.refresh_token_url).toPromise()}, (data.expires_in-2)*1000);
				let subscribe = interval((data.expires_in-2)*1000).subscribe(val => this.apiService.get(this.config.refresh_token_url).toPromise())
			}, 1000);
			
		}

    });
  }

  signup(user){
	/*
    const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
	*/
	const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
	
	const body = `username=${user.username}&email=${user.email}&password=${user.password}&matchingPassword=${user.matchingPassword}&recaptchaResponse=${user.recaptchaResponse}`;
	
	//const body = `recaptchaResponse=${user.recaptchaResponse}`;
	
    //return this.apiService.post(this.config.signup_url, JSON.stringify(user), signupHeaders).map(() =>{
    return this.apiService.post(this.config.signup_url, body, signupHeaders).map(() =>{
      console.log("Sign up success");
    });
  }
  
  logout() {
    return this.apiService.post(this.config.logout_url, {})
      .map(() => {
        this.userService.currentUser = null;
		
			//console.log(localStorage.getItem("rememberMe"));
			
			if(localStorage.getItem("rememberMe")!=null && localStorage.getItem("rememberMe")=="false"){
				localStorage.removeItem('rememberMe');
			}  
      });
  }

  sendResetPasswordEmail(email) {
	  
	const resetPasswordHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
	
	//const body = `email=${email}`;
	const body = {"email":email};
	
    return this.apiService.post(this.config.send_reset_password_email_url+"?email="+email, body, resetPasswordHeaders);
  }
  
  resetPassword(id, token, passwordChanger) {
	  
	const resetPasswordHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
	
    return this.apiService.post(this.config.reset_password_url+"?id="+id+"&token="+token, passwordChanger, resetPasswordHeaders);
  }
  
  
  resendEmailVerification(token) {
    return this.apiService.get(this.config.resend_email_verification_url+"?token="+token);
  }
  
}
