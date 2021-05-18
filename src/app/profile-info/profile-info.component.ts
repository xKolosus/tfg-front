import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserVO } from '../interfaces/UserVO';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  constructor(private userService : UserService,
  private notificationService : NotificationService,
  private router : Router,
  private authService : AuthService) { }

  profileData : FormGroup;
  user : UserVO;
  postsByUser : Number;

  ngOnInit(): void {
    this.loadInfo();
    this.profileData = new FormGroup({
      userName : new FormControl('', Validators.required),
      userSurname : new FormControl('', Validators.required),
      userEmail : new FormControl('', Validators.required)
    });
  }

  loadInfo(){
    let userId = JSON.parse(window.sessionStorage.getItem("auth-user")).userId;
    this.userService.getUserById(userId).subscribe((u) => {
      this.user = u;
      this.profileData.patchValue({
        userName :  this.user.name,
        userSurname : this.user.surname,
        userEmail : this.user.email});
    });
    this.userService.countPostsByUserId(userId)
      .subscribe((u) => {
        this.postsByUser = u;
      });
  };


  onSubmit(){
    this.user.name = this.profileData.get("userName").value;
    this.user.surname = this.profileData.get("userSurname").value;
    this.user.email = this.profileData.get("userEmail").value;

    this.userService.updateUser(this.user.userId, this.user)
    .subscribe(
      res => {
        this.notificationService.showSuccess("Se han modificado los datos correctamente!","Serás redirigido al inicio");
        setTimeout(() => {
          this.router.navigate(["/"]);
        }, 1500);
      },
      err => {
        this.notificationService.showError("No se han conseguido modificar tus datos.", "Ha habido un error");
    });
  }

  deleteUser(){
    this.userService.deleteUser(this.user.userId).subscribe(res =>{
      this.notificationService.showSuccess("Se ha eliminado correctamente el usuario.", "Hasta luego!");
      setTimeout(() => {
        this.authService.logout();
      }, 1500);
    },
    err => {
      this.notificationService.showError("Ha surgido algún problema al intentar borrar tu cuenta, intentalo más tarde.", "Error en el servidor");
    });
  }
}
