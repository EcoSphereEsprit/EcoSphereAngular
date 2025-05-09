import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {UserService} from 'src/app/demo/service/auth.service';
import { Router } from '@angular/router';
import { Message, SelectItem, MessageService } from 'primeng/api';

@Component({
	templateUrl: './register.component.html',
	providers: [MessageService]
})


export class RegisterComponent implements OnInit{

	roles: SelectItem[] = [];
	confirmed: boolean = false;
	selectedDrop: SelectItem = { value: '' };
	@ViewChild('nameInput') nameInput!: ElementRef;
	@ViewChild('emailInput') emailInput!: ElementRef;
	@ViewChild('passwordInput') passwordInput!: ElementRef;
	@ViewChild('phoneInput') phoneInput!: ElementRef;
	@ViewChild('roleSelect') roleSelect!: ElementRef;
	@ViewChild('classInput') classInput!: ElementRef;
	@ViewChild('EspritIdInput') EspritIdInput!: ElementRef;
	msgs: Message[] = [];
	display: boolean = false;
    constructor(public layoutService: LayoutService, private userService: UserService, private router: Router, private MessageService : MessageService) {}
	SelectedRole! : any;
	ngOnInit() {
		this.roles = [
            { label: 'admin', value: { id: 1, name: 'ADMIN' } },
            { label: 'student', value: { id: 2, name: 'STUDENT'} },
            { label: 'teacher', value: { id: 3, name: 'TEACHER' } },
        ];
	}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

	logRole(selectedRole: any) {
		this.SelectedRole = selectedRole;
	  }

	  checkFormValidation() {
		const name = this.nameInput.nativeElement.value.trim();
		const email = this.emailInput.nativeElement.value.trim();
		const password = this.passwordInput.nativeElement.value.trim();
		const phone = this.phoneInput.nativeElement.value.trim();
		const role = this.SelectedRole?.name?.trim();
	    const className = this.classInput.nativeElement.value.trim();
		const espritId = this.EspritIdInput.nativeElement.value.trim();
		const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
		const phoneRegex = /^[0-9]{8}$/; // exactly 8 numbers
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic email pattern
	
		if (!name) {
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Name is required.' });
			return false;
		}
	
		if (!email) {
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Email is required.' });
			return false;
		}
	
		if (!emailRegex.test(email)) {
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Invalid email format.' });
			return false;
		}
	
		if (!password) {
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Password is required.' });
			return false;
		}
	
		if (password.length < 8) {
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Password must be at least 8 characters long.' });
			return false;
		}
	
		if (!specialCharRegex.test(password)) {
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Password must contain at least one special character.' });
			return false;
		}
	
		if (!phone) {
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Phone number is required.' });
			return false;
		}
	
		if (!phoneRegex.test(phone)) {
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Phone number must be exactly 8 digits.' });
			return false;
		}
	
		if (!role) {
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'Role selection is required.' });
			return false;
		}
		if(!className && role && this.SelectedRole.name == 'STUDENT'){
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'class is required for students.' });
			return false;
		}
		if(className &&  role && this.SelectedRole.name != 'STUDENT'){
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'you cannot assign a class to an admin or a teacher.' });
			return false;
		}
		if(espritId && role && (this.SelectedRole.name !='STUDENT' &&  this.SelectedRole.name !='TEACHER')){
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'you cannot assign an espritId to an admin.' });
			return false;
		}
		if(!espritId && role && (this.SelectedRole.name =='STUDENT' || this.SelectedRole.name =='TEACHER')){
			this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Validation Error', detail: 'EspritId is required for students and teachers.' });
			return false;
		}
		return true;
	}
	
	
	

	registerUser(){
		let isValidForm = this.checkFormValidation();
		if(!isValidForm){
			return;
		}
		const newUser: any = {
			name: this.nameInput.nativeElement.value,
			email: this.emailInput.nativeElement.value,
			password: this.passwordInput.nativeElement.value,
			phone: this.phoneInput.nativeElement.value,
			role: this.SelectedRole.name,
			className : this.classInput.nativeElement.value,
			espritId : this.EspritIdInput.nativeElement.value
		  };
		  this.userService.createUser(newUser).subscribe({
			next: res => {
				this.MessageService.add({ key: 'tst', severity: 'success', summary: 'Sent', detail: 'User Created with id ' + res.id });
				this.display = true;
			},
			error: err => this.MessageService.add({ key: 'tst', severity: 'error', summary: 'Signup error', detail: 'User with this Email already exsists.' })

		  });
	}
}


