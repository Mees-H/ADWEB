import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Boekje } from '../boekje';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const boekjes = [
      { id: 1, name: 'Boekje 1', description: 'Dit is boekje 1' },
      { id: 2, name: 'Boekje 2', description: 'Dit is boekje 2' },
      { id: 3, name: 'Boekje 3', description: 'Dit is boekje 3' },
      { id: 4, name: 'Boekje 4', description: 'Dit is boekje 4' },
      { id: 5, name: 'Boekje 5', description: 'Dit is boekje 5' },
      { id: 6, name: 'Boekje 6', description: 'Dit is boekje 6' },
      { id: 7, name: 'Boekje 7', description: 'Dit is boekje 7' },
      { id: 8, name: 'Boekje 8', description: 'Dit is boekje 8' },
      { id: 9, name: 'Boekje 9', description: 'Dit is boekje 9' },
      { id: 10, name: 'Boekje 10', description: 'Dit is boekje 10' }
    ];
    return {boekjes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

  genId(boekjes: Boekje[]): number {
    return boekjes.length > 0 ? Math.max(...boekjes.map(boekje => boekje.id)) + 1 : 11;
  }
}