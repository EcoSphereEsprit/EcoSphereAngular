import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {UserService} from 'src/app/demo/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
    templateUrl: './formlayoutdemo.component.html',
    providers: [MessageService]
})
export class FormLayoutDemoComponent implements OnInit  {

    valToggle = false;
    UserData! : any;
    showQRCodeDialog: boolean = false;
    qrCodeImage: string = '';
    constructor(public layoutService: LayoutService, private userService: UserService, private router: Router, private MessageService : MessageService) {}

    ngOnInit(): void {
        this.userService.getUserById().subscribe({
            next: (data) => {
              this.UserData = data;
            },
            error: (error) => {
              
            }
          });
    }
    
    get dark(): boolean {
        return this.layoutService.config.colorScheme !== 'light';
    }

    updateUser(){
        console.log(this.UserData)
        let userId = localStorage.getItem("id") ?? '';
        this.userService.updateUserInfo(userId, this.UserData).subscribe({
            next: (data) => {
                    console.log('user updated') // open the dialog
                    this.MessageService.add({ key: 'tst', severity: 'success', summary: 'Done !', detail: 'Infos updated.' });
                },
                error: (error) => {
                    console.error('Error getting 2FA token', error);
                }
        })
    }
    onToggle2FA(isEnabled: boolean) {
        if (isEnabled) {
            this.userService.get2faToken().subscribe({
                next: (data) => {
                    this.qrCodeImage = data.qrCode.trim();; // save the base64
                    this.showQRCodeDialog = true; // open the dialog
                },
                error: (error) => {
                    console.error('Error getting 2FA token', error);
                }
            });
        } else {
            // Optional: Handle disable 2FA
        }
    }

    navigateToVerification(){
        this.router.navigate(['/auth/verification']);
    }
    
}
