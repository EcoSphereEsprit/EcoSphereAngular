import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {UserService} from 'src/app/demo/service/auth.service';
import { Router } from '@angular/router';
import { Message, SelectItem, MessageService } from 'primeng/api';

@Component({
    templateUrl: './verification.component.html',
    providers: [MessageService]
})
export class VerificationComponent implements OnInit {

    val1!: number;
    
    val2!: number;
    
    val3!: number;
    
    val4!: number;

    val5!: number;

    val6!: number;

    mfaCode !: string;

    userEmail !: string;
    userCode !: string 
    jwt !: string;
	constructor(public layoutService: LayoutService, private UserService: UserService, private router: Router, private messgeService: MessageService) {}
    ngOnInit(): void {
        this.jwt = localStorage.getItem('token') ?? ""
        localStorage.removeItem('token');
    }

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
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
        console.log('Values:', this.val1, this.val2, this.val3, this.val4, this.val5, this.val6); // Log each value
        this.userCode = 
                        (this.val1 !== undefined && this.val1 !== null ? this.val1.toString() : '') +
                        (this.val2 !== undefined && this.val2 !== null ? this.val2.toString() : '') +
                        (this.val3 !== undefined && this.val3 !== null ? this.val3.toString() : '') +
                        (this.val4 !== undefined && this.val4 !== null ? this.val4.toString() : '') +
                        (this.val5 !== undefined && this.val5 !== null ? this.val5.toString() : '') +
                        (this.val6 !== undefined && this.val6 !== null ? this.val6.toString() : '');

        if (this.jwt) {
            console.log(this.userCode)
        this.UserService.verifyOtp(localStorage.getItem('email') ?? "", this.userCode).subscribe(
            response => {
                localStorage.setItem('token', this.jwt);
                if(response){
                    this.router.navigate(['/']);
                }
                else{
                    this.messgeService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Wrong OTP please rety again.' });

                }
            },
            error => {
                localStorage.setItem('is2FAValid', 'false');
                this.messgeService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Wrong OTP please rety again.' });

            }
          );
    }
    }
}
