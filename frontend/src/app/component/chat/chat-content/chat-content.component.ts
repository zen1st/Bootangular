import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { DOCUMENT } from '@angular/platform-browser';
declare var $:any;
import {
  UserService
} from 'app/service/index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.css']
})
export class ChatContentComponent implements OnInit {
  private serverUrl = 'http://localhost:8080/api/websocket'
  private title = 'WebSockets chat';
  private stompClient;
  private form: FormGroup;
  private formBuilder: FormBuilder
	
	private chatRooms = [
		{
			"id":1,
			"name":"Chat 1ddddddddddddddddddddddddddddddddddddddddddddddddddd dfdfdfdfdfdfd dfdfdfdfdfd dfdfd", 
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
			"id":2,
			"name":"chat2", 
			"chatMessages":
			[
				{
					"username":"u1",
					"message":"m1"
				},
				{
					"username":"u2",
					"message":"m2"
				},
				{
					"username":"u2",
					"message":"m3"
				},
				{
					"username":"u2",
					"message":"m4"
				},
				{
					"username":"u2",
					"message":"m5"
				},
				{
					"username":"u2",
					"message":"m6"
				},
				{
					"username":"u2",
					"message":"m7"
				},
				{
					"username":"u2",
					"message":"m8"
				},
				{
					"username":"u2",
					"message":"m9"
				},
				{
					"username":"u2",
					"message":"m10"
				},
				{
					"username":"u2",
					"message":"m11"
				},
				{
					"username":"u2",
					"message":"m12"
				}
				
			]
		}
	];
	
	/*
	private chatRooms = [
	{
		"id":"Chat1", 
		"msgs":
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
	}];*/
		
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
		  message: ['',  [Validators.required]]
		});
		*/
		
		$(".expand-button").click(function() {
			$("#profile").toggleClass("expanded");
			$("#contacts").toggleClass("expanded");
		});

		$('#memberBtn').on('click',
			function() {
				$(".rightPanel").hide( "slow" );
				
				$(this).siblings().find(".expandBtn").removeClass("flipX");
				$("#memberBtn .expandBtn").toggleClass("flipX");
				
				if($("#memberBtn .expandBtn").hasClass("flipX")){
					$("#memberPanel").show("slide", {direction: "right" }, "slow");
				}
			}
		);
		
		$('#requestBtn').on('click',
			function() {
				$(".rightPanel").hide( "slow" );
				
				$(this).siblings().find(".expandBtn").removeClass("flipX");
				$("#requestBtn .expandBtn").toggleClass("flipX");
				
				if($("#requestBtn .expandBtn").hasClass("flipX")){
					$("#requestPanel").show("slide", {direction: "right" }, "slow");
				}
			}
		);
		
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
	
	ngOnDestroy() {
		this.stompClient.disconnect(function() {
			//console.log("See you next time!");
		});
	}
  
	/*
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
	}*/
  
    initializeWebSocketConnection(){
		let ws = new SockJS(this.serverUrl);
		this.stompClient = Stomp.over(ws);
		let that = this;
		this.stompClient.connect({}, function(frame) {
			
			for(var k in that.chatRooms)
			{
				let url = "/chat/" + that.chatRooms[k]["id"];
				
				that.stompClient.subscribe(url, (message) => {
					if(message.body) {
					  console.log(message.body);
					}
				});
			}

		});
	}

	clickChat(i)
	{
		this.currentChatIndex = i;
		
		setTimeout(function(){ 
			$(".messages").animate({ scrollTop: this.document.querySelector(".messages").scrollHeight }, "fast");
		}, 1); 
	}

	sendMessage(message){
		
		if(message){
			let msg = {
			  'by' : this.userService.currentUser.username,
			  'roomId' : this.chatRooms[this.currentChatIndex]["id"],
			  'message' : message
			};

			//this.stompClient.send("/api/websocket/send/message" , {}, JSON.stringify(msg));
			this.stompClient.send("/api/websocket/chat/"+this.chatRooms[this.currentChatIndex]["id"]+"/sendMessage" , {}, JSON.stringify(msg));
			$('.message-input input').val('');
		}
	}
}
