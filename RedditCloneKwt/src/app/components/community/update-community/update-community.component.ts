import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityModel } from '../community-response';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-update-community',
  templateUrl: './update-community.component.html',
  styleUrls: ['./update-community.component.css']
})
export class UpdateCommunityComponent implements OnInit {
  
  communityId : number;
  form : FormGroup;
  communityModel : CommunityModel;

  constructor(private router: Router, private communityService: CommunityService, private activateRoute: ActivatedRoute) {

    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });

    this.communityModel = {
      name: '',
      description: ''
    }
   }

  ngOnInit(): void {
    this.communityId = this.activateRoute.snapshot.params['id'];
    this.communityService.getCommunity(this.activateRoute.snapshot.params['id']).subscribe(data => 
      {this.communityModel = data      
        console.log(data)});
  }

  discard() {
    this.router.navigate(['community', this.communityId]);
  }

  editCommunity() {
    this.communityModel.name = this.form.get('title').value;
    this.communityModel.description = this.form.get('description').value;

    this.communityService.updateCommunity(this.communityId,this.communityModel).subscribe(data => {
      this.router.navigate(['community', this.communityId]);
    })
  }
}
