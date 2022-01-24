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

  it('should read out of xlsx file', (done) => {
    excelService.openExcelWorkbook('assets/documents/Test.xlsx').then((wb) => {
      expect(wb).toBeDefined();
      done();
    });
  });

  it('should error missing xlsx file', (done) => {
    excelService.openExcelWorkbook('error path').catch((error) => {
      expect(error).toBeTruthy();
      done();
    });
  });
});
