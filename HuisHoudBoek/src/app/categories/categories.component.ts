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

  updateChart() : void{
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
      {data: totals, label: 'Categories'}
    ], labels: this.categories.map(c => c.name)};
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories
      this.updateChart()
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
