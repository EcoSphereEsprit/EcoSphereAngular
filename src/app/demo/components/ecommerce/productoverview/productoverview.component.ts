import { Component, OnInit } from '@angular/core';
import { Product } from '../../../api/product';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router'; // Importer le Router

@Component({
    templateUrl: './productoverview.component.html',
})
export class ProductOverviewComponent implements OnInit {
    
    color: string = 'bluegray';
    size: string = 'M';
    liked: boolean = false;
    images: string[] = [];
    selectedImageIndex: number = 0;
    quantity: number = 1;  // Quantité initiale

    product: Product = {
        _id : "",
        name: '',
        prix: '',
        quantite_stock: '1',
        brand: '',
        categorie: "",
        couleur: 'Blue',
        available: true,
        description: '',
        image: {
            name: "default",
            objectURL: ""
        }
    };; // Initialiser le produit avec id

    constructor(private productService: ProductService, private router: Router) { } // Injecter le Router

    ngOnInit(): void {

        const productId : string = localStorage.getItem('chartId') || "";
        this.productService.getProductById(productId).then(data => {
            this.product = data;
        });
    }

    addToCart() {
        const cartItem = {
            id: this.product._id,
            name: this.product.name,
            price: this.product.prix,
            quantity: this.quantity ,
            Image: this.product.image 
        };

        // Récupérer les éléments existants dans le local storage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Vérifier si le produit existe déjà dans le panier
        const existingItemIndex = cart.findIndex((item: any) => item.id === this.product._id);
        if (existingItemIndex !== -1) {
            // Si le produit existe déjà, augmenter la quantité
            cart[existingItemIndex].quantity += this.quantity;
        } else {
            // Sinon, ajouter le nouvel article au panier
            cart.push(cartItem);
        }

        // Enregistrer le panier mis à jour dans le local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Afficher le contenu du panier dans la console
        console.log(cart);

        alert('Product added to cart');

        // Rediriger vers la page shopping-cart
        this.router.navigate(['/ecommerce/shopping-cart']);
    }
}
