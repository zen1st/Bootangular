import { Component, OnInit, Input} from '@angular/core';

import { POSTPREVIEWS } from '../model/postPreview';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	
	postPreviews = POSTPREVIEWS;
	
	constructor() {}

	ngOnInit() {
	}
}

