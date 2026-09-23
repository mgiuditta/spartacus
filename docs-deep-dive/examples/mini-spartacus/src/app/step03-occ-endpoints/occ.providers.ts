/**
 * STEP 03 - Provider OCC
 * Ispirato a: core-libs/core/src/occ/base-occ.module.ts (BaseOccModule.forRoot -> provideDefaultConfig(defaultOccConfig))
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { defaultOccConfig } from './occ-config';

export function provideOcc(): EnvironmentProviders {
  return makeEnvironmentProviders([provideDefaultConfig(defaultOccConfig)]);
}
