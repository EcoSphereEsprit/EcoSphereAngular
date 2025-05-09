import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamations } from '../api/customer';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private baseUrl = 'http://localhost:9091/api/reclamations';

  constructor(private http: HttpClient) { }

  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  createReclamation(body: Reclamations , userId : string): Observable<Reclamations> {
    return this.http.post<Reclamations>(
      this.baseUrl + "/" + userId,
      body,
      this.httpOptions
    );
  }

  editReclamation(body: Reclamations , id : string): Observable<Reclamations> {
    return this.http.put<Reclamations>(
      this.baseUrl + '/' + id,
      body,
      this.httpOptions
    );
  }

  deleteReclamation( id : string , userId : string): Observable<Reclamations> {
    return this.http.delete<Reclamations>(
      this.baseUrl + '/' + id + "?userId=" + userId,
    
    );
  }
}
