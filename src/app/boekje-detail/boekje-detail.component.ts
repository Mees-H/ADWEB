import {Component, Input} from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Boekje} from '../models/boekje';
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
    const id = String(this.route.snapshot.paramMap.get('id'));
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
}