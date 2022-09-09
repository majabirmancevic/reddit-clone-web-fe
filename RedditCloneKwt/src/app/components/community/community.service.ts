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

  getNotDeletedCommunities(){
    return this.apiService.get(`http://localhost:8080/api/community/all`)
  }
  getCommunity(id: number){
    return this.apiService.get(`http://localhost:8080/api/community/${id}`)
  }

  getCommunityByName(name: String){
    return this.apiService.get(`http://localhost:8080/api/community/byName/${name}`)
  }
  deleteCommunity(id: number, suspendedReason: string){
    return this.apiService.post(`http://localhost:8080/api/community/${id}`,suspendedReason)
  }

//  createCommunity(subredditModel: CommunityModel): Observable<CommunityModel> {
//    return this.http.post<CommunityModel>('http://localhost:8080/api/community',
//      subredditModel);
//  }

  createCommunity(subredditModel: CommunityModel){
  return this.apiService.post(this.config.community_url,JSON.stringify(subredditModel));
  }


  updateCommunity(id : number, communityDto: CommunityModel ){
    return this.apiService.put(`http://localhost:8080/api/community/edit/${id}`,JSON.stringify(communityDto));
  }

//  updateCommunity(subredditModel: CommunityModel, id: number): Observable<any> {
//    return this.http.put<CommunityModel>('http://localhost:8080/api/community/edit/' + id, subredditModel);
//  }
}
