import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {
  TestEntityService
} from 'app/service';

@Component({
  selector: 'app-test-table-modal',
  templateUrl: './test-table-modal.component.html',
  styleUrls: ['./test-table-modal.component.css']
})
export class TestTableModalComponent implements OnInit {

	form : FormGroup;
	formBuilder: FormBuilder;
	
	values : any = {};
	
	constructor(public dialogRef: MatDialogRef<TestTableModalComponent>, 
		@Inject(MAT_DIALOG_DATA) public data: any,
		public testEntityService: TestEntityService){
		console.log('inject', data);
	}

	ngOnInit() {

		this.form = new FormGroup({
			name: new FormControl(),
			number: new FormControl()
		});
		
		if(this.data.action=="edit"){
			this.values.id = this.data.id;
			this.values.name = this.testEntityService.getCurrent(this.data.id).name;
			this.values.number = this.testEntityService.getCurrent(this.data.id).number;
		}
	}
	  formControl = new FormControl('', [
		Validators.required
		// Validators.email,
	  ]);

	getErrorMessage() {
	return this.formControl.hasError('required') ? 'Required field' :
	  this.formControl.hasError('email') ? 'Not a valid email' :
		'';
	}

	submit() {
	// emppty stuff
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
	
	public add(): void {
		console.log(this.form.value);
		
		this.testEntityService.post(this.form.value).subscribe(
			suc => {
				//console.log(suc);
			},
			err => {
				console.log(err );
			}
		);
	}
	
	edit(): void {
		
		this.testEntityService.put(this.data.id, this.values).subscribe(
			suc => {
				//console.log(suc);
			},
			err => {
				console.log(err );
			}
		);
	}
	
	delete(): void {
		//this.dataService.deleteIssue(this.data.id);
	
		this.testEntityService.delete(this.data.id).subscribe(
			suc => {
				//console.log(suc);
			},
			err => {
				console.log(err );
			}
		);
	}
}