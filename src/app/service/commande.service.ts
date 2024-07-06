// commande.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from '../api/commande';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  private apiUrl = 'http://localhost:9090/commandes';

  constructor(private http: HttpClient) {}

  getCommandes(): Observable<Commande[]> {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Commande[]>('http://localhost:9090/commandes', { headers });
  }

  getCommandeDetails(id: string): Observable<Commande> {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Commande>(`${this.apiUrl}/${id}`, { headers });
  }



  ajouterCommande(commandeData: any): Observable<any> {
    // Récupération du token d'authentification depuis le local storage
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token is missing');
    }

    // Ajout du token d'authentification dans les headers
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    // Appel HTTP POST vers l'API backend pour ajouter la commande
    return this.http.post<any>(`http://localhost:9090/commandes/ajouter`, commandeData, { headers });
}



 

  deleteCommande(id: string): Promise<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).toPromise()
      .catch(error => {
        console.error('Error deleting commande:', error);
        throw error;
      });
  }
  

  
  cancelOrder(id: string): Observable<any> {
      const token = localStorage.getItem('token');
      
      if (!token) {
          console.error('Token is missing');
          return throwError('Token is missing');
      }
    
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      });
  
      console.log(`Sending request to cancel order with id ${id}`);
  
      return this.http.put(`http://localhost:9090/commandes/${id}/annuler`, null, { headers }).pipe(
          catchError(error => {
              console.error('Error cancelling order:', error);
              return throwError(error); // Renvoie l'erreur pour la gestion supplémentaire côté composant
          })
      );
  }
  
  updateLivraisonStatut(id: string, newStatut: string): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Token is missing');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Assurez-vous que le type de contenu est correct
    });
  
    return this.http.put(`http://localhost:9090/commandes/${id}/statut-livraison`, { statutLivraison: newStatut }, { headers: headers });
  }
  
  




   // Nouvelle méthode pour récupérer les commandes filtrées par statut
   getCommandesByStatut(statut: string): Observable<Commande[]> {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const params = new HttpParams().set('statut', statut); // Paramètre de requête pour filtrer par statut
    return this.http.get<Commande[]>(`${this.apiUrl}/filtre`, { headers, params });
  }
}