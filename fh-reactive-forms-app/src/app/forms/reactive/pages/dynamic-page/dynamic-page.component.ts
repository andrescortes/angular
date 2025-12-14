import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../../utils/form.util';

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
        validators: [Validators.minLength(3)],
      }
    ),
  });

  formUtils = FormUtils;

  public get favoriteGames(): FormArray<AbstractControl<string>> {
    return this.form.get('favoriteGames') as FormArray;
  }
}
