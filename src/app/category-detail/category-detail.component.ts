import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Location } from '@angular/common';
import { IncomeService } from '../services/income.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private incomeService: IncomeService,
    private location: Location
  ) { }

  @Input() category? : Category;

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? "";
    let observable = this.categoryService.getCategory(id);
    if(observable){
      observable.subscribe(category => {
        if(category) {
          this.category = category;
          if (this.category.end_date) {
            let timestamp = this.category.end_date as any;
            this.category.end_date = timestamp.toDate();
          }
        }
      });
    }
  }

  save(): void {
    if (this.category) {
      // update all incomes with this category
      this.categoryService.updateCategory(this.category)
    }
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {
    if (this.category && this.category.id) {
      this.categoryService.deleteCategory(this.category.id)
      // also delete all matching incomes
      this.incomeService.deleteIncomesByCategory(this.category.name)
    }
  }

}
