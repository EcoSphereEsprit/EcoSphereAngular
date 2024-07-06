import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'inventoryStatus'
})
export class InventoryStatusPipe implements PipeTransform {

    transform(quantite_stock: number): string {
        if (quantite_stock > 10)
            return "INSTOCK";
        else if (quantite_stock < 10 && quantite_stock > 0)
            return "LOWSTOCK";
        else if (!quantite_stock)
            return "OUTOFSTOCK";
        return '';
    }

}
