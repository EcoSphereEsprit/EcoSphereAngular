import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

    cart: any[] = [];
    subtotal: number = 0;
    vat: number = 0;
    shippingCost: number = 0;
    paymentMethod: string = 'card'; // Default payment method
    total: number = 0;

    constructor(private router: Router) {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        this.cart = cartItems;
        console.log("cart", this.cart)
        this.calculateTotals();
    }

    ngOnInit() {
        this.syncLocalStorage();
    }

    updateQuantity(index: number, quantity: number) {
        this.cart[index].quantity = quantity;
        this.calculateTotals();
        this.syncLocalStorage();
    }

    removeItem(index: number) {
        this.cart.splice(index, 1);
        this.calculateTotals();
        this.syncLocalStorage();
    }

    calculateTotals() {
        let subtotal = 0;

        for (let item of this.cart) {
            item.subtotal = item.price * item.quantity;
            subtotal += item.subtotal;
        }

        this.subtotal = subtotal;
        this.calculateTotal();
    }

    updatePaymentMethod(method: string) {
        this.paymentMethod = method;
        if (this.paymentMethod === 'cod') {
            this.shippingCost = 7; // Additional $7 for Cash on Delivery
        } else {
            this.shippingCost = 0; // No additional cost for other methods
        }
        this.calculateTotal();
        this.syncLocalStorage();
    }

    calculateTotal() {
        this.total = this.subtotal + this.vat + this.shippingCost;
    }

    syncLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('paymentMethod', this.paymentMethod);
    }

    checkout() {
        console.log('Checkout initiated:');
        console.log('Payment Method:', this.paymentMethod);
        console.log('Total:', this.total.toFixed(2));
        console.log('Cart Items:', this.cart);

        // Pass cart and payment method as query parameters
        this.router.navigate(['/ecommerce/checkout-form'], {
            queryParams: {
                cart: JSON.stringify(this.cart),
                paymentMethod: this.paymentMethod,
                total: this.total.toFixed(2) // Optionally pass total as well
            }
        });
    }
}
