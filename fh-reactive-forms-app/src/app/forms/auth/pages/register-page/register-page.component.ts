import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../../utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  readonly formUtils = FormUtils;

  form = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
        [this.formUtils.checkingEmailFromServerResponse],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          this.formUtils.isValidUsername,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
        ],
      ],
      confirmPassword: [
        '',
        Validators.required,
        Validators.pattern(this.formUtils.notOnlySpacesPattern),
      ],
    },
    {
      validators: [this.formUtils.isEqualFields('password', 'confirmPassword')],
      updateOn: 'change',
    }
  );

  onSubmit(): void {
    this.form.markAllAsTouched();
    console.log('this.form.value :>> ', this.form.value);
  }
  // https://restcountries.com/v3.1/all
}
