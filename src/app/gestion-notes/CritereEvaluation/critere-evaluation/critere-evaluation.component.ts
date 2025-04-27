import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CritereEvaluationDTO } from '../critere-evaluation.model';
import { CritereEvaluationService } from '../critere-evaluation.service';
import { SprintService } from './sprint.service';

@Component({
  templateUrl: './critere-evaluation.component.html',
  styleUrls: ['./critere-evaluation.component.scss'],
  providers: [MessageService]
})
export class CriteresComponent implements OnInit {
  criteres: CritereEvaluationDTO[] = [];
  critereDialog: boolean = false;
  deleteCritereDialog: boolean = false;
  critere: CritereEvaluationDTO = {} as CritereEvaluationDTO;
  sprints: any[] = [];
  selectedSprintId: any;
  selectedCriteres: any[] = [];  // Liste des critères sélectionnés

  constructor(
    private critereService: CritereEvaluationService,
    private sprintService: SprintService,  // Inject SprintService
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCriteres();
    this.loadSprints();  // Load sprints on initialization
  }

  loadCriteres() {
    this.critereService.getAll().subscribe(
      (data) => {
        console.log('Données des critères:', data);  // Debugger les données récupérées
        this.criteres = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des critères:', error);
      }
    );
  }

  loadSprints() {
    this.sprintService.getAll().subscribe(
      (data) => {
        console.log('Données des sprints:', data);  // Debugger les données des sprints
        this.sprints = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des sprints:', error);
      }
    );
  }

  openNew() {
    this.critere = {} as CritereEvaluationDTO;
    this.critereDialog = true;
  }

  saveCritere() {
    if (this.critere.id) {
      // Mettre à jour le critère avec le titre du sprint (sprintId)
      this.critere.sprintId = this.selectedSprintId.titre; // Utiliser le titre du sprint, pas un ID numérique
      this.critereService.update(this.critere.id, this.critere).subscribe(
        (response) => {
          console.log('Critère modifié:', response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Critère modifié' });
          this.loadCriteres();
          this.critereDialog = false;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du critère:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la modification du critère.' });
        }
      );
    } else {
      // Créer un nouveau critère avec sprintId (titre du sprint)
      this.critere.sprintId = this.selectedSprintId.titre; 
      console.log(this.critere);// Utiliser le titre du sprint
      this.critereService.create(this.critere).subscribe(
        (response) => {
          console.log('Critère ajouté:', response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Critère ajouté' });
          this.loadCriteres();
          this.critereDialog = false;
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du critère:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'ajout du critère.' });
        }
      );
    }
  }

  editCritere(critere: CritereEvaluationDTO) {
    this.critere = { ...critere };
    this.critereDialog = true;
  }

  deleteCritere(critere: CritereEvaluationDTO) {
    this.deleteCritereDialog = true;
    this.critere = critere;
  }

  confirmDelete() {
    this.critereService.delete(this.critere.id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Critère supprimé' });
      this.loadCriteres();
      this.deleteCritereDialog = false;
    });
  }

  deleteSelectedCriteres() {
    if (this.selectedCriteres.length > 0) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ces critères ?')) {
        this.critereService.deleteCriteres(this.selectedCriteres.map(critere => critere.id))
          .subscribe(
            () => {
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Critères supprimés avec succès.' });
              this.loadCriteres();
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la suppression des critères.' });
            }
          );
      }
    }
  }
}
