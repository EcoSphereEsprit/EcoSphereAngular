import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/demo/service/notification-service.service';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.scss']
})
export class CreateNotificationComponent {
  action = 'Create';
      notif = {
          id : '',
          title: '',
          Message: '',
          userId : 'user123', //hardcoded to be changed by imen sebteoui
          read : false,
          createdAt : '',
          updatedAt : ''
        };
      constructor( private router: Router ,  private notificationService: NotificationService  ) {
  
          
          
      }
      
      ngOnInit() {
  
           
      }
       createNotification()
          {
              if (this.action ==='Create')
              {
                  const newnotif = {
                      id: crypto.randomUUID(), 
                      title: this.notif.title,
                      message: this.notif.Message,
                      read : this.notif.read,
                      userId: this.notif.userId,
                      createdAt: new Date().toISOString() ,
                      updatedAt :  new Date().toISOString() 
                      
                    };
                    
                      this.notificationService.createNotification(newnotif).subscribe((data:any) => { 
                              console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa", data);
                             
                              this.router.navigate(['/notification/list']);
                      });
      
              }
              else
              {
                  const editedReclamation : any= {
                      title: this.notif.title,
                      description: this.notif.Message,
                      read : this.notif.read,
                      userId: this.notif.userId,
                      createdAt: new Date().toISOString() ,
                      updatedAt :  new Date().toISOString() 
      
                    };
                    
                      this.notificationService.editNotification(editedReclamation , this.notif.id).subscribe((data:any) => {
                              this.router.navigate(['/notification/list']);
                      });
      
              }
              
             
          }
      
      
      ngOnDestroy() {
        }
  }