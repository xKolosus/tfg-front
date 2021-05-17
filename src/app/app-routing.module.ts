import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleInfoComponent } from './article-info/article-info.component';
import { ArticlesComponent } from './articles/articles.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path :"articles", component : ArticlesComponent },
  {path : "articles/:articleId", component : ArticleInfoComponent},
  {path : "create-article", component : CreateArticleComponent, canActivate : [AuthGuard]},
  {path : "edit-article/:articleId", component: EditArticleComponent, canActivate : [AuthGuard]},
  {path : "login", component : LoginComponent},
  {path : "register", component : RegisterComponent},
  {path : "profile", component: ProfileInfoComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
