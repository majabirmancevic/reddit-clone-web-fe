import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VotePayload } from 'src/app/components/component/reaction-button/vote-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  votePost(votePayload: VotePayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/votes/post', votePayload);
  }
  voteComment(votePayload: VotePayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/votes/comment', votePayload);
  }
}
