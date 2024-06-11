import {AfterViewInit, Component, ElementRef} from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';
import { Category } from '../models/category';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {ChartData} from "chart.js";
import {Income} from "../models/income";
import {IncomeService} from "../services/income.service";
import { max } from 'rxjs';
import { Boekje } from '../models/boekje';
import { BoekjeService } from '../services/boekje.service';

@Component({
  selector: 'app-categories',
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements AfterViewInit {
  constructor(private categoryService: CategoryService, private incomeService: IncomeService, private messageService: MessageService, private boekjeService: BoekjeService) { }

  categories: Category[] = [];
  incomes: Income[] = [];
  boekjes: Boekje[] = [];
  selectedBoekje: string = "1";

  public barChartData : ChartData = {datasets:[], labels: []};
  public budgetBarChartData : ChartData = {datasets:[], labels: []};
  public lineGraphData : ChartData = {datasets:[], labels: []};

  name = '';
  description = '';
  max_budget = '';
  end_date = '';

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.getBoekjes();
  }

  ngAfterViewInit(): void {
    this.getCategories();
  }

  getBoekjes(): void {
    this.boekjeService.getBoekjes().subscribe(boekjes => this.boekjes = boekjes);
  }

  getBarColors(budgets: number[], maxBudgets: number[]): string[] {
    return budgets.map((budget, index) => {
      if (budget > 0 && budget <= maxBudgets[index] * 0.1) {
        return 'yellow';
      } else if (budget <= 0) {
        return 'red';
      } else {
        return 'blue';
      }
    });
  }

  updateTotalsChart() : void{

    let totals = this.getTotals();
    let totalBudgets = this.getTotalBudgets(totals);

    this.barChartData = {datasets:[
      {data: totals, label: 'Uitgaven per categorie'}
    ], labels: this.categories.map(c => c.name)};

    this.budgetBarChartData = {datasets:[
      {data: totalBudgets, label: 'Budget over per categorie', backgroundColor: this.getBarColors(totalBudgets, this.categories.map(c => c.max_budget))}
    ], labels: this.categories.map(c => c.name)};
      
  }

  getTotalBudgets(totals: number[]): number[] {
    let totalBudgets : number[] = []
    for (let i = 0; i < this.categories.length; i++) {
      totalBudgets.push(this.categories[i].max_budget + totals[i])
    }
    return totalBudgets;
  }

  getTotals(): number[] {
    let totals : number[] = []
    for (let i = 0; i < this.categories.length; i++) {
      let total = 0
      let incomesInCategory = this.incomes.filter(x => x.category === this.categories[i].name);

      for (let j = 0; j < incomesInCategory.length; j++) {
        total += incomesInCategory[j].cash
      }
      totals.push(total)
    }
    return totals
  }

  getListOfMonths(from: Date, to : Date) : string[]{
    let months :string[] = []
    let month = from.getMonth()
    let year = from.getFullYear()
    while(month <= to.getMonth() || year < to.getFullYear()){
      months.push(`${year}/${month + 1}`)
      month++
      if(month >= 12) {
        year++
        month = 0
      }
    }
    return months
  }

  updateTotalsPerMonthChart(){
    let totalsPerCategory: { category: Category, totalsPerMonth: number[] }[] = []

    const currDate = new Date()
    let lowestDate = currDate

    for (let i = 0; i < this.incomes.length; i++) {
      const date = new Date(this.incomes[i].date)
      if (date < lowestDate) {
        lowestDate = date
      }
    }

    let months: string[] = this.getListOfMonths(lowestDate, currDate)

    for (let i = 0; i < this.categories.length; i++) {
      let totals : number[] = []
      let incomesInCategory = this.incomes.filter(x => x.category === this.categories[i].name);

      for (let j = 0; j < months.length; j++) {
        let totalForThisMonth = 0
        let transactions = incomesInCategory.filter(x => `${new Date(x.date).getFullYear()}/${new Date(x.date).getMonth() + 1}` === months[j])
        for (let k = 0; k < transactions.length; k++) {
          totalForThisMonth += transactions[k].cash
        }
        totals.push(totalForThisMonth)
      }
      totalsPerCategory.push({category: this.categories[i], totalsPerMonth: totals})
    }

    let datasets: { data: number[]; label: string; }[] = [];
    for (let i = 0; i < totalsPerCategory.length; i++) {
      datasets.push({data: totalsPerCategory[i].totalsPerMonth, label: totalsPerCategory[i].category.name})
    }
    this.lineGraphData = {datasets: datasets, labels: months};
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories
      this.updateTotalsChart()
      this.updateTotalsPerMonthChart()
    })
    this.incomeService.getIncomes(this.selectedBoekje).subscribe(incomes => {
      this.incomes = incomes
      this.updateTotalsChart()
      this.updateTotalsPerMonthChart()
    })
  }

  add(name: string, description: string, max_budget: string, end_date: string | null): void {
    name = name.trim();
    description = description.trim();
    const max_budgetNumber = Number(max_budget);
    const end_dateDate = end_date ? new Date(end_date).toISOString().split('T')[0]: null;
    this.errorMessages = [];
    if (!name) { this.errorMessages.push('Naam is verplicht.'); }
    if (!description) { this.errorMessages.push('Categorie is verplicht.'); }
    if (!max_budget) { this.errorMessages.push('Maximale budget is verplicht.'); }
    if (max_budgetNumber <= 0) { this.errorMessages.push('Maximale budget moet groter zijn dan 0.'); }
    if (this.errorMessages.length > 0) { return; }
    this.categoryService.addCategory({ name, description, max_budget: max_budgetNumber, end_date: end_dateDate } as Category)

    // Clear the form
    this.name = '';
    this.description = '';
    this.max_budget = '';
    this.end_date = '';
  }
}
