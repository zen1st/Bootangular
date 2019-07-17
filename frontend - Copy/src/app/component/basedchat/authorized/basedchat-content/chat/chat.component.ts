import { Component, OnInit, Inject } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { DOCUMENT } from '@angular/platform-browser';
declare var $:any;
import {
  UserService
} from 'app/service/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private serverUrl = 'http://localhost:8080/api/websocket'
  private title = 'WebSockets chat';
  private stompClient;
  form: FormGroup;

	private chatRooms = [
		{
			"name":"Chat1", 
			"chatMessages":
			[
				{
					"username":"u1",
					"message":"m1"
				},
				{
					"username":"u2",
					"message":"m2"
				}
			]
		}, 
		{
			"name":"chat2", 
			"chatMessages":
			[
				{
					"username":"u1",
					"message":"m3"
				},
				{
					"username":"u2",
					"message":"m4"
				},
				{
					"username":"u2",
					"message":"m4"
				},
				{
					"username":"u2",
					"message":"m4"
				},
				{
					"username":"u2",
					"message":"m4"
				},
				{
					"username":"u2",
					"message":"m4"
				},
				{
					"username":"u2",
					"message":"m4"
				},
				{
					"username":"u2",
					"message":"m4"
				}
			]
		}
	];
	
	private currentChatIndex = 0;
  
	constructor(@Inject(DOCUMENT) private document,
		private userService: UserService
	) 
	{
		this.initializeWebSocketConnection(); 
	}

	ngOnInit() {
		/*
		this.form = this.formBuilder.group({
		from: ['', Validators.required],
		message: ['', Validators.required],
		});*/
		$('#chatBtn').on('click',
			function() {
				
				$("#chatPanel").show();
				$("#chatPanel").addClass("toggled");
				$("#friendPanel").hide();
				$("#friendPanel").removeClass("toggled");
			}
		);
		
		$('#friendBtn').on('click',
			function() {
				
				$("#friendPanel").show();
				$("#friendPanel").addClass("toggled");	
				$("#chatPanel").hide();
				$("#chatPanel").removeClass("toggled");
			}
		);
	}
	
  
	/*
	initializeWebSocketConnection(){
	let ws = new SockJS(this.serverUrl);
	this.stompClient = Stomp.over(ws);
	let that = this;
	this.stompClient.connect({}, function(frame) {
	  that.stompClient.subscribe("/chat", (message) => {
		if(message.body) {
		  $(".chat").append("<div class='message'>"+message.body+"</div>")
		  console.log(message.body);
		}
	  });
	});
	}*/
  
    initializeWebSocketConnection(){
		let ws = new SockJS(this.serverUrl);
		this.stompClient = Stomp.over(ws);
		let that = this;
		this.stompClient.connect({}, function(frame) {
		  that.stompClient.subscribe("/chat", (message) => {
			if(message.body) {
			  $(".content .messages").append("<div class='message'>"+message.body+"</div>")
			  console.log(message.body);
			  that.document.querySelector(".messages ul li:last-child").scrollIntoView();
			}
		  });
		});
	}

	clickChat(i)
	{
		this.currentChatIndex = i;
		
		setTimeout(function(){ 
			this.document.querySelector(".messages ul li:last-child").scrollIntoView();
		}, 1); 
	}

	sendMessage(message){
		//console.log(this.userService.currentUser.username);

		let msg = {
		  'from': this.userService.currentUser.username,
		  'message' : message
		};

		this.stompClient.send("/api/websocket/send/message" , {}, JSON.stringify(msg));
		$('.message-input input').val('');
	}
}
