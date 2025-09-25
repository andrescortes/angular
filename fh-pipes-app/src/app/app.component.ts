import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeComponent } from "./shared/components/theme/theme.component";
import { NavbarComponent } from "./pipes/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fh-pipes-app';
}
