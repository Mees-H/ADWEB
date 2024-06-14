import {Component, Input, OnDestroy} from '@angular/core';
import { IncomeService } from '../services/income.service';
import { Income } from '../models/income';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-in-detail',
  templateUrl: './in-detail.component.html',
  styleUrl: './in-detail.component.css'
})
export class InDetailComponent implements OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private incomeService: IncomeService,
    private location: Location
  ) { }

  ngOnDestroy(): void {
    this.observableIncome?.unsubscribe();
  }

  errorMessages: string[] = [];
  observableIncome: Subscription | null = null;

  @Input() inkomst? : Income;

  ngOnInit(): void {
    this.getIncome();
  }

  getIncome(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? "";

    let observable = this.incomeService.getIncome(id)
    if (observable) {
      this.observableIncome = observable.subscribe({
        next: transaction => {
          if (transaction) {
            this.inkomst = transaction
          }
        },
        error: error => {
          this.observableIncome?.unsubscribe();
          this.errorMessages.push(error)
        }
      });
    }
  }

  save(): void {
    if (this.inkomst) {
      this.incomeService.updateIncome(this.inkomst)
      this.goBack();
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
