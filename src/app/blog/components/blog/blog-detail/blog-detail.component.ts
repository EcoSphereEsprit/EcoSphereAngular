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
    constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router,private commentService: CommentService) {}
    ngOnInit() {
        const blogId = this.route.snapshot.paramMap.get('id');
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
    
        this.blogService.deleteBlog(this.blog._id).subscribe({
          next: () => {
            console.log('Blog deleted successfully');
            this.navigateToList()
            // Optionally navigate to the list view or another page after deletion
            
          },
          error: (error) => {
            console.error('Error deleting blog:', error);
          }
        });
      }
    navigateToList() {
        this.router.navigate(['/blog/list']); // Navigate to your blog list route
    }

}
