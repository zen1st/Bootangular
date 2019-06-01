import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { AdminGuard } from 'app/guard/index';
import { Router } from '@angular/router';
import {
  AuthService,
  UserService
} from 'app/service';
@Component({
  selector: 'app-logged-in-nav',
  templateUrl: './logged-in-nav.component.html',
  styleUrls: ['./logged-in-nav.component.css'],
  
})
export class LoggedInNavComponent implements OnInit {

	constructor(@Inject(DOCUMENT) private document,
	private aG: AdminGuard, 
	private r : Router,
	private aS : AuthService,
	private uS : UserService) { }

	ngOnInit() {
		this.addJs("assets/startbootstrap-clean-blog-gh-pages/js/clean-blog.min.js");
		this.addCss("https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic");
		this.addCss("https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800");
		this.addCss("assets/startbootstrap-clean-blog-gh-pages/css/clean-blog.min.css");
	}
	
	ngOnDestroy(){
		this.removeElementsByClass("loggedInCssJs");
	}
  
  	removeElementsByClass(className){
		let elements = this.document.getElementsByClassName(className);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}
	
	addCss(url)
	{
		let body = this.document.getElementsByTagName('body')[0];
		let link = this.document.createElement('link');
		link.href = url;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.classList.add('loggedInCssJs');
		body.after(link);
	}
	
	addJs(url)
	{
		let body = this.document.getElementsByTagName('body')[0];
		let link = this.document.createElement('script');
		link.src = url;
		link.classList.add('loggedInCssJs');
		body.after(link);
	}

	logout() {
		this.aS.logout().subscribe(res => {
		  this.r.navigate(['/']);
		});
	}
}
