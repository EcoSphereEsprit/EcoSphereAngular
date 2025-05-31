import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/demo/service/auth.service';
import { concatMap } from 'rxjs/operators';
import { Message, SelectItem, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  templateUrl: './newpassword.component.html',
  providers: [MessageService]
})
export class NewPasswordComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef;
  capturedImage: string = '';
  base64Only: string = '';
  display: boolean = false;
  constructor(public layoutService: LayoutService, private userService: UserService, private Router : Router, private MessageService : MessageService) {}

  ngAfterViewInit() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.videoElement.nativeElement.srcObject = stream;
    });
  }

  captureImage() {
  const canvas = document.createElement('canvas');
  const video = this.videoElement.nativeElement;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d')?.drawImage(video, 0, 0);

  // Convert to JPEG instead of PNG to avoid alpha channel issues
  const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

  this.capturedImage = dataUrl;
  this.base64Only = dataUrl.split(',')[1]; // just the base64 portion
}

  sendToApi() {
    console.log(this.base64Only)
    if (!this.base64Only || !localStorage.getItem("email")) {
      alert('Please capture an image and fill in all fields.');
      return;
    }


    this.userService.saveAuthImagecopy(this.base64Only, localStorage.getItem("email") ?? '').subscribe({
        next: (res) => console.log('Image uploaded successfully', res),
        error: (err) => console.error('Image upload failed', err)
      });
  }

  verify() {
  this.display = true; // Show loader

  this.userService.verifyImage(this.base64Only, localStorage.getItem("email") ?? '').subscribe({
    next: (res) => {
      this.display = false;

      try {
        // If response is a string, parse it
        const result = typeof res === 'string' ? JSON.parse(res) : res;
        alert(result.verified)
        if (result.verified === true) {
          this.Router.navigate(['/landing']); // Route to welcome screen
        } else {
          this.MessageService.add({
            key: 'tst',
            severity: 'error',
            summary: 'Verification Failed',
            detail: 'Face not recognized. Please try again.'
          });
        }
      } catch (parseError) {
        // In case parsing fails but response is 200
        this.MessageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Error',
          detail: 'Unexpected response from server.'
        });
      }
    },
    error: (err) => {
      this.display = false;
      this.MessageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Server Error',
        detail: 'An error occurred while verifying your image.'
      });
    }
  });
}
  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
