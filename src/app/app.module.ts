import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { CriteresComponent } from './gestion-notes/CritereEvaluation/critere-evaluation/critere-evaluation.component';
import { CriteresModule } from './gestion-notes/CritereEvaluation/critere-evaluation.module';

@NgModule({
    declarations: [
        AppComponent    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,CriteresModule  
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
