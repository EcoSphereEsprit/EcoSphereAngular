import { Component, OnInit, ViewChild } from '@angular/core';
import { Document, DocumentDto } from '../document.model';
import { DocumentService } from '../document.service';
import { MessageService } from 'primeng/api';
import { Assignment } from '../../assignment/assignment.model';
import { AssignmentService } from '../../assignment/assignment.service';
import { FileUpload } from 'primeng/fileupload';

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
  currentDocument: DocumentDto = this.emptyDocument();
  uploadedFile: File | undefined;
  etudiantId = '123'; 
  documentDialog: boolean = true;
  isUrlValid: boolean = true;
  isSubmitting: boolean = false;

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private assignmentService: AssignmentService,
    private documentService: DocumentService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadSeancesAndAssignments();
  }

  emptyDocument(): DocumentDto {
    return {
      assignmentId: '',
      typedoc: 'DOCUMENT',
      contenu: '',
      commentaire: '',
      nomFichier: ''
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
    this.resetDialog();
    this.currentDocument.assignmentId = assignment.id!;
    this.currentDocument.typedoc = assignment.typeRendu as 'DOCUMENT' | 'LIEN' | 'TEXTE';
    this.documentDialog = true;
  }

  resetDialog() {
    this.currentDocument = this.emptyDocument();
    this.uploadedFile = undefined;
    this.isUrlValid = true;
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
  }

  closeDialog() {
    this.documentDialog = false;
    this.resetDialog();
  }

  validateUrl(): void {
    const pattern = /^(http|https):\/\/[^ "]+$/;
    this.isUrlValid = pattern.test(this.currentDocument.contenu);
  }

  onFileSelect(event: any): void {
    const file = event.files[0];
    if (file) {
      this.uploadedFile = file;
      this.currentDocument.nomFichier = file.name;
    }
  }


  isFormValid(): boolean {
    if (!this.currentDocument.assignmentId) return false;

    switch (this.currentDocument.typedoc) {
      case 'LIEN':
        return !!this.currentDocument.contenu && this.isUrlValid;
      case 'DOCUMENT':
        return !!this.uploadedFile;
      case 'TEXTE':
        return !!this.currentDocument.contenu?.trim();
      default:
        return false;
    }
  }

  submitDocument() {
 
    this.isSubmitting = true;
    const payload: DocumentDto = {
      assignmentId: this.currentDocument.assignmentId,
      typedoc: this.currentDocument.typedoc,
      contenu: this.currentDocument.contenu,
      nomFichier: this.currentDocument.nomFichier || this.uploadedFile?.name,
      commentaire: this.currentDocument.commentaire
    };

    this.documentService.submitDocument(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Document soumis avec succès'
        });
        this.closeDialog();
        if (this.selectedSeance) {
          this.loadDocuments(this.selectedSeance);
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error?.message || 'Échec de la soumission'
        });
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  getStatusSeverity(status: string): string {
    switch(status) {
      case 'SOUMIS': return 'success';
      case 'EN_COURS': return 'warning';
      default: return 'danger';
    }
  }

  updateStatut(document: Document, newStatut: 'BROUILLON' | 'SOUMIS' | 'CORRIGE') {
    const updatedDoc = { ...document, statut: newStatut };
    // Implementation depends on your backend
  }
}