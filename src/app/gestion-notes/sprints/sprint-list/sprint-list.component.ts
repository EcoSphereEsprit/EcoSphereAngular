import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { SprintService } from '../sprints.service'; // Import the sprint service
import { Sprint } from '../sprint.model'; // Import the Sprint model

@Component({
  templateUrl: './sprint-list.component.html',
})
export class SprintListComponent implements OnInit {

  sprints: Sprint[] = []; // Initialize sprints array
  selectedSprints: Sprint[] = []; // Array to hold selected sprints

  constructor(private sprintService: SprintService, private router: Router) { }

  ngOnInit(): void {
    // Fetch sprints using subscribe
    this.sprintService.getSprints().subscribe(
      (sprints: Sprint[]) => {
        this.sprints = sprints;  // Assign the fetched data to the sprints array
      },
      error => {
        console.error('Error fetching sprints:', error);  // Log any error that occurs
      }
    );
  }

  onGlobalFilter(table: Table, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');  // Handle global search filter
  }

  navigateToCreateSprint(): void {
    this.router.navigate(['sprints/new']); 
  }

  // Edit sprint method - navigate to the edit page
  editSprint(sprint: Sprint): void {
    this.router.navigate([`/sprints/${sprint._id}/edit`]);  // Assuming the sprint has an ID and you're editing based on that
  }

  // Delete sprint method - delete the selected sprint
  deleteSprint(sprint: Sprint): void {
    if (confirm(`Are you sure you want to delete the sprint: ${sprint.titre}?`)) {
      this.sprintService.deleteSprint(sprint._id).subscribe(
        () => {
          this.sprints = this.sprints.filter(s => s._id !== sprint._id);  // Remove deleted sprint from the list
        },
        error => {
          console.error('Error deleting sprint:', error);
        }
      );
    }
  }

  // Delete selected sprints
  deleteSelectedSprints(): void {
    if (confirm('Are you sure you want to delete the selected sprints?')) {
      const idsToDelete = this.selectedSprints.map(sprint => sprint._id);
      this.sprintService.deleteSelectedSprints(idsToDelete).subscribe(
        () => {
          this.sprints = this.sprints.filter(s => !idsToDelete.includes(s._id));  // Remove deleted sprints from the list
          this.selectedSprints = [];  // Clear selected sprints
        },
        error => {
          console.error('Error deleting selected sprints:', error);
        }
      );
    }
  }
}
