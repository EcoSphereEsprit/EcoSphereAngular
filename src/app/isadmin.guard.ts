import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const isadminGuard: CanActivateFn = (route, state) => {

    console.log('Auth Guard: Checking admin status...');
    const router = inject(Router);
    let role = localStorage.getItem('role')
    if(role == 'ADMIN'){
      console.log('IS A VALID ADMIN ACCOUNT')
      return true;
    }
    router.navigate(['/auth/access'])
    return false;
    
};
