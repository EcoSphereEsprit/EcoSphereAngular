interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    _id? : string ;
    name?: string;
    prix?: string;
    quantite_stock?: string;
    brand?: string;
    categorie?: string;
    couleur?: string;
    available?: boolean;
    description?: string;
    image?: Image;
}


interface Image {
    name: string;
    objectURL: string;
    file ?: File
}