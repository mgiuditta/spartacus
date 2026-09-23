/**
 * STEP 09 - Prodotto della pagina corrente (dal parametro :productCode)
 * Ispirato a: core-libs/storefront/cms-components/product/current-product.service.ts (CurrentProductService.getProduct)
 */
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { Product } from '../../step05-product-data/product.model';
import { ProductService } from '../../step06-ngrx-product/product.service';

@Injectable({ providedIn: 'root' })
export class CurrentProductService {
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  private readonly productCode$: Observable<string | undefined> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(undefined),
    map(() => {
      let route = this.router.routerState.snapshot.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route.params['productCode'] as string | undefined;
    }),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getProduct(): Observable<Product | undefined> {
    return this.productCode$.pipe(switchMap((code) => this.productService.get(code)));
  }

  getProductCode(): Observable<string | undefined> {
    return this.productCode$;
  }
}
