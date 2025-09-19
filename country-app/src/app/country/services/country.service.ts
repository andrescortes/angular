import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

  searchByCapital(query: string): Observable<ICountry[]> {
    const queryLowercase = query.toLowerCase();
    return this.httpClient.get<ICountryDto[]>(`${environment.COUNTRY_URL}/capital/${queryLowercase}`)
      .pipe(
        map((dtos) => CountryMapper.toEntities(dtos))
      );
  }
}
