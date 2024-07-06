import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { UserServiceService } from 'src/app/demo/service/user.service.service';
import { MessageService, Message } from 'primeng/api'
@Component({
    templateUrl: './profilecreate.component.html',
    providers: [MessageService]
})
export class ProfileCreateComponent implements OnInit { 

    countries: any[] = [];
    userData: any = {
        username: '',
        email: '',
        phoneNumber: null,
        country: null,
        image: ''
    };
    userImage !: SafeUrl

    username!: string;
    email!: string;
    phoneNumber!: string;
    image!: File;
    userid !: string;
    jwt !: string
    constructor(private userService: UserServiceService , private sanitizer : DomSanitizer, private messageService: MessageService){}

    ngOnInit() {
        this.countries = [
            {name: 'Australia', code: 'AU'},
            {name: 'Brazil', code: 'BR'},
            {name: 'China', code: 'CN'},
            {name: 'Egypt', code: 'EG'},
            {name: 'France', code: 'FR'},
            {name: 'Germany', code: 'DE'},
            {name: 'India', code: 'IN'},
            {name: 'Japan', code: 'JP'},
            {name: 'Spain', code: 'ES'},
            {name: 'United States', code: 'US'}
        ];

        this.userid = localStorage.getItem('userId') ?? '';
        this.jwt = localStorage.getItem('token') ?? '';
        this.userService.getUserById(this.jwt ,this.userid).subscribe(
            response => {
                this.userData = response;
                console.log(this.userData)
            },
            error => {

            }
        );

        if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
            console.log(this.userData.image)
            this.userService.getavatar(localStorage.getItem('token') ?? '', localStorage.getItem('avatrUrl') ?? '').subscribe(
              response => {
                console.log("getting the image");
                const objectURL = URL.createObjectURL(response);
                console.log(objectURL);
              this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
              },
              error => {
                console.error(error);
              }
            );
          }
    }

    onFileSelected(event: any) {
        this.image = event.target.files[0];
      }

    onSubmit(){
        this.userService.updateUser(
            this.userData.username,
            this.userData.email,
            this.userData.phoneNumber,
            this.image,
            this.userid,
            this.jwt
        ).subscribe(
            response => {
                // Handle success response
                localStorage.setItem('avatrUrl',response.image)
                this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'user updated' });
                window.location.reload();
            },
            error => {
                // Handle error response
                console.error("Error updating user:", error);
            }
        );
    }
}
