import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError, ActivationStart, RouterOutlet} from '@angular/router';
import { Subscription } from 'rxjs';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {
  UserService,
  ChatRoomService,
  LeftSideNavService,
  RightSideNavService
} from 'app/service';
import {CookieService} from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';
import { ChatConfirmDialogComponent, ChatEditDialogComponent } from 'app/component/chat/dialogs'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
	mobileQuery: MediaQueryList;
	
	private _mobileQueryListener: () => void;

	private sub: any;
	
	@ViewChild('rnav') rnav:any;
	@ViewChild('lnav') lnav:any;
	currentDialog;
	
	private chatRooms : any[] = [];

	private currentChatIndex = 0;
    subscription: Subscription;
	
	//private serverUrl = 'http://basedchat-env-1.bjw86amm2m.us-east-1.elasticbeanstalk.com/api/websocket'
	private serverUrl = 'http://localhost:8080/api/websocket'
	private ws;
	private stompClient;
	chatSubscriptions: any[] = [];
	notifications : any[] = [];

	constructor(changeDetectorRef : ChangeDetectorRef, 
		media : MediaMatcher, 
		private titleService : Title,
		private router : Router,
		private activatedRoute : ActivatedRoute, 
		private userService : UserService,
		private chatRoomService : ChatRoomService,
		private leftSideNavService : LeftSideNavService,
		private rightSideNavService : RightSideNavService,
		private cookieService : CookieService,
		public dialog: MatDialog) {
		
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
		
		//this.ws = new SockJS(this.serverUrl);
		//this.stompClient = Stomp.over(this.ws);
		
		//this.initializeWebSocketNotificationConnection();
				
		this.chatRoomService.getMine().subscribe(res => {
			this.chatRooms = res;
			//this.initializeWebSocketChatConnection();
			this.initializeWebSocketConnection();
		},
		err=>{
			this.initializeWebSocketConnection();
		});
		
		
        this.subscription = this.chatRoomService.getMessage().subscribe(message => {
			if (message) {
				this.chatRooms = message;
				//this.initializeWebSocketChatConnection();
				this.stompClient.disconnect(function() {});
				this.initializeWebSocketConnection();
			} else {
			// clear messages when empty message received
			//this.messages = [];
			}
		});
	}

	ngOnInit() {
		
		this.titleService.setTitle('Based Chat');
		
		this.leftSideNavService.sideNavToggleSubject.subscribe(()=> {
			this.lnav.toggle();
		});
		
		this.rightSideNavService.sideNavToggleSubject.subscribe(()=> {
			this.rnav.toggle();
		});
		//console.log(document.cookie);
		//console.log(this.cookieService.getAll());
	}
  
	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
  
    userName() {
		const user = this.userService.currentUser;
		//return user.firstName + ' ' + user.lastName;
		return user.username;
	}
  
	clickChat(i){
		this.currentChatIndex = i;
	}

	show(str?: string){
		//console.log(str);
		//console.log(this.chatRooms[this.currentChatIndex][str]);
		if(this.chatRooms.length>0){
			
			if(!str){
				return true;
			}
			
			if(this.chatRooms[this.currentChatIndex][str]){
				return (this.chatRooms[this.currentChatIndex][str].length>0);
			}
			
		}
		return false;
	}
	
		
	
	initializeWebSocketConnection(){
		let ws = new SockJS(this.serverUrl);
		this.stompClient = Stomp.over(ws);
		console.log(this.cookieService.getAll());
		let that = this;
		this.stompClient.connect({}, function(frame) {
			let url = "/notification/" + that.userName();
				
			that.stompClient.subscribe(url, (message) => {
				if(message.body) {
					let body = JSON.parse(message.body);
					let index = that.chatRooms.findIndex(x => x.id == body.roomId);
					
					if(body.type=="REQUEST"){
						//console.log(index);
						that.chatRooms[index]['pendingUsers'].push(body.user);
						that.notifications.push(body);
					}
					else if(body.type=="ACCEPT"){
						that.chatRooms.push(body.chatRoom);
						that.notifications.push(body);
						if(index<0){
							that.stompClient.disconnect(function() {});
							that.initializeWebSocketConnection();
						}
					}
				}
			});
			
			for(var k in that.chatRooms){
				let url = "/chat/" + that.chatRooms[k]["id"];
				
				let chatSubscription = that.stompClient.subscribe(url, (message) => {
					if(message.body) {
						let body = JSON.parse(message.body);
						let index = that.chatRooms.findIndex(x => x.id == body.roomId);
						
						if(body.type=="ACCEPT"){
							//everybody in chat
							that.chatRooms[index]['members'].push(body.user);
							if(!that.chatRooms[index].chatMessages){
								that.chatRooms[index].chatMessages = [];
							}
							that.chatRooms[index]['chatMessages'].push(body);
							
							//chat creator
							if(that.chatRooms[index]['createdBy'] == that.userName()){
								that.chatRooms[index]['pendingUsers'] = that.chatRooms[index]['pendingUsers'].filter(v => v !== body.user);
								that.chatRooms[index]['blockedUsers'] = that.chatRooms[index]['blockedUsers'].filter(v => v !== body.user);
							}
							
						}
						else if(body.type=="BLOCK"){
							
							//everybody in chat
							that.chatRooms[index]['members'] = that.chatRooms[index]['members'].filter(v => v !== body.user);
							if(!that.chatRooms[index].chatMessages){
								that.chatRooms[index].chatMessages = [];
							}
							that.chatRooms[index]['chatMessages'].push(body);
							
							//chat creator
							if(that.chatRooms[index]['createdBy'] == that.userName()){
								that.chatRooms[index]['pendingUsers'] = that.chatRooms[index]['pendingUsers'].filter(v => v !== body.user);
								that.chatRooms[index]['blockedUsers'].push(body.user);
							}
							
							//blocked user
							if(body.user == that.userName()){
								
								if(index==that.currentChatIndex){
									that.rnav.close();
									that.currentChatIndex=0;
								}
								
								setTimeout(function(){
									that.chatRooms.splice(index, 1);
									that.notifications.push(body);
									that.stompClient.disconnect(function() {});
									that.initializeWebSocketConnection();
									
								}, 1)
							}
							
						}
						else if(body.type=="CHAT"){
							
							if(!that.chatRooms[index].chatMessages){
								that.chatRooms[index].chatMessages = [];
							}
							
							that.chatRooms[index].chatMessages.push(body);
						}
						else if(body.type=="LEAVE"){
							
							if(!that.chatRooms[index].chatMessages){
								that.chatRooms[index].chatMessages = [];
							}
						
							that.chatRooms[index].chatMessages.push(body);
							that.chatRooms[index]['members'] = that.chatRooms[index]['members'].filter(v => v !== body.user);
						}
						else if(body.type=="EDIT"){
								
							that.chatRooms[index]['name'] = body.chatRoom.name;
							that.chatRooms[index]['chatTags'] = body.chatRoom.chatTags;
							
							if(!that.chatRooms[index].chatMessages){
								that.chatRooms[index].chatMessages = [];
							}
							that.chatRooms[index].chatMessages.push(body);
						}
						else if(body.type=="DELETE"){
							
							if(index==that.currentChatIndex){
								that.rnav.close();
								that.currentChatIndex=0;
							}
							
							setTimeout(function(){
								
								if(that.chatRooms[index]['createdBy'] != that.userName()){
									that.notifications.push(body);
								}
								that.chatRooms.splice(index, 1);
								that.stompClient.disconnect(function() {});
								that.initializeWebSocketConnection();
								
							}, 1)
						}
						
					}
				});
				
				//console.log(chatSubscription);
				
				that.chatSubscriptions.push(chatSubscription);
				
			}

		});
		
		//console.log(that.chatSubscriptions);
	}
	
	accept(user){
		const dialogRef = this.dialog.open(ChatConfirmDialogComponent, {
			data: {action: "accept", chatMessage:{roomId:this.chatRooms[this.currentChatIndex].id, user:user}}
		});
	}
	
	block(user){
		const dialogRef = this.dialog.open(ChatConfirmDialogComponent, {
			data: {action: "block", chatMessage:{roomId:this.chatRooms[this.currentChatIndex].id, user:user}}
		});
	}
	
	unblock(user){
		const dialogRef = this.dialog.open(ChatConfirmDialogComponent, {
			data: {action: "unblock", chatMessage:{roomId:this.chatRooms[this.currentChatIndex].id, user:user}}
		});
	}
	
	leave(){
		const dialogRef = this.dialog.open(ChatConfirmDialogComponent, {
			data: {action: "leave", chatMessage:{roomId:this.chatRooms[this.currentChatIndex].id}}
		});
		
		dialogRef.afterClosed()
        .subscribe(
			data => {
				if(data){
					this.currentChatIndex=0;
					this.chatRooms.splice(this.currentChatIndex, 1);
				}
			}
		);
	}
	
	edit(){
		const dialogRef = this.dialog.open(ChatEditDialogComponent, {
			data: {action: "edit", chatRoom: this.chatRooms[this.currentChatIndex]}
		});
	}
	
	delete(){
		const dialogRef = this.dialog.open(ChatConfirmDialogComponent, {
			data: {action: "delete", id: this.chatRooms[this.currentChatIndex].id}
		});
	}

}
