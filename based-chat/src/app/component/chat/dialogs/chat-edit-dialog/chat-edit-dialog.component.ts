import { Component, OnInit, Inject} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChatRoomService } from 'app/service';
import {ChatConfirmDialogComponent} from 'app/component/chat/dialogs/chat-confirm-dialog/';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

interface ChatTag {
    name: string;
}
@Component({
  selector: 'app-chat-edit-dialog',
  templateUrl: './chat-edit-dialog.component.html',
  styleUrls: ['./chat-edit-dialog.component.css']
})
export class ChatEditDialogComponent implements OnInit {

	visible = true;
	selectable = true;
	removable = true;
	addOnBlur = true;
	readonly separatorKeysCodes: number[] = [ENTER, COMMA];
	
	/**
	   * Boolean used in telling the UI
	   * that the form has been submitted
	   * and is awaiting a response
	   */
	submitted = false;

	editChatForm;
				
	constructor(public dialogRef: MatDialogRef<ChatEditDialogComponent>, 
		private httpClient: HttpClient,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder, 
		private chatRoomService : ChatRoomService,
		public dialog: MatDialog) {console.log(this.data);}
	
				
	ngOnInit() {
		this.editChatForm = this.formBuilder.group({
			name: [this.data.chatRoom.name,Validators.required],
			chatTags: this.formBuilder.array(this.data.chatRoom.chatTags)
		});
	}
	
	onNoClick(): void {
		this.dialogRef.close();
	}
	
	removeNewChatTag(chatTag): void {
		const index = this.editChatForm.value.chatTags.indexOf(chatTag);

		if (index >= 0) {
			this.editChatForm.value.chatTags.splice(index, 1);
		}
	}
	
	addNewChatTag(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our tags
		if ((value || '').trim()) {
			//this.newChatForm.value.chatTags.push({name: value.trim()});
			this.editChatForm.value.chatTags.push(value.trim());
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
		
		//console.log(this.tags);
	}
	
	onNewChatFormSubmit(data) {
		//console.log(data);
				
		const dialogRef = this.dialog.open(ChatConfirmDialogComponent, {
			data: {action: "edit", id:this.data.chatRoom.id, chatRoom: this.editChatForm.value}
		});
	}
	
}
