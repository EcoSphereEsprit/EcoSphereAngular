import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { UserServiceService } from 'src/app/demo/service/user.service.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent  implements  OnInit  {
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('searchinput') searchInput!: ElementRef;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    searchActive: boolean = false;
    avatarImageUrl!: SafeUrl;
    isloggedIn !: boolean;
    constructor(public layoutService: LayoutService,public el: ElementRef, private userService: UserServiceService, private sanitizer: DomSanitizer) { }
    ngOnInit(): void {
        if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
            this.isloggedIn = true;
            console.error(this.isloggedIn );
            this.userService.getavatar(localStorage.getItem('token') ?? '', localStorage.getItem('avatrUrl') ?? '').subscribe(
              response => {
                console.log(response);
                const objectURL = URL.createObjectURL(response);
                console.log(objectURL);
                this.avatarImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
              },
              error => {
                console.error(error);
              }
            );
          } else {
            this.isloggedIn = false;
            console.error(this.isloggedIn );
          }
    }
    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    logout(){
        const jwt = localStorage.getItem('token')
        if(jwt){
        this.userService.logout(jwt).subscribe(
            response => {
                localStorage.clear();
                localStorage.setItem('isLoggedIn', 'false');
                this.isloggedIn = false
            },
            error => {
                
            }
          );
        }
    }
    deactivateSearch() {
        this.searchActive = false;
    }
    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }
    
    onSidebarButtonClick() {
        this.layoutService.showSidebar();
    }
}