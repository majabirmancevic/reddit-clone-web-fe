import { Component, OnInit } from '@angular/core';
import { PostModel } from '../component/post-model';
import { PostService } from '../component/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  constructor() { 
  
  }

  ngOnInit(): void {
  }

}
