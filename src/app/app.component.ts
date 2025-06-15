import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from "./pages/layout/layout.component";


@Component({
  selector: 'app-root',
  imports: [ButtonModule, LayoutComponent , RouterOutlet , LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'education';
}
