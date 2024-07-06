import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommandeService } from '../../../service/commande.service';
import { Commande } from '../../../api/commande';
import { EmailService } from '../../../service/email.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkoutform.component.html'
})
export class CheckoutComponent implements OnInit {


  checkoutForm!: FormGroup;
  cartItems: any[] = [];
  total: number = 0;
  paymentMethod: string = 'cash';
  showCardPopup: boolean = false;
  cardForm!: FormGroup;
  secretCode: string = '';
  emailSent: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private commandeService: CommandeService,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['cart']) {
        this.cartItems = JSON.parse(params['cart']);
        this.paymentMethod = params['paymentMethod'];
        this.total = parseFloat(params['total']);
        this.initCheckoutForm();
        this.initCardForm();
        this.calculateTotal();
      }
    });
  }

  private initCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      saveInfo: [false],
      newsletter: [false]
    });
  }

  private initCardForm(): void {
    this.cardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      cardCode: ['', Validators.required],
      secretCodeInput: ['']
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  updatePaymentMethod(method: string): void {
    this.paymentMethod = method;
    this.calculateTotal();
    this.showCardPopup = method === 'card';
  }

  processCheckout(): void {
    if (this.checkoutForm.valid) {
      if (this.paymentMethod === 'cash') {
        this.confirmOrder();
      } else {
        this.showCardPopup = true;
      }
    } else {
      console.error('Le formulaire de paiement est invalide. Veuillez vérifier les champs.');
    }
  }

  confirmOrder(): void {
    const formData = this.checkoutForm.value;

    const commandeData = {
      numCommande: `CMD${Math.floor(Math.random() * 10000)}`,
      produits: this.cartItems.map(item => ({
        idProduit: item.id, // Replace with actual product ID
        quantite: item.quantity,
        prixUnitaire: item.price
      })),
      infosLivraison: {
        nom: formData.name,
        prenom: formData.lastName,
        adresse: formData.address,
        ville: formData.city,
        codePostal: formData.postalCode,
        pays: 'Tunis', // Replace with appropriate country
        telephone: formData.phoneNumber
      },
      prixTotal: this.total,
      modePaiement: this.paymentMethod,
      coupon: null,
      pourcentageReduction: 0
    };

    console.log('Command data:', commandeData);

    this.commandeService.ajouterCommande(commandeData).subscribe(
      (response: Commande) => {
        console.log('Command successfully added:', response);

        const invoiceData = {
          commandeId: response._id,
          status: 'pending',
          amount: this.total
        };

        this.router.navigate(['/gestion/crud_commande']);
 
      },
      (error) => {
        console.error('Error adding command:', error);
      }
    );
  }

  confirmOrderPayment(): void {
    const formData = this.checkoutForm.value;
  
    const commandeData = {
      numCommande: `CMD${Math.floor(Math.random() * 10000)}`,
      produits: this.cartItems.map(item => ({
        idProduit: item.id, // Replace with actual product ID
        quantite: item.quantity,
        prixUnitaire: item.price
      })),
      infosLivraison: {
        nom: formData.name,
        prenom: formData.lastName,
        adresse: formData.address,
        ville: formData.city,
        codePostal: formData.postalCode,
        pays: 'Tunis', // Replace with appropriate country
        telephone: formData.phoneNumber
      },
      prixTotal: this.total,
      modePaiement: this.paymentMethod,
      coupon: null,
      pourcentageReduction: 0
    };
  
    console.log('Command data for card payment:', commandeData);
  
    // Adjust the following logic to match your credit card payment processing API
    this.commandeService.ajouterCommande(commandeData).subscribe(
      (response: Commande) => {
        console.log('Command successfully added for card payment:', response);
  
        const invoiceData = {
          commandeId: response._id,
          status: 'paid',
          amount: this.total
        };
        this.router.navigate(['/gestion/crud_commande']);

        // Handle API response here, e.g., navigate to a confirmation page
      },
      (error) => {
        console.error('Error adding command for card payment:', error);
      }
    );
  }
  

  submitCardDetails(): void {
    if (this.cardForm.valid) {
      if (this.secretCode) {
        this.showCardPopup = false;

        const billingData = {
          paymentMethod: this.paymentMethod
        };

        // Proceed with further processing as needed for card payment
      } else {
        console.error('Please generate the secret code first by clicking on "Generate and send code".');
      }
    } else {
      console.error('Card form is invalid. Please check the fields.');
    }
  }

  generateAndSendSecretCode(): void {
    this.secretCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log('Generated secret code (simulated):', this.secretCode);

    const email = this.checkoutForm.get('email')?.value;
    console.log(`Sending secret code to email address ${email}`);

    this.emailService.sendSecretCode(email, this.secretCode).then(
      (response) => {
        console.log('Email sent successfully:', response);
        this.emailSent = true;
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
  }

  updateQuantity(event: number, item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity = event;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.calculateTotal();
    }
  }
  isFieldInvalid(field: any): any {
    return this.checkoutForm.get(field)?.invalid && this.checkoutForm.get(field)?.dirty;
  }
   checkPaymentButton() {
    const cardNumber = (document.getElementById('cardNumber') as HTMLInputElement).value;
    const securityCode = (document.getElementById('securityCode') as HTMLInputElement).value;
    const paymentButton = document.getElementById('paymentButton') as HTMLButtonElement;
  
    if (cardNumber.length === 10 && securityCode.length === 3) {
      paymentButton.disabled = false;
    } else {
      paymentButton.disabled = true;
    }
  }
  
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
}
}
