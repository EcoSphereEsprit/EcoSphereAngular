import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ListNotificationComponent } from './list-notification.component';
import { NotificationListRoutingModule } from './list-notification-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogModule } from 'primeng/dialog';



@NgModule({
    imports: [
        CommonModule,
        NotificationListRoutingModule,
        RippleModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        MatIconModule,
        ProgressBarModule,
        MatTooltipModule,
        DialogModule

    ],
    declarations: [ListNotificationComponent]
})
export class NotificationListModule { }