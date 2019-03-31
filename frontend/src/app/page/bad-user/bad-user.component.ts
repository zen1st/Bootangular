import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-bad-user',
  templateUrl: './bad-user.component.html',
  styleUrls: ['./bad-user.component.css']
})
export class BadUserComponent implements OnInit {

  //constructor() { }
constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
	      // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.activatedRoute.queryParams.subscribe(params => {
        const token = params['token'];
        console.log(token);
      });
  }

}
