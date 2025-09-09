import { Component, computed, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [
    UpperCasePipe
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  name = signal<string>('Superman');
  age = signal<number>(30);
  heroDescription = computed(() =>
    `Hero: ${ this.name() }, Age: ${ this.age() } years old.`
  )

  changeHero(): void {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  changeAge(): void {
    this.age.set(Math.floor(Math.random() * 100));
  }

  resetForm(): void {
    this.name.set('Ironman');
    this.age.set(45);
  }
}
