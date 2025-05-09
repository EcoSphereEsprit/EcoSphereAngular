import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: {breadcrumb: 'List'}, loadChildren: () => import('./list-notification/notificationlist.module').then(m => m.NotificationListModule) },
        { path: 'create', data: {breadcrumb: 'Create'}, loadChildren: () => import('./create-notification/notificationcreate.module').then(m => m.NotificationCreateModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class NotifRoutingModule { }
