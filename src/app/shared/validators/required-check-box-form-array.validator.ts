import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CheckBoxFormArray } from '../forms/check-box/check-box.form-array';

export function requiredCheckBoxFormArrayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as CheckBoxFormArray;

    let required = true;
    let index = 0;

    while (required === true && index < formArray.controls.length) {
      if (formArray.controls[index].value === true) {
        required = false;
      }

      index++;
    }

    return required ? { required: true } : null;
  };
}
