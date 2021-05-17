import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { ImgbbService } from '../services/imgbb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUser : FormGroup;

  constructor(private authService : AuthService, private notificationService : NotificationService,
    private imgbbService : ImgbbService, private router : Router) { }

  user : User = new User();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  imageUrl : String;

  ngOnInit(): void {
    this.registerUser = new FormGroup({
      userEmail : new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      userPassword : new FormControl(null,Validators.minLength(8)),
      userName : new FormControl(null,Validators.minLength(2)),
      userSurname : new FormControl(null,Validators.required)
    })
  }

  get userEmail(){
    return this.registerUser.get("userEmail");
  }

  get userName(){
    return this.registerUser.get("userName");
  }

  get userPassword(){
    return this.registerUser.get("userPassword");
  }

  get userSurname(){
    return this.registerUser.get("userSurname");

  }

  handleUpload(e : Event){
    const input = e.target as HTMLInputElement;
    this.imgbbService.upload(input.files[0]).subscribe(url => this.imageUrl = url);
  }

  onSubmit(): void {
    this.user.email = this.registerUser.get("userEmail").value;
    this.user.name = this.registerUser.get("userName").value;
    this.user.surname = this.registerUser.get("userSurname").value;
    this.user.password = this.registerUser.get("userPassword").value;
    if(this.imageUrl != null) {
      this.user.profilePicUrl = this.imageUrl;
    }
    this.authService.register(this.user.name, this.user.email, this.user.surname, this.user.password, this.user.profilePicUrl).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.notificationService.showSuccess("Usted se ha registrado correctamente "+ this.user.name, "Registrado corretamente!");
        setTimeout(() => {
          this.router.navigate(["/"])
        }, 1500);
      },
      err => {
        this.errorMessage = err.error.message;
        this.notificationService.showError("Ese correo ya existe, prueba con otro", "El correo insertado no esta bien o existe ya registrado.");

        this.isSignUpFailed = true;
      }
    );
  }

}
