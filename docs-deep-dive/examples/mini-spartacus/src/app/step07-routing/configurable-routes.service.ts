/**
 * STEP 07 - Applica i path configurati alle rotte con data.cxRoute
 * Ispirato a: core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts
 *   (ConfigurableRoutesService.init/configure/configureRoutes/configureRoute)
 *
 * Differenza: Spartacus con piu' path usa un UrlMatcher combinato (UrlMatcherService.getFromPaths).
 * Qui, per semplicita', duplichiamo la rotta: una copia per ogni path.
 */
import { inject, Injectable, isDevMode } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { Config } from '../step01-config/config';
import { RouteConfig } from './routing-config';

/** Path segnaposto: una rotta cxRoute non configurata non deve mai combaciare. */
export const UNCONFIGURED_ROUTE_PREFIX = '__cx-unconfigured__';

@Injectable({ providedIn: 'root' })
export class ConfigurableRoutesService {
  private readonly config = inject(Config);
  private readonly router = inject(Router);
  private initialized = false;

  init(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    this.router.resetConfig(this.configureRoutes(this.router.config));
  }

  getRouteConfig(routeName: string): RouteConfig | undefined {
    return this.config.routing?.routes?.[routeName];
  }

  private configureRoutes(routes: Routes): Routes {
    return routes.flatMap((route) => {
      const configured = this.configureRoute(route);
      return configured.map((r) => (r.children?.length ? { ...r, children: this.configureRoutes(r.children) } : r));
    });
  }

  private configureRoute(route: Route): Route[] {
    const routeName = route.data?.['cxRoute'] as string | undefined;
    if (!routeName) {
      return [route]; // rotta "normale": invariata
    }
    const routeConfig = this.getRouteConfig(routeName);
    if (!routeConfig?.paths?.length || routeConfig.disabled) {
      if (isDevMode() && !routeConfig?.disabled) {
        console.warn(`Nessun path configurato per la rotta "${routeName}"`);
      }
      return []; // rotta spenta
    }
    return routeConfig.paths.map((path) => ({ ...route, path }));
  }
}
