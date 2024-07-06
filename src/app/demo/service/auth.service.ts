import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:9090/user/login'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userData', JSON.stringify({ userId: response.userId, role: response.role }));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

  getToken(): string | null {
    return localStorage.getItem('loginToken');
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  }
}
