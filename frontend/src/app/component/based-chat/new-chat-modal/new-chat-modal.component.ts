import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-new-chat-modal',
  templateUrl: './new-chat-modal.component.html',
  styleUrls: ['./new-chat-modal.component.css']
})
export class NewChatModalComponent implements OnInit {

	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	tags: Tag[] = [
	/*{name: 'Lemon'},
	{name: 'Lime'},
	{name: 'Apple'},*/
	];

	constructor() { }
	
	ngOnInit() {
	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our tags
		if ((value || '').trim()) {
			this.tags.push({name: value.trim()});
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
		
		console.log(this.tags);
	}

	remove(tag: Tag): void {
		const index = this.tags.indexOf(tag);

		if (index >= 0) {
			this.tags.splice(index, 1);
		}
	}
}