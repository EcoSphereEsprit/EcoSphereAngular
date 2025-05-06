// note.component.ts
import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from '../note.service';
import { SeanceDTO } from '../../seance/seance.model';
import { SeanceService } from '../../seance/seance.service';

@Component({
  selector: 'app-student-notes',
  templateUrl: './note.component.html',
})
export class NoteComponent implements OnInit {
  etudiantId = 'EUT12165451';
  notes: (Note & { seance?: SeanceDTO })[] = [];
  moyenne: number = 0;

  constructor(
    private noteService: NoteService,
    private seanceService: SeanceService
  ) {}

  ngOnInit(): void {
    this.noteService.getNotesParEtudiant(this.etudiantId).subscribe(data => {
      // Pour chaque note, on récupère la séance
      this.notes = data;
      this.calculerMoyenne();

      this.notes.forEach(note => {
        this.seanceService.getById(note.seanceId).subscribe(seance => {
          note.seance = seance;
        });
      });
    });
  }

  calculerMoyenne() {
    if (this.notes.length === 0) return;
    const total = this.notes.reduce((acc, note) => acc + note.valeur, 0);
    this.moyenne = total / this.notes.length;
  }
}
