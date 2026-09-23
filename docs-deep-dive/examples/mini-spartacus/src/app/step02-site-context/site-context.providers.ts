/**
 * STEP 02 - Provider del Site Context
 * Ispirato a:
 *  - core-libs/core/src/site-context/site-context.module.ts (SiteContextModule.forRoot)
 *  - core-libs/core/src/site-context/providers/site-context-params-providers.ts (UrlSerializer + initializer)
 */
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { UrlSerializer } from '@angular/router';
import { provideDefaultConfig } from '../step01-config/config';
import { defaultSiteContextConfig } from './site-context.config';
import { SiteContextRoutesHandler } from './site-context-routes-handler';
import { SiteContextUrlSerializer } from './site-context-url-serializer';

export function provideSiteContext(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideDefaultConfig(defaultSiteContextConfig),
    // Il Router usera' il NOSTRO serializer (che conosce il prefisso di contesto).
    { provide: UrlSerializer, useExisting: SiteContextUrlSerializer },
    // Prima della navigazione iniziale leggiamo baseSite/lingua/valuta dall'URL.
    provideAppInitializer(() => inject(SiteContextRoutesHandler).init()),
  ]);
}
