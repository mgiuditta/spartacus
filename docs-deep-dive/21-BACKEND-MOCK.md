# 21 - Backend mock OCC (Express)

STATO: COMPLETO

> Codice in `docs-deep-dive/examples/mock-backend/` (`server.ts`, `package.json`, `tsconfig.json`, `README.md`).
> Verifiche fatte: `tsc --noEmit` a zero errori; tutti i `curl` di questa pagina eseguiti davvero;
> mini-spartacus (`../mini-spartacus`) provato contro il mock in SSR e in un browser headless
> (home, prodotto, carrello anonimo, login con merge del carrello, token scaduto con refresh, cambio valuta,
> ricerca, logout). Lo `storefrontapp` reale **non** e' stato avviato in questo ambiente (vedi "Assunzioni" in fondo).

---

## In una frase

Un server Express di circa 450 righe che risponde come un piccolo SAP Commerce Cloud: stessi URL
(`/occ/v2/{baseSiteId}/...`, `/authorizationserver/oauth/token`), stessi formati JSON delle interfacce
`Occ.*` di Spartacus, stesso formato degli errori, cosi' che una storefront OCC possa girare senza backend vero.

## Il problema che risolve

Per studiare o sviluppare Spartacus serve un backend SAP Commerce: e' pesante da installare, spesso remoto,
lento, e i dati cambiano. Per capire il **contratto** fra frontend e backend e per provare i meccanismi dello
storefront (CMS, prodotti, carrello, OAuth, SSR) basta molto meno:

- pochi endpoint, con i formati giusti;
- dati deterministici (4 prodotti, 6 pagine CMS, un utente);
- comportamenti "difficili" riproducibili a comando: token che scade dopo pochi secondi (`TOKEN_TTL`),
  backend lento (`MOCK_DELAY_MS`) per provare il timeout SSR, errori OCC realistici (401 `InvalidTokenError`,
  404 `CMSItemNotFoundError`, 400 `UnknownIdentifierError`).

Scrivere il mock obbliga anche a leggere **dove** Spartacus definisce ogni URL: e' l'esercizio migliore per
imparare la mappa degli endpoint.

## Come è implementato (con path)

| Cosa | Dove nel mock | Da dove viene in Spartacus |
|---|---|---|
| Tipi JSON (`OccProduct`, `OccCmsPage`, `OccCart`, ...) | `server.ts` sezione 1 | `core-libs/core/src/occ/occ-models/occ.models.ts` (`Occ.Product`, `Occ.CMSPage`, `Occ.ContentSlot`, `Occ.Component`, `Occ.Cart`, `Occ.OrderEntry`, `Occ.CartModification`, `Occ.BaseSite`, `Occ.ErrorModel`) |
| Prefisso `/occ/v2/` | `app.use('/occ/v2/:baseSiteId', ..., occ)` | `core-libs/core/src/occ/config/default-occ-config.ts` |
| Parametri `lang` / `curr` | middleware del router `occ` (`res.locals`) | `core-libs/core/src/occ/adapters/site-context/site-context.interceptor.ts` |
| Ricerca pagina CMS | `findPage()` | `core-libs/core/src/occ/adapters/cms/occ-cms-page.adapter.ts` (`getPagesRequestParams`) |
| Token OAuth2 | `POST /authorizationserver/oauth/token` | `core-libs/core/src/auth/user-auth/config/default-auth-config.ts` (`tokenEndpoint`, `revokeEndpoint`, `client_id`) |
| Errore token scaduto | `occError(res, 401, 'InvalidTokenError', ...)` | `core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts` (`isExpiredToken`) |
| Carrello anonimo per guid, utente per code | `findCart()` | `feature-libs/cart/base/core/utils/utils.ts` (`getCartIdByUserId`), `feature-libs/cart/base/core/facade/active-cart.service.ts` |
| Merge carrello al login | `POST users/:userId/carts?oldCartId=&toMergeCartGuid=` | `feature-libs/cart/base/occ/adapters/occ-cart.adapter.ts` (`create`) |
| Body delle entry | `POST .../entries` JSON `{ product: { code }, quantity }`, `PATCH { quantity }` | `feature-libs/cart/base/occ/adapters/occ-cart-entry.adapter.ts` |
| Immagini | `GET /medias/:file` (SVG generato) | `core-libs/core/src/occ/adapters/product/converters/product-image-normalizer.ts` (prefisso `backend.media.baseUrl`) |

Tecnologia: Express 5, `cors`, Node `crypto.randomUUID`, TypeScript strict, avvio con `tsx` (nessuna build necessaria).
Tutto e' in memoria: al riavvio carrelli e token spariscono.

## Tabella endpoint serviti <-> endpoint Spartacus

Legenda colonne: *chiave* = nome dell'endpoint nella config `backend.occ.endpoints` di Spartacus;
*template Spartacus* = valore di default (i `fields` lunghi sono abbreviati con `...`); *file* = dove e' definito.
Tutti i path del mock sono relativi a `http://localhost:9002`; `:site` = `electronics-spa`.

| Chiave Spartacus | Template di default in Spartacus | File di config Spartacus | Metodo + path nel mock |
|---|---|---|---|
| `baseSites` | `basesites?fields=FULL` (senza baseSite nel path) | `core-libs/core/src/occ/adapters/site-context/default-occ-site-context-config.ts` | `GET /occ/v2/basesites` |
| `languages` | `languages` | idem | `GET /occ/v2/:site/languages` |
| `currencies` | `currencies` | idem | `GET /occ/v2/:site/currencies` |
| `pages` | `users/${userId}/cms/pages` | `core-libs/core/src/cms/config/default-cms-config.ts` | `GET /occ/v2/:site/users/:userId/cms/pages` e `GET /occ/v2/:site/cms/pages` |
| `page` | `users/${userId}/cms/pages/${id}` | idem | `GET /occ/v2/:site/users/:userId/cms/pages/:id` e `/cms/pages/:id` |
| `components` | `users/${userId}/cms/components` | idem | `GET /occ/v2/:site/users/:userId/cms/components?componentIds=a,b` e `/cms/components` |
| `component` | `users/${userId}/cms/components/${id}` | idem | `GET /occ/v2/:site/users/:userId/cms/components/:id` e `/cms/components/:id` |
| `product` (scope `default`, `list`, `details`, `attributes`, `price`, `stock`, ...) | `products/${productCode}?fields=...` | `core-libs/core/src/occ/adapters/product/default-occ-product-config.ts` | `GET /occ/v2/:site/products/:productCode` (ignora `fields`, restituisce sempre tutto) |
| `productSearch` (scope `default`, `carousel`, `carouselMinimal`) | `products/search?fields=...` | idem | `GET /occ/v2/:site/products/search?query=&pageSize=&currentPage=` |
| `productSuggestions` | `products/suggestions` | idem | `GET /occ/v2/:site/products/suggestions?term=` |
| `productReviews` | `products/${productCode}/reviews` | idem | `GET /occ/v2/:site/products/:productCode/reviews` (lista vuota) |
| `productReferences` | `products/${productCode}/references?fields=...` | idem | `GET /occ/v2/:site/products/:productCode/references` (lista vuota) |
| `anonymousConsentTemplates` | `users/anonymous/consenttemplates` | `core-libs/core/src/occ/adapters/user/default-occ-user-config.ts` | `GET /occ/v2/:site/users/anonymous/consenttemplates` (lista vuota) |
| `user` | `users/${userId}` | `feature-libs/user/account/occ/adapters/config/default-occ-user-account-endpoint.config.ts` | `GET /occ/v2/:site/users/:userId` (`current` richiede token) |
| `carts` | `users/${userId}/carts?fields=carts(...)` | `feature-libs/cart/base/occ/config/default-occ-cart-config-factory.ts` | `GET /occ/v2/:site/users/:userId/carts` |
| `createCart` | `users/${userId}/carts?fields=...` (+ `oldCartId`, `toMergeCartGuid`) | idem | `POST /occ/v2/:site/users/:userId/carts` |
| `cart` | `users/${userId}/carts/${cartId}?fields=...` | idem | `GET /occ/v2/:site/users/:userId/carts/:cartId` (`cartId` = guid, code o `current`) |
| `deleteCart` | `users/${userId}/carts/${cartId}` | idem | `DELETE /occ/v2/:site/users/:userId/carts/:cartId` |
| `addEntries` | `users/${userId}/carts/${cartId}/entries` | idem | `POST /occ/v2/:site/users/:userId/carts/:cartId/entries` |
| `updateEntries` | `users/${userId}/carts/${cartId}/entries/${entryNumber}` | idem | `PATCH` (e `PUT`) `/occ/v2/:site/users/:userId/carts/:cartId/entries/:entryNumber` |
| `removeEntries` | `users/${userId}/carts/${cartId}/entries/${entryNumber}` | idem | `DELETE /occ/v2/:site/users/:userId/carts/:cartId/entries/:entryNumber` |
| `authentication.tokenEndpoint` | `/oauth/token` su `backend.occ.baseUrl + '/authorizationserver'` | `core-libs/core/src/auth/user-auth/config/default-auth-config.ts` | `POST /authorizationserver/oauth/token` (`password`, `refresh_token`, `client_credentials`) |
| `authentication.revokeEndpoint` | `/oauth/revoke` | idem | `POST /authorizationserver/oauth/revoke` |
| `backend.media.baseUrl` (+ URL relativi delle immagini) | nessun default: si usa `backend.occ.baseUrl` | `core-libs/core/src/occ/config/occ-config.ts` | `GET /medias/:file` |

