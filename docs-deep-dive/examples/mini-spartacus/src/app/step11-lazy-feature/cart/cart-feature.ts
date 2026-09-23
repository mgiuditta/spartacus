/**
 * STEP 11 - Punto d'ingresso del chunk lazy 'cart'
 * Ispirato a:
 *  - feature-libs/cart/base/cart-base.module.ts          (modulo caricato in lazy: core + occ + componenti)
 *  - feature-libs/cart/base/root/cart-base-root.module.ts (featureModules: { cartBase: { module: () => import(...), cmsComponents: [...] } })
 *
 * Tutto cio' che e' importato SOLO da qui finisce nel chunk separato.
 */
import { FeatureDefinition } from '../feature-modules';
import { ActiveCartFacade } from './active-cart.facade';
import { ActiveCartService } from './active-cart.service';
import { AddToCartComponent, CartDetailsComponent } from './cart.components';

export const cartFeature: FeatureDefinition = {
  providers: [ActiveCartService, { provide: ActiveCartFacade, useExisting: ActiveCartService }],
  cmsComponents: {
    ProductAddToCartComponent: { component: AddToCartComponent },
    CartComponent: { component: CartDetailsComponent },
  },
};
