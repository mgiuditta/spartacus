/**
 * STEP 10 - Direttiva strutturale cxOutlet
 * Ispirato a: core-libs/storefront/cms-structure/outlet/outlet.directive.ts
 *   (OutletDirective: build() -> buildOutlet(BEFORE/REPLACE/AFTER) -> create(template|factory), getComponentInjector)
 *
 * <ng-template cxOutlet="PDP.PRICE" [cxOutletContext]="product"> contenuto di default </ng-template>
 *
 * Ordine di render: [tutti i BEFORE] [primo REPLACE oppure il contenuto di default] [tutti gli AFTER]
 */
import {
  Directive,
  inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { OutletContextData, OutletPosition } from './outlet.model';
import { OutletContent, OutletService } from './outlet.service';

@Directive({ selector: '[cxOutlet]' })
export class OutletDirective<T = unknown> implements OnChanges, OnDestroy {
  @Input({ required: true }) cxOutlet!: string;
  @Input() cxOutletContext?: T;

  private readonly vcr = inject(ViewContainerRef);
  private readonly defaultTemplate = inject<TemplateRef<unknown>>(TemplateRef);
  private readonly outletService = inject(OutletService);
  private readonly injector = inject(Injector);

  /** Se qualcuno registra/rimuove contenuti per QUESTO outlet dopo il primo render, ridisegno. */
  private readonly subscription = this.outletService.changes$
    .pipe(filter((name) => name === this.cxOutlet))
    .subscribe(() => this.render());

  ngOnChanges(): void {
    this.render();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private render(): void {
    if (!this.cxOutlet) {
      return;
    }
    this.vcr.clear();
    this.renderPosition(OutletPosition.BEFORE);
    this.renderPosition(OutletPosition.REPLACE);
    this.renderPosition(OutletPosition.AFTER);
  }

  private renderPosition(position: OutletPosition): void {
    let contents: OutletContent[] = this.outletService.get(this.cxOutlet, position);
    if (position === OutletPosition.REPLACE) {
      contents = contents.length ? [contents[0]] : [this.defaultTemplate];
    }
    for (const content of contents) {
      if (content instanceof TemplateRef) {
        this.vcr.createEmbeddedView(content, { $implicit: this.cxOutletContext });
      } else {
        this.vcr.createComponent(content, { injector: this.componentInjector(position) });
      }
    }
  }

  /** I componenti registrati sull'outlet ricevono OutletContextData (riferimento, posizione, contesto). */
  private componentInjector(position: OutletPosition): Injector {
    const data: OutletContextData<T | undefined> = {
      reference: this.cxOutlet,
      position,
      context: this.cxOutletContext,
    };
    return Injector.create({ providers: [{ provide: OutletContextData, useValue: data }], parent: this.injector });
  }
}
