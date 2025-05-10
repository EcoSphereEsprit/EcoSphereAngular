import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Assignment } from "./assignment.model";
import { catchError, map, Observable, throwError } from "rxjs";

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

      return this.http.post<Assignment>(`${this.apiUrl}`, assignment);

  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Erreur client: ${error.error.message}`;
    } else {
      return this.parseServerError(error);
    }
  }

  private parseServerError(error: HttpErrorResponse): string {
    try {
      const serverError = error.error;
      if (serverError.message) {
        return serverError.message;
      }
      return `Erreur serveur: ${error.status} - ${error.statusText}`;
    } catch (e) {
      return `Erreur inattendue: ${error.message}`;
    }
  }


  update(id: string, assignment: Assignment): Observable<Assignment> {
    return this.http.put<Assignment>(`${this.apiUrl}/${id}`, assignment);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteAll(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`);
  }


  getById(assignmentId: any): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiUrl}/${assignmentId}`);
  }
  // assignment.service.ts
getAssignmentTypeById(assignmentId: any): Observable<any> {
  return this.http.get<Assignment>(`${this.apiUrl}/${assignmentId}`).pipe(
    map(assignment => assignment.type), // Extract just the type
    catchError(error => {
      console.error('Error fetching assignment type:', error);
      return throwError(() => new Error('Failed to fetch assignment type'));
    })
  );
}
}