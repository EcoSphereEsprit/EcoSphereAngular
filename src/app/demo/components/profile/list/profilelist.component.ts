import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Customer, Reclamations } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ReclamationService } from 'src/app/demo/service/reclamation.service';

@Component({
    templateUrl: './profilelist.component.html'
})
export class ProfileListComponent implements OnInit {

    reclamations : Reclamations[] = [];
    deleteProductDialog: boolean = false;


    constructor(private reclamtionService: ReclamationService, private router: Router) { }

    ngOnInit() {
        this.reclamtionService.getAllReclamations().subscribe((data: Reclamations[]) => {
            this.reclamations = data.reverse();;
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }

    navigateToCreateUser(){
        this.router.navigate(['/profile/create'])
    }
    explore(reclamation: any) {
        this.router.navigate(['/profile/create'], { state: { reclamation } });
      }



      deleteRec()
      {
        this.deleteProductDialog = true
      }

      delete(rec : any)
      {
        this.reclamtionService.deleteReclamation(rec.id , rec.userId ).subscribe((data: any) => {
            this.reclamations = data;
            this.deleteProductDialog =  false

            this.reclamtionService.getAllReclamations().subscribe((data: Reclamations[]) => {
                this.reclamations = data;
            });
        });

      }

}