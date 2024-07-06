import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserServiceService } from 'src/app/demo/service/user.service.service';
import { MessageService} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    templateUrl: './forgotpassword.component.html',
	providers: [MessageService]
})
export class ForgotPasswordComponent { 
	username: string = '';
	test: string = '';
    constructor(
		public layoutService: LayoutService,
		private userService: UserServiceService,
		private router: Router,
		private messageService: MessageService
	) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

	onSubmit(){
		this.userService.forgetpassword(this.username).subscribe(response => {
			this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Mail sent check your inbox!' });
		  },
		  error => {
			const errorMessage = error.error?.message;
			this.messageService.add({ key: 'tst', severity: 'error', summary: 'we cant send you the mail', detail: errorMessage });
		  }
		);
	}

}
