import { Component } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { Income } from '../models/income';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrl: './in.component.css'
})
export class InComponent {

  constructor(private incomeService: IncomeService) { }

  ngOnInit() {
    this.getIncomes();
    this.getTotalIncome();
  }

  incomes: Income[] = [];
  totalIncome: number = 0;

  getIncomes(): void {
    this.incomeService.getIncomes().subscribe(incomes => this.incomes = incomes);
  }

  getTotalIncome(): void {
    this.incomeService.getIncomes().subscribe(incomes => {
      this.totalIncome = incomes.reduce((acc, income) => acc + income.cash, 0);
    });
  }
  
  add(name: string, cash: string, description: string, category: string): void {
    name = name.trim();
    description = description.trim();
    category = category.trim();
    const cashNumber = Number(cash);
    if (!cash || !name || !description || !category) { return; }
    this.incomeService.addIncome({ cash: cashNumber, name, description, category } as Income)
      .subscribe(income => {
        this.incomes.push(income);
      });
    this.getTotalIncome();
  }
}
