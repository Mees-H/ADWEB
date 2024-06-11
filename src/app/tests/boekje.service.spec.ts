import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoekjeService } from '../services/boekje.service';
import { Boekje } from '../models/boekje';

describe('BoekjeService', () => {
  let service: BoekjeService;
  let httpMock: HttpTestingController;

  const mockBoekjes: Boekje[] = [
    {
        id: 1,
        name: 'Name',
        description: 'Description',
        archived: false,
    },
    {
        id: 2,
        name: 'Name 2',
        description: 'Description 2',
        archived: true,
    },
    ];

  const updatedBoekje: Boekje = {
    id: 1,
    name: 'Updated Name',
    description: 'Updated Description',
    archived: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoekjeService]
    });

    service = TestBed.inject(BoekjeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should GET boekje by id', () => {
    service.getBoekje(1).subscribe(boekje => {
      expect(boekje).toEqual(mockBoekjes[0]);
    });

    const req = httpMock.expectOne(`${service.boekjesUrl}/1`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockBoekjes[0]);
    httpMock.verify();
  });

  it('should GET all non-archived boekjes', () => {
    service.getBoekjes().subscribe(boekjes => {
      expect(boekjes).toEqual([mockBoekjes[0]]);
      expect(boekjes.length).toBe(1);
    });

    const req = httpMock.expectOne(service.boekjesUrl);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockBoekjes);
    httpMock.verify();
  });

  it('should GET all archived boekjes', () => {
    service.getBoekjesArchived().subscribe(boekjes => {
      expect(boekjes).toEqual([mockBoekjes[1]]);
      expect(boekjes.length).toBe(1);
    });

    const req = httpMock.expectOne(service.boekjesUrl);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockBoekjes);
    httpMock.verify();
  });

  it('should POST boekje', () => {
    service.addBoekje(updatedBoekje).subscribe(boekjes => {
      expect(boekjes).toEqual(updatedBoekje);
    });

    const req = httpMock.expectOne(service.boekjesUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(updatedBoekje);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(updatedBoekje);
    httpMock.verify();
  });

  it('should PUT boekje by id', () => {
    service.updateBoekje(updatedBoekje).subscribe(boekjes => {
      expect(boekjes).toEqual(updatedBoekje);
    });

    const req = httpMock.expectOne(service.boekjesUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updatedBoekje);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(updatedBoekje);
    httpMock.verify();
  });

  it('should DELETE boekje by id', () => {
    service.deleteBoekje(1).subscribe(boekjes => {
      expect(boekjes).toEqual(mockBoekjes[0]);
    });

    const req = httpMock.expectOne(`${service.boekjesUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockBoekjes[0]);
    httpMock.verify();
  });
  
});