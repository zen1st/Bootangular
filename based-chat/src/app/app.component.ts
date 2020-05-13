import { Component } from '@angular/core';
import { LoginGuard } from 'app/guard';
import { Router, Event, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'based-chat';
  
	navLinks=[{"label":"Login","path":"login"},{"label":"Signup","path":"signup"}];
  
	private noNavFlg : boolean ;
	constructor(private loginGuard: LoginGuard,
		private router: Router) {

		this.router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd ) {
				this.noNavFlg = false;
				let url = event.urlAfterRedirects;
				if(url=="/404" || 
					url=="/403" || 
					url.includes("/resetPassword") || 
					url=="/change-password" || 
					url=="/authtest" || 
					url.includes("/badToken") ||
					url.includes("/admin")){

					this.noNavFlg = true;
				}
			}
		});
	}
}
