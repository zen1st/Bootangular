import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import Stomp from 'stompjs';
import {
  UserService,
  RightSideNavService
} from 'app/service/index';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {
	
	@Input('chatRooms') chatRooms: any;
	@Input('currentChatIndex') currentChatIndex: number;
	@Input('stompClient') stompClient: any;

	constructor(private userService: UserService,
		private rightSideNavService: RightSideNavService) {}

	ngOnInit() {
	}

	toggle(){
		this.rightSideNavService.toggle();
	}

	sendMessage(message){
		if(message && this.chatRooms[this.currentChatIndex]){
			let msg = {
			  'user' : this.userService.currentUser.username,
			  'roomId' : this.chatRooms[this.currentChatIndex]["id"],
			  'message' : message
			};
			this.stompClient.send("/api/websocket/chat/sendMessage/"+this.chatRooms[this.currentChatIndex]["id"] , {}, JSON.stringify(msg));
			//this.inputMessage.value='';
		}
	}
}
