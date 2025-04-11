import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SprintService } from '../sprints.service';
import { Sprint } from '../sprint.model';

@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
})
export class SprintFormComponent implements OnInit {
  sprint: Sprint = {
    _id: '',
    titre: '',
    description: '',
    ordre: 0,
    type: '',
    dateDebut: undefined,
    dateFin: undefined
  };

  constructor(private sprintService: SprintService, private router: Router) {}

  ngOnInit(): void {}
  goBackToList(): void {
    this.router.navigate(['/sprints/list']);
  }
  createSprint(): void {
    this.sprintService.createSprint(this.sprint).subscribe(
      response => {
        console.log('Sprint created:', response);
        this.router.navigate(['/sprints/list']); // Redirige vers la liste des sprints après création
      },
      error => {
        console.error('Error creating sprint:', error);
      }
    );
  }
}
