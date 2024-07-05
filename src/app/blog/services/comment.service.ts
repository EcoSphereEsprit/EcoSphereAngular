import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://127.0.0.1:9090'; // Adjust URL as per your server setup

  constructor(private http: HttpClient) { }

  createComment(blogId: string, content: string, date: string, username: string): Observable<any> {
    const jwt = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.post(`${this.baseUrl}/comments/${blogId}`, { content, date, username }, {headers});
  }
  

  getAllComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments/getAll`);
  }

  getCommentById(commentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/getComment/${commentId}`);
  }
  getCommentByBlog(blogId: string): Observable<any> {
    const jwt = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get(`${this.baseUrl}/comments/getByBlog/${blogId}`, {headers});
  }

  updateComment(commentId: string, content: string, date: string): Observable<any> {
    const jwt = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.put(`${this.baseUrl}/comments/${commentId}`, { content }, {headers});
  }

  deleteComment(commentId: string): Observable<any> {
    const jwt = localStorage.getItem('token') ?? ''
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.delete(`${this.baseUrl}/comments/${commentId}`, {headers});
  }
}

