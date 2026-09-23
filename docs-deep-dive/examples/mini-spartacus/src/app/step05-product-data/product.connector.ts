/**
 * STEP 05 - Connector / Adapter per il prodotto
 * Ispirato a:
 *  - core-libs/core/src/product/connectors/product/product.adapter.ts   (ProductAdapter: classe astratta = "porta")
 *  - core-libs/core/src/product/connectors/product/product.connector.ts (ProductConnector: usato da effect/servizi)
 *  - core-libs/core/src/occ/adapters/product/occ-product.adapter.ts     (OccProductAdapter: implementazione OCC)
 *
 * Tre livelli:
 *   ProductConnector  -> API stabile per il resto dell'app
 *   ProductAdapter    -> contratto astratto (sostituibile: OCC, mock, altro backend...)
 *   OccProductAdapter -> HTTP + endpoint OCC + converter
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { ConverterService } from './converter.service';
import { PRODUCT_NORMALIZER } from './product-normalizers';
import { OccProduct, Product } from './product.model';

export abstract class ProductAdapter {
  abstract load(productCode: string, scope?: string): Observable<Product>;
}

@Injectable()
export class OccProductAdapter implements ProductAdapter {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly converter = inject(ConverterService);

  load(productCode: string, scope?: string): Observable<Product> {
    const url = this.occEndpoints.buildUrl('product', { urlParams: { productCode }, scope });
    return this.http.get<OccProduct>(url).pipe(this.converter.pipeable(PRODUCT_NORMALIZER));
  }
}

@Injectable({ providedIn: 'root' })
export class ProductConnector {
  private readonly adapter = inject(ProductAdapter);

  get(productCode: string, scope = ''): Observable<Product> {
    return this.adapter.load(productCode, scope || undefined);
  }
}
