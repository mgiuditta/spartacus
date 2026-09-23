/**
 * STEP 11 - Implementazione vera del carrello (vive nel chunk lazy)
 * Ispirato a:
 *  - feature-libs/cart/base/core/facade/active-cart.service.ts   (ActiveCartService: carrello anonimo/utente, merge al login)
 *  - feature-libs/cart/base/core/facade/multi-cart.service.ts    (createCart, addEntry, updateEntry, removeEntry)
 *  - feature-libs/cart/base/occ/adapters/occ-cart.adapter.ts      (POST users/{userId}/carts?oldCartId=... per il merge)
 *  - feature-libs/cart/base/occ/adapters/occ-cart-entry.adapter.ts (POST entries JSON {product:{code},quantity}, PATCH, DELETE)
 *  - feature-libs/cart/base/core/services/multi-cart-state-persistence.service.ts (guid anonimo persistito nel browser)
 *
 * Regole OCC da ricordare:
 *  - utente anonimo: il carrello si identifica col GUID ->  users/anonymous/carts/{guid}
 *  - utente loggato: col CODE (o 'current')           ->  users/current/carts/{code}
 */
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { OccEndpointsService } from '../../step03-occ-endpoints/occ-endpoints.service';
import { OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT } from '../../step04-auth/auth.model';
import { AuthService } from '../../step04-auth/auth.service';
import { ActiveCartFacade } from './active-cart.facade';
import { Cart } from './cart.model';

const CART_STORAGE_KEY = 'mini-spartacus-anonymous-cart';
const JSON_HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()
export class ActiveCartService implements ActiveCartFacade, OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly authService = inject(AuthService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly cart$ = new BehaviorSubject<Cart | undefined>(undefined);
  private userId: string | undefined;
  private cartCreation$?: Observable<string>;

  private readonly subscription = this.authService.getUserId().subscribe((userId) => this.onUserChange(userId));

  getActive(): Observable<Cart | undefined> {
    return this.cart$.asObservable();
  }

  addEntry(productCode: string, quantity: number): void {
    this.ensureCart()
      .pipe(
        switchMap((cartId) =>
          this.http.post(
            this.url('addEntries', { cartId }),
            { product: { code: productCode }, quantity },
            { headers: JSON_HEADERS }
          )
        ),
        switchMap(() => this.reload())
      )
      .subscribe({ error: (e: unknown) => console.error('addEntry fallita', e) });
  }

  updateEntry(entryNumber: number, quantity: number): void {
    const cartId = this.currentCartId();
    if (!cartId) {
      return;
    }
    this.http
      .patch(this.url('updateEntries', { cartId, entryNumber }), { quantity }, { headers: JSON_HEADERS })
      .pipe(switchMap(() => this.reload()))
      .subscribe({ error: (e: unknown) => console.error('updateEntry fallita', e) });
  }

  removeEntry(entryNumber: number): void {
    const cartId = this.currentCartId();
    if (!cartId) {
      return;
    }
    this.http
      .delete(this.url('removeEntries', { cartId, entryNumber }))
      .pipe(switchMap(() => this.reload()))
      .subscribe({ error: (e: unknown) => console.error('removeEntry fallita', e) });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // ---------------------------------------------------------------------------

  private onUserChange(userId: string): void {
    const previous = this.userId;
    this.userId = userId;
    if (!this.isBrowser) {
      return; // in SSR niente carrello: e' un dato personale, non va in cache ne' in TransferState
    }
    if (userId === OCC_USER_ID_CURRENT) {
      const anonymousGuid = previous !== OCC_USER_ID_CURRENT ? this.readGuid() : undefined;
      const load$ = anonymousGuid
        ? // login con carrello anonimo: il backend lo fonde in un carrello utente
          this.http.post<Cart>(this.url('createCart', {}, { oldCartId: anonymousGuid }), {}, { headers: JSON_HEADERS })
        : this.http.get<Cart>(this.url('cart', { cartId: 'current' }));
      load$.pipe(catchError(() => of(undefined))).subscribe((cart) => {
        this.writeGuid(undefined);
        this.cart$.next(cart);
      });
    } else if (previous === OCC_USER_ID_CURRENT) {
      this.cart$.next(undefined); // logout: si riparte senza carrello
    } else {
      const guid = this.readGuid();
      if (guid) {
        this.http
          .get<Cart>(this.url('cart', { cartId: guid }))
          .pipe(catchError(() => of(undefined)))
          .subscribe((cart) => {
            if (!cart) {
              this.writeGuid(undefined);
            }
            this.cart$.next(cart);
          });
      }
    }
  }

  /** Restituisce l'id del carrello, creandolo se non esiste (una sola creazione anche con doppio click). */
  private ensureCart(): Observable<string> {
    const existing = this.currentCartId();
    if (existing) {
      return of(existing);
    }
    if (!this.cartCreation$) {
      this.cartCreation$ = this.http.post<Cart>(this.url('createCart'), {}, { headers: JSON_HEADERS }).pipe(
        tap((cart) => {
          this.cart$.next(cart);
          if (this.userId !== OCC_USER_ID_CURRENT) {
            this.writeGuid(cart.guid);
          }
        }),
        map(() => this.currentCartId() ?? ''),
        finalize(() => (this.cartCreation$ = undefined)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.cartCreation$;
  }

  private reload(): Observable<Cart | undefined> {
    const cartId = this.currentCartId();
    if (!cartId) {
      return EMPTY;
    }
    return this.http.get<Cart>(this.url('cart', { cartId })).pipe(tap((cart) => this.cart$.next(cart)));
  }

  private currentCartId(): string | undefined {
    const cart = this.cart$.value;
    return this.userId === OCC_USER_ID_CURRENT ? cart?.code : cart?.guid;
  }

  private url(endpoint: string, urlParams: Record<string, unknown> = {}, queryParams?: Record<string, string>): string {
    return this.occEndpoints.buildUrl(endpoint, {
      urlParams: { userId: this.userId ?? OCC_USER_ID_ANONYMOUS, ...urlParams },
      queryParams,
    });
  }

  private readGuid(): string | undefined {
    try {
      return localStorage.getItem(CART_STORAGE_KEY) ?? undefined;
    } catch {
      return undefined;
    }
  }

  private writeGuid(guid: string | undefined): void {
    try {
      if (guid) {
        localStorage.setItem(CART_STORAGE_KEY, guid);
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch {
      // storage non disponibile: il carrello anonimo vive solo in memoria
    }
  }
}
