import { Component, OnInit } from '@angular/core';
import { Boekje } from '../boekje';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoekjeDetailComponent } from '../boekje-detail/boekje-detail.component';
import { BoekjeService } from '../services/boekje.service';
import { MessageService } from '../services/message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boekjes-archived',
  templateUrl: './boekjes-archived.component.html',
  styleUrl: './boekjes-archived.component.css'
})


export class BoekjesComponentArchived {

  constructor(private boekjeService: BoekjeService, private messageService: MessageService) { }

  ngOnInit() {
    this.getBoekjesArchived();
  }

  boekjes: Boekje[] = [];

  getBoekjesArchived(): void {
    this.boekjeService.getBoekjesArchived().subscribe(boekjes => this.boekjes = boekjes);
  }
}
