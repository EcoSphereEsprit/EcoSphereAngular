import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commande } from 'src/app/api/commande';
import { CommandeService } from 'src/app/service/commande.service';

@Component({
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.scss']

})
export class OrderSummaryComponent implements OnInit {
    commandes: Commande[] = [];
  
    constructor(private commandeService: CommandeService) {}
  
    ngOnInit(): void {
      this.loadCommandes();
    }
    getTotalCommande(commande: any): number {
        return commande.produits.reduce((total: number, produit: { quantite: number; prixUnitaire: number; }) => total + produit.quantite * produit.prixUnitaire, 0);
      }
    
    loadCommandes(): void {
      this.commandeService.getCommandes().subscribe(
        data => {
          this.commandes = data;
        },
        error => {
          console.error('Erreur lors de la récupération des commandes :', error);
        }
      );
    }

    printInvoice(commande: any) {
        const printContent = document.getElementById(`invoice-${commande._id}`);
        if (!printContent) {
            console.error('Invoice content not found');
            return;
        }
    
        const WindowPrt = window.open('', '', 'width=900,height=650');
        if (!WindowPrt) {
            console.error('Failed to open print window');
            return;
        }
    
        WindowPrt.document.write(`
            <html>
                <head>
                    <title>Facture</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .invoice-container { padding: 20px; border: 1px solid #ccc; }
                        .text-900 { color: #343a40; font-weight: bold; }
                        .text-700 { color: #6c757d; }
                    </style>
                </head>
                <body>
                    <div class="invoice-container">${printContent.innerHTML}</div>
                </body>
            </html>
        `);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
    }
    
    
  }
