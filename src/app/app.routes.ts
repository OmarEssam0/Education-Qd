import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'education',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/dashboard pages/routes').then((m) => m.dashboardRoutes),
    canActivate: [authGuard],
  },
];
