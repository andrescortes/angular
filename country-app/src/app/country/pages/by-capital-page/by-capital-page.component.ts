import { Component, inject, signal } from '@angular/core';
import { ICountry } from '@country/country.interface';

import { CountryListComponent } from '@country/country-list/country-list.component';
import { CountryService } from '@country/country.service';
import { SearchInputComponent } from '@country/search-input/search-input.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {
  private readonly countryService = inject(CountryService);
  isError = signal<string | null>(null);
  countries = signal<ICountry[]>([]);

  onChange(value: string): void {
    this.isError.set(null);
    this.countryService.searchTerm.set(value);
    const countries = this.countryService.filteredCountries();
    if (countries.length === 0) {
      this.isError.set('No countries found');
    } else {
      this.countries.set(countries);
    }
  }
}
