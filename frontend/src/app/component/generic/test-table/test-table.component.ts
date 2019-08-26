import { Component, OnInit, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd   } from '@angular/router'
import { Subscription } from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { TestTableModalComponent } from './test-table-modal/test-table-modal.component';

import {
  TestEntityService,
  BlogService
} from 'app/service';

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
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css']
})
export class TestTableComponent implements OnInit {

	private title;
	private imgUrl;
	
	private data: any[];

	public displayedColumns: string[];// = ["username","actions"];
	public dataSource; //= new MatTableDataSource(DATA);

	public conditionsList = CONDITIONS_LIST;
	public searchValue: any = {};
	public searchCondition: any = {};
	private _filterMethods = CONDITIONS_FUNCTIONS;

	index: number;
	id: number;
	
    messages: any[] = [];
    subscription: Subscription;
	
	constructor(private titleService: Title,
		private router : Router, 
		private route: ActivatedRoute,
		public dialog: MatDialog,
		private testEntityService: TestEntityService,
		private blogService : BlogService) { }

	ngOnInit() {
		this.titleService.setTitle("Demo Table");
		this.title = "Demo Table with CRUD Functions";
		this.imgUrl="/assets/startbootstrap-clean-blog-gh-pages/img/home-bg.jpg";
		
		
		this.testEntityService.getAll().subscribe(
			data => {
				this.data = data;
				this.displayedColumns = ["name", "number", "actions"];
				this.dataSource = new MatTableDataSource(this.data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}
			,err => { console.log(err); }
			,()=> {	
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
		);

        this.subscription = this.testEntityService.getMessage().subscribe(message => {
			if (message) {
				this.dataSource = new MatTableDataSource(message);
				this.refreshTable();
			} else {
			// clear messages when empty message received
			//this.messages = [];
			}
		});
		
	}
	
	ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        //this.subscription.unsubscribe();
    }
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
	addNew(issue: any) {
		const dialogRef = this.dialog.open(TestTableModalComponent, {
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
