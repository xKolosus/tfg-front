import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleInfoComponent } from './article-info/article-info.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path :"articles", component : ArticlesComponent },
  {path : "articles/:articleId", component : ArticleInfoComponent},
  {path : "login", component : LoginComponent},
  {path : "register", component : RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
