import { GifListComponent } from '@/gifs/components/gif-list/gif-list.component';
import { IGif } from '@/gifs/interfaces';
import { GifService } from '@/gifs/services/gif.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent {
  private readonly gifService = inject(GifService);
  gifs: IGif[] = [];

  onSearch(value: string) {
    if (value.length > 0 && value.length < 50) {
      this.gifService.searchGifs(value).subscribe({
        next: (response: IGif[]) => {
          this.gifs = response;
        },
      });
    }
  }
}
