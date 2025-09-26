import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, NgIf, SlicePipe, UpperCasePipe } from '@angular/common';

const client = {
  name: 'Fernando',
  age: 35,
  gender: 'male',
  address: 'Ottawa, Canada'
}

const client2 = {
  name: 'Melissa',
  age: 30,
  gender: 'female',
  address: 'Toronto, Canada'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [ CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, NgIf, JsonPipe, KeyValuePipe, UpperCasePipe ],
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  // i18n Select
  client = signal(client);
  client2 = signal(client2);

  invitationMap = {
    male: 'Mr.',
    female: 'Ms.'
  }

  changeClient(): void {
    if (this.client() === client) {
      this.client.set(client2);

    } else {
      this.client.set(client);
    }
  }

  clientsMapThere = signal({
    '=0': 'There is',
    '=1': 'There is',
    other: 'There are'
  });

  clientsMap = signal({
    '=0': ' no clients',
    '=1': ' one client',
    other: ' clients'
  });


  // i18n Plural
  clients = signal([
    'Fernando',
    'Melissa',
    'Juan',
    'Pedro',
    'Maria',
    'John'
  ]);

  removeClient(): void {
    this.clients.update(cl => cl.slice(1));
  }

  get keys(): string[] {
    return Object.keys(client);
  }

  get values() {
    return Object.values(client);
  }
}
