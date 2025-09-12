import { effect, inject, Injectable, signal } from '@angular/core';
import { ICharacter } from '@/models';
import { CHARACTERS_KEY, LOAD_FROM_STORAGE_CHARACTERS } from '@/utils';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class DragonballService {
  private readonly storageService = inject(StorageService);
  isRepeat = signal(false);
  characters = signal<ICharacter[]>(LOAD_FROM_STORAGE_CHARACTERS());

  constructor() {
    effect(() => {
      this.storageService.set<ICharacter[]>(CHARACTERS_KEY, this.characters());
    });
  }

  addCharacter(character: ICharacter): void {
    if (
      this.characters().some(
        (char) => char.name.toLowerCase() === character.name.toLowerCase()
      )
    ) {
      this.isRepeat.set(true);
    } else {
      this.isRepeat.set(false);
      this.characters.update((chars) => {
        character.id = chars.length + 1;
        return [...chars, character];
      });
    }
  }
}
