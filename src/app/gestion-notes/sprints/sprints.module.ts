import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { SprintsRoutingModule } from './sprints-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    SprintListComponent,
    SprintFormComponent
  ],
  imports: [
     CommonModule,
      SprintsRoutingModule,
      RippleModule,
      ButtonModule,
      InputTextModule,
      TableModule,
      ProgressBarModule,
        ButtonModule,
          RippleModule,
          InputTextModule,
          DropdownModule,
          FileUploadModule,
          InputTextareaModule,		FormsModule,		CommonModule,
          CalendarModule
  ]
})
export class SprintsModule { }
