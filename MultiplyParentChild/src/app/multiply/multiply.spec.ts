import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Multiply } from './multiply';

describe('Multiply', () => {
  let component: Multiply;
  let fixture: ComponentFixture<Multiply>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Multiply],
    }).compileComponents();

    fixture = TestBed.createComponent(Multiply);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
