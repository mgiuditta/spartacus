/**
 * STEP 09 - ComponentWrapperDirective: istanzia il componente Angular giusto per un componente CMS
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/page/component/component-wrapper.directive.ts (ComponentWrapperDirective)
 *  - core-libs/storefront/cms-structure/page/component/handlers/default-component.handler.ts (createComponent)
 *  - core-libs/storefront/cms-structure/page/component/services/cms-injector.service.ts (Injector con CmsComponentData)
 */
import {
  ComponentRef,
  Directive,
  inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContentSlotComponentData } from '../step08-cms/cms.model';
import { CmsService } from '../step08-cms/cms.service';
import { CmsComponentData } from './cms-component-data';
import { CmsComponentsService } from './cms-components.service';

@Directive({ selector: '[cxComponentWrapper]' })
export class ComponentWrapperDirective implements OnInit, OnDestroy {
  @Input({ required: true }) cxComponentWrapper!: ContentSlotComponentData;

  private readonly vcr = inject(ViewContainerRef);
  private readonly cmsComponents = inject(CmsComponentsService);
  private readonly cmsService = inject(CmsService);
  private readonly renderer = inject(Renderer2);

  private componentRef?: ComponentRef<unknown>;
  private subscription?: Subscription;

  ngOnInit(): void {
    const { uid, flexType } = this.cxComponentWrapper;
    this.subscription = this.cmsComponents
      .getMapping(flexType)
      .pipe(take(1))
      .subscribe((resolved) => {
        if (!resolved?.mapping.component) {
          return;
        }
        // Injector dedicato: CmsComponentData + eventuali provider del mapping.
        const injector = Injector.create({
          providers: [
            { provide: CmsComponentData, useValue: { uid, data$: this.cmsService.getComponentData(uid) } },
            ...(resolved.mapping.providers ?? []),
          ],
          parent: resolved.injector,
        });
        this.componentRef = this.vcr.createComponent(resolved.mapping.component, {
          injector,
          environmentInjector: resolved.injector,
        });
        // Classe CSS utile per stili e test: <cx-paragraph class="CMSParagraphComponent">
        this.renderer.addClass(this.componentRef.location.nativeElement, flexType);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.componentRef?.destroy();
  }
}
