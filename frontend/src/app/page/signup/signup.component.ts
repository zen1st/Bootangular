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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit, OnDestroy {
  title = 'Sign up';
  githubLink = 'https://github.com/zen1st/Bootangular';
  form: FormGroup;

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
  ) {

  }

  ngOnInit() {
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])],
	  email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
	  // /(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?\/&gt;.&lt;,])(?!.*\s).*$/
	  password: ['', Validators.compose([Validators.pattern(/(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)])],
	  matchingPassword: ['', Validators.compose([Validators.pattern(/(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)])],
      firstname:['', Validators.compose([Validators.required, Validators.minLength(1)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
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
	
	if(!this.emailPattern.test(this.form.value.email) && this.form.value.email){
		str += "The email format is not valid. </br>";
	}
	
	if((this.form.value.password.length < 8 || this.form.value.password.length > 30) && this.form.value.password){
		str += "Password length have to be between 8 and 30. </br>";
	}

	if(!this.hasLowerCase(this.form.value.password) && this.form.value.password){
		str += "Password have to include a lower case character. </br>";
	}
	
	if(!this.hasUpperCase(this.form.value.password) && this.form.value.password){
		str += "Password have to include an upper case character. </br>";
	}

	if(this.form.value.password !==  this.form.value.matchingPassword && this.form.value.matchingPassword){
		str += "Password doesn't match. </br>";
	}
	
	this.notification = { msgType: 'error', msgBody: str };
  }
  
  onSubmit() {
    /**
     * Innocent until proven guilty
     */
	this.notification = { msgType: undefined, msgBody: undefined };
	
    this.submitted = true;

    this.authService.signup(this.form.value)
    // show me the animation
    .delay(1000)
    .subscribe(data => {
      console.log(data);
      this.authService.login(this.form.value).subscribe(data =>{
        this.userService.getMyInfo().subscribe();
      })
	  alert("Please check your email to verify.");
      this.router.navigate([this.returnUrl]);
    },
    error => {
      this.submitted = false;
      //console.log("Sign up error" + JSON.stringify(error));
      this.notification = { msgType: 'error', msgBody: error.error.message };
    });

  }


}