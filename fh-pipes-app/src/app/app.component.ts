import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeComponent } from "./shared/components/theme/theme.component";

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, ThemeComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fh-pipes-app';
}
