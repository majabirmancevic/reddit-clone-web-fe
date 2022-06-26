import { Component, OnInit } from '@angular/core';
import { CommunityModel } from '../community-response';
import { CommunityService } from '../community.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-community',
  templateUrl: './list-community.component.html',
  styleUrls: ['./list-community.component.css']
})
export class ListCommunityComponent implements OnInit {

  communities!: Array<CommunityModel>;
  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.communityService.getAllCommunities().subscribe(data => {this.communities = data})
  }
}
