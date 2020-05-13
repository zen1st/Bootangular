import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject } from '@angular/core';
import {
  UserService
} from 'app/service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-table-unable',
  templateUrl: './user-table-unable.component.html',
  styleUrls: ['./user-table-unable.component.css']
})
export class UserTableUnableComponent {

  constructor(public dialogRef: MatDialogRef<UserTableUnableComponent>,private httpClient: HttpClient,
              //@Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }
				@Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  unable(): void {
    //this.dataService.deleteIssue(this.data.id);
	
	this.userService.unableUser(this.data.username)
      .subscribe(res => {
		  //console.log(res);
      }, err => {
		  //console.log(err);
	});
  }
}
