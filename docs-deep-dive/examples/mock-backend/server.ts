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
