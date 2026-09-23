/**
 * STEP 10 - Modello degli outlet
 * Ispirato a: core-libs/storefront/cms-structure/outlet/outlet.model.ts (OutletPosition, OutletContextData)
 */
export enum OutletPosition {
  REPLACE = 'replace',
  BEFORE = 'before',
  AFTER = 'after',
}

/** Iniettabile nei COMPONENTI registrati su un outlet: sa dove e con quale contesto sono renderizzati. */
export abstract class OutletContextData<T = unknown> {
  abstract readonly reference: string;
  abstract readonly position: OutletPosition;
  abstract readonly context: T;
}
