import { Routes } from '@angular/router';
import { HomepageComponent } from './features/homepage/homepage.component';
import { InsuranceDetailComponent } from './features/insurance-detail/insurance-detail.component';
import { ClaimComponent } from './features/claim/claim.component';
import { ClaimNewComponent } from './features/claim-new/claim-new.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'plan/:id', component: InsuranceDetailComponent },
  { path: 'claims', component: ClaimComponent },
  { path: 'claims/new', component: ClaimNewComponent }
];
