import { TestBed } from '@angular/core/testing';
import { PdfStamperService } from './pdf-stamper-service';

describe('PdfStamperService', () => {
  let service: PdfStamperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfStamperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
