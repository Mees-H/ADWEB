import { TestBed } from '@angular/core/testing';

import { BoekjeService } from './boekje.service';

describe('BoekjeService', () => {
  let service: BoekjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoekjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
