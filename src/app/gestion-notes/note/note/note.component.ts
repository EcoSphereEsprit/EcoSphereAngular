import { Component, OnInit } from '@angular/core';
import { NoteService, Note } from '../note.service';
import { SeanceDTO } from '../../seance/seance.model';
import { SeanceService } from '../../seance/seance.service';

@Component({
  selector: 'app-student-notes',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  etudiantId = 'EUT12165451';
  notes: (Note & { seance?: SeanceDTO & { criteres?: any[] } })[] = [];
  moyenne: number = 0;

  constructor(
    private noteService: NoteService,
    private seanceService: SeanceService
  ) {}

  ngOnInit(): void {
    this.noteService.getNotesParEtudiant(this.etudiantId).subscribe(data => {
      this.notes = data;
      this.calculerMoyenne();

      this.notes.forEach(note => {
        this.seanceService.getCriteresBySeanceId(note.seanceId).subscribe(seanceWithCritere => {
          note.seance = seanceWithCritere;
          
          if (note.seance?.criteres) {
            note.seance.criteres.forEach(critere => {
              critere.note = this.notes.find(n => 
                n.seanceId === note.seanceId && 
                n.critereId === critere.id
              )?.valeur;
            });
          }
        });
      });
    });
  }

  // Méthode pour récupérer la note spécifique à un critère
  getNoteForCritere(note: any, critereId: string): number | undefined {
    if (!note.seance?.criteres) return undefined;
    const critere = note.seance.criteres.find((c: { id: string; }) => c.id === critereId);
    return critere?.note;
  }

  calculerMoyenne() {
    if (this.notes.length === 0) return;
    const total = this.notes.reduce((acc, note) => acc + note.valeur, 0);
    this.moyenne = total / this.notes.length;
  }
}