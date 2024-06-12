import { Component, OnInit } from '@angular/core';
import { Boekje } from '../models/boekje';
import { BoekjeService } from '../services/boekje.service';
import { NgFor } from '@angular/common';
import { BoekjeSearchComponent } from '../boekje-search/boekje-search.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [ BoekjeSearchComponent, RouterModule, NgFor ],
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  boekjes: Boekje[] = [];

  constructor(private boekjeService: BoekjeService) { }

  ngOnInit(): void {
    this.getBoekjes();
  }

  getBoekjes(): void {
    this.boekjeService.getBoekjes()
      .subscribe(boekjes => this.boekjes = boekjes.slice(1, 5));
  }
}
