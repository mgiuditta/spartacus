/**
 * STEP 01 - Sistema di configurazione
 * Ispirato a:
 *  - core-libs/core/src/config/config-tokens.ts   (Config, ConfigChunk, DefaultConfigChunk, RootConfig, DefaultConfig)
 *  - core-libs/core/src/config/config-providers.ts (provideConfig, provideDefaultConfig, provideConfigFactory)
 *
 * Idea: ogni libreria/feature registra un PEZZO ("chunk") di configurazione con un
 * token multi. All'avvio tutti i pezzi vengono fusi con deepMerge:
 *   Config finale = deepMerge({}, ...defaultChunks, ...rootChunks)
 * I "default" (scritti dalle librerie) perdono sempre contro i "root" (scritti dall'app).
 */
import { FactoryProvider, inject, Injectable, InjectionToken, ValueProvider } from '@angular/core';
import { deepMerge } from './deep-merge';

/**
 * La configurazione globale. E' una classe astratta usata come token DI:
 * `inject(Config)` restituisce l'oggetto fuso.
 *
 * E' VUOTA di proposito: ogni step la estende con il "declaration merging" di TypeScript:
 *   declare module '../step01-config/config' { interface Config extends OccConfig {} }
 * Esattamente come fa Spartacus (es. core-libs/core/src/occ/config/occ-config.ts).
 */
@Injectable({
  providedIn: 'root',
  useFactory: () => deepMerge({}, inject(DefaultConfig), inject(RootConfig)),
})
export abstract class Config {}

/** Pezzi di configurazione scritti dall'APPLICAZIONE (priorita' alta). */
export const ConfigChunk = new InjectionToken<Config[]>('ConfigurationChunk');

/** Pezzi di configurazione di DEFAULT scritti dalle librerie/feature (priorita' bassa). */
export const DefaultConfigChunk = new InjectionToken<Config[]>('DefaultConfigurationChunk');

/** Tutti i default fusi insieme. */
export const DefaultConfig = new InjectionToken<Config>('DefaultConfiguration', {
  providedIn: 'root',
  factory: () => deepMerge({}, ...(inject(DefaultConfigChunk, { optional: true }) ?? [])),
});

/** Tutti i chunk dell'app fusi insieme. */
export const RootConfig = new InjectionToken<Config>('RootConfiguration', {
  providedIn: 'root',
  factory: () => deepMerge({}, ...(inject(ConfigChunk, { optional: true }) ?? [])),
});

/** Registra un pezzo di configurazione dell'app (o di default se defaultConfig = true). */
export function provideConfig(config: Config = {}, defaultConfig = false): ValueProvider {
  return { provide: defaultConfig ? DefaultConfigChunk : ConfigChunk, useValue: config, multi: true };
}

/** Registra un pezzo di configurazione di default (usato dalle "librerie"). */
export function provideDefaultConfig(config: Config = {}): ValueProvider {
  return { provide: DefaultConfigChunk, useValue: config, multi: true };
}

/**
 * Come provideConfig ma calcolato da una factory eseguita in contesto di injection
 * (quindi dentro la factory si puo' usare inject()).
 */
export function provideConfigFactory(factory: () => Config, defaultConfig = false): FactoryProvider {
  return { provide: defaultConfig ? DefaultConfigChunk : ConfigChunk, useFactory: factory, multi: true };
}
