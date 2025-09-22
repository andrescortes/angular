import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICountryDto } from '@country/country-res.interface';
import { ICountry } from '@country/country.interface';
import { CountryMapper } from '@country/mappers/country.mapper';
import { environment } from '@envs/environment';

import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly httpClient = inject(HttpClient);
  // searchTerm = signal<string>('');

  // countriesByAll = toSignal(
  //   this.httpClient.get<ICountryDto[]>(`${environment.COUNTRY_URL}/all`, {
  //     params: {
  //       fields: 'name,flags,capital,population,translations,region,subregion,coatOfArms'
  //     }
  //   })
  //     .pipe(map((dtos) => CountryMapper.toEntities(dtos))),
  //   { initialValue: [] }
  // );

  // filteredCountries = computed(() => {
  //   const countriesSet = [ ...new Set(this.countriesByAll()) ];
  //   const term = this.searchTerm().toLowerCase();
  //   return [ ...countriesSet ].filter((country) => country.capital?.toLowerCase()?.includes(term));
  // });

  searchByQueryAndPath(query: string, path: string = 'capital'): Observable<ICountry[]> {
    return this.httpClient.get<ICountryDto[]>(`${environment.COUNTRY_URL}/${path}/${query}`)
      .pipe(
        map((dtos) => CountryMapper.toEntities(dtos)),
        catchError((err: HttpErrorResponse) => this.handleError(err, path))
      );
  }

  byCca2(param: string): Observable<ICountry[]> {
    return this.httpClient.get<ICountryDto[]>(`${environment.COUNTRY_URL}/alpha`, {
      params: {
        codes: param,
      }
    })
      .pipe(
        map((dtos) => CountryMapper.toEntities(dtos)),
      )
  }

  private handleError(error: HttpErrorResponse, type: string): Observable<never> {
    console.error('error :>> ', error);
    if (error.status === 404) {
      return throwError(() => new Error(`${type} not found`));
    } else if (error.status >= 500) {
      return throwError(() => new Error(`Server error`));
    } else {
      return throwError(() => new Error(`Unknown error`));
    }
  }
}
