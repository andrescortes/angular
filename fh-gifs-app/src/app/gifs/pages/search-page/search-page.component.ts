import { GifListComponent } from '@/gifs/components/gif-list/gif-list.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

}
