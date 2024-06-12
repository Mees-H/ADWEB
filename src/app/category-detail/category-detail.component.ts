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

  incomesCash : number = 0;
  validationMessages: string[] = [];
  errorMessages: string[] = [];

  ngOnInit(): void {
    this.setCategory();
  }

  setCategory(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? "";
    let observable = this.categoryService.getCategory(id);
    if(observable){
      observable.subscribe(category => {
        if(category) {
          this.category = category;
          // ensure this.category is not null
          this.setIncomesCash();
        }
      });
    }
  }

  setIncomesCash(): void {
    if (this.category) {
      this.categoryService.getIncomesCash(this.category.name).subscribe(incomesCash => {
        console.log(incomesCash);
        this.incomesCash = incomesCash;
      });
    }
  }

  save(): void {
    if (this.category) {
      //validate
      this.validationMessages = [];
      if (!this.category.name) { this.validationMessages.push('Naam is verplicht.'); }
      if (!this.category.description) { this.validationMessages.push('Categorie is verplicht.'); }
      if (!this.category.max_budget) { this.validationMessages.push('Maximale budget is verplicht.'); }
      if (this.category.max_budget <= 0) { this.validationMessages.push('Maximale budget moet groter zijn dan 0.'); }
      // check if the max_budget is more than the total income in that category
      if (this.category) {
        if ((this.category.max_budget + this.incomesCash < 0)) {
          this.validationMessages.push('Maximale budget moet groter zijn dan de inkomsten min de uitgaven (' + this.incomesCash + ') in deze categorie.');
        }
      }

      if (this.validationMessages.length > 0) { return; }
      // update all incomes with this category
      this.categoryService.updateCategory(this.category)
      this.goBack();
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
    this.goBack();
  }

}
