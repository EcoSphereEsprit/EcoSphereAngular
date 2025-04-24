import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeanceDTO } from './seance.model';

@Injectable({
  providedIn: 'root',
})
export class SeanceService {
  private apiUrl = 'http://localhost:9091/api/seance'; // URL centrale pour toutes les requêtes

  constructor(private http: HttpClient) {}

  // Récupérer toutes les séances
  getAllSeances(): Observable<SeanceDTO[]> {
    return this.http.get<SeanceDTO[]>(this.apiUrl);
  }

  // Ajouter une nouvelle séance
  addSeance(seance: SeanceDTO): Observable<SeanceDTO> {
    return this.http.post<SeanceDTO>(this.apiUrl, seance);
  }

  // Modifier une séance existante
  updateSeance(seance: SeanceDTO): Observable<SeanceDTO> {
    return this.http.put<SeanceDTO>(`${this.apiUrl}/${seance.id}`, seance);
  }

  // Supprimer une séance
  deleteSeance(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Supprimer plusieurs séances
  deleteSelectedSeances(ids: string[]): Observable<void> {
    return this.http.request<void>('DELETE', this.apiUrl, { body: { ids } });
  }
}