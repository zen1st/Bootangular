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
	
	private flg : boolean;
	
	constructor(private router: Router,
	private userService: UserService) { }
  
    ngOnInit() {
		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd ) {
				if(event.url=="/404" || event.url=="/403" || event.url=="/resetPassword"){
					this.flg = true;
				}else{
					this.flg = false;
				}
			}
		});
	}
	
  	loggedIn() {
		return !!this.userService.currentUser;
	}
}
