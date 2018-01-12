import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable()
export class ArticleService {

  currentArticle ;

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) { }
  
  getArticle(id:number) {
    return this.apiService.get(this.config.article_url+"/"+id).map(article => this.currentArticle = article);
  }
  
  postArticle(body:any) {
    return this.apiService.post(this.config.article_url, body).map(article => this.currentArticle = article);
  }
  
  putArticle(id:number, body:any) {
    return this.apiService.put(this.config.article_url+"/"+id, body).map(article => this.currentArticle = article);
  }

  deleteArticle(id:number) {
    return this.apiService.delete(this.config.article_url+"/"+id);
  }
  
  getAll() {
    return this.apiService.get(this.config.article_url);
  }

}
