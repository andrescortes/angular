import { Component, computed, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ICharacter } from '@/models';

@Component({
  selector: 'app-dragonball-page',
  templateUrl: './dragonball-page.component.html',
  imports: [
    TitleCasePipe
  ],
  styleUrl: './dragonball-page.component.css'
})
export class DragonballPageComponent {
  characters = signal<ICharacter[]>([
    {
      id: 1,
      name: 'Goku',
      power: 9001
    }
  ]);

  name = signal<string>('');
  power = signal<number>(0);
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
        const newCharacter: ICharacter = {
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
