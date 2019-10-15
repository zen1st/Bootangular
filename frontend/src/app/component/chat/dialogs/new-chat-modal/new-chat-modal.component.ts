import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import {MatChipInputEvent} from '@angular/material/chips';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ChatRoomService } from 'app/service';
import {ChatConfirmDialogComponent} from 'app/component/chat/dialogs/chat-confirm-dialog';

export interface ChatTag {
    name: string;
}

const CONDITIONS_LIST = [
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
  { value: "is-equal", label: "Is equal" },
  { value: "is-not-equal", label: "Is not equal" }
];

const CONDITIONS_FUNCTIONS = { // search method base on conditions list value
  "is-empty": function (value, filterdValue) {
    return value === "";
  },
  "is-not-empty": function (value, filterdValue) {
    return value !== "";
  },
  "is-equal": function (value, filterdValue) {
    return value == filterdValue;
  },
  "is-not-equal": function (value, filterdValue) {
    return value != filterdValue;
  }
};

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
	
	/**
	   * Boolean used in telling the UI
	   * that the form has been submitted
	   * and is awaiting a response
	   */
	submitted = false;
  
	searchChatForm;
	newChatForm;

	private data: any[];

	public displayedColumns: string[];// = ["username","actions"];
	public dataSource; //= new MatTableDataSource(DATA);

	public conditionsList = CONDITIONS_LIST;
	public searchValue: any = {};
	public searchCondition: any = {};
	private _filterMethods = CONDITIONS_FUNCTIONS;
	

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
	constructor(public dialogRef: MatDialogRef<NewChatModalComponent>,  
	private formBuilder: FormBuilder, 
	private chatRoomService : ChatRoomService,
	public dialog: MatDialog) { 
	
	
		this.searchChatForm = this.formBuilder.group({
			chatTags: this.formBuilder.array([])
		});
		
		this.newChatForm = this.formBuilder.group({
			name: ['',Validators.required],
			chatTags: this.formBuilder.array([])
		});
	
	}
	
	ngOnInit() {
	}
	
	//removeSearchChatTag(chatTag: ChatTag): void {
	removeSearchChatTag(chatTag): void {
		const index = this.searchChatForm.value.chatTags.indexOf(chatTag);

		if (index >= 0) {
			this.searchChatForm.value.chatTags.splice(index, 1);
		}
	}
	
	addSearchChatTag(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our tags
		if ((value || '').trim()) {
			//this.searchChatForm.value.chatTags.push({name: value.trim()});
			this.searchChatForm.value.chatTags.push(value.trim());
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
		
		//console.log(this.tags);
	}
	
	onSearchChatFormSubmit(data) {
		this.submitted = true;
		
		this.chatRoomService.search(data).subscribe(
			res => {
				console.log(res);
				this.submitted = false;
				this.data = res;
				this.displayedColumns = ["name", "chatTags", "actions"];
				this.dataSource = new MatTableDataSource(this.data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				
				this.dataSource.filterPredicate = (p: any, filtre: any) => {
					let result = true;
					let keys = Object.keys(p); // keys of the object data 

					for (const key of keys) {
						let searchCondition = filtre.conditions[key]; // get search filter method

						if (searchCondition && searchCondition !== 'none') {
							if (filtre.methods[searchCondition](p[key], filtre.values[key]) === false) { // invoke search filter 
								result = false // if one of the filters method not succeed the row will be remove from the filter result 
								break;
							}
						}
					}
					return result
				};
			}
			,err => { console.log(err); }
		);
	}
	
	show(){
		if(this.data){
			return (this.data.length>0);
		}
	}
	
	request(id: number) {
		//this.index = i;
		const dialogRef = this.dialog.open(ChatConfirmDialogComponent, {
			data: {action: "request", id: id}
		});
		
		dialogRef.afterClosed()
        .subscribe(
			data => {
				//console.log(data);
				if(data && data.id){
					//console.log(data.id);
					let index = this.data.findIndex(x => x.id == data.id);
					this.data[index]["sent"]=true;
					//console.log(this.data);
				}
			}
		);	
	}
	
	//removeNewChatTag(chatTag: ChatTag): void {
	removeNewChatTag(chatTag): void {
		const index = this.newChatForm.value.chatTags.indexOf(chatTag);

		if (index >= 0) {
			this.newChatForm.value.chatTags.splice(index, 1);
		}
	}
	
	addNewChatTag(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		// Add our tags
		if ((value || '').trim()) {
			//this.newChatForm.value.chatTags.push({name: value.trim()});
			this.newChatForm.value.chatTags.push(value.trim());
		}

		// Reset the input value
		if (input) {
			input.value = '';
		}
		
		//console.log(this.tags);
	}

	onNewChatFormSubmit(data) {
		this.chatRoomService.post(data).subscribe(
				res => {
					//console.log(res);
					this.dialogRef.close();
					
				},
				err => {
					console.log(err );
				}
		);
	}


	private refreshTable() {
		// Refreshing table using paginator
		// Thanks yeager-j for tips
		// https://github.com/marinantonio/angular-mat-table-crud/issues/12
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.dataSource.filterPredicate = (p: any, filtre: any) => {
			let result = true;
			let keys = Object.keys(p); // keys of the object data 

			for (const key of keys) {
				let searchCondition = filtre.conditions[key]; // get search filter method

				if (searchCondition && searchCondition !== 'none') {
					if (filtre.methods[searchCondition](p[key], filtre.values[key]) === false) { // invoke search filter 
						result = false // if one of the filters method not succeed the row will be remove from the filter result 
						break;
					}
				}
			}
			return result
		};
	}
  
	applyFilter() {
		let searchFilter: any = {
			values: this.searchValue,
			conditions: this.searchCondition,
			methods: this._filterMethods
		}

		this.dataSource.filter = searchFilter;
	}

	clearColumn(columnKey: string): void {
		this.searchValue[columnKey] = null;
		this.searchCondition[columnKey] = 'none';
		this.applyFilter();
	}

	clearFilters() {
		for (var k in this.dataSource.filter.conditions){
			this.searchValue[k] = null;
			this.searchCondition[k] = 'none';
		}
		this.applyFilter();
	}
}