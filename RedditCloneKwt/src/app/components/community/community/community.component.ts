import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService, UserService } from 'src/app/service';
import { PostModel } from '../../component/post-model';
import { PostService } from '../../component/post.service';
import { CommunityModel } from '../community-response';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  communityId : number;
  currentUserId : number;
  moderatorId : number;
  community : CommunityModel;
  @Input() posts: PostModel[];

  userType : string;
  //canEdit: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private communityService: CommunityService,
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private authService : AuthService,
    private userService : UserService) {

    }

  ngOnInit(): void {
    this.communityId = this.activateRoute.snapshot.params['id'];
    this.communityService.getCommunity(this.activateRoute.snapshot.params['id']).subscribe(data => 
    {this.community = data
      this.moderatorId = data.userId;     
      console.log(data)});

    this.postService.getAllPostsByCommunity(this.communityId).subscribe(data => {this.posts = data})
    this.getUser();
    
    this.userService.getMyInfo(this.authService.getUserName()).subscribe((user) => {
      this.userType = user.role.toString();
      console.log(user.role);
    })
  }

  canEdit(): boolean {
    if(this.currentUserId === this.moderatorId){
      return true;
    }
    else{
      return false;
    }
  }

  canSuspend(){
    if(this.userType === "ADMIN"){
      return true;
    }
    else{
      return false;      
  }
  }


  getUser(){
    this.userService.getMyInfo(this.authService.getUserName()).subscribe(user =>
      {
        this.currentUserId = user.id;
      });
  }

  goToSuspend(){
    this.router.navigate(['suspend-community', this.communityId]);
  }

  goToEditCommunity(){
    this.router.navigate(['update-community', this.communityId]);
  }
}
