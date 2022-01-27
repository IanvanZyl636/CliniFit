import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterObjPipe } from './filterObj.pipe';

@NgModule({
  declarations: [FilterObjPipe],
  imports: [CommonModule],
  exports: [FilterObjPipe],
})
export class FilterModule {}
