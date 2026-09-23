/**
 * STEP 06 - Azioni del prodotto (classi con meta, come in Spartacus)
 * Ispirato a: core-libs/core/src/product/store/actions/product.action.ts
 *   (LoadProduct, LoadProductSuccess, LoadProductFail, PRODUCT_DETAIL_ENTITY)
 */
import { Product } from '../step05-product-data/product.model';
import {
  EntityLoaderAction,
  EntityLoaderMeta,
  entityFailMeta,
  entityLoadMeta,
  entityRemoveAllMeta,
  entitySuccessMeta,
} from './loader-state';

export const PRODUCT_DETAIL_ENTITY = '[Product] Detail Entity';

export const LOAD_PRODUCT = '[Product] Load Product Data';
export const LOAD_PRODUCT_SUCCESS = '[Product] Load Product Data Success';
export const LOAD_PRODUCT_FAIL = '[Product] Load Product Data Fail';
export const CLEAR_PRODUCTS = '[Product] Clear Products';

export class LoadProduct implements EntityLoaderAction {
  readonly type = LOAD_PRODUCT;
  readonly meta: EntityLoaderMeta;
  constructor(public readonly payload: string) {
    this.meta = entityLoadMeta(PRODUCT_DETAIL_ENTITY, payload);
  }
}

export class LoadProductSuccess implements EntityLoaderAction {
  readonly type = LOAD_PRODUCT_SUCCESS;
  readonly meta: EntityLoaderMeta;
  constructor(public readonly payload: Product) {
    this.meta = entitySuccessMeta(PRODUCT_DETAIL_ENTITY, payload.code ?? '');
  }
}

export class LoadProductFail implements EntityLoaderAction {
  readonly type = LOAD_PRODUCT_FAIL;
  readonly meta: EntityLoaderMeta;
  /** L'errore deve essere serializzabile (niente HttpErrorResponse nello store). */
  constructor(productCode: string, public readonly payload: { status?: number; message: string }) {
    this.meta = entityFailMeta(PRODUCT_DETAIL_ENTITY, productCode, payload);
  }
}

/** Svuota tutti i prodotti: usata al cambio di lingua/valuta (prezzi e nomi cambiano). */
export class ClearProducts implements EntityLoaderAction {
  readonly type = CLEAR_PRODUCTS;
  readonly meta = entityRemoveAllMeta(PRODUCT_DETAIL_ENTITY);
}

export type ProductAction = LoadProduct | LoadProductSuccess | LoadProductFail | ClearProducts;
