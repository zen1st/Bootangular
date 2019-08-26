import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
@Component({
  selector: 'app-new-age-content',
  templateUrl: './new-age-content.component.html',
  styleUrls: ['./new-age-content.component.css']
})
export class NewAgeContentComponent implements OnInit {

	private activeLinkIndex = -1;
	private navLinks: any[];
	
	constructor(private router: Router) { }

	ngOnInit() {
		
		this.navLinks=[{"label":"Login","path":"/login"},{"label":"Signup","path":"/signup"}];
		
	}
	
	isHome()
	{
		if (this.router.url=="/"){
			return true;
		}
		
		return false;
	}
}
