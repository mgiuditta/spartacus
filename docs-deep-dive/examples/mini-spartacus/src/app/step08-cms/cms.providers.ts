/**
 * STEP 08 - Provider CMS
 * Ispirato a:
 *  - core-libs/core/src/occ/adapters/cms/cms-occ.module.ts (CmsPageAdapter -> OccCmsPageAdapter, CMS_PAGE_NORMALIZER)
 *  - core-libs/core/src/cms/cms.module.ts                   (CmsModule.forRoot)
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { CMS_PAGE_NORMALIZER, CmsPageAdapter, OccCmsPageAdapter, OccCmsPageNormalizer } from './occ-cms.adapter';

export function provideCms(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: CmsPageAdapter, useClass: OccCmsPageAdapter },
    { provide: CMS_PAGE_NORMALIZER, useExisting: OccCmsPageNormalizer, multi: true },
  ]);
}
