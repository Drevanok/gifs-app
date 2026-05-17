import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { GiphyResponse } from '../interfaces/giphy-data.interface';

@Injectable({
  providedIn: 'root',
})

export class GifService {

  private http = inject(HttpClient);

  

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.gihpyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    });
  }
}
