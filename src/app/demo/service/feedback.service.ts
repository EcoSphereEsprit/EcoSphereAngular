import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation } from '../module/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'http://localhost:9091/api/evaluations'; // à adapter à ton backend

  constructor(private http: HttpClient) {}

  getAll(id:any): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.baseUrl+"/findbyproject/"+id);
  }

  getById(id: number): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.baseUrl}/${id}`);
  }

  create(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.baseUrl, evaluation);
  }

  update(id: number, evaluation: Evaluation): Observable<Evaluation> {
    return this.http.put<Evaluation>(`${this.baseUrl}/${id}`, evaluation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
