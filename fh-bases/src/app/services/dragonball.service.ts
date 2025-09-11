import { effect, Injectable, OnDestroy, signal } from '@angular/core';
import { ICharacter } from '@/models';

const loadFromLocalStorage = (): ICharacter[] | undefined => {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : undefined;
}

@Injectable({
  providedIn: 'root'
})
export class DragonballService {
  isRepeat = signal(false);
  characters = signal<ICharacter[]>(loadFromLocalStorage() ?? [
    {id: 1, name: 'Goku', power: 9001},
    {id: 2, name: 'Vegeta', power: 8000}
  ]);

  constructor() {
    effect(() => {
      localStorage.setItem('characters', JSON.stringify(this.characters()));
    });
  }

  addCharacter(character: ICharacter): void {
    if (this.characters().some(char => char.name.toLowerCase() === character.name.toLowerCase())) {
      this.isRepeat.set(true)
    } else {
      this.isRepeat.set(false);
      this.characters.update(chars => {
        character.id = chars.length + 1;
        return [...chars, character];
      });
    }
  }
}
