import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { ApiService, ConfigService } from 'src/app/service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private apiService: ApiService,
  private config: ConfigService, private http : HttpClient) { }

    

  // getAllPosts(): Observable<Array<PostModel>> {
  //   return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
  // }

  getAllPosts(){
    return this.apiService.get(this.config.post_url);
  }

  // createPost(postPayload: CreatePostPayload): Observable<any> {
  //   return this.http.post('http://localhost:8080/api/posts/', postPayload);
  // }

  createPost(postPayload: CreatePostPayload) {       
    const header = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.post_url , JSON.stringify(postPayload), header);
  }      

  getAllFlair(){
    return this.apiService.get(`http://localhost:8080/api/flairs/`)
  }


  // getPost(id: number): Observable<PostModel> {
  //   return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id);
  // }
  getPost(id: number){
    return this.apiService.get(`http://localhost:8080/api/posts/${id}`)
  }



  // getAllPostsByUser(name: string): Observable<PostModel[]> {
  //   return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + name);
  // }

  getAllPostsByUser(name: string){
    return this.apiService.get(this.config.getPostsByUser_url + name);
  }
    
  getAllPostsByCommunity(communityId: number){
    return this.apiService.get(`http://localhost:8080/api/posts/byCommunity/${communityId}`)
  }


  updatePost(postId : number, postPayload: CreatePostPayload ){
    return this.apiService.put(this.config.updatePost_url + postId, postPayload)
  }

  deletePost(id:number){
    return this.http.delete(`http://localhost:8080/api/posts/${id}`)
  }

//  updatePost(postPayload: CreatePostPayload, id: number): Observable<any> {
//    return this.http.put<CreatePostPayload>('http://localhost:8080/api/posts/edit/'+ id, postPayload);
//  }
}
