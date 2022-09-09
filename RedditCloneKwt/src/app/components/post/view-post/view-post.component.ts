import { Component, Input, OnInit } from '@angular/core';
import { FormControl,  FormGroup,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService, UserService } from 'src/app/service';
import { CommentPayload } from '../../comment/comment.payload';
import { CommentService } from '../../comment/comment.service';
import { PostModel } from '../../component/post-model';
import { PostService } from '../../component/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;

  currentUserId : number;
  postUserId:number; 
  user :any;
  post: PostModel;
  form: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  isLoggedIn : boolean;
  displayName : string;

  userType : string;

  constructor(private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private authService : AuthService,
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService) {

    this.postId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getCurrentUser();
    this.getPostById();
    
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
      this.displayName = data.displayName;
      console.log(data);
    });
  }
  
  getCurrentUser(){
    this.userService.getMyInfo(this.authService.getUserName()).subscribe(user =>
      {
        this.currentUserId = user.id;
      
      });
  }

  canEdit(): boolean {
    if(this.currentUserId === this.post.userId){
      return true;
    }
    else{
      return false;
    }
  }

  canDelete(): boolean {
    if(this.currentUserId === this.post.userId){
      return true;
    }
    else{
      return false;
    }
  }
 
  goToEditPost(){
    this.router.navigate(['update-post', this.postId]);
  }

  deletePost(){
    this.postService.deletePost(this.activateRoute.snapshot.params.id).subscribe((data) =>{
      this.router.navigateByUrl('');
    })
  }
}
