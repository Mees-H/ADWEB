import {AfterViewInit, Component, ElementRef} from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';
import { Category } from '../models/category';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {ChartData} from "chart.js";
import {Income} from "../models/income";
import {IncomeService} from "../services/income.service";

@Component({
  selector: 'app-categories',
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements AfterViewInit {
  constructor(private categoryService: CategoryService, private incomeService: IncomeService, private messageService: MessageService, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.getCategories();
  }

  categories: Category[] = [];
  incomes: Income[] = [];
  public barChartData : ChartData = {datasets:[], labels: []};
  public lineGraphData : ChartData = {datasets:[], labels: []};

  updateTotalsChart() : void{
    let totals : number[] = []
    for (let i = 0; i < this.categories.length; i++) {
      let total = 0
      let incomesInCategory = this.incomes.filter(x => x.category === this.categories[i].name);

      for (let j = 0; j < incomesInCategory.length; j++) {
        total += incomesInCategory[j].cash
      }
      totals.push(total)
    }

    this.barChartData = {datasets:[
      {data: totals, label: 'Uitgaven per categorie'}
    ], labels: this.categories.map(c => c.name)};
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

    for (let i = 0; i < this.categories.length; i++) {
      for (let j = 0; j < this.categories[i].incomes.length; j++) {
        const date = new Date(this.categories[i].incomes[j].date)
        if(date < lowestDate){
          lowestDate = date
        }
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

    let datasets = []
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
    this.incomeService.getIncomes().subscribe(incomes => {
      this.incomes = incomes
      this.updateTotalsChart()
      this.updateTotalsPerMonthChart()
    })
  }

  add(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    if (!name || !description) { return; }
    this.categoryService.addCategory({ name, description } as Category)
      .subscribe(category => {
        this.categories.push(category);
      });
  }
}
