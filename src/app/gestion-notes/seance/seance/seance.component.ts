import { Component, OnInit } from '@angular/core';
import { SeanceDTO } from '../seance.model';
import { SeanceService } from '../seance.service';
import { CritereEvaluationService } from '../../CritereEvaluation/critere-evaluation.service';

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
  selectedSeanceId: string = 'string';

  seance: SeanceDTO = { titre: '', description: '', date: '', typeNote: 'INDIVIDUELLE', Note: 0, sprintId: "1" };

  typeNoteOptions = [
    { label: 'INDIVIDUELLE', value: 'INDIVIDUELLE' },
    { label: 'NOTE GROUPE', value: 'NOTE GROUPE' },
  ];

  // Criteres & Sprint
  critereDialog = false;
  sprints: any[] = [];
  selectedSprintId: string = '';
  criteresOptions: any[] = [];
  selectedCriteres: any[] = [];
  currentSeance?: SeanceDTO|undefined;

  constructor(
    private seanceService: SeanceService,
    private critereService: CritereEvaluationService
  ) {}

  ngOnInit(): void {
    this.loadSeances();
    this.loadSprints(); // chargement au début
  }

  loadSeances(): void {
    this.seanceService.getAll().subscribe(data => this.seances = data);
  }

  loadSprints(): void {
    this.critereService.getAllSprints().subscribe(s => this.sprints = s);
  }

  openNew(): void {
    this.seance = { titre: '', description: '', date: '', typeNote: 'INDIVIDUELLE', Note: 0, sprintId: "1" };
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
    this.selectedSeances.forEach(s => {
      if (s.id) {
        this.seanceService.delete(s.id).subscribe(() => this.loadSeances());
      }
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


  // Dans SeanceComponent

onSprintChange(): void {
  if (this.selectedSprintId) {
    this.critereService.getCriteresBySprintId(this.selectedSprintId).subscribe(data => {
      this.criteresOptions = data;
      this.selectedCriteres = []; // reset sélection
    });
  } else {
    this.criteresOptions = [];
    this.selectedCriteres = [];
  }
}

openCritereDialog(seance: SeanceDTO): void {
  this.currentSeance = seance;
  this.critereDialog = true;
  this.selectedSprintId = '';
  this.criteresOptions = [];
  this.selectedCriteres = [];

  // Débogage : afficher l'ID de la séance
  console.log('Séance sélectionnée pour affectation :', this.currentSeance.id);
}

saveCriteres() {
  if (this.selectedCriteres.length > 0 && this.currentSeance?.id) {
    // Extract the 'nom' from each selected criterion and pass as an array of strings
    const criteresNom = this.selectedCriteres.map(criter => criter.nom);

    // Pass the list of criterion names (nom) to the backend method
    this.seanceService.affecterCriteres(this.currentSeance.id, criteresNom).subscribe(() => {
      // Handle successful criteria assignment (e.g., close dialog)
      this.critereDialog = false;
    });
  } else {
    console.error('Selected criteria or Seance ID is missing.');
  }
}


  
}




