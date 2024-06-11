import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { BoekjesComponent } from './boekjes/boekjes.component';
import { BoekjeDetailComponent } from './boekje-detail/boekje-detail.component';
import { BoekjesComponentArchived } from './boekjes-archived/boekjes-archived.component';
import { CategoriesComponent } from './categories/categories.component';
import { InComponent } from './in/in.component';
import { InDetailComponent } from './in-detail/in-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import {BaseChartDirective} from "ng2-charts";
import { delay } from 'rxjs';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    DashboardComponent,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}

    ),
    BaseChartDirective
  ],
  declarations: [
    AppComponent,
    BoekjesComponent,
    BoekjeDetailComponent,
    BoekjesComponentArchived,
    MessagesComponent,
    InComponent,
    InDetailComponent,
    CategoriesComponent,
    CategoryDetailComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ DatePipe ]
})
export class AppModule { }

