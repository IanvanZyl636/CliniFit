import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCustomTemplateComponent } from './select-custom-template.component';
import { OptionCustomTemplateComponent } from './components/option-custom-template/option-custom-template.component';

@NgModule({
  declarations: [
    SelectCustomTemplateComponent,
    OptionCustomTemplateComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SelectCustomTemplateComponent,
    OptionCustomTemplateComponent
  ]
})
export class SelectCustomTemplateModule { }
