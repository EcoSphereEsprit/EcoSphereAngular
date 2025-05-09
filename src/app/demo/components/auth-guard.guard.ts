import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      this.router.navigate(['/auth/access']);
      return of(false)
    }


    return new Observable<boolean>((observer) => {
      this.userService.getUserRole(token).subscribe({
        next: (role: string) => {
          if (role === 'STUDENT' || role =='TEACHER') {
            this.router.navigate(['/auth/access']);
            observer.next(false);  
          } else {
            observer.next(true);  
          }
        },
        error: () => {
          this.router.navigate(['/auth/access']);
          observer.next(false); 
        }
      });
    });
  }
}


