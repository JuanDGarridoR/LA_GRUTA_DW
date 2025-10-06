import { TestBed } from '@angular/core/testing';

import { AdicionalService } from './adicional.service';

describe('AdicionalService', () => {
  let service: AdicionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdicionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
