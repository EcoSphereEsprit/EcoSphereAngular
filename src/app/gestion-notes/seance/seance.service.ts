
  import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeanceDTO } from './seance.model';

@Injectable({ providedIn: 'root' })
export class SeanceService {
  private apiUrl = 'http://localhost:9091/api/seance';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SeanceDTO[]> {
    return this.http.get<SeanceDTO[]>(this.apiUrl);
  }

  getById(id: string): Observable<SeanceDTO> {
    return this.http.get<SeanceDTO>(`${this.apiUrl}/${id}`);
  }

  create(seance: SeanceDTO): Observable<SeanceDTO> {
    return this.http.post<SeanceDTO>(this.apiUrl, seance);
  }

  update(id: string, seance: SeanceDTO): Observable<SeanceDTO> {
    return this.http.put<SeanceDTO>(`${this.apiUrl}/${id}`, seance);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  affecterCriteres(id: string, criteres: string[]): Observable<SeanceDTO> {
    return this.http.put<SeanceDTO>(`${this.apiUrl}/${id}/affecter-criteres-par-nom`, criteres);
  }

  affecterSprint(seanceId: string, sprintId: string): Observable<SeanceDTO> {
    return this.http.put<SeanceDTO>(`${this.apiUrl}/${seanceId}/affecter-sprint/${sprintId}`, {});
  }
}