import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryVO } from '../interfaces/CategoryVO';
import { Article } from '../models/Article';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { ArticlesService } from '../services/articles.service';
import { CategoriesService } from '../services/categories.service';
import { ImgbbService } from '../services/imgbb.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})

export class CreateArticleComponent implements OnInit {

  constructor(private articleService: ArticlesService, private categoryService : CategoriesService,
    private imgbbService : ImgbbService, private notificationService : NotificationService,
    private router : Router) {
  }

  newArticleForm : FormGroup;
  article : Article = new Article();
  imageUrl : String;
  categories : CategoryVO[];

  ngOnInit(): void {
    this.getCategories();
    this.newArticleForm = new FormGroup({
      articleTitle : new FormControl(),
      articleCategory : new FormControl(),
      articleContent : new FormControl()
    })
  }

  getCategories(){
    this.categoryService.getCategories()
      .subscribe((cat : CategoryVO[]) => {
        this.categories = cat;
      });
  }

  async handleUpload(e : Event){
    const input = e.target as HTMLInputElement;
    await this.imgbbService.upload(input.files[0]).subscribe(url => this.imageUrl = url);
  }

  onSubmit(){
    this.article.articleTitle = this.newArticleForm.get("articleTitle").value;
    this.article.articleContent = this.newArticleForm.get("articleContent").value;
    console.log(this.newArticleForm.get("articleCategory").value);
    this.article.category = new Category();
    this.article.category.categoryId = this.newArticleForm.get("articleCategory").value;
    if(this.imageUrl != null){
      this.article.articleImageUrl = this.imageUrl;
    }
    this.article.user = new User();
    this.article.user.userId = JSON.parse(window.sessionStorage.getItem("auth-user")).userId;

    this.articleService.uploadArticle(this.article).subscribe(res => {
      this.notificationService.showSuccess("Se ha creado correctamente tu nuevo artículo, ahora podrás verlo!", "Serás redirigido al inicio");
      setTimeout(() => {
        this.router.navigate(["/"])
      }, 3000);
    },
    err => {
      this.notificationService.showError("Ha ocurrido un error creando tu nuevo artículo", "Ha habido un error en el servidor");
    });

  }

}
