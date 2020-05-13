import { Component, OnInit, Input} from '@angular/core';
import {
  UserService,
  AuthService,
  LeftSideNavService
} from 'app/service';
import { Router } from '@angular/router';
import { AdminGuard } from 'app/guard/index';

@Component({
  selector: 'app-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.css']
})
export class ChatNavComponent implements OnInit {
	
	@Input('notifications') notifications: any;
	constructor(
		private userService: UserService,
		private authService: AuthService,
		private adminGuard: AdminGuard,
		private router: Router,
		private leftSideNavService: LeftSideNavService
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
  
  toggle(){
	this.leftSideNavService.toggle();
  }
}