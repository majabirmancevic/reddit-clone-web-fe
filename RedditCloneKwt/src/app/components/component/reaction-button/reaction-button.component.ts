import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostModel } from '../post-model';
import { VotePayload } from './vote-payload';

import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from '../post.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ReactionType } from './reaction-type';
//import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reaction-button',
  templateUrl: './reaction-button.component.html',
  styleUrls: ['./reaction-button.component.css']
})
export class ReactionButtonComponent implements OnInit {

  @Input() post: PostModel;
  votePayload: VotePayload;
  isLoggedIn: boolean;
  didVote = false;

  constructor(private voteService: VoteService, private authService: AuthService,
    private postService: PostService) { 

      this.votePayload = {
        reactionType: undefined,
        id: undefined
      }
      this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.reactionType = ReactionType.UPVOTE;
    this.vote();
    this.didVote = true;
  }

  downvotePost() {
    this.votePayload.reactionType = ReactionType.DOWNVOTE;
    this.vote();
    this.didVote = true;
  }

  private vote() {
    this.votePayload.id = this.post.id;
    this.voteService.votePost(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }

  

}
