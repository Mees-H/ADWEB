import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';
import { Category } from '../models/category';
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {ChartData} from "chart.js";

@Component({
  selector: 'app-categories',
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements AfterViewInit {
  constructor(private categoryService: CategoryService, private messageService: MessageService, private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.getCategories();
  }

  categories: Category[] = [];
  public barChartData : ChartData = {datasets:[], labels: []};
  public lineGraphData : ChartData = {datasets:[], labels: []};

  updateTotalsChart() : void{
    let totals : number[] = []

    for (let i = 0; i < this.categories.length; i++) {
      let total = 0
      for (let j = 0; j < this.categories[i].incomes.length; j++) {
        total += this.categories[i].incomes[j].cash
        total += this.categories[i].incomes[j].cash
      }
      totals.push(total)
    }

    this.barChartData = {datasets:[
      {data: totals, label: 'Uitgaven per categorie'}
    ], labels: this.categories.map(c => c.name)};
  }

  updateTotalsPerMonthChart(){
    let totalsPerCategory: { category: Category, totalsPerMonth: number[] }[] = []
    let months: string[] = []

    const currDate = new Date()
    const currMonth = new Date(`${currDate.getFullYear()}/${currDate.getMonth()}/1`)
    let lowestDate = currDate

    for (let i = 0; i < this.categories.length; i++) {
      for (let j = 0; j < this.categories[i].incomes.length; j++) {
        const date = new Date(this.categories[i].incomes[j].date)
        // console.log(`date: ${new Date(date).getFullYear()}`)
        // const dateString : string = `${date.getFullYear()}/${date.getMonth()}`
        // if(!months.includes(dateString)) months.push(dateString)
        if(date < lowestDate){
          lowestDate = date
        }
      }
    }

    let month = lowestDate.getMonth() - 1
    let year = lowestDate.getFullYear()
    while(month <= currMonth.getMonth() || year < currMonth.getFullYear()){
      months.push(`${year}/${month + 1}`)
      month++
      if(month >= 12) {
        year++
        month = 0
      }
    }


    for (let i = 0; i < this.categories.length; i++) {
      let totals : number[] = []
      for (let j = 0; j < months.length; j++) {
        let totalForThisMonth = 0
        let transactions = this.categories[i].incomes.filter(x => `${new Date(x.date).getFullYear()}/${new Date(x.date).getMonth()}` === months[j])
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
    this.lineGraphData = {datasets: datasets
      , labels: months};
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories
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
