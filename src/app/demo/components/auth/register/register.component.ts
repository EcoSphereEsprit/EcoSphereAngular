import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserServiceService } from 'src/app/demo/service/user.service.service';
import { NgForm } from '@angular/forms';
@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  confirmed: boolean = false;
  username!: string;
  email!: string;
  password!: string;
  phoneNumber!: string;
  image!: File;
  registerForm!: NgForm;

  constructor(public layoutService: LayoutService, private userService: UserServiceService) {}

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  onSubmit() {
    this.userService.register(this.username, this.email, this.password, this.phoneNumber, this.image)
      .subscribe(
        response => {
          console.log('User registered successfully', response);
        },
        error => {
          console.error('Error registering user', error);
        }
      );
  }
}
