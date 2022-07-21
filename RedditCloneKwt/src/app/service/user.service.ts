import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { RegistrationRequestPayload } from '../components/registration/registration-request.payload';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser;

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) {
  }


  // getMyInfo() {
  //   return this.apiService.get(this.config.user_url)
  //     .pipe(map(user => {
  //       this.currentUser = user;
  //       return user;
  //     }));
  // }

  updateUser(user:RegistrationRequestPayload, userId : number){
    return this.apiService.put(`http://localhost:8080/api/auth/users/${userId}`,JSON.stringify(user))
    .pipe(map(() => {
      console.log('Update success');
    }));
  }

  getUserById(userId:number){
    return this.apiService.get(`http://localhost:8080/api/auth/user/${userId}`)
  }
/*
  getAll() {
    return this.apiService.get(this.config.users_url);
  }
*/
}
