import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashSaleComponent } from './components/flash-sale/flash-sale.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { RatingModule } from 'primeng/rating';
import { FlashSaleFormComponent } from './components/flash-sale/flash-sale-form/flash-sale-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
    declarations: [
        FlashSaleComponent,
        FlashSaleFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        DataViewModule,
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
        FileUploadModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Add this line if needed
})
export class AdministrationModule { }
