import { GifService } from '@/gifs/services/gif.service';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  imports: [
    GifListComponent
  ],
  templateUrl: './gif-history.component.html',
  styleUrl: './gif-history.component.css'
})
export class GifHistoryComponent {
  private readonly gitService = inject(GifService);
  query = toSignal<string>(inject(ActivatedRoute)
    .params
    .pipe(map(param => param['query']))
  );
  gifsByKey = computed(() => this.gitService.getHistoryGifs(this.query() ?? ''));
}
