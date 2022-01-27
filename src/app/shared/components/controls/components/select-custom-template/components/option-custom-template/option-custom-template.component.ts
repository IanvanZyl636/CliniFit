import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-option-custom-template',
  templateUrl: './option-custom-template.component.html',
  styleUrls: ['./option-custom-template.component.scss'],
})
export class OptionCustomTemplateComponent {
  @Input()
  value: any;
  @Input()
  disabled: boolean = false;
  @Input()
  hasClass: boolean = true;

  public selectedItem = new Subject<any>();

  constructor() {}

  selectValue() {
    if (this.disabled == true) {
      return;
    }

    this.selectedItem.next(this.value);
  }
}
