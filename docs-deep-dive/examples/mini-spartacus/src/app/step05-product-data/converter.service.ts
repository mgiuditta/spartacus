/**
 * STEP 05 - Converter: trasformano i dati OCC nel modello dell'app
 * Ispirato a: core-libs/core/src/util/converter.service.ts (Converter, ConverterService.pipeable/convert/convertMany)
 *
 * Un "token di converter" e' un InjectionToken MULTI: chiunque puo' aggiungere un converter
 * (anche una feature o l'app) senza toccare il codice originale.
 * I converter vengono applicati in catena: l'output di uno e' il "target" del successivo.
 */
import { inject, Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Converter<SOURCE, TARGET> {
  convert(source: SOURCE, target?: TARGET): TARGET;
}

@Injectable({ providedIn: 'root' })
export class ConverterService {
  private readonly injector = inject(Injector);
  private readonly cache = new Map<InjectionToken<unknown>, Converter<unknown, unknown>[]>();

  private getConverters<S, T>(token: InjectionToken<Converter<S, T>[]>): Converter<S, T>[] {
    if (!this.cache.has(token)) {
      // [] come valore di default: nessun converter registrato = dato passato cosi' com'e'.
      this.cache.set(token, this.injector.get(token, [] as Converter<S, T>[]) as Converter<unknown, unknown>[]);
    }
    return this.cache.get(token) as Converter<S, T>[];
  }

  hasConverters<S, T>(token: InjectionToken<Converter<S, T>[]>): boolean {
    return this.getConverters(token).length > 0;
  }

  convert<S, T>(source: S, token: InjectionToken<Converter<S, T>[]>): T {
    const converters = this.getConverters(token);
    if (!converters.length) {
      return source as unknown as T;
    }
    return converters.reduce<T | undefined>((target, converter) => converter.convert(source, target), undefined) as T;
  }

  convertMany<S, T>(sources: S[], token: InjectionToken<Converter<S, T>[]>): T[] {
    return sources.map((source) => this.convert(source, token));
  }

  /** Operatore RxJS: http.get(...).pipe(converter.pipeable(PRODUCT_NORMALIZER)) */
  pipeable<S, T>(token: InjectionToken<Converter<S, T>[]>): OperatorFunction<S, T> {
    return (source$: Observable<S>) => source$.pipe(map((value) => this.convert(value, token)));
  }
}
