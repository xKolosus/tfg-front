import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPath } from 'src/environments/environment';
import { CategoryVO } from '../interfaces/CategoryVO';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private categService : CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  categories : CategoryVO[];

  getCategories(){
    this.categService.getCategories()
    .subscribe((categories: CategoryVO[]) => {
      this.categories = categories;
    });
  }

}
