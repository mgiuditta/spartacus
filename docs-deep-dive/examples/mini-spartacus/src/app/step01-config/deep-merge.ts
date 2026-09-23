/**
 * STEP 01 - deepMerge
 * Ispirato a: core-libs/core/src/config/utils/deep-merge.ts (funzioni isObject, deepMerge)
 *
 * Unisce "in profondita'" piu' oggetti nel primo (target).
 * - Gli oggetti annidati vengono fusi chiave per chiave.
 * - Array, stringhe, numeri, funzioni e classi vengono SOSTITUITI (vince l'ultimo).
 * - Le chiavi pericolose (__proto__, constructor) vengono ignorate (prototype pollution).
 */
export type PlainObject = Record<string, unknown>;

export function isObject(item: unknown): item is PlainObject {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

function isRestricted(key: string): boolean {
  return key === '__proto__' || key === 'constructor';
}

export function deepMerge<T extends object>(target: T, ...sources: unknown[]): T {
  const result = target as unknown as PlainObject;
  for (const source of sources) {
    if (!isObject(source)) {
      continue; // null, undefined, array: saltati come in Spartacus
    }
    for (const key of Object.keys(source)) {
      if (isRestricted(key)) {
        continue;
      }
      const value = source[key];
      if (value instanceof Date) {
        result[key] = value;
      } else if (isObject(value)) {
        if (!isObject(result[key])) {
          result[key] = {};
        }
        deepMerge(result[key] as PlainObject, value);
      } else {
        result[key] = value;
      }
    }
  }
  return target;
}
