export interface Commande {
  _id?: string;
  numCommande?: string;
  userId?: string;
  statutLivraison: string; // Ajoutez ce champ si nécessaire

  produits?: {
    idProduit?: {
      _id?: string;
      name?: string;
      description?: string;
      prix?: number;
      quantite_stock?: number;
      image?: string;
      brand?: string;
      couleur?: string;
      createdAt?: string;
      updatedAt?: string;
      available?: boolean;
    };
    quantite?: number;
    prixUnitaire?: number;
    _id?: string;
  }[];
  statut?: string;
  statutPaiement?: string;
  prixTotal?: number;
  modePaiement?: string;
  coupon?: any;
  pourcentageRéduction?: number;
  dateCommande?: string;
  infosLivraison?: {
    nom?: string;
    prenom?: string;
    adresse?: string;
    ville?: string;
    codePostal?: string;
    pays?: string;
    telephone?: string;
  };

  historiqueStatuts?: {
    date?: string;
    statut?: string;
    _id?: string;
  }[];
  __v?: number;
}
