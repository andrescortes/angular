import { DecimalPipe, Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ICountry } from '@country/country.interface';

@Component({
  selector: 'app-country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
  styleUrl: './country-information.component.css'
})
export class CountryInformationComponent {
  country = input.required<ICountry>();
  location = inject(Location);

  getTranslation(): string[] {
    return Object.entries(this.country().translations).map(([key, value]) => `${key}: ${value.official}`).slice(0,5);
  }

  goBack(): void {
    this.location.back();
  }
}
