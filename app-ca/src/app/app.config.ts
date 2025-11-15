import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserRepository } from './user/domain/repositories/user.repository';
import { UserRepositoryImpl } from './user/infrastructure/repositories/user-impl.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl
    }
  ]
};
