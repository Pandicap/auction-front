import { Routes } from '@angular/router';
import { LoginComponent } from './routes/login/login.component';
import { RegistrationComponent } from './routes/registration/registration.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
];
