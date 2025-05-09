import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateNotificationComponent } from './create-notification.component';
@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: CreateNotificationComponent }  
  ])],
  exports: [RouterModule]
})
export class NotificationCreateRoutingModule {}
