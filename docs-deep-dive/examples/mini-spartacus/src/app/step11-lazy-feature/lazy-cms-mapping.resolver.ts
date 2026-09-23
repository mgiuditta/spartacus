/**
 * STEP 11 - Componenti CMS che vivono dentro una feature lazy
 * Ispirato a: core-libs/storefront/cms-structure/services/cms-components.service.ts
 *   (CmsComponentsService.determineMappings: se un componente e' dichiarato in featureModules[x].cmsComponents,
 *    la feature viene caricata e il mapping letto dalla sua configurazione)
 */
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsMappingResolver, ResolvedCmsMapping } from '../step09-page-layout/cms-components.service';
import { FeatureModulesService } from './feature-modules';

@Injectable({ providedIn: 'root' })
export class LazyCmsMappingResolver implements CmsMappingResolver {
  private readonly featureModules = inject(FeatureModulesService);

  resolve(typeCode: string): Observable<ResolvedCmsMapping | undefined> | undefined {
    const featureName = this.featureModules.findFeatureForComponent(typeCode);
    if (!featureName) {
      return undefined;
    }
    return this.featureModules.resolveFeature(featureName).pipe(
      map((feature) => {
        const mapping = feature.definition.cmsComponents?.[typeCode];
        return mapping ? { mapping, injector: feature.injector } : undefined;
      })
    );
  }
}
