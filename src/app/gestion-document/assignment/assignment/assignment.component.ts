import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';
import { MessageService } from 'primeng/api';
import { SeanceService } from 'src/app/gestion-notes/seance/seance.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  providers: [MessageService]
})
export class AssignmentListComponent implements OnInit {
  assignments: Assignment[] = [];
  selectedAssignments: Assignment[] = [];
  assignmentDialog: boolean = false;
  deleteAssignmentDialog: boolean = false;
  isEdit: boolean = false;
  assignmentToDelete: string | null = null;
  currentAssignment: Assignment = this.emptyAssignment();
  seanceOptions: any[] = [];

  constructor(
    private assignmentService: AssignmentService,
    private seanceClient: SeanceService,
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
    this.loadAssignments();
    this.loadSeances();
  }

  emptyAssignment(): Assignment {
    return {
      id: '',
      titre: '',
      description: '',
      seanceId: '',
      typeRendu: 'DOCUMENT',
      dateLimite: new Date(),
      statut: 'A_FAIRE',
      createdAt: new Date()
    };
  }

  loadAssignments() {
    this.assignmentService.getAll().subscribe({
      next: (data) => this.assignments = data,
    });
  }

  loadSeances() {
    this.seanceClient.getAll().subscribe({
      next: (seances) => {
        this.seanceOptions = seances.map(s => ({
          label: `Séance ${s.id} - ${s.titre}`,
          value: s.id
        }));
      },
    });
  }

  openNew() {
    this.currentAssignment = this.emptyAssignment();
    this.isEdit = false;
    this.assignmentDialog = true;
  }

  editAssignment(assignment: Assignment) {
    this.currentAssignment = { ...assignment };
    this.isEdit = true;
    this.assignmentDialog = true;
  }

  
  saveAssignment() {
    const operation = this.isEdit 
      ? this.assignmentService.update(this.currentAssignment.id, this.currentAssignment)
      : this.assignmentService.create(this.currentAssignment);

    operation.subscribe({
      next: () => {
        this.loadAssignments();
        this.showSuccess('Succès', `Assignment ${this.isEdit ? 'modifié' : 'créé'} avec succès`);
        this.assignmentDialog = false;
      }    });
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
      }    });
  }

 

  private showSuccess(title: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: detail,
      life: 3000
    });
  }
}