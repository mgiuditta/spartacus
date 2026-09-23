/**
 * STEP 04 - Provider dell'autenticazione
 * Ispirato a: core-libs/core/src/auth/user-auth/user-auth.module.ts (UserAuthModule.forRoot)
 * L'interceptor si registra in app.config.ts con withInterceptors([... authInterceptor ...]).
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { defaultAuthConfig } from './auth.model';

export function provideAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([provideDefaultConfig(defaultAuthConfig)]);
}
