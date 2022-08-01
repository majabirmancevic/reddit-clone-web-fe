import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { RegistrationRequestPayload } from '../components/registration/registration-request.payload';
import { AuthService } from './auth.service';
import { PasswordDto } from '../components/user/change-password/password-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser;
  currentUserId! : number;
  constructor(
    private apiService: ApiService,
    private config: ConfigService,
    private authService: AuthService
  ) {
  }


    getMyInfo(username: string) {
      return this.apiService.get(`http://localhost:8080/api/auth/loggedUser/${username}`)
      
    }


  updateUser(user:RegistrationRequestPayload, userId : number){
    return this.apiService.put(`http://localhost:8080/api/auth/users/${userId}`,JSON.stringify(user))
    .pipe(map(() => {
      console.log('Update success');
    }));
  }

  changePassword(id:number, passwordDto:PasswordDto){
    return this.apiService.post(`http://localhost:8080/api/auth/changePassword/${id}`, JSON.stringify(passwordDto))
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
