import {
  AfterContentInit,
  Component,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CheckBoxFormArray } from 'src/app/shared/forms/check-box/check-box.form-array';
import { CheckBoxFormControl } from 'src/app/shared/forms/check-box/check-box.form-control';
import { IOptionModel } from 'src/app/shared/models/controls/option.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-check-box-control',
  templateUrl: './check-box-control.component.html',
  styleUrls: ['./check-box-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckBoxControlComponent,
    },
  ],
})
export class CheckBoxControlComponent
  implements ControlValueAccessor, AfterContentInit, OnDestroy
{
  @ViewChild('searchInput', { static: true })
  searchInput: ElementRef = {} as ElementRef;

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

  checkBoxFormArray: CheckBoxFormArray = new CheckBoxFormArray([]);
  search: string | null = null;

  preventBlurClose: boolean = false;
  touched = false;
  disabled = false;
  showDropdown = false;
  flipDropDown = false;

  dropDownTop: number = 0;
  dropDownLeft: number = 0;
  dropDownWidth: number = 0;
  dropDownMaxHeight: number = 0;

  faTimes = faTimes;

  onChange = (value: any) => {};
  onTouched = () => {};

  private _value: any = null;
  private _ngUnsub = new Subject<void>();

  constructor(private injector: Injector) {}

  onFocus() {
    if (this.showDropdown == false) {
      this._setDropDownPosition();
    }

    this.onTouched();
    this.showDropdown = true;
  }

  onQuickRemoveControl(control: CheckBoxFormControl) {
    control.setValue(false);
  }

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
    this._initializeFormArray();
  }

  private _initializeFormArray() {
    const ngControl = this.injector.get(ControlContainer, null);

    if (ngControl == null) {
      return;
    }

    this.checkBoxFormArray = ngControl.control as CheckBoxFormArray;

    this.checkBoxFormArray.createCheckBoxControls(this.options);

    if (this.twoWayBinding === false) {
      return;
    }

    this.checkBoxFormArray.valueChanges
      .pipe(takeUntil(this._ngUnsub))
      .subscribe((value: boolean[]) => {
        this._value = value;
        value.forEach((v, i) => {
          this.checkBoxFormArray.controls[i].setValue(v, {
            onlySelf: true,
            emitEvent: false,
            emitModelToViewChange: true,
            emitViewToModelChange: false,
          });
        });
      });
  }

  private _setDropDownPosition() {
    const flipDropDownMaxHeight = 200;
    const defaultMaxHeight = 300;
    const rect =
      this.searchInput.nativeElement.getBoundingClientRect() as DOMRect;

    this.dropDownTop = rect.top + window.pageYOffset + rect.height;
    this.dropDownLeft = rect.left + window.pageXOffset;
    this.dropDownWidth = rect.width;

    const maxHeight = window.innerHeight - this.dropDownTop;
    this.dropDownMaxHeight =
      maxHeight > defaultMaxHeight ? defaultMaxHeight : maxHeight;

    if (this.dropDownMaxHeight <= flipDropDownMaxHeight) {
      this.flipDropDown = true;
      this.dropDownTop = rect.top + window.pageYOffset;
      const maxHeight = this.dropDownTop;
      this.dropDownMaxHeight =
        maxHeight > defaultMaxHeight ? defaultMaxHeight : maxHeight;
    }
  }

  ngOnDestroy(): void {
    this._ngUnsub.next();
    this._ngUnsub.complete();
  }
}
