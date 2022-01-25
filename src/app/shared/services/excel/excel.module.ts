import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ExcelService } from './excel.service';

@NgModule({
  declarations: [],
  providers: [ExcelService],
  imports: [HttpClientModule],
})
export class ExcelModule {}
