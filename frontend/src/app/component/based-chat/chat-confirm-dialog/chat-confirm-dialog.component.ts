import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ChatRoomService } from 'app/service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-chat-confirm-dialog',
  templateUrl: './chat-confirm-dialog.component.html',
  styleUrls: ['./chat-confirm-dialog.component.css']
})
export class ChatConfirmDialogComponent {

	constructor(public dialogRef: MatDialogRef<ChatConfirmDialogComponent>,private httpClient: HttpClient,
				@Inject(MAT_DIALOG_DATA) public data: any,
				public chatRoomService: ChatRoomService) { console.log(this.data);}
  
	onNoClick(): void {
		this.dialogRef.close();
	}
  
	onConfirmClick() :void {
		if(this.data.action=="request"){
			this.chatRoomService.request(this.data)
			  .subscribe(res => {
				  console.log(res);
				  this.dialogRef.close(this.data);
			  }, err => {
				  console.log(err);
			});
		}
		else if(this.data.action=="accept"){
			this.chatRoomService.accept(this.data.chatMessage)
			  .subscribe(res => {
				  console.log(res);
				  this.dialogRef.close(this.data.chatMessage);
			  }, err => {
				  console.log(err);
			});
		}
		else if(this.data.action=="block"){
			this.chatRoomService.block(this.data.chatMessage)
			  .subscribe(res => {
				  console.log(res);
				  this.dialogRef.close(this.data.chatMessage);
			  }, err => {
				  console.log(err);
			});
		}
		else if(this.data.action=="unblock"){
			this.chatRoomService.unblock(this.data.chatMessage)
			  .subscribe(res => {
				  console.log(res);
				  this.dialogRef.close(this.data.chatMessage);
			  }, err => {
				  console.log(err);
			});
		}
	}
}