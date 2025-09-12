import { Component } from '@angular/core';
import { IMenuOption } from '@/gifs/interfaces';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-menu-options',
  imports: [
    RouterLink,
    NgClass,
    RouterLinkActive
  ],
  templateUrl: './side-menu-options.component.html',
  styleUrl: './side-menu-options.component.css'
})
export class SideMenuOptionsComponent {
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
  ]
}
