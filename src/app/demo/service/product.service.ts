import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../api/product';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    public baseUrl = "http://localhost:9090/produit"


    constructor(private http: HttpClient) { }

    // Ajoutez cette méthode
    getProductById(productId: string) {
        console.log(productId);

        return this.http.get<any>(`http://localhost:9090/produit/getProduitById/${productId}`)
            .toPromise()
            .then(res => res as Product);
    }

    getProductsWithOrdersLarge() {
        return this.http.get<any>('assets/demo/data/products-orders.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }


    //Imen's part of the API

    createNewProduct(body: any): Observable<any> {
        const token = localStorage.getItem("token");
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        console.log("Create new product", body)

        return this.http.post<any>(`${this.baseUrl}/addProduit`, body, { headers });
    }


    createNewProduct2(body: any): Observable<any> {
        const token = localStorage.getItem("token");
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const formData: FormData = new FormData();
        formData.append('name', body.name);
        formData.append('description', body.description);
        formData.append('prix', body.prix);
        formData.append('quantite_stock', body.quantite_stock);
        formData.append('categorie', body.categorie);
        formData.append('brand', body.brand);
        formData.append('couleur', body.couleur);
        formData.append('available', body.available);
        // formData.append('ImageName', body.ImageName);
        // formData.append('protocol', body.protocol);
        //formData.append('file', body.file.file ? body.file.file : body.file);

        formData.append('image', body.file.file ? body.file.file : body.file);

        console.log("Create new product", body.file)

        return this.http.post<any>(`${this.baseUrl}/addProduit`, formData, { headers });
    }

    updateProduct(id: string, body: any): Observable<any> {
        const token = localStorage.getItem("token");
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        const formData: FormData = new FormData();
        formData.append('name', body.name);
        formData.append('description', body.description);
        formData.append('prix', body.prix);
        formData.append('quantite_stock', body.quantite_stock);
        formData.append('categorie', body.categorie);
        formData.append('brand', body.brand);
        formData.append('couleur', body.couleur);
        formData.append('available', body.available);
        // formData.append('ImageName', body.ImageName);
        // formData.append('protocol', body.protocol);
        //formData.append('file', body.file.file ? body.file.file : body.file);

        formData.append('image', body.file.file ? body.file.file : body.file);

        console.log("Create new product", body.file)

        return this.http.put<any>(`${this.baseUrl}/Produits/${id}`, formData, { headers });
    }
    getProductList(): Observable<any> {
        const token = localStorage.getItem("token");
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any>(`${this.baseUrl}/Getproduits`, { headers });
    }

    filterProductsByPrice(minPrice: number, maxPrice: number): Observable<any> {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any>(`${this.baseUrl}/prix?min=${minPrice}&max=${maxPrice}`, { headers });
    }

    filterProductsByCategory(categoryName: string): Observable<any> {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any>(`${this.baseUrl}/categories/name/${categoryName}`, { headers });
    }

    filterProductsByName(productName: string): Observable<any> {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any>(`${this.baseUrl}/getProduitByName/search?name=${productName}`, { headers });
    }

    filterProductsByavailability(productId: string): Observable<any> {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any>(`${this.baseUrl}/produit?name=${productId}`, { headers });
    }

    sortByDate(type: string): Observable<any> {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any>(`${this.baseUrl}/sortedDate?order=${type}`, { headers });
    }

    deleteProduct(id: string): Observable<any> {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.delete<any>(`${this.baseUrl}/Produits/${id}`, { headers });
    }
    loadImageWithAuthorization(imageURL: string) {
        const token = localStorage.getItem("token");
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get(imageURL, { headers, responseType: 'blob' })

    }





    getProducts() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

        getProductPhoto(url: string): Observable<Blob> {
            const token = localStorage.getItem("token");
            console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]]]", token)
            const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
            });
            console.log(url)
            return this.http.get(url, { headers, responseType: 'blob' });
        }

}
