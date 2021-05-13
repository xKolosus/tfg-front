import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/environments/environment';
import { ArticleVO } from '../interfaces/ArticleVO';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http : HttpClient) { }

  getArticles(){
    return this.http.get<ArticleVO[]>(ApiPath.url + "/articles");
  }

  getArticle(articleId : Number){
    return this.http.get<ArticleVO>(ApiPath.url + "/articles/" + articleId);
  }
}
