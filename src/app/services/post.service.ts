import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/environments/environment';
import { PostVO } from '../interfaces/PostVO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http : HttpClient, private authService : AuthService) { }

  addLikeToPost(post : PostVO){
    return this.http.post(ApiPath.url + "/posts/" + post.postId + "/like", null);
  }

  addDislikeToPost(post : PostVO){
    return this.http.post(ApiPath.url + "/posts/" + post.postId + "/dislike", null);
  }

  deletePost(post : PostVO){
    return this.http.delete(ApiPath.url + "/posts/" + post.postId, { headers : { 'Authorization' : this.authService.getUserToken()}});
  }
}
