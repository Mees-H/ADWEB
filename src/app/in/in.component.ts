import { Component } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { Income } from '../models/income';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Boekje } from '../models/boekje';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrl: './in.component.css',
})
export class InComponent {

  boekjeId = "0";

  constructor(private incomeService: IncomeService, private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.boekjeId = String(this.route.snapshot.paramMap.get('id'));
    this.getPositiveIncomes(this.boekjeId);
    this.getNegativeIncomes(this.boekjeId);
    this.getCategories();
  }

  positiveIncomes: Income[] = [];
  negativeIncomes: Income[] = [];
  originalPositiveIncomes: Income[] = [];
  originalNegativeIncomes: Income[] = [];
  categories: Category[] = [];
  boekje: Boekje = {} as Boekje;
  months: string[] = [];
  selectedMonth: string = '';
  datePipe = new DatePipe('en-US');
  errorMessages: string[] = [];


  getUniqueMonths() {
    const allMonths = this.positiveIncomes.concat(this.negativeIncomes)
      .map(income => {
        const date = new Date(income.date);
        return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;
      });
    return [...new Set(allMonths)];
  }

  filterIncomesByMonth() {
    // Start with the original incomes
    this.positiveIncomes = [...this.originalPositiveIncomes];
    this.negativeIncomes = [...this.originalNegativeIncomes];

    // Filter incomes by selected month
    const selectedMonth = this.selectedMonth;
    this.positiveIncomes = this.positiveIncomes.filter(income => {
      const date = new Date(income.date);
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}` === selectedMonth;
    });
    this.negativeIncomes = this.negativeIncomes.filter(income => {
      const date = new Date(income.date);
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}` === selectedMonth;
    });
  }

  hasPositiveIncomes(categoryName: string): boolean {
    return this.positiveIncomes.some(income => income.category === categoryName);
  }

  hasNegativeIncomes(categoryName: string): boolean {
    return this.negativeIncomes.some(income => income.category === categoryName);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: categories => this.categories = categories,
      error: err => this.errorMessages.push(err)
  });
  }

  getPositiveIncomes(boekjeId: string): void {
    this.incomeService.getIncomes(boekjeId).subscribe({
      next: positiveIncomes => {
          this.positiveIncomes = positiveIncomes.filter(income => income.cash > 0);
          this.originalPositiveIncomes = [...this.positiveIncomes];
          this.months = this.getUniqueMonths();
        },
      error: err => this.errorMessages.push(err)
    });
  }

  getNegativeIncomes(boekjeId: string): void {
    this.incomeService.getIncomes(boekjeId).subscribe({
      next: negativeIncomes => {
        this.negativeIncomes = negativeIncomes.filter(income => income.cash < 0);
        this.originalNegativeIncomes = [...this.negativeIncomes];
        this.months = this.getUniqueMonths();
      },
      error: err => this.errorMessages.push(err)
    });
  }

  add(name: string, cash: string, description: string, category: string): void {
    name = name.trim();
    description = description.trim();
    category = category.trim();
    const cashNumber = Number(cash);
    const date = new Date();
    const boekjeId = this.boekjeId;
    if (!cash || !name || !description || !category || !boekjeId) { return; }
    this.incomeService.addIncome({ cash: cashNumber, name, date, description, category, boekjeId } as Income)
    this.getCategories();
  }
}
