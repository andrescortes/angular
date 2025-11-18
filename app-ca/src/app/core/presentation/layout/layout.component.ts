import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { SidenavComponent } from '../components/sidenav/sidenav.component';


@Component({
  selector: 'app-user-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: [ './layout.component.css' ]
})
export class LayoutComponent {

}
