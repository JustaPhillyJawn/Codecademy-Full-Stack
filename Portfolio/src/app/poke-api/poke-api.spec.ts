import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeAPI } from './poke-api';

describe('PokeAPI', () => {
  let component: PokeAPI;
  let fixture: ComponentFixture<PokeAPI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeAPI],
    }).compileComponents();

    fixture = TestBed.createComponent(PokeAPI);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
