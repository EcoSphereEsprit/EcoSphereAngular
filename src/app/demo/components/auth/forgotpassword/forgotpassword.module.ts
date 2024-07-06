import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgotpassword-routing.module';
import { ForgotPasswordComponent } from './forgotpassword.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { ToastModule } from 'primeng/toast';
const routes: Routes = [
    { path: ':uuid', component: ForgotPasswordComponent }
  ];
@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        FormsModule,
        InputTextModule,
        ForgotPasswordRoutingModule,
        AppConfigModule,
        ToastModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }