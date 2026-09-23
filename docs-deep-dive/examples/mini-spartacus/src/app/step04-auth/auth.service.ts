/**
 * STEP 04 - Login OAuth2 "password grant" + refresh token
 * Ispirato a:
 *  - core-libs/core/src/auth/user-auth/facade/auth.service.ts (AuthService.loginWithCredentials, coreLogout, refreshInProgress$)
 *  - core-libs/core/src/auth/user-auth/services/oauth-lib-wrapper.service.ts (authorizeWithPasswordFlow, refreshToken)
 *  - core-libs/core/src/auth/user-auth/services/auth-config.service.ts (getTokenEndpoint)
 *  - core-libs/core/src/auth/user-auth/facade/user-id.service.ts (UserIdService.getUserId)
 *
 * Spartacus usa la libreria angular-oauth2-oidc; qui facciamo le POST a mano per vedere cosa succede.
 */
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { distinctUntilChanged, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { Config } from '../step01-config/config';
import { AuthStorageService } from './auth-storage.service';
import { AuthToken, OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT, TokenResponse } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(Config);
  private readonly storage = inject(AuthStorageService);

  /** Refresh in corso: condiviso fra tutte le richieste che ricevono 401 nello stesso momento. */
  private refreshInProgress$?: Observable<AuthToken>;

  getTokenEndpoint(): string {
    const auth = this.config.authentication;
    const base = auth?.baseUrl ?? `${this.config.backend?.occ?.baseUrl ?? ''}/authorizationserver`;
    return base + (auth?.tokenEndpoint ?? '/oauth/token');
  }

  /** 'current' se loggato, 'anonymous' altrimenti: e' il ${userId} degli endpoint OCC. */
  getUserId(): Observable<string> {
    return this.storage.getToken().pipe(
      map((token) => (token?.access_token ? OCC_USER_ID_CURRENT : OCC_USER_ID_ANONYMOUS)),
      distinctUntilChanged()
    );
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.getUserId().pipe(map((id) => id === OCC_USER_ID_CURRENT));
  }

  /** grant_type=password. Risolve la Promise quando il token e' salvato. */
  async loginWithCredentials(username: string, password: string): Promise<void> {
    const token = await firstValueFrom(this.requestToken({ grant_type: 'password', username, password }));
    this.storage.setToken(token);
  }

  /** grant_type=refresh_token. Una sola richiesta anche se chiamato N volte in parallelo. */
  refreshToken(): Observable<AuthToken> {
    const refreshToken = this.storage.getTokenValue()?.refresh_token;
    if (!refreshToken) {
      return throwError(() => new Error('Nessun refresh token disponibile'));
    }
    if (!this.refreshInProgress$) {
      this.refreshInProgress$ = this.requestToken({ grant_type: 'refresh_token', refresh_token: refreshToken }).pipe(
        tap((token) => this.storage.setToken(token)),
        finalize(() => (this.refreshInProgress$ = undefined)),
        shareReplay({ bufferSize: 1, refCount: false })
      );
    }
    return this.refreshInProgress$;
  }

  /** Logout: revoca (best effort) e cancella il token locale. */
  logout(): void {
    const token = this.storage.getTokenValue();
    this.storage.setToken(undefined);
    if (token?.access_token) {
      const revokeUrl = this.getTokenEndpoint().replace(/\/token$/, '/revoke');
      this.http
        .post(revokeUrl, new HttpParams().set('token', token.access_token), { headers: this.formHeaders() })
        .subscribe({ error: () => undefined });
    }
  }

  private requestToken(params: Record<string, string>): Observable<AuthToken> {
    const auth = this.config.authentication;
    const body = new HttpParams({
      fromObject: { ...params, client_id: auth?.client_id ?? '', client_secret: auth?.client_secret ?? '' },
    });
    return this.http.post<TokenResponse>(this.getTokenEndpoint(), body, { headers: this.formHeaders() }).pipe(
      map((response) => ({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
        token_type: response.token_type,
        expires_at: response.expires_in ? Date.now() + response.expires_in * 1000 : undefined,
        granted_scopes: response.scope?.split(' '),
      }))
    );
  }

  private formHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  }
}
