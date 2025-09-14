import { Component, inject } from '@angular/core';

import { GifListComponent } from '@/gifs/components/gif-list/gif-list.component';
import { GifService } from '@/gifs/services/gif.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css',
})
export class TrendingPageComponent {
  gifService = inject(GifService);
  data = this.gifService.trendingGifs;
}
