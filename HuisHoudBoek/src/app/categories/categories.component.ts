import { Component } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  constructor(private categoryService: CategoryService, private messageService: MessageService) { }

  ngOnInit() {
    this.getCategories();
  }

  categories: Category[] = [];

  getCategories(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
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
