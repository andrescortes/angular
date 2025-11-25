export class FormUtils {
  static isValidField(field: string, form: any): boolean {
    return form.controls[field].errors && form.controls[field].touched;
  }

  static getErrorsField(field: string, form: any): string {
    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} letras`;
        case 'min':
          return `El campo debe ser mayor a ${errors['min'].min}`;
      }
    }
    return '';
  }
}
