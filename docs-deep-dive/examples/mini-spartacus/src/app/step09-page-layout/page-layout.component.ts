/**
 * STEP 09 - PageLayoutComponent: dal template CMS all'elenco di slot
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/page/page-layout/page-layout.component.ts (PageLayoutComponent: section, layoutName$, slots$)
 *  - core-libs/storefront/cms-structure/page/page-layout/page-layout.service.ts   (PageLayoutService.getSlots/resolveSlots)
 *
 * Due usi:
 *   <cx-page-layout section="header" />  -> slot della sezione 'header' (layoutSlots.header)
 *   <cx-page-layout />                   -> slot del TEMPLATE della pagina corrente (es. LandingPage2Template)
 *
 * Le righe con cxOutlet sono il punto di aggancio dello STEP 10: il layout intero e ogni slot
 * sono "outlet" che l'app puo' sostituire o arricchire (BEFORE/REPLACE/AFTER).
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Config } from '../step01-config/config';
import { Page } from '../step08-cms/cms.model';
import { CmsService } from '../step08-cms/cms.service';
import { OutletDirective } from '../step10-outlets/outlet.directive';
import { PageSlotComponent } from './page-slot.component';

interface LayoutViewModel {
  layoutName: string;
  slots: string[];
  page: Page | null;
}

@Component({
  selector: 'cx-page-layout',
  imports: [AsyncPipe, PageSlotComponent, OutletDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (layout$ | async; as layout) {
      <ng-template [cxOutlet]="layout.layoutName" [cxOutletContext]="layout">
        <div class="cx-layout" [class]="layout.layoutName">
          @for (slot of layout.slots; track slot) {
            <ng-template [cxOutlet]="slot" [cxOutletContext]="layout.page">
              <cx-page-slot [position]="slot" />
            </ng-template>
          }
        </div>
      </ng-template>
    }
  `,
})
export class PageLayoutComponent {
  private readonly cmsService = inject(CmsService);
  private readonly config = inject(Config);
  private readonly section$ = new BehaviorSubject<string | undefined>(undefined);

  @Input() set section(value: string | undefined) {
    this.section$.next(value);
  }

  readonly layout$: Observable<LayoutViewModel | null> = this.section$.pipe(
    switchMap((section) =>
      section
        ? of({ layoutName: section, slots: this.getSlots(section), page: null })
        : this.cmsService.getCurrentPage().pipe(
            map((page) =>
              page
                ? { layoutName: page.template, slots: this.getSlots(page.template, Object.keys(page.slots)), page }
                : null
            )
          )
    )
  );

  /** Slot configurati per template/sezione; se il template non e' configurato, tutti quelli della pagina. */
  private getSlots(templateOrSection: string, fallback: string[] = []): string[] {
    return this.config.layoutSlots?.[templateOrSection]?.slots ?? fallback;
  }
}
