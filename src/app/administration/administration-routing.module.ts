import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashSaleComponent } from './components/flash-sale/flash-sale.component';
import { CouponComponent } from './components/coupon/coupon.component';

const routes: Routes = [

    { path: 'flash_sale', component: FlashSaleComponent },
    { path: 'coupon', component: CouponComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
