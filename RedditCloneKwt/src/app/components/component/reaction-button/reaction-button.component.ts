import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from '../post.service';
//import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reaction-button',
  templateUrl: './reaction-button.component.html',
  styleUrls: ['./reaction-button.component.css']
})
export class ReactionButtonComponent implements OnInit {

  @Input() post!: PostModel;
  votePayload: VotePayload;
 // faArrowUp = faArrowUp;
 // faArrowDown = faArrowDown;
  upvoteColor!: string;
  downvoteColor!: string;
  isLoggedIn!: boolean;

  constructor(private voteService: VoteService, private authService: AuthService,
    private postService: PostService) { 

      this.votePayload = {
        voteType: VoteType.UPVOTE,
        postId: 0
      }
      
    }

  ngOnInit(): void {
  }

  

}
