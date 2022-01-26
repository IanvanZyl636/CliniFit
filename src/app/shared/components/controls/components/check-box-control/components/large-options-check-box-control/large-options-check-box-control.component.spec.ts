import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeOptionsCheckBoxControlComponent } from './large-options-check-box-control.component';

describe('LargeOptionsCheckBoxControlComponent', () => {
  let component: LargeOptionsCheckBoxControlComponent;
  let fixture: ComponentFixture<LargeOptionsCheckBoxControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeOptionsCheckBoxControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeOptionsCheckBoxControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
