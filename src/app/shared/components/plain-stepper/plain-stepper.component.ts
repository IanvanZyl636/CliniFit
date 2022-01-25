import { Component } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-plain-stepper',
  templateUrl: './plain-stepper.component.html',
  styleUrls: ['./plain-stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: PlainStepperComponent }],
})
export class PlainStepperComponent extends CdkStepper {}
