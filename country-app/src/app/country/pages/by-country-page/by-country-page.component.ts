import { Component } from '@angular/core';

import { CountryListComponent } from '@country/country-list/country-list.component';
import { SearchInputComponent } from '@country/search-input/search-input.component';

@Component({
  selector: 'app-by-country-page',
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  onChange(value: string) {
    console.log('value :>> ', value);
  }

}
