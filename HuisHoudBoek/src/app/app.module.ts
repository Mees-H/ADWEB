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
      InMemoryDataService, { dataEncapsulation: false, delay: 2000 }
    )
  ],
  declarations: [
    AppComponent,
    BoekjesComponent,
    BoekjeDetailComponent,
    BoekjesComponentArchived,
    MessagesComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

