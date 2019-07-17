import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {
  UserService,
  AuthService
} from 'app/service';
import { Router } from '@angular/router';
import { AdminGuard } from 'app/guard/index';
import { interval } from 'rxjs/observable/interval';
declare var $: any;

@Component({
  selector: 'app-logged-in-nav',
  templateUrl: './logged-in-nav.component.html',
  styleUrls: ['./logged-in-nav.component.css'],
  
})
export class LoggedInNavComponent implements OnInit {

	constructor(@Inject(DOCUMENT) private document,
		private userService: UserService,
		private authService: AuthService,
		private adminGuard: AdminGuard,
		private router: Router
	) { }

  
  ngOnInit() {

  }
  
  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/']);
    });
  }

  loggedIn() {
    return !!this.userService.currentUser;
  }

  userName() {
    const user = this.userService.currentUser;
    //return user.firstName + ' ' + user.lastName;
	return user.username;
  }

  refreshToken() {
	this.userService.initUser();
	//var source = interval(1000);
	//var subscribe = source.subscribe(val => console.log(val));
  }
  
	menuClick(){
		
	}
}