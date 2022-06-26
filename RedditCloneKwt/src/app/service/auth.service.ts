import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationRequestPayload } from '../components/registration/registration-request.payload';
import { map, tap } from 'rxjs/operators';
import { LoginRequestPayload } from '../components/login/login-request.payload';
import { LoginResponse } from '../components/login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private config: ConfigService,
    private router: Router ) { }

    private access_token = null;


  login(user : LoginRequestPayload) {
    const loginHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });    
    const body = {
      'username': user.username,
      'password': user.password
    }; 

    return this.apiService.post(this.config.login_url, JSON.stringify(body), loginHeaders)
      .pipe(map((res) => {
        console.log('Login success');
        this.access_token = res.authenticationToken;
        localStorage.setItem("authenticationToken", res.authenticationToken)
        localStorage.setItem("username", res.username)
        localStorage.setItem("expiresAt", res.expiresAt)        
      }));
  }

  signup(user:RegistrationRequestPayload){
    const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.signup_url, JSON.stringify(user), signupHeaders)
      .pipe(map(() => {
        console.log('Sign up success');
      }));
  }
   
  logout() {
    this.userService.currentUser = null;
    this.access_token = null;
    this.router.navigate(['/login']);
  }

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

  

}
