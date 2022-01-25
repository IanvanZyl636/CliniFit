import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlainStepperComponent } from 'src/app/shared/components/plain-stepper/plain-stepper.component';
import { ExcelService } from 'src/app/shared/services/excel/excel.service';
import { TrailsFilterForm } from './forms/trails-filter.form';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(PlainStepperComponent)
  plainStepper!: PlainStepperComponent;

  trailsFilterForm = new TrailsFilterForm();

  constructor(private excelService: ExcelService) {}

  private _getExcelContent = async (): Promise<string> => {
    const excelPath = 'assets/documents/Test.xlsx';
    const wb = await this.excelService.openExcelWorkbook(excelPath);

    return wb.getWorksheet(1).getCell(1, 1).value as string;
  };
}