Endpoint **non** serviti (rispondono 404 `UnknownResourceError`): checkout, ordini, indirizzi, registrazione,
wishlist/saved cart, store finder, categorie (`productSearchByCategory`), voucher, ASM, B2B, e tutte le feature
di `integration-libs/`. Le pagine categoria (`pageType=CategoryPage`) rispondono 404 e Spartacus mostra `notFound`.

## Flusso passo-passo

Cosa vede il mock quando uno storefront parte e un utente compra (sequenza reale registrata con mini-spartacus):

1. **Pagina iniziale** (SSR): `GET /occ/v2/electronics-spa/cms/pages?fields=DEFAULT&pageType=ContentPage&pageLabelOrId=homepage&lang=en&curr=USD`
   -> `findPage` trova la `homepage` (template `LandingPage2Template`, slot `Section1`, `Section2A`, `Section3` + slot dell'header).
2. **Prodotti del carosello**: 4 x `GET /occ/v2/electronics-spa/products/{code}?fields=...&lang=en&curr=USD` ->
   `toOccProduct` calcola nome (per lingua), prezzo (per valuta, `RATES`), immagini `/medias/{code}-{format}.svg`.
3. **Browser**: grazie al TransferState nessuna chiamata ripetuta. Il browser chiede solo le immagini `/medias/...`.
4. **Aggiungi al carrello** (anonimo): `POST /users/anonymous/carts` -> carrello con `code` e `guid`;
   `POST /users/anonymous/carts/{guid}/entries` body `{"product":{"code":"1934793"},"quantity":1}` -> `CartModification`;
   `GET /users/anonymous/carts/{guid}` -> carrello aggiornato.
5. **Login**: `POST /authorizationserver/oauth/token` (`grant_type=password`) -> `access_token` + `refresh_token`;
   `GET /users/current` con `Authorization: Bearer ...`; `POST /users/current/carts?oldCartId={guid}` -> il carrello
   anonimo diventa del cliente (merge).
6. **Token scaduto** (`TOKEN_TTL=5`): la prima chiamata con token vecchio -> `401 {"errors":[{"type":"InvalidTokenError"}]}`;
   la storefront fa `POST /oauth/token` con `grant_type=refresh_token` e ripete la chiamata -> 200.
   Il refresh token e' **monouso**: il vecchio viene cancellato.
7. **Logout**: `POST /authorizationserver/oauth/revoke` (`token=...`) -> il token non vale piu'.

## Codice completo

`examples/mock-backend/package.json`

```json
{
  "name": "mini-spartacus-mock-backend",
  "version": "1.0.0",
  "private": true,
  "description": "Mock OCC backend (Express) per mini-spartacus e storefrontapp",
  "type": "commonjs",
  "scripts": {
    "start": "tsx server.ts",
    "build": "tsc -p tsconfig.json",
    "start:dist": "node dist/server.js",
    "typecheck": "tsc --noEmit -p tsconfig.json"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.0",
    "tsx": "^4.19.0",
    "typescript": "~5.9.3"
  }
}
```

`examples/mock-backend/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "outDir": "dist",
    "types": ["node"]
  },
  "files": ["server.ts"]
}
```

`examples/mock-backend/server.ts`

```ts
/*
 * Mock OCC backend per mini-spartacus e per lo storefrontapp reale.
 *
 * Imita (in piccolo) SAP Commerce Cloud OCC v2:
 *  - i formati JSON seguono le interfacce di core-libs/core/src/occ/occ-models/occ.models.ts
 *  - gli URL seguono gli endpoint di default di Spartacus
 *    (core-libs/core/src/occ/config/default-occ-config.ts, default-occ-*-config.ts,
 *     core-libs/core/src/cms/config/default-cms-config.ts,
 *     feature-libs/cart/base/occ/config/default-occ-cart-config-factory.ts)
 *
 * Avvio: npm install && npm start   (porta 9002, cambiabile con PORT=...)
 * Variabili utili: TOKEN_TTL=30 (secondi di vita dell'access token), MOCK_DELAY_MS=3000 (latenza finta)
 */
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

// ---------------------------------------------------------------------------
// 1. Tipi OCC (sottoinsieme fedele di Occ.* in occ.models.ts)
// ---------------------------------------------------------------------------
interface OccLanguage { isocode: string; name: string; nativeName: string; active: boolean; }
interface OccCurrency { isocode: string; name: string; symbol: string; active: boolean; }
interface OccPrice { currencyIso: string; value: number; formattedValue: string; priceType?: 'BUY' | 'FROM'; }
interface OccImage { imageType: 'PRIMARY' | 'GALLERY'; format: string; url: string; altText?: string; galleryIndex?: number; }
interface OccProduct {
  code: string; name: string; summary: string; description: string; url: string;
  price: OccPrice; images: OccImage[]; purchasable: boolean;
  stock: { stockLevel: number; stockLevelStatus: 'inStock' | 'lowStock' | 'outOfStock' };
  averageRating: number; numberOfReviews: number; categories: { code: string; name: string }[];
}
interface OccComponent { uid: string; typeCode: string; name: string; flexType?: string; [property: string]: unknown; }
interface OccContentSlot { slotId: string; position: string; name: string; slotShared: boolean; components: { component: OccComponent[] }; }
interface OccCmsPage {
  uid: string; typeCode: 'ContentPage' | 'ProductPage' | 'CategoryPage'; template: string; name: string;
  title: string; label?: string; defaultPage: boolean; contentSlots: { contentSlot: OccContentSlot[] };
}
interface OccOrderEntry { entryNumber: number; quantity: number; product: OccProduct; basePrice: OccPrice; totalPrice: OccPrice; updateable: boolean; }
interface OccCart {
  code: string; guid: string; entries: OccOrderEntry[]; totalItems: number; totalUnitCount: number;
  deliveryItemsQuantity: number; subTotal: OccPrice; totalPrice: OccPrice; totalPriceWithTax: OccPrice;
  totalTax: OccPrice; net: boolean; user: { uid: string; name: string };
}
interface OccErrorModel { type: string; message: string; reason?: string; subject?: string; subjectType?: string; }

// ---------------------------------------------------------------------------
// 2. Dati finti
// ---------------------------------------------------------------------------
const PORT = Number(process.env['PORT'] ?? 9002);
const TOKEN_TTL = Number(process.env['TOKEN_TTL'] ?? 3600);
const MOCK_DELAY_MS = Number(process.env['MOCK_DELAY_MS'] ?? 0);
const CLIENT = { id: 'mobile_android', secret: 'secret' };
const USERS = [{ uid: 'demo@spartacus.test', password: 'Password123.', firstName: 'Demo', lastName: 'User' }];

const LANGUAGES: OccLanguage[] = [
  { isocode: 'en', name: 'English', nativeName: 'English', active: true },
  { isocode: 'de', name: 'German', nativeName: 'Deutsch', active: false },
];
const CURRENCIES: OccCurrency[] = [
  { isocode: 'USD', name: 'US Dollar', symbol: '$', active: true },
  { isocode: 'EUR', name: 'Euro', symbol: '€', active: false },
];
const RATES: Record<string, number> = { USD: 1, EUR: 0.92 };

const BASE_SITES = [
  {
    uid: 'electronics-spa', name: 'Electronics Site', channel: 'B2C', theme: 'santorini', locale: 'en_US',
    requiresAuthentication: false, defaultLanguage: LANGUAGES[0],
    urlEncodingAttributes: ['storefront', 'language', 'currency'],
    urlPatterns: ['(?i)^https?://[^/]+(/[^?]*)?\\?(.*\\&)?(site=electronics-spa)(|\\&.*)$', '(?i)^https?://localhost(:[\\d]+)?/?.*$'],
    stores: [{ languages: LANGUAGES, currencies: CURRENCIES, defaultLanguage: LANGUAGES[0], defaultCurrency: CURRENCIES[0] }],
  },
];

interface ProductSeed { code: string; names: Record<string, string>; priceUsd: number; stock: number; summary: string; }
const PRODUCTS: ProductSeed[] = [
  { code: '300938', names: { en: 'Photosmart E317 Digital Camera', de: 'Photosmart E317 Digitalkamera' }, priceUsd: 114.12, stock: 25, summary: '5 megapixel, zoom 3x.' },
  { code: '1934793', names: { en: 'PowerShot A480', de: 'PowerShot A480' }, priceUsd: 99.85, stock: 4, summary: 'Compatta da 10 megapixel.' },
  { code: '358639', names: { en: 'DSC-N1', de: 'DSC-N1' }, priceUsd: 234.0, stock: 0, summary: 'Schermo touch 3 pollici.' },
  { code: '553637', names: { en: 'NV10', de: 'NV10' }, priceUsd: 188.4, stock: 12, summary: 'Design sottile, 10.1 megapixel.' },
];

// ---------------------------------------------------------------------------
// 3. Helper di conversione (lingua/valuta arrivano come query ?lang=&curr=)
// ---------------------------------------------------------------------------
function price(usd: number, curr: string): OccPrice {
  const currency = CURRENCIES.find((c) => c.isocode === curr) ?? CURRENCIES[0];
  const value = Math.round(usd * (RATES[currency.isocode] ?? 1) * 100) / 100;
  return { currencyIso: currency.isocode, value, formattedValue: `${currency.symbol}${value.toFixed(2)}`, priceType: 'BUY' };
}

function toOccProduct(seed: ProductSeed, lang: string, curr: string): OccProduct {
  const name = seed.names[lang] ?? seed.names['en'];
  const media = (format: string): OccImage => ({ imageType: 'PRIMARY', format, url: `/medias/${seed.code}-${format}.svg`, altText: name });
  return {
    code: seed.code, name, summary: seed.summary, description: `<p>${name}: ${seed.summary}</p>`,
    url: `/product/${seed.code}/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`,
    price: price(seed.priceUsd, curr), purchasable: true,
    images: [media('product'), media('thumbnail'), { ...media('zoom'), imageType: 'GALLERY', galleryIndex: 0 }],
    stock: { stockLevel: seed.stock, stockLevelStatus: seed.stock === 0 ? 'outOfStock' : seed.stock < 5 ? 'lowStock' : 'inStock' },
    averageRating: 4.2, numberOfReviews: 0, categories: [{ code: '575', name: 'Digital Cameras' }],
  };
}

function occError(res: Response, status: number, type: string, message: string): void {
  const errors: OccErrorModel[] = [{ type, message }];
  res.status(status).json({ errors });
}

// ---------------------------------------------------------------------------
// 4. CMS: pagine e componenti (struttura Occ.CMSPage -> contentSlots.contentSlot[].components.component[])
// ---------------------------------------------------------------------------
const cmp = (uid: string, typeCode: string, extra: Record<string, unknown> = {}): OccComponent => ({ uid, typeCode, name: uid, ...extra });
const flex = (uid: string, flexType: string): OccComponent => cmp(uid, 'CMSFlexComponent', { flexType });
const slot = (position: string, components: OccComponent[]): OccContentSlot => ({
  slotId: `${position}Slot`, position, name: position, slotShared: false, components: { component: components },
});

const HEADER_SLOTS: OccContentSlot[] = [
  slot('SiteContext', [cmp('LanguageComponent', 'CMSSiteContextComponent', { context: 'LANGUAGE' }), cmp('CurrencyComponent', 'CMSSiteContextComponent', { context: 'CURRENCY' })]),
  slot('SiteLogo', [cmp('SiteLogoComponent', 'SimpleBannerComponent', { urlLink: '/', media: { url: '/medias/logo.svg', altText: 'Mini Spartacus' } })]),
  slot('SearchBox', [cmp('SearchBoxComponent', 'SearchBoxComponent', { displayProducts: 'true', maxProducts: '5' })]),
  slot('SiteLogin', [flex('LoginComponent', 'LoginComponent')]),
  slot('MiniCart', [cmp('MiniCartComponent', 'MiniCartComponent', { title: 'Cart' })]),
  slot('Footer', [cmp('FooterParagraph', 'CMSParagraphComponent', { content: '<p>Mini Spartacus &middot; mock OCC backend</p>' })]),
];

function page(uid: string, typeCode: OccCmsPage['typeCode'], template: string, title: string, body: OccContentSlot[], label?: string): OccCmsPage {
  return { uid, typeCode, template, name: title, title, label, defaultPage: true, contentSlots: { contentSlot: [...HEADER_SLOTS, ...body] } };
}

const CONTENT_PAGES: OccCmsPage[] = [
  page('homepage', 'ContentPage', 'LandingPage2Template', 'Homepage', [
    slot('Section1', [cmp('HomeBanner', 'SimpleBannerComponent', { urlLink: '/faq', media: { url: '/medias/banner.svg', altText: 'Saldi di primavera' } })]),
    slot('Section2A', [cmp('WelcomeParagraph', 'CMSParagraphComponent', { content: '<h2>Benvenuto</h2><p>Questa pagina arriva dal mock CMS.</p>' })]),
    slot('Section3', [cmp('HomeCarousel', 'ProductCarouselComponent', { title: 'I nostri prodotti', productCodes: PRODUCTS.map((p) => p.code).join(' ') })]),
  ], 'homepage'),
  page('cartPage', 'ContentPage', 'CartPageTemplate', 'Carrello', [slot('TopContent', [flex('CartComponent', 'CartComponent')])], '/cart'),
  page('login', 'ContentPage', 'LoginPageTemplate', 'Login', [slot('LeftContentSlot', [flex('ReturningCustomerLoginComponent', 'ReturningCustomerLoginComponent')])], '/login'),
  page('search', 'ContentPage', 'SearchResultsListPageTemplate', 'Ricerca', [slot('SearchResultsListSlot', [cmp('SearchResultsList', 'SearchResultsListComponent')])], 'search'),
  page('faq', 'ContentPage', 'ContentPage1Template', 'FAQ', [slot('Section2A', [cmp('FaqParagraph', 'CMSParagraphComponent', { content: '<h2>FAQ</h2><p>Pagina di contenuto con label /faq.</p>' })])], '/faq'),
  page('notFound', 'ContentPage', 'ContentPage1Template', 'Pagina non trovata', [slot('Section2A', [cmp('NotFoundParagraph', 'CMSParagraphComponent', { content: '<h2>404</h2><p>Pagina non trovata.</p>' })])], 'notFound'),
];
const PRODUCT_PAGE = page('productDetails', 'ProductPage', 'ProductDetailsPageTemplate', 'Dettaglio prodotto', [
  slot('Summary', [cmp('ProductImagesComponent', 'ProductImagesComponent'), cmp('ProductIntroComponent', 'ProductIntroComponent'),
    cmp('ProductSummaryComponent', 'ProductSummaryComponent'), cmp('AddToCart', 'ProductAddToCartComponent')]),
]);
const ALL_COMPONENTS = new Map<string, OccComponent>();
for (const p of [...CONTENT_PAGES, PRODUCT_PAGE]) {
  p.contentSlots.contentSlot.forEach((s) => s.components.component.forEach((c) => ALL_COMPONENTS.set(c.uid, c)));
}

/** Stessa logica di OccCmsPageAdapter.getPagesRequestParams: ContentPage per label, gli altri per code. */
function findPage(query: Record<string, unknown>): OccCmsPage | undefined {
  const pageType = String(query['pageType'] ?? '');
  const label = query['pageLabelOrId'] as string | undefined;
  const code = query['code'] as string | undefined;
  if (!pageType && !label && !code) return CONTENT_PAGES[0]; // richiesta della homepage
  if (pageType === 'ProductPage') return PRODUCTS.some((p) => p.code === code) ? PRODUCT_PAGE : undefined;
  return CONTENT_PAGES.find((p) => p.label === label || p.uid === label);
}

// ---------------------------------------------------------------------------
// 5. OAuth2 (Authorization Server di SAP Commerce: /authorizationserver/oauth/token)
// ---------------------------------------------------------------------------
interface TokenRecord { accessToken: string; refreshToken: string; expiresAt: number; uid?: string; }
const tokens = new Map<string, TokenRecord>();
const refreshTokens = new Map<string, TokenRecord>();

function issueToken(uid?: string): TokenRecord {
  const record: TokenRecord = { accessToken: randomUUID(), refreshToken: randomUUID(), expiresAt: Date.now() + TOKEN_TTL * 1000, uid };
  tokens.set(record.accessToken, record);
  if (uid) refreshTokens.set(record.refreshToken, record);
  return record;
}

function tokenResponse(record: TokenRecord) {
  return {
    access_token: record.accessToken, token_type: 'bearer', expires_in: TOKEN_TTL, scope: 'basic openid',
    ...(record.uid ? { refresh_token: record.refreshToken } : {}),
  };
}

// ---------------------------------------------------------------------------
// 6. Carrelli in memoria
// ---------------------------------------------------------------------------
interface CartRecord { code: string; guid: string; owner: string; entries: { productCode: string; quantity: number }[]; }
const carts = new Map<string, CartRecord>();
let cartCounter = 1000;

function toOccCart(cart: CartRecord, lang: string, curr: string): OccCart {
  const entries: OccOrderEntry[] = cart.entries.map((e, entryNumber) => {
    const seed = PRODUCTS.find((p) => p.code === e.productCode) as ProductSeed;
    return { entryNumber, quantity: e.quantity, product: toOccProduct(seed, lang, curr), basePrice: price(seed.priceUsd, curr), totalPrice: price(seed.priceUsd * e.quantity, curr), updateable: true };
  });
  const totalUsd = cart.entries.reduce((sum, e) => sum + (PRODUCTS.find((p) => p.code === e.productCode)?.priceUsd ?? 0) * e.quantity, 0);
  const units = cart.entries.reduce((sum, e) => sum + e.quantity, 0);
  const user = cart.owner === 'anonymous' ? { uid: 'anonymous', name: 'Anonymous' } : { uid: cart.owner, name: cart.owner };
  return {
    code: cart.code, guid: cart.guid, entries, totalItems: entries.length, totalUnitCount: units, deliveryItemsQuantity: units,
    subTotal: price(totalUsd, curr), totalPrice: price(totalUsd, curr), totalPriceWithTax: price(totalUsd, curr), totalTax: price(0, curr), net: false, user,
  };
}

// ---------------------------------------------------------------------------
// 7. App Express
// ---------------------------------------------------------------------------
const app = express();
app.use(cors({ origin: true, credentials: true, exposedHeaders: ['Content-Type'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`);
  if (MOCK_DELAY_MS > 0 && req.method !== 'OPTIONS') setTimeout(next, MOCK_DELAY_MS);
  else next();
});

