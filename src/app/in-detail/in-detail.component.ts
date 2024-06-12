import { Component, Input } from '@angular/core';
import { IncomeService } from '../services/income.service';
import { Income } from '../models/income';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-in-detail',
  templateUrl: './in-detail.component.html',
  styleUrl: './in-detail.component.css'
})
export class InDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private incomeService: IncomeService,
    private location: Location
  ) { }

  errorMessages: string[] = [];

  @Input() inkomst? : Income;

  ngOnInit(): void {
    this.getIncome();
  }

  getIncome(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? "";

    let observable = this.incomeService.getIncome(id)
    if (observable) {
      observable.subscribe({
        next: transaction => {
          if (transaction) {
            this.inkomst = transaction
          }
        },
        error: error => this.errorMessages.push(error)
      });
    }
  }

  save(): void {
    if (this.inkomst) {
      this.incomeService.updateIncome(this.inkomst)
    }
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {
    if (this.inkomst) {
      this.incomeService.deleteIncome(this.inkomst.id)
    }
  }
}
