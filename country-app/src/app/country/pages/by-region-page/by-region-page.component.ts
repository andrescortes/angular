import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { CountryListComponent } from '@country/country-list/country-list.component';
import { CountryService } from '@country/country.service';
import { SearchInputComponent } from '@country/search-input/search-input.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [ SearchInputComponent, CountryListComponent ],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {
  private readonly countryService = inject(CountryService);
  query = signal<string>('');

  countryResource = rxResource({
    request: () => ({
      query: this.query()
    }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      return this.countryService.searchByQueryAndPath(request.query, 'region');
    }
  });

}
