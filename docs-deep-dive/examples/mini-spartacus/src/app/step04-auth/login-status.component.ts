/**
 * STEP 04 - "Ciao Mario / Accedi" nell'header (componente CMS 'LoginComponent')
 * Ispirato a: feature-libs/user/account/components/login/login.component.ts (LoginComponent)
 */
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UrlPipe } from '../step07-routing/url.pipe';
import { AuthService } from './auth.service';
import { UserAccountService } from './user-account.service';

@Component({
  selector: 'cx-login-status',
  imports: [AsyncPipe, RouterLink, UrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (user$ | async; as user) {
      <span>Ciao {{ user.firstName ?? user.uid }}</span>
      <button type="button" (click)="logout()">Esci</button>
    } @else {
      <a [routerLink]="{ cxRoute: 'login' } | cxUrl">Accedi</a>
    }
  `,
})
export class LoginStatusComponent {
  private readonly authService = inject(AuthService);
  readonly user$ = inject(UserAccountService).get();

  logout(): void {
    this.authService.logout();
  }
}
