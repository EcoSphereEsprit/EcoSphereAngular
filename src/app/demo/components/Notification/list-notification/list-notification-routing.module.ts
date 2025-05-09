import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListNotificationComponent } from './list-notification.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListNotificationComponent }
    ])],
    exports: [RouterModule]
})
export class NotificationListRoutingModule { }
