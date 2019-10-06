import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject  } from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

	private subject = new Subject<any>();
	
	currentEntity ;
	entities;
	
	constructor(private apiService: ApiService,
		private config: ConfigService) {
	}
  
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
	
  	get(id:number) {
		return this.apiService.get(this.config.chat_rooms_url+"/"+id).map(entity => this.currentEntity = entity);
	}
	
  	post(body:any) {
		return this.apiService.post(this.config.chat_rooms_url, body).map(entity => {
			this.currentEntity = entity;
			this.entities.push(entity);
			this.subject.next(this.entities);
			return entity;
		});
	}
	
	put(id:number, body:any) {
		return this.apiService.put(this.config.chat_rooms_url+"/"+id, body).map(entity => {this.currentEntity = entity;
			let index = this.entities.findIndex(x => x.id == id);
			this.entities[index] = this.currentEntity;
			this.subject.next(this.entities)
		});
	}


	delete(id:number) {
		return this.apiService.delete(this.config.chat_rooms_url+"/"+id).map(data => {
			//let index = this.entities.findIndex(x => x.id == id);
			//this.entities.splice(index, 1);
			//this.subject.next(this.entities);
		});
	}
	
	getAll() {
		return this.apiService.get(this.config.chat_rooms_url).map(entities => this.entities = entities);
	}
	
	getCurrent(id: number){
		return this.entities[this.entities.findIndex(x => x.id == id)];
	}

	getMine() {
		return this.apiService.get(this.config.chat_rooms_url+"/mine").map(entities => this.entities = entities);
	}
	
	search(body:any) {
		return this.apiService.post(this.config.chat_rooms_url+"/search",body);//.map(entities => this.entities = entities);
	}
	
	request(body:any) {
		return this.apiService.post(this.config.chat_rooms_url+"/request",body);//.map(entities => this.entities = entities);
	}
	
	accept(body:any) {
		return this.apiService.post(this.config.chat_rooms_url+"/accept",body);//.map(entities => this.entities = entities);
	}
	
	block(body:any) {
		return this.apiService.post(this.config.chat_rooms_url+"/block",body);//.map(entities => this.entities = entities);
	}
	
	unblock(body:any) {
		return this.apiService.post(this.config.chat_rooms_url+"/unblock",body);//.map(entities => this.entities = entities);
	}
	
	leave(body:any) {
		return this.apiService.post(this.config.chat_rooms_url+"/leave",body);//.map(entities => this.entities = entities);
	}
		
}
