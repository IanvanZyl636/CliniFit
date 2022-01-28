import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckBoxFormArray } from 'src/app/shared/forms/check-box/check-box.form-array';
import { IModelForm } from 'src/app/shared/interfaces/forms/model-form.interface';
import { requiredCheckBoxFormArrayValidator } from 'src/app/shared/validators/required-check-box-form-array.validator';

export class TrailsFilterForm extends FormGroup implements IModelForm {
  get model() {
    return this._model();
  }

  constructor() {
    super({
      sex: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      hadCancer: new FormControl(null, Validators.required),
      isHypertense: new FormControl(null, Validators.required),
      chronic_disease: new CheckBoxFormArray(
        [],
        [requiredCheckBoxFormArrayValidator()]
      ),
    });
  }

  submit() {
    Object.keys(this.controls).forEach((key: string) => {
      this.get(key)?.markAsTouched();
    });
  }

  private _model() {
    let model = this.value;

    model['chronic_disease'] = (
      this.controls['chronic_disease'] as CheckBoxFormArray
    ).checkedCheckBoxControlValues;

    return model;
  }
}
