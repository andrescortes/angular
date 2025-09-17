import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  searchValue = output<string>();
  placeHolder = input.required<string>();

  onChange(value: string) {
    if (value.trim().length > 0) {
      this.searchValue.emit(value);
    }
  }

}
