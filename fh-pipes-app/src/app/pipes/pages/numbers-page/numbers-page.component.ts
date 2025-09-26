import { CurrencyPipe, DecimalPipe, LowerCasePipe, PercentPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [ DecimalPipe, PercentPipe, CurrencyPipe ],
  templateUrl: './numbers-page.component.html',
  styleUrl: './numbers-page.component.css'
})
export class NumbersPageComponent {
  totalSells = signal<number>(2_433_232.5567);
  percent = signal<number>(0.4859);
}
