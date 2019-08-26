import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject  } from "rxjs/Rx";

@Injectable()
export class UserService {

	private subject = new Subject<any>();
	
	currentUser;
	users;

	constructor(
		private apiService: ApiService,
		private config: ConfigService
	) { }

	initUser() {
		const promise = this.apiService.get(this.config.refresh_token_url).toPromise()
		.then(res => {
		  //if (res.access_token !== null) {
			return this.getMyInfo().toPromise()
			.then(user => {
			  this.currentUser = user;
			});
		  //}
		})
		.catch(() => null);
		return promise;
	}

	resetCredentials() {
		return this.apiService.get(this.config.reset_credentials_url);
	}

	changePassword(passwordChanger) {
		return this.apiService.post(this.config.change_password_url, passwordChanger);
	}

	getMyInfo() {
		return this.apiService.get(this.config.whoami_url).map(user => this.currentUser = user);
	}

	deleteUser(username:string) {
		return this.apiService.delete(this.config.users_url+"/"+username).map(data => {
			let index = this.users.findIndex(x => x.username == username);
			this.users.splice(index, 1);
			this.subject.next(this.users);
		});
	}
  
	disableUser(username:string) {	
		return this.apiService.put(this.config.users_url + "/disable/" + username,{}).map(user => {
			let index = this.users.findIndex(x => x.username == username);
			this.users[index] = user;
			this.subject.next(this.users)
		});
	}
  
	unableUser(username:string) {
		return this.apiService.put(this.config.users_url + "/unable/" + username,{}).map(user => {
			let index = this.users.findIndex(x => x.username == username);
			this.users[index] = user;
			this.subject.next(this.users);
		});
	}
  
	getAll() {
		return this.apiService.get(this.config.users_url).map(users => this.users = users);
	}
  
	getMessage(): Observable<any> {
		return this.subject.asObservable();
	}
}
