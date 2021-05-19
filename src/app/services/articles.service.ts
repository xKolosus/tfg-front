import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/environments/environment';
import { ArticleVO } from '../interfaces/ArticleVO';
import { Article } from '../models/Article';
import { Post } from '../models/Post';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http : HttpClient, private authService : AuthService) { }

  getArticles(){
    return this.http.get<ArticleVO[]>(ApiPath.url + "/articles");
  }

  getArticle(articleId : Number){
    return this.http.get<ArticleVO>(ApiPath.url + "/articles/" + articleId);
  }
  getArticlesByCategory(categoryId : Number){
    return this.http.get<ArticleVO[]>(ApiPath.url + "/articles/byCategory/" + categoryId);
  }

  uploadArticle(article : Article){
    return this.http.post(ApiPath.url + "/articles/add", article , { headers : { 'Authorization' : this.authService.getUserToken()}});
  }

  updateArticle(article : Article){
    return this.http.put(ApiPath.url + "/articles/" + article.articleId, article, { headers : { 'Authorization' : this.authService.getUserToken()}}) ;
  }

  addPostToArticle(post : Post, articleId : Number){
    return this.http.post(ApiPath.url + "/articles/posts/"+articleId, post, { headers : { 'Authorization' : this.authService.getUserToken()}});
  }

  deleteArticle(article : ArticleVO){
    return this.http.delete(ApiPath.url + "/articles/" + article.articleId, { headers : { 'Authorization' : this.authService.getUserToken()}});
  }

}
