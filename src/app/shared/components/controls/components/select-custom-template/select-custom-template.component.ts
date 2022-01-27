import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  forwardRef,
  QueryList,
  TemplateRef,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OptionCustomTemplateComponent } from './components/option-custom-template/option-custom-template.component';

@Component({
  selector: 'app-select-custom-template',
  templateUrl: './select-custom-template.component.html',
  styleUrls: ['./select-custom-template.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectCustomTemplateComponent,
      multi: true,
    },
  ],
})
export class SelectCustomTemplateComponent
  implements AfterContentInit, ControlValueAccessor
{
  @ContentChildren(OptionCustomTemplateComponent)
  public optionCustomTemplateComponents: QueryList<OptionCustomTemplateComponent> =
    {} as QueryList<OptionCustomTemplateComponent>;
  @ContentChild(TemplateRef, { static: true })
  public selectedTemplate: TemplateRef<any> = {} as TemplateRef<any>;
  @ViewChild('selectInput', { static: true })
  public selectInput: ElementRef = {} as ElementRef;

  @Output()
  public dropdownOpen = new EventEmitter<void>();
  @Output()
  public dropdownClosed = new EventEmitter<void>();
  @Output()
  public changes = new EventEmitter<any>();

  public get showDropdown() {
    return this._showDropdown;
  }
  public set showDropdown(value: boolean) {
    this._changeShowDropDown(value);
  }

  public preventBlurClose: boolean = false;
  public disabled: boolean = false;
  public value: any;
  public dropDownTop: number = 0;
  public dropDownLeft: number = 0;
  public dropDownWidth: number = 0;
  public dropDownMaxHeight: number = 0;
  public flipDropDown: boolean = false;

  public onChange: any = () => {};
  public onTouched: any = () => {};

  private _unSubscribe = new Subject<void>();
  private _showDropdown: boolean = false;

  constructor() {}

  ngAfterContentInit() {
    this._optionCustomTemplateComponentsChange();
    this._registerOptionSelectEvent();
  }

  public onClick() {
    if (this._showDropdown == false) {
      this._setDropDownPosition();
    }

    this.selectInput.nativeElement.focus();
    this.onTouched();
    this.showDropdown = !this.showDropdown;
  }

  public writeValue(value: number): void {
    this.value = value;
    this.onChange(value);
    this.preventBlurClose = false;
    this.showDropdown = false;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public stopDefaultDropdown(e: any) {
    e.preventDefault();
  }

  private _optionCustomTemplateComponentsChange() {
    this._unSubscribe.next();
    this._unSubscribe.complete();
    this._unSubscribe = new Subject<void>();

    this.optionCustomTemplateComponents.changes
      .pipe(takeUntil(this._unSubscribe))
      .subscribe(
        (
          optionCustomTemplateComponents: QueryList<OptionCustomTemplateComponent>
        ) => {
          this._registerOptionSelectEvent();
        }
      );
  }

  private _registerOptionSelectEvent() {
    this.optionCustomTemplateComponents.forEach(
      (optionCustomTemplateComponent) => {
        optionCustomTemplateComponent.selectedItem
          .pipe(takeUntil(this._unSubscribe))
          .subscribe((value) => {
            this.writeValue(value);
            this.changes.emit(value);
          });
      }
    );
  }

  private _setDropDownPosition() {
    const flipDropDownMaxHeight = 200;
    const defaultMaxHeight = 300;
    const rect =
      this.selectInput.nativeElement.getBoundingClientRect() as DOMRect;

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

  private _changeShowDropDown(value: boolean) {
    this._showDropdown = value;

    if (this._showDropdown === true) {
      this.dropdownOpen.emit();
    }

    if (this._showDropdown === false) {
      this.dropdownClosed.emit();
    }
  }
}
