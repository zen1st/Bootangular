import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import {
  UserService
} from 'app/service';
//import { POSTPREVIEWS } from '../model/postPreview';

@Component({
  selector: 'app-home',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component1.css']
})
export class AdminComponent implements OnInit {
	
	title;
	subheading;
	imgUrl;
	
	navLinks;	
	constructor(
	private activatedRoute: ActivatedRoute, 
	private userService: UserService,
	private titleService: Title
	) {}
	
	ngOnInit() {
		this.titleService.setTitle("Admin Page");
		this.title="Admin Page";
		this.imgUrl="";
		
		this.navLinks=[{"label":"Users","path":"users"},{"label":"Placeholder","path":"placeholder"}]
	}
	
	loggedIn() {
		return !!this.userService.currentUser;
	}

}

