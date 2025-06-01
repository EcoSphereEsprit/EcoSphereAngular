import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  private subscription!: Subscription;

    constructor(private notificationService: NotificationService, private router: Router) { }

    ngOnInit() {
      
    this.notificationService.connect();

    this.subscription = this.notificationService.notifications$.subscribe((data) => {
      console.log('Notification received in component:', data);
      // Optionally merge into your list
       this.notifications = [...data , ...this.notifications ];
    });
        
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
