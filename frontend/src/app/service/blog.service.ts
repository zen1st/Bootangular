import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';

@Injectable()
export class BlogService {

  currentBlog ;

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) { }
  
  getBlog(id:number) {
    return this.apiService.get(this.config.blogs_url+"/"+id).map(blog => this.currentBlog = blog);
  }
  
  postBlog(body:any) {
    return this.apiService.post(this.config.blogs_url, body).map(blog => this.currentBlog = blog);
  }
  
  putBlog(id:number, body:any) {
    return this.apiService.put(this.config.blogs_url+"/"+id, body).map(blog => this.currentBlog = blog);
  }

  deleteBlog(id:number) {
    return this.apiService.delete(this.config.blogs_url+"/"+id);
  }
  
  getAll() {
    return this.apiService.get(this.config.blogs_url);
  }

}
