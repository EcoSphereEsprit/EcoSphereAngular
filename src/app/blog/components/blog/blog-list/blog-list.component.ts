import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Blog } from '../../../../Entity/blog'; // Update the path as necessary
import { BlogService } from '../../../services/blog.service'; // Update the path as necessary
import { Router } from '@angular/router';

@Component({
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent implements OnInit {

  sortOptions: SelectItem[] = [
    { label: 'Most Shared', value: 'share' },
    { label: 'Most Commented', value: 'comment' }
  ];

  sortField: string = '';
  totalBlogs: Blog[] = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (blogs) => this.totalBlogs = blogs,
      error: (error) => console.error('Error fetching blogs:', error)
    });
  }

  onBlogSelected(blogId: string) {
    this.router.navigate(['/blog/details', blogId]);
  }
}
