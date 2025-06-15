import { Routes } from '@angular/router';
import { HomeComponent } from './pages/dashboard pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CreateComponent } from './pages/dashboard pages/create/create.component';
import { ViewComponent } from './pages/dashboard pages/view/view.component';

export const routes:  Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateComponent },
  { path: 'viewUnversity', component: ViewComponent },
];;
