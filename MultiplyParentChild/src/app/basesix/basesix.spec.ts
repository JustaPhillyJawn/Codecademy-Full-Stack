import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basesix } from './basesix';

describe('Basesix', () => {
  let component: Basesix;
  let fixture: ComponentFixture<Basesix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basesix],
    }).compileComponents();

    fixture = TestBed.createComponent(Basesix);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
