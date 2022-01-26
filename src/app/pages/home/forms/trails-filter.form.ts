import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IModelForm } from 'src/app/shared/interfaces/forms/model-form.interface';

export class TrailsFilterForm extends FormGroup implements IModelForm {
  get model() {
    return this._model();
  }

  constructor() {
    super({
      //   sex: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      agee: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      hadCancer: new FormControl(null, [Validators.required]),
      isHypertense: new FormControl(null, Validators.required),
    });
  }

  submit() {
    Object.keys(this.controls).forEach((key: string) => {
      this.get(key)?.markAsTouched();
    });
  }

  private _model() {
    return this.value;
  }
}
