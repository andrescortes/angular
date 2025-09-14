import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';
import { IGif, IGiphy } from '../interfaces';
import { GifMap } from '../mapper';

@Injectable({
  providedIn: 'root'
})
export class GifService {
  private readonly httpClient = inject(HttpClient);
  trendingGifs = signal<IGif[]>([]);

  constructor() {
    this.loadTrendingGifs().subscribe({
      next: (giphy) => {
        const gifs = GifMap.toDtos(giphy.data);
        this.trendingGifs.set(gifs);
      },
    });
  }

  loadTrendingGifs(): Observable<IGiphy> {
    return this.httpClient.get<IGiphy>(`${environment.GIPHY_URL_BASE}/gifs/trending`, {
      params: {
        api_key: environment.GIPHY_KEY,
        limit: 20,
        offset: 0,
        rating: 'g'
      },
    });
  }
}
