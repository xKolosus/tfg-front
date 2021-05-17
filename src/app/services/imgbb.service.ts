import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {
  private readonly apiKey : string = 'd3ef7d9c1873dfd19ef709b6d7867e81';
  constructor(private readonly httpClient : HttpClient) { }

  upload(file : File){
    const formData = new FormData();

    formData.append('image',file);

    return this.httpClient
    .post('https://api.imgbb.com/1/upload', formData, { params : { key: this.apiKey } })
    .pipe(map((response) => response['data']['url']));
  }
}

