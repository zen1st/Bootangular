import {Component,OnInit} from '@angular/core';
import {
  UserService
} from './service';
import { Router, Event, NavigationEnd, NavigationError} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
	
	private noNavFlg : boolean;
	private currentUrl : number;
	
	constructor(private router: Router,
		private userService: UserService){ 

		this.router.events.subscribe((event: Event) => {
			
			//console.log(event);
			
			if (event instanceof NavigationEnd ) {
				
				//console.log(event);
				
				this.currentUrl = 0;
				this.noNavFlg = false;
				
				let url = router.url;
				
				if(url=="/404" || 
					url=="/403" || 
					url.includes("/resetPassword") || 
					url=="/change-password" || 
					url=="/authtest" || 
					url.includes("/badToken") ||
					url.includes("/admin")){

					this.noNavFlg = true;
				}
				else if(url=="/"){
					this.currentUrl = 1;
				}
				else if(url.includes("/blogs")||
					url.includes("/testTable")){
					this.currentUrl = 2;
				}
				else if(url.includes("/chats")){
					this.currentUrl = 3;
					
				}
				
				//console.log(event.urlAfterRedirects);
				//console.log(this.noNavFlg);
			}
		});
	}
  
    ngOnInit() {}
	
  	loggedIn() {
		return !!this.userService.currentUser;
	}
}
