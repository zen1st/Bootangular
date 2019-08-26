import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

import { Observable, Subject  } from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class TestEntityService {

	private subject = new Subject<any>();
	
	currentEntity ;
	entities;

	constructor(private apiService: ApiService,
		private config: ConfigService) {
	}

	get(id:number) {
		return this.apiService.get(this.config.test_entities_url+"/"+id).map(entity => this.currentEntity = entity);
	}

	post(body:any) {
		return this.apiService.post(this.config.test_entities_url, body).map(entity => this.currentEntity = entity + 
			this.entities.push(entity) + 
			this.subject.next(this.entities));
	}

	put(id:number, body:any) {
		return this.apiService.put(this.config.test_entities_url+"/"+id, body).map(entity => {this.currentEntity = entity;
			let index = this.entities.findIndex(x => x.id == id);
			this.entities[index] = this.currentEntity;
			this.subject.next(this.entities)
		});
	}

	delete(id:number) {
		//console.log(this.entities);
		/*return this.apiService.delete(this.config.test_entities_url+"/"+id).subscribe(data => {
			let index = this.entities.findIndex(x => x.id == id);
			//console.log(index);
			this.entities.splice(index, 1);
			//console.log(this.entities);
			this.subject.next(this.entities);
		}
		,err => { 
			console.log(err); 
		});
		*/
		
		return this.apiService.delete(this.config.test_entities_url+"/"+id).map(data => {
			let index = this.entities.findIndex(x => x.id == id);
			//console.log(index);
			this.entities.splice(index, 1);
			//console.log(this.entities);
			this.subject.next(this.entities);
		});
	}
	
	getCurrent(id: number){
		return this.entities[this.entities.findIndex(x => x.id == id)];
	}

	getAll() {
		//return this.apiService.get(this.config.test_entities_url);
		return this.apiService.get(this.config.test_entities_url).map(entities => this.entities = entities);;
	}
  
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
	

}