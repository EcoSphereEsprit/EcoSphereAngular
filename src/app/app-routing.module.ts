import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { authGuard } from './auth.guard';
const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [

    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: 'pages', data: { breadcrumb: 'crud' }, loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
          { path: 'gestion', data: { breadcrumb: 'gestion' }, loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'blocks', data: { breadcrumb: 'Prime Blocks' }, loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
            { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
            { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./demo/components/apps/apps.module').then(m => m.AppsModule) }
      
        ]
    },
    { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule) },
    { path: 'aa', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)},
    { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule), canActivate: [authGuard] },
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'profile', data: { breadcrumb: 'Profile' }, loadChildren: () => import('./demo/components/profile/create/profilecreate.module').then(m => m.ProfileCreateModule) },
    { path: 'notfound', loadChildren: () => import('./demo/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
