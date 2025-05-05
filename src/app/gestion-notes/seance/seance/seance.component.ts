import { Component, OnInit } from '@angular/core';
import { SeanceDTO } from '../seance.model';
import { SeanceService } from '../seance.service';
import { CritereEvaluationService } from '../../CritereEvaluation/critere-evaluation.service';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.scss'],
})
export class SeanceComponent implements OnInit {
  seances: SeanceDTO[] = [];
  selectedSeances: SeanceDTO[] = [];
  seanceDialog = false;
  deleteSeanceDialog = false;
  isEdit = false;
 
  seance: SeanceDTO = {
    titre: '',
    description: '',
    date: '',
    typeNote: 'INDIVIDUELLE',
    Note: 0,
    sprintId: '1',
  };

  typeNoteOptions = [
    { label: 'INDIVIDUELLE', value: 'INDIVIDUELLE' },
    { label: 'NOTE GROUPE', value: 'NOTE GROUPE' },
  ];

  // Critère et sprint
  critereDialog = false;
  sprints: any[] = [];
  selectedSprintId: string = '';
  criteresOptions: any[] = [];
  selectedCriteres: { [id: string]: boolean } = {};
  currentSeance?: SeanceDTO;

  constructor(
    private seanceService: SeanceService,
    private critereService: CritereEvaluationService,
  ) {}


  ngOnInit(): void {
    this.loadSeances();
  }

  loadSeances(): void {
    this.seanceService.getAll().subscribe(data => this.seances = data);
  }



  openNew(): void {
    this.seance = {
      titre: '',
      description: '',
      date: '',
      typeNote: 'INDIVIDUELLE',
      Note: 0,
      sprintId: '1',
    };
    this.seanceDialog = true;
    this.isEdit = false;
  }

  editSeance(id: string): void {
    this.seanceService.getById(id).subscribe(s => {
      this.seance = s;
      this.seanceDialog = true;
      this.isEdit = true;
    });
  }

  deleteSeance(id: string): void {
    this.seanceService.getById(id).subscribe(s => {
      this.seance = s;
      this.deleteSeanceDialog = true;
    });
  }

  confirmDelete(): void {
    if (this.seance.id) {
      this.seanceService.delete(this.seance.id).subscribe(() => {
        this.loadSeances();
        this.deleteSeanceDialog = false;
      });
    }
  }

  deleteSelectedSeances(): void {
    const idsToDelete = this.selectedSeances.map(s => s.id).filter(Boolean);
    idsToDelete.forEach(id => {
      this.seanceService.delete(id!).subscribe(() => this.loadSeances());
    });
    this.selectedSeances = [];
  }

  saveSeance(): void {
    if (this.isEdit && this.seance.id) {
      this.seanceService.update(this.seance.id, this.seance).subscribe(() => {
        this.loadSeances();
        this.seanceDialog = false;
      });
    } else {
      this.seanceService.create(this.seance).subscribe(() => {
        this.loadSeances();
        this.seanceDialog = false;
      });
    }
  }

  criteres: any[] = [];
  seanceCritereIds: string[] = [];
  
  loadCriteresBySprint(sprintId: string) {
    this.critereService.getCriteresBySprintId(sprintId).subscribe(data => {
      this.criteres = data;
    });
  }
  
  onSprintChange(sprintId: string) {
    this.loadCriteresBySprint(sprintId);
  }
 
  openCritereDialog(seance: any) {
    this.seance = { ...seance }; // Clone to avoid direct modifications
  
    // Ensure the sprintId is set correctly in the dialog
    this.selectedSprintId = this.seance.sprintId; // Explicitly set the selectedSprintId (this helps bind the value)
  
    // Open the criteria dialog
    this.critereDialog = true;
  
    // Load criteres based on the sprintId (as you are already doing)
    this.loadCriteresBySprint(this.seance.sprintId);
  }
  
  saveCriteres(): void {
    if (this.currentSeance?.id) {
      // On filtre les critères sélectionnés par rapport aux valeurs de selectedCriteres
      const selectedIds = Object.keys(this.selectedCriteres).filter(nom => this.selectedCriteres[nom]);
  
      // Envoi des critères sélectionnés ou désélectionnés
      this.seanceService.affecterCriteres(this.currentSeance.id, selectedIds).subscribe(() => {
        this.critereDialog = false;  // Fermer le dialog après l'opération
        this.loadSeances();          // Rafraîchir la liste des séances pour voir les changements
      });
    }
  }
  


}

