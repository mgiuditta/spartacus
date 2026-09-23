/**
 * STEP 08 - Guard: la rotta si attiva solo quando la pagina CMS e' pronta
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/guards/cms-page.guard.ts        (CmsPageGuard.canActivate)
 *  - core-libs/storefront/cms-structure/guards/cms-page-guard.service.ts (canActivatePage / canActivateNotFoundPage)
 *
 * Vantaggio: niente "flash" di pagina vuota, e in SSR il render aspetta i dati CMS.
 */
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { CmsService } from './cms.service';
import { pageContextFromSnapshot } from './page-context';

export const cmsPageGuard: CanActivateFn = (route) =>
  inject(CmsService)
    .loadPageOrNotFound(pageContextFromSnapshot(route))
    .pipe(
      take(1),
      map(() => true)
    );
