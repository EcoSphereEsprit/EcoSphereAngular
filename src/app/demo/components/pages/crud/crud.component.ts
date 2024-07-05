import { CategoryService } from 'src/app/demo/service/category.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../api/product';
import { ProductService } from '../../../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Category } from 'src/app/demo/api/category';
import { ChartData, ChartOptions } from 'chart.js';


@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService, ConfirmationService]
})
export class CrudComponent implements OnInit {

    productDialog: boolean = false;

    edit : boolean= true ;
    add : boolean = false ;
    countryChart!: ChartData<'doughnut'>;
    countryChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;


    product: Category = {
        _id: "",
        name: "",
        Nbr_produits: 0
    };

    selectedProducts: Product[] = [];

    categoriesList : any = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    allCountProduct : number = 0;

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService , private CategoryService : CategoryService) { }

    ngOnInit() {
        this.CategoryService.getCategories().subscribe((categories: any) => {
            this.categoriesList = categories
            this.allCountProduct = this.categoriesList.reduce((sum : any, category : any) => sum + category.Nbr_produits, 0);


            this.generateChartData();

        }, (err)=> {
            console.log(err);
      //  this.productService.getProducts().then(data => this.products = data);

        });
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'Nbr_produits', header: 'Nbr_produits' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.edit = false ;
        this.add = true ;
        this.product  ={
            _id: "",
            name: "",
            Nbr_produits: 0
        };
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
      

    }

    editProduct(product: Product) {
        this.edit = true ;
        this.add = false ;
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
         this.deleteProductsDialog = false;
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        // this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.CategoryService.deleteCategorie(this.product._id as string).subscribe((res: any) => {
            if (res)
                {
                    this.CategoryService.getCategories().subscribe((categories: any) => {
                        this.categoriesList = categories
                    }, (err)=> {
                        console.log(err);
            
                    });

                }
        }, (err)=> {
            console.log(err);

        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        if (!this.edit)
            {
                this.CategoryService.createNewCategorie(this.product).subscribe((res: any) => {
                    if (res)
                        {
                            this.CategoryService.getCategories().subscribe((categories: any) => {
                                this.categoriesList = categories
                            }, (err)=> {
                                console.log(err);
                    
                            });
        
                        }
                }, (err)=> {
                    console.log(err);
        
                });
            }
            else
            {
                this.CategoryService.updateCategorie(this.product._id as string , this.product).subscribe((res: any) => {
                    if (res)
                        {
                            this.CategoryService.getCategories().subscribe((categories: any) => {
                                this.categoriesList = categories
                            }, (err)=> {
                                console.log(err);
                    
                            });
        
                        }
                }, (err)=> {
                    console.log(err);
        
                });
            }
 
        
    }

    findIndexById(id: string): number {
        let index = -1;
        // for (let i = 0; i < this.products.length; i++) {
        //     if (this.products[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    generateChartData() {
        const labels = this.categoriesList.map((category: Category) => category.name);
        const data = this.categoriesList.map((category: Category) => this.getpercentFormula(category.Nbr_produits as number));
        const colors = [
            'rgba(255, 192, 203, 0.3)', // Pink
  'rgba(255, 255, 0, 0.3)',   // Yellow
  'rgba(128, 0, 128, 0.3)' ,   // Purple

            'rgba(255, 99, 132, 0.3)', // Red
  'rgba(54, 162, 235, 0.3)', // Blue
  
  'rgba(75, 192, 192, 0.3)', // Green
  
  'rgba(255, 159, 64, 0.3)', // Orange
  'rgba(255, 0, 255, 0.3)'   // Magenta
       
        ];
    
        this.countryChart = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: colors
            }
          ]
        };
      }
    
      getColor(name: string): string {
        const colors : any= {
          'United States of America': 'rgba(0, 208, 222, 0.3)',
          'China': 'rgba(135, 62, 254, 0.3)',
          'Japan': 'rgba(252, 97, 97, 0.3)',
          'Australia': 'rgba(238, 229, 0, 0.3)',
          'India': 'rgba(236, 77, 188, 0.3)',
          'Russian Federation': 'rgba(15, 139, 253, 0.3)',
          'Others': 'rgba(128, 128, 128, 0.3)'
        };
        return colors[name] || 'rgba(128, 128, 128, 0.3)';
      }


      getpercentFormula(number : number)
      {
            return ((number * 100)/ this.allCountProduct).toFixed(2);

      }
      
}