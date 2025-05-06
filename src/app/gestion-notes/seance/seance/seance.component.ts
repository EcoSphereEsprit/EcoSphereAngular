import { Component, OnInit } from '@angular/core';
import { SeanceDTO } from '../seance.model';
import { SeanceService } from '../seance.service';
import { CritereEvaluationService } from '../../CritereEvaluation/critere-evaluation.service';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.scss'],
  providers: [MessageService]

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
    private messageService: MessageService

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
    this.seance = { ...seance };  // Cloner l'objet seance pour éviter les effets de bord
    this.selectedSprintId = this.seance.sprintId;
    this.critereDialog = true;
    this.currentSeance = seance;
    
    // Charger les critères
    this.critereService.getCriteresBySprintId(this.seance.sprintId).subscribe(data => {
      this.criteres = data;
  
      // Charger les critères affectés après que les critères sont chargés
      this.seanceService.getCriteresBySeanceId(this.seance.id!).subscribe(affectes => {
        this.selectedCriteres = {};  // Réinitialiser selectedCriteres à un objet vide
        
        // Vérifier si affectes contient un tableau de critereIds et que critereIds est un tableau
        if (Array.isArray(affectes.critereIds)) {
          // Remplir selectedCriteres en comparant les critereIds de la séance avec les critères
          this.criteres.forEach(c => {
            this.selectedCriteres[c.nom] = affectes.critereIds.includes(c.id);
          });
        } else {
          console.error('Erreur: affectes.critereIds n\'est pas un tableau.', affectes);
        }
      });
    });
  }
  
  
  loadSelectedCriteres(seanceId: string): void {
    this.seanceService.getCriteresBySeanceId(seanceId).subscribe(response => {
      console.log('Raw API response:', response);
  
      const affectes = Array.isArray(response?.critereIds) ? response.critereIds : []; // Assurez-vous que c'est un tableau
  
      // Vérifier que `affectes` est un tableau
      if (!Array.isArray(affectes)) {
        console.error('affectes is not an array:', affectes);
        return; // Sortir si `affectes` n'est pas un tableau
      }
  
      // Vérification si le critère est dans affectes
      this.criteres.forEach(critere => {
        this.selectedCriteres[critere.id] = affectes.includes(critere.id);
      });
    });
  }
  
  saveCriteres(): void {
    if (this.currentSeance?.id) {
      // Identifier les IDs sélectionnés et non sélectionnés
      const selectedIds = Object.keys(this.selectedCriteres).filter(nom => this.selectedCriteres[nom]);
      const deselectedIds = Object.keys(this.selectedCriteres).filter(nom => !this.selectedCriteres[nom]);
    
      // Affection des critères sélectionnés (lorsque la case est cochée)
      if (selectedIds.length > 0) {
        this.seanceService.affecterCriteres(this.currentSeance.id, selectedIds).subscribe(() => {
          this.critereDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Critères mis à jour avec succès.' });

          
        });
      }
    
      // Désaffection des critères non sélectionnés (lorsque la case est décochée)
      if (deselectedIds.length > 0) {
        this.seanceService.deaffecterCriteres(this.currentSeance.id, deselectedIds).subscribe(() => {
          this.critereDialog = false;


        });
      }
      this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Critères mis à jour avec succès.' });

      this.loadSeances();

  
    }
  }
  
  
  
  
  


}

