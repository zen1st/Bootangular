import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {
  UserService
} from 'app/service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-delete.dialog',
  templateUrl: './user.delete.dialog.html',
  styleUrls: ['./user.delete.dialog.css']
})
export class UserDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<UserDeleteDialogComponent>,private httpClient: HttpClient,
              //@Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }
				@Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    //this.dataService.deleteIssue(this.data.id);
	
	this.userService.deleteUser(this.data.username)
      .subscribe(res => {
		  //console.log(res);
      }, err => {
		  //console.log(err);
	});
  }
}
