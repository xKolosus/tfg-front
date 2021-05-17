import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleVO } from '../interfaces/ArticleVO';
import { PostVO } from '../interfaces/PostVO';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { ArticlesService } from '../services/articles.service';
import { NotificationService } from '../services/notification.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.scss']
})
export class ArticleInfoComponent implements OnInit {

  constructor(private route : ActivatedRoute, private articleService : ArticlesService,
  private datepipe: DatePipe, private postService : PostService, private notificationService: NotificationService,
  private router : Router) { }


  validatingForm: FormGroup;
  article : ArticleVO;
  articleId = +this.route.snapshot.paramMap.get('articleId');
  post : Post = new Post();


  ngOnInit(): void {

    this.loadArticle(this.articleId);
    this.validatingForm = new FormGroup({
      contactFormModalSubject: new FormControl('', Validators.required),
      contactFormModalMessage: new FormControl('', Validators.required)
    });
  }

  get contactFormModalSubject() {
    return this.validatingForm.get('contactFormModalSubject');
  }

  get contactFormModalMessage() {
    return this.validatingForm.get('contactFormModalMessage');
  }

  async loadArticle(articleId : Number) {
    this.articleService.getArticle(articleId).subscribe((art) => {
        this.article = art;

    })
  }

  isAuthenticated() : boolean{
    if(window.sessionStorage.getItem("auth-user") != null){
      return true;
    } else {
      return false;
    }
  }

  parseTime(dateString : String){
    let date = new Date(dateString.replace(' ', 'T'));
    return this.datepipe.transform(date, 'dd/MM/yyyy - hh:mm');
  }

  isHisArticle(){
    if(window.sessionStorage.getItem("auth-user") != null){
      if(this.article.user.userId == JSON.parse(window.sessionStorage.getItem("auth-user")).userId){
        return true;
      }
    }

  }

  addLikeToPost(post : PostVO){
    this.postService.addLikeToPost(post).subscribe(res => {
      this.loadArticle(this.articleId);
    }, err => {
      console.log("Error en el servidor.")
    });

  }

  addDislikeToPost(post: PostVO){
    this.postService.addDislikeToPost(post).subscribe(res => {
      this.loadArticle(this.articleId);
    }, err => {
      console.log("Error en el servidor.")
    });
  }

  onSubmit(){
    this.post.article = this.article;
    this.post.postTitle = this.contactFormModalSubject.value;
    this.post.postContent = this.contactFormModalMessage.value;
    this.post.postLikes = 0;
    this.post.postDislikes = 0;
    this.post.user = new User();
    this.post.user.userId = JSON.parse(window.sessionStorage.getItem("auth-user")).userId;

    this.articleService.addPostToArticle(this.post, this.article.articleId).subscribe(res => {
      this.notificationService.showSuccess("Se ha creado correctamente el comentario o post, esperé unos segundos y lo verá","Post creado correctamente.");
      setTimeout(() => {
        this.ngOnInit();
      }, 1500);
    }, err => {
      this.notificationService.showError("No se ha creado el comentario o post, hubo un problema en el servidor.","Error en el servidor!");

    });
  }

  isHisPost(post : PostVO){
    if(window.sessionStorage.getItem("auth-user") != null){
      if(post.user.userId == JSON.parse(window.sessionStorage.getItem("auth-user")).userId){
        return true;
      } else {
        return false;
      }
    }

  }

}
