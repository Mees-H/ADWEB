import {Component, OnDestroy, OnInit} from '@angular/core';
import { Boekje } from '../models/boekje';
import { BoekjeService } from '../services/boekje.service';
import { NgFor } from '@angular/common';
import { BoekjeSearchComponent } from '../boekje-search/boekje-search.component';
import { RouterModule } from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [ BoekjeSearchComponent, RouterModule, NgFor ],
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy{
  boekjes: Boekje[] = [];
  observableBoekjes: Subscription | null = null;

  constructor(private boekjeService: BoekjeService) { }

  ngOnDestroy(): void {
    this.observableBoekjes?.unsubscribe();
  }

  ngOnInit(): void {
    this.getBoekjes();
  }

  getBoekjes(): void {
    this.observableBoekjes = this.boekjeService.getBoekjes()
      .subscribe({
        next:boekjes => this.boekjes = boekjes.slice(1, 5),
        error: error => {
          this.observableBoekjes?.unsubscribe();
        }
  });
  }
}
