import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '@app/app.routes';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  routes = routes.map(({ path, title }) => ({ path, title }));
}
