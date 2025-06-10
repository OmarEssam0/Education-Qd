import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [LoginComponent , ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'education';
}
