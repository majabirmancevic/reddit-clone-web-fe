import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, UserService } from 'src/app/service';
import { PostModel } from '../../component/post-model';
import { PostService } from '../../component/post.service';
import { ActiveCommentInterface } from '../activeComment.interface';
import { CommentPayload } from '../comment.payload';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {

  currentUserId: number;
  
  comments: CommentPayload[] = [];
  commentPayload: CommentPayload;
  activeComment: ActiveCommentInterface | null = null;
  postId: number;
  post: PostModel;

  constructor(
    private commentService: CommentService,
    private activateRoute: ActivatedRoute,
    private postService: PostService,
    private userService : UserService,
    private authService : AuthService) {

    this.postId = this.activateRoute.snapshot.params.id;

    this.commentPayload = new CommentPayload();
   }

  ngOnInit(): void {
    this.getUser();
    console.log(this.userService.currentUser);
    this.getCommentsForPost();
    
  }

  getUser(){
    this.userService.getMyInfo(this.authService.getUserName()).subscribe(user =>
      {
        this.currentUserId = user.id;
      });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    });
  }

  getRootComments(): CommentPayload[] {
    return this.comments.filter((comment) => comment.parentId === null);
  }


  setActiveComment(activeComment: ActiveCommentInterface | null): void {
    this.activeComment = activeComment;
  }

  getReplies(commentId: number): CommentPayload[] {
    return this.comments
      .filter((comment) => comment.parentId === commentId)
  }

  addComment({text,parentId,}: {text: string; parentId: number | null;}): void {
    this.commentPayload.text = text;
    this.commentPayload.parentId = parentId;
    this.commentPayload.postId = this.postId;
    this.commentService.postComment(this.commentPayload)
      .subscribe((createdComment) => {
        this.comments = [...this.comments, createdComment];
        this.activeComment = null;
      });
  }

  updateComment({text, commentId,}: {text: string;commentId: number;}): void {
    this.commentPayload.text = text;
    this.commentService
      .updateComment(commentId, this.commentPayload)
      .subscribe((updatedComment) => {
        this.comments = this.comments.map((comment) => {
          if (comment.id === commentId) {
            return updatedComment;
          }
          return comment;
        });

        this.activeComment = null;
      });
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
    });
  }
}
