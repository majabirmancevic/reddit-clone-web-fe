import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommunityModel } from './community-response';
import { Observable } from 'rxjs';
import { ApiService, ConfigService } from 'src/app/service';


@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private apiService: ApiService,
    private config: ConfigService, private http : HttpClient) { }

//  getAllCommunities(): Observable<Array<CommunityModel>> {
//    return this.http.get<Array<CommunityModel>>('http://localhost:8080/api/community');
//  }

  getAllCommunities(){
    return this.apiService.get(this.config.community_url);
  }

  getCommunity(id: number){
    return this.apiService.get(`http://localhost:8080/api/community/${id}`)
  }

  getCommunityByName(name: String){
    return this.apiService.get(`http://localhost:8080/api/community/byName/${name}`)
  }

//  createCommunity(subredditModel: CommunityModel): Observable<CommunityModel> {
//    return this.http.post<CommunityModel>('http://localhost:8080/api/community',
//      subredditModel);
//  }

  createCommunity(subredditModel: CommunityModel){
  return this.apiService.post(this.config.community_url,JSON.stringify(subredditModel));
  }


  updateCommunity(postId : number, subredditModel: CommunityModel ){
    return this.apiService.put(this.config.updateCommunity_url + postId, subredditModel)
  }

//  updateCommunity(subredditModel: CommunityModel, id: number): Observable<any> {
//    return this.http.put<CommunityModel>('http://localhost:8080/api/community/edit/' + id, subredditModel);
//  }
}
