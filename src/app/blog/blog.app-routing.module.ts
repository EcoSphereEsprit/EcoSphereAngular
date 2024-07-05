import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogCreateComponent } from './components/blog/blog-create/blog-create.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog/blog-detail/blog-detail.component';
import { BlogEditComponent } from './components/blog/blog-edit/blog-edit.component';
import { BlogStatComponent } from './components/blog-stat/blog-stat.component';

@NgModule({
    imports: [RouterModule.forChild([
        // { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./components/blog/blog-list/blog-list.module').then(m => m.BlogListModule) },
        // { path: 'detail', data: { breadcrumb: 'Detail' }, loadChildren: () => import('./components/blog/blog-detail/blog-detail.module').then(m => m.BlogDetailModule) },
        // { path: 'edit', data: { breadcrumb: 'Edit' }, loadChildren: () => import('./components/blog/blog-edit/blog-edit.module').then(m => m.BlogEditModule) },
        { path: 'details/:id', component: BlogDetailComponent },
        { path: 'edit/:id', component: BlogEditComponent },
        { path: 'list', component: BlogListComponent },
        { path: 'create', component: BlogCreateComponent },
        { path: 'stat', component: BlogStatComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    
    exports: [RouterModule]
})

export class BlogAppRoutingModule { }
