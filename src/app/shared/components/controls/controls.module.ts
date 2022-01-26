import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioControlComponent } from './components/radio-control/radio-control.component';
import { CheckBoxControlComponent } from './components/check-box-control/check-box-control.component';
import { NumericControlComponent } from './components/numeric-control/numeric-control.component';
import { SmallOptionsCheckBoxControlComponent } from './components/check-box-control/components/small-options-check-box-control/small-options-check-box-control.component';
import { LargeOptionsCheckBoxControlComponent } from './components/check-box-control/components/large-options-check-box-control/large-options-check-box-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RadioControlComponent,
    CheckBoxControlComponent,
    NumericControlComponent,
    SmallOptionsCheckBoxControlComponent,
    LargeOptionsCheckBoxControlComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    RadioControlComponent,
    CheckBoxControlComponent,
    NumericControlComponent,
  ],
})
export class ControlsModule {}
