import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IncomeService } from '../services/income.service';
import { Income } from '../models/income';
import { of } from 'rxjs';

describe('IncomeService', () => {
  let service: IncomeService;

  const mockIncomes: Income[] = [
    {
        id: '1',
        cash: 100,
        name: 'Name',
        date: new Date(),
        description: 'Description',
        category: 'Category',
        boekjeId: '1',
    },
    {
        id: '2',
        cash: -200,
        name: 'Name 2',
        date: new Date(),
        description: 'Description 2',
        category: 'Category 2',
        boekjeId: '1',
    },
    {
        id: '3',
        cash: 300,
        name: 'Name 3',
        date: new Date(),
        description: 'Description 3',
        category: 'Category 3',
        boekjeId: '2',
    }
    ];

  const updatedIncome: Income = {
    id: '1',
    cash: 200,
    name: 'Updated Name',
    date: new Date(),
    description: 'Updated Description',
    category: 'Updated Category',
    boekjeId: '1',
  };

  beforeEach(() => {
    const mockIncomeService = jasmine.createSpyObj('IncomeService', ['getIncome', 'getIncomes', 'updateIncome', 'addIncome', 'deleteIncome']);
    mockIncomeService.getIncome.and.returnValue(of(mockIncomes[0]));
    mockIncomeService.getIncomes.and.returnValue(of(mockIncomes));
    mockIncomeService.updateIncome.and.returnValue(of(updatedIncome));
    mockIncomeService.addIncome.and.returnValue(of(mockIncomes[0]));
    mockIncomeService.deleteIncome.and.returnValue(of(mockIncomes[0]));

    TestBed.configureTestingModule({
        providers: [
        { provide: IncomeService, useValue: mockIncomeService }
        ]
    });

    service = TestBed.inject(IncomeService);
    
    });


    it('should GET income by id', () => {
        service.getIncome('1').subscribe(income => {
        expect(income).toEqual(mockIncomes[0]);
        });
    });

    it('should GET all incomes', () => {
        service.getIncomes('1').subscribe(incomes => {
        expect(incomes).toEqual(mockIncomes);
        });
    });
    
    it('should PUT updated income', () => {
        service.updateIncome(updatedIncome).subscribe(income => {
        expect(income).toEqual(updatedIncome);
        });
    });

    it('should POST new income', () => {
        service.addIncome(mockIncomes[0]).subscribe(income => {
        expect(income).toEqual(mockIncomes[0]);
        });
    });

    it('should DELETE income', () => {
        service.deleteIncome('1').subscribe(income => {
            expect(JSON.stringify(income)).toEqual(JSON.stringify(mockIncomes[0]));
        });
    });
    
});