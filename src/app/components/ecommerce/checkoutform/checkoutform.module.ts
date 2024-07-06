import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CheckoutComponent } from './checkoutform.component';
import { CheckoutFormRoutingModule } from './checkoutform-routing.module';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    DialogModule,
    CheckoutFormRoutingModule,
    RadioButtonModule
  ],
  declarations: [CheckoutComponent]
})
export class CheckoutFormModule {}
