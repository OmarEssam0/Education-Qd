import { Component, inject, isDevMode } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/backend/auth/services';
@Component({
  selector: 'app-login',
  imports: [InputTextModule, PasswordModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  value!: string;
  isLogin: boolean = false;
  detailErrMsg!: string;
  readonly #router = inject(Router);
  readonly #authServices = inject(AuthService);

  logIn: FormGroup = new FormGroup({
    email: new FormControl<string | undefined>(
      isDevMode() ? 'Admins.Qualidev@Qualidev-tech.com' : undefined
    ),
    password: new FormControl<string | undefined>(
      isDevMode() ? 'P@ssw0rd1234' : undefined
    ),
  });

  login() {
    this.isLogin = true;
    const BODY = this.logIn.value;
    this.#authServices
      .apiAuthLoginPost({
        body: BODY,
      })
      .subscribe({
        next: (res) => {
          this.isLogin = false;
          res.token ? localStorage.setItem('token', res.token) : null;
          this.#router.navigate(['/education']);
        },  error:(err) => {
         this.isLogin = false;
         this.detailErrMsg = err.error.detail;
       }
      });
  }
}
