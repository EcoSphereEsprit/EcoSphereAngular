import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../../../../../Entity/blog';
import { BlogService } from 'src/app/blog/services/blog.service';

@Component({
    selector: 'app-blog-list-card',
    templateUrl: './blog-list-card.component.html',
})
export class BlogListCardComponent {

    @Input() blog!: Blog;
    @Output() blogClicked = new EventEmitter<string>();

    constructor(private router: Router , public blogService:BlogService) { }

    onBlogClick() {
        this.blogClicked.emit(this.blog._id);
      }
}
