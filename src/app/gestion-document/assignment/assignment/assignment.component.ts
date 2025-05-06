import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  providers: [MessageService]

})

export class AssignmentListComponent implements OnInit
 {
  assignments: Assignment[] = [];
  selectedAssignments: Assignment[] = [];
  assignmentDialog: boolean = false;
  deleteAssignmentDialog: boolean = false;
  isEdit: boolean = false;
  assignmentToDelete: string | null = null;

  constructor(
    private assignmentService: AssignmentService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentService.getAll().subscribe({
      next: (data) => this.assignments = data,
      error: (err) => this.showError('Erreur de chargement', err.message)
    });
  }

  openNew() {
    this.isEdit = false;
    this.assignmentDialog = true;
  }

  editAssignment(id: string) {
    this.assignmentService.getById(id).subscribe({
      next: (assignment) => {
        this.isEdit = true;
        this.assignmentDialog = true;
      },
      error: (err) => this.showError('Erreur', err.message)
    });
  }

  deleteAssignment(id: string) {
    this.assignmentToDelete = id;
    this.deleteAssignmentDialog = true;
  }

  confirmDelete() {
    if (!this.assignmentToDelete) return;

    this.assignmentService.delete(this.assignmentToDelete).subscribe({
      next: () => {
        this.loadAssignments();
        this.showSuccess('Suppression', 'Assignment supprimé avec succès');
        this.deleteAssignmentDialog = false;
      },
      error: (err) => this.showError('Erreur', err.message)
    });
  }

  private showSuccess(title: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: detail,
      life: 3000
    });
  }

  private showError(title: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: detail,
      life: 3000
    });
  }
}