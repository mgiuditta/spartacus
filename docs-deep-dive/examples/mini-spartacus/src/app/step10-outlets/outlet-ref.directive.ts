/**
 * STEP 10 - cxOutletRef: registra un template su un outlet dal template HTML
 * Ispirato a: core-libs/storefront/cms-structure/outlet/outlet-ref/outlet-ref.directive.ts (OutletRefDirective)
 *
 * <ng-template cxOutletRef="PDP.PRICE" cxOutletPos="after" let-product> IVA inclusa </ng-template>
 */
import { Directive, inject, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { OutletPosition } from './outlet.model';
import { OutletService } from './outlet.service';

@Directive({ selector: '[cxOutletRef]' })
export class OutletRefDirective implements OnInit, OnDestroy {
  @Input({ required: true }) cxOutletRef!: string;
  @Input() cxOutletPos: OutletPosition | `${OutletPosition}` = OutletPosition.REPLACE;

  private readonly template = inject<TemplateRef<unknown>>(TemplateRef);
  private readonly outletService = inject(OutletService);

  ngOnInit(): void {
    this.outletService.add(this.cxOutletRef, this.template, this.cxOutletPos as OutletPosition);
  }

  ngOnDestroy(): void {
    this.outletService.remove(this.cxOutletRef, this.cxOutletPos as OutletPosition, this.template);
  }
}
