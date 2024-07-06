import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutFormRoutingModule } from './checkoutform-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { CheckoutComponent } from './checkoutform.component';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        DialogModule,
        CommonModule,
        CheckoutFormRoutingModule,
        FormsModule,
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule
    ],
    declarations: [CheckoutComponent]
})
export class CheckoutFormModule { }
