import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from 'src/app/service';
import { RuleModel } from './rule-payload';
import { RuleService } from './rule.service';

@Component({
  selector: 'app-list-rules',
  templateUrl: './list-rules.component.html',
  styleUrls: ['./list-rules.component.css']
})
export class ListRulesComponent implements OnInit {

  rules: RuleModel[];
  @Input() communityId: number;
  @Input() currentUserId: number;
  @Input() moderatorId: number;

  userType : string;


  constructor(
    private ruleService: RuleService,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {

    this.ruleService.getAllRules(this.communityId).subscribe((data) => {
      this.rules = data;

      this.userService.getMyInfo(this.authService.getUserName()).subscribe((user) => {
        this.userType = user.role.toString();
        console.log(user.role);
      })
    });


  }

  canEdit(): boolean {
    if ( this.currentUserId === this.moderatorId || this.userType === "ADMIN") {
      return true;
    }
    else {
      return false;
    }
  }
  canDelete(): boolean {
    if ( this.currentUserId === this.moderatorId || this.userType === "ADMIN") {
      return true;
    }
    else {
      return false;
    }
  }

  goToCreateRule() {
    this.router.navigate(['create-rule', this.communityId]);
  }

  goToEditRule(id: number) {
    this.router.navigate(['update-rule', id]);
  }

  deleteRule(id: number) {
    this.http.delete(`http://localhost:8080/api/rules/${id}`)
      .subscribe((data) => {
        this.router.navigate(['community', this.communityId]);
      });
  }
}
