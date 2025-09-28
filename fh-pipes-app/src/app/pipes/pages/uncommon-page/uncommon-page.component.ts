import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, NgIf, SlicePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

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
  imports: [ 
    CardComponent, 
    I18nSelectPipe, 
    I18nPluralPipe, 
    SlicePipe, NgIf, 
    JsonPipe, 
    KeyValuePipe, 
    UpperCasePipe,
    AsyncPipe
  ],
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

  // Async pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello World');
      console.log('Promise finalized :>>');
    }, 3500);
  });

  changeAsyncValue(): void {
    this.promiseValue = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Hello World 2');
        console.log('Promise finalized :>>');
      }, 3500);
    });
  }

  myObservable = interval(2000)
  .pipe(
    tap({
      next: value => console.log('next', value),
    }),
    map(value => value * 2)
  )
}
