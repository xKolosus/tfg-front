import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { CategoryVO } from '../interfaces/CategoryVO';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private categService : CategoriesService, private router : Router) { }

  ngOnInit(): void {
  }

  isAuth : boolean = false;
  jsonUser : any;
  imageUrl : String;



  isAuthenticated(){
    if(window.sessionStorage.getItem("auth-user") != null){
      this.isAuth = true;
      this.jsonUser = JSON.parse(window.sessionStorage.getItem("auth-user"));
      this.imageUrl = this.jsonUser.profilePicUrl;
    } else {
      this.isAuth = false;
    }

    return this.isAuth;
  }

  refreshArticles(categoryId : Number){
    this.router.navigate(["/articles/category/" + categoryId]);
  }


  logout(){
    window.sessionStorage.removeItem("auth-user");
    this.router.navigate(["/"]);
  }

}
