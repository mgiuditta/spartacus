/**
 * STEP 02 - Aggiunge ?lang=..&curr=.. a tutte le chiamate OCC
 * Ispirato a: core-libs/core/src/occ/adapters/site-context/site-context.interceptor.ts (SiteContextInterceptor)
 *
 * Nota: usa OccEndpointsService (STEP 03) per sapere qual e' la base URL OCC,
 * esattamente come l'originale. Le chiamate verso altri host non vengono toccate.
 */
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID } from './site-context.config';
import { SiteContextService } from './site-context.service';

export const siteContextInterceptor: HttpInterceptorFn = (request, next) => {
  const siteContext = inject(SiteContextService);
  const occEndpoints = inject(OccEndpointsService);

  if (request.url.includes(occEndpoints.getBaseUrl())) {
    request = request.clone({
      setParams: {
        lang: siteContext.getActiveValue(LANGUAGE_CONTEXT_ID),
        curr: siteContext.getActiveValue(CURRENCY_CONTEXT_ID),
      },
    });
  }
  return next(request);
};
