export interface Document {
    id?: string;
    assignmentId: string;
    seanceId: string;
    etudiantId?: string;
    type: 'LIEN' | 'DOCUMENT' | 'TEXTE';
    contenu: string;
    nomFichier?: string;
    commentaire?: string;
    statut: 'BROUILLON' | 'SOUMIS' | 'CORRIGE';
    dateSoumission?: Date;
  }
  
  export interface DocumentDto {
    assignmentId: string;
    type: 'LIEN' | 'DOCUMENT' | 'TEXTE';
    contenu: string;
    nomFichier?: string;
    commentaire?: string;
  }