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
  flairs: Array<String>;

  cardImageBase64: string;
  imageError: string;
  isImageSaved: boolean;
  constructor(private router: Router, private postService: PostService,
    private communityService: CommunityService) {

    this.postPayload = {
      postName: '',
      text: '',
      communityName: '',
      imagePath : ''
      
    }
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      communityName: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      flairName : new FormControl('')
    });
    
    this.communityService.getNotDeletedCommunities().subscribe((data) => {
      this.communities = data;
      console.log(data)
    });
    this.postService.getAllFlair().subscribe((data) => {
      this.flairs = data;
    })
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {

      const max_size = 20971520;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }


  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.communityName = this.createPostForm.get('communityName').value;
    this.postPayload.text = this.createPostForm.get('text').value;
    this.postPayload.imagePath = this.cardImageBase64;
    this.postPayload.flair = this.createPostForm.get('flairName').value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    });
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
