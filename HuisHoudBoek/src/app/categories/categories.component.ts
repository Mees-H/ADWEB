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
    this.barChartData = {datasets:[
      {data: this.categories.map(c => c.id), label: 'Categories'}
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
