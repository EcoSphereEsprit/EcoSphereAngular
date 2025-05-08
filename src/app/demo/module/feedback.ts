import { Critere } from "./critere";

  export interface Evaluation {
    id?: number;
    description: string;
    note: number;
    critere: Critere;
    projet: number;
    user: number;
  }