import { Component, OnInit } from '@angular/core';
import { LoginGuard } from 'app/guard/index';
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
	
  constructor(private lG: LoginGuard) { }
  ngOnInit() {
  }
}

