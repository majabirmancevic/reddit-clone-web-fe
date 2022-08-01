import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from '../community.service';
import { RuleModel } from '../list-rules/rule-payload';
import { RuleService } from '../list-rules/rule.service';

@Component({
  selector: 'app-update-rule',
  templateUrl: './update-rule.component.html',
  styleUrls: ['./update-rule.component.css']
})
export class UpdateRuleComponent implements OnInit {

  id: number;
  communityId:number;
  form: FormGroup;
  rule: RuleModel;
  
  constructor(private activateRoute: ActivatedRoute,
    private communityService: CommunityService,
    private router : Router,
    private ruleService: RuleService) { 
      
      this.form = new FormGroup({
        rule: new FormControl('')
      });
  
      this.rule = {
        id : this.activateRoute.snapshot.params['id'],
        description : ''
      }
    }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    this.ruleService.getRule(this.activateRoute.snapshot.params['id']).subscribe((data) => {
      this.rule = data;
      console.log(data);
    });
      
  }

  editRule(){
    this.rule.description = this.form.get('rule').value;
    this.ruleService.editRule(this.id,this.rule).subscribe((data) => {
      this.router.navigate(['community', this.rule.communityId]);
    });
  }


  discard() {
    this.router.navigate(['community', this.rule.communityId]);
  }
}
