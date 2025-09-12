import { Component, input } from '@angular/core';
import { GifListItemComponent } from '@/gifs/components/gif-list-item/gif-list-item.component';

@Component({
  selector: 'app-gif-list',
  imports: [
    GifListItemComponent
  ],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.css'
})
export class GifListComponent {
  imageUrls = input.required<string[]>();
}
