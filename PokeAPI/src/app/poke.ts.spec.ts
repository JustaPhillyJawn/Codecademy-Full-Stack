import { TestBed } from '@angular/core/testing';

import { PokeTs } from './poke.ts';

describe('PokeTs', () => {
  let service: PokeTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
