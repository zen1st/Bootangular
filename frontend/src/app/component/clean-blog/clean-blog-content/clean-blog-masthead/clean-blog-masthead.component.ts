import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clean-blog-masthead',
  templateUrl: './clean-blog-masthead.component.html',
  styleUrls: ['./clean-blog-masthead.component.css']
})
export class CleanBlogMastheadComponent implements OnInit {

@Input('title') title: string;
@Input('imgUrl') imgUrl: string;
@Input('subheading') subheading: string;
@Input('createdBy') createdBy: string;
@Input('createdTime') createdTime: string;

  constructor() { }

  ngOnInit() {
  }
}
