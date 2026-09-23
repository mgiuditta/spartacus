/**
 * STEP 11 - Registrazione della feature lazy 'cart'
 * Ispirato a: feature-libs/cart/base/root/cart-base-root.module.ts
 *   (provideDefaultConfig({ featureModules: { [CART_BASE_FEATURE]: { cmsComponents: [...] } } }))
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { CMS_MAPPING_RESOLVERS } from '../step09-page-layout/cms-components.service';
import { CART_FEATURE } from './cart/active-cart.facade';
import { LazyCmsMappingResolver } from './lazy-cms-mapping.resolver';
import { MiniCartComponent } from './mini-cart.component';

export function provideLazyCartFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideDefaultConfig({
      featureModules: {
        [CART_FEATURE]: {
          // import() dinamico = chunk separato generato dal bundler (esbuild)
          module: () => import('./cart/cart-feature').then((m) => m.cartFeature),
          cmsComponents: ['ProductAddToCartComponent', 'CartComponent'],
        },
      },
      // Il mini-cart e' eager (sta nell'header di ogni pagina), ma parla col facade proxy.
      cmsComponents: {
        MiniCartComponent: { component: MiniCartComponent },
      },
    }),
    { provide: CMS_MAPPING_RESOLVERS, useExisting: LazyCmsMappingResolver, multi: true },
  ]);
}
