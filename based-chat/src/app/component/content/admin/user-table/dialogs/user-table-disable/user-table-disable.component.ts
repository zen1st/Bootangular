import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {
  UserService
} from 'app/service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-user-table-disable',
  templateUrl: './user-table-disable.component.html',
  styleUrls: ['./user-table-disable.component.css']
})
export class UserTableDisableComponent {

  constructor(public dialogRef: MatDialogRef<UserTableDisableComponent>,private httpClient: HttpClient,
              //@Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }
				@Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  disable(): void {
    //this.dataService.deleteIssue(this.data.id);
	
	this.userService.disableUser(this.data.username)
      .subscribe(res => {
		  //console.log(res);
      }, err => {
		  //console.log(err);
	});
  }
}
