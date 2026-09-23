/**
 * STEP 07 - Rotte configurabili
 * Ispirato a:
 *  - core-libs/core/src/routing/configurable-routes/routes-config.ts (RoutesConfig, RouteConfig, ParamsMapping)
 *  - core-libs/core/src/routing/configurable-routes/config/routing-config.ts (RoutingConfig + declare module)
 *  - core-libs/storefront/cms-structure/routing/default-routing-config.ts (default: product/:productCode/:name ...)
 *
 * Le rotte dell'app hanno un NOME (data.cxRoute). Il PATH vero viene dalla configurazione,
 * quindi un cliente puo' cambiare 'product/:productCode' in 'p/:productCode' senza toccare codice.
 */
export interface ParamsMapping {
  /** nome parametro nel path -> nome proprieta' nell'oggetto passato a cxUrl */
  [paramName: string]: string;
}

export interface RouteConfig {
  /** Il primo path "riempibile" coi parametri dati viene usato per generare i link. */
  paths?: string[];
  paramsMapping?: ParamsMapping;
  /** true = rotta spenta. */
  disabled?: boolean;
}

export interface RoutesConfig {
  [routeName: string]: RouteConfig | undefined;
}

export interface RoutingConfig {
  routing?: {
    routes?: RoutesConfig;
  };
}

declare module '../step01-config/config' {
  interface Config extends RoutingConfig {}
}

export const defaultRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      home: { paths: [''] },
      product: {
        paths: ['product/:productCode/:name', 'product/:productCode'],
        paramsMapping: { productCode: 'code', name: 'slug' },
      },
      search: { paths: ['search/:query'] },
      cart: { paths: ['cart'] },
      login: { paths: ['login'] },
    },
  },
};
