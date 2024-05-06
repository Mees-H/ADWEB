import { Component } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { Income } from '../models/income';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrl: './in.component.css'
})
export class InComponent {

  constructor(private incomeService: IncomeService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getIncomes();
    this.getTotalIncome();
    this.getCategories();
  }

  incomes: Income[] = [];
  totalIncome: number = 0;
  categories: Category[] = [];

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }
  
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
    const date = new Date();
    if (!cash || !name || !description || !category) { return; }
    this.incomeService.addIncome({ cash: cashNumber, name, date, description, category } as Income)
      .subscribe(income => {
        this.incomes.push(income);
      });
    this.getTotalIncome();
    this.getCategories();
  }
}
