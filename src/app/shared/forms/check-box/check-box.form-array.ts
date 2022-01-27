import {
  AbstractControlOptions,
  AsyncValidatorFn,
  FormArray,
  ValidatorFn,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IOptionModel } from '../../models/controls/option.model';
import { CheckBoxFormControl } from './check-box.form-control';

export class CheckBoxFormArray extends FormArray {
  get checkBoxControls() {
    return this.controls as CheckBoxFormControl[];
  }
  get checkedCheckBoxControlValues() {
    return this._getCheckedCheckBoxControlValues();
  }
  get getCheckedCheckBoxControls() {
    return this._getCheckedCheckBoxControls();
  }

  private _ngUnsubscribe = new Subject<void>();

  constructor(
    controls: CheckBoxFormControl[],
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  createCheckBoxControls(checkBoxModels: IOptionModel[]) {
    this._unsubscribePreviousControlValueChange();

    this.controls = checkBoxModels.map(
      (checkBoxModel) => new CheckBoxFormControl(checkBoxModel, false)
    );

    this._subscribeCurrentControlValueChange();
  }

  setCheckBoxControlValues(value: any[]) {
    this.checkBoxControls
      .filter((control) => value.indexOf(control.value) !== -1)
      .forEach((control) =>
        control.setValue(true, {
          onlySelf: true,
          emitEvent: false,
          emitModelToViewChange: false,
          emitViewToModelChange: false,
        })
      );

    this.updateValueAndValidity();
  }

  private _getCheckedCheckBoxControlValues(): any[] {
    return this.checkBoxControls
      .filter((control) => control.value === true)
      .map((control) => control.checkBoxModel.value);
  }

  private _getCheckedCheckBoxControls() {
    return this.checkBoxControls.filter((control) => control.value === true);
  }

  private _unsubscribePreviousControlValueChange() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
    this._ngUnsubscribe = new Subject();
    this.controls = [];
  }

  private _subscribeCurrentControlValueChange() {
    this.updateValueAndValidity({ onlySelf: true, emitEvent: false });

    this.controls.forEach((control) => {
      control.valueChanges
        .pipe(takeUntil(this._ngUnsubscribe))
        .subscribe(() => {
          this.updateValueAndValidity();
        });
    });
  }
}
