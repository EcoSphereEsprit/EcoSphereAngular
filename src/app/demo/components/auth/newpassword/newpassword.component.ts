import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	templateUrl: './newpassword.component.html'
})
export class NewPasswordComponent {

	// Fields for password inputs and OTP logic
	password: string = '';
	confirmPassword: string = '';
	otp: string = '';
	otpType: string = ''; // 'mzil' or 'auth'
	rememberMe: boolean = false;

	constructor(public layoutService: LayoutService) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

	verifyOtp(): void {
		if (!this.otpType) {
			alert('Please select OTP type.');
			return;
		}

		if (!this.otp) {
			alert('Please enter the OTP.');
			return;
		}

		if (!this.password || !this.confirmPassword) {
			alert('Please fill in both password fields.');
			return;
		}

		if (this.password !== this.confirmPassword) {
			alert('Passwords do not match.');
			return;
		}

		// Mocked logic for now — replace with actual service calls
		if (this.otpType === 'mzil') {
			console.log('Verifying MZIL OTP:', this.otp);
			// TODO: call service to verify MZIL OTP
		} else if (this.otpType === 'auth') {
			console.log('Verifying AUTH OTP:', this.otp);
			// TODO: call service to verify AUTH OTP
		}

		// Continue with password reset or navigation
		alert('OTP verified and password reset (mocked).');
	}
}
