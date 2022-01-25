import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainStepperComponent } from './plain-stepper.component';

describe('PlainStepperComponent', () => {
  let component: PlainStepperComponent;
  let fixture: ComponentFixture<PlainStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlainStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
