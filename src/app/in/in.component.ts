import { Component } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { Income } from '../models/income';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Boekje } from '../models/boekje';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrl: './in.component.css'
})
export class InComponent {

  boekjeId = "0";

  constructor(private incomeService: IncomeService, private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.boekjeId = String(this.route.snapshot.paramMap.get('id'));
    this.getPositiveIncomes(this.boekjeId);
    this.getNegativeIncomes(this.boekjeId);
    this.getTotalPositiveIncome(this.boekjeId);
    this.getTotalNegativeIncome(this.boekjeId);
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

  getPositiveIncomes(boekjeId: string): void {
    this.incomeService.getIncomes(boekjeId).subscribe(positiveIncomes => this.positiveIncomes = positiveIncomes.filter(income => income.cash > 0));
  }

  getNegativeIncomes(boekjeId: string): void {
    this.incomeService.getIncomes(boekjeId).subscribe(negativeIncomes => this.negativeIncomes = negativeIncomes.filter(income => income.cash < 0));
  }

  getTotalPositiveIncome(boekjeId: string): void {
    this.incomeService.getIncomes(boekjeId).subscribe(positiveIncomes => this.totalPositiveIncome = positiveIncomes.filter(income => income.cash > 0).reduce((acc, income) => acc + income.cash, 0));
  }

  getTotalNegativeIncome(boekjeId: string): void {
    this.incomeService.getIncomes(boekjeId).subscribe(negativeIncomes => this.totalNegativeIncome = negativeIncomes.filter(income => income.cash < 0).reduce((acc, income) => acc + income.cash, 0));
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
    this.getTotalPositiveIncome(this.boekjeId);
    this.getTotalNegativeIncome(this.boekjeId);
    this.getCategories();
  }
}
