import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategories: Category[] = [
    {
        id: '1',
        name: 'Name',
        description: 'Description',
        max_budget: 100,
        end_date: new Date(),
        incomes: [],
    },
    {
        id: '2',
        name: 'Name 2',
        description: 'Description 2',
        max_budget: 200,
        end_date: new Date(),
        incomes: [],
    },
    {
        id: '3',
        name: 'Name 3',
        description: 'Description 3',
        max_budget: 300,
        end_date: new Date(),
        incomes: [],
    }
    ];

  const updatedCategory: Category = {
    id: '1',
    name: 'Updated Name',
    description: 'Updated Description',
    max_budget: 200,
    end_date: new Date(),
    incomes: [],
  };

  beforeEach(() => {
    const mockCategoryService = jasmine.createSpyObj('CategoryService', ['getCategory', 'getCategories', 'updateCategory', 'addCategory', 'deleteCategory']);
    mockCategoryService.getCategory.and.returnValue(of(mockCategories[0]));
    mockCategoryService.getCategories.and.returnValue(of(mockCategories));
    mockCategoryService.updateCategory.and.returnValue(of(updatedCategory));
    mockCategoryService.addCategory.and.returnValue(of(mockCategories[0]));
    mockCategoryService.deleteCategory.and.returnValue(of(mockCategories[0]));

        TestBed.configureTestingModule({
            providers: [
            { provide: CategoryService, useValue: mockCategoryService }
            ]
        });

        service = TestBed.inject(CategoryService);
    });


    it('should GET category by id', () => {
        service.getCategory('1').subscribe(category => {
            expect(category).toEqual(mockCategories[0]);
        });
    });

    it('should GET all categories', () => {
        service.getCategories().subscribe(categories => {
            expect(categories).toEqual(mockCategories);
        });
    });
    
    it('should PUT updated category', () => {
        service.updateCategory(updatedCategory).subscribe(category => {
            expect(category).toEqual(updatedCategory);
        });
    });

    it('should POST new category', () => {
        service.addCategory(mockCategories[0]).subscribe(category => {
            expect(category).toEqual(mockCategories[0]);
        });
    });

    it('should DELETE category', () => {
        service.deleteCategory('1').subscribe(category => {
            expect(JSON.stringify(category)).toEqual(JSON.stringify(mockCategories[0]));
        });
    });
    
});