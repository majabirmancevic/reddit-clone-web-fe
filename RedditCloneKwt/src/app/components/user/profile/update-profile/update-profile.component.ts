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
  user: any;

  request : RegistrationRequestPayload ;
  form: FormGroup;

  cardImageBase64: string;
  imageError: string;
  isImageSaved: boolean;

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
        description: '',
        avatar : ''
      };
     }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    //  this.password = data.password
      this.username = data.username;
    });

    this.form = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      displayName: new FormControl(''),
      description: new FormControl('')
    });
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {

      const max_size = 20971520;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  onSubmit():void{

    this.request.username = this.form.get('username').value;
    this.request.email = this.form.get('email').value;
    this.request.displayName = this.form.get('displayName').value;
    this.request.description = this.form.get('description').value;
    this.request.avatar = this.cardImageBase64;

    // if(this.form.get('oldPassword').value === this.password){
    //   this.password = this.form.get('newPassword').value;
    //   this.request.password = this.password;
    // }else{
    //   console.log("Old password isn't correct!")
    // }
    
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

  goToChangePassword(){
    this.router.navigate(['change-password',this.id])
  }
}
