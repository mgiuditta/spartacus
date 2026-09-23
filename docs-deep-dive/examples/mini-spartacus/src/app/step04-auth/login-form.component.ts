/**
 * STEP 04 - Form di login (componente CMS 'ReturningCustomerLoginComponent')
 * Ispirato a:
 *  - feature-libs/user/account/components/login-form/login-form.component.ts (LoginFormComponent)
 *  - feature-libs/user/account/components/login-form/login-form-component.service.ts (login -> AuthService.loginWithCredentials)
 */
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SemanticPathService } from '../step07-routing/semantic-path.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'cx-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="cx-login-form" (submit)="submit($event, email.value, password.value)">
      <h2>Accedi</h2>
      <label>Email <input #email type="email" name="email" autocomplete="username" value="demo@spartacus.test" /></label>
      <label>Password <input #password type="password" name="password" autocomplete="current-password" value="Password123." /></label>
      <button type="submit" [disabled]="busy()">Accedi</button>
      @if (error()) {
        <p role="alert" class="error">{{ error() }}</p>
      }
    </form>
  `,
})
export class LoginFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly semanticPath = inject(SemanticPathService);

  readonly busy = signal(false);
  readonly error = signal<string | undefined>(undefined);

  async submit(event: Event, email: string, password: string): Promise<void> {
    event.preventDefault();
    this.busy.set(true);
    this.error.set(undefined);
    try {
      await this.authService.loginWithCredentials(email, password);
      await this.router.navigate(this.semanticPath.transform({ cxRoute: 'home' }));
    } catch {
      this.error.set('Credenziali non valide');
    } finally {
      this.busy.set(false);
    }
  }
}
