import { Routes } from '@angular/router';
import { HomepageComponent } from './features/homepage/homepage.component';
import { InsuranceDetailComponent } from './features/insurance-detail/insurance-detail.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'plan/:id', component: InsuranceDetailComponent }
];
