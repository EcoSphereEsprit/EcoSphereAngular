import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../demo/api/product';
import { ProductService } from '../../../demo/service/product.service';

@Component({
    templateUrl: './productoverview.component.html',
})
export class ProductOverviewComponent implements OnInit {
    
    color: string = 'bluegray';
    size: string = 'M';
    liked: boolean = false;
    images: string[] = [];
    selectedImageIndex: number = 0;
    quantity: number = 1;  // Initial quantity

    product: Product  = {
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
    };

    colorOptions: any[] = [
        { name: 'Black', background: "bg-gray-900" },
        { name: 'Orange', background: "bg-orange-500" },
        { name: 'Green', background: "bg-green-500" },
        { name: 'Red', background: "bg-red-500" },
        { name: 'Blue', background: "bg-blue-500" },
        { name: 'Grey', background: "bg-gray-500" }
    ];

    constructor(private productService: ProductService, private router: Router) { }

    ngOnInit(): void {
        let productId: any = localStorage.getItem('chartId');  

        this.productService.getProductById(productId).then(data => {
            this.product = data;
        }).catch(error => {
            console.error('Error fetching product:', error);
        });
    }

    addToCart() {
        const cartItem = {
            id: this.product._id,
            name: this.product.name,
            price: this.product.prix,
            quantity: this.quantity,
            image: this.product.image
        };

        // Retrieve existing cart items from local storage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if the product already exists in the cart
        const existingItemIndex = cart.findIndex((item: any) => item.id === this.product._id);
        if (existingItemIndex !== -1) {
            // If the product exists, update the quantity
            cart[existingItemIndex].quantity += this.quantity;
        } else {
            // Otherwise, add the new item to the cart
            cart.push(cartItem);
        }

        // Update the local storage with the updated cart items
        localStorage.setItem('cart', JSON.stringify(cart));

        // Alert and navigate to the shopping cart page
        alert('Product added to cart');
        this.router.navigate(['/ecommerce/shopping-cart']);
    }
}
