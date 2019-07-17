import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  constructor(private _location: Location, private titleService: Title) { }

  ngOnInit() {
	  this.titleService.setTitle("403 Forbidden");
  }
  
  
  backClicked() {
    this._location.back();
  }
  
}
