import { Component, OnInit } from '@angular/core';
import { Boekje } from '../boekje';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoekjeDetailComponent } from '../boekje-detail/boekje-detail.component';
import { BoekjeService } from '../services/boekje.service';
import { MessageService } from '../services/message.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-boekjes',
  templateUrl: './boekjes.component.html',
  styleUrl: './boekjes.component.css'
})


export class BoekjesComponent {

  constructor(private boekjeService: BoekjeService, private messageService: MessageService) { }

  ngOnInit() {
    this.getBoekjes();
  }

  boekjes: Boekje[] = [];

  getBoekjes(): void {
    this.boekjeService.getBoekjes().subscribe(boekjes => this.boekjes = boekjes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.boekjeService.addBoekje({ name } as Boekje)
      .subscribe(boekje => {
        this.boekjes.push(boekje);
      });
  }

  delete(boekje: Boekje): void {
    this.boekjes = this.boekjes.filter(h => h !== boekje);
    this.boekjeService.deleteBoekje(boekje.id).subscribe();
  }
}
