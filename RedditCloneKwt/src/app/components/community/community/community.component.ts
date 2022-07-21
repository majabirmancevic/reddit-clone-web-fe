import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service';
import { PostModel } from '../../component/post-model';
import { PostService } from '../../component/post.service';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  communityId : number;
  @Input() posts: PostModel[];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private communityService: CommunityService,
    private postService: PostService,
    private activateRoute: ActivatedRoute) {

//    this.communityId = this.activateRoute.snapshot.params.id;
    }

  ngOnInit(): void {
    this.communityId = this.activateRoute.snapshot.params['id'];

    this.postService.getAllPostsByCommunity(this.communityId).subscribe(data => {this.posts = data})
  }


}
