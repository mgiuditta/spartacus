/**
 * STEP 03 - Configurazione OCC ed endpoint di default
 * Ispirato a:
 *  - core-libs/core/src/occ/config/occ-config.ts          (OccConfig + declare module)
 *  - core-libs/core/src/occ/config/default-occ-config.ts  (prefix '/occ/v2/')
 *  - core-libs/core/src/occ/occ-models/occ-endpoints.model.ts (OccEndpoint, DEFAULT_SCOPE)
 *  - core-libs/core/src/occ/adapters/product/default-occ-product-config.ts (endpoint product con scope)
 *  - core-libs/core/src/occ/adapters/site-context/default-occ-site-context-config.ts
 *  - core-libs/core/src/cms/config/default-cms-config.ts
 *  - feature-libs/cart/base/occ/config/default-occ-cart-config-factory.ts
 */
export const DEFAULT_SCOPE = 'default';

/** Un endpoint puo' essere una stringa o una mappa scope -> stringa (scope = diversi "fields"). */
export interface OccEndpoint {
  [scope: string]: string;
}

export interface OccEndpoints {
  [endpointName: string]: string | OccEndpoint;
}

export interface OccConfig {
  backend?: {
    occ?: {
      /** Es. 'http://localhost:9002'. Vuoto = stesso host dell'app. */
      baseUrl?: string;
      /** Es. '/occ/v2/'. */
      prefix?: string;
      endpoints?: OccEndpoints;
    };
    media?: {
      /** Base per le immagini; se assente si usa backend.occ.baseUrl. */
      baseUrl?: string;
    };
  };
}

declare module '../step01-config/config' {
  interface Config extends OccConfig {}
}

export const defaultOccConfig: OccConfig = {
  backend: {
    occ: {
      prefix: '/occ/v2/',
      endpoints: {
        baseSites: 'basesites?fields=FULL',
        languages: 'languages',
        currencies: 'currencies',
        // Endpoint con SCOPE: stesso URL, "fields" diversi a seconda di quanto dato serve.
        product: {
          default: 'products/${productCode}?fields=DEFAULT,description,images(FULL),stock(FULL),categories(FULL)',
          list: 'products/${productCode}?fields=code,name,summary,price(formattedValue),images(DEFAULT)',
        },
        productSearch:
          'products/search?fields=products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL)),pagination(DEFAULT),freeTextSearch',
        // In Spartacus 2611 i CMS endpoint sono 'users/${userId}/cms/pages': qui la forma classica.
        pages: 'cms/pages?fields=DEFAULT',
        page: 'cms/pages/${id}?fields=DEFAULT',
        components: 'cms/components?fields=DEFAULT',
        user: 'users/${userId}',
        carts: 'users/${userId}/carts?fields=DEFAULT',
        cart: 'users/${userId}/carts/${cartId}?fields=DEFAULT',
        createCart: 'users/${userId}/carts?fields=DEFAULT',
        addEntries: 'users/${userId}/carts/${cartId}/entries',
        updateEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
        removeEntries: 'users/${userId}/carts/${cartId}/entries/${entryNumber}',
      },
    },
  },
};
