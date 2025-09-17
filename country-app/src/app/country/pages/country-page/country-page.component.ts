import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { CountryListComponent } from '@country/country-list/country-list.component';

@Component({
  selector: 'app-country-page',
  imports: [CountryListComponent],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent {
  country = toSignal(inject(ActivatedRoute)
    .params
    .pipe(
      map(param => param['country'])
    )
  );
}
