import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {UserService} from 'src/app/demo/service/auth.service';
import { Router } from '@angular/router';
import { Message, SelectItem, MessageService } from 'primeng/api';

@Component({
	templateUrl: './login.component.html',
	providers: [MessageService]
})
export class LoginComponent {

	rememberMe: boolean = false;
	email: string = '';
    password: string = '';
	constructor(public layoutService: LayoutService, private UserService: UserService, private router: Router, private MessageService : MessageService) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

	validateInputs(email :string, password : string){
		if(!email){
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'validation error', detail: 'email is required'});
			return false;
		}
		if(!password){
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'validation error', detail: 'password is required'});
			return false;
		}
		return true;
	}
	login() {
		let isvalid = this.validateInputs(this.email, this.password);
		if(!isvalid){
			return;
		}
        this.UserService.loginUser(this.email, this.password).subscribe({
            next: (res : any) => {
                console.log('Login successful:', res);
                localStorage.setItem('token', res.token);
				localStorage.setItem('email', res.email);
				localStorage.setItem('id', res.id);
				if(res.is2FAEnabled){
					this.router.navigate(['/auth/verification']);
				}
				else{
					this.router.navigate(['/landing']);
				}
				
            },
            error: (err) => {
				this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Login in error', detail: err.error });
            }
        });
	}
	
}
