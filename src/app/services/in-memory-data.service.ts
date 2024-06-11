import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Boekje } from '../models/boekje';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const boekjes = [
      { id: "1", name: 'Boekje Alpha', description: 'Op dag 1 van de boekenclub kreeg ik een boekje cadeau.', archived: false },
      { id: "2", name: 'Boekje Beta', description: 'Op dag 2 van de boekenclub kreeg ik twee boekjes cadaeu.', archived: false },
      { id: "3", name: 'Boekje Gamma', description: 'Op dag 3 van de boekenclub kreeg ik drie boekjes cadeau.', archived: false },
      { id: "4", name: 'Boekje Delta', description: 'Op dag 4 van de boekenclub kreeg ik vier boekjes cadeau.', archived: false },
      { id: "5", name: 'Boekje Epsilon', description: 'Op dag 5 van de boekenclub kreeg ik vijf boekjes cadeau.', archived: false },
      { id: "6", name: 'Boekje Zeta', description: 'Op dag 6 van de boekenclub kreeg ik zes boekjes cadeau.', archived: true },
      { id: "7", name: 'Boekje Eta', description: 'Op dag 7 van de boekenclub kreeg ik zeven boekjes cadeau.', archived: true },
      { id: "8", name: 'Boekje Theta', description: 'Op dag 8 van de boekenclub kreeg ik acht boekjes cadeau.', archived: true },
      { id: "9", name: 'Boekje Iota', description: 'Op dag 9 van de boekenclub kreeg ik negen boekjes cadeau.', archived: true },
      { id: "10", name: 'Boekje Kappa', description: 'Op dag 10 van de boekenclub kreeg ik tien boekjes cadeau.', archived: true }
    ];

    const income = [
      { id: 1, cash: 500, name: 'Inkomst Alpha', description: 'Op dag 1 van de boekenclub kreeg ik 100 euro cadeau.', category: 'Gift', date: new Date('2023/4/1')},
      { id: 2, cash: 200, name: 'Inkomst Beta', description: 'Op dag 2 van de boekenclub kreeg ik 200 euro cadeau.', category: 'Gift', date: new Date('2023/5/1') },
      { id: 3, cash: 300, name: 'Inkomst Gamma', description: 'Op dag 3 van de boekenclub kreeg ik 300 euro cadeau.', category: 'Gift', date: new Date('2023/6/1') },
      { id: 4, cash: 400, name: 'Inkomst Delta', description: 'Op dag 4 van de boekenclub kreeg ik 400 euro cadeau.', category: 'Gift', date: new Date('2023/7/1')},
      { id: 5, cash: 500, name: 'Inkomst Epsilon', description: 'Op dag 5 van de boekenclub kreeg ik 500 euro cadeau.', category: 'Gift', date: new Date('2023/8/1')},
      { id: 6, cash: 600, name: 'Inkomst Zeta', description: 'Op dag 6 van mijn werk kreeg ik 600 euro.', category: 'Work', date: new Date('2023/9/1')},
      { id: 7, cash: 700, name: 'Inkomst Eta', description: 'Op dag 7 van mijn werk kreeg ik 700 euro.', category: 'Work', date: new Date('2023/10/1')},
      { id: 8, cash: 800, name: 'Inkomst Theta', description: 'Op dag 8 van mijn werk kreeg ik 800 euro.', category: 'Work', date: new Date('2023/11/1')},
      { id: 9, cash: 900, name: 'Inkomst Iota', description: 'Op dag 9 van mijn werk kreeg ik 900 euro', category: 'Work', date: new Date('2023/12/1')},
      { id: 10, cash: 1000, name: 'Inkomst Kappa', description: 'Op dag 10 van mijn werk kreeg ik 1000 euro.', category: 'Work', date: new Date('2024/1/1')},
      { id: 11, cash: -100, name: 'Uitgave Lambda', description: '5 personen aangereden.', category: 'Claim', date: new Date('2024/2/1')},
      { id: 12, cash: -200, name: 'Uitgave Mu', description: '10 personen aangereden.', category: 'Claim', date: new Date('2023/4/1')},
      { id: 13, cash: -300, name: 'Uitgave Nu', description: '1872 Lincon postzegel', category: 'Postzegels', date: new Date('2023/4/1')},
    ];

    const categories = [
      { id: 1, name: 'Gift', description: 'Geschenk van Henk', incomes: income.filter(x => x.category === 'Gift')},
      { id: 2, name: 'Work', description: 'Werken voor de moneys', incomes: income.filter(x => x.category === 'Work') },
      { id: 3, name: 'Claim', description: 'Schadeclaims', incomes: income.filter(x => x.category === 'Claim') },
      { id: 4, name: 'Postzegels', description: 'Postzegels', incomes: income.filter(x => x.category === 'Postzegels') }
    ];

    return {boekjes, income, categories};
  }
}
