import { Component, computed, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-page',
  templateUrl: './dragonball-page.component.html',
  imports: [
    TitleCasePipe
  ],
  styleUrl: './dragonball-page.component.css'
})
export class DragonballPageComponent {
  characters = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      power: 9001
    },
    {
      id: 2,
      name: 'Vegeta',
      power: 8000
    },
    {
      id: 3,
      name: 'Cell',
      power: 3000
    }, {
      id: 4,
      name: 'Yamcha',
      power: 500
    },
  ]);

  name = signal<string>('gohan');
  power = signal<number>(100);
  isRepeat = false;

  // powerClasses = computed(() => {
  //   return {
  //     'text-danger': true,
  //   };
  // })
  addCharacter(): void {
    if (this.characters().some(ch => ch.name === this.name())) {
      this.isRepeat = true;
    } else {
      this.isRepeat = false;
      this.characters.update(charts => {
        const newCharacter: Character = {
          id: charts.length + 1,
          name: this.name(),
          power: this.power(),
        }
        return [...charts, newCharacter];
      });
      this.resetFields();
    }
  }

  resetFields(): void {
    this.name.set('Gohan');
    this.power.set(100);
  }

}
