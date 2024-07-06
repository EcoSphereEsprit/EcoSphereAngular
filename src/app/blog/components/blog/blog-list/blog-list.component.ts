import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Blog } from '../../../../Entity/blog'; // Update the path as necessary
import { BlogService } from '../../../services/blog.service'; // Update the path as necessary
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  templateUrl: './blog-list.component.html',
})
export class BlogListComponent implements OnInit {

  sortOptions: SelectItem[] = [
    { label: 'Most Recent', value: 'date' },
    { label: 'Most Commented', value: 'comment' }
  ];
  blogs: Blog[] = [];
  searchQuery: string = '';
  sortField: string = 'date'; // Default sort by date
  totalBlogs: Blog[] = [];
  private searchSubject = new Subject<string>();
  role: any;


  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.loadBlogs();
    this.setupSearch();
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((query: string) => {
      this.searchQuery = query;
      this.onSearch();
    });
  }

  onSearchInputChange(query: string) {
    this.searchSubject.next(query);
  }

  loadBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (blogs) => {
        this.totalBlogs = blogs;
        this.applySort(); // Apply sorting after loading blogs
      },
      error: (error) => console.error('Error fetching blogs:', error)
    });
  }
  

  

  applySort() {
    if (this.sortField === 'date') {
      this.blogs = this.totalBlogs.slice().sort((a, b) => {
        if (b.date && a.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return 0; // Handle case where either date is undefined
        }
        
      });
    } else if (this.sortField === 'comment') {
      this.blogs = this.totalBlogs.slice().sort((a, b) => {
        return (b.comment || 0) - (a.comment || 0);
      });
    }
  }
  
  onSearch() {
    if (this.searchQuery) {
      this.blogs = this.totalBlogs.filter(blog =>
        blog.title && blog.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.applySort();
    }
  }

  onBlogSelected(blogId: string) {
    this.router.navigate(['/blog/details', blogId]);
  }

  navigateToCreateBlog() {
    this.router.navigate(['/blog/create']);
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }

}
