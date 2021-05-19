import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPath } from 'src/environments/environment';
import { UserVO } from '../interfaces/UserVO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {



  constructor(private http : HttpClient, private authService : AuthService) { }

  getUserByEmail(email : String){
    return this.http.get<UserVO>(ApiPath.url + "/users/byEmail?email=" + email );
  }

  getUserById(id : Number){
    return this.http.get<UserVO>(ApiPath.url + "/users/" + id);
  }

  updateUser(userId: Number, user : UserVO){
    return this.http.put<UserVO>(ApiPath.url + "/users/" + userId, user, { headers : { 'Authorization' : this.authService.getUserToken()}});
  }

  deleteUser(userId : Number){
    return this.http.delete<UserVO>(ApiPath.url + "/users/" + userId, { headers : { 'Authorization' : this.authService.getUserToken()}});
  }

  countPostsByUserId(userId : Number){
    return this.http.get<Number>(ApiPath.url + "/users/posts/count/" + userId);
  }
}
