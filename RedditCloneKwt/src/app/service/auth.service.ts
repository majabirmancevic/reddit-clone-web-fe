import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { RegistrationRequestPayload } from '../components/registration/registration-request.payload';
import { map } from 'rxjs/operators';
import { LoginRequestPayload } from '../components/login/login-request.payload';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

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
        
        this.loggedIn.emit(true);
        this.username.emit(res.username);
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
    this.router.navigate(['/']);
    localStorage.clear();

  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  getUserName() {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null && this.getJwtToken() != undefined ;
  }

//  tokenIsPresent() {
//    return this.access_token != undefined && this.access_token != null;
//  }



}
