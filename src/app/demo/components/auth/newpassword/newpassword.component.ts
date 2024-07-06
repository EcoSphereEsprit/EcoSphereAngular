
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/demo/service/user.service.service';
@Component({
	templateUrl: './newpassword.component.html'
})
export class NewPasswordComponent implements OnInit{

	rememberMe: boolean = false;
	token!: string;
	password!: string;
	constructor(
		public layoutService: LayoutService, 
		private route: ActivatedRoute,
		private userService: UserServiceService,
		private router: Router
	) {}

	ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('uuid')!;
      if(this.token == null || this.token == undefined){
		this.router.navigate(['/auth/access']);
	  }
	  this.userService.isValidToken(this.token).subscribe(
        response => {
          // DO NOTHING
        },
        error => {
			this.router.navigate(['/auth/access']);
        }
      );
    });
  }

	 
	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

	 onSubmit(){
	 this.userService.resetPassword(this.password, this.token).subscribe(
        response => {
          this.router.navigate(['/auth/login']);
        },
        error => {
			this.router.navigate(['/auth/access']);
        }
      );
		
	}

}
