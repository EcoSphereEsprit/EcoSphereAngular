import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamations } from 'src/app/demo/api/customer';
import { NotificationService } from 'src/app/demo/service/notification-service.service';
import { ReclamationService } from 'src/app/demo/service/reclamation.service';

@Component({
    templateUrl: './profilecreate.component.html'
})
export class ProfileCreateComponent implements OnInit {
    action = 'Create';
    claimStatuses = [
      { label: 'Pending', value: 'PENDING' },
      { label: 'In Progress', value: 'IN_PROGRESS' },
      { label: 'Resolved', value: 'RESOLVED' },
      { label: 'Rejected', value: 'REJECTED' }
    ];
    
    claim = {
        id : '',
        title: '',
        description: '',
        userId : '',
        status : '',
        createdAt : ''
      };
    constructor(private reclamtionService: ReclamationService ,private router: Router ,  private notificationService: NotificationService  ) {
        console.log('OKKKK');

        
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state && navigation.extras.state['reclamation']) {
          const reclamation = navigation.extras.state['reclamation'];
          console.log('Received Reclamation:', reclamation);
          this.claim = reclamation;
          console.log('Received Reclamation:', this.claim);

          this.action = 'Update';

    }
    }
    ngOnInit() {

       // this.notificationService.connect();

    this.notificationService.notifications$.subscribe((notifications) => {
      //this.notifications = notifications;
      console.log('Received notifications:', notifications);
    });
        
    }
    createClaim()
    {
        if (this.action ==='Create')
        {
            const newReclamation = {
                id: crypto.randomUUID(), 
                title: this.claim.title,
                description: this.claim.description,
                status: 'PENDING', 
                userId: 'user123', //hard coded to be changed when integrate the user management Imen sebteoui
                createdAt: new Date().toISOString() 
              };
              
                this.reclamtionService.createReclamation(newReclamation , "123testUser").subscribe((data:any) => { //hardcoded user id
                        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa", data);
                        this.notificationService.notifications$.subscribe((notifications) => {
                            //this.notifications = notifications;
                            console.log('Received notifications:', notifications);
                          });
                        this.router.navigate(['/profile/list']);
                });

        }
        else
        {
            const editedReclamation : Reclamations= {
                title: this.claim.title,
                description: this.claim.description,
                status: this.claim.status, 
                userId:  this.claim.userId , //hard coded to be changed when integrate the user management Imen sebteoui
                createdAt: this.claim.createdAt,

              };
              
                this.reclamtionService.editReclamation(editedReclamation , this.claim.id).subscribe((data:any) => {
                        this.router.navigate(['/profile/list']);
                });

        }
        
       
    }
    ngOnDestroy() {
        // this.notificationService.disconnect();
      }
}