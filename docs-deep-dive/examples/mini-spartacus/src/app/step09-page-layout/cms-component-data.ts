/**
 * STEP 09 - CmsComponentData: cosa riceve ogni componente CMS
 * Ispirato a: core-libs/storefront/cms-structure/page/model/cms-component-data.ts (CmsComponentData)
 *
 * Il wrapper crea un injector dedicato in cui CmsComponentData = { uid, data$ }.
 * Il componente fa: data$ = inject(CmsComponentData<CmsParagraphComponent>).data$
 */
import { Observable } from 'rxjs';
import { CmsComponent } from '../step08-cms/cms.model';

export abstract class CmsComponentData<T extends CmsComponent = CmsComponent> {
  abstract readonly uid: string;
  abstract readonly data$: Observable<T | undefined>;
}
