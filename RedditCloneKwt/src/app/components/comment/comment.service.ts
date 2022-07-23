import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service';
import { CommentPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private apiService: ApiService, private http : HttpClient) { }

  getAllCommentsForPost(postId: number) {
    return this.apiService.get(`http://localhost:8080/api/comments/byPost/${postId}`);
  }


  postComment(commentPayload: CommentPayload) {
    return this.apiService.post('http://localhost:8080/api/comments/', JSON.stringify(commentPayload));
  }

  getAllCommentsByUser(userName: string) {
    return this.apiService.get(`http://localhost:8080/api/comments/byUser/${userName}`);
  }

  deleteComment(id: number) {
    return this.http.delete(`http://localhost:8080/api/comments/delete/${id}`);
  }

  updateComment(id: number, comment : CommentPayload) {
    return this.apiService.put(`http://localhost:8080/api/comments/edit/${id}`, JSON.stringify(comment));
  }
}
