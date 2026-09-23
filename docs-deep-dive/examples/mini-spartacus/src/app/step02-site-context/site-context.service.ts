/**
 * STEP 02 - Stato del Site Context (baseSite, language, currency)
 * Ispirato a:
 *  - core-libs/core/src/site-context/services/site-context-params.service.ts (SiteContextParamsService)
 *  - core-libs/core/src/site-context/facade/language.service.ts / currency.service.ts / base-site.service.ts
 *
 * Spartacus tiene questi valori nello store NgRx e ha un servizio per parametro.
 * Qui usiamo un solo servizio con un BehaviorSubject per parametro: piu' semplice, stessa API.
 */
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Config } from '../step01-config/config';
import { getContextParameterDefault } from './site-context.config';

@Injectable({ providedIn: 'root' })
export class SiteContextService {
  private readonly config = inject(Config);
  private readonly state = new Map<string, BehaviorSubject<string>>();

  /** Parametri da codificare nell'URL, es. ['baseSite', 'language', 'currency']. */
  getUrlEncodingParameters(): string[] {
    return this.config.context?.urlParameters ?? [];
  }

  /** Valori ammessi per un parametro (dalla config). */
  getValues(param: string): string[] {
    return this.config.context?.[param] ?? [];
  }

  /** Valore attivo, in modo sincrono (utile negli interceptor e nel serializer). */
  getActiveValue(param: string): string {
    return this.subject(param).value;
  }

  /** Valore attivo come stream: emette ad ogni cambio. */
  getActive(param: string): Observable<string> {
    return this.subject(param).pipe(distinctUntilChanged());
  }

  /** Cambia il valore attivo. I valori non ammessi vengono ignorati (come isValid() in Spartacus). */
  setActive(param: string, value: string): void {
    if (this.getValues(param).includes(value)) {
      this.subject(param).next(value);
    }
  }

  private subject(param: string): BehaviorSubject<string> {
    let subject = this.state.get(param);
    if (!subject) {
      subject = new BehaviorSubject<string>(getContextParameterDefault(this.config, param) ?? '');
      this.state.set(param, subject);
    }
    return subject;
  }
}
