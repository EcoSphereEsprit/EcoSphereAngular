import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashSaleComponent } from './components/flash-sale/flash-sale.component';

const routes: Routes = [

    { path: 'flash_sale', component: FlashSaleComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
