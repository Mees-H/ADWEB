import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Boekje } from '../models/boekje';

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
    
    const income = [ 
      { id: 1, cash: 100, name: 'Inkomst Alpha', description: 'Op dag 1 van de boekenclub kreeg ik 100 euro cadeau.', category: 'gift' },
      { id: 2, cash: 200, name: 'Inkomst Beta', description: 'Op dag 2 van de boekenclub kreeg ik 200 euro cadeau.', category: 'gift' },
      { id: 3, cash: 300, name: 'Inkomst Gamma', description: 'Op dag 3 van de boekenclub kreeg ik 300 euro cadeau.', category: 'gift' },
      { id: 4, cash: 400, name: 'Inkomst Delta', description: 'Op dag 4 van de boekenclub kreeg ik 400 euro cadeau.', category: 'gift' },
      { id: 5, cash: 500, name: 'Inkomst Epsilon', description: 'Op dag 5 van de boekenclub kreeg ik 500 euro cadeau.', category: 'gift' },
      { id: 6, cash: 600, name: 'Inkomst Zeta', description: 'Op dag 6 van mijn werk kreeg ik 600 euro.', category: 'work' },
      { id: 7, cash: 700, name: 'Inkomst Eta', description: 'Op dag 7 van mijn werk kreeg ik 700 euro.', category: 'work' },
      { id: 8, cash: 800, name: 'Inkomst Theta', description: 'Op dag 8 van mijn werk kreeg ik 800 euro.', category: 'work' },
      { id: 9, cash: 900, name: 'Inkomst Iota', description: 'Op dag 9 van mijn werk kreeg ik 900 euro', category: 'work' },
      { id: 10, cash: 1000, name: 'Inkomst Kappa', description: 'Op dag 10 van mijn werkkreeg ik 1000 euro.', category: 'work' }
    ];

    const outgo = [
      { id: 1, cash: 100, name: 'Uitgave Alpha', description: 'Op dag 1 van de boekenclub gaf ik 100 euro uit.', category: 'gift' },
      { id: 2, cash: 200, name: 'Uitgave Beta', description: 'Op dag 2 van de boekenclub gaf ik 200 euro uit.', category: 'gift' },
      { id: 3, cash: 300, name: 'Uitgave Gamma', description: 'Op dag 3 van de boekenclub gaf ik 300 euro uit.', category: 'gift' },
      { id: 4, cash: 400, name: 'Uitgave Delta', description: 'Op dag 4 van de boekenclub gaf ik 400 euro uit.', category: 'gift' },
      { id: 5, cash: 500, name: 'Uitgave Epsilon', description: 'Op dag 5 van de boekenclub gaf ik 500 euro uit.', category: 'gift' },
      { id: 6, cash: 600, name: 'Uitgave Zeta', description: 'Op dag 6 van mijn werk gaf ik 600 euro uit.', category: 'work' },
      { id: 7, cash: 700, name: 'Uitgave Eta', description: 'Op dag 7 van mijn werk gaf ik 700 euro uit.', category: 'work' },
      { id: 8, cash: 800, name: 'Uitgave Theta', description: 'Op dag 8 van mijn werk gaf ik 800 euro uit.', category: 'work' },
      { id: 9, cash: 900, name: 'Uitgave Iota', description: 'Op dag 9 van mijn werk gaf ik 900 euro uit.', category: 'work' },
      { id: 10, cash: 1000, name: 'Uitgave Kappa', description: 'Op dag 10 van mijn werk gaf ik 1000 euro uit.', category: 'work' }
    ];

    return {boekjes, income, outgo};
  }

  genId(boekjes: Boekje[]): number {
    return boekjes.length > 0 ? Math.max(...boekjes.map(boekje => boekje.id)) + 1 : 11;
  }
}