import { Component, OnInit } from '@angular/core';
import { AuthService, UserService } from 'src/app/service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  hasSignedIn() {
    return this.authService.tokenIsPresent();
  }

  userName() {
    const user = this.userService.currentUser;
    return user.username;
  }

  logout() {
    this.authService.logout();
  }
}
