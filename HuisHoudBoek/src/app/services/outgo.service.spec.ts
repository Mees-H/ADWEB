import { TestBed } from '@angular/core/testing';

import { OutgoService } from './outgo.service';

describe('OutgoService', () => {
  let service: OutgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
