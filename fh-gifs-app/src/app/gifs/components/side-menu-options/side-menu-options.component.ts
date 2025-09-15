import { IMenuOption } from '@/gifs/interfaces';
import { GifService } from '@/gifs/services/gif.service';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu-options',
  imports: [RouterLink, NgClass, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  styleUrl: './side-menu-options.component.css',
})
export class SideMenuOptionsComponent {
  private readonly gifService = inject(GifService);
  historyKeys = this.gifService.searchHistoryKeys;
  menuOptions: IMenuOption[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs trending',
      path: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line',
    },
    {
      label: 'Search',
      subLabel: 'Search gifs',
      path: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass',
    },
  ];
}
