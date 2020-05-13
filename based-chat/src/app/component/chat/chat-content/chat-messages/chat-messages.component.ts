import { Component, OnInit, OnChanges,SimpleChanges, ElementRef,
 AfterViewInit, AfterViewChecked, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatList, MatListItem } from '@angular/material';
import { ScrollableDirective } from 'app/directive/scrollable.directive';
import { OffsetTopDirective } from 'app/directive/offset-top.directive';

import {
  UserService
} from 'app/service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit{
	@Input("data") data;
	data2 = [];
	disableScrollDown = false;
	
	@ViewChild(ScrollableDirective, {static: true}) list: ScrollableDirective;
	@ViewChildren(OffsetTopDirective) listItems: QueryList<OffsetTopDirective>;
	@ViewChild('scrollMe', {static: true}) private myScrollContainer: ElementRef;

	constructor(private userService : UserService) {}
			
    ngOnInit() { 
		//this.data = this.data.slice();
		//this.scrollToBottom(); 
    }
	
	ngOnChanges(){
		this.disableScrollDown = false;
		this.scrollToBottom();  
	}
	
	private onScroll() {
        let element = this.myScrollContainer['_elementRef'].nativeElement;
		if ((element.scrollHeight ==  Math.round(element.scrollTop + element.clientHeight))) {
           this.disableScrollDown = false;
        }
		else {
            this.disableScrollDown = true;
        }
    }
	
    ngAfterViewChecked() {
		this.scrollToBottom();  
    } 
	
    scrollToBottom(): void {
		if (this.disableScrollDown) {
            return
        }
        try {
			this.list.scrollTop = this.listItems.find((_, i) => i === this.data.length-1).offsetTop;   
        } catch(err) { }
    }
}