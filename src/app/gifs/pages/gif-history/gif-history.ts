import { Component, computed, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifService } from '../../services/gifs';
import { GifListComponent } from "../../components/gif-list/gif-list";

@Component({
  selector: 'app-gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.html',
})
export default class GifHistory {

  gifService = inject(GifService)
  query = toSignal(
    inject(ActivatedRoute).params.pipe(map(params => params['query']))
  );

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}


