import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Celebcomponent } from './celebcomponent';

describe('Celebcomponent', () => {
  let component: Celebcomponent;
  let fixture: ComponentFixture<Celebcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Celebcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Celebcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
