import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionCustomTemplateComponent } from './option-custom-template.component';

describe('OptionCustomTemplateComponent', () => {
  let component: OptionCustomTemplateComponent;
  let fixture: ComponentFixture<OptionCustomTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionCustomTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionCustomTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
