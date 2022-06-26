import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../post-model';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  
  posts: Array<PostModel> = [];

  constructor(private postService: PostService) { 
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    });

  }
  ngOnInit(): void {
  }

}
