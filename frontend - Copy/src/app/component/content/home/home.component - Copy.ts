import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { ArticleService} from 'app/service/index';
import {
  UserService
} from 'app/service';
//import { POSTPREVIEWS } from '../model/postPreview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	//postPreviews;
	
	private sub: any;
	activeFlg;
	
	constructor(
	private activatedRoute: ActivatedRoute, 
	private articleService: ArticleService,
	private userService: UserService,
	private titleService: Title
	) {}
	
	ngOnInit() {
		this.titleService.setTitle("Home Page");
		
		this.activeFlg = 0;
		this.sub = this.activatedRoute
					.data
					.subscribe(v => this.activeFlg = v.flag);
					
		/*
		this.articleService.getAll().subscribe(
		data => this.getArticleSuccess(data), 
		err => this.failed(err));*/
	}
	
	getArticleSuccess(data){
		//this.postPreviews = data;
	}

	failed(err){
		console.log(err);
	}
	
	loggedIn() {
		return !!this.userService.currentUser;
	}

}

