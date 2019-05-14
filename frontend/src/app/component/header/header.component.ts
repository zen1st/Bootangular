import { Component, OnInit } from '@angular/core';
import {
  UserService,
  AuthService
} from '../../service';
import { Router } from '@angular/router';

import { interval } from 'rxjs/observable/interval';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  
  ngOnInit() {
	  $.getScript('assets/new-age/js/new-age.min.js', function(){});
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
}
