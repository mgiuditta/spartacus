/**
 * STEP 09 - PageSlotComponent: renderizza i componenti di UNO slot
 * Ispirato a: core-libs/storefront/cms-structure/page/slot/page-slot.component.ts
 *   (PageSlotComponent: position -> CmsService.getContentSlot -> *ngFor cxComponentWrapper)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsService } from '../step08-cms/cms.service';
import { ComponentWrapperDirective } from './component-wrapper.directive';

@Component({
  selector: 'cx-page-slot',
  imports: [AsyncPipe, ComponentWrapperDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.position]': 'position', '[class]': 'position' },
  template: `
    @for (component of components$ | async; track component.uid) {
      <ng-container [cxComponentWrapper]="component" />
    }
  `,
})
export class PageSlotComponent {
  private readonly cmsService = inject(CmsService);
  private readonly position$ = new BehaviorSubject<string | undefined>(undefined);

  @Input() set position(value: string | undefined) {
    this.position$.next(value);
  }
  get position(): string | undefined {
    return this.position$.value;
  }

  readonly components$ = this.position$.pipe(
    switchMap((position) => (position ? this.cmsService.getContentSlot(position) : of(undefined))),
    map((slot) => slot?.components ?? [])
  );
}
