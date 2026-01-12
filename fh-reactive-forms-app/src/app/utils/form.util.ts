import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';
import { EMAIL, MIN, MIN_LENGTH, REQUIRED } from './const.util';

export class FormUtils {
  static namePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern: string = '^[a-zA-Z0-9]+$';

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
        case EMAIL:
          return 'El correo no es valido';
        case 'fieldsNotEqual':
          return 'Los campos no son iguales';
        case 'testEmail':
          return 'El correo no es valido';
        case 'testUsername':
          return 'El username no es valido';
      }
    }
    return '';
  }
  static isEqualFields(value: string, valueToCompare: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldOne = formGroup.get(value)?.value;
      const fieldTwo = formGroup.get(valueToCompare)?.value;
      return fieldOne === fieldTwo ? null : { fieldsNotEqual: true };
    };
  }

  static async checkingEmailFromServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'test@gmail.com') {
          resolve({ testEmail: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
  }

  static isValidUsername(control: AbstractControl): ValidationErrors | null {
    return control.value === 'admintest' ? { testUsername: true } : null;
  }
}
