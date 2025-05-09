import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriteresComponent } from './critere-evaluation/critere-evaluation.component';


const routes: Routes = [
  { path: 'list', component: CriteresComponent },         
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CritereRoutingModule { }
