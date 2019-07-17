import {Component,OnInit} from '@angular/core';
import {
  UserService
} from './service';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
	
	private noNavFlg : boolean;
	private currentUrl : number;
	
	constructor(private router: Router,
	private userService: UserService) { }
  
    ngOnInit() {
		this.router.events.subscribe((event: Event) => {
			//console.log(event);
			if (event instanceof NavigationEnd ) {
				
				//this.currentUrl=event.url;
				
				if(event.urlAfterRedirects=="/404" || event.urlAfterRedirects=="/403" || event.urlAfterRedirects=="/resetPassword"){
					this.noNavFlg = true;
				}
				else if(event.urlAfterRedirects.includes("chats"))
				{
					this.currentUrl = 1;
				}
				else if(event.urlAfterRedirects.includes("blogs"))
				{
					this.currentUrl = 2;
				}
				else{
					this.noNavFlg = false;
				}
				
				//console.log(event.urlAfterRedirects);
				//console.log(this.noNavFlg);
			}
		});
	}
	
  	loggedIn() {
		return !!this.userService.currentUser;
	}
}
