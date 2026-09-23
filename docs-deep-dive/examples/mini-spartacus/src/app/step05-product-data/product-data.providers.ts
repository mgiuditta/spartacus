/**
 * STEP 05 - Registrazione di adapter e normalizer
 * Ispirato a: core-libs/core/src/occ/adapters/product/product-occ.module.ts (ProductOccModule)
 *
 * Per aggiungere un campo calcolato basta un altro provider:
 *   { provide: PRODUCT_NORMALIZER, useClass: MioNormalizer, multi: true }
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { OccProductAdapter, ProductAdapter } from './product.connector';
import { PRODUCT_NORMALIZER, ProductImageNormalizer, ProductNameNormalizer } from './product-normalizers';

export function provideProductData(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ProductAdapter, useClass: OccProductAdapter },
    { provide: PRODUCT_NORMALIZER, useExisting: ProductImageNormalizer, multi: true },
    { provide: PRODUCT_NORMALIZER, useExisting: ProductNameNormalizer, multi: true },
  ]);
}
