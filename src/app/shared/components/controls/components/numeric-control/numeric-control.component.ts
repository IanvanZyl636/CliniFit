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

@Component({
  selector: 'app-numeric-control',
  templateUrl: './numeric-control.component.html',
  styleUrls: ['./numeric-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NumericControlComponent,
    },
  ],
})
export class NumericControlComponent
  implements ControlValueAccessor, AfterContentInit, OnDestroy
{
  @Input()
  label = '';

  @Input()
  placeholder = '';

  @Input()
  twoWayBinding = true;

  get value() {
    return this._value;
  }
  set value(value: string | number | null) {
    this.writeValue(value);
  }

  touched = false;
  disabled = false;
  control: FormControl | null = null;

  onChange = (value: string | number | null) => {};
  onTouched = () => {};

  private _value: string | number | null = null;
  private _ngUnsub = new Subject<void>();

  constructor(private injector: Injector) {}

  writeValue(value: string | number | null) {
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
      this.control = ngControl.control as FormControl;

      if (this.twoWayBinding === false) {
        return;
      }

      this.control.valueChanges
        .pipe(takeUntil(this._ngUnsub))
        .subscribe((value) => (this._value = value));
    }
  }

  ngOnDestroy(): void {
    this._ngUnsub.next();
    this._ngUnsub.complete();
  }
}
