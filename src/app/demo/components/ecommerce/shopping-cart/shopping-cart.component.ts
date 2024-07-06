import { Router } from '@angular/router'; // Importer le Router
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

    cart: any[] = [];
    total: number = 0;
    subtotal: number = 0;
    vat: number = 0;
    shippingCost: number = 0;
    paymentMethod: string = 'card'; // Default payment method

    constructor( private router: Router) {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        this.cart = cartItems;

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

      this.total = subtotal;
  }

  updatePaymentMethod(method: string) {
      this.paymentMethod = method;
      this.syncLocalStorage();
  }

  syncLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.cart)); // Adjusted to 'cartItems'
      localStorage.setItem('total', JSON.stringify(this.total));
      localStorage.setItem('paymentMethod', this.paymentMethod);
  }

  checkout() {
      console.log('Checkout initiated:');
      console.log('Payment Method:', this.paymentMethod);
      console.log('Total:', this.total.toFixed(2));
      console.log('Cart Items:');

      this.cart.forEach(item => {
          console.log('- Name:', item.name);
          console.log('  Quantity:', item.quantity);
          console.log('  Image:', item.image); // Ensure image property is set in your cart items
      });

      this.router.navigateByUrl('/ecommerce/checkout-form');
  }
}