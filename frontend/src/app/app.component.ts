import {Component,OnInit} from '@angular/core';
import {
  UserService
} from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
	
	constructor(private userService: UserService) { }
  
    ngOnInit() {
      this.userService.getMyInfo()
      .subscribe(res => {
		//console.log(localStorage.getItem('rememberMe'));
		
        //this.forgeResonseObj(this.whoamIResponse, res, path);
      }, err => {
        //this.forgeResonseObj(this.whoamIResponse, err, path);
      });
  }
}
