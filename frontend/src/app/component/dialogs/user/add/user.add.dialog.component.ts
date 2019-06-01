import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {
  UserService
} from 'app/service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-add.dialog',
  templateUrl: './user.add.dialog.html',
  styleUrls: ['./user.add.dialog.css']
})

export class UserAddDialogComponent {
  constructor(public dialogRef: MatDialogRef<UserAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public userService: UserService) { }

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

  public confirmAdd(): void {
    //this.UserService.addIssue(this.data);
  }
}
