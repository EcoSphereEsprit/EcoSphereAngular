import { Component, OnInit } from '@angular/core';
import { SeanceDTO } from '../seance.model';
import { SeanceService } from '../seance.service';

@Component({
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.scss']
})
export class SeanceComponent implements OnInit {
deleteSelectedSeances() {
throw new Error('Method not implemented.');
}
  seances: SeanceDTO[] = [];

  constructor(private seanceService: SeanceService) {}

  ngOnInit() {
    this.loadSeances();
  }

  loadSeances() {
    this.seanceService.getAllSeances().subscribe(
      (seances) => {
        this.seances = seances;
      },
      (error) => {
        console.error('Erreur lors du chargement des séances', error);
      }
    );
  }

  
  editSeance(id: string) {
    // Appeler une méthode pour modifier la séance
    console.log('Modifier la séance avec ID:', id);
  }
  
  deleteSeance(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
      this.seanceService.deleteSeance(id).subscribe(
        () => {
          console.log('Séance supprimée');
          this.loadSeances();  // Recharge la liste des séances après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la séance', error);
        }
      );
    }
  }
  
}
