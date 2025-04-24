import { Component, OnInit } from '@angular/core';
import { SeanceDTO } from '../seance.model';
import { SeanceService } from '../seance.service';



@Component({
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.scss'],
})
export class SeanceComponent implements OnInit {
  seances: SeanceDTO[] = [];
  typeNoteOptions = [
    { label: 'INDIVIDUELLE', value: 'INDIVIDUELLE' },
    { label: 'NOTE GROUPE', value: 'NOTE GROUPE' }
  ];  
  selectedSeances: SeanceDTO[] = [];
  seanceDialog = false;
  deleteSeanceDialog = false;
  seance: SeanceDTO = { titre: '', description: '', date: '', typeNote: 'INDIVIDUELLE' ,Note :0};
  isEdit = false;
isEditMode: any;

  constructor(private seanceService: SeanceService) {}

  ngOnInit(): void {
    this.loadSeances();
  }

  loadSeances(): void {
    this.seanceService.getAll().subscribe(data => this.seances = data);
  }

  openNew(): void {
    this.seance = { titre: '', description: '', date: '', typeNote: 'INDIVIDUELLE' , Note:0 };
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

  viewSeance(id: string): void {
    this.seanceService.getById(id).subscribe(s => this.seance = s);
  }
}
