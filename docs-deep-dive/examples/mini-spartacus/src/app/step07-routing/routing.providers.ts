/**
 * STEP 07 - Provider del routing configurabile
 * Ispirato a: core-libs/core/src/routing/routing.module.ts (RoutingModule.forRoot: initializer che chiama
 *   ConfigurableRoutesService.init prima della navigazione iniziale)
 */
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { ConfigurableRoutesService } from './configurable-routes.service';
import { defaultRoutingConfig } from './routing-config';

export function provideConfigurableRoutes(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideDefaultConfig(defaultRoutingConfig),
    provideAppInitializer(() => inject(ConfigurableRoutesService).init()),
  ]);
}
