import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basefour } from './basefour';

describe('Basefour', () => {
  let component: Basefour;
  let fixture: ComponentFixture<Basefour>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basefour],
    }).compileComponents();

    fixture = TestBed.createComponent(Basefour);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
