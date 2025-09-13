import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGiphy } from '../interfaces';
import { environment } from '@envs/environment';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private readonly httpClient = inject(HttpClient);

  constructor() {
    this.loadTrendingGifs().subscribe({
      next(value) {
        console.log('res: ', value);

      },
    })
  }

  loadTrendingGifs(): Observable<IGiphy> {
    return this.httpClient.get<IGiphy>(`${environment.GIPHY_URL_BASE}/gifs/trending`, {
      params: {
        api_key: environment.GIPHY_KEY,
        limit: 20,
        offset: 0,
        rating: 'g'
      },
    })
  }
}
