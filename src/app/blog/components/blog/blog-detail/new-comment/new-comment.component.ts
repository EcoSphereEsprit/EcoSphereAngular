import { Component, OnInit,Input } from '@angular/core';
import { CommentService } from 'src/app/blog/services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html'
})
export class NewCommentComponent implements OnInit {
    @Input() blogId!: string;
  content: string = '';
  date: string = '';
  
  constructor(private commentService: CommentService, private router: Router) {}

  ngOnInit() {
    this.date = new Date().toISOString().slice(0, 10);
  }

  addComment() {
    this.commentService.createComment(this.blogId, this.content, this.date).subscribe(
      response => {
        console.log('Comment added successfully', response);
        window.location.reload();      },
      error => {
        console.error('Error adding comment', error);
      }
    );
  }
}