// --- OAuth2 -----------------------------------------------------------------
app.post('/authorizationserver/oauth/token', (req: Request, res: Response) => {
  const body = req.body as Record<string, string | undefined>;
  if (body['client_id'] !== CLIENT.id || body['client_secret'] !== CLIENT.secret) {
    res.status(401).json({ error: 'invalid_client', error_description: 'Bad client credentials' });
    return;
  }
  switch (body['grant_type']) {
    case 'password': {
      const user = USERS.find((u) => u.uid === body['username']?.toLowerCase() && u.password === body['password']);
      if (!user) { res.status(400).json({ error: 'invalid_grant', error_description: 'Bad credentials' }); return; }
      res.json(tokenResponse(issueToken(user.uid)));
      return;
    }
    case 'refresh_token': {
      const old = refreshTokens.get(body['refresh_token'] ?? '');
      if (!old) { res.status(400).json({ error: 'invalid_grant', error_description: 'Invalid refresh token' }); return; }
      refreshTokens.delete(old.refreshToken);
      tokens.delete(old.accessToken);
      res.json(tokenResponse(issueToken(old.uid)));
      return;
    }
    case 'client_credentials':
      res.json(tokenResponse(issueToken()));
      return;
    default:
      res.status(400).json({ error: 'unsupported_grant_type' });
  }
});
app.post('/authorizationserver/oauth/revoke', (req: Request, res: Response) => {
  const token = String((req.body as Record<string, string>)['token'] ?? '');
  tokens.delete(token);
  refreshTokens.delete(token);
  res.status(200).send();
});

