import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BoekjesComponent } from './boekjes/boekjes.component';
import { BoekjeDetailComponent } from './boekje-detail/boekje-detail.component';
import { BoekjesComponentArchived } from './boekjes-archived/boekjes-archived.component';
import { InUitComponent } from './in-uit/in-uit.component';
import { CategoriesComponent } from './categories/categories.component';
import { InDetailComponent } from './in-detail/in-detail.component';
import { UitDetailComponent } from './uit-detail/uit-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'boekjes/:id', component: BoekjeDetailComponent },
  { path: 'boekjes', component: BoekjesComponent},
  { path: 'boekjes-archived', component: BoekjesComponentArchived},
  { path: 'in-uit/in/:id', component: InDetailComponent},
  { path: 'in-uit/uit/:id', component: UitDetailComponent},
  { path: 'in-uit', component: InUitComponent},
  { path: 'categories', component: CategoriesComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


