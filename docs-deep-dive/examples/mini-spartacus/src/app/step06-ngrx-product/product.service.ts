/**
 * STEP 06 - Facade ProductService: i componenti NON vedono lo store
 * Ispirato a:
 *  - core-libs/core/src/product/facade/product.service.ts            (ProductService.get/isLoading/hasError)
 *  - core-libs/core/src/product/services/product-loading.service.ts  (carica "on demand" quando qualcuno osserva)
 *
 * get(code) restituisce un Observable del prodotto. Se nello store non c'e' nulla
 * (ne' in caricamento, ne' caricato, ne' in errore) il facade lancia LoadProduct.
 */
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Product } from '../step05-product-data/product.model';
import { LoadProduct } from './product.actions';
import {
  getSelectedProductErrorFactory,
  getSelectedProductLoadingFactory,
  getSelectedProductStateFactory,
} from './product.reducer';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly store = inject(Store);

  get(productCode: string | undefined): Observable<Product | undefined> {
    if (!productCode) {
      return of(undefined);
    }
    return this.store.select(getSelectedProductStateFactory(productCode)).pipe(
      tap((state) => {
        if (!state.loading && !state.success && !state.error) {
          this.store.dispatch(new LoadProduct(productCode));
        }
      }),
      map((state) => state.value),
      distinctUntilChanged()
    );
  }

  isLoading(productCode: string): Observable<boolean> {
    return this.store.select(getSelectedProductLoadingFactory(productCode));
  }

  hasError(productCode: string): Observable<boolean> {
    return this.store.select(getSelectedProductErrorFactory(productCode));
  }
}
