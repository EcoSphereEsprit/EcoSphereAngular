import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
       { path: 'crud_commande', data: { breadcrumb: 'Gestion Commande' }, loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
     
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
