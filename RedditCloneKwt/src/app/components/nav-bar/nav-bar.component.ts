import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from 'src/app/service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: any;
  username: string;
  displayName : string;
  isLoggedIn : boolean;

  constructor(private userService: UserService, private authService: AuthService,  private router: Router) { }

  ngOnInit(): void {

    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.userService.getMyInfo(this.authService.getUserName()).subscribe(data=>{
    this.user = data, 
    this.displayName = data.displayName});
  }


  userName() {
    const user = this.userService.currentUser;
    return user.username;
  }

  logout() {
    this.authService.logout();
  }

  goToUserProfile(username : string) {
    this.router.navigate(['view-profile', username]);
  }
}
