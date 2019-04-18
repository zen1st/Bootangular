import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/service';
import { Router, ActivatedRoute } from '@angular/router';
import { DisplayMessage } from 'app/shared/models/display-message';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  title = 'Change password';
  githubLink = 'https://github.com/zen1st/Bootangular';
  form: FormGroup;
  /**
   * Boolean used in telling the UI
   * that the form has been submitted
   * and is awaiting a response
   */
  submitted = false;

  /**
   * Diagnostic message from received
   * form request error
   */
  notification: DisplayMessage;
  
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  constructor(
	private titleService: Title,
    private userService: UserService,
    private router: Router,
	private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
	  
	this.titleService.setTitle("Change Password Page");
	
    this.route.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
	// get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
	  matchingPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])]
    });
	
	/*
	    this.form = this.formBuilder.group({
	  oldPassword: ['', Validators.compose([Validators.pattern(/(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)])],
	  password: ['', Validators.compose([Validators.pattern(/(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)])],
	  matchingPassword: ['', Validators.compose([Validators.pattern(/(?=^.{8,30}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)])]
    });*/

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

    this.userService.changePassword(this.form.value)
    // show me the animation
    .delay(1000)
    //.mergeMap(() => this.authService.logout())
	.mergeMap(() => this.router.navigate(['/']))
    .subscribe(() => {
      //this.notification = { msgType: '', msgBody: "Success!"};
      //this.router.navigate(['/login', { msgType: 'success', msgBody: 'Success! Please sign in with your new password.'}]);
    }, error => {
      this.submitted = false;
	  console.log(error);
      //this.notification = { msgType: 'error', msgBody: 'Invalid old password.'};
	  this.notification = { msgType: 'error', msgBody: error.error.message};
    });

  }
  
    repository() {
    window.location.href = this.githubLink;
  }

}
