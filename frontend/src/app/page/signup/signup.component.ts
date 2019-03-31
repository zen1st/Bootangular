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

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
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
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
	  email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
	  password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(/(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?\/&gt;.&lt;,])(?!.*\s).*$/)])],
	  matchingPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30), Validators.pattern(/(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?\/&gt;.&lt;,])(?!.*\s).*$/)])],
      firstname:[''],
      lastname: ['']
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  repository() {
    window.location.href = this.githubLink;
  }

  onSubmit() {
    /**
     * Innocent until proven guilty
     */
    this.notification = undefined;
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
	  //console.log("one");
    },
    error => {
		//console.log("two");
      this.submitted = false;
      console.log("Sign up error" + JSON.stringify(error));
      this.notification = { msgType: 'error', msgBody: error['error'].errorMessage };
    });

  }


}

function cVal(control)
{
	//console.log();
	//http://regexlib.com/Search.aspx?k=strong%20password&AspxAutoDetectCookieSupport=1
	if(/(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?\/&gt;.&lt;,])(?!.*\s).*$/.test(control.value))
	{
		console.log("yes");
		return { cVal: true};
	}
	console.log("no");
	return { cVal: false };
}