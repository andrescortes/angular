import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar-front',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar-front.html',
  styleUrl: './navbar-front.css',
})
export class NavbarFront {}
