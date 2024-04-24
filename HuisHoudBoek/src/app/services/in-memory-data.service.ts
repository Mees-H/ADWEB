import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Boekje } from '../boekje';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const boekjes = [
      { id: 1, name: 'Boekje Alpha', description: 'Op dag 1 van de boekenclub kreeg ik een boekje cadeau.', archived: false },
      { id: 2, name: 'Boekje Beta', description: 'Op dag 2 van de boekenclub kreeg ik twee boekjes cadaeu.', archived: false },
      { id: 3, name: 'Boekje Gamma', description: 'Op dag 3 van de boekenclub kreeg ik drie boekjes cadeau.', archived: false },
      { id: 4, name: 'Boekje Delta', description: 'Op dag 4 van de boekenclub kreeg ik vier boekjes cadeau.', archived: false },
      { id: 5, name: 'Boekje Epsilon', description: 'Op dag 5 van de boekenclub kreeg ik vijf boekjes cadeau.', archived: false },
      { id: 6, name: 'Boekje Zeta', description: 'Op dag 6 van de boekenclub kreeg ik zes boekjes cadeau.', archived: true },
      { id: 7, name: 'Boekje Eta', description: 'Op dag 7 van de boekenclub kreeg ik zeven boekjes cadeau.', archived: true },
      { id: 8, name: 'Boekje Theta', description: 'Op dag 8 van de boekenclub kreeg ik acht boekjes cadeau.', archived: true },
      { id: 9, name: 'Boekje Iota', description: 'Op dag 9 van de boekenclub kreeg ik negen boekjes cadeau.', archived: true },
      { id: 10, name: 'Boekje Kappa', description: 'Op dag 10 van de boekenclub kreeg ik tien boekjes cadeau.', archived: true }

    ];
    return {boekjes};
  }

  genId(boekjes: Boekje[]): number {
    return boekjes.length > 0 ? Math.max(...boekjes.map(boekje => boekje.id)) + 1 : 11;
  }
}