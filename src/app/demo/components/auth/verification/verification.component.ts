import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserServiceService } from 'src/app/demo/service/user.service.service';
import {Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
    templateUrl: './verification.component.html'
})
export class VerificationComponent implements OnInit, CanActivate {

    val1!: number;
    
    val2!: number;
    
    val3!: number;
    
    val4!: number;

    userCode !: string 

    mfaCode !: string;

    userEmail !: string;

	constructor(
        public layoutService: LayoutService,
        private userService: UserServiceService,
        private router: Router
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return true;
    }
    ngOnInit(): void {
        const jwt = localStorage.getItem('token')
        const id = localStorage.getItem('userId')
        if (jwt && id) {
            this.userService.genrate2fa(jwt, id).subscribe(
              response => {
                this.mfaCode = response.MFACode;
                this.userEmail = this.transformFirstThreeChars(response.userMail);
                console.log(this.mfaCode);
                console.log(this.userEmail);
              },
              error => {
                console.error(error);
              }
            );
          } else {
            this.router.navigate(['/auth/access']);
          }
    }
    

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}
    transformFirstThreeChars(input: string): string {
        if (input.length < 3) {
          return '*'.repeat(input.length);
        }
        return '***' + input.slice(3);
      }
    onDigitInput(event: any) {
        let element;
        if (event.code !== 'Backspace')
            if (event.code.includes('Numpad')|| event.code.includes('Digit')) {
                element = event.srcElement.nextElementSibling;
            }
        if (event.code === 'Backspace')
            element = event.srcElement.previousElementSibling;

        if (element == null)
            return;
        else
            element.focus();
    }
    
    onsubmit(){
        this.userCode =  (this.val1 !== undefined && this.val1 !== null ? this.val1.toString() : '') +
        (this.val2 !== undefined && this.val2 !== null ? this.val2.toString() : '') +
        (this.val3 !== undefined && this.val3 !== null ? this.val3.toString() : '') +
        (this.val4 !== undefined && this.val4 !== null ? this.val4.toString() : '');
        const jwt = localStorage.getItem('token')
        if (jwt) {
        this.userService.verify2fa(jwt, this.userCode, this.mfaCode).subscribe(
            response => {
                localStorage.setItem('is2FAValid', 'true');
                this.router.navigate(['/landing']);
            },
            error => {
                localStorage.setItem('is2FAValid', 'false');
            }
          );
    }
    }
    
}
