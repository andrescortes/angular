import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
})
export class BasicPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  errors: Map<string, string> = new Map();

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStock: [0, [Validators.required, Validators.min(0)]],
  });

  public get name(): AbstractControl {
    return this.myForm.controls['name'];
  }

  public get price(): AbstractControl {
    return this.myForm.controls['price'];
  }

  public get inStock(): AbstractControl {
    return this.myForm.controls['inStock'];
  }

  ngOnInit(): void {
    this.onChangesForm();
  }

  isValidField(field: string): boolean {
    const formField = this.myForm.get(field);
    if (!formField?.errors) return false;

    console.log('formField.errors :>> ', formField.errors);
    const hasError =
      formField.errors['required'] || formField.errors['minlength'];
    return hasError && this.myForm.controls[field].touched;
  }

  onChangesForm(): void {
    this.myForm.valueChanges.subscribe(({ name, price, inStock }) => {
      console.log({ name, price, inStock });
      this.updateErrors(this.myForm, this.errors);
    });
  }

  updateErrors(form: FormGroup, errors: Map<string, string>): void {
    errors.clear();
    Object.keys(form.controls).forEach((key) => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors.set(key, this.validationMessage(key, keyError));
        });
      }
    });
    console.log('errors :>> ', errors);
  }

  validationMessage(field: string, keyError: string): string {
    switch (keyError) {
      case 'required':
        return `${field} es requerido`;
      case 'minlength':
        return `${field} debe de tener mínimo 3 caracteres`;
      default:
        break;
    }
    return '';
  }
}
