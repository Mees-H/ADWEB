import {Component, Input} from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Boekje} from '../boekje';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BoekjeService } from '../services/boekje.service';

@Component({
  selector: 'app-boekje-detail',
  templateUrl: './boekje-detail.component.html',
  styleUrls: ['./boekje-detail.component.css'],
})
export class BoekjeDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private boekjeService: BoekjeService,
    private location: Location
  ) {}

  @Input() boekje?: Boekje;

  ngOnInit(): void {
    this.getBoekje();
  }
  
  getBoekje(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.boekjeService.getBoekje(id)
      .subscribe(boekje => this.boekje = boekje);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.boekje) {
      this.boekjeService.updateBoekje(this.boekje)
        .subscribe(() => this.goBack());
    }
  }

  delete(boekje: Boekje): void {
    if(confirm("Are you sure you want to delete this boekje?")) {
      this.boekjeService.deleteBoekje(boekje.id).subscribe();
      this.goBack();
    }
  }
  
}