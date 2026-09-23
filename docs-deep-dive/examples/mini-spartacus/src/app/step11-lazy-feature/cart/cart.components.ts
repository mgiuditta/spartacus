/**
 * STEP 11 - Componenti CMS del carrello (nel chunk lazy)
 * Ispirato a:
 *  - feature-libs/cart/base/components/add-to-cart/add-to-cart.component.ts   (AddToCartComponent -> 'ProductAddToCartComponent')
 *  - feature-libs/cart/base/components/cart-details/cart-details.component.ts (CartDetailsComponent -> flexType 'CartComponent')
 *
 * Nota: questi componenti vengono creati con l'injector della feature, quindi
 * inject(ActiveCartFacade) restituisce direttamente ActiveCartService (non il proxy).
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CurrentProductService } from '../../step09-page-layout/components/current-product.service';
import { ActiveCartFacade } from './active-cart.facade';

@Component({
  selector: 'cx-add-to-cart',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (productCode$ | async; as code) {
      <div class="add-to-cart">
        <label>Quantita' <input type="number" min="1" [value]="quantity()" (input)="quantity.set(+$any($event.target).value || 1)" /></label>
        <button type="button" (click)="add(code)">Aggiungi al carrello</button>
        @if (added()) {
          <span role="status">Aggiunto!</span>
        }
      </div>
    }
  `,
})
export class AddToCartComponent {
  private readonly activeCart = inject(ActiveCartFacade);
  readonly productCode$ = inject(CurrentProductService).getProductCode();
  readonly quantity = signal(1);
  readonly added = signal(false);

  add(productCode: string): void {
    this.activeCart.addEntry(productCode, this.quantity());
    this.added.set(true);
  }
}

@Component({
  selector: 'cx-cart-details',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (cart$ | async; as cart) {
      <h2>Carrello {{ cart.code }}</h2>
      <table>
        <tbody>
          @for (entry of cart.entries ?? []; track entry.entryNumber) {
            <tr>
              <td>{{ entry.product?.name }}</td>
              <td>
                <input type="number" min="0" [value]="entry.quantity"
                  (change)="update(entry.entryNumber ?? 0, +$any($event.target).value)" />
              </td>
              <td>{{ entry.totalPrice?.formattedValue }}</td>
              <td><button type="button" (click)="remove(entry.entryNumber ?? 0)">Rimuovi</button></td>
            </tr>
          }
        </tbody>
      </table>
      <p><strong>Totale: {{ cart.totalPrice?.formattedValue }}</strong></p>
    } @else {
      <p>Il carrello e' vuoto.</p>
    }
  `,
})
export class CartDetailsComponent {
  private readonly activeCart = inject(ActiveCartFacade);
  readonly cart$ = this.activeCart.getActive();

  update(entryNumber: number, quantity: number): void {
    if (quantity > 0) {
      this.activeCart.updateEntry(entryNumber, quantity);
    } else {
      this.activeCart.removeEntry(entryNumber);
    }
  }

  remove(entryNumber: number): void {
    this.activeCart.removeEntry(entryNumber);
  }
}
