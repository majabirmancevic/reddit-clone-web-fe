import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunityModel } from '../../community/community-response';
import { CommunityService } from '../../community/community.service';
import { PostService } from '../../component/post.service';
import { CreatePostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  communities: Array<CommunityModel>;

  constructor(private router: Router, private postService: PostService,
    private communityService: CommunityService) 
    {
      this.postPayload = {
        postName: '',
        text: '',
        communityName: ''
      }
    }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      communityName: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
    this.communityService.getAllCommunities().subscribe((data) => {
      this.communities = data;
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.communityName = this.createPostForm.get('communityName').value;
    this.postPayload.text = this.createPostForm.get('text').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    });
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
