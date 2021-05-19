import { Component, OnInit } from '@angular/core';
import { UserVO } from '../interfaces/UserVO';
import { FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUser : FormGroup;

  constructor(private authService : AuthService, private router : Router, private tokenStorage: TokenStorageService, private notification : NotificationService) { }

  user : User = new User();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';




  ngOnInit(): void {
    this.loginUser = new FormGroup({
      userEmail : new FormControl('',Validators.required),
      userPassword : new FormControl('',Validators.required)
    })
  }

  get userEmail(){
    return this.loginUser.get("userEmail");
  }

  get userPassword(){
    return this.loginUser.get("userPassword");
  }

  onSubmit(){
    this.user.email = this.loginUser.get("userEmail").value;
    this.user.password = this.loginUser.get("userPassword").value;
    this.authService.login(this.user.email, this.user.password).subscribe(
      data => {
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        console.log(err);
        if(err.status == 404){
          this.notification.showError("No existe ese usuario con los datos introducidos.","No existe ese usuario.");
        }
        if(err.status == 500){
          this.notification.showError("Asegurate de que los datos introducidos son correctos!","La contraseña o el correo no coinciden.")
        }
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    this.router.navigate(["/"]);
  }

}
