
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:9096/api/documents';

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documents`);
  }
  private apiUrlEvaluation = 'http://localhost:9096/api/evaluations';

  getEvaluationsByDocument(documentId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlEvaluation}/evaluations/document/${documentId}`);
  }

  submitEvaluation(evaluation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlEvaluation}/evaluations`, evaluation);
  }
}
