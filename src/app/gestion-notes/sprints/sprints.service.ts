import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sprint } from './sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private apiUrl = 'http://localhost:9091/api/sprints';  // Update with actual endpoint to get all sprints

  constructor(private http: HttpClient) { }

  // Method to fetch all sprints (you need to replace this with the actual endpoint)
  getSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.apiUrl);
  }

  // Method to fetch a specific sprint by ID (assuming this is used elsewhere)
  getSprintById(id: string): Observable<Sprint> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Sprint>(url);
  }
  createSprint(sprintData: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.apiUrl, sprintData);
  }

  updateSprint(id: string, sprintData: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.apiUrl}/${id}`, sprintData);
  }

  deleteSprint(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  deleteSelectedSprints(ids: string[]): Observable<void> {
    const url = `${this.apiUrl}/delete-selected`; // Create a new endpoint for deleting multiple sprints
    return this.http.post<void>(url, { ids });
  }
}


