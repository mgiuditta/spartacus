/**
 * STEP 04 - AuthInterceptor: header Bearer + retry dopo refresh su 401
 * Ispirato a:
 *  - core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts (AuthInterceptor.intercept, isExpiredToken)
 *  - core-libs/core/src/auth/user-auth/services/auth-http-header.service.ts (alterRequest, handleExpiredAccessToken,
 *    handleExpiredRefreshToken, shouldAddAuthorizationHeader)
 *
 * Flusso:
 *  1. se la richiesta va a OCC e abbiamo un token -> aggiungo "Authorization: Bearer ..."
 *  2. se OCC risponde 401 con errors[0].type = InvalidTokenError -> refresh del token
 *  3. rifaccio la STESSA richiesta col token nuovo (una sola volta)
 *  4. se anche il refresh fallisce -> logout e rilancio l'errore originale
 */
import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { AuthStorageService } from './auth-storage.service';
import { AuthService } from './auth.service';

function withBearer(request: HttpRequest<unknown>, accessToken: string | undefined): HttpRequest<unknown> {
  // Se il chiamante ha gia' messo un Authorization (es. client_credentials) non lo tocchiamo.
  if (!accessToken || request.headers.has('Authorization')) {
    return request;
  }
  return request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
}

function isExpiredToken(error: HttpErrorResponse): boolean {
  const type = (error.error as { errors?: { type?: string }[] } | null)?.errors?.[0]?.type;
  return type === 'InvalidTokenError' || type === 'InvalidBearerTokenError';
}

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const storage = inject(AuthStorageService);
  const occEndpoints = inject(OccEndpointsService);

  const isOccRequest = request.url.includes(occEndpoints.getBaseUrl({ baseSite: false }));
  const isTokenRequest = request.url.includes(authService.getTokenEndpoint());
  if (!isOccRequest || isTokenRequest) {
    return next(request);
  }

  const token = storage.getTokenValue();
  const authorized = withBearer(request, token?.access_token);

  return next(authorized).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && token?.refresh_token && isExpiredToken(error)) {
        return authService.refreshToken().pipe(
          catchError(() => {
            // refresh token scaduto/invalid_grant -> utente sloggato (handleExpiredRefreshToken)
            authService.logout();
            return throwError(() => error);
          }),
          switchMap((newToken) => next(withBearer(request, newToken.access_token)))
        );
      }
      return throwError(() => error);
    })
  );
};
