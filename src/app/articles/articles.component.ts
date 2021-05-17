
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as EventEmitter from 'events';
import { ArticleVO } from '../interfaces/ArticleVO';
import { CategoryVO } from '../interfaces/CategoryVO';
import { Category } from '../models/Category';
import { ArticlesService } from '../services/articles.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService : ArticlesService, private categoryService : CategoriesService, private datepipe : DatePipe) { }

  ngOnInit(): void {
    this.getArticles();
    this.getCategories();
  }

  articles : ArticleVO[];
  categories : CategoryVO[];
  state : String = "Todas las categorías";

  getArticles(){
    this.articleService.getArticles()
      .subscribe((articles : ArticleVO[]) => {
        this.articles = articles;
    });
  }

  getCategories(){
    this.categoryService.getCategories()
      .subscribe((categories : CategoryVO[]) => {
        this.categories = categories;
      });
  }

  parsedDate(dateString : String){
    let date = new Date(dateString.replace(' ', 'T'));
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  }

  filterArticles(){
    // hard-coded because it doesn't work
    if(+this.state == 0){
      this.getArticles();
    } else {
      this.articleService.getArticlesByCategory(+this.state)
      .subscribe((articles : ArticleVO[]) => {
        this.articles = articles;
      });
    }

  }

}
