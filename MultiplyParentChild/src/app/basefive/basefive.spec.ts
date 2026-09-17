import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basefive } from './basefive';

describe('Basefive', () => {
  let component: Basefive;
  let fixture: ComponentFixture<Basefive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basefive],
    }).compileComponents();

    fixture = TestBed.createComponent(Basefive);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
