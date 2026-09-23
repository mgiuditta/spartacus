/**
 * Componente radice: header e footer guidati dal CMS, contenuto della pagina nel router-outlet.
 * Ispirato a:
 *  - core-libs/storefront/layout/main/storefront.component.ts / storefront.component.html
 *    (<cx-page-layout section="header">, <router-outlet>, <cx-page-layout section="footer">)
 *  - projects/storefrontapp/src/app/app.component.ts (<cx-storefront>)
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayoutComponent } from './step09-page-layout/page-layout.component';
import { OutletDemoComponent } from './step10-outlets/outlet-demo.component';

@Component({
  selector: 'cx-root',
  imports: [RouterOutlet, PageLayoutComponent, OutletDemoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <cx-page-layout section="header" />
    </header>
    <main>
      <router-outlet />
    </main>
    <footer>
      <cx-page-layout section="footer" />
    </footer>
    <!-- STEP 10: registra template sugli outlet (non disegna nulla qui) -->
    <cx-outlet-demo />
  `,
})
export class AppComponent {}
