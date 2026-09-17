import { TestBed } from '@angular/core/testing';

import { CelebService } from './celeb-service';

describe('CelebService', () => {
  let service: CelebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CelebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
