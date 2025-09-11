import { Component, input, signal } from '@angular/core';
import { ICharacter } from '@/models';

@Component({
  selector: 'app-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
  characters = input.required<ICharacter[]>();
  listName = input.required<string>()

}
