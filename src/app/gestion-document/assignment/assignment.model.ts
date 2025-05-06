export interface Assignment {
    id: string;
    titre?: string;
    description?: string;
    seanceId?: string;
    typeRendu?: 'FICHIER' | 'LIEN' | 'TEXTE';
    dateLimite?: Date;
    statut?: 'A_FAIRE' | 'EN_COURS' | 'TERMINE';
    createdAt?: Date;
  }
  
  export interface AssignmentDialogData {
    isEdit?: boolean;
    assignment?: Partial<Assignment>;
  }