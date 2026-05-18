import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs';
import { ScrollStateService } from '../../../shared/services/scroll-state';


@Component({
  selector: 'app-trending-page',
  //imports: [GifListComponent],
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }
}
