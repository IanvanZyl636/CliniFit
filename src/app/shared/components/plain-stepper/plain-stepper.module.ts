import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlainStepperComponent } from './plain-stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';

@NgModule({
  declarations: [PlainStepperComponent],
  imports: [CommonModule, CdkStepperModule],
  exports: [PlainStepperComponent, CdkStepperModule],
})
export class PlainStepperModule {}
