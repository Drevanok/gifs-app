import { Component, inject, signal } from '@angular/core';
import { MenuOption } from '../../../interfaces/menu-options.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../../services/gifs';
import { Gif } from '../../../interfaces/gif.interface';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
})
export class SideMenuOptions {
  gif = inject(GifService);
  historySearch = this.gif.searchHistoryKeys;

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search'
    }
  ]
}
