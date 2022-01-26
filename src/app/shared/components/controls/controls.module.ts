import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IeControlComponent } from './components/ie-control/ie-control.component';
import { IeRadioControlComponent } from './components/ie-control/components/ie-radio-control/ie-radio-control.component';
import { IeCheckboxControlComponent } from './components/ie-control/components/ie-checkbox-control/ie-checkbox-control.component';
import { CfgControlComponent } from './components/cfg-control/cfg-control.component';
import { CfgNumericalControlComponent } from './components/cfg-control/components/cfg-numerical-control/cfg-numerical-control.component';
import { CfgOrdinalControlComponent } from './components/cfg-control/components/cfg-ordinal-control/cfg-ordinal-control.component';
import { RadioControlComponent } from './components/radio-control/radio-control.component';
import { CheckBoxControlComponent } from './components/check-box-control/check-box-control.component';
import { NumericControlComponent } from './components/numeric-control/numeric-control.component';
import { SmallOptionsCheckBoxControlComponent } from './components/check-box-control/components/small-options-check-box-control/small-options-check-box-control.component';
import { LargeOptionsCheckBoxControlComponent } from './components/check-box-control/components/large-options-check-box-control/large-options-check-box-control.component';



@NgModule({
  declarations: [
    IeControlComponent,
    IeRadioControlComponent,
    IeCheckboxControlComponent,
    CfgControlComponent,
    CfgNumericalControlComponent,
    CfgOrdinalControlComponent,
    RadioControlComponent,
    CheckBoxControlComponent,
    NumericControlComponent,
    SmallOptionsCheckBoxControlComponent,
    LargeOptionsCheckBoxControlComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ControlsModule { }
