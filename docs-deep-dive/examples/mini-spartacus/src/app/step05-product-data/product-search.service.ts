/**
 * STEP 05 - Ricerca prodotti (riusa gli stessi converter del dettaglio)
 * Ispirato a:
 *  - core-libs/core/src/occ/adapters/product/occ-product-search.adapter.ts (OccProductSearchAdapter.search)
 *  - core-libs/core/src/occ/adapters/product/converters/occ-product-search-page-normalizer.ts
 *    (i prodotti della pagina passano da PRODUCT_NORMALIZER con convertMany)
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { ConverterService } from './converter.service';
import { PRODUCT_NORMALIZER } from './product-normalizers';
import { OccProductSearchPage, ProductSearchPage } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductSearchService {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly converter = inject(ConverterService);

  search(query: string, pageSize = 20): Observable<ProductSearchPage> {
    const url = this.occEndpoints.buildUrl('productSearch', { queryParams: { query, pageSize } });
    return this.http.get<OccProductSearchPage>(url).pipe(
      map((page) => ({
        products: this.converter.convertMany(page.products ?? [], PRODUCT_NORMALIZER),
        freeTextSearch: page.freeTextSearch,
        totalResults: page.pagination?.totalResults ?? 0,
      }))
    );
  }
}
