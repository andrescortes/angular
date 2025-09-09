import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.css']
})
export class CounterPageComponent {
  counter = signal<number>(0);

  performOperations(value: number, operation: string = '+') {
    this.counter.update((current) => {
      if (operation === '+') {
        return current + value;
      } else {
        let currentValue = current - value;
        return currentValue < 0 ? current : currentValue;
      }
    });
  }

  reset(): void {
    this.counter.set(0);
  }
}
