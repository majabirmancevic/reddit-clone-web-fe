import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { LoginRequestPayload } from './login-request.payload';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import {takeUntil} from 'rxjs/operators';


interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  notification: DisplayMessage;

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  isError!: boolean;
  returnUrl: string;
  
  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute) {

      this.loginRequestPayload = {
        username: '',
        password: ''
      };
   }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: DisplayMessage) => {
      this.notification = params;
    });
  // get return url from route parameters or default to '/'
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])),
      password: new FormControl('',  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)]))
    });
  }



  login() {
  //  this.notification = undefined;
  //  this.submitted = true;

    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.router.navigateByUrl('');
    }
  /*  error => {
      this.submitted = false;
      this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
    }*/);
  }


}
