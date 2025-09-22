import { Component, inject, resource, signal } from '@angular/core';

import { CountryListComponent } from '@country/country-list/country-list.component';
import { CountryService } from '@country/country.service';
import { SearchInputComponent } from '@country/search-input/search-input.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [ CountryListComponent, SearchInputComponent ],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {
  private readonly countryService = inject(CountryService);

  query = signal<string>('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) {
        return [];
      }
      return await firstValueFrom(this.countryService.searchByQueryAndPath(request.query,'name'))
    }
  });
}
