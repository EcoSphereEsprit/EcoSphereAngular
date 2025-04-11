import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';

const routes: Routes = [
  { path: 'list', component: SprintListComponent },              // /sprints
  { path: 'new', component: SprintFormComponent },           // /sprints/new
  { path: 'edit/:id', component: SprintFormComponent }       // /sprints/edit/:id
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintsRoutingModule { }
