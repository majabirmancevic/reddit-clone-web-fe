import { Component, OnInit } from '@angular/core';
import { FormControl,  FormGroup,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService } from 'src/app/service';
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
  post: PostModel;
  form: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  isLoggedIn : boolean;

  constructor(private router: Router,
    private apiService: ApiService,
    private authService : AuthService,
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService) {

    this.postId = this.activateRoute.snapshot.params.id;

    this.form = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getPostById();
    this.getCommentsForPost();
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    });
  }

  postComment() {
    this.commentPayload.text = this.form.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.form.get('text').setValue('');
      this.getCommentsForPost();
    });
  }



  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    });
  }

  goToPost(id: number) {
    this.router.navigate(['post', id]);
  }


}
