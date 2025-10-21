import { TestBed } from '@angular/core/testing';

import { DomiciliarioService } from './domiciliario.service';

describe('DomiciliarioService', () => {
  let service: DomiciliarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomiciliarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
