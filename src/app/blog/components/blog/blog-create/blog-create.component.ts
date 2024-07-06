import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent {
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

  title: string = '';
  description: string = '';
  date: string = ''; 
  image: File | null = null;
  objectURL: string = '';

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    // Set initial date to current date when component initializes
    this.date = new Date().toISOString().slice(0, 10);
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

  createBlog() {
    if (!this.title || !this.description || !this.date) {
      alert('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('date', this.date); // Use the current date
    if (this.image) {
      formData.append('image', this.image);
    }

    this.blogService.createBlog(formData).subscribe({
      next: (response) => {
        console.log('Blog created successfully', response);
        this.navigateToList();
        // Optionally reset form or navigate away
        // this.resetForm();
      },
      error: (error) => {
        console.error('Error creating blog', error);
      }
    });
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.date = new Date().toISOString().slice(0, 10); // Reset date to current date
    this.removeImage();
  }

  discard() {
    this.resetForm();
  }

  navigateToList() {
    this.router.navigate(['/blog/list']);
  }
}
