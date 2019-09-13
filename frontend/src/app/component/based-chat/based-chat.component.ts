import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation, ViewChild, Inject, AfterViewChecked, ElementRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router, RouterOutlet , ActivationStart  } from '@angular/router'
import {
  UserService,
  AuthService
} from 'app/service';
import { AdminGuard } from 'app/guard/index';
import { DOCUMENT } from '@angular/platform-browser';
declare var $:any;

@Component({
  selector: 'app-based-chat',
  templateUrl: './based-chat.component.html',
  styleUrls: ['./based-chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BasedChatComponent implements OnInit {
	mobileQuery: MediaQueryList;

	fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

	fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

	private _mobileQueryListener: () => void;

	@ViewChild(RouterOutlet) outlet: RouterOutlet;

	private chatRooms = [
		{
			"id":2,
			"name":"chat2", 
			"chatMessages":
			[
				{
					"username":"u1",
					"message":"m1"
				},
				{
					"username":"u2",
					"message":"m2"
				},
				{
					"username":"u2",
					"message":"m3"
				},
				{
					"username":"u2",
					"message":"m4"
				},
				{
					"username":"u2",
					"message":"m5"
				},
				{
					"username":"u2",
					"message":"m6"
				},
				{
					"username":"u2",
					"message":"m7"
				},
				{
					"username":"u2",
					"message":"m8"
				},
				{
					"username":"u2",
					"message":"m9"
				},
				{
					"username":"u2",
					"message":"m10"
				},
				{
					"username":"u2",
					"message":"m11"
				},
				{
					"username":"u2",
					"message":"m12 Chat 1ddddddddddddddddddddddddddddddddddddddddddddddddddd dfdfdfdfdfdfd dfdfdfdfdfd dfdfd"
				}
				
			]
		},
		{
			"id":1,
			"name":"Chat 1ddddddddddddddddddddddddddddddddddddddddddddddddddd dfdfdfdfdfdfd dfdfdfdfdfd dfdfd", 
			"chatMessages":
			[
				{
					"username":"u1",
					"message":"m1"
				},
				{
					"username":"u2",
					"message":"m2"
				}
			]
		}];
	
	private currentChatIndex = 0;
	
	@ViewChild('scrollMe') private myScrollContainer: ElementRef;
	 
		
	constructor(changeDetectorRef: ChangeDetectorRef, 
		media: MediaMatcher, 
		@Inject(DOCUMENT) private document,
		private router : Router,
		private authService : AuthService,
		private userService : UserService,
		private adminGuard : AdminGuard) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit() {
		this.router.events.subscribe(e => {
			//if (e instanceof ActivationStart && e.snapshot.outlet === "chats") this.outlet.deactivate();
			if (e instanceof ActivationStart)this.outlet.deactivate();
		});
		
		this.scrollToBottom();

	}
  
	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
  
    userName() {
		const user = this.userService.currentUser;
		//return user.firstName + ' ' + user.lastName;
		return user.username;
	}
  
	logout() {
		this.authService.logout().subscribe(res => {
		  this.router.navigate(['/']);
		});
	}

	clickChat(i){
		this.currentChatIndex = i;
	}
	
	
	ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }
}