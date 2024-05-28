import { Component } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { Income } from '../models/income';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Boekje } from '../models/boekje';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrl: './in.component.css'
})
export class InComponent {

  constructor(private incomeService: IncomeService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getPositiveIncomes();
    this.getNegativeIncomes();
    this.getTotalPositiveIncome();
    this.getTotalNegativeIncome();
    this.getCategories();
  }

  positiveIncomes: Income[] = [];
  negativeIncomes: Income[] = [];
  totalPositiveIncome: number = 0;
  totalNegativeIncome: number = 0;
  categories: Category[] = [];
  boekje: Boekje = {} as Boekje;

  hasPositiveIncomes(categoryName: string): boolean {
    return this.positiveIncomes.some(income => income.category === categoryName);
  }

  hasNegativeIncomes(categoryName: string): boolean {
    return this.negativeIncomes.some(income => income.category === categoryName);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  getPositiveIncomes(): void {
    this.incomeService.getIncomes().subscribe(positiveIncomes => this.positiveIncomes = positiveIncomes.filter(income => income.cash > 0));
  }

  getNegativeIncomes(): void {
    this.incomeService.getIncomes().subscribe(negativeIncomes => this.negativeIncomes = negativeIncomes.filter(income => income.cash < 0));
  }

  getTotalPositiveIncome(): void {
    this.incomeService.getIncomes().subscribe(positiveIncomes => this.totalPositiveIncome = positiveIncomes.filter(income => income.cash > 0).reduce((acc, income) => acc + income.cash, 0));
  }

  getTotalNegativeIncome(): void {
    this.incomeService.getIncomes().subscribe(negativeIncomes => this.totalNegativeIncome = negativeIncomes.filter(income => income.cash < 0).reduce((acc, income) => acc + income.cash, 0));
  }

  add(name: string, cash: string, description: string, category: string): void {
    name = name.trim();
    description = description.trim();
    category = category.trim();
    const cashNumber = Number(cash);
    const date = new Date();
    if (!cash || !name || !description || !category) { return; }
    this.incomeService.addIncome({ cash: cashNumber, name, date, description, category } as Income)
    // if (cashNumber >= 0) {
    //   this.incomeService.addIncome({ cash: cashNumber, name, date, description, category } as Income)
    //     .subscribe(income => {
    //       this.positiveIncomes.push(income);
    //     });
    // }
    // else {
    //   this.incomeService.addIncome({ cash: cashNumber, name, date, description, category } as Income)
    //     .subscribe(income => {
    //       this.negativeIncomes.push(income);
    //     });
    // }
    this.getTotalPositiveIncome();
    this.getTotalNegativeIncome();
    this.getCategories();
  }
}
