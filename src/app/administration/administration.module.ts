import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashSaleComponent } from './components/flash-sale/flash-sale.component';
import { FlashSaleFormComponent } from './components/flash-sale/flash-sale-form/flash-sale-form.component';
import { MessageService } from 'primeng/api';
import { SharedModulesModule } from '../demo/shared-modules.module';
import { DataViewModule } from 'primeng/dataview';
import { AdministrationRoutingModule } from './administration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { CouponComponent } from './components/coupon/coupon.component';


@NgModule({
    declarations: [
        FlashSaleComponent,
        FlashSaleFormComponent,
        CouponComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        SharedModulesModule,
        DataViewModule,
        AdministrationRoutingModule,
        FormsModule,
        PickListModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        RatingModule,
        ButtonModule,
        CommonModule,
        CheckboxModule,
        InputNumberModule,
        RippleModule,
        DialogModule,
        ToastModule,
        FileUploadModule,
        CalendarModule
    ],
    providers: [MessageService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdministrationModule { }
