import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public posts : Array<Post>;

  constructor() { 

    this.posts = [
      new Post('perap','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus nisl quis velit gravida, a cursus nulla ultricies. Aenean cursus quis ipsum nec ornare.','05-16-2022','url1',1),
      new Post('mikam','Cras at lacus enim. Pellentesque varius vulputate lorem non venenatis. Sed id mi at mauris rutrum rhoncus sed sit amet tortor. ','06-16-2022','url2',1),
      new Post('zikaz',' Nullam convallis quam eget eros varius facilisis. Pellentesque tincidunt sem massa, aliquam dapibus tortor volutpat quis. ','07-16-2022','url3',1)
    ]
  }

  ngOnInit(): void {
  }

}
