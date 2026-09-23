/**
 * STEP 12 - TransferState: i dati caricati dal server non vengono richiesti di nuovo dal browser
 * Ispirato a:
 *  - core-libs/core/src/state/reducers/transfer-state.reducer.ts
 *    (CX_KEY, getServerTransferStateReducer, getBrowserTransferStateReducer)
 *  - core-libs/core/src/product/store/product-store.module.ts (provideDefaultConfig({ state: { ssrTransfer: { keys: { product: ... } } } }))
 *
 * Due tecniche:
 *  A) meta-reducer NgRx (come Spartacus): sul server copia le slice scelte in TransferState ad ogni azione;
 *     nel browser, all'azione INIT, le rimette nello stato iniziale.
 *  B) interceptor HTTP per le chiamate CMS: sul server salva la risposta, nel browser la riusa UNA volta.
 *     (Spartacus disattiva il transfer cache HTTP di Angular con withNoHttpTransferCache() e usa solo A;
 *      B e' qui per mostrare l'API TransferState "a mano".)
 */
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, makeStateKey, PLATFORM_ID, StateKey, TransferState } from '@angular/core';
import { ActionReducer, INIT, MetaReducer } from '@ngrx/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { deepMerge } from '../step01-config/deep-merge';
import { PRODUCT_FEATURE } from '../step06-ngrx-product/product.reducer';

export const CX_STATE_KEY: StateKey<Record<string, unknown>> = makeStateKey<Record<string, unknown>>('cx-state');

/** Slice dello store da trasferire. Mai dati personali (carrello, utente)! */
export const TRANSFERRED_STATE_KEYS = [PRODUCT_FEATURE];

function pick(state: Record<string, unknown>, keys: string[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of keys) {
    if (state[key] !== undefined) {
      result[key] = state[key];
    }
  }
  return result;
}

/** Factory usata con il token META_REDUCERS (eseguita in contesto di injection). */
export function transferStateMetaReducerFactory(): MetaReducer<Record<string, unknown>> {
  const platformId = inject(PLATFORM_ID);
  const transferState = inject(TransferState);

  if (isPlatformServer(platformId)) {
    return (reducer: ActionReducer<Record<string, unknown>>) => (state, action) => {
      const newState = reducer(state, action);
      transferState.set(CX_STATE_KEY, pick(newState, TRANSFERRED_STATE_KEYS));
      return newState;
    };
  }

  if (isPlatformBrowser(platformId)) {
    return (reducer: ActionReducer<Record<string, unknown>>) => (state, action) => {
      if (action.type === INIT && transferState.hasKey(CX_STATE_KEY)) {
        const initial = reducer(state, action);
        const transferred = transferState.get(CX_STATE_KEY, {});
        transferState.remove(CX_STATE_KEY);
        return deepMerge({ ...initial }, transferred);
      }
      return reducer(state, action);
    };
  }

  return (reducer) => reducer;
}

/** Interceptor per le GET CMS: server -> salva; browser -> riusa (e cancella) la risposta. */
export const cmsTransferStateInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.method !== 'GET' || !request.url.includes('/cms/')) {
    return next(request);
  }
  const transferState = inject(TransferState);
  const platformId = inject(PLATFORM_ID);
  const key = makeStateKey<unknown>('cms:' + request.urlWithParams);

  if (isPlatformBrowser(platformId) && transferState.hasKey(key)) {
    const body = transferState.get(key, null);
    transferState.remove(key); // una volta sola: le navigazioni successive vanno in rete
    return of(new HttpResponse({ body, status: 200, url: request.urlWithParams }));
  }

  return next(request).pipe(
    tap((event) => {
      if (isPlatformServer(platformId) && event instanceof HttpResponse) {
        transferState.set(key, event.body);
      }
    })
  );
};
