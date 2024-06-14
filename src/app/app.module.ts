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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import {ErrorComponent} from "./error/error.component";


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
    BaseChartDirective,
    ErrorComponent
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
    CategoryDetailComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [DatePipe, provideFirebaseApp(() => initializeApp({
    "projectId": "adweb-cc478",
    "appId": "1:132154462752:web:5c4c2fea7a71c9f57f2245",
    "storageBucket": "adweb-cc478.appspot.com",
    "apiKey": "AIzaSyDYxfSleOSxM9EAz1eiZRAI6h30RxC5Cm4",
    "authDomain": "adweb-cc478.firebaseapp.com",
    "messagingSenderId": "132154462752",
    "measurementId": "G-E0X9Z71VCE"
  })), provideAuth(() => getAuth())]
})
export class AppModule { }

