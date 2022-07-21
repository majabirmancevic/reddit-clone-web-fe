import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationRequestPayload } from 'src/app/components/registration/registration-request.payload';
import { AuthService, UserService } from 'src/app/service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  id: number;
  username: string;
  password: string;
  request : RegistrationRequestPayload ;
  form: FormGroup;

  constructor
  (
    private userService: UserService,
    private authService: AuthService,
    private route : ActivatedRoute,
    private router: Router
    ) 
    {
      this.request = {
        username: '',
        password: '', 
        email: '',
        displayName: '',
        description: ''
      };
     }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data => {
      this.request = data;
      this.password = data.password;
      this.username = data.username;
    });// error => console.log(error));

    this.form = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
//      password: new FormControl(''),
      displayName: new FormControl(''),
      description: new FormControl(''),
      oldPassword : new FormControl(''),
      newPassword : new FormControl('')
    });
  }


  onSubmit():void{

    this.request.username = this.form.get('username').value;
    this.request.email = this.form.get('email').value;
    this.request.displayName = this.form.get('displayName').value;
    this.request.description = this.form.get('description').value;

    if(this.form.get('oldPassword').value === this.password){
      this.password = this.form.get('newPassword').value;
      this.request.password = this.password;
    }else{
      console.log("Old password isn't correct!")
    }
    
    this.userService.updateUser(this.request,this.id).subscribe(data => {
      this.goToUserProfile();
    });
   
  }

  userName() {
    const user = this.userService.currentUser;
    return user.username;
  }

  goToUserProfile(){
    this.router.navigate(['view-profile',this.username])
  }
}
