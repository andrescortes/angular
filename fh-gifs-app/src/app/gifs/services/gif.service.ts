import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment';
import { finalize, map, Observable, tap } from 'rxjs';
import { IGif, IGiphy } from '../interfaces';
import { GifMap } from '../mapper';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private readonly httpClient = inject(HttpClient);

  trendingGifs = signal<IGif[]>([]);
  isLoading = signal<boolean>(false);
  trendingPage = signal<number>(0);
  trendingGifsGroup = computed<IGif[][]>(() => {
    const group: IGif[][] = [];
    for (let index = 0; index < this.trendingGifs().length; index += 3) {
      group.push(this.trendingGifs().slice(index, index + 3));
    }
    return group;
  });

  searchHistory = signal<Record<string, IGif[]>>(this.loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(limit: number = 20): void {
    if (!this.isLoading()) {
      this.isLoading.set(true);
      this.httpClient.get<IGiphy>(`${environment.GIPHY_URL_BASE}/gifs/trending`, {
        params: {
          api_key: environment.GIPHY_KEY,
          limit,
          offset: this.trendingPage() * limit
        },
      })
        .pipe(finalize(() => {
          this.isLoading.set(false);
        }))
        .subscribe({
          next: (giphy) => this.trendingGifs.update(gifsCurrent => {
            this.trendingPage.update(page => page + 1);
            return [
              ...gifsCurrent,
              ...GifMap.toDtos(giphy.data)
            ]
          })
        });
    }
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

  clearLocalStorage(): void {
    localStorage.removeItem(GIF_KEY);
    this.searchHistory.set({});
  }
}

export const GIF_KEY = 'gifs';
