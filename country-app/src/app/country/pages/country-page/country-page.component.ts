import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, of } from 'rxjs';

import { CountryService } from '@country/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [ NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent {
  private readonly countryService = inject(CountryService);

  param = toSignal(inject(ActivatedRoute)
    .params
    .pipe(map(param => param[ 'country' ]),)
  );

  countryResource = rxResource({
    request: () => ({ param: this.param() }),
    loader: ({ request }) => {
      if (!request) return of([]);
      return this.countryService.byCca2(request.param);
    }
  });
}
