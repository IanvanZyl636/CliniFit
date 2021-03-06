import { Component, ViewChild } from '@angular/core';
import { debounceTime, map } from 'rxjs';
import { PlainStepperComponent } from 'src/app/shared/components/plain-stepper/plain-stepper.component';
import { IOptionModel } from 'src/app/shared/models/controls/option.model';
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

  form = new TrailsFilterForm();

  sexOptions: IOptionModel[] = [
    {
      value: 'Male',
      description: 'Male',
    } as IOptionModel,
    {
      value: 'Female',
      description: 'Female',
    } as IOptionModel,
  ];

  hadCancerOptions: IOptionModel[] = [
    {
      value: true,
      description: 'Yes',
    } as IOptionModel,
    {
      value: false,
      description: 'No',
    } as IOptionModel,
  ];

  sOptions: IOptionModel[] = [
    {
      value: 'Liver Cancer',
      description: 'Liver Cancer',
    } as IOptionModel,
    {
      value: 'Kidney Failure',
      description: 'Kidney Failure',
    } as IOptionModel,
    {
      value: 'Heart Failure',
      description: 'Heart Failure',
    } as IOptionModel,
  ];

  isLoading = false;

  constructor(private excelService: ExcelService) {
    this.form.valueChanges
      .pipe(
        map((value) => {
          this.isLoading = true;
          return value;
        }),
        debounceTime(1000)
      )
      .subscribe(() => this._formValueChange());
  }

  public submit() {
    this.form.submit();
    const test = this.form.model;
  }

  private _formValueChange() {
    let pop = this.form.model;
    this.isLoading = false;
  }

  private _getExcelContent = async (): Promise<string> => {
    const excelPath = 'assets/documents/Test.xlsx';
    const wb = await this.excelService.openExcelWorkbook(excelPath);

    return wb.getWorksheet(1).getCell(1, 1).value as string;
  };
}
