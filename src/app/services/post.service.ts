import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/environments/environment';
import { PostVO } from '../interfaces/PostVO';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http : HttpClient) { }

  addLikeToPost(post : PostVO){
    return this.http.post(ApiPath.url + "/posts/" + post.postId + "/like", null);
  }

  addDislikeToPost(post : PostVO){
    return this.http.post(ApiPath.url + "/posts/" + post.postId + "/dislike", null);
  }
}