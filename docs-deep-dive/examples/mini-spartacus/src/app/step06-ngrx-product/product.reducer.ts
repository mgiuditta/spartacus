/**
 * STEP 06 - Reducer e selettori del prodotto
 * Ispirato a:
 *  - core-libs/core/src/product/store/product-state.ts            (PRODUCT_FEATURE, ProductsState)
 *  - core-libs/core/src/product/store/reducers/index.ts           (reducer costruiti con StateUtils)
 *  - core-libs/core/src/product/store/selectors/product.selectors.ts (getSelectedProductStateFactory, ...)
 */
import { ActionReducerMap, createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Product } from '../step05-product-data/product.model';
import { PRODUCT_DETAIL_ENTITY } from './product.actions';
import { EntityLoaderState, entityLoaderReducer, entityLoaderStateSelector, LoaderState } from './loader-state';

export const PRODUCT_FEATURE = 'product';

export interface ProductState {
  details: EntityLoaderState<Product>;
}

export const productReducers: ActionReducerMap<ProductState> = {
  details: entityLoaderReducer<Product>(PRODUCT_DETAIL_ENTITY),
};

export const getProductState = createFeatureSelector<ProductState>(PRODUCT_FEATURE);

export const getProductDetailsState = createSelector(getProductState, (state) => state.details);

type RootState = object;

export function getSelectedProductStateFactory(code: string): MemoizedSelector<RootState, LoaderState<Product>> {
  return createSelector(getProductDetailsState, (details) => entityLoaderStateSelector(details, code));
}

export function getSelectedProductFactory(code: string): MemoizedSelector<RootState, Product | undefined> {
  return createSelector(getSelectedProductStateFactory(code), (state) => state.value);
}

export function getSelectedProductLoadingFactory(code: string): MemoizedSelector<RootState, boolean> {
  return createSelector(getSelectedProductStateFactory(code), (state) => state.loading);
}

export function getSelectedProductErrorFactory(code: string): MemoizedSelector<RootState, boolean> {
  return createSelector(getSelectedProductStateFactory(code), (state) => state.error);
}
