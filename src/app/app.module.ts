import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { EvaluationComponent } from './demo/components/evaluation/evaluation.component';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { ListDemoRoutingModule } from './demo/components/uikit/list/listdemo-routing.module';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';


@NgModule({
    declarations: [
        AppComponent,
        EvaluationComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ListDemoRoutingModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextareaModule,
        DropdownModule,
        RatingModule,
        ButtonModule,
        DialogModule,
        TableModule,
        CardModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
