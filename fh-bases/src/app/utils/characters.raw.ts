import { ICharacter } from '@/models';
import { StorageService } from '@/services/storage.service';
import { inject } from '@angular/core';
import { CHARACTERS_KEY } from './cons';

export const LOAD_FROM_STORAGE_CHARACTERS = (): ICharacter[] => {
  const storageService = inject(StorageService);
  const characters = storageService.get<ICharacter[]>(CHARACTERS_KEY);
  return characters
    ? characters
    : [
        { id: 1, name: 'Goku', power: 9001 },
        { id: 2, name: 'Vegeta', power: 8000 },
      ];
};
