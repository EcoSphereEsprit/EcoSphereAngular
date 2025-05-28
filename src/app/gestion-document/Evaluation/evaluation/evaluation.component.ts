import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../evaluation.service';
import { AssignmentService } from '../../assignment/assignment.service';
import { forkJoin, map } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  documentsGrouped: Record<string, Record<string, any[]>> = {};
  assignmentDescriptions: Record<string, string> = {};

  constructor(
    private documentService: EvaluationService,
    private assignmentService: AssignmentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.documentService.getAllDocuments().subscribe((docs) => {
      this.groupDocuments(docs);
    });
  }

  extractFilename(path: string): string {
    return path ? path.replace(/^.*[\\\/]/, '') : ''; 
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  groupDocuments(documents: any[]) {
    this.documentsGrouped = {};

    // Récupérer les descriptions des assignments
    const uniqueAssignmentIds = Array.from(new Set(documents.map(doc => doc.assignmentId)));

    const fetchAssignments$ = uniqueAssignmentIds.map(id =>
      this.assignmentService.getByIdForEval(id).pipe(
        map(res => ({
          id,
          description: res?.description || 'Non définie'
        }))
      )
    );

    forkJoin(fetchAssignments$).subscribe((assignments) => {
      assignments.forEach(a => {
        this.assignmentDescriptions[a.id] = a.description;
      });

      documents.forEach((doc) => {
        const seanceKey = this.assignmentDescriptions[doc.assignmentId] || 'Non définie';
        const etudiantId = doc.etudiantId || 'Inconnu';

        // Transformation du chemin de fichier pour afficher depuis assets/
        if (doc.nomFichier  && doc.typedoc=='DOCUMENT') {
          const filename = this.extractFilename(doc.nomFichier);
          doc.nomFichier = `assets/${filename}`;
        }

        if (!this.documentsGrouped[seanceKey]) {
          this.documentsGrouped[seanceKey] = {};
        }

        if (!this.documentsGrouped[seanceKey][etudiantId]) {
          this.documentsGrouped[seanceKey][etudiantId] = [];
        }

        this.documentsGrouped[seanceKey][etudiantId].push(doc);
      });
    });
  }

  submitEvaluation(doc: any) {
    const evaluation = {
      documentId: doc._id,  // note: doc.id -> doc._id selon ta structure
      enseignantId: 'PROF_ID_123', // Remplace par l'ID réel connecté
      note: doc.note,
      suggestion: doc.suggestion
    };

    this.documentService.submitEvaluation(evaluation).subscribe(() => {
      alert('Évaluation envoyée avec succès');
    });
  }
}
