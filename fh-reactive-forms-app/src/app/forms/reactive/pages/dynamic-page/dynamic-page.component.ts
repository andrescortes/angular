import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils, MIN_LENGTH, REQUIRED } from '../../../../utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css',
})
export class DynamicPageComponent {
  private readonly fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', [Validators.required, Validators.minLength(3)]],
        ['Death Stranding', [Validators.required, Validators.minLength(3)]],
      ],
      {
        validators: [Validators.minLength(2)],
      }
    ),
  });

  formUtils = FormUtils;
  newFavoriteGame: FormControl<string | null> = new FormControl('', Validators.required);
  minLength: string = MIN_LENGTH;
  required: string = REQUIRED;

  get favoriteGames(): FormArray<AbstractControl<string | null>> {
    return this.form.get('favoriteGames') as FormArray;
  }

  onAddFavorite(): void {
    if (this.newFavoriteGame.invalid) {
      return;
    }
    console.log('this.newFavoriteGame.value :>> ', this.newFavoriteGame.value);
    const newGame = this.newFavoriteGame.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavoriteGame.reset();
  }

  onDeleteFavorite(i: number): void {
    this.favoriteGames.removeAt(i);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    this.favoriteGames.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }
}
