import { Inject } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { DisplayMessage } from 'app/shared/models/display-message';
import { Subscription } from 'rxjs/Subscription';
import {
  UserService,
  AuthService
} from 'app/service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { interval } from 'rxjs/observable/interval';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
	//private show : boolean;
	
  title = 'Log in';
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

  constructor(
    private titleService: Title,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
	  
	  

  }

  ngOnInit() {
	//this.titleService.setTitle("Login Page");
	
	//console.log(this.router.url);
	
	//if(this.router.url=="/" || this.router.url=="/login") this.show = true;
	
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	  
	this.route.queryParams.subscribe(params => {
		if(params['message'] && params['message'].includes("success"))
		{
			alert(params['message'].replace(/\+/g," ")+ ", please log in.");
			
			//this.show = true;
		}
	});
	  
	this.form = this.formBuilder.group({
		username: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(64)])],
		password: ['', Validators.required],
		rememberMe: true
		//,recaptchaReactive: ['', Validators.required]
	});
	//console.log(this.form);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onResetCredentials() {
    this.userService.resetCredentials()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(res => {
      if (res.result === 'success') {
        alert('Password has been reset to 123 for all accounts');
      } else {
        alert('Server error');
      }
    });
  }

  repository() {
    window.location.href = this.githubLink;
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
	this.notification = { msgType: undefined, msgBody: undefined };
    this.submitted = true;
	
    this.authService.login(this.form.value)
    // show me the animation
    .delay(1000)
    .subscribe(data => {
		this.router.navigate([this.returnUrl]);
		//window.location.reload();
		//this.router.navigate(['./'], { relativeTo: this.router.parent });
    },
    error => {
		//console.log(error.error.message);
      this.submitted = false;
      this.notification = { msgType: 'error', msgBody: error.error.message };
      //this.notification = { msgType: 'error', msgBody: 'Incorrect username or password.' };
    });

  }


}
