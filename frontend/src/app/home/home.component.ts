import { Component, OnInit, Input} from '@angular/core';
import { ArticleService} from '../service/index';
//import { POSTPREVIEWS } from '../model/postPreview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	postPreviews;
	
	constructor(private articleService: ArticleService) {}

	ngOnInit() {
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

