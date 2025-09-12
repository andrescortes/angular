import { BROWSER_STORAGE } from '@/tokens';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage = inject(BROWSER_STORAGE);
  constructor() {}

  get<T>(key: string, defaultValue: T | null = null): T | null {
    const data = this.storage.getItem(key);
    if (!data) {
      return defaultValue;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Something went wrong: ', e);
      return defaultValue;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      const json = JSON.stringify(value);
      this.storage.setItem(key, json);
    } catch (error) {
      console.error('Something went wrong: ', error);
    }
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
