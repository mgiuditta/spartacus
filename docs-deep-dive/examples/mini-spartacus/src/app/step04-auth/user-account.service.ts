/**
 * STEP 04 - Dati dell'utente loggato (GET users/current)
 * Ispirato a:
 *  - feature-libs/user/account/core/facade/user-account.service.ts (UserAccountService.get)
 *  - feature-libs/user/account/occ/adapters/config/default-occ-user-account-endpoint.config.ts (user: 'users/${userId}')
 */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';
import { OccEndpointsService } from '../step03-occ-endpoints/occ-endpoints.service';
import { OCC_USER_ID_CURRENT, User } from './auth.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserAccountService {
  private readonly http = inject(HttpClient);
  private readonly occEndpoints = inject(OccEndpointsService);
  private readonly authService = inject(AuthService);

  private readonly user$: Observable<User | undefined> = this.authService.getUserId().pipe(
    switchMap((userId) =>
      userId === OCC_USER_ID_CURRENT
        ? this.http
            .get<User>(this.occEndpoints.buildUrl('user', { urlParams: { userId } }))
            .pipe(catchError(() => of(undefined)))
        : of(undefined)
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  get(): Observable<User | undefined> {
    return this.user$;
  }
}
