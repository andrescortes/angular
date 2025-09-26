import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { LocaleService, Locale } from '@pipes/services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [ LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe ],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent {
  private readonly localeService = inject(LocaleService);
  readonly localId = signal(inject(LOCALE_ID));
  nameLower = signal<string>('Angular');
  nameUpper = signal<string>('ANGULAR');
  fullName = signal<string>('Fernando Herrera');

  customDate = signal<Date>(new Date());

  tickingDateEffect = effect((onCleanUp) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
    }, 1000);
    onCleanUp(() => {
      clearInterval(interval);
    })
  });

  setLocale(locale: Locale) {
    if (locale !== this.localId()) {
      this.localeService.setLocale(locale);
    }
  }
}
