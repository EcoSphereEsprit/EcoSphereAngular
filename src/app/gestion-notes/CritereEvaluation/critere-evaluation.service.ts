import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CritereEvaluationDTO } from './critere-evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class CritereEvaluationService {
  private apiUrl = 'http://localhost:9091/api/criteres'; // URL centrale pour toutes les requêtes

  constructor(private http: HttpClient) {}

  getAll(): Observable<CritereEvaluationDTO[]> {
    return this.http.get<CritereEvaluationDTO[]>('http://localhost:9091/api/criteres');
  }
  create(critere: CritereEvaluationDTO): Observable<CritereEvaluationDTO> {
    return this.http.post<CritereEvaluationDTO>(this.apiUrl, critere);
  }

  update(id: string, critere: CritereEvaluationDTO): Observable<CritereEvaluationDTO> {
    return this.http.put<CritereEvaluationDTO>(`${this.apiUrl}/${id}`, critere);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  deleteCriteres(ids: string[]) {
    // Effectuer la suppression multiple des critères par leur ID
    return this.http.delete(`http://localhost:9091/api/criteres`, { 
      body: { ids }  // Passer les IDs des critères à supprimer
    });
  }
}