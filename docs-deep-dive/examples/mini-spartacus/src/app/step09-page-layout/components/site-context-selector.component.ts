/**
 * STEP 09 - Selettore lingua/valuta (componente CMS 'CMSSiteContextComponent')
 * Ispirato a:
 *  - core-libs/storefront/cms-components/misc/site-context-selector/site-context-selector.component.ts
 *  - core-libs/storefront/cms-components/misc/site-context-selector/site-context-component.service.ts
 *    (context 'LANGUAGE' | 'CURRENCY' letto dai dati CMS -> servizio giusto)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID } from '../../step02-site-context/site-context.config';
import { SiteContextService } from '../../step02-site-context/site-context.service';
import { CmsComponent } from '../../step08-cms/cms.model';
import { CmsComponentData } from '../cms-component-data';

export interface CmsSiteContextComponent extends CmsComponent {
  context?: 'LANGUAGE' | 'CURRENCY';
}

interface SelectorViewModel {
  param: string;
  label: string;
  values: string[];
  active: string;
}

@Component({
  selector: 'cx-site-context-selector',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (vm$ | async; as vm) {
      <label>
        {{ vm.label }}
        <select (change)="select(vm.param, $any($event.target).value)">
          @for (value of vm.values; track value) {
            <option [value]="value" [selected]="value === vm.active">{{ value }}</option>
          }
        </select>
      </label>
    }
  `,
})
export class SiteContextSelectorComponent {
  private readonly siteContext = inject(SiteContextService);
  private readonly data$ = inject<CmsComponentData<CmsSiteContextComponent>>(CmsComponentData).data$;

  readonly vm$: Observable<SelectorViewModel | undefined> = this.data$.pipe(
    switchMap((data) => {
      if (!data?.context) {
        return of(undefined);
      }
      const param = data.context === 'LANGUAGE' ? LANGUAGE_CONTEXT_ID : CURRENCY_CONTEXT_ID;
      return combineLatest([of(param), this.siteContext.getActive(param)]).pipe(
        map(([p, active]) => ({
          param: p,
          label: data.context === 'LANGUAGE' ? 'Lingua' : 'Valuta',
          values: this.siteContext.getValues(p),
          active,
        }))
      );
    })
  );

  select(param: string, value: string): void {
    this.siteContext.setActive(param, value);
  }
}
