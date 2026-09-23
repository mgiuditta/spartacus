/**
 * STEP 08 - Caricamento pagine e componenti CMS da OCC
 * Ispirato a:
 *  - core-libs/core/src/cms/connectors/page/cms-page.adapter.ts   (CmsPageAdapter)
 *  - core-libs/core/src/cms/connectors/page/converters.ts         (CMS_PAGE_NORMALIZER)
 *  - core-libs/core/src/occ/adapters/cms/occ-cms-page.adapter.ts  (OccCmsPageAdapter.load, getPagesRequestParams)
 *  - core-libs/core/src/occ/adapters/cms/converters/occ-cms-page-normalizer.ts (OccCmsPageNormalizer)
 *  - core-libs/core/src/occ/adapters/cms/occ-cms-component.adapter.ts (OccCmsComponentAdapter.findComponentsByIds)
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { Converter, ConverterService } from '../step05-product-data/converter.service';
import {
  CmsComponent,
  CmsStructureModel,
  ContentSlotData,
  HOME_PAGE_CONTEXT,
  OccCmsComponentList,
  OccCmsPage,
  PageContext,
  PageType,
} from './cms.model';

export const CMS_PAGE_NORMALIZER = new InjectionToken<Converter<OccCmsPage, CmsStructureModel>[]>('CmsPageNormalizer');

/** Contratto astratto: come si carica una pagina CMS (OCC, mock, headless CMS...). */
export abstract class CmsPageAdapter {
  abstract load(pageContext: PageContext): Observable<CmsStructureModel>;
  abstract loadComponents(uids: string[]): Observable<CmsComponent[]>;
}

@Injectable()
export class OccCmsPageAdapter implements CmsPageAdapter {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly converter = inject(ConverterService);

  load(pageContext: PageContext): Observable<CmsStructureModel> {
    const url = this.occEndpoints.buildUrl('pages', { queryParams: this.getPagesRequestParams(pageContext) });
    return this.http.get<OccCmsPage>(url).pipe(this.converter.pipeable(CMS_PAGE_NORMALIZER));
  }

  loadComponents(uids: string[]): Observable<CmsComponent[]> {
    const url = this.occEndpoints.buildUrl('components', { queryParams: { componentIds: uids.join(',') } });
    return this.http.get<OccCmsComponentList>(url).pipe(map((list) => list.component ?? []));
  }

  /**
   * ContentPage -> ?pageType=ContentPage&pageLabelOrId=/faq
   * Altri tipi  -> ?pageType=ProductPage&code=300938
   * Homepage    -> nessun parametro (il backend restituisce la homepage)
   */
  private getPagesRequestParams(context: PageContext): Record<string, string> {
    if (context.id === HOME_PAGE_CONTEXT) {
      return {};
    }
    const params: Record<string, string> = {};
    if (context.type) {
      params['pageType'] = context.type;
    }
    if (context.type === PageType.CONTENT_PAGE) {
      params['pageLabelOrId'] = context.id;
    } else {
      params['code'] = context.id;
    }
    return params;
  }
}

/** OCC CMSPage -> Page (slot indicizzati per position) + lista piatta dei componenti. */
@Injectable({ providedIn: 'root' })
export class OccCmsPageNormalizer implements Converter<OccCmsPage, CmsStructureModel> {
  convert(source: OccCmsPage, target?: CmsStructureModel): CmsStructureModel {
    const result: CmsStructureModel = target ?? {
      page: {
        pageId: source.uid ?? '',
        type: (source.typeCode as PageType) ?? PageType.CONTENT_PAGE,
        template: source.template ?? '',
        title: source.title ?? source.name ?? '',
        label: source.label,
        slots: {},
      },
      components: [],
    };
    for (const slot of source.contentSlots?.contentSlot ?? []) {
      if (!slot.position) {
        continue;
      }
      const slotData: ContentSlotData = { components: [] };
      for (const component of slot.components?.component ?? []) {
        slotData.components.push({
          uid: component.uid,
          typeCode: component.typeCode,
          flexType: component.typeCode === 'CMSFlexComponent' ? (component.flexType ?? component.typeCode) : component.typeCode,
        });
        result.components.push(component);
      }
      result.page.slots[slot.position] = slotData;
    }
    return result;
  }
}
