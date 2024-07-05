import { Component, Input } from '@angular/core';
import { CommentService } from 'src/app/blog/services/comment.service';

@Component({
  selector: 'app-blog-comments',
  templateUrl: './blog-comments.component.html'
})
export class BlogCommentsComponent {
  @Input() totalComments: any[] = [];
  rowCount = 3;
  editingComment: any = null;
  updatedContent: string = '';
  updatedDate: string = '';
  CurrentUser !: string; 

  constructor(private commentService: CommentService) {
    this.CurrentUser = localStorage.getItem('userId') ?? ''
  }
//edit comment 

editComment(comment: any) {
  this.editingComment = comment;
  this.updatedContent = comment.content;
}

updateComment() {
  if (this.editingComment) {
    this.commentService.updateComment(this.editingComment._id, this.updatedContent, this.updatedDate).subscribe(
      response => {
        console.log('Comment updated successfully', response);
          this.editingComment.content = this.updatedContent;
          this.editingComment.date = this.updatedDate;
          this.editingComment = null;
      },
      error => {
        console.error('Error updating comment', error);
      }
    );
  }
}

cancelEdit() {
  this.editingComment = null;
}



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
