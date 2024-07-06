import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    public baseUrl = "http://localhost:9090/categories"
    constructor(private http: HttpClient) { }


    getCategories() {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<any>(`${this.baseUrl}/GetCategories`, { headers })
    }


    createNewCategorie(body: any) {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.post<any>(`${this.baseUrl}/addCategorie`, body, { headers })
    }

    updateCategorie(id: string, body: any) {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.put<any>(`${this.baseUrl}/Categories/${id}`, body, { headers })
    }


    deleteCategorie(id: string) {
        const token = localStorage.getItem("token");

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.delete<any>(`${this.baseUrl}/Categories/${id}`, { headers })
    }

    getCategorieById(id: string) {
        return this.http.get<any>(`${this.baseUrl}/getCategorieById/${id}`);
    }
}
