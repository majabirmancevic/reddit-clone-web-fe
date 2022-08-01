import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from '../../community/community.service';
import { PostModel } from '../../component/post-model';
import { PostService } from '../../component/post.service';
import { CreatePostPayload } from '../create-post/create-post.payload';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  id:number;
  post: PostModel;
  form: FormGroup;
  postPayload: CreatePostPayload;
  flairs: Array<String>;

  cardImageBase64: string;
  imageError: string;
  isImageSaved: boolean;

  constructor(private router: Router, private postService: PostService,
    private communityService: CommunityService, private activateRoute:ActivatedRoute) { 

      this.form = new FormGroup({
        postName: new FormControl('', Validators.required),
        text: new FormControl('', Validators.required),
        flairName : new FormControl('')
      });

      this.postPayload = {
        postName: '',
        text: '',
        imagePath : ''      
      }

      this.post = new PostModel();
    }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params.id;
    this.getPostById();
    this.postService.getAllFlair().subscribe((data) => {
      this.flairs = data;
    })
  }

  private getPostById() {
    this.postService.getPost(this.activateRoute.snapshot.params.id).subscribe(data => {
      this.post = data;
      console.log(data);
    });
  }

  editPost() {
    this.postPayload.postName = this.form.get('postName').value;
    this.postPayload.text = this.form.get('text').value;
    this.postPayload.imagePath = this.cardImageBase64;
    this.postPayload.flair = this.form.get('flairName').value;

    this.postService.updatePost(this.id, this.postPayload).subscribe((data) => {
      this.router.navigate(['view-post', this.id]);
    });
  }

  discardPost() {
    this.router.navigate(['view-post', this.id]);
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
}
