import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('Auth Guard: Checking 2FA status...');
  const router = inject(Router);
  let isValid2fa = localStorage.getItem('is2FAValid')
  let isloggedIn = localStorage.getItem('isLoggedIn')
  if(isValid2fa == 'true' && isloggedIn == 'true'){
    console.log('isvalid2fa')
    return true;
  }
  else if(isloggedIn == 'false' || isloggedIn == undefined){
    return true;
  }
  console.log('is not valid2fa')
  router.navigate(['/auth/verification'])
  return false;
  
};
