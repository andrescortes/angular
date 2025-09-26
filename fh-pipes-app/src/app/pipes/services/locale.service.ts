import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private currentLocale = signal<Locale>('es');

  constructor() {
    this.currentLocale.set((localStorage.getItem('locale') as Locale) || 'es');
  }

  get locale(): Locale {
    return this.currentLocale();
  }

  setLocale(locale: Locale) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    window.location.reload();
  }
}

export type Locale = 'es' | 'fr' | 'en-US';
