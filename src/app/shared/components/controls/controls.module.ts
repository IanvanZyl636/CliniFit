import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioControlComponent } from './components/radio-control/radio-control.component';
import { CheckBoxControlComponent } from './components/check-box-control/check-box-control.component';
import { NumericControlComponent } from './components/numeric-control/numeric-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from '../../pipes/filter/filter.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    RadioControlComponent,
    CheckBoxControlComponent,
    NumericControlComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterModule,
    FontAwesomeModule,
  ],
  exports: [
    RadioControlComponent,
    CheckBoxControlComponent,
    NumericControlComponent,
  ],
})
export class ControlsModule {}
