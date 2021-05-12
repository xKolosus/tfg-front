import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPath } from 'src/environments/environment';
import { CategoryVO } from '../interfaces/CategoryVO';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }

  getCategories(){
    return this.http.get<CategoryVO[]>(ApiPath.url + "/categories");
  }
}