// --- basesites (non dipende dal sito) ------------------------------------------
app.get('/occ/v2/basesites', (_req: Request, res: Response) => { res.json({ baseSites: BASE_SITES }); });

// --- Router OCC per sito: /occ/v2/:baseSiteId/... ------------------------------
const occ = express.Router({ mergeParams: true });

/** Legge il Bearer token. Token sconosciuto o scaduto -> 401 InvalidTokenError (vedi AuthInterceptor.isExpiredToken). */
occ.use((req: Request, res: Response, next: NextFunction) => {
  const header = req.header('Authorization');
  if (header?.startsWith('Bearer ')) {
    const record = tokens.get(header.substring(7));
    if (!record || record.expiresAt < Date.now()) {
      occError(res, 401, 'InvalidTokenError', `Invalid access token: ${header.substring(7)}`);
      return;
    }
    res.locals['uid'] = record.uid;
  }
  res.locals['lang'] = String(req.query['lang'] ?? 'en');
  res.locals['curr'] = String(req.query['curr'] ?? 'USD');
  next();
});

/** 'anonymous' e' sempre ammesso; 'current' (o l'uid esplicito) richiede un token utente valido. */
function resolveUser(req: Request, res: Response): string | undefined {
  const userId = String(req.params['userId'] ?? 'anonymous');
  if (userId === 'anonymous') return 'anonymous';
  const uid = res.locals['uid'] as string | undefined;
  if (uid && (userId === 'current' || userId === uid)) return uid;
  occError(res, 401, 'AccessDeniedError', 'Access is denied');
  return undefined;
}

occ.get('/languages', (_req: Request, res: Response) => { res.json({ languages: LANGUAGES }); });
occ.get('/currencies', (_req: Request, res: Response) => { res.json({ currencies: CURRENCIES }); });

// CMS: sia la forma "breve" /cms/... sia quella usata dallo Spartacus attuale /users/:userId/cms/...
occ.get(['/cms/pages', '/users/:userId/cms/pages'], (req: Request, res: Response) => {
  const found = findPage(req.query as Record<string, unknown>);
  if (!found) { occError(res, 404, 'CMSItemNotFoundError', 'No page found for the given parameters'); return; }
  res.json(found);
});
occ.get(['/cms/pages/:id', '/users/:userId/cms/pages/:id'], (req: Request, res: Response) => {
  const found = [...CONTENT_PAGES, PRODUCT_PAGE].find((p) => p.uid === req.params['id']);
  if (!found) { occError(res, 404, 'CMSItemNotFoundError', `Page ${req.params['id']} not found`); return; }
  res.json(found);
});
occ.get(['/cms/components', '/users/:userId/cms/components'], (req: Request, res: Response) => {
  const ids = String(req.query['componentIds'] ?? '').split(',').filter(Boolean);
  const component = ids.map((id) => ALL_COMPONENTS.get(id)).filter((c): c is OccComponent => !!c);
  res.json({ component, pagination: { currentPage: 0, pageSize: ids.length, totalPages: 1, totalResults: component.length } });
});
occ.get(['/cms/components/:id', '/users/:userId/cms/components/:id'], (req: Request, res: Response) => {
  const found = ALL_COMPONENTS.get(String(req.params['id']));
  if (!found) { occError(res, 404, 'CMSItemNotFoundError', `Component ${req.params['id']} not found`); return; }
  res.json(found);
});

// Prodotti: /products/search deve stare PRIMA di /products/:productCode
occ.get('/products/search', (req: Request, res: Response) => {
  const rawQuery = String(req.query['query'] ?? '');
  const text = rawQuery.split(':')[0].trim().toLowerCase();
  const pageSize = Number(req.query['pageSize'] ?? 20);
  const currentPage = Number(req.query['currentPage'] ?? 0);
  const all = PRODUCTS.filter((p) => !text || p.code.includes(text) || Object.values(p.names).some((n) => n.toLowerCase().includes(text)));
  const products = all.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((p) => toOccProduct(p, res.locals['lang'], res.locals['curr']));
  res.json({
    freeTextSearch: text, products, facets: [], breadcrumbs: [], sorts: [{ code: 'relevance', name: 'Relevance', selected: true }],
    currentQuery: { query: { value: rawQuery || ':relevance' }, url: `/search?q=${encodeURIComponent(rawQuery)}` },
    pagination: { currentPage, pageSize, totalPages: Math.max(1, Math.ceil(all.length / pageSize)), totalResults: all.length, sort: 'relevance' },
  });
});
occ.get('/products/suggestions', (req: Request, res: Response) => {
  const term = String(req.query['term'] ?? '').toLowerCase();
  res.json({ suggestions: PRODUCTS.filter((p) => term && p.names['en'].toLowerCase().includes(term)).map((p) => ({ value: p.names['en'] })) });
});
occ.get('/products/:productCode/reviews', (_req: Request, res: Response) => { res.json({ reviews: [] }); });
occ.get('/products/:productCode/references', (_req: Request, res: Response) => { res.json({ references: [] }); });
occ.get('/products/:productCode', (req: Request, res: Response) => {
  const seed = PRODUCTS.find((p) => p.code === req.params['productCode']);
  if (!seed) { occError(res, 400, 'UnknownIdentifierError', `Product with code '${req.params['productCode']}' not found!`); return; }
  res.json(toOccProduct(seed, res.locals['lang'], res.locals['curr']));
});

