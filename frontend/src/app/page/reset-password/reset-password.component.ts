import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayMessage } from 'app/shared/models/display-message';
import { Subscription } from 'rxjs/Subscription';
import {
  UserService,
  AuthService
} from 'app/service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  title = 'Reset';
  githubLink = 'https://github.com/zen1st/Bootangular';
  id;
  token;
  form: FormGroup;
  form2: FormGroup;
  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  /**
   * Notification message from received
   * form request or router
   */
  notification: DisplayMessage;

  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

	
	this.route.queryParams.subscribe(params => {
		this.id=params['id'];
		this.token=params['token'];
	});
	  
    this.form = this.formBuilder.group({
	  email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    });

    this.form2 = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
	  matchingPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])]
    });
	  
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  repository() {
    window.location.href = this.githubLink;
  }
  
      hasLowerCase(str) {
        if(str.toUpperCase() != str) {
            return true;
        }
        return false;
  }
  
  hasUpperCase(str) {
        if(str.toLowerCase() != str) {
            return true;
        }
        return false;
  }
  
  onInputChange(e) {  
	
	this.notification = undefined;
  
	let str='';
	
	if((this.form2.value.password.length < 8 || this.form2.value.password.length > 30) && this.form.value.password){
		str += "Password length have to be between 8 and 30. </br>";
	}

	if(!this.hasLowerCase(this.form2.value.password) && this.form2.value.password){
		str += "Password have to include a lower case character. </br>";
	}
	
	if(!this.hasUpperCase(this.form2.value.password) && this.form2.value.password){
		str += "Password have to include an upper case character. </br>";
	}

	if(this.form2.value.password !==  this.form2.value.matchingPassword && this.form2.value.matchingPassword){
		str += "Password doesn't match. </br>";
	}
	
	this.notification = { msgType: 'error', msgBody: str };
  }
  
  onSubmit() {
	  
    this.submitted = true;

	this.authService.sendResetPasswordEmail(this.form.value.email)
    .delay(1000)
    .subscribe(data => {
      alert(data.message);
	  this.router.navigate([this.returnUrl]);
    },
    error => {
      this.submitted = false;
      this.notification = { msgType: 'error', msgBody: error.error.message };
    });
  }
  
  onSubmit2() {
	  
    this.submitted = true;

    this.authService.resetPassword(this.id, this.token, this.form2.value)
    .delay(1000)
    .subscribe(data => {
	  alert(data.message + ", please log in.");
	  this.router.navigate(["/login"]);
    },
    error => {
      this.submitted = false;
	  console.log(error);
      this.notification = { msgType: 'error', msgBody: error.error.message};
    });

  }
}
