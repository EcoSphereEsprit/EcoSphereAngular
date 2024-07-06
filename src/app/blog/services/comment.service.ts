import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://127.0.0.1:9090'; // Adjust URL as per your server setup

  constructor(private http: HttpClient) { }

  createComment(blogId: string, content: string, date: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/comments/${blogId}`, { content, date });
  }

  getAllComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments/getAll`);
  }

  getCommentById(commentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/getComment/${commentId}`);
  }
  getCommentByBlog(blogId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments/getByBlog/${blogId}`);
  }

  updateComment(commentId: string, content: string, date: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/comments/${commentId}`, { content, date });
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/${commentId}`);
  }
}

