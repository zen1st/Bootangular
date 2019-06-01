import { Component, OnInit } from '@angular/core';
import { ArticleService} from 'app/service/index';
@Component({
  selector: 'app-logged-in-home',
  templateUrl: './logged-in-home.component.html',
  styleUrls: ['./logged-in-home.component.css']
})
export class LoggedInHomeComponent implements OnInit {

	title;
	subheading;
	imgUrl;
	postPreviews;
	
	constructor(private articleService: ArticleService) { }

	ngOnInit() {
		this.title="Home"
		this.subheading="Welcome!"
		this.imgUrl="/assets/startbootstrap-clean-blog-gh-pages/img/home-bg.jpg";

		this.articleService.getAll().subscribe(
		data => this.getArticleSuccess(data), 
		err => this.failed(err));
	}
	
	getArticleSuccess(data){
		this.postPreviews = data;
	}

	failed(err){
		console.log(err);
	}
	

}