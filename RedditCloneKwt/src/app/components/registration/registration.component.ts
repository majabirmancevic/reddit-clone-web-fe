import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { RegistrationRequestPayload } from './registration-request.payload';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
 
  signupRequestPayload: RegistrationRequestPayload;
  signupForm: FormGroup;

  submitted = false;
  notification: DisplayMessage;
  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private authService : AuthService, 
    private router: Router,
    private route: ActivatedRoute ) { 

    this.signupRequestPayload = {
      username: '',
      password: '', 
      email: '',
      displayName: '',
      description: '',
      avatar : ''
    };

  }

  ngOnInit() {

    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: DisplayMessage) => {
        this.notification = params;
      });

    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])),

    });
   
  }

  signup() {

  //  this.notification = undefined;
  //  this.submitted = true;

    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;


    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'],
        { queryParams: { registered: 'true' } })          
    } 
     /*  error => {
      this.submitted = false;
      this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
    }*/);
  }  
}
