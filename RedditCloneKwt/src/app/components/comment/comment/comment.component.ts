import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/service';

import { ActiveCommentInterface } from '../activeComment.interface';
import { ActiveCommentTypeEnum } from '../activeCommentType.enum';
import { CommentPayload } from '../comment.payload';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment! : CommentPayload;
  @Input() activeComment! : ActiveCommentInterface | null;
  @Input() replies! : CommentPayload[];
  @Input() currentUserId! : number;
  @Input() parentId! :number | null;

  @Output() setActiveComment = new EventEmitter<ActiveCommentInterface | null>();
  @Output() deleteComment = new EventEmitter<number>();
  @Output() addComment = new EventEmitter<{ text: string; parentId: number | null }>();
  @Output() updateComment = new EventEmitter<{ text: string; commentId: number }>();


  canReply: boolean = false;
  canEdit: boolean = false;
  canDelete: boolean = false;
  activeCommentType = ActiveCommentTypeEnum;
  replyId: number | null = null;
  
  constructor(private userSevice:UserService) { }

  ngOnInit(): void {

    this.canReply = Boolean(this.currentUserId);
    this.canEdit = this.currentUserId === this.comment.userId;
    this.canDelete = this.currentUserId === this.comment.userId;
    this.replyId = this.parentId ? this.parentId : this.comment.id;
    console.log("Comment.userId : " + this.comment.userId);
    console.log("CurrentUserId : " + this.currentUserId);
  }

  isReplying(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === this.activeCommentType.replying
    );
  }

  isEditing(): boolean {
    if (!this.activeComment) {
      return false;
    }
    return (
      this.activeComment.id === this.comment.id &&
      this.activeComment.type === 'editing'
    );
  }


}
