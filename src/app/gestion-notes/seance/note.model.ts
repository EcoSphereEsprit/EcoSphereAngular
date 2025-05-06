export interface Note {
    id?: string;
    seanceId?: string;
    sprintId?: string;
    critereId?: string;
    etudiantId: string;
    groupeId?: string;
    valeur: number;
    typeNote?: 'INDIVIDUELLE' | 'GROUPE'; // Enum correspond au backend
  }
  