import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BlogAppRoutingModule } from "./blog.app-routing.module";
import { ButtonModule } from "primeng/button";
import { ChipModule } from "primeng/chip";
import { EditorModule } from "primeng/editor";
import { FileUploadModule } from "primeng/fileupload";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { RippleModule } from "primeng/ripple";
import { BlogCreateComponent } from "./components/blog/blog-create/blog-create.component";
import { FormsModule } from "@angular/forms";
import { AvatarModule } from "primeng/avatar";
import { DataViewModule } from "primeng/dataview";
import { DropdownModule } from "primeng/dropdown";
import { BlogCommentsComponent } from "./components/blog/blog-detail/blog-comments/blog-comments.component";
import { BlogDetailComponent } from "./components/blog/blog-detail/blog-detail.component";
import { NewCommentComponent } from "./components/blog/blog-detail/new-comment/new-comment.component";
import { BlogListCardComponent } from "./components/blog/blog-list/blog-list-card/blog-list-card.component";
import { BlogListComponent } from "./components/blog/blog-list/blog-list.component";
import { BlogEditComponent } from './components/blog/blog-edit/blog-edit.component';
import { BlogStatComponent } from './components/blog-stat/blog-stat.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule,
        RippleModule,
        ChipModule,
        EditorModule,
        BlogAppRoutingModule,
        FormsModule,
        ChartModule,
        AvatarModule,
        
        DataViewModule,
        DropdownModule,
    ],
    declarations: [
        BlogCreateComponent,
        BlogListComponent,
        BlogListCardComponent,
        BlogCommentsComponent, 
        NewCommentComponent, 
        BlogDetailComponent, BlogEditComponent, BlogStatComponent
    ]
})
export class BlogAppModule { }