occ.get('/users/anonymous/consenttemplates', (_req: Request, res: Response) => { res.json({ consentTemplates: [] }); });

// Utente
occ.get('/users/:userId', (req: Request, res: Response) => {
  const uid = resolveUser(req, res);
  if (!uid) return;
  const user = USERS.find((u) => u.uid === uid);
  if (!user) { occError(res, 404, 'UnknownIdentifierError', 'User not found'); return; }
  res.json({
    uid: user.uid, displayUid: user.uid, customerId: user.uid, firstName: user.firstName, lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`, language: LANGUAGES[0], currency: CURRENCIES[0],
  });
});

// Carrelli
function findCart(req: Request, res: Response): CartRecord | undefined {
  const owner = resolveUser(req, res);
  if (!owner) return undefined;
  const cartId = String(req.params['cartId']);
  const cart = cartId === 'current'
    ? [...carts.values()].reverse().find((c) => c.owner === owner)
    : [...carts.values()].find((c) => c.owner === owner && (owner === 'anonymous' ? c.guid === cartId : c.code === cartId || c.guid === cartId));
  if (!cart) occError(res, 404, 'CartError', 'Cart not found.');
  return cart;
}

occ.get('/users/:userId/carts', (req: Request, res: Response) => {
  const owner = resolveUser(req, res);
  if (!owner) return;
  res.json({ carts: [...carts.values()].filter((c) => c.owner === owner && owner !== 'anonymous').map((c) => toOccCart(c, res.locals['lang'], res.locals['curr'])) });
});
occ.post('/users/:userId/carts', (req: Request, res: Response) => {
  const owner = resolveUser(req, res);
  if (!owner) return;
  // Merge al login (OccCartAdapter.create): oldCartId = guid anonimo, toMergeCartGuid = carrello utente esistente
  const oldCartId = req.query['oldCartId'] as string | undefined;
  const toMergeGuid = req.query['toMergeCartGuid'] as string | undefined;
  const existing = toMergeGuid ? [...carts.values()].find((c) => c.guid === toMergeGuid && c.owner === owner) : undefined;
  const cart: CartRecord = existing ?? { code: String(cartCounter++), guid: randomUUID(), owner, entries: [] };
  const old = oldCartId ? [...carts.values()].find((c) => c.guid === oldCartId && c.owner === 'anonymous') : undefined;
  if (old) {
    for (const e of old.entries) {
      const same = cart.entries.find((x) => x.productCode === e.productCode);
      if (same) same.quantity += e.quantity; else cart.entries.push({ ...e });
    }
    carts.delete(old.code);
  }
  carts.set(cart.code, cart);
  res.status(201).json(toOccCart(cart, res.locals['lang'], res.locals['curr']));
});
occ.get('/users/:userId/carts/:cartId', (req: Request, res: Response) => {
  const cart = findCart(req, res);
  if (cart) res.json(toOccCart(cart, res.locals['lang'], res.locals['curr']));
});
occ.delete('/users/:userId/carts/:cartId', (req: Request, res: Response) => {
  const cart = findCart(req, res);
  if (cart) { carts.delete(cart.code); res.status(200).send(); }
});
occ.post('/users/:userId/carts/:cartId/entries', (req: Request, res: Response) => {
  const cart = findCart(req, res);
  if (!cart) return;
  const body = (req.body ?? {}) as { product?: { code?: string }; quantity?: number };
  const code = body.product?.code ?? (req.query['code'] as string | undefined);
  const quantity = Number(body.quantity ?? req.query['qty'] ?? 1);
  const seed = PRODUCTS.find((p) => p.code === code);
  if (!seed) { occError(res, 400, 'UnknownIdentifierError', `Product with code '${code}' not found!`); return; }
  let entryIndex = cart.entries.findIndex((e) => e.productCode === seed.code);
  if (entryIndex === -1) { cart.entries.push({ productCode: seed.code, quantity: 0 }); entryIndex = cart.entries.length - 1; }
  cart.entries[entryIndex].quantity += quantity;
  const entry = toOccCart(cart, res.locals['lang'], res.locals['curr']).entries[entryIndex];
  res.json({ statusCode: 'success', quantityAdded: quantity, quantity: entry.quantity, entry });
});
occ.route('/users/:userId/carts/:cartId/entries/:entryNumber')
  .patch(updateEntry)
  .put(updateEntry)
  .delete((req: Request, res: Response) => {
    const cart = findCart(req, res);
    if (!cart) return;
    cart.entries.splice(Number(req.params['entryNumber']), 1);
    res.status(200).send();
  });

function updateEntry(req: Request, res: Response): void {
  const cart = findCart(req, res);
  if (!cart) return;
  const index = Number(req.params['entryNumber']);
  const quantity = Number((req.body as { quantity?: number })?.quantity ?? req.query['qty'] ?? 1);
  if (!cart.entries[index]) { occError(res, 400, 'CartEntryError', 'Entry not found'); return; }
  if (quantity <= 0) cart.entries.splice(index, 1); else cart.entries[index].quantity = quantity;
  const entry = quantity > 0 ? toOccCart(cart, res.locals['lang'], res.locals['curr']).entries[index] : undefined;
  res.json({ statusCode: 'success', quantity: Math.max(quantity, 0), entry });
}

app.use('/occ/v2/:baseSiteId', (req: Request, res: Response, next: NextFunction) => {
  if (!BASE_SITES.some((s) => s.uid === req.params['baseSiteId'])) {
    occError(res, 400, 'InvalidResourceError', `Base site ${req.params['baseSiteId']} doesn't exist`);
    return;
  }
  next();
}, occ);

// --- Media: immagini SVG generate al volo (Spartacus antepone backend.media.baseUrl) ---
app.get('/medias/:file', (req: Request, res: Response) => {
  const label = String(req.params['file']).replace(/\.svg$/, '');
  res.type('image/svg+xml').send(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200"><rect width="100%" height="100%" fill="#dde6f0"/>` +
    `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18">${label}</text></svg>`
  );
});

// --- Fallback 404 nel formato errori OCC ----------------------------------------
app.use((req: Request, res: Response) => { occError(res, 404, 'UnknownResourceError', `No mock for ${req.method} ${req.path}`); });

app.listen(PORT, () => {
  console.log(`Mock OCC backend in ascolto su http://localhost:${PORT}/occ/v2/ (TOKEN_TTL=${TOKEN_TTL}s)`);
});
```

## Spiegazione dei punti chiave

**Sezione 1 - Tipi OCC.** Sono copie ridotte delle interfacce di `occ.models.ts`. Averle tipizzate significa che
se si sbaglia un nome di campo (`formatedValue` invece di `formattedValue`) `tsc` se ne accorge. Tutti i campi
sono obbligatori nel mock (lui produce dati completi), mentre in Spartacus sono opzionali (il backend puo' ometterli
in base a `fields`).

**Sezione 2 - Dati.** `BASE_SITES` e' completo come il vero `/basesites?fields=FULL`: `urlPatterns` (regex Java con
`(?i)`, convertite da `JavaRegExpConverter` in Spartacus), `urlEncodingAttributes` (`storefront` diventa `baseSite`
lato Spartacus, vedi `SiteContextConfigInitializer.getUrlParams`), `stores[0]` con lingue e valute (Spartacus lo
rinomina `baseStore` in `BaseSiteNormalizer`). `PRODUCTS` ha nomi per lingua e prezzo in USD: la conversione in EUR
dimostra che `curr` arriva davvero al backend.

**Sezione 3 - Helper.** `price()` produce sempre `{ currencyIso, value, formattedValue, priceType }`: Spartacus
mostra quasi sempre `formattedValue` (il backend formatta, non il frontend). `occError()` produce il formato errori
standard `{ errors: [{ type, message }] }` (`Occ.ErrorList`), quello che l'interceptor degli errori HTTP di
Spartacus (`core-libs/core/src/global-message/http-interceptors/`) si aspetta.

**Sezione 4 - CMS.**
- `cmp()`, `flex()`, `slot()`, `page()` sono mini-costruttori per non ripetere JSON. `flex()` crea un
  `CMSFlexComponent` con `flexType`: e' cosi' che SAP Commerce descrive componenti "solo frontend" come
  `CartComponent`, `LoginComponent`, `ReturningCustomerLoginComponent`.
- `HEADER_SLOTS` e' incluso in **ogni** pagina: in SAP Commerce gli slot dell'header sono condivisi dal template.
  I nomi (`SiteContext`, `SiteLogo`, `SearchBox`, `SiteLogin`, `MiniCart`, `Footer`) sono quelli della sezione
  `header`/`footer` del layout di default di Spartacus (`core-libs/storefront/recipes/config/layout-config.ts`).
- I template (`LandingPage2Template`, `ProductDetailsPageTemplate`, `CartPageTemplate`, `LoginPageTemplate`,
  `SearchResultsListPageTemplate`, `ContentPage1Template`) e gli slot (`Section1`, `Summary`, `TopContent`...) sono gli
  stessi del sample data `electronics-spa`, quindi il layout di Spartacus li riconosce.
- `findPage()`: replica la regola di `OccCmsPageAdapter.getPagesRequestParams`: nessun parametro = homepage;
  `ProductPage` + `code` = pagina prodotto (solo se il prodotto esiste); altrimenti `pageLabelOrId` = label della ContentPage.
- `ALL_COMPONENTS`: indice uid -> componente, per l'endpoint `components` (Spartacus lo usa per i componenti non
  inclusi nella pagina).

**Sezione 5 - OAuth2.**
- Controllo del client (`mobile_android` / `secret`): un client sbagliato riceve `401 invalid_client` come nel vero
  Authorization Server.
- `password`: utente e password in `USERS` (l'email e' confrontata in minuscolo, come fa SAP Commerce con gli uid).
- `refresh_token`: il vecchio refresh e il vecchio access token vengono cancellati (**rotazione**). Un refresh
  ripetuto con lo stesso token riceve `400 invalid_grant`: e' il caso che l'`AuthInterceptor` di Spartacus gestisce
  con `handleExpiredRefreshToken` (logout).
- `client_credentials`: token senza utente e senza refresh token (in Spartacus: `ClientAuthModule`, usato ad esempio
  dalla registrazione).
- `tokens` / `refreshTokens` sono due `Map`; `expiresAt` e' controllato ad ogni richiesta OCC.

**Sezione 6 - Carrelli.** `CartRecord` salva solo codici prodotto e quantita'; `toOccCart()` ricalcola tutto (entry,
prezzi, totali) ad ogni risposta, nella lingua e valuta della richiesta. `totalUnitCount` e' quello che il mini
carrello di Spartacus mostra; `user` dice a chi appartiene il carrello (`anonymous` per gli ospiti). Spartacus sceglie
l'id da mettere nell'URL con `getCartIdByUserId` (`feature-libs/cart/base/core/utils/utils.ts`): `guid` se l'utente e'
anonimo, `code` altrimenti; `findCart()` applica la stessa regola.

**Sezione 7 - App Express.**
- `cors({ origin: true, credentials: true })`: riflette l'origine della richiesta (`http://localhost:4200`,
  `http://localhost:4000`) e permette header `Authorization`; le preflight `OPTIONS` sono gestite in automatico.
