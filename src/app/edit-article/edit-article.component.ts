import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleVO } from '../interfaces/ArticleVO';
import { CategoryVO } from '../interfaces/CategoryVO';
import { Article } from '../models/Article';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { ArticlesService } from '../services/articles.service';
import { CategoriesService } from '../services/categories.service';
import { ImgbbService } from '../services/imgbb.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  constructor(private articleService: ArticlesService, private categoryService : CategoriesService,
    private imgbbService : ImgbbService, private notificationService : NotificationService,
    private router : Router, private route : ActivatedRoute) { }


  newArticleForm : FormGroup;
  article : ArticleVO;
  imageUrl : String;
  categories : CategoryVO[];

  ngOnInit(): void {
    const articleId = this.route.snapshot.params.articleId;
    this.getArticle(articleId);
    this.getCategories();
    this.newArticleForm = new FormGroup({
      articleTitle : new FormControl('', Validators.required),
      articleCategory : new FormControl('', Validators.required),
      articleContent : new FormControl('', Validators.required)
    });

  }

  getArticle(articleId : Number){
    this.articleService.getArticle(articleId)
    .subscribe((art) => {
      this.article = art;
      this.newArticleForm.patchValue({
        articleTitle :  this.article.articleTitle,
        articleCategory : this.article.category.categoryId,
        articleContent : this.article.articleContent});
    });


  }

  getCategories(){
    this.categoryService.getCategories()
      .subscribe((cat : CategoryVO[]) => {
        this.categories = cat;
      });
  }

  handleUpload(e : Event){
    const input = e.target as HTMLInputElement;
    this.imgbbService.upload(input.files[0]).subscribe(url => this.imageUrl = url);
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

    this.articleService.updateArticle(this.article).subscribe(res => {
      this.notificationService.showSuccess("Se ha actualizado correctamente tu artículo!", "Serás redirigido al inicio");
      setTimeout(() => {
        this.router.navigate(["/"])
      }, 3000);
    },
    err => {
      this.notificationService.showError("Ha ocurrido un error creando tu nuevo artículo", "Ha habido un error en el servidor");
    });

  }
}
