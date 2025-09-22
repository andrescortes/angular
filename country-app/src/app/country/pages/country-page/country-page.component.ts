import { Component, inject, resource } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';

import { CountryListComponent } from '@country/country-list/country-list.component';
import { CountryService } from '@country/country.service';

@Component({
  selector: 'app-country-page',
  imports: [ CountryListComponent ],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent {
  private readonly countryService = inject(CountryService);

  param = toSignal(inject(ActivatedRoute)
    .params
    .pipe(
      tap(value => { console.log('value :>> ', value); }),
      map(param => param[ 'country' ]),
    )
  );

  countriesResource = resource({
    request: () => ({ param: this.param() }),
    loader: async ({ request }) => {
      if (!request) return [];
      return await firstValueFrom(this.countryService.byCca2(request.param));
    }
  });
}
