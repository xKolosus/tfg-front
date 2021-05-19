import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/environments/environment';
import { UserVO } from '../interfaces/UserVO';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  "Access-Control-Allow-Origin" : "*" })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router : Router) { }

  login(email: String, password: String): Observable<any> {
    return this.http.post(ApiPath.url + '/login', {
      email,
      password
    }, httpOptions);
  }

  register(name : String, email : String, surname : String,  password : String, profilePicUrl : String): Observable<any> {
    return this.http.post(ApiPath.url + '/register', {
      name,
      surname,
      email,
      password,
      profilePicUrl
    }, httpOptions);
  }

  public isAuthenticated(): boolean {
    const token =  JSON.parse(window.sessionStorage.getItem('auth-user'));
    let boolAuth : boolean;

    if(token != null){
      boolAuth = true;
    } else {
      boolAuth = false;
    }
    // Check whether the token is expired and return
    // true or false
    return boolAuth;
  }

  getLoggedUserId() : Number {
    let userId = JSON.parse(window.sessionStorage.getItem("auth-user")).userId;

    return userId;
  }

  getUserToken() : string {
    let token = JSON.parse(window.sessionStorage.getItem("auth-user")).bearerToken;

    return token;
  }

  logout(){
    window.sessionStorage.removeItem("auth-user");
    this.router.navigate(["/"]);
  }
}
