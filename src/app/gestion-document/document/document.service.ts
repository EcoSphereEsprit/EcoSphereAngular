import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document, DocumentDto } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:9096/api/documents';

  constructor(private http: HttpClient) {}

  submitDocument(dto: DocumentDto, etudiantId: string): Observable<Document> {
    const headers = new HttpHeaders({
      'X-User-ID': "EUT12165451"
    });
    return this.http.post<Document>(this.apiUrl, dto, { headers });
  }

  getBySeance(seanceId: string, userId: string): Observable<Document[]> {
    const headers = new HttpHeaders({
      'X-User-ID': "EUT12165451"
    });
    return this.http.get<Document[]>(`${this.apiUrl}/seance/${seanceId}`, { headers });
  }

  deleteDocument(documentId: string, etudiantId: string): Observable<void> {
    const headers = new HttpHeaders({
      'X-User-ID': "EUT12165451"
    });
    return this.http.delete<void>(`${this.apiUrl}/${documentId}`, { headers });
  }
}