
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleVO } from '../interfaces/ArticleVO';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService : ArticlesService, private router : ActivatedRoute, private datepipe : DatePipe) { }

  ngOnInit(): void {
    this.getArticles();
  }

  articles : ArticleVO[];

  getArticles(){
    this.articleService.getArticles()
    .subscribe((articles : ArticleVO[]) => {
      this.articles = articles;
    })
  }

  parsedDate(dateString : String){
    let date = new Date(dateString.replace(' ', 'T'));
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  }

}
