import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService, ConfigService } from 'src/app/service';
import { RuleModel } from './rule-payload';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(private apiService: ApiService,
    private config: ConfigService, private http: HttpClient) { }

  getAllRules(communityId: number) {
    return this.apiService.get(`http://localhost:8080/api/rules/byCommunity/${communityId}`)
  }

  createRule(rule: RuleModel) {
    return this.apiService.post(`http://localhost:8080/api/rules/`,JSON.stringify(rule))
  }

  getRule(id: number) {
    return this.apiService.get(`http://localhost:8080/api/rules/${id}`)
  }

  editRule(id:number, rule:RuleModel){
    return this.apiService.put(`http://localhost:8080/api/rules/${id}`,rule)
  }

  deleteRule(id:number){
    return this.apiService.delete(`http://localhost:8080/api/rules/${id}`)
  }
}
