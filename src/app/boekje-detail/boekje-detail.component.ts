import {Component, Input, OnDestroy} from '@angular/core';
import {NgIf, UpperCasePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Boekje} from '../models/boekje';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BoekjeService } from '../services/boekje.service';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-boekje-detail',
  templateUrl: './boekje-detail.component.html',
  styleUrls: ['./boekje-detail.component.css'],
})
export class BoekjeDetailComponent implements OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private boekjeService: BoekjeService,
    private location: Location
  ) {}

  ngOnDestroy(): void {
    this.observableBoekje?.unsubscribe();
  }

  @Input() boekje?: Boekje;
  newUserMail: string = "";
  errorMessages: string[] = [];
  observableBoekje: Subscription | null = null;

  ngOnInit(): void {
    this.getBoekje();
  }

  getBoekje(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? "";

    let observableBoekje = this.boekjeService.getBoekje(id);
    if (this.observableBoekje) {
      this.observableBoekje = observableBoekje.subscribe({
        next: boekje => {
          if (boekje) {
            this.boekje = boekje
          }
        },
        error: error => {
          this.errorMessages.push(error);
          this.observableBoekje?.unsubscribe();
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
