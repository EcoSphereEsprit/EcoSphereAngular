import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Commande } from '../../../api/commande';
import { CommandeService } from '../../../service/commande.service';
import { Table } from 'primeng/table';

@Component({
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  providers: [MessageService]
})
export class CrudComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  @ViewChild('cancelConfirmationModal') cancelConfirmationModal!: ElementRef<HTMLDialogElement>;

  commandes: Commande[] = [];
  selectedCommande: Commande | undefined | null = null;
  displayDetailsDialog: boolean = false;
  cols?: any[];
  statutFilter: string = '';

  constructor(
    private commandeService: CommandeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
    this.cols = [
      { field: 'numCommande', header: 'Numéro de Commande' },
      { field: 'produit', header: 'Nom des Produits' },
      { field: 'statutLivraison', header: 'statutLivraison' },
      { field: 'prixTotal', header: 'Prix Total' },
      { field: 'modePaiement', header: 'Mode de Paiement' },
    ];
  }

  goToHistorique() {
    window.location.href = 'http://localhost:4200/#/ecommerce/order-summary';
  }
  loadCommandes(): void {
    const isAdmin = this.isAdmin();

    if (isAdmin) {
        this.commandeService.getCommandes().subscribe(
            data => {
                this.commandes = data;
                console.log('Commandes récupérées :', this.commandes);
            },
            error => {
                console.error('Erreur lors de la récupération des commandes :', error);
            }
        );
    } else {
        this.commandeService.getCommandes().subscribe(
            data => {
                this.commandes = data;
                console.log('Commandes récupérées :', this.commandes);
            },
            error => {
                console.error('Erreur lors de la récupération des commandes de l\'utilisateur :', error);
            }
        );
    }
}


  // Afficher le dialogue de détails de la commande
  showDetailsDialog(commande: Commande) {
    this.selectedCommande = { ...commande }; // Assurez-vous que commande est correctement défini ici
    this.displayDetailsDialog = true;
  }

  // Cacher le dialogue de détails de la commande
  hideDetailsDialog() {
    this.selectedCommande = null;
    this.displayDetailsDialog = false;
  }

  // Ouvrir le dialogue pour une nouvelle commande ou éditer une commande existante
  openNew() {
    this.selectedCommande = {} as Commande;
    this.displayDetailsDialog = true;
  }

  // Éditer une commande existante
  editCommande(commande: Commande) {
    this.selectedCommande = { ...commande };
    this.displayDetailsDialog = true;
  }

  // Fermer le dialogue de détails de la commande
  closeDetailsDialog() {
    this.selectedCommande = null;
    this.displayDetailsDialog = false;
  }

  // Filtrage global des données dans la table des commandes
  onGlobalFilter(dt: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (value) {
      dt.filterGlobal(value, 'contains');
    } else {
      dt.reset();
    }
  }

  // Afficher la boîte de dialogue de confirmation d'annulation
  showCancellationConfirmation(commandeId: any) {
    this.selectedCommande = this.commandes.find(c => c._id === commandeId);
    this.cancelConfirmationModal.nativeElement.showModal();
  }

  // Cacher la boîte de dialogue de confirmation d'annulation
  hideCancellationConfirmation() {
    this.cancelConfirmationModal.nativeElement.close();
  }
//is admin 
  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
}

cancelCommande(id: any) {
    console.log(`Tentative d'annulation de la commande avec l'ID ${id}`);
    this.commandeService.cancelOrder(id).subscribe(
        response => {
            console.log(`Commande annulée avec succès avec l'ID ${id}`, response);
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande annulée', life: 3000 });
            this.commandes = this.commandes.map(c => (c._id === id ? { ...c, statutLivraison: 'annulée' } : c));
        },
        error => {
            console.error(`Erreur lors de l'annulation de la commande avec l'ID ${id}`, error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'annulation de la commande', life: 3000 });
        }
    );
    console.log('Commande annulée avec succès.');
    this.hideCancellationConfirmation();
}

  
  livraisonStatusOptions: any[] = ['en_attente', 'en_cours_traitement', 'expediée']; // Options de statut de livraison


  // Mettre à jour le statut de livraison
  updateLivraisonStatut(id: any, newStatut: any) {
    console.log(`Mise à jour du statut de livraison pour la commande avec l'ID ${id} vers ${newStatut}`);
    this.commandeService.updateLivraisonStatut(id, newStatut).subscribe(
        response => {
            console.log(`Statut de livraison mis à jour avec succès pour la commande avec l'ID ${id}`, response);
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: `Statut de livraison mis à jour vers ${newStatut}`, life: 3000 });
            this.commandes = this.commandes.map(c => (c._id === id ? { ...c, statutLivraison: newStatut } : c));
        },
        error => {
            console.error(`Erreur lors de la mise à jour du statut de livraison pour la commande avec l'ID ${id}`, error);
            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du statut de livraison', life: 3000 });
        }
    );
}

  getLivraisonStatut(commande: Commande): any {
    return commande.statutLivraison;
  }
  
  
}
