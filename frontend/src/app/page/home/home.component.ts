import { Component, OnInit, Input} from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ArticleService} from 'app/service/index';
import {
  UserService
} from '../../service';
//import { POSTPREVIEWS } from '../model/postPreview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	postPreviews;
	
	constructor(
	private articleService: ArticleService,
	private userService: UserService,
	private titleService: Title
	) {}
	
	ngOnInit() {
		this.titleService.setTitle("Home Page");
		
		/*
		this.articleService.getAll().subscribe(
		data => this.getArticleSuccess(data), 
		err => this.failed(err));*/
	}
	
	getArticleSuccess(data){
		this.postPreviews = data;
	}

	failed(err){
		console.log(err);
	}
	
	loggedIn() {
		return !!this.userService.currentUser;
	}

}

