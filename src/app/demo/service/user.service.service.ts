import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private loginUrl = 'http://127.0.0.1:9090/user/login';
  private registerUrl = 'http://127.0.0.1:9090/user/signup';
  private forgotPasswordUrl = 'http://127.0.0.1:9090/user/forgetpassword/';
  private resetpassword = 'http://127.0.0.1:9090/user/resetpassword/';
  private checkToken = 'http://127.0.0.1:9090/user/chechToken/';
  private generate2faCode = 'http://127.0.0.1:9090/user/get2FaId/';
  private verift2fa = 'http://127.0.0.1:9090/user/verify2FACode/';
  private logoutRoute = 'http://127.0.0.1:9090/user/logout';
  private getuserByIdUrl = 'http://127.0.0.1:9090/user/userbyid/'
  private updateUserUrl = 'http://127.0.0.1:9090/user/updateuser/'

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(this.loginUrl, body, { headers });
  }

  register(username: string, email: string, password: string, phoneNumber: string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phoneNumber', phoneNumber);
    formData.append('image', image);

    return this.http.post<any>(this.registerUrl, formData);
  }

  updateUser(username: string, email: string, phoneNumber: string, image: File, userid : string , jwt : string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('image', image);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.patch<any>(this.updateUserUrl+userid, formData, {headers});
  }
  forgetpassword(username: string): Observable<any> {
    const body = {}
    return this.http.post<any>(this.forgotPasswordUrl+username, body);
  }

  resetPassword(password: string, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ password });
    return this.http.post<any>(`${this.resetpassword}${token}`, body, { headers });
  }

  isValidToken(token: string): Observable<any> {
    return this.http.get<any>(`${this.checkToken}${token}`);
  }

  genrate2fa(jwt : string, token : string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get<any>(`${this.generate2faCode}${token}`, {headers});
  }

  verify2fa(jwt : string, code : string , mfaId : string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get<any>(this.verift2fa+mfaId+'/'+code, {headers});
  }

  logout(jwt : string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get<any>(this.logoutRoute, {headers});
  }

  getavatar(jwt: string, url: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    console.log(url)
    return this.http.get(url, { headers, responseType: 'blob' });
  }

  getUserById(jwt : string, id : string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    });
    return this.http.get<any>(this.getuserByIdUrl+id, {headers});
  }
}
