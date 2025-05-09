export interface Document {
    id?: string;
    assignmentId: string;
    seanceId: string;
    etudiantId?: string;
    type?: 'LIEN' | 'DOCUMENT' | 'TEXTE';
    contenu: string;
    nomFichier?: string;
    commentaire?: string;
    statut: 'BROUILLON' | 'SOUMIS' | 'CORRIGE';
    dateSoumission?: Date;
  }
  
  export interface DocumentDto {
    seanceId?: null;
    assignmentId: string;
    typedoc?: 'LIEN' | 'DOCUMENT' | 'TEXTE'|undefined;
    contenu: string;
    nomFichier?: string;
    commentaire?: string;
  }