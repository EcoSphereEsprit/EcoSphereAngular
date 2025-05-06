import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Assignment } from "./assignment.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private apiUrl = 'http://localhost:9096/api/assignments';

  constructor(private http: HttpClient) {}

  getBySeance(seanceId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiUrl}/seance/${seanceId}`);
  }

  getAll(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiUrl}`);
  }



  create(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.apiUrl, assignment);
  }

  update(id: string, assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>(`${this.apiUrl}/${id}`, assignment);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getById(assignmentId: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiUrl}/${assignmentId}`);
  }
  
}