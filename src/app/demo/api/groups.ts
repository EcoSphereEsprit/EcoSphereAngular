export interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
    role: 'TEACHER' | 'STUDENT';
    phone: string;
    className: string;
    espritId: string;
  }
  
  export interface Group {
    id: string;
    name: string;
    projectName: string;
    encadrant: UserResponseDTO;
    members: UserResponseDTO[];
  }
  