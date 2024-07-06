import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { authGuard } from '../../../auth.guard'

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LandingComponent, canActivate: [authGuard]  }
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
