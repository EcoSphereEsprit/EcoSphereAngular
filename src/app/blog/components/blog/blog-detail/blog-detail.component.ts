import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../services/blog.service'; // Update the path as necessary
import { Blog } from '../../../../Entity/blog';
import { Comment } from 'src/app/Entity/comment';
import { CommentService } from 'src/app/blog/services/comment.service';
@Component({
    templateUrl: './blog-detail.component.html'
})  
export class BlogDetailComponent implements OnInit{
    blog!: Blog;
    avatarUrl: string = '';
    constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router,private commentService: CommentService) {}
    ngOnInit() {
        const blogId = this.route.snapshot.paramMap.get('id');
        this.getAvatarUrlFromLocalStorage();
        if (blogId) {
            this.blogService.getBlogById(blogId).subscribe({
                next: (blog) => {
                    this.blog = blog;
                    console.log('Fetched Blog:', this.blog); // Logging the fetched blog
                },
                error: (error) => console.error('Error fetching blog details:', error)
            });
            this.loadComments(blogId);
        }
       
    }
    getAvatarUrlFromLocalStorage() {
      this.avatarUrl = localStorage.getItem('avatrUrl') || ''; // Retrieve avatar URL from local storage
    }
    
    comments: Comment[] = [
        
    ];
    loadComments(id:string) {
      this.commentService.getCommentByBlog(id).subscribe({
        next: (Comments) => this.comments = Comments,
        error: (error) => console.error('Error fetching comments:', error)
      });
    }
    deleteBlog() {
      if (!this.blog || !this.blog._id) {
          console.error('Invalid blog or blog ID');
          return;
      }

      if (confirm('Are you sure you want to delete this blog post?')) {
          this.blogService.deleteBlog(this.blog._id).subscribe({
              next: () => {
                  console.log('Blog deleted successfully');
                  this.router.navigate(['/blog/list']);
              },
              error: (error) => {
                  console.error('Error deleting blog:', error);
              }
          });
      }
  }
    navigateToList() {
        this.router.navigate(['/blog/list']); // Navigate to your blog list route
    }

    isAdmin(): boolean {
      const role = localStorage.getItem('role');
      return role === 'ADMIN';
  }

}
