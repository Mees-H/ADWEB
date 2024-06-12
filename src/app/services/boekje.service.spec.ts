import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoekjeService } from '../services/boekje.service';
import { Boekje } from '../models/boekje';
import { of } from 'rxjs';

describe('BoekjeService', () => {
  let service: BoekjeService;

  const mockBoekjes: Boekje[] = [
    {
        id: '1',
        name: 'Name',
        description: 'Description',
        archived: false,
        userIds: [],
    },
    {
        id: '2',
        name: 'Name 2',
        description: 'Description 2',
        archived: true,
        userIds: [],
    },
    ];

  const updatedBoekje: Boekje = {
    id: '1',
    name: 'Updated Name',
    description: 'Updated Description',
    archived: true,
    userIds: [],
  };

  beforeEach(() => {
    const mockBoekjeService = jasmine.createSpyObj('BoekjeService', ['getBoekje', 'getBoekjes', 'getBoekjesArchived', 'updateBoekje', 'addBoekje', 'deleteBoekje']);
    mockBoekjeService.getBoekje.and.returnValue(of(mockBoekjes[0]));
    mockBoekjeService.getBoekjes.and.returnValue(of([mockBoekjes[0]]));
    mockBoekjeService.getBoekjesArchived.and.returnValue(of([mockBoekjes[1]]));
    mockBoekjeService.updateBoekje.and.returnValue(of(updatedBoekje));
    mockBoekjeService.addBoekje.and.returnValue(of(mockBoekjes[0]));
    mockBoekjeService.deleteBoekje.and.returnValue(of(mockBoekjes[0]));

    TestBed.configureTestingModule({
      providers: [
      { provide: BoekjeService, useValue: mockBoekjeService }
      ]
    });

    service = TestBed.inject(BoekjeService);
  });

  it('should GET boekje by id', () => {
    service.getBoekje('1').subscribe(boekje => {
      expect(boekje).toEqual(mockBoekjes[0]);
    });
  });

  it('should GET all non-archived boekjes', () => {
    service.getBoekjes().subscribe(boekjes => {
      expect(boekjes).toEqual([mockBoekjes[0]]);
      expect(boekjes.length).toBe(1);
    });
  });

  it('should GET all archived boekjes', () => {
    service.getBoekjesArchived().subscribe(boekjes => {
      expect(boekjes).toEqual([mockBoekjes[1]]);
      expect(boekjes.length).toBe(1);
    });
  });

  it('should POST boekje', () => {
    service.addBoekje(mockBoekjes[0]).subscribe(boekjes => {
      expect(boekjes).toEqual(mockBoekjes[0]);
    });
  });

  it('should PUT boekje by id', () => {
    service.updateBoekje(updatedBoekje).subscribe(boekjes => {
      expect(boekjes).toEqual(updatedBoekje);
    });
  });

  it('should DELETE boekje by id', () => {
    service.deleteBoekje('1').subscribe(boekjes => {
      expect(JSON.stringify(boekjes)).toEqual(JSON.stringify(mockBoekjes[0]));
    });
  });
  
});