// src/app/demo/service/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../api/groups';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:9090/users';
  constructor(private http: HttpClient) {}

   loginUser(email: string, password: string) {
    return this.http.post(this.baseUrl +'/login', { email, password });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post(this.baseUrl+`/verify-otp`, null, {
      params: {
        email: email,
        otp: otp
      }
    });
  }

   getUserRole(token: string) {
    return this.http.get(this.baseUrl+`/getUserRole?token=${token}`, {
      responseType: 'text' // Ensure the response is treated as plain text
    });
  }
  
  createUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrl, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
  }

  getUserById(): Observable<any> {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers });
  }

  get2faToken(): Observable<any> {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/${id}/qr`, { headers });
  }

  getUserByEspritId(espritId: string) {
    return this.http.get<any>(this.baseUrl+`/espritid/${espritId}`).toPromise();
  }
  updateUserInfo(userId: string, userInfos : any) : Observable<any>{
    return this.http.put(this.baseUrl+`/${userId}`, userInfos);
  }
}
