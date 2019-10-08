import { Component, OnInit } from '@angular/core';
import { LoginGuard } from 'app/guard/index';
import { Title }     from '@angular/platform-browser';
import {
  UserService
} from 'app/service';
//import { POSTPREVIEWS } from '../model/postPreview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
  //,styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
  constructor(private titleService: Title,private lG: LoginGuard) { }
  ngOnInit() {
	this.titleService.setTitle("Home");
	
	if(this.lG.canLoad()){
		//this
	}
	
  }
}

