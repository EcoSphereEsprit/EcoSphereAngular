import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogDetailComponent } from './blog-detail.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'home', component: BlogDetailComponent }
    ])],
    exports: [RouterModule]
})
export class BlogDetailRoutingModule { }
