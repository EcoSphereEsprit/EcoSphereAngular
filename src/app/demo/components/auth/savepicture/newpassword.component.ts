import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/demo/service/auth.service';
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

  constructor(public layoutService: LayoutService, private userService: UserService, private MessageService : MessageService, private Router : Router) {}

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
      this.MessageService.add({ key: 'tst', severity: 'error', summary: 'validation error', detail: 'image and mail are required'});
      return;
    }



    this.userService.saveAuthImage(this.base64Only, localStorage.getItem("email") ?? '').subscribe({
        next: (res) => {this.MessageService.add({ key: 'tst', severity: 'success', summary: 'success', detail: 'image saved'})
      this.Router.navigate(['/landing']);
      },
        error: (err) => this.MessageService.add({ key: 'tst', severity: 'error', summary: 'error', detail: 'image cannot be saved please try again'})
      });
  }

  get dark(): boolean {
    return this.layoutService.config.colorScheme !== 'light';
  }
}
