/**
 * STEP 11 - Facade "root" del carrello: sempre disponibile, implementazione lazy
 * Ispirato a: feature-libs/cart/base/root/facade/active-cart.facade.ts
 *   (@Injectable({ providedIn: 'root', useFactory: () => facadeFactory({ facade: ActiveCartFacade,
 *    feature: CART_BASE_CORE_FEATURE, methods: [...] }) }))
 *
 * Questo file e' piccolo e sta nel bundle principale. Il codice vero (ActiveCartService)
 * sta nel chunk lazy della feature 'cart'.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facadeFactory } from '../facade-factory';
import { Cart } from './cart.model';

export const CART_FEATURE = 'cart';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory<ActiveCartFacade>({
      facade: ActiveCartFacade,
      feature: CART_FEATURE,
      methods: ['getActive', 'addEntry', 'updateEntry', 'removeEntry'],
    }),
})
export abstract class ActiveCartFacade {
  abstract getActive(): Observable<Cart | undefined>;
  abstract addEntry(productCode: string, quantity: number): void;
  abstract updateEntry(entryNumber: number, quantity: number): void;
  abstract removeEntry(entryNumber: number): void;
}
