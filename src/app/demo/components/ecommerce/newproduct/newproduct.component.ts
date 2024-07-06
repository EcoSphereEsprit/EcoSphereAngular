import { filter } from 'rxjs';
import { CategoryService } from './../../../service/category.service';
import { ProductService } from './../../../service/product.service';


import { Component, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
    _id: string;
    name: string;
    prix: string;
    quantite_stock: string;
    brand: string;
    categorie: string;
    couleur: string;
    available: boolean;
    description: string;
    image: Image;
}

interface Image {
    name: string;
    objectURL: string;
    file?: File
}

@Component({
    selector: 'app-new-product',
    templateUrl: './newproduct.component.html',
    styleUrls: ['./newproduct.component.scss']
})
export class NewProductComponent implements OnInit {


    public categoriesList: any = [];
    public allCatgories: any = [];


    constructor(private CategoryService: CategoryService, private ProductService: ProductService, public router: Router,) {

    }
    ngOnInit(): void {
        const productToEdit: any = localStorage.getItem('productToEdit');
        if (productToEdit != "" && productToEdit != null) {
            this.product = JSON.parse(productToEdit);
        }
        this.CategoryService.getCategories().subscribe((categories: any) => {

            if (productToEdit != "" && productToEdit != null) {
                this.allCatgories = categories
                this.categoriesList = categories.map((category: any) => category.name);
                //let cat = this.allCatgories.filter((c : any)=> c._id ===  JSON.parse(productToEdit).categorie)[0].name

                this.product.categorie = this.categoriesList[0]

            }
            else {
                this.allCatgories = categories
                this.categoriesList = categories.map((category: any) => category.name);
                this.product.categorie = this.categoriesList[0]
            }
        }, (err) => {
            console.log(err);

        });

    }

    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

    text: string = '';


    colorOptions: any[] = [
        { name: 'Black', background: "bg-gray-900" },
        { name: 'Orange', background: "bg-orange-500" },
        { name: 'Green', background: "bg-green-500" },
        { name: 'Red', background: "bg-red-500" },
        { name: 'Blue', background: "bg-blue-500" },
        { name: 'Grey', background: "bg-gray-500" }
    ];

    product: Product = {
        _id: "",
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

    uploadedFiles: any[] = [];

    showRemove: boolean = false;



    onColorSelect(color: string) {
        this.product.couleur = color;
    }

    onUpload(event: any) {
        const file: File = event.files[0];

        this.product.image = {
            name: file.name,
            objectURL: window.URL.createObjectURL(file),
            file: event.files[0]
        };

    }

    onImageMouseOver(file: Image) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'flex' : null;
        })
    }

    onImageMouseLeave(file: Image) {
        this.buttonEl.toArray().forEach(el => {
            el.nativeElement.id === file.name ? el.nativeElement.style.display = 'none' : null;
        })
    }

    removeImage(file: Image) {
        this.product.image = {
            name: "default",
            objectURL: ""
        };
    }

    createNewProduct() {
        const productToEdit: any = localStorage.getItem('productToEdit');
        if (productToEdit == "" || productToEdit == null) {
            let body: any = this.product;
            let image: any = this.product.image;
            body.file = image;
            body.description = body.description.replace(/<p>/g, "");
            body.description = body.description.replace(/<\/p>/g, "");

            //body.ImageName = image.file.name
            // body.protocol = "http"
            // body.categorie = this.allCatgories.filter((c: any)=> c.name === this.product.categorie)[0]._id ;
            //Imen the createNewProduct2 is using the form DATA
            this.ProductService.createNewProduct2(body).subscribe((result: any) => {
                this.router.navigate(["/productList/list"]);

                console.log(result);

            }, (err: any) => {
                console.log(err);

            });

        }
        else {
            let body: any = this.product;
            let image: any = this.product.image;
            body.file = image;
            body.description = body.description.replace(/<p>/g, "");
            body.description = body.description.replace(/<\/p>/g, "");

            body.categorie = this.allCatgories.filter((c: any) => c.name === this.product.categorie)[0]._id;
            this.ProductService.updateProduct(this.product._id, body as any).subscribe((result: any) => {
                this.router.navigate(["/productList/list"]);
                localStorage.setItem('productToEdit', "");

                console.log(result);

            }, (err: any) => {
                console.log(err);

            });

        }

    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.product.image = {
            name: file.name,
            objectURL: window.URL.createObjectURL(file),
            file: event.target.files[0]
        };
    }


    // showSuccess() {
    //     this.toastr.success('Product added successfully!', 'Success');
    //   }

    //   showError() {
    //     this.toastr.error('Failed to add product', 'Error');
    //   }


    discard() {
        this.router.navigate(["/productList/list"]);
    }

    ngOnDestroy() {
        localStorage.setItem('productToEdit', "");
        console.log('Component destroyed and resources cleaned up');
    }

}
