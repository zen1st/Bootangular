import { Component, OnInit, Input} from '@angular/core';
import { PostPreview } from '../model/postPreview';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {

@Input() postPreview: PostPreview;

  constructor() { }

  ngOnInit() {
  }

}
