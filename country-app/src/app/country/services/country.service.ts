import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICountryDto } from '@country/country-res.interface';
import { ICountry } from '@country/country.interface';
import { CountryMapper } from '@country/mappers/country.mapper';
import { environment } from '@envs/environment';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly httpClient = inject(HttpClient);
  searchTerm = signal<string>('');

  countriesByAll = toSignal(
    this.httpClient.get<ICountryDto[]>(`${environment.COUNTRY_URL}/all`, {
      params: {
        fields: 'name,flags,capital,population,translations,region,subregion,coatOfArms'
      }
    })
      .pipe(map((dtos) => CountryMapper.toEntities(dtos))),
    { initialValue: [] }
  );

  filteredCountries = computed(() => {
    const countriesSet = new Set(this.countriesByAll());
    const term = this.searchTerm().toLowerCase();
    return [...countriesSet].filter((country) => country.capital?.toLowerCase()?.includes(term));
  });

  searchByCapital(query: string): Observable<ICountry[]> {
    const queryLowercase = query.toLowerCase();
    return this.httpClient.get<ICountryDto[]>(`${environment.COUNTRY_URL}/capital/${queryLowercase}`)
      .pipe(
        map((dtos) => CountryMapper.toEntities(dtos))
      );
  }
}
