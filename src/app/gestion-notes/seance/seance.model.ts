export interface SeanceDTO {
    id?: string |undefined;
    titre: string;
    description: string;
    date: string;
    typeNote: 'INDIVIDUELLE' | 'GROUPE';
    Note:0;
    sprintId : string ;
    critereIds? :[];
  }
  