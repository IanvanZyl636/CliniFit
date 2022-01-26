import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallOptionsCheckBoxControlComponent } from './small-options-check-box-control.component';

describe('SmallOptionsCheckBoxControlComponent', () => {
  let component: SmallOptionsCheckBoxControlComponent;
  let fixture: ComponentFixture<SmallOptionsCheckBoxControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallOptionsCheckBoxControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallOptionsCheckBoxControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
