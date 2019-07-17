import { Component, OnInit } from '@angular/core';
import { LoginGuard } from 'app/guard/index';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

	articlePatt = /^\/article/;
	chatPatt = /^\/chat/;
	adminPatt = /^\/admin/;
	currentUrl;
	
  constructor(private r : Router,
  private lG: LoginGuard) { }

  ngOnInit() {
	this.r.events.subscribe((event: Event) => {
	  if (event instanceof NavigationEnd ) {
		this.currentUrl = event.url;
	  }
	});
  }
}
