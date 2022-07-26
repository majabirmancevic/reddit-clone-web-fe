import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService, UserService } from 'src/app/service';
import { RegistrationRequestPayload } from '../../registration/registration-request.payload';
import { PasswordDto } from './password-dto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;

  id: number;
  passwordDto: PasswordDto;

  constructor(private userService: UserService,
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
      
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.minLength(3)])
    });
   
    this.passwordDto = {
      oldPassword : '',
      newPassword : ''
    }
  }

    change()  {
      this.passwordDto.oldPassword = this.form.get('oldPassword').value;
      this.passwordDto.newPassword = this.form.get('newPassword').value;

      this.userService.changePassword(this.id, this.passwordDto).subscribe(data => {     
        return data;      
      });
  }
}
