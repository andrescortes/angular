import { Component, computed, input, output, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ICharacter } from '@/models';

@Component({
  selector: 'app-character-add',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './character-add.component.html',
  styleUrl: './character-add.component.css'
})
export class CharacterAddComponent {
  name = signal<string>('');
  power = signal<number>(1000);
  isValid = input<boolean>();
  newCharacter = output<ICharacter>();

  addCharacter(): void {
    if (this.checkFields()) {
      const character: ICharacter = {
        id: 0,
        name: this.name(),
        power: this.power(),
      }
      this.newCharacter.emit(character);
      this.resetFields();
    }
  }

  resetFields(): void {
    this.name.set('');
    this.power.set(1000);
  }

  checkFields(): boolean {
    return this.name().trim() != '' && this.power() >= 0;
  }
}
