// note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeanceDTO } from '../seance/seance.model';



export interface Note {
  id: string;
  seanceId: string;
  sprintId: string;
  critereId: string;
  etudiantId: string;
  groupeId: string;
  valeur: number;
  typeNote: string;
}
@Injectable({
  providedIn: 'root'
})


export class NoteService {
  private baseUrl = 'http://localhost:9091/api/notes'; // adapte au bon port

  constructor(private http: HttpClient) {}

  getNotesParEtudiant(etudiantId: string): Observable<Note []> {
    return this.http.get<Note[]>(`${this.baseUrl}/etudiant/${etudiantId}`);
  }

  private apiUrl = 'http://localhost:9092/api/seances';


  getById(id: string): Observable<SeanceDTO> {
    return this.http.get<SeanceDTO>(`${this.apiUrl}/${id}`);
  }
}
