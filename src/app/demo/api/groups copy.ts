// src/app/models/user-response-dto.ts
export interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
    role: Roles;
    phone: string;
    className: string;
    espritId: string;
  }
  
  export type Roles = 'STUDENT' | 'TEACHER' | 'ADMIN'; // adjust roles as needed
  