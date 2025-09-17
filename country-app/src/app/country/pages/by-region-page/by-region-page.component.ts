import { Component } from '@angular/core';

import { CountryListComponent } from '@country/country-list/country-list.component';
import { SearchInputComponent } from '@country/search-input/search-input.component';

@Component({
  selector: 'app-by-region-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  onChange(value: string) {
    console.log('value :>> ', value);
  }

}
