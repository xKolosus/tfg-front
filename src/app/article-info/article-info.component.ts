import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleVO } from '../interfaces/ArticleVO';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.scss']
})
export class ArticleInfoComponent implements OnInit {

  constructor(private router : ActivatedRoute, private articleService : ArticlesService, private datepipe: DatePipe) { }

  article : ArticleVO;

  ngOnInit(): void {
    const articleId = +this.router.snapshot.paramMap.get('articleId');
    this.loadArticle(articleId);
  }

  loadArticle(articleId : Number) {
    this.articleService.getArticle(articleId).subscribe((art) =>{
      this.article = art;
    })
  }

  parseTime(dateString : String){
    let date = new Date(dateString.replace(' ', 'T'));
    return this.datepipe.transform(date, 'dd/MM/yyyy - hh:mm');
  }

}
