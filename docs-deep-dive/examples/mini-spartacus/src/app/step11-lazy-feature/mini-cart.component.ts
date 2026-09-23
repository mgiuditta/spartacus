/**
 * STEP 11 - Mini carrello nell'header (bundle principale, usa il PROXY del facade)
 * Ispirato a:
 *  - feature-libs/cart/base/components/mini-cart/mini-cart.component.ts        (MiniCartComponent)
 *  - feature-libs/cart/base/components/mini-cart/mini-cart-component.service.ts (conta le unita' del carrello attivo)
 *
 * inject(ActiveCartFacade) qui restituisce il proxy creato da facadeFactory:
 * la prima chiamata a getActive() scarica il chunk 'cart' e poi inoltra al servizio vero.
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { UrlPipe } from '../step07-routing/url.pipe';
import { ActiveCartFacade } from './cart/active-cart.facade';

@Component({
  selector: 'cx-mini-cart',
  imports: [AsyncPipe, RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [routerLink]="{ cxRoute: 'cart' } | cxUrl" aria-label="Carrello">
      Carrello ({{ (units$ | async) ?? 0 }})
    </a>
  `,
})
export class MiniCartComponent {
  readonly units$ = inject(ActiveCartFacade)
    .getActive()
    .pipe(map((cart) => cart?.totalUnitCount ?? 0));
}
