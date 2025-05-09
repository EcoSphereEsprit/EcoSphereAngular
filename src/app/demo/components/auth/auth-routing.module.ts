import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import{NoAuthGuard} from '../auth-guard.guard'

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'forgotpassword', loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule) },
        { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) ,canActivate: [NoAuthGuard] },
        { path: 'newpassword', loadChildren: () => import('./newpassword/newpassword.module').then(m => m.NewPasswordModule) },
        { path: 'verification', loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule) },
        { path: 'lockscreen', loadChildren: () => import('./lockscreen/lockscreen.module').then(m => m.LockScreenModule) },
        { path: 'groups', loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },
        { path: 'userProfile', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./userProfile/formlayoutdemo.module').then(m => m.FormLayoutDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
