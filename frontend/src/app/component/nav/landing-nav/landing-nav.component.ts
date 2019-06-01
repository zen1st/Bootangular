import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.css']
})
export class LandingNavComponent implements OnInit {

	constructor(@Inject(DOCUMENT) private document) { }

	ngOnInit() {
		this.addCss("https://fonts.googleapis.com/css?family=Lato");
		this.addCss("https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900");
		this.addCss("https://fonts.googleapis.com/css?family=Muli");
		this.addCss("assets/startbootstrap-new-age-gh-pages/css/new-age.min.css");
		this.addJs("assets/startbootstrap-new-age-gh-pages/js/new-age.min.js");
	}
	
	ngOnDestroy(){
		this.removeElementsByClass("landingCssJs");
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
		link.classList.add('landingCssJs');
		body.after(link);
	}
	
	addJs(url)
	{
		let body = this.document.getElementsByTagName('body')[0];
		let link = this.document.createElement('script');
		link.src = url;
		link.classList.add('landingCssJs');
		body.after(link);
	}


}
