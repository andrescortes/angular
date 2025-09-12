import { Component } from '@angular/core';
import { SideMenuHeaderComponent } from '@/gifs/components/side-menu-header/side-menu-header.component';
import { SideMenuOptionsComponent } from '@/gifs/components/side-menu-options/side-menu-options.component';

@Component({
  selector: 'app-side-menu',
  imports: [
    SideMenuHeaderComponent,
    SideMenuOptionsComponent
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

}
