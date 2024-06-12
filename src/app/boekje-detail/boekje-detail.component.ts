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
  newUserMail: string = "";
  errorMessages: string[] = [];

  ngOnInit(): void {
    this.getBoekje();
  }

  getBoekje(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? "";

    let observableBoekje = this.boekjeService.getBoekje(id);
    if(observableBoekje) {
      observableBoekje.subscribe(boekje => {
        if(boekje){
          this.boekje = boekje
        }

      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.boekje) {
      this.boekjeService.updateBoekje(this.boekje)
    }
  }

  removeUser(userMail: string) {
    if(this.boekje) {
      this.boekje.userIds = this.boekje.userIds.filter(id => id !== userMail);
    }
  }

  addUser() {
    if(this.boekje) {
      this.boekje.userIds.push(this.newUserMail);
      this.newUserMail = "";
    }
  }
}
