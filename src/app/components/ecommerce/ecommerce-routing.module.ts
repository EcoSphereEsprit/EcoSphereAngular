import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'product-overview', data: { breadcrumb: 'Product Overview' }, loadChildren: () => import('../ecommerce/productoverview/productoverview.module').then(m => m.ProductoverviewModule) },
        { path: 'shopping-cart', data: { breadcrumb: 'Shopping Cart' }, loadChildren: () => import('../ecommerce/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) },
        { path: 'checkout-form', data: { breadcrumb: 'Checkout Form' }, loadChildren: () => import('../ecommerce/checkoutform/checkoutform.module').then(m => m.CheckoutFormModule) },
        { path: 'product-list', data: { breadcrumb: 'Product List' }, loadChildren: () => import('../../demo/components/ecommerce/productlist/productlist.module').then(m => m.ProductListModule) },
        { path: 'new-product', data: { breadcrumb: 'New Product' }, loadChildren: () => import('../../demo/components/ecommerce/newproduct/newproduct.module').then(m => m.NewProductModule) },
        { path: 'order-history', data: { breadcrumb: 'Order History' }, loadChildren: () => import('../../demo/components/ecommerce/orderhistory/orderhistory.module').then(m => m.OrderHistoryModule) },
        { path: 'order-summary', data: { breadcrumb: 'Order Summary' }, loadChildren: () => import('../../demo/components/ecommerce/ordersummary/ordersummary.module').then(m => m.OrderSummaryModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EcommerceRoutingModule { }
