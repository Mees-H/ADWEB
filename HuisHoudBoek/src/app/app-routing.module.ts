import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BoekjesComponent } from './boekjes/boekjes.component';
import { BoekjeDetailComponent } from './boekje-detail/boekje-detail.component';
import { BoekjesComponentArchived } from './boekjes-archived/boekjes-archived.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: BoekjeDetailComponent },
  { path: 'boekjes', component: BoekjesComponent},
  { path: 'boekjes-archived', component: BoekjesComponentArchived}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


