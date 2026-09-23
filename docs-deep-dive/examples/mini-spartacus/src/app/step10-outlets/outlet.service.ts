/**
 * STEP 10 - OutletService: registro "nome outlet -> template/componenti"
 * Ispirato a: core-libs/storefront/cms-structure/outlet/outlet.service.ts (OutletService.add/get/remove)
 *
 * Differenze:
 *  - Spartacus registra TemplateRef o ComponentFactory; qui TemplateRef o Type (API moderna, niente factory).
 *  - Aggiungiamo changes$ per ri-renderizzare un outlet se un template arriva DOPO che l'outlet
 *    e' gia' stato disegnato (in Spartacus se ne occupa OutletRendererService).
 */
import { Injectable, TemplateRef, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OutletPosition } from './outlet.model';

export type OutletContent = TemplateRef<unknown> | Type<unknown>;

@Injectable({ providedIn: 'root' })
export class OutletService {
  private readonly store: Record<OutletPosition, Map<string, OutletContent[]>> = {
    [OutletPosition.BEFORE]: new Map(),
    [OutletPosition.REPLACE]: new Map(),
    [OutletPosition.AFTER]: new Map(),
  };
  private readonly changesSubject = new Subject<string>();

  /** Emette il nome dell'outlet ogni volta che il suo contenuto cambia. */
  readonly changes$: Observable<string> = this.changesSubject.asObservable();

  add(outlet: string, content: OutletContent, position: OutletPosition = OutletPosition.REPLACE): void {
    const map = this.store[position];
    map.set(outlet, [...(map.get(outlet) ?? []), content]);
    this.changesSubject.next(outlet);
  }

  /** Tutti i contenuti registrati ("stacked"); per REPLACE di solito si usa solo il primo. */
  get(outlet: string, position: OutletPosition = OutletPosition.REPLACE): OutletContent[] {
    return this.store[position].get(outlet) ?? [];
  }

  remove(outlet: string, position: OutletPosition = OutletPosition.REPLACE, content?: OutletContent): void {
    const map = this.store[position];
    if (!content) {
      map.delete(outlet);
    } else {
      map.set(outlet, (map.get(outlet) ?? []).filter((c) => c !== content));
    }
    this.changesSubject.next(outlet);
  }
}
