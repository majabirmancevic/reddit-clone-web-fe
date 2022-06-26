import { Component, OnInit } from '@angular/core';
import { CommunityModel } from '../../community/community-response';
import { CommunityService } from '../../community/community.service';


@Component({
  selector: 'app-community-side-bar',
  templateUrl: './community-side-bar.component.html',
  styleUrls: ['./community-side-bar.component.css']
})
export class CommunitySideBarComponent implements OnInit {

  communities: Array<CommunityModel> = [];
  displayViewAll!: boolean;

  constructor(private communityService: CommunityService) {
    this.communityService.getAllCommunities().subscribe(data => {
      if (data.length > 3) {
        this.communities = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.communities = data;
      }
    });
   }

  ngOnInit(): void {
  }

}
