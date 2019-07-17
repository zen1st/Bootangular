import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import {
  UserService
} from 'app/service';

import {UserAddDialogComponent, UserEditDialogComponent , UserDeleteDialogComponent} from 'app/component/generic/admin/user-table/dialogs';

/*
export interface Authority {
  name: string;
  authority: string;
}

export interface User {
  username: string;
  email: string;
  enabled: boolean;
  authorities: Authority[];
}*/

export interface User {
  username: string;
  email: string;
  enabled: boolean;
}

export const CONDITIONS_LIST = [
  { value: "nono", label: "Nono" },
  { value: "is-empty", label: "Is empty" },
  { value: "is-not-empty", label: "Is not empty" },
  { value: "is-equal", label: "Is equal" },
  { value: "is-not-equal", label: "Is not equal" }
];

export const CONDITIONS_FUNCTIONS = { // search method base on conditions list value
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
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
	
	private data: User[];
	
	public displayedColumns: string[];// = ["username","actions"];
	public dataSource; //= new MatTableDataSource(DATA);

	public conditionsList = CONDITIONS_LIST;
	public searchValue: any = {};
	public searchCondition: any = {};
	private _filterMethods = CONDITIONS_FUNCTIONS;

	index: number;
	id: number;
  
	//constructor( private _service: NotificationsService ) {
	constructor(private titleService: Title,
	public dialog: MatDialog,
	private userService: UserService
	) { }
	
	ngOnInit(){
		//this.titleService.setTitle("Admin Page");
		//this._service.success('nat','dndnnd',this.options);
		
		this.userService.getAll().subscribe(
			data => {
				this.data = data;
				this.displayedColumns = ["username", "email", "actions"];
				this.dataSource = new MatTableDataSource(this.data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}
			,err => { console.log(err); }
			,()=> {	
				this.dataSource.filterPredicate = (p: User, filtre: any) => {
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
		);
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
	addNew(issue: any) {
		const dialogRef = this.dialog.open(UserAddDialogComponent, {
		  //data: {issue: issue }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {	  
				// After dialog is closed we're doing frontend updates
				// For add we're just pushing a new row inside DataService
				/*
				this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
				this.refreshTable();
				*/
			}
		});
	}

	//startEdit(i: number, id: number, title: string, state: string, url: string, created_at: string, updated_at: string) {
	startEdit(i: number, username: string, email: string) {
		//this.id = id;
		// index row is used just for debugging proposes and can be removed
		this.index = i;
		console.log(this.index);
		const dialogRef = this.dialog.open(UserEditDialogComponent, {
		  //data: {id: id, title: title, state: state, url: url, created_at: created_at, updated_at: updated_at}
		  data: {username: username, email: email}
		});

	
		dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {
				// When using an edit things are little different, firstly we find record inside DataService by id
				//const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
				// Then you update that record using data from dialogData (values you enetered)
				//this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
				// And lastly refresh table
				this.refreshTable();
			}
		});
  }

	//deleteItem(i: number, id: number, title: string, state: string, url: string) {
	deleteItem(i: number, username: string, email: string) {
		this.index = i;
		//this.id = id;
		const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
			//data: {id: id, title: title, state: state, url: url}
			data: {username: username, email: email}
		});

		
		dialogRef.afterClosed().subscribe(result => {
			if (result === 1) {
				//const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
				const foundIndex = this.data.findIndex(x => x.username === username);
				// for delete we use splice in order to remove single object from DataService
				//this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
				this.data.splice(foundIndex, 1);
				this.refreshTable();
			}
		});
	}

	private refreshTable() {
		// Refreshing table using paginator
		// Thanks yeager-j for tips
		// https://github.com/marinantonio/angular-mat-table-crud/issues/12
		this.dataSource.paginator = this.paginator;
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

}
