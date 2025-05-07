import { Component, OnInit } from '@angular/core';
import { Document, DocumentDto } from '../document.model';

import { DocumentService } from '../document.service';
import { MessageService } from 'primeng/api';
import { Assignment } from '../../assignment/assignment.model';
import { AssignmentService } from '../../assignment/assignment.service';

@Component({
  selector: 'app-student-assignments',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  providers: [MessageService]
})
export class StudentAssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  documents: Document[] = [];
  selectedSeance: string = '';
  documentDialog: boolean = false;
  currentDocument: DocumentDto = this.emptyDocument();
  uploadedFile?: File;
  etudiantId = '123'; // À remplacer par l'ID réel

  constructor(
    private assignmentService: AssignmentService,
    private documentService: DocumentService,
    private messageService: MessageService
  ) {}
  getStatusSeverity(status: string): string {
    switch(status) {
      case 'TERMINE': return 'success';
      case 'EN_COURS': return 'warning';
      default: return 'danger';
    }
  }
  ngOnInit() {
    this.loadSeancesAndAssignments();
  }

  emptyDocument(): DocumentDto {
    return {
      assignmentId: '',
      type: 'DOCUMENT',
      contenu: '',
      commentaire: ''
    };
  }

  loadSeancesAndAssignments() {
    this.assignmentService.getAll().subscribe(assignments => {
      this.assignments = assignments;
    });
  }



 


  loadDocuments(seanceId: string) {
    this.documentService.getBySeance(seanceId, this.etudiantId).subscribe(documents => {
      this.documents = documents;
    });
  }

  openSubmitDialog(assignment: Assignment) {
    this.currentDocument = {
      assignmentId: assignment.id!,
      type: assignment.typeRendu as 'DOCUMENT' | 'LIEN' | 'TEXTE',
      contenu: '',
      commentaire: ''
    };
    this.documentDialog = true;
  }

  onFileUpload(event: any) {
    this.uploadedFile = event.files[0];
    this.currentDocument.nomFichier = this.uploadedFile?.name;
  }

  isLinkValid(): boolean {
    if (this.currentDocument.type !== 'LIEN') return true;
    try {
      new URL(this.currentDocument.contenu);
      return true;
    } catch {
      return false;
    }
  }

  submitDocument() {
    if (this.currentDocument.type === 'LIEN' && !this.isLinkValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez entrer un lien valide'
      });
      return;
    }

    if (this.currentDocument.type === 'DOCUMENT' && !this.uploadedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez sélectionner un fichier'
      });
      return;
    }

    this.documentService.submitDocument(this.currentDocument, this.etudiantId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Document soumis avec succès'
        });
        this.documentDialog = false;
        this.loadDocuments(this.selectedSeance);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.message || 'Échec de la soumission'
        });
      }
    });
  }

  updateStatut(document: Document, newStatut: 'BROUILLON' | 'SOUMIS' | 'CORRIGE') {
    const updatedDoc = { ...document, statut: newStatut };
    // Implémentez la mise à jour si votre backend le permet
  }
}