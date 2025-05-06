import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeanceDTO } from './seance.model';

@Injectable({ providedIn: 'root' })
export class SeanceService {
  private apiUrl = 'http://localhost:9092/api/seances';

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



  private apiUrlcriteresseances = 'http://localhost:9091/api/criteres/';

  affecterCriteres(id: string, criteres: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrlcriteresseances}affecter-criteres/${id}`, criteres);
  }
  
  deaffecterCriteres(id: string, criteres: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrlcriteresseances}desaffecter-criteres/${id}`, criteres);
  }
  

  
  affecterSprint(seanceId: string, sprintId: string): Observable<SeanceDTO> {
    return this.http.put<SeanceDTO>(`${this.apiUrl}/${seanceId}/affecter-sprint/${sprintId}`, {});
  }

  getCriteresBySprintId(sprintId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sprints/sprint/${sprintId}`);
  }

  private apiUrlcritere = 'http://localhost:9091/api/criteres';

  getAllSprints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlcritere}/sprints`);
  }

  getCriteresBySeanceId(seanceId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:9092/api/seances/${seanceId}`);
  }
  
  private apiUrlcriteresprint = 'http://localhost:9091/api/criteres/sprints/';

  getCriteriaBySprint(sprintId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlcriteresprint}${sprintId}`);
  }

  
}
