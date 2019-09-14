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
	
	constructor(private router: Router) { 
		
	    this.navLinks = [
        {
            label: 'Login',
            link: '/login',
            index: 0
        }, {
            label: 'Signup',
            link: '/signup',
            index: 1
        }
		];
	}

	ngOnInit() {
		/*
		this.router.events.subscribe((res) => {
			this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
			console.log(this.activeLinkIndex);
		});
		*/
	}
	
}
