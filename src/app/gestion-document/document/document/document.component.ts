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
  currentDocument: DocumentDto;
  uploadedFile?: File ;
  etudiantId = '123'; 
 documentDialog: boolean = false;;
  isUrlValid: boolean = true;
  isSubmitting: boolean = true;
  currentAssignment: Assignment |any;
  currentType:any= '';

  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private assignmentService: AssignmentService,
    private documentService: DocumentService,
    private messageService: MessageService
  ) {    this.currentDocument = this.emptyDocument();
 
}

  ngOnInit() {
    this.loadSeancesAndAssignments();
  }

  emptyDocument(assignment?: Assignment): DocumentDto {
    // Use the assignment's type if available, otherwise default to 'DOCUMENT'
    const type = assignment?.typeRendu || 'LIEN';
    
    return {
      assignmentId: assignment?.id || '',
      typedoc: type,
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
    console.log('Assignment data:', assignment); // Debug log
    
    this.currentAssignment = assignment;
    this.currentDocument = this.emptyDocument(assignment);
    this.currentType = this.currentDocument.typedoc; // Set currentType
    
    console.log('Document type:', this.currentDocument.typedoc);
    console.log('ASS type:', this.currentAssignment.typeRendu); // Should show 'LIEN'
    // Should show 'LIEN'
    this.documentDialog = true;
  }
  
  resetDialog() {
    this.currentDocument = this.emptyDocument(); // Reset without assignment
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
      assignmentId: this.currentAssignment?.id,
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