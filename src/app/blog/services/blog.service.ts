import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import your AuthService

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private baseUrl = 'http://127.0.0.1:9090'; // Adjust URL as per your server setup

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBlogs(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Change from Bearer to JWT
    });
    return this.http.get<any[]>(`${this.baseUrl}/blogs/getAll`, { headers });
  }


  createBlog(blogData: FormData): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/blogs`, blogData);
  }

  updateBlog(blogId: string, blogData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/blogs/${blogId}`, blogData);
  }

  getBlogById(blogId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/blogs/getId/${blogId}`);
  }

  deleteBlog(blogId: string): Observable<any> {
    
    return this.http.delete(`${this.baseUrl}/blogs/${blogId}`);
  }

}
