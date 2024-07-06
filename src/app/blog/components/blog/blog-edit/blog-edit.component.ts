import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { BlogService } from '../../../services/blog.service'; // Update the path as necessary
import { Blog } from '../../../../Entity/blog';

@Component({
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent {
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

  blogId: string | null = null;
  blog: Blog | null = null;
  title: string = '';
  description: string = '';
  date: string = '';
  image: File | null = null;
  objectURL: string = '';

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
    if (this.blogId) {
      this.blogService.getBlogById(this.blogId).subscribe({
        next: (blog) => {
          this.blog = blog;
          this.title = blog.title;
          this.description = blog.description;
          this.date = blog.date;
          // Optional: You can also load image if needed
        },
        error: (error) => console.error('Error fetching blog details:', error)
      });
    }
  }

  onUpload(event: any) {
    const file = event.files[0];
    this.image = file;
    this.objectURL = URL.createObjectURL(file);
  }

  removeImage() {
    this.image = null;
    this.objectURL = '';
  }

  updateBlog() {
    if (!this.blogId || !this.title || !this.description || !this.date) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('date', this.date);
    if (this.image) {
      formData.append('image', this.image);
    }

    this.blogService.updateBlog(this.blogId, formData).subscribe({
      next: (response) => {
        console.log('Blog updated successfully', response);
        this.navigateToList();
        // Optionally reset form or navigate away
        // this.resetForm();
      },
      error: (error) => {
        console.error('Error updating blog', error);
      }
    });
  }

  navigateToList() {
    this.router.navigate(['/blog/list']);
  }
}

