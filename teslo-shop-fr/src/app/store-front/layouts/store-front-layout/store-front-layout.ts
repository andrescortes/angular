import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarFront } from "../../components/navbar-front/navbar-front";

@Component({
  selector: 'app-store-front-layout',
  imports: [
    NavbarFront,
    RouterOutlet,
  ],
  templateUrl: './store-front-layout.html',
  styleUrl: './store-front-layout.css',
})
export class StoreFrontLayout { }
