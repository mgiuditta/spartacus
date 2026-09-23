/**
 * STEP 09 - Risoluzione del mapping typeCode -> componente
 * Ispirato a: core-libs/storefront/cms-structure/services/cms-components.service.ts
 *   (CmsComponentsService.determineMappings / getMapping: prima la config, poi le feature lazy)
 *
 * Punto di estensione: CMS_MAPPING_RESOLVERS. Lo STEP 11 registra un resolver che
 * trova il componente dentro una feature caricata in lazy loading.
 */
import { EnvironmentInjector, inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Config } from '../step01-config/config';
import { CmsComponentMapping } from './layout-config';

export interface ResolvedCmsMapping {
  mapping: CmsComponentMapping;
  /** Injector "di ambiente" da cui dipende il componente (root o quello della feature lazy). */
  injector: EnvironmentInjector;
}

export interface CmsMappingResolver {
  /** undefined = "non e' roba mia", altrimenti l'Observable del mapping risolto. */
  resolve(typeCode: string): Observable<ResolvedCmsMapping | undefined> | undefined;
}

export const CMS_MAPPING_RESOLVERS = new InjectionToken<CmsMappingResolver[]>('CmsMappingResolvers');

@Injectable({ providedIn: 'root' })
export class CmsComponentsService {
  private readonly config = inject(Config);
  private readonly rootInjector = inject(EnvironmentInjector);
  private readonly resolvers = inject(CMS_MAPPING_RESOLVERS, { optional: true }) ?? [];

  getMapping(typeCode: string): Observable<ResolvedCmsMapping | undefined> {
    const mapping = this.config.cmsComponents?.[typeCode];
    if (mapping?.component) {
      return of({ mapping, injector: this.rootInjector });
    }
    for (const resolver of this.resolvers) {
      const resolved = resolver.resolve(typeCode);
      if (resolved) {
        return resolved;
      }
    }
    return of(undefined); // componente non mappato: non si renderizza nulla (come Spartacus)
  }
}
