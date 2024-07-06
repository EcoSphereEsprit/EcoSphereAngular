import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = 'u5Jf4B8rL$GnKq#S2vH@M5tP!Rw3z*Z'; // Directly set the token here

  constructor() {}

  getToken(): string | null {
    return this.token;
  }
}
