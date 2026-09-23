/**
 * STEP 10 - Esempi d'uso degli outlet (BEFORE / REPLACE / AFTER)
 * Ispirato a: projects/storefrontapp/src/test-outlets/ (TestOutletModule: esempi di cxOutletRef usati negli e2e)
 *
 * Questo componente non mostra nulla "al suo posto": registra template su outlet che
 * vivono altrove (header, slot Footer, prezzo nella pagina prodotto).
 */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Page } from '../step08-cms/cms.model';
import { OutletContextData } from './outlet.model';
import { OutletRefDirective } from './outlet-ref.directive';

@Component({
  selector: 'cx-outlet-demo',
  imports: [OutletRefDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- BEFORE: una barra promozionale sopra l'intero header -->
    <ng-template cxOutletRef="header" cxOutletPos="before">
      <div class="promo-bar">Spedizione gratuita sopra i 100 USD</div>
    </ng-template>

    <!-- REPLACE: lo slot CMS "Footer" viene sostituito da un footer scritto a mano -->
    <ng-template cxOutletRef="Footer" cxOutletPos="replace">
      <p class="custom-footer">Footer sostituito tramite outlet (REPLACE)</p>
    </ng-template>

    <!-- AFTER: nota dopo il prezzo; il contesto ($implicit) e' il prodotto -->
    <ng-template cxOutletRef="PDP.PRICE" cxOutletPos="after" let-product>
      @if (product) {
        <small class="vat-note">IVA inclusa - codice {{ asProduct(product).code }}</small>
      }
    </ng-template>
  `,
})
export class OutletDemoComponent {
  asProduct(value: unknown): { code?: string } {
    return value as { code?: string };
  }
}

/** Componente registrato con provideOutlet() dopo lo slot 'Summary' della pagina prodotto. */
@Component({
  selector: 'cx-delivery-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p class="delivery-badge">Consegna in 24h ({{ pageTitle }})</p>`,
})
export class DeliveryBadgeComponent {
  private readonly outlet = inject(OutletContextData) as OutletContextData<Page | null>;
  readonly pageTitle = this.outlet.context?.title ?? '';
}
