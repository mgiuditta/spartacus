/**
 * STEP 06 - Effect: l'azione LoadProduct diventa una chiamata HTTP
 * Ispirato a:
 *  - core-libs/core/src/product/store/effects/product.effect.ts (ProductEffects.loadProduct$)
 *  - core-libs/core/src/util/try-normalize-http-error.ts         (tryNormalizeHttpError: errore reso serializzabile)
 *  - il reset dei prodotti al cambio lingua/valuta (in Spartacus: reducer che reagiscono a
 *    LANGUAGE_CHANGE / CURRENCY_CHANGE, vedi core-libs/core/src/site-context/store/actions)
 */
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import { catchError, map, mergeMap, skip } from 'rxjs/operators';
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID } from '../step02-site-context/site-context.config';
import { SiteContextService } from '../step02-site-context/site-context.service';
import { ProductConnector } from '../step05-product-data/product.connector';
import { ClearProducts, LOAD_PRODUCT, LoadProduct, LoadProductFail, LoadProductSuccess } from './product.actions';

function normalizeHttpError(error: unknown): { status?: number; message: string } {
  if (error instanceof HttpErrorResponse) {
    return { status: error.status, message: error.message };
  }
  return { message: error instanceof Error ? error.message : String(error) };
}

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly connector = inject(ProductConnector);
  private readonly siteContext = inject(SiteContextService);

  /** mergeMap: piu' prodotti possono caricarsi in parallelo. */
  readonly loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadProduct>(LOAD_PRODUCT),
      mergeMap((action) =>
        this.connector.get(action.payload).pipe(
          map((product) => new LoadProductSuccess({ ...product, code: product.code ?? action.payload })),
          catchError((error: unknown) => of(new LoadProductFail(action.payload, normalizeHttpError(error))))
        )
      )
    )
  );

  /** Lingua o valuta cambiata (dopo il valore iniziale) -> svuoto la cache dei prodotti. */
  readonly clearOnContextChange$ = createEffect(() =>
    merge(
      this.siteContext.getActive(LANGUAGE_CONTEXT_ID).pipe(skip(1)),
      this.siteContext.getActive(CURRENCY_CONTEXT_ID).pipe(skip(1))
    ).pipe(map(() => new ClearProducts()))
  );
}
