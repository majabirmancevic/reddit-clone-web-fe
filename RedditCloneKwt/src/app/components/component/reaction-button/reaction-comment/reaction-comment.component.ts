import { Component, Input, OnInit } from '@angular/core';
import { CommentPayload } from 'src/app/components/comment/comment.payload';
import { CommentService } from 'src/app/components/comment/comment.service';
import { AuthService } from 'src/app/service';
import { VoteService } from '../../vote.service';
import { ReactionType } from '../reaction-type';
import { VotePayload } from '../vote-payload';

@Component({
  selector: 'app-reaction-comment',
  templateUrl: './reaction-comment.component.html',
  styleUrls: ['./reaction-comment.component.css']
})
export class ReactionCommentComponent implements OnInit {

  @Input() comment: CommentPayload;
  votePayload: VotePayload;
  isLoggedIn: boolean;
  didVote = false;

  constructor(private voteService: VoteService, private authService: AuthService, private commentSevice: CommentService) {
    this.votePayload = {
      reactionType: undefined,
      id: undefined
    }
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    this.updateVoteDetails();
    console.log(this.comment);
  }

  upvote() {
    this.votePayload.reactionType = ReactionType.UPVOTE;
    this.vote();
    this.didVote = true;
  }

  downvote() {
    this.votePayload.reactionType = ReactionType.DOWNVOTE;
    this.vote();
    this.didVote = true;
  }

  private vote() {
    this.votePayload.id = this.comment.id;
    this.voteService.voteComment(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    });
  }

  private updateVoteDetails() {
    this.commentSevice.getComment(this.comment.id).subscribe(comment => {
      this.comment = comment;
    });
  }
}
