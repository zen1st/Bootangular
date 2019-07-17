import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  constructor(private _location: Location, private titleService: Title) { }

  ngOnInit() {
	  this.titleService.setTitle("404 Not Found");
  }
  
  backClicked() {
    this._location.back();
  }
  
}
