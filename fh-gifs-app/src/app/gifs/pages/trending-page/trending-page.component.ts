import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';

// import { GifListComponent } from '@/gifs/components/gif-list/gif-list.component';
import { GifService } from '@/gifs/services/gif.service';
import { ScrollStateService } from '@/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css',
})
export class TrendingPageComponent implements AfterViewInit {
  private readonly gifService = inject(GifService);
  private scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  data = this.gifService.trendingGifs;
  groupGifs = this.gifService.trendingGifsGroup;

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) {
      return;
    }
    setTimeout(() => {
      scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
    }, 200);
  }

  onScroll(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) {
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = scrollDiv;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    const isAtBottom = (scrollTop + clientHeight + 300) >= scrollHeight;
    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
