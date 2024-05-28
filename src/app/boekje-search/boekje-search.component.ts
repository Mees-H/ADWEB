import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Boekje } from '../models/boekje';
import { BoekjeService } from '../services/boekje.service';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-boekje-search',
  standalone: true,
  imports: [ RouterModule, NgFor, AsyncPipe],
  templateUrl: './boekje-search.component.html',
  styleUrls: [ './boekje-search.component.css' ]
})
export class BoekjeSearchComponent implements OnInit {
  boekjes$!: Observable<Boekje[]>;
  private searchTerms = new Subject<string>();

  constructor(private boekjeService: BoekjeService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.boekjes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.boekjeService.searchBoekjes(term)),
    );
  }
}