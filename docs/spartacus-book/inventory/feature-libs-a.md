# Inventario feature-libs (A): cart, checkout, order, user, asm, product, tracking, smartedit, qualtrics, pdf-invoices

> SHA `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`. I conteggi "file" sono file non-spec `.ts|.scss|.html` tracciati da git
> (`git ls-files <dir> | grep -E '\.(ts|scss|html)$' | grep -v spec | wc -l`). Il conteggio di una cartella include le sottocartelle.
> I path sono relativi alla root del repo.

## 0. Pattern comune

### 0.1 Struttura degli entry point (root / core / occ / components / assets)

Ogni libreria è un pacchetto `ng-packagr` con un `ng-package.json` in radice e un `ng-package.json` annidato per ogni
entry point secondario (es. `@spartacus/cart/base/root`). Per ogni "feature" la suddivisione ricorrente è:

| sotto-entry | contenuto tipico | caricamento |
|---|---|---|
| `root` | `*RootModule`, `feature-name.ts` (costanti `*_FEATURE` / `*_CORE_FEATURE`), facade astratte con `facadeFactory`, model, events, config default, token converter "pubblici" | eager (importato dall'app) |
| `core` | `*CoreModule`, connector + adapter astratti, implementazioni facade (`*Service implements *Facade`), store NgRx (dove presente), token converter interni | lazy |
| `occ` | `*OccModule`, `Occ*Adapter`, normalizer/serializer OCC, `defaultOcc*Config` (endpoint) | lazy |
| `components` | `*ComponentsModule` e moduli componente con `provideDefaultConfig({ cmsComponents: {...} })` | lazy |
| `assets` | `translations/<lang>/*.json` + `index.ts`, `translations/translations.ts` | eager (config i18n dell'app) |
| `<feature>/` (radice) | `*Module` "wrapper" che importa core + occ + components | target del `import()` lazy |

Esempio wrapper: `CartBaseModule` importa `CartBaseCoreModule, CartBaseOccModule, CartBaseComponentsModule`
(`feature-libs/cart/base/cart-base.module.ts:L12-L15`).

Il `public_api.ts` di radice di `cart`, `checkout`, `product`, `tracking` (e `tracking/tms`) è vuoto (`export {};`):
il codice si consuma solo dagli entry point secondari (`feature-libs/cart/public_api.ts:L20-L20`,
`feature-libs/checkout/public_api.ts:L11-L11`, `feature-libs/product/public_api.ts:L20-L20`,
`feature-libs/tracking/public_api.ts:L10-L10`, `feature-libs/tracking/tms/public_api.ts:L7-L7`).

### 0.2 Collegamento lazy: `featureModules` + `cmsComponents`

Il `RootModule` (eager) dichiara con `provideDefaultConfig`/`provideDefaultConfigFactory` quali chiavi CMS
appartengono a una feature, **senza** riferire il codice della feature. Esempio
(`feature-libs/cart/base/root/cart-base-root.module.ts:L26-L57`):

```ts
export function defaultCartComponentsConfig() {
  const config = {
    featureModules: {
      [CART_BASE_FEATURE]: {
        cmsComponents: [
          'CartApplyCouponComponent',
          'CartComponent',
          // ...
        ],
      },
      [MINI_CART_FEATURE]: {
        cmsComponents: ['MiniCartComponent'],
      },
      [ADD_TO_CART_FEATURE]: {
        cmsComponents: ['ProductAddToCartComponent'],
      },
      // ...
      [CART_BASE_CORE_FEATURE]: CART_BASE_FEATURE,
    },
  };
  return config;
}
```

- La forma `[X_CORE_FEATURE]: X_FEATURE` è un alias: il "core" viene caricato insieme al modulo della feature
  (commento "by default core is bundled together with components", es. `feature-libs/order/root/order-root.module.ts:L75-L76`).
- Le facade in `root` usano `facadeFactory({ feature: X_CORE_FEATURE, ... })`, quindi la prima chiamata alla facade
  risolve la feature lazy (es. `feature-libs/cart/base/root/facade/active-cart.facade.ts:L13-L46`).
- `dependencies: [CART_BASE_FEATURE]` forza il caricamento preliminare di un'altra feature
  (es. `feature-libs/order/root/order-root.module.ts:L71-L74`).

L'app fornisce l'`import()` vero e proprio con `provideConfig({ featureModules: { [X]: { module: () => import(...) } } })`.
Esempio nella demo app (`projects/storefrontapp/src/app/spartacus/features/cart/cart-base-feature.module.ts:L23-L45`):

```ts
@NgModule({
  imports: [CartBaseRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [CART_BASE_FEATURE]: {
          module: () =>
            import('./cart-base-wrapper.module').then(
              (m) => m.CartBaseWrapperModule
            ),
        },
      },
    }),
    provideConfig({
      featureModules: {
        [MINI_CART_FEATURE]: {
          module: () =>
            import('@spartacus/cart/base/components/mini-cart').then(
              (m) => m.MiniCartModule
            ),
        },
      },
    }),
    // ...
```

Nel modulo lazy il componente concreto viene mappato con la chiave `cmsComponents`
(`feature-libs/cart/base/components/mini-cart/mini-cart.module.ts:L29-L35`):

```ts
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        MiniCartComponent: {
          component: MiniCartComponent,
        },
      },
    }),
```

### 0.3 Connector → Adapter → Converter

Nel modulo `occ` l'adapter astratto (in `core`) viene legato all'implementazione OCC e i normalizer vengono registrati
`multi: true` sui token converter (`feature-libs/cart/base/occ/cart-base-occ.module.ts:L32-L72`):

```ts
  providers: [
    provideDefaultConfigFactory(defaultOccCartConfigFactory),
    {
      provide: CartAdapter,
      useClass: OccCartAdapter,
    },
    {
      provide: CART_NORMALIZER,
      useExisting: OccCartNormalizer,
      multi: true,
    },
    // ...
```

### 0.4 Schematics (uguale in tutte le 10 lib)

Ogni lib ha `schematics/collection.json` con due schematics, `ng-add` (privato, alias `install`) e `add`, che puntano
alla stessa factory (`feature-libs/cart/schematics/collection.json:L4-L16`). La factory (`add-<lib>/index.ts`, 43 righe;
45 per pdf-invoices) esegue `analyzeCrossFeatureDependencies` → `analyzeApplication` → `addFeatures` →
`addPackageJsonDependenciesForLibrary(peerDependencies)` → `finalizeInstallation`
(`feature-libs/cart/schematics/add-cart/index.ts:L25-L43`). Le peerDependencies sono importate dal `package.json`
della lib (`feature-libs/cart/schematics/add-cart/index.ts:L23-L23`). La definizione delle feature (moduli, import,
chunk i18n) NON sta nella lib ma in `@spartacus/schematics` ⚠️ DA VERIFICARE (non letto in questo inventario).

### 0.5 Versione pacchetti

I `package.json` dichiarano `"version": "221121.22.0"` (`feature-libs/cart/package.json:L3-L3`) e le peer
`@spartacus/*` a `221121.22.0`, diverso dal "2612.0.0" indicato nelle regole comuni. ⚠️ DA VERIFICARE con l'orchestratore.

---

## 1. `@spartacus/cart` — `feature-libs/cart` (527 file)

**peerDependencies** `feature-libs/cart/package.json:L32-L47`: `@angular-devkit/schematics`, `@angular/{common,core,forms,router}`,
`@ng-select/ng-select`, `@ngrx/{effects,store}`, `@spartacus/{core,schematics,storefront,styles,user}`, `rxjs`.

| cartella | tema | note |
|---|---|---|
| `base/` (246) | carrello: active/multi/selective cart, voucher, validation, guest user, access code | wrapper `CartBaseModule` `base/cart-base.module.ts:L12-L15` |
| `base/root` (38) | `CartBaseRootModule`, facade, events, tokens converter, models, config | `base/root/cart-base-root.module.ts:L59-L83`; route `cart` con `ORDER_ENTRIES_CONTEXT` L62-L75 |
| `base/core` (71) | connector/adapter, facade impl, store NgRx `cart` (multi-cart), guards, `CartPersistenceModule` | `CartBaseCoreModule` `base/core/cart-base-core.module.ts:L22-L49`; `MULTI_CART_FEATURE = 'cart'` `base/core/store/multi-cart-state.ts:L10-L10` |
| `base/occ` (15) | 6 `Occ*Adapter`, normalizer, endpoint | `CartBaseOccModule` `base/occ/cart-base-occ.module.ts:L32-L72` |
| `base/components` (79) | cart details, coupon, totals, proceed to checkout, save for later, clear cart, validation, added-to-cart dialog | `CartBaseComponentsModule` `base/components/cart-base-components.module.ts:L21-L53` |
| `base/components/add-to-cart` (4) | entry separato, lazy indipendente (`addToCart`) | `AddToCartModule` `.../add-to-cart/add-to-cart.module.ts:L23-L48` |
| `base/components/mini-cart` (5) | entry separato, lazy indipendente (`miniCart`) | `MiniCartModule` `.../mini-cart/mini-cart.module.ts:L19-L39` |
| `base/assets` (19) | traduzioni `cart.json` per lingua | — |
| `import-export/` (63) | import/export voci carrello (CSV) | `ImportExportModule` `import-export/import-export.module.ts:L15-L23` |
| `import-export/root` (3) | solo feature-name + root module | `ImportExportRootModule` `import-export/root/import-export-root.module.ts:L11-L26` |
| `import-export/core` (9) | config + model, nessun connector | `ImportExportCoreModule` `import-export/core/import-export-core.module.ts:L11-L12` |
| `import-export/components` (24) | export, import-to-cart, import-export | nessun entry `occ` |
| `quick-order/` (65) | quick order | `QuickOrderModule` `quick-order/quick-order.module.ts:L11-L14` |
| `quick-order/root` (12) | facade, config, tokens, route `quickOrder` | `QuickOrderRootModule` `quick-order/root/quick-order-root.module.ts:L46-L69` |
| `quick-order/core` (8) | `QuickOrderService` | `QuickOrderCoreModule` `quick-order/core/quick-order-core.module.ts:L11-L14` |
| `quick-order/components` (18) | quick-order list/form | nessun entry `occ` |
| `saved-cart/` (93) | carrelli salvati | `SavedCartModule` `saved-cart/saved-cart.module.ts:L12-L15` |
| `saved-cart/root` (12) | facade, events, route `savedCarts`/`savedCartsDetails` | `SavedCartRootModule` `saved-cart/root/saved-cart-root.module.ts:L52-L98` |
| `saved-cart/core` (18) | connector/adapter, facade impl, store actions | `SavedCartCoreModule` `saved-cart/core/saved-cart-core.module.ts:L13-L17` |
| `saved-cart/occ` (7) | `OccSavedCartAdapter` | `SavedCartOccModule` `saved-cart/occ/saved-cart-occ.module.ts:L14-L24` |
| `saved-cart/components` (27) | add-to-saved-cart, list, details, form dialog | — |
| `wish-list/` (55) | wish list (v1 e v2) | `WishListModule` L11-L14, `WishListV2Module` L35-L50, `WishListWithV2Module` L11-L14 (`wish-list/*.module.ts`) |
| `wish-list/root` (5) | facade + feature-name | `WishListRootModule` `wish-list/root/wish-list-root.module.ts:L33-L36` |
| `wish-list/core` (13) | `WishListService`, `WishListV2Service`, store actions | nessun entry `occ` proprio; v2 usa `@spartacus/user/wishlist` (`wish-list/wish-list-v2.module.ts:L35-L50`) |
| `wish-list/components` (10), `.../add-to-wishlist` (4) | wish list + add-to-wishlist (lazy separato) | `AddToWishListModule` `.../add-to-wish-list.module.ts:L24-L47` |
| `*/assets` (19 ciascuno) | traduzioni per sotto-feature | — |
| `schematics/` | `ng-add`/`add` → `addCartFeatures` | `schematics/add-cart/index.ts:L25-L43` |

**Entry point e public_api** (31 `ng-package.json`):
`base/root/public_api.ts:L7-L19` (root module, config, context, events, facade, feature-name, models, services, tokens, utils);
`base/core/public_api.ts:L7-L18` (core + persistence module, connectors, event, facade, guards, services, store actions/effects/state/selectors, utils);
`base/occ/public_api.ts:L7-L9` (adapters, occ module, model); `base/components/public_api.ts:L7-L25`;
`base/components/add-to-cart/public_api.ts:L7-L8`; `base/components/mini-cart/public_api.ts:L7-L9`;
`import-export/{root,core,components}/public_api.ts` (L7-L8, L7-L9, L7-L9); `quick-order/{root,core,components}` (L7-L12, L7-L9, L7-L10);
`saved-cart/{root,core,occ,components}` (L7-L12, L7-L12, L7-L9, L7-L12); `wish-list/public_api.ts:L7-L9` (3 moduli),
`wish-list/{root,core,components,components/add-to-wishlist}` (L7-L9, L7-L10, L7-L9, L7-L8); ogni `*/assets/public_api.ts:L7-L7` (translations).

**Simboli chiave**

| simbolo | file:righe |
|---|---|
| `CART_BASE_FEATURE='cartBase'`, `CART_BASE_CORE_FEATURE`, `MINI_CART_FEATURE`, `ADD_TO_CART_FEATURE` | `feature-libs/cart/base/root/feature-name.ts:L7-L11` |
| `CART_IMPORT_EXPORT_FEATURE`, `CART_QUICK_ORDER_FEATURE`(+CORE), `CART_SAVED_CART_FEATURE`(+CORE), `CART_WISH_LIST_FEATURE`(+CORE), `ADD_TO_WISHLIST_FEATURE` | `.../import-export/root/feature-name.ts:L7-L7`, `.../quick-order/root/feature-name.ts:L7-L8`, `.../saved-cart/root/feature-name.ts:L7-L8`, `.../wish-list/root/feature-name.ts:L7-L10` |
| featureModules base (6 cmsComponents + mini-cart + add-to-cart) | `feature-libs/cart/base/root/cart-base-root.module.ts:L26-L57` |
| featureModules import-export (3 cmsComponents) | `feature-libs/cart/import-export/root/import-export-root.module.ts:L13-L23` |
| featureModules quick-order (`QuickOrderComponent`, `CartQuickOrderFormComponent`) | `feature-libs/cart/quick-order/root/quick-order-root.module.ts:L23-L34` |
| featureModules saved-cart (5 cmsComponents, dep `CART_BASE_FEATURE`) | `feature-libs/cart/saved-cart/root/saved-cart-root.module.ts:L31-L50` |
| featureModules wish-list (`WishListComponent`, `AddToWishListComponent`) | `feature-libs/cart/wish-list/root/wish-list-root.module.ts:L16-L31` |
| Facade (feature `CART_BASE_CORE_FEATURE`): `ActiveCartFacade` L13-L46, `CartAccessCodeFacade` L12-L21, `CartGuestUserFacade` L13-L22, `CartValidationFacade` L13-L22, `CartVoucherFacade` L12-L29, `MultiCartFacade` L13-L43, `SelectiveCartFacade` L13-L31 | `feature-libs/cart/base/root/facade/*.facade.ts` |
| `QuickOrderFacade` / `SavedCartFacade` / `WishListFacade` | `.../quick-order/root/facade/quick-order.facade.ts:L42-L46`, `.../saved-cart/root/facade/saved-cart.facade.ts:L13-L51`, `.../wish-list/root/facade/wish-list.facade.ts:L13-L30` |
| Connector: `CartConnector` L15, `CartEntryConnector` L15, `CartVoucherConnector` L14, `CartValidationConnector` L15, `CartAccessCodeConnector` L12, `CartGuestUserConnector` L13 | `feature-libs/cart/base/core/connectors/<x>/*.connector.ts` |
| Adapter astratti corrispondenti (`CartAdapter` `.../cart/cart.adapter.ts:L10-L10`, ecc.) | `feature-libs/cart/base/core/connectors/<x>/*.adapter.ts` |
| `SavedCartConnector` / `SavedCartAdapter` | `.../saved-cart/core/connectors/saved-cart.connector.ts:L13-L13`, `.../saved-cart.adapter.ts:L10-L10` |
| OCC adapter: `OccCartAdapter` L28, `OccCartEntryAdapter` L18, `OccCartVoucherAdapter` L25, `OccCartValidationAdapter` L24, `OccCartAccessCodeAdapter` L24, `OccCartGuestUserAdapter` L29; `OccSavedCartAdapter` L20 | `feature-libs/cart/base/occ/adapters/*.ts`, `feature-libs/cart/saved-cart/occ/adapters/occ-saved-cart.adapter.ts` |
| Converter token: `CART_NORMALIZER`, `ORDER_ENTRY_PROMOTIONS_NORMALIZER`, `CART_MODIFICATION_NORMALIZER`, `SAVE_CART_NORMALIZER`, `CART_VOUCHER_NORMALIZER` | `feature-libs/cart/base/root/tokens/converters.ts:L17-L35` |
| `CART_ACCESS_CODE_NORMALIZER`, `CART_GUEST_USER_NORMALIZER`, `CART_VALIDATION_NORMALIZER` | `.../core/connectors/access-code/converters.ts:L10-L10`, `.../guest-user/converters.ts:L11-L11`, `.../validation/converters.ts:L11-L11` |
| Endpoint `defaultOccCartConfigFactory` (carts, cart, createCart, addEntries, …, cartGuestUser) | `feature-libs/cart/base/occ/config/default-occ-cart-config-factory.ts:L9-L39` |
| Endpoint `defaultOccSavedCartConfigFactory` (savedCarts, savedCart, restoreSavedCart, cloneSavedCart) | `feature-libs/cart/saved-cart/occ/config/default-occ-saved-cart-config-factory.ts:L9-L23` |

Moduli componente con `cmsComponents: {`: `add-to-cart.module.ts:L36`, `cart-coupon.module.ts:L42`, `cart-details.module.ts:L36`,
`cart-proceed-to-checkout.module.ts:L30`, `cart-totals.module.ts:L17`, `clear-cart.module.ts:L24`, `mini-cart.module.ts:L30`,
`save-for-later.module.ts:L22`, `export-order-entries.module.ts:L25`, `import-export-order-entries.module.ts:L24`,
`import-order-entries.module.ts:L48`, `cart-quick-order-form.module.ts:L36`, `quick-order-list.module.ts:L54`,
`add-to-saved-cart.module.ts:L30`, `saved-cart-details.module.ts:L43`, `saved-cart-list.module.ts:L34`,
`add-to-wish-list.module.ts:L38`, `wish-list-components.module.ts:L45` (tutti sotto `feature-libs/cart/**/components/`).

---

## 2. `@spartacus/checkout` — `feature-libs/checkout` (318 file)

**peerDependencies** `feature-libs/checkout/package.json:L28-L44`: Angular (`common,core,forms,router`), devkit schematics,
`@ng-select/ng-select`, `@ngrx/store`, `@spartacus/{cart,core,order,schematics,storefront,styles,user}`, `rxjs`.

| cartella | tema | note |
|---|---|---|
| `base/` (183) | checkout B2C: delivery address/mode, payment, billing, review, place order | `CheckoutModule` `base/checkout.module.ts:L12-L15` |
| `base/root` (28) | root module, facade, events, config, model (`CheckoutStepType`, `CheckoutState`) | `CheckoutRootModule` `base/root/checkout-root.module.ts:L51-L60` (registra anche `...interceptors` L54) |
| `base/core` (30) | 5 connector + adapter, facade impl, services | `CheckoutCoreModule` `base/core/checkout-core.module.ts:L17-L33`; nessuno store NgRx esportato |
| `base/occ` (11) | 5 `OccCheckout*Adapter` | `CheckoutOccModule` `base/occ/checkout-occ.module.ts:L24-L50` |
| `base/components` (64) | orchestrator, progress (desktop/mobile), steps, review, guards | `CheckoutComponentsModule` `base/components/checkout-components.module.ts:L23-L41` |
| `b2b/` (86) | estensione B2B: cost center, payment type | `CheckoutB2BModule` `b2b/checkout-b2b.module.ts:L12-L19` |
| `b2b/root` (16) | ridefinisce i cmsComponents della **stessa** feature `CHECKOUT_FEATURE` | `CheckoutB2BRootModule` `b2b/root/checkout-b2b-root.module.ts:L44-L52` |
| `b2b/core` (16), `b2b/occ` (8), `b2b/components` (17) | connector/adapter B2B, OCC, componenti | `CheckoutB2BCoreModule` `b2b/core/checkout-b2b-core.module.ts:L14-L26`, `CheckoutB2BOccModule` `b2b/occ/checkout-b2b-occ.module.ts:L17-L31` |
| `scheduled-replenishment/` (44) | ordini di replenishment programmati | nessun `core`/`occ` (usa order) |
| `scheduled-replenishment/root` (5) | root + events | `CheckoutScheduledReplenishmentRootModule` `.../root/checkout-scheduled-replenishment-root.module.ts:L33-L37` |
| `scheduled-replenishment/components` (10) | place order + schedule form | `.../components/checkout-scheduled-replenishment-components.module.ts:L12-L19` |
| `*/assets` (19 ciascuno) | traduzioni | — |
| `schematics/` | `addCheckoutFeatures` | `schematics/add-checkout/index.ts:L25-L43` |

**Entry point e public_api** (17): `base/root:L7-L16`, `base/core:L7-L10`, `base/occ:L7-L9`, `base/components:L7-L40`,
`b2b/root:L7-L11`, `b2b/core:L7-L9`, `b2b/occ:L7-L9`, `b2b/components:L7-L16`, `scheduled-replenishment/root:L7-L8`,
`scheduled-replenishment/components:L7-L12`, wrapper `base|b2b|scheduled-replenishment/public_api.ts:L11-L11`, assets `L7-L7`.

**Simboli chiave**

| simbolo | file:righe |
|---|---|
| `CHECKOUT_FEATURE='checkout'`, `CHECKOUT_CORE_FEATURE` | `feature-libs/checkout/base/root/feature-name.ts:L7-L8` |
| `CHECKOUT_BASE_CMS_COMPONENTS` (14 chiavi) + featureModules (dep `CART_BASE_FEATURE`) | `feature-libs/checkout/base/root/checkout-root.module.ts:L20-L49` |
| `CHECKOUT_B2B_CMS_COMPONENTS` (= base + `CheckoutCostCenterComponent`, `CheckoutPaymentType`) | `feature-libs/checkout/b2b/root/checkout-b2b-root.module.ts:L23-L42` |
| `CHECKOUT_SCHEDULED_REPLENISHMENT_CMS_COMPONENTS` (= B2B + `CheckoutScheduleReplenishmentOrder`) | `feature-libs/checkout/scheduled-replenishment/root/checkout-scheduled-replenishment-root.module.ts:L13-L31` |
| Facade (feature `CHECKOUT_CORE_FEATURE`): `CheckoutBillingAddressFacade` L12-L23, `CheckoutDeliveryAddressFacade` L12-L28, `CheckoutDeliveryModesFacade` L13-L30, `CheckoutPaymentFacade` L17-L35, `CheckoutQueryFacade` L13-L22 | `feature-libs/checkout/base/root/facade/*.facade.ts` |
| `CheckoutCostCenterFacade` L13-L22, `CheckoutPaymentTypeFacade` L13-L29 | `feature-libs/checkout/b2b/root/facade/*.facade.ts` |
| Connector base: `CheckoutConnector`, `CheckoutBillingAddressConnector`, `CheckoutDeliveryAddressConnector`, `CheckoutDeliveryModesConnector`, `CheckoutPaymentConnector` (tutti L13) | `feature-libs/checkout/base/core/connectors/<x>/<x>.connector.ts` |
| Connector B2B: `CheckoutCostCenterConnector`, `CheckoutPaymentTypeConnector` (L13) | `feature-libs/checkout/b2b/core/connectors/<x>/<x>.connector.ts` |
| OCC adapter: `OccCheckoutAdapter` L26, `OccCheckoutBillingAddressAdapter` L23, `OccCheckoutDeliveryAddressAdapter` L26, `OccCheckoutDeliveryModesAdapter` L27, `OccCheckoutPaymentAdapter` L31; B2B `OccCheckoutCostCenterAdapter` L23, `OccCheckoutPaymentTypeAdapter` L28 | `feature-libs/checkout/{base,b2b}/occ/adapters/*.ts` |
| Converter: `CHECKOUT_NORMALIZER` L11, `DELIVERY_MODE_NORMALIZER` L11, `PAYMENT_DETAILS_SERIALIZER` L10, `PAYMENT_CARD_TYPE_NORMALIZER` L14, `CHECKOUT_PAYMENT_TYPE_NORMALIZER` L11 | `feature-libs/checkout/*/core/connectors/<x>/converters.ts` |
| Endpoint `defaultOccCheckoutConfig` (setDeliveryAddress, cardTypes, deliveryModes, setCartPaymentDetails, getCheckoutDetails, setBillingAddress, …) | `feature-libs/checkout/base/occ/config/default-occ-checkout-config.ts:L12-L35` |
| Endpoint `defaultOccCheckoutB2BConfig` (setDeliveryAddress, paymentTypes, setCartCostCenter, setCartPaymentType) | `feature-libs/checkout/b2b/occ/config/default-occ-checkout-b2b-config.ts:L16-L29` |

Moduli con `cmsComponents: {`: 14 in `base/components/**` (es. `checkout-orchestrator.module.ts:L19`, `checkout-place-order.module.ts:L46`),
4 in `b2b/components/**` (es. `checkout-cost-center.module.ts:L22`), 2 in `scheduled-replenishment/components/**`
(`checkout-place-order.module.ts:L36`, `checkout-schedule-replenishment-order.module.ts:L28`).

---

## 3. `@spartacus/order` — `feature-libs/order` (358 file)

**peerDependencies** `feature-libs/order/package.json:L28-L45`: Angular (`common,core,forms,router`), devkit, `@ng-select/ng-select`,
`@ngrx/{effects,store}`, `@spartacus/{cart,core,pdf-invoices,schematics,storefront,styles,user}`, `rxjs`.

Nota: qui gli entry `root/core/occ/components/assets` stanno **direttamente** sotto la lib (non in una sotto-feature);
il public_api di radice esporta il wrapper `OrderModule` (`feature-libs/order/public_api.ts:L16-L16`, `feature-libs/order/order.module.ts:L12-L15`).

| cartella | tema | note |
|---|---|---|
| `root` (31) | root module con 11 route, facade, events, tokens converter, config | `OrderRootModule` `root/order-root.module.ts:L82-L180` |
| `core` (67) | 6 connector/adapter, facade impl, store NgRx `order` | `OrderCoreModule` `core/order-core.module.ts:L17-L29`; `ORDER_FEATURE` `core/store/order-state.ts:L17-L17` |
| `occ` (18) | 6 `Occ*Adapter`, converter OCC | `OrderOccModule` `occ/order-occ.module.ts:L38-L90` |
| `components` (138) | order history/details/confirmation, amend (cancel/return), replenishment, return request, my-account-v2 | `OrderComponentsModule` `components/order-components.module.ts:L23-L43` |
| `assets` (19) | traduzioni | — |
| `styles` (30) | SCSS componenti order (fuori dagli entry point) | `_index.scss` di radice |
| `document-flow/` (49) | documenti successivi d'ordine | `OrderDocumentFlowModule` `document-flow/order-document-flow.module.ts:L12-L19` |
| `document-flow/root` (8) | facade, model, feature-name | `OrderDocumentFlowRootModule` `document-flow/root/order-document-flow-root.module.ts:L11-L22` |
| `document-flow/core` (8), `occ` (7), `components` (17), `assets` (3) | connector, OCC adapter, componente + dialog | `document-flow/occ/order-document-flow-occ.module.ts:L14-L24` |
| `schematics/` | `addOrderFeatures` | `schematics/add-order/index.ts:L25-L43` |

**Entry point e public_api** (12): `root:L7-L17`, `core:L7-L12`, `occ:L7-L9`, `components:L7-L20`, `assets:L7-L7`,
`document-flow/public_api.ts:L7-L7`, `document-flow/{root,core,occ,components,assets}` (L7-L10, L7-L9, L7-L9, L7-L9, L7-L7).

**Simboli chiave**

| simbolo | file:righe |
|---|---|
| `ORDER_FEATURE='order'`, `ORDER_CORE_FEATURE` | `feature-libs/order/root/feature-name.ts:L7-L8` |
| `ORDER_DOCUMENT_FLOW_FEATURE` | `feature-libs/order/document-flow/root/feature-name.ts:L7-L7` |
| `ORDER_CMS_COMPONENTS` (36 chiavi) + featureModules (dep `CART_BASE_FEATURE`) | `feature-libs/order/root/order-root.module.ts:L28-L80` |
| featureModules document-flow (`AccountOrderDocumentFlowComponent`) | `feature-libs/order/document-flow/root/order-document-flow-root.module.ts:L13-L19` |
| Facade (feature `ORDER_CORE_FEATURE`): `OrderFacade` L14-L31, `OrderAttachmentsFacade` L13-L22, `OrderHistoryFacade` L45-L49, `OrderReturnRequestFacade` L41-L45, `ReorderOrderFacade` L13-L22, `ReplenishmentOrderHistoryFacade` L43-L47, `ScheduledReplenishmentOrderFacade` L14-L23 | `feature-libs/order/root/facade/*.facade.ts` |
| `OrderDocumentFlowFacade` | `feature-libs/order/document-flow/root/facade/order-document-flow.facade.ts:L17-L29` |
| Connector: `OrderConnector` L13, `OrderAttachmentsConnector` L13, `OrderHistoryConnector` L22, `ReorderOrderConnector` L13, `ReplenishmentOrderHistoryConnector` L16, `ScheduledReplenishmentOrderConnector` L16 | `feature-libs/order/core/connectors/*.connector.ts` |
| `OrderDocumentFlowConnector` / `OrderDocumentFlowAdapter` | `.../document-flow/core/connectors/order-document-flow.connector.ts:L16-L16`, `.../order-document-flow.adapter.ts:L13-L13` |
| OCC adapter: `OccOrderAdapter` L29, `OccOrderAttachmentsAdapter` L25, `OccOrderHistoryAdapter` L46, `OccReorderOrderAdapter` L22, `OccReplenishmentOrderHistoryAdapter` L22, `OccScheduledReplenishmentOrderAdapter` L28; `OccOrderDocumentFlowAdapter` L28 | `feature-libs/order/occ/adapters/*.ts`, `feature-libs/order/document-flow/occ/adapters/occ-order-document-flow.adapter.ts` |
| Converter token (10): `ORDER_NORMALIZER` … `REPLENISHMENT_ORDER_FORM_SERIALIZER` | `feature-libs/order/root/tokens/converters.ts:L24-L62` |
| Endpoint `defaultOccOrderConfig` (orderHistory, orderDetail, consignmentTracking, cancelOrder, returnOrder, replenishment*, placeOrder, orderAttachments, …) | `feature-libs/order/occ/config/default-occ-order-config.ts:L9-L50` |
| Endpoint `defaultOccDocumentFlowConfigFactory` (subsequentDocuments, subsequentDocumentsEntries) | `feature-libs/order/document-flow/occ/config/default-occ-document-flow-config-factory.ts:L9-L24` |

Moduli con `cmsComponents: {`: 13 file in `components/**` (es. `order-details/order-details.module.ts:L81` e L129,
`order-confirmation/order-confirmation.module.ts:L71`), più `document-flow/components/order-document-flow-components.module.ts:L50`.

---

## 4. `@spartacus/user` — `feature-libs/user` (250 file)

**peerDependencies** `feature-libs/user/package.json:L28-L41`: Angular (`common,core,forms,router`), devkit, `@ng-select/ng-select`,
`@ngrx/store`, `@spartacus/{core,schematics,storefront,styles}`, `rxjs`.

Il public_api di radice riesporta `@spartacus/user/account` e `@spartacus/user/profile` (`feature-libs/user/public_api.ts:L19-L20`).

| cartella | tema | note |
|---|---|---|
| `account/` (100) | login, OTP login, verification token, OAuth callback, my-account-v2 user | `UserAccountModule` `account/user-account.module.ts:L12-L19` |
| `account/root` (18) | root, facade, config, events, services currency persistence | `UserAccountRootModule` `account/root/user-account-root.module.ts:L68-L75` |
| `account/core` (10), `account/occ` (7) | connector/adapter, `OccUserAccountAdapter` | `UserAccountCoreModule` `account/core/user-account-core.module.ts:L11-L14`, `UserAccountOccModule` `account/occ/user-account-occ.module.ts:L13-L19` |
| `account/components` (37) | login form, login-register, otp, verification token form, oauth-callback, guard | `UserAccountComponentsModule` `account/components/user-account-component.module.ts:L16-L27` |
| `profile/` (136) | registrazione, update profile/email/password, forgot/reset password, close account, address book | `UserProfileModule` `profile/user-profile.module.ts:L13-L21` |
| `profile/root` (12) | root, facade, model, `UserCurrencyPreferenceSaverService` | `UserProfileRootModule` `profile/root/user-profile-root.module.ts:L45-L58` |
| `profile/core` (12), `profile/occ` (7), `profile/components` (69) | connector, OCC, componenti | `UserProfileComponentsModule` `profile/components/user-profile-components.module.ts:L19-L33` |
| `wishlist/` (9) | API wishlist v2: solo connector/adapter/model, **nessun** RootModule né componenti | consumato da `WishListV2Module` di cart |
| `wishlist/root` (2), `core` (3), `occ` (3) | model; `UserWishlistConnector`/`Adapter`; `OccUserWishlistAdapter` + endpoint | — |
| `*/assets` (19) | traduzioni | — |
| `schematics/` | `addUserFeatures` | `schematics/add-user/index.ts:L25-L43` |

**Entry point e public_api** (17): `account/{root,core,occ,components,assets}` (L7-L18, L7-L9, L7-L8, L7-L15, L7-L7),
`profile/{root,core,occ,components,assets}` (L7-L14, L7-L9, L7-L8, L7-L17, L7-L7), `wishlist/public_api.ts:L7-L9`,
`wishlist/{root,core,occ}` (L7-L7, L7-L8, L7-L8), wrapper `account/public_api.ts:L11-L11`, `profile/public_api.ts:L10-L10`.

**Simboli chiave**

| simbolo | file:righe |
|---|---|
| `USER_ACCOUNT_FEATURE='userAccount'`(+CORE), `USER_PROFILE_FEATURE='userProfile'`(+CORE) | `feature-libs/user/account/root/feature-name.ts:L7-L8`, `feature-libs/user/profile/root/feature-name.ts:L7-L8` |
| featureModules account (9 cmsComponents; rimuove `OAuthCallbackComponent` se i toggle `oauthCallbackPage`/`asyncAuthConfigInitializer`/`authorizationCodeFlowByDefault` non sono tutti attivi) | `feature-libs/user/account/root/user-account-root.module.ts:L23-L66` |
| featureModules profile (10 cmsComponents) | `feature-libs/user/profile/root/user-profile-root.module.ts:L21-L43` |
| `UserProfileFacadeTransitionalToken` → `UserProfileFacade` | `feature-libs/user/profile/root/user-profile-root.module.ts:L48-L51` |
| Facade: `UserAccountFacade` L13-L22, `VerificationTokenFacade` L13-L22 (feature `USER_ACCOUNT_CORE_FEATURE`) | `feature-libs/user/account/root/facade/*.facade.ts` |
| Facade: `UserEmailFacade` L12-L21, `UserPasswordFacade` L12-L21, `UserProfileFacade` L14-L23, `UserRegisterFacade` L14-L23 (feature `USER_PROFILE_CORE_FEATURE`) | `feature-libs/user/profile/root/facade/*.facade.ts` |
| Connector/Adapter: `UserAccountConnector` L17 / `UserAccountAdapter` L14; `UserProfileConnector` L14 / `UserProfileAdapter` L11; `UserWishlistConnector` L13 / `UserWishlistAdapter` L10 | `feature-libs/user/{account,profile,wishlist}/core/connectors/*.ts` |
| OCC: `OccUserAccountAdapter` L35, `OccUserProfileAdapter` L38, `OccUserWishlistAdapter` L20 | `feature-libs/user/*/occ/adapters/*.ts` |
| Converter: `USER_ACCOUNT_NORMALIZER`, `USER_ACCOUNT_SERIALIZER`, `VERIFICATION_TOKEN_NORMALIZER`, `LOGIN_FORM_SERIALIZER` | `feature-libs/user/account/core/connectors/converters.ts:L15-L29` |
| Converter: `USER_PROFILE_NORMALIZER`, `USER_PROFILE_SERIALIZER`, `USER_SERIALIZER`, `USER_SIGN_UP_SERIALIZER`, `TITLE_NORMALIZER` | `feature-libs/user/profile/core/connectors/converters.ts:L12-L30` |
| Endpoint `defaultOccUserAccountConfig` (user, createVerificationToken) | `feature-libs/user/account/occ/adapters/config/default-occ-user-account-endpoint.config.ts:L9-L18` |
| Endpoint `defaultOccUserProfileConfig` (userRegister, userForgotPassword, userRestoreToken, userResetPassword, userUpdateLoginId, userUpdatePassword, titles) | `feature-libs/user/profile/occ/adapters/config/default-occ-user-profile-endpoint.config.ts:L9-L23` |
| Endpoint `defaultOccUserWishlistConfig` (getWishlists, getWishlistEntries, addWishlistEntry, removeWishlistEntry) | `feature-libs/user/wishlist/occ/adapters/config/default-occ-user-wishlist-endpoint.config.ts:L9-L21` |

Moduli con `cmsComponents: {`: 7 in `account/components/**` (es. `login-form.module.ts:L51`; `oauth-callback.module.ts:L30` è
condizionale e mappa `OAuthCallbackComponent` su `SpinnerComponent` con `OAuthCallbackGuard`, L28-L33) e 10 in `profile/components/**`.

---

## 5. `@spartacus/asm` — `feature-libs/asm` (287 file)

**peerDependencies** `feature-libs/asm/package.json:L28-L46`: Angular (`common,core,forms,router`), devkit, `@ng-select/ng-select`,
`@ngrx/{effects,store}`, `@spartacus/{cart,core,order,schematics,storefinder,storefront,styles,user}`, `rxjs`.

Particolarità: il `featureModules` della feature `asm` **non** ha `cmsComponents`. La UI viene caricata da `AsmLoaderModule`
(`APP_INITIALIZER` → `AsmEnablerService.load()`, `feature-libs/asm/root/asm-loader.module.ts:L16-L40`) che chiama
`featureModules.resolveFeature('asm')` e poi `launchDialogService.launch(LAUNCH_CALLER.ASM)`
(`feature-libs/asm/root/services/asm-enabler.service.ts:L84-L88`). Il RootModule sostituisce servizi auth del core.

| cartella | tema | note |
|---|---|---|
| `root` (26) | `AsmRootModule` (override `AuthStorageService`, `AuthService`, `AuthHttpHeaderService`, `ProtectedRoutesService`, interceptor `UserIdHttpHeaderInterceptor`; route `asmDeepLink`), `AsmLoaderModule`, facade, config | `feature-libs/asm/root/asm-root.module.ts:L34-L95` |
| `core` (47) | connector/adapter, facade impl, store NgRx `asm`, utils | `AsmCoreModule` `core/asm-core.module.ts:L22-L35`; `ASM_FEATURE` `core/store/asm-state.ts:L10-L10` |
| `occ` (7) | `OccAsmAdapter` + endpoint | `AsmOccModule` `occ/asm-occ.module.ts:L14-L24` |
| `components` (40) | main UI, login agente, customer emulation/selection/list, bind/save cart, create customer, session timer | `AsmComponentsModule` `components/asm-components.module.ts:L49-L107` (layout config L97-L104) |
| `assets` (19) | traduzioni | — |
| `styles` (15) | SCSS componenti ASM | — |
| `customer-360/` (127) | vista Customer 360 | `AsmCustomer360Module` `customer-360/asm-customer-360.module.ts:L16-L24` |
| `customer-360/root` (13) | featureModules senza cmsComponents, dep `ASM_FEATURE`; interceptor `SiteContextInterceptor` | `AsmCustomer360RootModule` `customer-360/root/asm-customer-360-root.module.ts:L18-L36` |
| `customer-360/core` (10), `occ` (7), `components` (65), `assets` (20) | connector, OCC, sezioni UI | caricata da `resolveFeature('asmCustomer360')` (`components/asm-main-ui/asm-main-ui.component.ts:L144-L147`) |
| `schematics/` | `addAsmFeatures` | `schematics/add-asm/index.ts:L25-L43` |

**Entry point e public_api** (12): `root:L7-L14`, `core:L7-L15`, `occ:L7-L9`, `components:L7-L22`, `assets:L7-L7`,
`customer-360/public_api.ts:L7-L7`, `customer-360/{root,core,occ,components,assets}` (L7-L10, L7-L10, L7-L9, L7-L11, L7-L7);
radice `public_api.ts:L10-L10` esporta `AsmModule` (`asm.module.ts:L12-L15`).

**Simboli chiave**

| simbolo | file:righe |
|---|---|
| `ASM_FEATURE='asm'` | `feature-libs/asm/root/feature-name.ts:L7-L7` |
| `ASM_CUSTOMER_360_FEATURE='asmCustomer360'`, `ASM_CUSTOMER_360_CORE_FEATURE` | `feature-libs/asm/customer-360/root/feature-name.ts:L7-L8` |
| Facade (feature `ASM_FEATURE`): `AsmBindCartFacade` L12-L21, `AsmCreateCustomerFacade` L14-L23, `AsmCustomerListFacade` L14-L31 | `feature-libs/asm/root/facade/*.facade.ts` |
| `AsmCustomer360Facade` | `feature-libs/asm/customer-360/root/facade/asm-customer-360.facade.ts:L13-L22` |
| `AsmConnector` / `AsmAdapter` | `feature-libs/asm/core/connectors/asm.connector.ts:L23-L23`, `asm.adapter.ts:L18-L18` |
| `AsmCustomer360Connector` / `AsmCustomer360Adapter` | `feature-libs/asm/customer-360/core/connectors/asm-customer-360.connector.ts:L19-L19`, `asm-customer-360.adapter.ts:L13-L13` |
| `OccAsmAdapter`, `OccAsmCustomer360Adapter` | `feature-libs/asm/occ/adapters/occ-asm.adapter.ts:L47-L47`, `feature-libs/asm/customer-360/occ/adapters/occ-asm-customer-360.adapter.ts:L30-L30` |
| Converter: `CUSTOMER_SEARCH_PAGE_NORMALIZER`, `CUSTOMER_LISTS_NORMALIZER` | `feature-libs/asm/core/connectors/converters.ts:L11-L17` |
| Endpoint `defaultOccAsmConfig` (asmCustomerSearch, asmCustomerLists, asmBindCart, asmCreateCustomer, asmSessionEvent) | `feature-libs/asm/occ/adapters/default-occ-asm-config.ts:L9-L22` |
| Endpoint `defaultOccAsmCustomer360Config` (asmCustomer360) | `feature-libs/asm/customer-360/occ/adapters/default-occ-asm-customer-360-config.ts:L9-L18` |

---

## 6. `@spartacus/product` — `feature-libs/product` (197 file)

**peerDependencies** `feature-libs/product/package.json:L28-L38`: Angular (`common,core,router`), devkit,
`@spartacus/{core,schematics,storefront,styles}`, `rxjs` (niente NgRx).

| cartella | tema | note |
|---|---|---|
| `bulk-pricing/` (41) | tabella prezzi a scaglioni | `BulkPricingModule` `bulk-pricing/bulk-pricing.module.ts:L11-L14` |
| `bulk-pricing/root` (3), `core` (6), `occ` (3), `components` (5), `assets` (19) | `core` = model + services (no connector); `occ` = solo config endpoint | `BulkPricingRootModule` `.../root/bulk-pricing-root.module.ts:L24-L30`, `BulkPricingOccModule` `.../occ/bulk-pricing-occ.module.ts:L12-L16` |
| `future-stock/` (53) | disponibilità futura | `FutureStockModule` `future-stock/future-stock.module.ts:L12-L19` |
| `future-stock/root` (5), `core` (11), `occ` (7), `components` (6), `assets` (19) | pattern completo con facade/connector | `FutureStockRootModule` `.../root/future-stock-root.module.ts:L21-L25` |
| `image-zoom/` (48) | zoom immagini prodotto (sostituisce `ProductImagesComponent`) | solo `root` (6), `components` (15), `assets` (19) |
| `variants/` (50) | selettori varianti (color/size/style), guard | `ProductVariantsModule` `variants/product-variants.module.ts:L11-L14` |
| `variants/root` (7) | root + outlet `ProductListOutlets.ITEM_DETAILS` con `ProductVariantStyleIconsComponent` | `ProductVariantsRootModule` `variants/root/product-variants-root.module.ts:L31-L42` |
| `variants/occ` (3), `components` (16), `assets` (19) | `occ` = config endpoint | `ProductVariantsOccModule` `variants/occ/product-variants-occ.module.ts:L12-L16` |
| `schematics/` | `addSpartacusProduct` | `schematics/add-product/index.ts:L25-L43` |

**Entry point e public_api** (22): `bulk-pricing/{root,core,occ,components,assets}` (L7-L8, L7-L8, L7-L7, L7-L8, L7-L7),
`future-stock/{root,core,occ,components,assets}` (L7-L9, L7-L10, L7-L9, L7-L8, L7-L7), `image-zoom/{root,components,assets}` (L7-L9, L7-L8, L7-L7),
`variants/{root,occ,components,assets}` (L7-L11, L7-L7, L7-L16, L7-L7); wrapper `*/public_api.ts:L7-L7`.

**Simboli chiave**

| simbolo | file:righe |
|---|---|
| `PRODUCT_BULK_PRICING_FEATURE`, `PRODUCT_FUTURE_STOCK_FEATURE`(+CORE), `PRODUCT_IMAGE_ZOOM_FEATURE`, `PRODUCT_VARIANTS_FEATURE` | `feature-libs/product/{bulk-pricing,future-stock,image-zoom,variants}/root/feature-name.ts:L7-L8` |
| featureModules: `BulkPricingTableComponent` | `feature-libs/product/bulk-pricing/root/bulk-pricing-root.module.ts:L12-L22` |
| featureModules: `FutureStockComponent` | `feature-libs/product/future-stock/root/future-stock-root.module.ts:L11-L19` |
| featureModules: `ProductImagesComponent` | `feature-libs/product/image-zoom/root/product-image-zoom-root.module.ts:L11-L20` |
| featureModules: `ProductVariantSelectorComponent` | `feature-libs/product/variants/root/product-variants-root.module.ts:L19-L29` |
| `FutureStockFacade` (feature `PRODUCT_FUTURE_STOCK_CORE_FEATURE`) | `feature-libs/product/future-stock/root/facade/future-stock.facade.ts:L20-L24` |
| `FutureStockConnector` / `FutureStockAdapter` / `OccFutureStockAdapter` | `.../future-stock/core/connectors/future-stock.connector.ts:L16-L16`, `future-stock.adapter.ts:L13-L13`, `.../occ/adapters/occ-future-stock.adapter.ts:L28-L28` |
| Converter `FUTURE_STOCK_NORMALIZER`, `FUTURE_STOCK_LIST_NORMALIZER` | `feature-libs/product/future-stock/core/connectors/converters.ts:L14-L20` |
| Endpoint `defaultOccBulkPricingConfig` (product.bulkPrices) | `feature-libs/product/bulk-pricing/occ/config/default-occ-bulk-pricing-config.ts:L9-L20` |
| Endpoint `defaultOccFutureStockConfig` (spread di `futureStockEndpoints`) | `feature-libs/product/future-stock/occ/config/default-occ-future-stock.config.ts:L15-L23` |
| Endpoint `defaultOccProductVariantsConfig` (product.variants) | `feature-libs/product/variants/occ/config/default-occ-product-variants-config.ts:L9-L20` |

Moduli con `cmsComponents: {`: `bulk-pricing-table.module.ts:L20`, `future-stock-accordion.module.ts:L22`,
`product-image-zoom.module.ts:L54`, `product-variants-components.module.ts:L25`.

---

## 7. `@spartacus/tracking` — `feature-libs/tracking` (37 file)

**peerDependencies** `feature-libs/tracking/package.json:L27-L34`: `@angular/{common,core}`, devkit, `@spartacus/{core,schematics}`, `rxjs`.

Nessun `components`/`occ`/`assets`: due sotto-pacchetti indipendenti, configurati via config (non via CMS, salvo personalization).

| cartella | tema | note |
|---|---|---|
| `personalization/` (14) | header di personalizzazione OCC (id/time) + script CMS | `PersonalizationModule` `personalization/personalization.module.ts:L10-L13` |
| `personalization/root` (8) | root module, `PersonalizationConfig`, interceptor `OccPersonalizationIdInterceptor`/`TimeInterceptor` | `PersonalizationRootModule` `personalization/root/personalization-root.module.ts:L30-L37` |
| `personalization/core` (4) | `PersonalizationContextService`, model | `PersonalizationCoreModule` `personalization/core/personalization-core.module.ts:L9-L10` |
| `tms/` (19) | Tag Management System; public_api radice vuoto | — |
| `tms/core` (8) | `BaseTmsModule.forRoot()`, `TmsConfig`, `TmsService` | `tms/core/base-tms.module.ts:L18-L19`; `TmsConfig` `tms/core/config/tms-config.ts:L42-L42` |
| `tms/gtm` (5) | collector Google Tag Manager | `GtmModule` `tms/gtm/gtm.module.ts:L11-L14`; `defaultGoogleTagManagerConfig` `tms/gtm/config/default-gtm.config.ts:L20-L26` |
| `tms/aep` (5) | collector Adobe Experience Platform | `AepModule` `tms/aep/aep.module.ts:L11-L14`; `defaultAdobeExperiencePlatformConfig` `tms/aep/config/default-aep.config.ts:L20-L20` |
| `schematics/` | `addTrackingFeatures` | `schematics/add-tracking/index.ts:L25-L43` |

**Entry point e public_api** (8): `personalization/public_api.ts:L10-L10`, `personalization/{root,core}` (L7-L11, L7-L9),
`tms/public_api.ts:L7-L7` (vuoto), `tms/{core,gtm,aep}` (L7-L13, L7-L8, L7-L8).

**Simboli chiave**: `PERSONALIZATION_FEATURE='personalization'` (`feature-libs/tracking/personalization/root/feature-name.ts:L7-L7`);
featureModules `PersonalizationScriptComponent` (`feature-libs/tracking/personalization/root/personalization-root.module.ts:L18-L28`);
`PersonalizationConfig` (`feature-libs/tracking/personalization/root/config/personalization-config.ts:L14-L14`),
`defaultPersonalizationConfig` (`.../config/default-personalization-config.ts:L9-L9`).
Nessuna facade/connector/adapter/converter.

---

## 8. `@spartacus/smartedit` — `feature-libs/smartedit` (19 file)

**peerDependencies** `feature-libs/smartedit/package.json:L23-L30`: `@angular/{common,core}`, devkit, `@spartacus/{core,schematics}`, `rxjs`.

| cartella | tema | note |
|---|---|---|
| `root` (8) | `SmartEditRootModule`: `APP_INITIALIZER` → `SmartEditLauncherService.load()`, `CmsTicketInterceptor`, `SmartEditConfig` | `feature-libs/smartedit/root/smart-edit-root.module.ts:L13-L34` |
| `core` (6) | `SmartEditService`, decoratori componente/slot | `SmartEditCoreModule` `core/smart-edit-core.module.ts:L11-L14` |
| `assets/` | nessun file `.ts/.scss/.html` (0) | non è un entry point |
| radice | `SmartEditModule` | `smart-edit.module.ts:L10-L13` |
| `schematics/` | `addSmartEditFeatures` | `schematics/add-smartedit/index.ts:L25-L43` |

**Entry point e public_api** (3): radice `public_api.ts:L10-L10`, `root:L7-L11`, `core:L7-L8`.

**Lazy**: nessun `cmsComponents`; il launcher risolve la feature solo se l'app è dentro SmartEdit:
`featureModulesService.resolveFeature(SMART_EDIT_FEATURE)` poi `embedScript('assets/webApplicationInjector.js')`
(`feature-libs/smartedit/root/services/smart-edit-launcher.service.ts:L43-L50`). `SMART_EDIT_FEATURE='smartEdit'`
(`feature-libs/smartedit/root/feature-name.ts:L7-L7`); `SmartEditConfig` (`root/config/smart-edit-config.ts:L14-L14`),
`defaultSmartEditConfig` (`root/config/default-smart-edit-config.ts:L9-L9`).

---

## 9. `@spartacus/qualtrics` — `feature-libs/qualtrics` (19 file)

**peerDependencies** `feature-libs/qualtrics/package.json:L30-L38`: `@angular/{common,core}`, devkit, `@spartacus/{core,schematics,styles}`, `rxjs`.

| cartella | tema | note |
|---|---|---|
| `root` (3) | feature-name + root module | `QualtricsRootModule` `root/qualtrics-root.module.ts:L24-L27` |
| `components` (8) | `QualtricsComponent` + `QualtricsLoaderService`, `QualtricsEmbeddedFeedbackComponent` | `QualtricsComponentsModule` `components/qualtrics-components.module.ts:L14-L35` (`cmsComponents` a L22) |
| `styles` (2) | SCSS | — |
| radice | `QualtricsModule` | `qualtrics.module.ts:L10-L13` |
| `schematics/` | `addQualtricsFeatures` | `schematics/add-qualtrics/index.ts:L25-L43` |

**Entry point e public_api** (3): radice `L11-L11`, `root:L7-L8`, `components:L7-L9`.
**Simboli**: `QUALTRICS_FEATURE='qualtrics'` (`feature-libs/qualtrics/root/feature-name.ts:L7-L7`); featureModules `QualtricsComponent`
(`feature-libs/qualtrics/root/qualtrics-root.module.ts:L12-L22`). Nessun core/occ.

---

## 10. `@spartacus/pdf-invoices` — `feature-libs/pdf-invoices` (56 file)

**peerDependencies** `feature-libs/pdf-invoices/package.json:L28-L38`: `@angular/{common,core,forms}`, devkit,
`@spartacus/{core,schematics,storefront,styles}`, `rxjs`. (È a sua volta peer di `@spartacus/order`.)

| cartella | tema | note |
|---|---|---|
| `root` (7) | root, facade, model | `PDFInvoicesRootModule` `root/pdf-invoices-root.module.ts:L28-L33` |
| `core` (10) | connector/adapter, `PDFInvoicesService`, http-interceptors | `PDFInvoicesCoreModule` `core/pdf-invoices-core.module.ts:L14-L30` |
| `occ` (7) | `OccPDFInvoicesAdapter` + endpoint | `PDFInvoicesOccModule` `occ/pdf-invoices-occ.module.ts:L14-L24` |
| `components` (5) | `InvoicesListComponent` | `PDFInvoicesComponentsModule` `components/pdf-invoices-components.module.ts:L27-L53` (`cmsComponents` a L44) |
| `assets` (19), `styles` (2) | traduzioni, SCSS | — |
| radice | `PDFInvoicesModule` | `pdf-invoices.module.ts:L12-L19` |
| `schematics/` | `addPDFInvoicesFeature` | `schematics/add-pdf-invoices/index.ts:L25-L45` |

**Entry point e public_api** (6): radice `L10-L10`, `root:L7-L10`, `core:L7-L10`, `occ:L7-L9`, `components:L7-L8`, `assets:L7-L7`.

| simbolo | file:righe |
|---|---|
| `PDF_INVOICES_FEATURE='pdfInvoices'`, `PDF_INVOICES_CORE_FEATURE` | `feature-libs/pdf-invoices/root/feature-name.ts:L7-L8` |
| featureModules `AccountOrderDetailsPDFInvoicesComponent` (factory chiamata `defaultRequestedDeliveryDateComponentsConfig`) | `feature-libs/pdf-invoices/root/pdf-invoices-root.module.ts:L14-L26` |
| `PDFInvoicesFacade` (feature `PDF_INVOICES_FEATURE`, non `_CORE_`) | `feature-libs/pdf-invoices/root/facade/pdf-invoices.facade.ts:L24-L28` |
| `PDFInvoicesConnector` / `PDFInvoicesAdapter` | `feature-libs/pdf-invoices/core/connectors/pdf-invoices.connector.ts:L18-L18`, `pdf-invoices.adapter.ts:L13-L13` |
| `OccPDFInvoicesAdapter` | `feature-libs/pdf-invoices/occ/adapters/occ-pdf-invoices.adapter.ts:L27-L27` |
| `PDF_INVOICES_LIST_INVOICES_NORMALIZER` | `feature-libs/pdf-invoices/core/connectors/converters.ts:L11-L11` |
| Endpoint `defaultOccPDFInvoicesConfig` (pdfInvoicesListInvoices, pdfInvoicesDownloadInvoicePDF) | `feature-libs/pdf-invoices/occ/config/default-occ-pdf-invoices-config.ts:L9-L19` |

---

## 11. Riepilogo comparativo

| lib | file | entry point | sotto-feature | pattern root/core/occ/components/assets | lazy via |
|---|---|---|---|---|---|
| cart | 527 | 31 | base, import-export, quick-order, saved-cart, wish-list | completo in base e saved-cart; altre senza occ | `cmsComponents` |
| checkout | 318 | 17 | base, b2b, scheduled-replenishment | completo in base/b2b; s-r senza core/occ | `cmsComponents` (stessa feature `checkout` ridefinita) |
| order | 358 | 12 | (radice), document-flow | completo | `cmsComponents` |
| user | 250 | 17 | account, profile, wishlist | completo in account/profile; wishlist solo core/occ/root | `cmsComponents` |
| asm | 287 | 12 | (radice), customer-360 | completo | `APP_INITIALIZER` + `resolveFeature` |
| product | 197 | 22 | bulk-pricing, future-stock, image-zoom, variants | completo solo future-stock | `cmsComponents` |
| tracking | 37 | 8 | personalization, tms(gtm/aep) | root/core | config (`cmsComponents` solo personalization) |
| smartedit | 19 | 3 | — | root/core | `APP_INITIALIZER` + `resolveFeature` |
| qualtrics | 19 | 3 | — | root/components | `cmsComponents` |
| pdf-invoices | 56 | 6 | — | completo | `cmsComponents` |
