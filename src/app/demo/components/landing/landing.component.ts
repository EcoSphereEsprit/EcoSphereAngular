import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Subscription } from 'rxjs';
import { UserServiceService } from 'src/app/demo/service/user.service.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnDestroy, OnInit {

    subscription: Subscription;
    avatarImageUrl!: SafeUrl;
    darkMode: boolean = false;

    isloggedIn !: boolean;
    constructor(
        public router: Router,
        private layoutService: LayoutService,
        private userService: UserServiceService,
        private sanitizer: DomSanitizer
    ) {

        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.darkMode = config.colorScheme === 'dark' ? true : false;
        });
    }
    ngOnInit(): void {
        if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
            this.isloggedIn = true;
            console.error(this.isloggedIn);
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
        }
    }

    createBlobUrl(blob: Blob): string {
        return window.URL.createObjectURL(blob);
    }
    scrollToElement($element: any): void {
        setTimeout(() => {
            $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 200);
    }

    goToLogin() {
        this.router.navigate(['/auth/login']);
    }
    logout() {
        const jwt = localStorage.getItem('token')
        if (jwt) {
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

    ngOnDestroy() {
        this.subscription.unsubscribe();

    }

    navigateToHome() {
        this.router.navigate(["/uikit/overlay"]);
    }

    navigateToProfile() {
        this.router.navigate(["/profile"]);
    }

    navigateToProducts() {
        this.router.navigate(["/productList/list"]);
    }
}
