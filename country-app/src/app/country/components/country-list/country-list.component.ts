import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ICountry } from '@country/country.interface';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {
  countries = input.required<ICountry[]>();

}
