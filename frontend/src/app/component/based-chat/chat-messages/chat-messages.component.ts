import { Component, OnInit, Input, ElementRef, ViewChild, ViewChildren, AfterViewInit, AfterViewChecked, QueryList } from '@angular/core';
import { MatList, MatListItem } from '@angular/material';

import { ScrollableDirective } from 'app/directive/scrollable.directive';
import { OffsetTopDirective } from 'app/directive/offset-top.directive';


@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit, AfterViewInit, AfterViewChecked{
	@Input("data") data: any;

	@ViewChildren(OffsetTopDirective) listItems: QueryList<OffsetTopDirective>;
	@ViewChild(ScrollableDirective) list: ScrollableDirective;

    ngOnInit() { 
		//console.log(this.data);
        //this.scrollToBottom();
    }
	
	ngAfterViewInit() {
		this.scrollToBottom();    
	}
	
    ngAfterViewChecked() {        
        this.scrollToBottom();        
    } 
	
    scrollToBottom(): void {
		this.list.scrollTop = this.listItems.find((_, i) => i === this.data.length-1).offsetTop;   
    }
}