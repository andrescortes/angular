import { Component } from '@angular/core';
import { reactiveRoutes } from '../../forms/reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

const reactiveRoute = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
  reactiveMenu: MenuItem[] = reactiveRoute
    .filter((route) => route.path !== '**')
    .map((route) => ({
      page: 'Reactive',
      title: `${route.title}`,
      route: `reactive/${route.path}`,
    }));

  authMenu: MenuItem[] = [
    {
      title: 'Register',
      route: './auth',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Countries',
      route: './country',
    },
  ];
}
