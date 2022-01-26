import {
  AfterContentInit,
  Component,
  Injector,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IOptionModel } from 'src/app/shared/models/controls/option.model';
import { NumericControlComponent } from '../numeric-control/numeric-control.component';

@Component({
  selector: 'app-radio-control',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RadioControlComponent,
    },
  ],
})
export class RadioControlComponent
  implements ControlValueAccessor, AfterContentInit, OnDestroy
{
  @Input()
  options: IOptionModel[] = [];

  @Input()
  label = '';

  @Input()
  twoWayBinding = true;

  get value() {
    return this._value;
  }
  set value(value: any) {
    this.writeValue(value);
  }

  touched = false;
  disabled = false;
  ngControl: {
    control: FormControl | null;
    controlName: string;
  } = { control: null, controlName: '' };

  onChange = (value: any) => {};
  onTouched = () => {};

  private _value: any = null;
  private _ngUnsub = new Subject<void>();

  constructor(private injector: Injector) {}

  writeValue(value: any) {
    this._value = value;
    this.onChange(value);
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  ngAfterContentInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    if (ngControl != null) {
      this.ngControl = {
        control: ngControl.control as FormControl,
        controlName: ngControl.name as string,
      };

      if (this.twoWayBinding === false) {
        return;
      }

      this.ngControl.control?.valueChanges
        .pipe(takeUntil(this._ngUnsub))
        .subscribe((value) => (this._value = value));
    }
  }

  ngOnDestroy(): void {
    this._ngUnsub.next();
    this._ngUnsub.complete();
  }
}
