import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment';
import { map, Observable, tap } from 'rxjs';
import { IGif, IGiphy } from '../interfaces';
import { GifMap } from '../mapper';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private readonly httpClient = inject(HttpClient);
  trendingGifs = signal<IGif[]>([]);
  searchHistory = signal<Record<string, IGif[]>>(this.loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs().subscribe({
      next: (giphy) => this.trendingGifs.set(GifMap.toDtos(giphy.data))
    });
  }

  loadTrendingGifs(): Observable<IGiphy> {
    return this.httpClient.get<IGiphy>(`${environment.GIPHY_URL_BASE}/gifs/trending`, {
      params: {
        api_key: environment.GIPHY_KEY,
        limit: 20,
      },
    });
  }

  searchGifs(query: string): Observable<IGif[]> {
    return this.httpClient
      .get<IGiphy>(`${environment.GIPHY_URL_BASE}/gifs/search`, {
        params: {
          api_key: environment.GIPHY_KEY,
          q: query,
          limit: 20,
        },
      })
      .pipe(
        map((giphy) => GifMap.toDtos(giphy.data)),
        tap(items => {
          this.searchHistory.update(currentValue => ({
            ...currentValue,
            [query.toLocaleLowerCase()]: items
          }));
        })
      );
  }

  loadToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  })

  loadFromLocalStorage(): Record<string, IGif[]> {
    const gifs = localStorage.getItem(GIF_KEY) ?? '{}';
    return JSON.parse(gifs);
  }

  getHistoryGifs(query: string): IGif[] {
    return this.searchHistory()[query] ?? [];
  }
}

export const GIF_KEY = 'gifs';
