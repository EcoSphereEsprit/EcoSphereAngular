import { Component, Input } from '@angular/core';
import { CommentService } from 'src/app/blog/services/comment.service';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html'
})
export class BlogCommentsComponent {
  @Input() totalComments: any[] = [];
  rowCount = 3;

  constructor(private commentService: CommentService) {}

  deleteComment(commentId: string) {
    this.commentService.deleteComment(commentId).subscribe(
      response => {
        console.log('Comment deleted successfully', response);
        this.totalComments = this.totalComments.filter(comment => comment._id !== commentId);
      },
      error => {
        console.error('Error deleting comment', error);
      }
    );
  }
}
