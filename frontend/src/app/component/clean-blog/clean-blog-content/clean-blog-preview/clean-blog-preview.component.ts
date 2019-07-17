import { Component, OnInit, Input} from '@angular/core';
//import { PostPreview } from '../model/postPreview';

@Component({
  selector: 'app-clean-blog-preview',
  templateUrl: './clean-blog-preview.component.html',
  styleUrls: ['./clean-blog-preview.component.css']
})
export class CleanBlogPreviewComponent implements OnInit {

@Input('blogPreview') blogPreview: any;

  constructor() { }

  ngOnInit() {
	  this.blogPreview.createdAt = new Date(this.blogPreview.createdAt);
  }

}
