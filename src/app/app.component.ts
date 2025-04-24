import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

// Définir l'interface Sprint pour typer les données
export interface Sprint {
  _id: string;
  titre: string;
  description: string;
  ordre: number;
  type: string;
  dateDebut: string;
  dateFin: string;
  _class: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    sprints: Sprint[] = []; 
    selectedSprintId: string | undefined;  

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
        // Configurer le ripple effect de PrimeNG
        this.primengConfig.ripple = true;

        // Simuler les données de sprints
        this.sprints = [
            {
                _id: '67f66916aa461e3d477e1e39',
                titre: 'Sprint 0',
                description: 'Analyse et spécification des besoins. Étude globale, spécification fonctionnelle.',
                ordre: 0,
                type: 'individuelle',
                dateDebut: '2025-03-01T00:00:00.000+00:00',
                dateFin: '2025-03-14T23:59:59.000+00:00',
                _class: 'tn.esprit.pi.notemanagement.notemanagementmicroservice.Entities.Sprint'
            },
            {
                _id: '78a562b15c431e7f487e1e40',
                titre: 'Sprint 1',
                description: 'Développement des fonctionnalités principales, tests unitaires.',
                ordre: 1,
                type: 'individuelle',
                dateDebut: '2025-03-15T00:00:00.000+00:00',
                dateFin: '2025-03-28T23:59:59.000+00:00',
                _class: 'tn.esprit.pi.notemanagement.notemanagementmicroservice.Entities.Sprint'
            },
            {
                _id: 'ab12798d25431c8e75b8e20',
                titre: 'Sprint 2',
                description: 'Intégration continue, tests d’intégration.',
                ordre: 2,
                type: 'individuelle',
                dateDebut: '2025-03-29T00:00:00.000+00:00',
                dateFin: '2025-04-11T23:59:59.000+00:00',
                _class: 'tn.esprit.pi.notemanagement.notemanagementmicroservice.Entities.Sprint'
            }
        ];
    }
}
