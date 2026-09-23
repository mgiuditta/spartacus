/**
 * STEP 06 - Registrazione del feature state "product"
 * Ispirato a: core-libs/core/src/product/store/product-store.module.ts
 *   (StoreModule.forFeature(PRODUCT_FEATURE, reducerToken) + EffectsModule.forFeature(effects))
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ProductEffects } from './product.effects';
import { PRODUCT_FEATURE, productReducers } from './product.reducer';

export function provideProductStore(): EnvironmentProviders {
  return makeEnvironmentProviders([provideState(PRODUCT_FEATURE, productReducers), provideEffects(ProductEffects)]);
}
