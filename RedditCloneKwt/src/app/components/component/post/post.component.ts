import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService } from 'src/app/service';
import { CommentPayload } from '../../comment/comment.payload';
import { CommentService } from '../../comment/comment.service';
import { CommunityService } from '../../community/community.service';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  postId: number;
  @Input() post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];


  communityId;
  isLoggedIn : boolean;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private communityService: CommunityService,
    private activateRoute: ActivatedRoute,
    private commentService : CommentService, private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.getCommunityByName();
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  

  private getCommunityByName() {
    this.communityService.getCommunityByName(this.post.communityName).subscribe(data => {
      this.communityId = data.id;
    });
  }


  goToPost(id : number) {
    this.router.navigate(['view-post', id]);
  }

  goToCommunity(id : number) {
  this.router.navigate(['community', id]);
}
}
