import { Component, OnInit, AfterViewChecked, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatList, MatListItem } from '@angular/material';

import { ScrollableDirective } from 'app/directive/scrollable.directive';
import { OffsetTopDirective } from 'app/directive/offset-top.directive';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit, AfterViewChecked{
	@Input("data") data: any;
	data2;
	
	@ViewChild(ScrollableDirective) list: ScrollableDirective;
	@ViewChildren(OffsetTopDirective) listItems: QueryList<OffsetTopDirective>;

    ngOnInit() { 
    }
		
    ngAfterViewChecked() {   
		if(this.data!=this.data2){
			this.data2 = this.data;
			this.scrollToBottom();    
		}
    } 
	
    scrollToBottom(): void {
		this.list.scrollTop = this.listItems.find((_, i) => i === this.data.length-1).offsetTop;   
    }
}