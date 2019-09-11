import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'app-stylish-portfolio',
  templateUrl: './stylish-portfolio.component.html',
  styleUrls: ['./stylish-portfolio.component.css']
})
export class StylishPortfolioComponent implements OnInit, OnDestroy {

	constructor(@Inject(DOCUMENT) private document) {
		this.addCss("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic");
		this.addCss("assets/startbootstrap-stylish-portfolio-gh-pages/vendor/simple-line-icons/css/simple-line-icons.css");
		this.addCss("assets/startbootstrap-stylish-portfolio-gh-pages/css/stylish-portfolio.min.css");
		this.addJs("assets/startbootstrap-stylish-portfolio-gh-pages/js/stylish-portfolio.min.js");
	}
	
	ngOnInit() {}
	
	ngOnDestroy(){
		this.removeElementsByClass("stylishPortfolioCssJs");
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
		link.classList.add('stylishPortfolioCssJs');
		body.after(link);
	}
	
	addJs(url)
	{
		let body = this.document.getElementsByTagName('body')[0];
		let link = this.document.createElement('script');
		link.src = url;
		link.classList.add('stylishPortfolioCssJs');
		body.after(link);
	}
}
