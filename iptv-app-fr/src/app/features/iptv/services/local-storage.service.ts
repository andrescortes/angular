import { Injectable } from '@angular/core';
import { IChannelGroup } from '@core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setChannelGroups(groups: IChannelGroup[]): void {
    const groupJson = JSON.stringify(groups);
    localStorage.setItem(GROUP_STORAGE_KEY, groupJson);
  }

  getChannelGroups(): IChannelGroup[] {
    return getFromLocalStorage(GROUP_STORAGE_KEY, []);
  }
}

export const GROUP_STORAGE_KEY = 'groups';

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : defaultValue;
  } catch {
    return defaultValue;
  }
}
