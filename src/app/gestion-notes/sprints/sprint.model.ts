export interface Sprint {
    _id: string;
    titre: string;
    description: string;
    ordre: number;
    type: string;
    dateDebut?: Date;
    dateFin?: Date;
}
