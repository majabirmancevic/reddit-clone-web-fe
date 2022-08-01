import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from '../community.service';
import { RuleModel } from '../list-rules/rule-payload';
import { RuleService } from '../list-rules/rule.service';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.css']
})
export class CreateRuleComponent implements OnInit {

  id: number;
  form: FormGroup;
  rule: RuleModel;

  constructor(
    private activateRoute: ActivatedRoute,
    private communityService: CommunityService,
    private router : Router,
    private ruleService: RuleService
  ) { 

    this.form = new FormGroup({
      rule: new FormControl('', Validators.required)
    });

    this.rule = {
      description : '',
      communityId : this.id
    }
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
  }

  createRule(){
    this.rule.description = this.form.get('rule').value;
    this.rule.communityId = this.id;
    
    this.ruleService.createRule(this.rule).subscribe((data) => {
      this.router.navigate(['community', this.id])
    });
  }


  discard() {
    this.router.navigate(['community', this.id]);
  }
}
