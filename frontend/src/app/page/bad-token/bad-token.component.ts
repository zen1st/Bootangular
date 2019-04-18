import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from 'app/service/index';
import { DisplayMessage } from 'app/shared/models/display-message';
import { Subject } from 'rxjs/Subject';
import { Title }     from '@angular/platform-browser';
@Component({
  selector: 'app-bad-token',
  templateUrl: './bad-token.component.html',
  styleUrls: ['./bad-token.component.css']
})
export class BadTokenComponent implements OnInit, OnDestroy {

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
	private activatedRoute: ActivatedRoute,
	private authService: AuthService,
	private router: Router,
	) {}

	private message: string;
	expired: string;
	token: string;

	
  ngOnInit() {
	this.titleService.setTitle("Bad Email Verification Page");
	
    this.activatedRoute.params
    .takeUntil(this.ngUnsubscribe)
    .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });

    this.activatedRoute.queryParams.subscribe(params => {
		this.message=params['message'].replace(/\+/g," ");
		this.expired=params['expired'];
		this.token=params['token'];
      });
	  
	  // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
  onClick()
  {
	  this.submitted = true;
	  
		this.authService.resendEmailVerification(this.token)
		// show me the animation
		.delay(1000)
		.subscribe(
			suc => {
					alert(suc.message);
					this.router.navigate([this.returnUrl]);
				},
				err => {
					this.submitted = false;
					this.notification = { msgType: 'error', msgBody: "Invalid token." };
				}
		);

  }
}
