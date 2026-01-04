import { FormArray, ValidationErrors } from '@angular/forms';
import { MIN, MIN_LENGTH, REQUIRED } from './const.util';

export class FormUtils {
  static isValidField(field: string, form: any): boolean {
    return form.controls[field].errors && form.controls[field].touched;
  }

  static getErrorsField(field: string, form: any): string {
    const errors: ValidationErrors = form.controls[field].errors || {};
    console.log('errors: ', errors);

    return this.buildErrorMessage(errors);
  }

  static isValidFieldFormArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getErrorsFieldFormArray(formArray: FormArray, index: number): string {
    console.log('index :>> ', index);
    if (!formArray.controls[index].errors) {
      return '';
    }
    const errors = formArray.controls[index].errors || {};
    return this.buildErrorMessage(errors);
  }

  private static buildErrorMessage(errors: ValidationErrors): string {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case REQUIRED:
          return 'Este campo es requerido';
        case MIN_LENGTH:
          return `El campo debe tener al menos ${errors[MIN_LENGTH].requiredLength} letras`;
        case MIN:
          return `El campo debe ser mayor a ${errors[MIN].min}`;
      }
    }
    return '';
  }
}
