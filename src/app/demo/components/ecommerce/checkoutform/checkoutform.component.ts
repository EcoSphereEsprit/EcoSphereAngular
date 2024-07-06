import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkoutform.component.html'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  cartItems: any[] = [];
  total: number = 0;
  paymentMethod: string = 'card';
  paymentOptions: string[] = ['card', 'cash'];
  showCardPopup: boolean = false;
  cardForm!: FormGroup;
  emailSent: boolean = false;
  secretCode: string = '';
  secretCodeSent: boolean = false;
  codeInput: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCartItems();
    this.calculateTotal();
    this.cardForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardCode: ['', Validators.required],
      secretCodeInput: ['', Validators.required]
    });
  }

  initializeForm(): void {
    this.checkoutForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      newsletter: [false],
      saveInfo: [false],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      paymentMethod: [this.paymentMethod, Validators.required]
    });
  }

  loadCartItems(): void {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    } else {
      this.cartItems = [];
    }
  }

  calculateTotal(): void {
    let subtotal = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    this.total = subtotal + this.getShippingCost();
  }

  getShippingCost(): number {
    return this.paymentMethod === 'cash' ? 7 : 0;
  }

  updatePaymentMethod(method: string): void {
    this.paymentMethod = method;
    this.calculateTotal();
    this.showCardPopup = method === 'card';
  }

  processCheckout(): void {
    if (this.checkoutForm.valid) {
      if (this.paymentMethod === 'card') {
        this.showCardPopup = true; // Afficher le formulaire de carte pour saisir les détails
      } else {
        this.createInvoice('pending');
      }
    }
  }

  sendConfirmationEmail(): void {
    this.secretCode = this.generateSecretCode();
    console.log('Code secret généré (simulé) :', this.secretCode); // Affichage dans la console du navigateur
    this.emailSent = true;
    this.secretCodeSent = true;
    alert('Email envoyé avec le code secret (simulé)');
  }

  submitCardDetails(): void {
    if (this.cardForm.valid && this.secretCodeSent) {
      const cardDetails = this.cardForm.value;
      if (cardDetails.secretCodeInput === this.secretCode) {
        this.createInvoice('paid');
      } else {
        console.error('Code secret incorrect. Veuillez vérifier et réessayer.');
      }
    } else {
      console.error('Veuillez d\'abord générer le code secret en cliquant sur "Envoyer le code".');
    }
  }

  createInvoice(status: string): void {
    console.log('Création de la facturation avec statut :', status);
    this.router.navigate(['/gestion/crud_commande']);
  }

  updateQuantity(event: number, item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity = event;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.calculateTotal();
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  generateSecretCode(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }
}
