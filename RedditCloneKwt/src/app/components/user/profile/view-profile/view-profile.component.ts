import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { RegistrationRequestPayload } from 'src/app/components/registration/registration-request.payload';
import { ApiService, AuthService, ConfigService, UserService } from 'src/app/service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  karma : number;
  id : number;
  password : string;
  email: string;
  username : string;
  description : string;
  displayName :string;

  constructor( private apiService: ApiService,
    private config: ConfigService,
    private userService : UserService,
    private router: Router,
    private authService: AuthService  
    ) { 
      
    }

  ngOnInit(): void {
    this.getMyInfo(this.authService.getUserName());

  }
  
  

  getMyInfo(username:string) {
    //this.http.get<any>(`http://localhost:8080/api/auth/loggedUser/
    return this.apiService.get(`http://localhost:8080/api/auth/loggedUser/${username}`)
      .subscribe(data => {
        this.id = data.id
        this.username = data.username
        this.password = data.password
        this.email = data.email
        this.displayName = data.displayName
        this.description = data.description
      })
  }

  getKarma(voterId: number){
    return this.apiService.get(`http://localhost:8080/api/votes/voter/${voterId}`).subscribe(
      karma => {this.karma = karma}
    );
  }

  updateProfile(id:number){
    this.router.navigate(['update-profile',id]);
  }
}
