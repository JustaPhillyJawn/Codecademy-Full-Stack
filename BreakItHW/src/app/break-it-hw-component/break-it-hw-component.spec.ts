import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakItHWComponent } from './break-it-hw-component';

describe('BreakItHWComponent', () => {
  let component: BreakItHWComponent;
  let fixture: ComponentFixture<BreakItHWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakItHWComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreakItHWComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
