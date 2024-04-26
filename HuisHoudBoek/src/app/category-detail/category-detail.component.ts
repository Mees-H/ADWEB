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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategory(id)
      .subscribe(category => this.category= category);
  }

  save(): void {
    if (this.category) {
      // update all incomes with this category
      this.categoryService.updateCategory(this.category)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {
    if (this.category) {
      this.categoryService.deleteCategory(this.category.id)
        .subscribe(() => this.goBack());
    }
  }

}
