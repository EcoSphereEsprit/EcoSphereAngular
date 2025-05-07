import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAssignmentsComponent } from './document/document.component';


const routes: Routes = [
  { path: 'list', component: StudentAssignmentsComponent },         
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
