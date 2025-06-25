import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { environment } from '../../enviroment/environment';
import { DashboardApiModule } from './core/backend/dashboard/dashboard-api.module';
import { AuthApiModule } from './core/backend/auth/auth-api.module';
import { headeresInterceptor } from './core/interceptor/headeres.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { CommonApiModule } from './core/backend/Common/common-api.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideHttpClient(withFetch() , withInterceptors([headeresInterceptor])),
    importProvidersFrom(
      CookieService,
      DashboardApiModule.forRoot({
        rootUrl: environment.api,
      }),
      AuthApiModule.forRoot({
        rootUrl: environment.api,
      }),
      CommonApiModule.forRoot({
        rootUrl: environment.api,
      })
    ),
  ],
};
