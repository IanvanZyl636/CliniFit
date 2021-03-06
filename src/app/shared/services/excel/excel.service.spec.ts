import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { ExcelService } from './excel.service';

describe('ExcelService', () => {
  let excelService: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ExcelService],
    });

    excelService = TestBed.inject(ExcelService);
  });

  it('should be created', () => {
    expect(excelService).toBeTruthy();
  });

  it('should read out of xlsx file', async () => {
    const wb = await excelService.openExcelWorkbook(
      'assets/documents/cfg_parsed_trials.xlsx'
    );
    expect(wb).toBeDefined();
  });
});
