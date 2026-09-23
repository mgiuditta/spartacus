/**
 * Rotte dell'app. Le rotte con data.cxRoute hanno un path SEGNAPOSTO: il path vero
 * arriva dalla configurazione (STEP 07, ConfigurableRoutesService).
 * Ispirato a:
 *  - core-libs/storefront/cms-structure/routing/cms-route/add-cms-route.ts (rotta '**' con CmsPageGuard aggiunta all'avvio)
 *  - core-libs/storefront/cms-pages/product-details-page/product-details-page.module.ts
 *    (rotta { path: null, canActivate: [CmsPageGuard], component: PageLayoutComponent, data: { cxRoute: 'product' } })
 */
import { Route, Routes } from '@angular/router';
import { UNCONFIGURED_ROUTE_PREFIX } from './step07-routing/configurable-routes.service';
import { cmsPageGuard } from './step08-cms/cms-page.guard';
import { PageType } from './step08-cms/cms.model';
import { PageLayoutComponent } from './step09-page-layout/page-layout.component';

function cmsRoute(cxRoute: string, data: Record<string, unknown> = {}): Route {
  return {
    path: `${UNCONFIGURED_ROUTE_PREFIX}/${cxRoute}`,
    pathMatch: 'full',
    component: PageLayoutComponent,
    canActivate: [cmsPageGuard],
    runGuardsAndResolvers: 'always',
    data: { cxRoute, ...data },
  };
}

export const routes: Routes = [
  cmsRoute('home', { pageLabel: 'homepage' }),
  cmsRoute('product', { pageType: PageType.PRODUCT_PAGE }),
  cmsRoute('search', { pageLabel: 'search' }),
  cmsRoute('cart', { pageLabel: '/cart' }),
  cmsRoute('login', { pageLabel: '/login' }),
  // Tutto il resto: ContentPage CMS con label = URL (es. /faq). Se non esiste -> pagina CMS 'notFound'.
  { path: '**', component: PageLayoutComponent, canActivate: [cmsPageGuard], runGuardsAndResolvers: 'always' },
];
