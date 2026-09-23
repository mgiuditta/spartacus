/**
 * STEP 10 - provideOutlet: registra un COMPONENTE su un outlet senza scrivere template
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/outlet/outlet.providers.ts (provideOutlet, PROVIDE_OUTLET_OPTIONS)
 *  - core-libs/storefront/cms-structure/outlet/outlet.service.ts   (lettura delle opzioni registrate)
 */
import {
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  provideAppInitializer,
  Type,
} from '@angular/core';
import { OutletPosition } from './outlet.model';
import { OutletService } from './outlet.service';

export interface ProvideOutletOptions {
  id: string;
  component: Type<unknown>;
  position?: OutletPosition;
}

export const PROVIDE_OUTLET_OPTIONS = new InjectionToken<ProvideOutletOptions[]>('PROVIDE_OUTLET_OPTIONS');

export function provideOutlet(options: ProvideOutletOptions): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: PROVIDE_OUTLET_OPTIONS, useValue: options, multi: true }]);
}

/** Da includere una volta: all'avvio copia le opzioni registrate dentro OutletService. */
export function provideOutlets(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const outletService = inject(OutletService);
      for (const option of inject(PROVIDE_OUTLET_OPTIONS, { optional: true }) ?? []) {
        outletService.add(option.id, option.component, option.position);
      }
    }),
  ]);
}
