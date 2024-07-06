import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private postBlog = 'http://127.0.0.1:9090/blogs';
  private getBlogs = 'http://127.0.0.1:9090/blogs/getAll';
  
  constructor() { }
}
