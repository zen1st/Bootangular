import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.css']
})
export class MastheadComponent implements OnInit {

@Input('title') title: string;
@Input('imgUrl') imgUrl: string;
@Input('subheading') subheading: string;
@Input('createdBy') createdBy: string;
@Input('createdTime') createdTime: string;

  constructor() { }

  ngOnInit() {
  }
}
