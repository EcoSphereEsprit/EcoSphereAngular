import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {UserService} from 'src/app/demo/service/auth.service';
import { Router } from '@angular/router';
import { Message, SelectItem, MessageService } from 'primeng/api';
@Component({
	templateUrl: './newpassword.component.html',
	providers: [MessageService]
})
export class NewPasswordComponent {

	// Fields for password inputs and OTP logic
	password: string = '';
	confirmPassword: string = '';
	otp: string = '';
	otpType: string = ''; // 'mzil' or 'auth'
	rememberMe: boolean = false;
	email: string = '';

	constructor(public layoutService: LayoutService, private userService: UserService, private Router : Router, private MessageService : MessageService) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

	async verifyOtp() {
		if (!this.otpType) {
			alert('Please select OTP type.');
			return;
		}

		if (!this.otp) {
			alert('Please enter the OTP.');
			return;
		}


		if (this.password !== this.confirmPassword) {
			alert('Passwords do not match.');
			return;
		}


   this.userService.resetPassword(this.email, this.password, this.otp).subscribe({
  next: (response) => {
    if (response.status === 200) {
      this.MessageService.add({
        key: 'tst',
        severity: 'success',
        summary: 'Success',
        detail: 'Password reset successfully'
      });
	  
      if(localStorage.getItem('active') == 'false'){
	 	 this.Router.navigate(['/auth/savepicture'])
	  }
	  else{
		this.Router.navigate(['/auth/verifypicture'])
	  }

    } else {
      this.MessageService.add({
        key: 'tst',
        severity: 'warn',
        summary: 'Unexpected',
        detail: `Unexpected status: ${response.status}`
      });
    }
  },
  error: (err) => {
    console.error('Error during password reset:', err);
    this.MessageService.add({
      key: 'tst',
      severity: 'error',
      summary: 'Failed',
      detail: 'Invalid OTP or server error'
    });
  }
});

  
	
localStorage.setItem('email',this.email);
		
	}
	onEmailBlur(): void {
		if (this.isValidEmail(this.email) && this.otpType == 'mail') {
			this.sendForgotPasswordEmail();
		}
	}
      sendForgotPasswordEmail(): void {
		alert('sending for '+this.email)
		this.userService.sendForPassWordMail(this.email)
	}
	isValidEmail(email: string): boolean {
		// Basic email regex
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}


}
