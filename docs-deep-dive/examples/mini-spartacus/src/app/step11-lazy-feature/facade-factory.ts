/**
 * STEP 11 - facadeFactory: un proxy che carica la feature al primo utilizzo
 * Ispirato a:
 *  - core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts         (facadeFactory)
 *  - core-libs/core/src/lazy-loading/facade-factory/facade-factory.service.ts (FacadeFactoryService.create/call/get/getResolver)
 *  - core-libs/core/src/lazy-loading/facade-factory/facade-descriptor.ts      (FacadeDescriptor, MethodKeys, PropertyKeys)
 *
 * Il facade astratto e' "providedIn: root" con useFactory: () => facadeFactory({...}).
 * Finche' la feature non e' caricata, chi inietta il facade riceve il PROXY.
 * Ogni metodo del proxy: carica la feature -> prende il servizio vero dal suo injector -> lo chiama.
 */
import { AbstractType, inject } from '@angular/core';
import { connectable, EMPTY, isObservable, Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { FeatureModulesService } from './feature-modules';

/** Solo metodi che restituiscono void o Observable si possono "proxare" (il risultato arriva dopo). */
type MethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: never[]) => void | Observable<unknown> ? K : never;
}[keyof T];

type PropertyKeys<T> = {
  [K in keyof T]: T[K] extends Observable<unknown> ? K : never;
}[keyof T];

export interface FacadeDescriptor<T> {
  facade: AbstractType<T>;
  feature: string;
  methods?: MethodKeys<T>[];
  properties?: PropertyKeys<T>[];
}

export function facadeFactory<T extends object>(descriptor: FacadeDescriptor<T>): T {
  const featureModules = inject(FeatureModulesService);

  // Il servizio "vero", preso dall'injector della feature appena caricata.
  const realService$: Observable<Record<string, unknown>> = featureModules.resolveFeature(descriptor.feature).pipe(
    map((feature) => feature.injector.get(descriptor.facade) as unknown as Record<string, unknown>),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  // Il proxy estende la classe astratta: "instanceof" continua a funzionare.
  const ProxyClass = class extends (descriptor.facade as unknown as new () => object) {};
  const proxy = new ProxyClass() as Record<string, unknown>;

  for (const method of descriptor.methods ?? []) {
    proxy[method as string] = (...args: unknown[]) => {
      // connectable + connect(): la chiamata parte SUBITO, anche se nessuno fa subscribe
      // (serve per i metodi "void" come addEntry).
      const result$ = connectable(
        realService$.pipe(map((service) => (service[method as string] as (...a: unknown[]) => unknown)(...args))),
        { connector: () => new ReplaySubject<unknown>(1), resetOnDisconnect: false }
      );
      result$.connect();
      return result$.pipe(switchMap((result) => (isObservable(result) ? result : EMPTY)));
    };
  }

  for (const property of descriptor.properties ?? []) {
    proxy[property as string] = realService$.pipe(switchMap((service) => service[property as string] as Observable<unknown>));
  }

  proxy['proxyFacadeInstance'] = true;
  return proxy as unknown as T;
}
