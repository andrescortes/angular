import { Component, inject } from '@angular/core';
import { ICharacter } from '@/models';
import { CharacterListComponent } from '@/components/dragonball/character-list/character-list.component';
import { CharacterAddComponent } from '@/components/dragonball/character-add/character-add.component';
import { DragonballService } from '@/services/dragonball.service';

@Component({
  selector: 'app-dragonball-super-page',
  imports: [
    CharacterListComponent,
    CharacterAddComponent
  ],
  templateUrl: './dragonball-super-page.component.html',
  styleUrl: './dragonball-super-page.component.css'
})
export class DragonballSuperPageComponent {
  private readonly dragonballService = inject(DragonballService);
  characters = this.dragonballService.characters;
  isRepeat = this.dragonballService.isRepeat;

  addCharacter(character: ICharacter) {
    this.dragonballService.addCharacter(character);
  }
}
