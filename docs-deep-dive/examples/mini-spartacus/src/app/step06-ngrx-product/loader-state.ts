/**
 * STEP 06 - StateUtils in miniatura: LoaderState ed EntityLoaderState
 * Ispirato a:
 *  - core-libs/core/src/state/utils/loader/loader-state.ts      (LoaderState)
 *  - core-libs/core/src/state/utils/loader/loader.action.ts     (LoaderMeta, loadMeta, failMeta, successMeta)
 *  - core-libs/core/src/state/utils/loader/loader.reducer.ts    (loaderReducer)
 *  - core-libs/core/src/state/utils/entity-loader/*              (entityLoaderReducer, entityLoadMeta, ...)
 *  - core-libs/core/src/state/utils/entity/entity.reducer.ts    (entityId null = "tutte le entita'", removed)
 *
 * L'idea di Spartacus: NON scrivere a mano loading/error/success per ogni dato.
 * Le azioni portano un "meta" che dice al reducer generico cosa fare.
 */
import { Action } from '@ngrx/store';

export interface LoaderState<T> {
  loading: boolean;
  error: boolean;
  success: boolean;
  value?: T;
}

export interface EntityLoaderState<T> {
  entities: { [id: string]: LoaderState<T> };
}

export interface EntityLoaderMeta {
  entityType: string;
  /** Id dell'entita'; null = tutte. */
  entityId: string | null;
  loader?: { load?: boolean; error?: unknown; success?: boolean };
  removed?: boolean;
}

export interface EntityLoaderAction extends Action {
  readonly payload?: unknown;
  readonly meta?: EntityLoaderMeta;
}

export const initialLoaderState: LoaderState<never> = { loading: false, error: false, success: false, value: undefined };
export const initialEntityLoaderState: EntityLoaderState<never> = { entities: {} };

// ---- helper per costruire i meta ---------------------------------------------
export const entityLoadMeta = (entityType: string, entityId: string): EntityLoaderMeta => ({
  entityType, entityId, loader: { load: true },
});
export const entitySuccessMeta = (entityType: string, entityId: string): EntityLoaderMeta => ({
  entityType, entityId, loader: { success: true },
});
export const entityFailMeta = (entityType: string, entityId: string, error: unknown): EntityLoaderMeta => ({
  entityType, entityId, loader: { error: error ?? true },
});
export const entityRemoveAllMeta = (entityType: string): EntityLoaderMeta => ({
  entityType, entityId: null, removed: true,
});

/** Reducer per UN valore caricato in modo asincrono. */
export function loaderReducer<T>(entityType: string) {
  return (state: LoaderState<T> = initialLoaderState, action: EntityLoaderAction): LoaderState<T> => {
    const loader = action.meta?.entityType === entityType ? action.meta.loader : undefined;
    if (!loader) {
      return state;
    }
    if (loader.load) {
      return { ...state, loading: true };
    }
    if (loader.error) {
      return { ...state, loading: false, error: true, success: false, value: undefined };
    }
    if (loader.success) {
      return { ...state, loading: false, error: false, success: true, value: action.payload as T };
    }
    return initialLoaderState;
  };
}

/** Reducer per una MAPPA id -> LoaderState (un prodotto per codice). */
export function entityLoaderReducer<T>(entityType: string) {
  const inner = loaderReducer<T>(entityType);
  return (state: EntityLoaderState<T> = initialEntityLoaderState, action: EntityLoaderAction): EntityLoaderState<T> => {
    const meta = action.meta;
    if (!meta || meta.entityType !== entityType) {
      return state;
    }
    if (meta.entityId === null) {
      return meta.removed ? initialEntityLoaderState : state;
    }
    if (meta.removed) {
      const { [meta.entityId]: _removed, ...rest } = state.entities;
      return { entities: rest };
    }
    const previous = state.entities[meta.entityId];
    const next = inner(previous, action);
    return next === previous ? state : { entities: { ...state.entities, [meta.entityId]: next } };
  };
}

/** Selettore di comodo: stato di un'entita' (o stato iniziale se mai caricata). */
export function entityLoaderStateSelector<T>(state: EntityLoaderState<T>, id: string): LoaderState<T> {
  return state.entities[id] ?? initialLoaderState;
}
