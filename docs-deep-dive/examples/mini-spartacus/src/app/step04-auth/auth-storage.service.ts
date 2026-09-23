/**
 * STEP 04 - Dove vive il token
 * Ispirato a:
 *  - core-libs/core/src/auth/user-auth/services/auth-storage.service.ts (AuthStorageService: getToken/setToken)
 *  - core-libs/core/src/auth/user-auth/services/auth-state-persistence.service.ts (persistenza in localStorage)
 *
 * In memoria un BehaviorSubject; nel browser anche localStorage, cosi' il login sopravvive al refresh.
 * Sul server (SSR) NON c'e' localStorage: l'utente e' sempre anonimo.
 */
import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthToken } from './auth.model';

const STORAGE_KEY = 'mini-spartacus-auth';

@Injectable({ providedIn: 'root' })
export class AuthStorageService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly token$ = new BehaviorSubject<AuthToken | undefined>(this.readFromStorage());

  getToken(): Observable<AuthToken | undefined> {
    return this.token$.asObservable();
  }

  getTokenValue(): AuthToken | undefined {
    return this.token$.value;
  }

  setToken(token: AuthToken | undefined): void {
    this.token$.next(token);
    this.writeToStorage(token);
  }

  private readFromStorage(): AuthToken | undefined {
    if (!this.isBrowser) {
      return undefined;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthToken) : undefined;
    } catch {
      return undefined; // storage bloccato o JSON corrotto: si riparte da anonimo
    }
  }

  private writeToStorage(token: AuthToken | undefined): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(token));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // storage non disponibile (modalita' privata): il token resta solo in memoria
    }
  }
}
