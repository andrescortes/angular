import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICountry } from '../interfaces';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = 'https://restcountries.com/v3.1';
  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<ICountry[]> {
    return this.httpClient
      .get<ICountry[]>(
        `${this.baseUrl}/region/${region}?fields=name,cca3,borders`
      )
      .pipe(map((countries) => (countries.length !== 0 ? countries : [])));
  }

  getCountryByCode(code: string): Observable<ICountry | null> {
    return this.httpClient
      .get<ICountry>(`${this.baseUrl}/alpha/${code}?fields=name,cca3,borders`)
      .pipe(map((countries) => (countries ? countries : null)));
  }

  filterByCode(codes: string[]): Observable<ICountry[]> {
    return this.httpClient
      .get<ICountry[]>(
        `${this.baseUrl}/alpha?codes=${codes}&fields=name,cca3,borders`
      )
      .pipe(map((countries) => (countries.length !== 0 ? countries : [])));
  }
}
