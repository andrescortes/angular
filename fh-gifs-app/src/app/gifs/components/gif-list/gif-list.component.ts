import { Component, input } from '@angular/core';

import { GifListItemComponent } from '@/gifs/components/gif-list-item/gif-list-item.component';
import { IGif } from '@/gifs/interfaces';

@Component({
  selector: 'app-gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.css',
})
export class GifListComponent {
  gifs = input.required<IGif[]>();
}
