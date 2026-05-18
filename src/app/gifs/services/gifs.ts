import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { environment } from '@environments/environment.development';
import { GiphyResponse } from '../interfaces/giphy-data.interface';

import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';
import GifHistory from '../pages/gif-history/gif-history';


@Injectable({
  providedIn: 'root',
})

export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);

  trendingGifsLoading = signal(true);
  searchGidsLoading = signal(true);

  searchHistory = signal<Record<string, Gif[]>>(
    JSON.parse(localStorage.getItem('gifs') ?? '{}')
  );

  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));


  constructor() {
    this.loadTrendingGifs();
  }

  //gifs = signal<Gif[]>(loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  })

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    })
  }

  loadSearchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap(items => {
        this.searchHistory.update(history => ({
          ...history, [query.toLowerCase()]: items,
        })),
          console.log(this.searchHistoryKeys())
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {

    return this.searchHistory()[query] ?? [];
  }
}
