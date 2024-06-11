import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BoekjeService } from './boekje.service';

describe('BoekjeService', () => {
  let service: BoekjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [BoekjeService]
    });
    service = TestBed.inject(BoekjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
