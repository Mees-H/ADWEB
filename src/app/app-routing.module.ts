import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BoekjesComponent } from './boekjes/boekjes.component';
import { BoekjeDetailComponent } from './boekje-detail/boekje-detail.component';
import { BoekjesComponentArchived } from './boekjes-archived/boekjes-archived.component';
import { InUitComponent } from './in-uit/in-uit.component';
import { CategoriesComponent } from './categories/categories.component';
import { InDetailComponent } from './in-detail/in-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'boekjes/:id', component: BoekjeDetailComponent },
  { path: 'boekjes', component: BoekjesComponent},
  { path: 'boekjes-archived', component: BoekjesComponentArchived},
  { path: 'boekjes/:id/in-uit/in/:id', component: InDetailComponent},
  { path: 'boekjes/:id/in-uit', component: InUitComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'categories/:id', component: CategoryDetailComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


