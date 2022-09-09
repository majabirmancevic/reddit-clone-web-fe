import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommunityService } from '../community.service';

@Component({
  selector: 'app-susspend-community',
  templateUrl: './susspend-community.component.html',
  styleUrls: ['./susspend-community.component.css']
})
export class SusspendCommunityComponent implements OnInit {

  id: number;
  suspendedReason: string;
  form: FormGroup;
  constructor(
    private activateRoute: ActivatedRoute,
    private communityService: CommunityService,
    private router : Router
  ) {
    this.suspendedReason = '';
    this.form = new FormGroup({
      reason: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params.id;
  }

  suspendCommunity() {
    this.suspendedReason = this.form.get('reason').value;
    this.communityService.deleteCommunity(this.id, this.suspendedReason).subscribe(data => {
      console.log("Community " + data.id + " " + data.name + " " + data.suspendedReason +  " is suspended!");
      this.router.navigateByUrl('');
    });
  }

  discard() {

    this.router.navigateByUrl('');

  }
}
