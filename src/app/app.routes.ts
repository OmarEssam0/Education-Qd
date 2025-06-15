import { Routes } from '@angular/router';
import { HomeComponent } from './pages/dashboard pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CreateComponent } from './pages/dashboard pages/create/create.component';
import { ViewComponent } from './pages/dashboard pages/view/view.component';
import { MainComponent } from './pages/main/main.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'education', component: LayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'create', component: CreateComponent },
      { path: 'viewUnversity', component: ViewComponent },
      { path: 'dashboard', component: HomeComponent },
    ]
  },

];;
