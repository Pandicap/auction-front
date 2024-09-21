import { Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { RegistrationComponent } from './routes/registration/registration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuctionsListComponent } from './routes/auctions-list/auctions-list.component';
import { PersonalAuctionsComponent } from './routes/personal-auctions/personal-auctions.component';
import { PersonalBidsComponent } from './routes/personal-bids/personal-bids.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'auction',
    component: DashboardComponent,
    children: [
      { path: 'auctions-list', component: AuctionsListComponent },
      { path: '', redirectTo: 'auctions-list', pathMatch: 'full' },
      { path: 'my-auctions', component: PersonalAuctionsComponent },
      { path: 'my-bids', component: PersonalBidsComponent },
    ],
  },
];