- `express.json()` + `express.urlencoded()`: le entry del carrello arrivano in JSON, il token in form-urlencoded.
- Middleware di log + `MOCK_DELAY_MS`: ogni richiesta viene stampata e (se configurato) ritardata; le `OPTIONS` no.
- `app.get('/occ/v2/basesites')` e' registrato **prima** del router per sito: altrimenti `basesites` verrebbe preso
  per un `baseSiteId`.
- `const occ = express.Router({ mergeParams: true })`: tutte le rotte per sito; `mergeParams` rende visibile
  `:baseSiteId` del mount.
- Primo middleware del router: se c'e' `Authorization: Bearer` il token deve esistere e non essere scaduto,
  altrimenti `401 InvalidTokenError`. Se non c'e' header la richiesta e' anonima (valida per tutto tranne `current`).
- `resolveUser()`: `anonymous` sempre ammesso; `current` (o l'uid esplicito) solo con token utente valido,
  altrimenti `401 AccessDeniedError`.
- Array di path in `occ.get([...], ...)`: la stessa logica risponde sia a `/cms/pages` (forma classica, usata da
  mini-spartacus) sia a `/users/:userId/cms/pages` (forma di Spartacus 2611).
- `/products/search` e `/products/suggestions` sono registrati **prima** di `/products/:productCode`: Express prova
  le rotte nell'ordine, e `search` sarebbe preso come codice prodotto.
- `findCart()`: per `anonymous` il `cartId` e' il guid; per un utente e' il code (o il guid) oppure `current`
  (l'ultimo carrello dell'utente).
- `POST .../entries` accetta sia il body JSON moderno sia i vecchi query param `code`/`qty`.
- `occ.route(...).patch(updateEntry).put(updateEntry).delete(...)`: quantita' 0 = rimozione.
- `app.use('/occ/v2/:baseSiteId', validazioneSito, occ)`: un sito sconosciuto riceve `400 InvalidResourceError`,
  come SAP Commerce.
- `/medias/:file`: SVG generato col nome del file. Nessuna immagine da versionare.
- Fallback finale: qualunque altra richiesta -> `404 UnknownResourceError` con metodo e path (utilissimo per capire
  cosa manca quando si collega lo storefront reale: basta guardare il log).

## Come collegare mini-spartacus

Mini-spartacus e' gia' configurato per il mock:

```ts
// docs-deep-dive/examples/mini-spartacus/src/app/app.config.ts
export const OCC_BASE_URL = 'http://localhost:9002';
// ...
provideConfig({ backend: { occ: { baseUrl: OCC_BASE_URL } }, context: { baseSite: ['electronics-spa'], ... } })
```

```bash
# terminale 1
cd docs-deep-dive/examples/mock-backend && npm install && npm start
# terminale 2 (sviluppo, con SSR del dev server)
cd docs-deep-dive/examples/mini-spartacus && npm install && npm start
# apri http://localhost:4200/electronics-spa/en/USD/
```

Per cambiare porta del mock: `PORT=9102 npm start` e aggiorna `OCC_BASE_URL`. L'URL deve essere **assoluto** perche'
in SSR le chiamate partono dal server Node (un URL relativo non avrebbe host).

## Come collegare lo storefrontapp reale (`projects/storefrontapp`)

L'URL del backend dello storefront di esempio arriva da una variabile d'ambiente al momento della build:

- `projects/storefrontapp/src/environments/environment.ts`: `occBaseUrl: buildProcess.env.CX_BASE_URL`, `occApiPrefix: '/occ/v2/'`;
- `projects/storefrontapp/esbuild/plugins.ts`: sostituisce `buildProcess.env` con le variabili d'ambiente;
- `projects/storefrontapp/src/app/private/private.providers.ts`: `provideConfig({ backend: { occ: { baseUrl: environment.occBaseUrl, prefix: environment.occApiPrefix } } })`;
- `.env-cmdrc`: ambiente `local-http` = `CX_BASE_URL=http://localhost:9002` (proprio la porta del mock);
- `package.json` (root): `"start": "env-cmd --no-override -e dev,b2c,$SPA_ENV -- nx serve storefrontapp ..."`.
  Con `--no-override` una variabile gia' esportata **vince** su `.env-cmdrc`.

Passi:

```bash
# 1. mock
cd docs-deep-dive/examples/mock-backend && npm install && npm start

# 2. dipendenze del monorepo (una volta sola)
cd /home/user/spartacus && npm install

# 3. storefront puntato al mock (una delle due forme)
CX_BASE_URL=http://localhost:9002 npm start
# oppure
SPA_ENV=local-http npm start
# apri http://localhost:4200/electronics-spa/en/USD/
```

Il sito `electronics-spa` e' nella lista `baseSite` di `projects/storefrontapp/src/app/spartacus/spartacus-b2c-configuration.providers.ts`
e lingue/valute `en`/`de`, `USD`/`EUR` sono nei default di `core-libs/core/src/site-context/config/default-site-context-config.ts`,
quindi l'URL `/electronics-spa/en/USD/` e' riconosciuto senza caricare la config da `/basesites`.

**Login con lo storefront reale.** Lo storefront di esempio abilita tutti i feature toggle, fra cui
`authorizationCodeFlowByDefault: true` (`projects/storefrontapp/src/app/spartacus/spartacus-features.module.ts`).
Con quel toggle `defaultAuthConfigFactory` (`core-libs/core/src/auth/user-auth/config/default-auth-config.ts`) usa il
flusso **Authorization Code + PKCE** con client pubblico `mobile_android_public`, pagina di login custom
(`customLoginPage.csrfEndpoint: '/csrf'` e `customLoginPage.loginFormEndpoint: '/login'` sull'Authorization Server,
letti da `AuthConfigService`), token CSRF e form POST nativo con sessione a cookie: il mock **non** implementa questo flusso. Per provare il login contro il mock, in locale (senza committare) si imposta
`authorizationCodeFlowByDefault: false` in quel file: `defaultAuthConfigFactory` torna al *password flow* con
`client_id: 'mobile_android'` / `client_secret: 'secret'` / `useClientTokens: true`, che il mock serve. La navigazione
anonima (home, prodotto, ricerca, carrello anonimo) non dipende dal toggle.

**Cosa aspettarsi nello storefront reale:** header con selettori lingua/valuta, logo, ricerca, mini carrello; home
con banner, paragrafo e carosello; pagina prodotto con immagini, intro, riepilogo e "Aggiungi al carrello"; carrello.
Componenti presenti nello storefront ma non nel mock (navigazione, footer con link, tab prodotto, raccomandazioni)
semplicemente non compaiono. Chiamate a endpoint non implementati compaiono nel log del mock come
`404 No mock for ...`: e' la lista di cio' che servirebbe aggiungere.

## curl di prova

Tutti eseguiti su questo mock (porta 9002). `jq` e' opzionale.

```bash
B=http://localhost:9002
S=$B/occ/v2/electronics-spa

# Site context
curl -s "$B/occ/v2/basesites?fields=FULL" | jq '.baseSites[0].uid'           # "electronics-spa"
curl -s "$S/languages" | jq '.languages[].isocode'                           # "en" "de"
curl -s "$S/currencies" | jq '.currencies[].isocode'                         # "USD" "EUR"

# CMS: homepage (nessun parametro), ContentPage per label, ProductPage per code
curl -s "$S/users/anonymous/cms/pages?lang=en&curr=USD" | jq '.template'                                  # "LandingPage2Template"
curl -s "$S/cms/pages?pageType=ContentPage&pageLabelOrId=/cart" | jq '.template'                          # "CartPageTemplate"
curl -s "$S/cms/pages?pageType=ProductPage&code=300938" | jq '.contentSlots.contentSlot[-1].position'     # "Summary"
curl -s -o /dev/null -w "%{http_code}\n" "$S/cms/pages?pageType=ContentPage&pageLabelOrId=/nope"          # 404
curl -s "$S/cms/components?componentIds=HomeBanner,MiniCartComponent" | jq '.component[].typeCode'

# Prodotti: lingua e valuta cambiano nome e prezzo
curl -s "$S/products/300938?lang=de&curr=EUR" | jq '{name, price: .price.formattedValue}'
# { "name": "Photosmart E317 Digitalkamera", "price": "€104.99" }
curl -s "$S/products/search?query=power:relevance&pageSize=5" | jq '.pagination.totalResults, .products[].name'
curl -s "$S/products/nope" | jq '.errors[0].type'                                                         # "UnknownIdentifierError"

# OAuth2 password grant
TOKEN_JSON=$(curl -s -X POST "$B/authorizationserver/oauth/token" \
  -d 'client_id=mobile_android&client_secret=secret&grant_type=password&username=demo@spartacus.test&password=Password123.')
AT=$(echo "$TOKEN_JSON" | jq -r .access_token); RT=$(echo "$TOKEN_JSON" | jq -r .refresh_token)
curl -s -H "Authorization: Bearer $AT" "$S/users/current" | jq '.name'                                    # "Demo User"
curl -s "$S/users/current" | jq '.errors[0].type'                                                         # "AccessDeniedError"
curl -s -H "Authorization: Bearer sbagliato" "$S/users/current" | jq '.errors[0].type'                    # "InvalidTokenError"

# Refresh (rotazione: il secondo uso dello stesso refresh token fallisce)
curl -s -X POST "$B/authorizationserver/oauth/token" -d "client_id=mobile_android&client_secret=secret&grant_type=refresh_token&refresh_token=$RT" | jq '.access_token'
curl -s -X POST "$B/authorizationserver/oauth/token" -d "client_id=mobile_android&client_secret=secret&grant_type=refresh_token&refresh_token=$RT" | jq '.error'   # "invalid_grant"

# client_credentials (nessun refresh_token)
curl -s -X POST "$B/authorizationserver/oauth/token" -d 'client_id=mobile_android&client_secret=secret&grant_type=client_credentials' | jq 'keys'

# Carrello anonimo: crea, aggiungi, modifica, leggi, rimuovi
GUID=$(curl -s -X POST "$S/users/anonymous/carts?fields=DEFAULT" | jq -r .guid)
curl -s -X POST -H 'Content-Type: application/json' -d '{"product":{"code":"300938"},"quantity":2}' \
  "$S/users/anonymous/carts/$GUID/entries" | jq '{statusCode, quantityAdded, quantity}'
curl -s -X PATCH -H 'Content-Type: application/json' -d '{"quantity":5}' "$S/users/anonymous/carts/$GUID/entries/0" | jq '.quantity'
curl -s "$S/users/anonymous/carts/$GUID?curr=EUR" | jq '{totalUnitCount, total: .totalPrice.formattedValue}'
curl -s -X DELETE -o /dev/null -w "%{http_code}\n" "$S/users/anonymous/carts/$GUID/entries/0"             # 200

# Merge al login: il carrello anonimo diventa del cliente
GUID=$(curl -s -X POST "$S/users/anonymous/carts" | jq -r .guid)
curl -s -X POST -H 'Content-Type: application/json' -d '{"product":{"code":"553637"},"quantity":1}' "$S/users/anonymous/carts/$GUID/entries" > /dev/null
AT=$(curl -s -X POST "$B/authorizationserver/oauth/token" \
  -d 'client_id=mobile_android&client_secret=secret&grant_type=password&username=demo@spartacus.test&password=Password123.' | jq -r .access_token)
curl -s -X POST -H "Authorization: Bearer $AT" "$S/users/current/carts?oldCartId=$GUID" | jq '{code, user: .user.uid, units: .totalUnitCount}'
curl -s -H "Authorization: Bearer $AT" "$S/users/current/carts/current" | jq '.code'

# Revoca
curl -s -X POST -o /dev/null -w "%{http_code}\n" "$B/authorizationserver/oauth/revoke" -d "token=$AT"      # 200
curl -s -H "Authorization: Bearer $AT" "$S/users/current" | jq '.errors[0].type'                          # "InvalidTokenError"

# Errori generici
curl -s "$B/occ/v2/sito-inesistente/languages" | jq '.errors[0].type'                                     # "InvalidResourceError"
curl -s "$S/orders" | jq '.errors[0].message'                                                             # "No mock for GET /occ/v2/electronics-spa/orders"
```

## Codice minimo riscritto a mano

Il minimo per far partire una storefront OCC (una pagina CMS, un prodotto, il token) sta in 40 righe (compilato con
`tsc` strict e provato con `curl`):

```ts
// mini-mock.ts - il minimo indispensabile per far partire una storefront OCC (pagina CMS + prodotto + token)
import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: false }));

const paragraph = (uid: string, content: string) => ({ uid, typeCode: 'CMSParagraphComponent', name: uid, content });

// Una sola pagina per tutte le richieste CMS (Occ.CMSPage)
app.get(['/occ/v2/:site/cms/pages', '/occ/v2/:site/users/:userId/cms/pages'], (_req: Request, res: Response) => {
  res.json({
    uid: 'homepage', typeCode: 'ContentPage', template: 'LandingPage2Template', title: 'Home',
    contentSlots: { contentSlot: [{ slotId: 'Section1Slot', position: 'Section1', components: { component: [paragraph('Hello', '<h1>Ciao!</h1>')] } }] },
  });
});

// Un prodotto qualsiasi (Occ.Product); ?curr= decide il simbolo
app.get('/occ/v2/:site/products/:code', (req: Request, res: Response) => {
  const eur = req.query['curr'] === 'EUR';
  res.json({ code: req.params['code'], name: `Prodotto ${req.params['code']}`, price: { value: 10, formattedValue: eur ? '€10.00' : '$10.00' } });
});

// OAuth2 password grant (sempre valido: e' un mock!)
app.post('/authorizationserver/oauth/token', (req: Request, res: Response) => {
  if (req.body['grant_type'] !== 'password') {
    res.status(400).json({ error: 'unsupported_grant_type' });
    return;
  }
  res.json({ access_token: 'token-' + Date.now(), token_type: 'bearer', expires_in: 3600, refresh_token: 'r-' + Date.now() });
});

// Tutto il resto: 404 nel formato errori OCC (Occ.ErrorList)
app.use((req: Request, res: Response) => {
  res.status(404).json({ errors: [{ type: 'UnknownResourceError', message: `No mock for ${req.path}` }] });
});

app.listen(9002, () => console.log('mini mock su http://localhost:9002'));
```

Da qui si arriva al mock completo aggiungendo, nell'ordine: il router per sito con validazione del `baseSiteId`,
la gestione di `lang`/`curr`, i token veri (scadenza e rotazione), il carrello in memoria, l'endpoint `components`,
la ricerca, le immagini.

## Errori comuni

1. **Dimenticare CORS.** Lo storefront gira su `:4200`, il mock su `:9002`: senza header CORS il browser blocca
   tutto (in SSR invece funziona, perche' Node non applica CORS: sintomo tipico "in SSR va, nel browser no").
2. **Non gestire la preflight `OPTIONS`.** Le richieste con `Authorization` o `Content-Type: application/json` sono
   precedute da una `OPTIONS`; il pacchetto `cors` la gestisce. Se si aggiunge un ritardo, va escluso per `OPTIONS`.
3. **Ordine delle rotte in Express.** `/products/:productCode` prima di `/products/search` fa si' che `search` venga
   trattato come codice prodotto. Stesso problema per `/occ/v2/basesites` rispetto a `/occ/v2/:baseSiteId`.
4. **Formato errori diverso da OCC.** Spartacus legge `error.errors[0].type`: rispondere `{ message: '...' }` fa
   saltare il refresh del token (l'interceptor non riconosce `InvalidTokenError`).
5. **Token endpoint sotto `/occ/v2`.** Il token e' in `/authorizationserver/oauth/token`, **fuori** dal prefisso OCC
   e senza baseSite.
6. **Aspettarsi JSON sul token.** L'OAuth2 usa `application/x-www-form-urlencoded`: senza `express.urlencoded()`
   `req.body` e' vuoto.
7. **Confondere guid e code del carrello.** Utente anonimo = guid (non indovinabile); utente loggato = code.
   Usare il code per un anonimo e' una falla di sicurezza (chiunque potrebbe leggere carrelli altrui).
8. **Restituire prezzi non formattati.** Spartacus mostra `formattedValue`: senza, i prezzi a schermo sono vuoti.
9. **URL immagini assoluti "sbagliati".** Il backend restituisce URL relativi (`/medias/...`); e' Spartacus ad anteporre
   `backend.media.baseUrl`. Se il mock restituisse URL assoluti con un host diverso, in SSR e nel browser avremmo
   host diversi.
10. **Usare `baseUrl` relativo con SSR.** `baseUrl: ''` funziona solo se storefront e backend sono sullo stesso host
    (proxy); per il server Node serve un URL assoluto.
11. **Pensare che il mock applichi `fields`.** Il mock restituisce sempre tutto: codice che funziona col mock potrebbe
    non funzionare con SAP Commerce se chiede meno campi di quelli che usa. Per test "seri" confrontare con il backend vero.
12. **Riavviare il mock e aspettarsi il carrello.** Tutto e' in memoria: dopo il riavvio il guid salvato nel browser non
    esiste piu' (il mock risponde 404 `CartError` e la storefront dimentica il carrello).
13. **Login dello storefront reale col toggle `authorizationCodeFlowByDefault` attivo.** Il mock serve solo i grant
    `password`, `refresh_token` e `client_credentials` (vedi sopra come disattivare il toggle in locale).

## Domande di autoverifica

1. Perche' `/occ/v2/basesites` non contiene il baseSite nel path?
   *Risposta:* perche' serve proprio a scoprire i siti disponibili (e la loro config) prima di conoscerne uno.
2. Quali parametri usa Spartacus per chiedere una ContentPage e quali per una ProductPage?
   *Risposta:* ContentPage: `pageType=ContentPage&pageLabelOrId=<label>`; ProductPage: `pageType=ProductPage&code=<codice>`.
   Per la homepage nessun parametro.
3. Dove sono definiti in Spartacus gli endpoint del carrello?
   *Risposta:* in `feature-libs/cart/base/occ/config/default-occ-cart-config-factory.ts`.
4. Cosa deve contenere una risposta 401 perche' Spartacus provi il refresh del token?
   *Risposta:* `{"errors":[{"type":"InvalidTokenError", ...}]}` (o `InvalidBearerTokenError`).
5. Perche' il mock cancella il vecchio refresh token dopo l'uso?
   *Risposta:* per imitare la rotazione dei refresh token e far emergere i bug di refresh concorrenti: due refresh
   paralleli con lo stesso token fanno fallire il secondo con `invalid_grant`.
6. Quale id del carrello mette Spartacus nell'URL?
   *Risposta:* `getCartIdByUserId` (`feature-libs/cart/base/core/utils/utils.ts`): il `guid` se l'utente e' `anonymous`,
   il `code` per un utente loggato.
7. Cosa fa `POST users/current/carts?oldCartId=<guid>`?
   *Risposta:* crea (o, con `toMergeCartGuid`, riusa) il carrello del cliente e ci sposta le entry del carrello anonimo.
8. Perche' nel mock ci sono sia `/cms/pages` sia `/users/:userId/cms/pages`?
   *Risposta:* Spartacus 2611 usa la seconda forma (`default-cms-config.ts`); la prima e' la forma classica usata da
   mini-spartacus. Un array di path in Express le serve entrambe.
9. Come si prova il fallback CSR dell'SSR con il mock?
   *Risposta:* `MOCK_DELAY_MS=1500 npm start` e server SSR con `SSR_TIMEOUT=1000`: la prima risposta e' `csr-timeout`.
10. Perche' serve `cors({ origin: true, credentials: true })` e non `origin: '*'`?
    *Risposta:* con `credentials` il browser non accetta `*`: bisogna riflettere l'origine precisa. Serve se lo storefront
    usa `withCredentials` (es. CSRF/cookie del login custom o `backend.occ.useWithCredentials`).
11. Che differenza c'e' fra `AccessDeniedError` e `InvalidTokenError` nel mock?
    *Risposta:* `InvalidTokenError` = token presente ma non valido/scaduto (la storefront prova il refresh);
    `AccessDeniedError` = nessun token utente per una risorsa `current` (nessun refresh possibile).
12. Quali variabili d'ambiente collegano lo storefront reale al mock?
    *Risposta:* `CX_BASE_URL=http://localhost:9002` (o `SPA_ENV=local-http`), letta da `environment.occBaseUrl` e usata in
    `private.providers.ts`.
13. Perche' le immagini del mock hanno URL relativi?
    *Risposta:* come SAP Commerce: il frontend li completa con `backend.media.baseUrl` (o `backend.occ.baseUrl`) nel
    `ProductImageNormalizer`.
14. Cosa succede se lo storefront chiama un endpoint non implementato?
    *Risposta:* `404` con `UnknownResourceError` e messaggio `No mock for <METODO> <path>`, visibile anche nel log.
15. Cosa bisognerebbe aggiungere per supportare il checkout?
    *Risposta:* gli endpoint di `feature-libs/checkout/base/occ/config/default-occ-checkout-config.ts` (indirizzo di
    consegna, modalita' di consegna, pagamento) e `feature-libs/order/occ/config/default-occ-order-config.ts`
    (piazzamento ordine), piu' le pagine CMS del checkout.

## Assunzioni

- La compatibilita' con lo `storefrontapp` reale e' ricavata leggendo le config di default di Spartacus 2611 (tabella
  sopra), non avviando lo storefront: in questo ambiente le dipendenze della root del monorepo non sono installate.
- Il login dello storefront reale contro il mock richiede di disattivare in locale `authorizationCodeFlowByDefault`.
- I dati (prodotti con codici del sample data `electronics`, prezzi, cambio USD->EUR 0.92) sono inventati.
