import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCustomTemplateComponent } from './select-custom-template.component';

xdescribe('SelectCustomTemplateComponent', () => {
  let component: SelectCustomTemplateComponent;
  let fixture: ComponentFixture<SelectCustomTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCustomTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCustomTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
