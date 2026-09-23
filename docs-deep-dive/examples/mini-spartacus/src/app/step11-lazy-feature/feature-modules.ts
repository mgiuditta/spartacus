/**
 * STEP 11 - Feature lazy: configurazione e caricamento
 * Ispirato a:
 *  - core-libs/core/src/cms/config/cms-config.ts                 (FeatureModuleConfig: module, cmsComponents, dependencies)
 *  - core-libs/core/src/lazy-loading/feature-modules.service.ts   (FeatureModulesService.isConfigured/resolveFeature)
 *  - core-libs/core/src/lazy-loading/lazy-modules.service.ts      (LazyModulesService.resolveModuleInstance)
 *
 * Differenza: Spartacus carica un NgModule e ne crea l'istanza (createNgModule).
 * Nel mondo standalone la feature esporta un array di provider e noi creiamo un
 * EnvironmentInjector figlio con createEnvironmentInjector.
 */
import {
  createEnvironmentInjector,
  EnvironmentInjector,
  EnvironmentProviders,
  inject,
  Injectable,
  PendingTasks,
  Provider,
} from '@angular/core';
import { defer, from, Observable, throwError } from 'rxjs';
import { finalize, map, shareReplay } from 'rxjs/operators';
import { Config } from '../step01-config/config';
import { CmsComponentsMapping } from '../step09-page-layout/layout-config';

/** Cio' che un file di feature (caricato con import()) deve esportare. */
export interface FeatureDefinition {
  providers: (Provider | EnvironmentProviders)[];
  cmsComponents?: CmsComponentsMapping;
}

export interface FeatureModuleConfig {
  /** Funzione con import() dinamico: il bundler crea un chunk separato. */
  module: () => Promise<FeatureDefinition>;
  /** Componenti CMS che, se presenti in pagina, fanno caricare la feature. */
  cmsComponents?: string[];
}

export interface FeatureModulesConfig {
  featureModules?: { [featureName: string]: FeatureModuleConfig | undefined };
}

declare module '../step01-config/config' {
  interface Config extends FeatureModulesConfig {}
}

export interface ResolvedFeature {
  name: string;
  injector: EnvironmentInjector;
  definition: FeatureDefinition;
}

@Injectable({ providedIn: 'root' })
export class FeatureModulesService {
  private readonly config = inject(Config);
  private readonly rootInjector = inject(EnvironmentInjector);
  /** Un import() non e' una richiesta HTTP: senza PendingTasks l'SSR non lo aspetterebbe. */
  private readonly pendingTasks = inject(PendingTasks);
  private readonly features = new Map<string, Observable<ResolvedFeature>>();

  isConfigured(featureName: string): boolean {
    return !!this.config.featureModules?.[featureName]?.module;
  }

  /** Quale feature dichiara questo componente CMS? */
  findFeatureForComponent(typeCode: string): string | undefined {
    const entries = Object.entries(this.config.featureModules ?? {});
    return entries.find(([, feature]) => feature?.cmsComponents?.includes(typeCode))?.[0];
  }

  /** Carica la feature UNA volta sola (cache + shareReplay) e crea il suo injector. */
  resolveFeature(featureName: string): Observable<ResolvedFeature> {
    const featureConfig = this.config.featureModules?.[featureName];
    if (!featureConfig?.module) {
      return throwError(() => new Error(`Feature ${featureName} non configurata`));
    }
    let feature$ = this.features.get(featureName);
    if (!feature$) {
      feature$ = defer(() => {
        const removeTask = this.pendingTasks.add();
        return from(featureConfig.module()).pipe(finalize(removeTask));
      }).pipe(
        map((definition) => ({
          name: featureName,
          definition,
          injector: createEnvironmentInjector(definition.providers, this.rootInjector, `feature:${featureName}`),
        })),
        shareReplay({ bufferSize: 1, refCount: false })
      );
      this.features.set(featureName, feature$);
    }
    return feature$;
  }
}
