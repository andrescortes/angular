import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICountry } from '@country/country.interface';

@Component({
  selector: 'app-country-list',
  imports: [ DecimalPipe, RouterLink ],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {
  countries = input.required<ICountry[]>();

}
