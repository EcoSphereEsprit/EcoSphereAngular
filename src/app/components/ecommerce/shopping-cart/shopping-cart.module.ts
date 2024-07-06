import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ensure FormsModule is imported
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { RadioButtonModule } from 'primeng/radiobutton'; // Import RadioButtonModule from PrimeNG

@NgModule({
    declarations: [ShoppingCartComponent],
    imports: [RadioButtonModule,
        CommonModule,
        FormsModule,
        ButtonModule,
        DropdownModule,
        RippleModule,
        ShoppingCartRoutingModule
    ],
})
export class ShoppingCartModule { }
