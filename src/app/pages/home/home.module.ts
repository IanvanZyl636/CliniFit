import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PlainStepperModule } from 'src/app/shared/components/plain-stepper/plain-stepper.module';
import { ExcelModule } from 'src/app/shared/services/excel/excel.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, PlainStepperModule, ExcelModule],
  exports: [HomeComponent],
})
export class HomeModule {}
