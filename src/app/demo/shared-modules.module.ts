import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryPipe } from '../pipes/category.pipe';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
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
import { InventoryStatusPipe } from '../pipes/inventory-status.pipe';

@NgModule({
    declarations: [
        CategoryPipe,
        InventoryStatusPipe
    ],
    exports: [
        CategoryPipe,
        InventoryStatusPipe
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
        ToastModule,
        FileUploadModule,
    ]
})
export class SharedModulesModule { }
