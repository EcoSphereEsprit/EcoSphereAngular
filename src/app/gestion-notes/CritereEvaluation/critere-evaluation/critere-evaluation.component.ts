import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CritereEvaluationDTO } from '../critere-evaluation.model';
import { CritereEvaluationService } from '../critere-evaluation.service';

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
  sprints: any[] = [
    { id: 1, titre: 'Sprint 1', description: 'Premier sprint du projet', dateDebut: '2025-01-01', dateFin: '2025-01-15' },
    { id: 2, titre: 'Sprint 2', description: 'Deuxième sprint du projet', dateDebut: '2025-02-01', dateFin: '2025-02-15' },
    { id: 3, titre: 'Sprint 3', description: 'Troisième sprint du projet', dateDebut: '2025-03-01', dateFin: '2025-03-15' },
    { id: 4, titre: 'Sprint 4', description: 'Quatrième sprint du projet', dateDebut: '2025-04-01', dateFin: '2025-04-15' }
  ];
  selectedSprintId: any
  selectedCriteres: any[] = [];  // Liste des critères sélectionnés

  constructor(
    private critereService: CritereEvaluationService,
    private messageService: MessageService
  ) {}

  
  ngOnInit(): void {
    this.loadCriteres();
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


  

  // Méthode pour supprimer les critères sélectionnés
  deleteSelectedCriteres() {
    if (this.selectedCriteres.length > 0) {
      // Demander une confirmation avant la suppression
      if (confirm('Êtes-vous sûr de vouloir supprimer ces critères ?')) {
        // Envoi de la requête DELETE pour supprimer les critères
        this.critereService.deleteCriteres(this.selectedCriteres.map(critere => critere.id))
          .subscribe(
            () => {
              // Message de succès
              this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Critères supprimés avec succès.'});
              // Rafraîchir la liste des critères après suppression
              this.loadCriteres();
            },
            (error) => {
              // Message d'erreur
              this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de la suppression des critères.'});
            }
          );
      }
    }
  }
}
