import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Document, DocumentDto } from './document.model';
import { Assignment } from '../assignment/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:9096/api/documents';
  private fileUploadUrl = 'http://localhost:9096/api/uploads';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-User-ID': "EUT12165451",
      'Content-Type': 'application/json'
    });
  }

  private getFileUploadHeaders(): HttpHeaders {
    return new HttpHeaders({
      'X-User-ID': "EUT12165451"
    });
  }

  private apiAss = 'http://localhost:9096/api/assignments';

  // document.service.ts
getSubmittedDocumentsBySeance(seanceId: string): Observable<Document[]> {
  return this.http.get<Document[]>(`${this.apiUrl}/seance/${seanceId}/submitted`, {
    headers: this.getHeaders()
  }).pipe(
    catchError(this.handleError)
  );
}
  getAssignmentType(id: any): Observable<any> {
    return this.http.get<Assignment>(`${this.apiAss}/${id}`).pipe(
      map(assignment => assignment.type), // Extract just the type
      catchError(() => of('DOCUMENT')) // Fallback to default
    );
  }
  submitDocument(dto: DocumentDto ): Observable<any> {
    const headers = new HttpHeaders({
      'X-User-ID': "EUT12165451",
      'Content-Type': 'application/json'
    });

    // Transform typedoc to match backend enum values
    const backendType = this.mapToBackendType(dto.typedoc);

    const payload = {
      assignmentId: dto.assignmentId,
      seanceId: dto.seanceId || null,
      type: backendType,
      contenu: dto.contenu,
      nomFichier: dto.nomFichier,
      commentaire: dto.commentaire || ''
    };
    

    return this.http.post(this.apiUrl, payload, { headers }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }

  private mapToBackendType(frontendType: any): string {
    switch(frontendType) {
      case 'DOCUMENT': return 'DOCUMENT';
      case 'LIEN': return 'LIEN';
      case 'TEXTE': return 'TEXTE';
      default: return 'LIEN';
    }
  }

  
  // READ
  getBySeance(seanceId: string, etudiantId: string): Observable<Document[]> {
    return this.http.get<Document[]>(`${this.apiUrl}/seance/${seanceId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  getDocumentById(documentId: string): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${documentId}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // UPDATE
  updateDocument(documentId: string, dto: DocumentDto): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${documentId}`, dto, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateDocumentWithFile(documentId: string, dto: DocumentDto, file?: File): Observable<Document> {
    if (file) {
      return new Observable(observer => {
        this.uploadFile(file).subscribe({
          next: (uploadResult) => {
            const updatedDto: DocumentDto = {
              ...dto,
              contenu: uploadResult.fileUrl,
              nomFichier: uploadResult.fileName
            };
            this.updateDocument(documentId, updatedDto).subscribe({
              next: (doc) => observer.next(doc),
              error: (err) => observer.error(err)
            });
          },
          error: (err) => observer.error(err)
        });
      });
    } else {
      return this.updateDocument(documentId, dto);
    }
  }

  // DELETE
  deleteDocument(documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${documentId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError)
    );
  }

  // FILE OPERATIONS
  uploadFile(file: File): Observable<{fileUrl: string, fileName: string}> {
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      this.fileUploadUrl,
      formData,
      {
        headers: this.getFileUploadHeaders(),
        reportProgress: true,
        responseType: 'json'
      }
    );

    return this.http.request(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          return event.body;
        }
        return null;
      }),
      catchError(this.handleError)
    ) as Observable<{fileUrl: string, fileName: string}>;
  }

  getDocumentUrl(documentId: string): string {
    return `${this.apiUrl}/${documentId}/download`;
  }

  // ERROR HANDLING
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}