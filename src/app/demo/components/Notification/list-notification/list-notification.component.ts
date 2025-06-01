import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/demo/service/notification-service.service';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss']
})
export class ListNotificationComponent {


    notifications : any[] = [];
    deleteProductDialog: boolean = false;
    notificationToDelete: any = null;


    constructor(private notificationService: NotificationService, private router: Router) { }

    ngOnInit() {
        this.notificationService.getAllNotifictions().subscribe((data: any[]) => {
            this.notifications = data.reverse();
        });
    }


    navigateToCreateUser(){
        this.router.navigate(['/notification/create'])
    }
    explore(notif: any) {
        this.router.navigate(['/notification/create'], { state: { notif } });
      }

      delete(id : string)
      {
        this.notificationService.deleteNotification(id).subscribe((data: any) => {
            this.notifications = data;
            this.deleteProductDialog =  false

            this.notificationService.getAllNotifictions().subscribe((data: any[]) => {
                this.notifications = data.reverse();
            });
        });

      }
      deleteNotification(id : any)
      {
            this.notificationService.deleteNotification(id).subscribe((data: any) => {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", data)
           // this.notifications = data.reverse();
            this.deleteProductDialog =  false

            this.notificationService.getAllNotifictions().subscribe((data: any[]) => {
                this.notifications = data.reverse();
            });
        });
      }

      formatDate(isoString: string): string {
        const date = new Date(isoString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
      }

      markAsRead(notif : any)
      {
        let body : any = notif ;
        body.read = true ;
        this.notificationService.editNotification(body , notif.id  ).subscribe((data: any) => {
            //.notifications = data;
            //this.deleteProductDialog =  false

            this.notificationService.getAllNotifictions().subscribe((data: any[]) => {
                this.notifications = data.reverse();
            });
        });
      }
      confirmDelete(notification: any) {
        this.notificationToDelete = notification;
        this.deleteProductDialog = true;
      }

}
