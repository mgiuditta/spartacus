# Appendice A02 - Configurazione (`*Config`)

> Generata da `tools/extract/a02-config.js` allo SHA 5b7a1c2b (`5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`). Non modificare a mano.
>
> Righe di tabella: **519**.
>
> Rigenerazione: `cd docs/spartacus-book/tools/extract && npm install && node a02-config.js`
>
> Per ogni libreria: (1) tabella chiavi di ogni classe/interfaccia il cui nome termina in `Config` (proprietà dichiarate direttamente, non ereditate; tipo dal codice; opzionalità = `?`); (2) tabella delle `const default*Config` con valore letterale troncato a 120 caratteri. Il default è associato a una config quando la radice coincide (es. `CartConfig` ↔ `defaultCartConfig`, confronto case-insensitive su nome senza `default`/`Config`). *public API*: dichiarazione raggiungibile dall'`entryFile` di un `ng-package.json`. Le interfacce `Config` dentro `declare module` sono module augmentation.

## Riepilogo per libreria

| Libreria | Classi/interfacce `*Config` | Chiavi (righe) | `default*Config` |
|---|---:|---:|---:|
| @spartacus/asm | 7 | 10 | 12 |
| @spartacus/assets | 1 | 1 | 0 |
| @spartacus/cart | 8 | 13 | 9 |
| @spartacus/cdc | 2 | 2 | 2 |
| @spartacus/cds | 5 | 16 | 0 |
| @spartacus/checkout | 2 | 2 | 7 |
| @spartacus/core | 58 | 113 | 14 |
| @spartacus/customer-ticketing | 3 | 5 | 4 |
| @spartacus/digital-payments | 2 | 2 | 2 |
| @spartacus/epd-visualization | 7 | 11 | 0 |
| @spartacus/estimated-delivery-date | 0 | 0 | 1 |
| @spartacus/omf | 2 | 2 | 1 |
| @spartacus/opf | 12 | 26 | 22 |
| @spartacus/opps | 2 | 2 | 1 |
| @spartacus/order | 2 | 3 | 9 |
| @spartacus/organization | 2 | 2 | 14 |
| @spartacus/pdf-invoices | 0 | 0 | 1 |
| @spartacus/pickup-in-store | 2 | 2 | 4 |
| @spartacus/product | 0 | 0 | 4 |
| @spartacus/product-configurator | 13 | 19 | 12 |
| @spartacus/product-multi-dimensional | 2 | 2 | 2 |
| @spartacus/punchout | 2 | 2 | 4 |
| @spartacus/qualtrics | 2 | 2 | 1 |
| @spartacus/quote | 7 | 8 | 7 |
| @spartacus/requested-delivery-date | 0 | 0 | 1 |
| @spartacus/s4-service | 3 | 4 | 5 |
| @spartacus/segment-refs | 2 | 2 | 1 |
| @spartacus/setup | 0 | 0 | 1 |
| @spartacus/smartedit | 2 | 2 | 1 |
| @spartacus/storefinder | 2 | 2 | 4 |
| @spartacus/storefront | 44 | 72 | 17 |
| @spartacus/subscription-billing | 2 | 5 | 2 |
| @spartacus/tracking | 7 | 10 | 3 |
| @spartacus/user | 2 | 2 | 7 |
| **Totale** | **207** | **344** | **175** |

## @spartacus/asm

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `AsmConfig` | abstract class; @Injectable; public API | `asm` | `{ agentSessionTimer?: { startingDelayInSeconds?: number; }; customerSearch?: { maxResults?: number; }; customerList?: { pageSize?: number; showAvatar?: boolean…` | sì | `defaultAsmConfig` = `{ asm: { agentSessionTimer: { startingDelayInSeconds: 600, }, customerSearch: { maxResults: 20, }, asmSessionSupport: {…` (`feature-libs/asm/root/config/default-asm-config.ts:L11-L84`) | `feature-libs/asm/root/config/asm-config.ts:L11-L55` |
| `AsmCustomer360Config` | abstract class; @Injectable; public API | `asmCustomer360` | `AsmCustomer360TabsConfig` | sì | `defaultAsmCustomer360Config` = `{ asmCustomer360: { dateFormat: 'MM-dd-yyyy', dateTimeFormat: 'dd-MM-yy hh:mm a', tabs: [ { i18nNameKey: 'asmCustomer36…` (`feature-libs/asm/customer-360/components/config/default-asm-customer-360-config.ts:L21-L142`) | `feature-libs/asm/customer-360/components/config/asm-customer-360-config.ts:L11-L17` |
| `AsmCustomer360SectionConfig` | abstract class; public API | `pageSize` | `number` | sì |  | `feature-libs/asm/customer-360/root/model/asm-customer-360-section-config.ts:L7-L9` |
| `AsmCustomer360TabConfig` | abstract class; public API | `components` | `Array<AsmCustomer360TabComponent>` | no |  | `feature-libs/asm/customer-360/root/model/asm-customer-360-tab-config.ts:L18-L21` |
| 〃 |  | `i18nNameKey` | `string` | no |  |  |
| `AsmCustomer360TabsConfig` | abstract class; public API | `tabs` | `Array<AsmCustomer360TabConfig>` | sì |  | `feature-libs/asm/customer-360/root/model/asm-customer-360-tabs-config.ts:L9-L13` |
| 〃 |  | `dateFormat` | `string` | sì |  |  |
| 〃 |  | `dateTimeFormat` | `string` | sì |  |  |
| `Config` | interface; extends AsmCustomer360Config; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/asm/customer-360/components/config/asm-customer-360-config.ts:L20-L20` |
| `Config` | interface; extends AsmConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/asm/root/config/asm-config.ts:L58-L58` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultAsmConfig` | `AsmConfig` | `{ asm: { agentSessionTimer: { startingDelayInSeconds: 600, }, customerSearch: { maxResults: 20, }, asmSessionSupport: {…` | no | `feature-libs/asm/root/config/default-asm-config.ts:L11-L84` |
| `defaultAsmCreateCustomerFormLayoutConfig` | `LayoutConfig` | `{ launch: { ASM_CREATE_CUSTOMER_FORM: { inlineRoot: true, component: AsmCreateCustomerFormComponent, dialogType: DIALOG…` | no | `feature-libs/asm/components/asm-create-customer-form/default-asm-create-customer-form-layout.config.ts:L10-L18` |
| `defaultAsmCustomer360Config` | `AsmCustomer360Config` | `{ asmCustomer360: { dateFormat: 'MM-dd-yyyy', dateTimeFormat: 'dd-MM-yy hh:mm a', tabs: [ { i18nNameKey: 'asmCustomer36…` | sì | `feature-libs/asm/customer-360/components/config/default-asm-customer-360-config.ts:L21-L142` |
| `defaultAsmCustomer360LayoutConfig` | `LayoutConfig` | `{ launch: { [LAUNCH_CALLER.ASM_CUSTOMER_360]: { inlineRoot: true, component: AsmCustomer360Component, dialogType: DIALO…` | sì | `feature-libs/asm/customer-360/components/default-asm-customer-360-layout.config.ts:L14-L22` |
| `defaultAsmLayoutConfig` | `LayoutConfig` | `{ launch: { ASM: { outlet: 'cx-storefront', component: AsmMainUiComponent, }, }, }` | no | `feature-libs/asm/components/default-asm-layout.config.ts:L10-L17` |
| `defaultAsmPaginationConfig` | `PaginationConfig` | `{ pagination: { rangeCount: 2, addPrevious: true, addNext: true, addStart: false, addEnd: false, addFirst: true, addLas…` | no | `feature-libs/asm/components/default-asm-pagination.config.ts:L9-L22` |
| `defaultBindCartLayoutConfig` | `LayoutConfig` | `{ launch: { [LAUNCH_CALLER.ASM_BIND_CART]: { inlineRoot: true, component: AsmBindCartDialogComponent, dialogType: DIALO…` | no | `feature-libs/asm/components/default-bind-cart-layout.config.ts:L14-L22` |
| `defaultCustomerListLayoutConfig` | `LayoutConfig` | `{ launch: { ASM_CUSTOMER_LIST: { inlineRoot: true, component: CustomerListComponent, dialogType: DIALOG_TYPE.DIALOG, },…` | no | `feature-libs/asm/components/customer-list/default-customer-list-layout.config.ts:L10-L18` |
| `defaultOccAsmConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { asmCustomerSearch: '/assistedservicewebservices/customers/search', asmCustomerLists: '…` | no | `feature-libs/asm/occ/adapters/default-occ-asm-config.ts:L9-L22` |
| `defaultOccAsmCustomer360Config` | `OccConfig` | `{ backend: { occ: { endpoints: { asmCustomer360: '/assistedservicewebservices/${baseSiteId}/users/${userId}/customer360…` | no | `feature-libs/asm/customer-360/occ/adapters/default-occ-asm-customer-360-config.ts:L9-L18` |
| `defaultSaveCartLayoutConfig` | `LayoutConfig` | `{ launch: { [LAUNCH_CALLER.ASM_SAVE_CART]: { inlineRoot: true, component: AsmSaveCartDialogComponent, dialogType: DIALO…` | no | `feature-libs/asm/components/default-save-cart-layout.config.ts:L14-L22` |
| `defaultSwitchCustomerLayoutConfig` | `LayoutConfig` | `{ launch: { [LAUNCH_CALLER.ASM_SWITCH_CUSTOMER]: { inlineRoot: true, component: AsmSwitchCustomerDialogComponent, dialo…` | no | `feature-libs/asm/components/default-switch-customer-layout.config.ts:L14-L22` |

## @spartacus/assets

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `TranslationChunksConfig` | interface; public API | `[chunk: string]` | `string[]` | - |  | `core-libs/assets/src/translations/translation-chunks-config.ts:L7-L9` |

## @spartacus/cart

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `CartConfig` | abstract class; @Injectable; public API | `cart` | `{ selectiveCart?: { enabled?: boolean; }; validation?: { enabled?: boolean; }; showRealTimeStockInPDP?: { enabled?: boolean; }; }` | sì | `defaultCartConfig` = `{ cart: { validation: { enabled: false, }, selectiveCart: { enabled: false, }, showRealTimeStockInPDP: { enabled: false…` (`feature-libs/cart/base/root/config/default-cart-config.ts:L9-L21`) | `feature-libs/cart/base/root/config/cart-config.ts:L12-L28` |
| `Config` | interface; extends CartConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/cart/base/root/config/cart-config.ts:L31-L31` |
| `Config` | interface; extends ImportExportConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/cart/import-export/core/config/import-export-config.ts:L25-L25` |
| `Config` | interface; extends QuickOrderConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/cart/quick-order/root/config/quick-order-config.ts:L28-L28` |
| `ExportConfig` | interface; public API | `additionalColumns` | `ExportColumn[]` | sì |  | `feature-libs/cart/import-export/core/model/export-entries.model.ts:L23-L49` |
| 〃 |  | `messageEnabled` | `boolean` | sì |  |  |
| 〃 |  | `downloadDelay` | `number` | sì |  |  |
| 〃 |  | `fileOptions` | `ExportFileOptions` | no |  |  |
| 〃 |  | `maxEntries` | `number` | sì |  |  |
| `ImportConfig` | interface; public API | `fileValidity` | `FileValidity` | sì |  | `feature-libs/cart/import-export/core/model/import-entries.config.ts:L69-L72` |
| 〃 |  | `cartNameGeneration` | `CartNameGeneration` | sì |  |  |
| `ImportExportConfig` | abstract class; @Injectable; public API | `cartImportExport` | `{ file: { separator: string }; import?: ImportConfig; export: ExportConfig; }` | sì | `defaultImportExportConfig` = `{ cartImportExport: { file: { separator: ',', }, import: { fileValidity: { maxSize: 1, maxEntries: { [OrderEntriesSourc…` (`feature-libs/cart/import-export/core/config/default-import-export-config.ts:L11-L61`) | `feature-libs/cart/import-export/core/config/import-export-config.ts:L12-L22` |
| `QuickOrderConfig` | abstract class; @Injectable; public API | `quickOrder` | `{ searchForm?: { displayProductImages: boolean; maxProducts: number; minCharactersBeforeRequest: number; }; list?: { hardDeleteTimeout: number; }; }` | sì | `defaultQuickOrderConfig` = `{ quickOrder: { searchForm: { displayProductImages: true, maxProducts: 5, minCharactersBeforeRequest: 3, }, list: { har…` (`feature-libs/cart/quick-order/root/config/default-quick-order.config.ts:L9-L20`) | `feature-libs/cart/quick-order/root/config/quick-order-config.ts:L10-L25` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultAddedToCartLayoutConfig` | `LayoutConfig` | `{ launch: { ADDED_TO_CART: { inlineRoot: true, component: AddedToCartDialogComponent, dialogType: DIALOG_TYPE.DIALOG, }…` | no | `feature-libs/cart/base/components/added-to-cart-dialog/default-added-to-cart-layout.config.ts:L10-L18` |
| `defaultCartConfig` | `CartConfig` | `{ cart: { validation: { enabled: false, }, selectiveCart: { enabled: false, }, showRealTimeStockInPDP: { enabled: false…` | no | `feature-libs/cart/base/root/config/default-cart-config.ts:L9-L21` |
| `defaultCartRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { cart: { paths: ['cart'] }, }, }, }` | no | `feature-libs/cart/base/root/config/default-cart-routing-config.ts:L9-L15` |
| `defaultClearCartLayoutConfig` | `LayoutConfig` | `{ launch: { CLEAR_CART: { inline: true, component: ClearCartDialogComponent, dialogType: DIALOG_TYPE.DIALOG, }, }, }` | sì | `feature-libs/cart/base/components/clear-cart/clear-cart-dialog/default-clear-cart-layout.config.ts:L10-L18` |
| `defaultImportEntriesLayoutConfig` | `LayoutConfig` | `{ launch: { IMPORT_TO_CART: { inlineRoot: true, component: ImportEntriesDialogComponent, dialogType: DIALOG_TYPE.DIALOG…` | no | `feature-libs/cart/import-export/components/import-to-cart/default-import-entries-layout.config.ts:L10-L18` |
| `defaultImportExportConfig` | `ImportExportConfig` | `{ cartImportExport: { file: { separator: ',', }, import: { fileValidity: { maxSize: 1, maxEntries: { [OrderEntriesSourc…` | sì | `feature-libs/cart/import-export/core/config/default-import-export-config.ts:L11-L61` |
| `defaultQuickOrderConfig` | `QuickOrderConfig` | `{ quickOrder: { searchForm: { displayProductImages: true, maxProducts: 5, minCharactersBeforeRequest: 3, }, list: { har…` | sì | `feature-libs/cart/quick-order/root/config/default-quick-order.config.ts:L9-L20` |
| `defaultQuickOrderRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { quickOrder: { paths: ['my-account/quick-order'], }, }, }, }` | sì | `feature-libs/cart/quick-order/root/quick-order-root.module.ts:L36-L44` |
| `defaultSavedCartFormLayoutConfig` | `LayoutConfig` | `{ launch: { SAVED_CART: { inline: true, component: SavedCartFormDialogComponent, dialogType: DIALOG_TYPE.DIALOG, }, }, }` | sì | `feature-libs/cart/saved-cart/components/saved-cart-form-dialog/default-saved-cart-form-layout.config.ts:L10-L18` |

## @spartacus/cdc

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `CdcConfig` | abstract class; @Injectable; public API | `cdc` | `{ baseSite: string; javascriptUrl: string; sessionExpiration: number; }[]` | sì |  | `integration-libs/cdc/root/config/cdc-config.ts:L10-L20` |
| `Config` | interface; extends CdcConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/cdc/root/config/cdc-config.ts:L23-L23` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultCdcReconsentLayoutConfig` | `LayoutConfig` | `{ launch: { CDC_RECONSENT: { inlineRoot: true, component: CdcReconsentComponent, dialogType: DIALOG_TYPE.DIALOG, }, }, }` | sì | `integration-libs/cdc/user-account/login-form/reconsent/default-cdc-reconsent-layout.config.ts:L10-L18` |
| `defaultCdcRoutingConfig` | `RoutingConfig` | `{ routing: { routes: cdcRoutesConfig, }, }` | no | `integration-libs/cdc/root/config/default-cdc-routing-config.ts:L37-L41` |

## @spartacus/cds

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `CdsConfig` | abstract class; @Injectable; public API | `cds` | `{ baseSite?: string[]; tenant?: string; baseUrl?: string; consentTemplateId?: string; endpoints?: CdsEndpoints; merchandising?: MerchandisingConfig; profileTag…` | sì |  | `integration-libs/cds/src/config/cds-config.ts:L13-L27` |
| `Config` | interface; extends CdsConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/cds/src/config/cds-config.ts:L30-L30` |
| `MerchandisingConfig` | interface; public API | `defaultCarouselViewportThreshold` | `number` | sì |  | `integration-libs/cds/src/config/merchandising.config.ts:L7-L9` |
| `ProfileTagConfig` | interface; public API | `javascriptUrl` | `string` | sì |  | `integration-libs/cds/src/config/profile-tag.config.ts:L7-L14` |
| 〃 |  | `configUrl` | `string` | sì |  |  |
| 〃 |  | `cdsSiteId` | `string` | sì |  |  |
| 〃 |  | `allowInsecureCookies` | `boolean` | sì |  |  |
| 〃 |  | `gtmId` | `string` | sì |  |  |
| 〃 |  | `sciEnabled` | `boolean` | sì |  |  |
| `ProfileTagJsConfig` | interface; public API | `tenant` | `string` | sì |  | `integration-libs/cds/src/profiletag/model/profile-tag.model.ts:L28-L36` |
| 〃 |  | `siteId` | `string` | sì |  |  |
| 〃 |  | `spa` | `boolean` | no |  |  |
| 〃 |  | `javascriptUrl` | `string` | sì |  |  |
| 〃 |  | `configUrl` | `string` | sì |  |  |
| 〃 |  | `allowInsecureCookies` | `boolean` | sì |  |  |
| 〃 |  | `gtmId` | `string` | sì |  |  |

## @spartacus/checkout

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `CheckoutConfig` | abstract class; @Injectable; public API | `checkout` | `{ /** * Set checkout steps as ordered array of pages. */ steps?: Array<CheckoutStep>; /** * Allow for express checkout when default shipping method and payment…` | sì | `defaultCheckoutConfig` = `{ checkout: { steps: [ { id: 'deliveryAddress', name: 'checkoutProgress.deliveryAddress', routeName: 'checkoutDeliveryA…` (`feature-libs/checkout/base/root/config/default-checkout-config.ts:L10-L42`) | `feature-libs/checkout/base/root/config/checkout-config.ts:L18-L51` |
| `Config` | interface; extends CheckoutConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/checkout/base/root/config/checkout-config.ts:L54-L54` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultB2BCheckoutConfig` | `CheckoutConfig` | `{ checkout: { steps: [ { id: 'paymentType', name: 'checkoutB2B.progress.methodOfPayment', routeName: 'checkoutPaymentTy…` | sì | `feature-libs/checkout/b2b/root/config/default-b2b-checkout-config.ts:L13-L51` |
| `defaultCheckoutB2BRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { checkoutPaymentType: { paths: ['checkout/payment-type'] }, }, }, }` | sì | `feature-libs/checkout/b2b/root/config/default-checkout-b2b-routing-config.ts:L9-L15` |
| `defaultCheckoutConfig` | `CheckoutConfig` | `{ checkout: { steps: [ { id: 'deliveryAddress', name: 'checkoutProgress.deliveryAddress', routeName: 'checkoutDeliveryA…` | no | `feature-libs/checkout/base/root/config/default-checkout-config.ts:L10-L42` |
| `defaultCheckoutRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { checkoutLogin: { paths: ['checkout-login'], authFlow: true }, checkout: { paths: ['checkout'] },…` | no | `feature-libs/checkout/base/root/config/default-checkout-routing-config.ts:L9-L20` |
| `defaultOccCheckoutB2BConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...defaultB2bCheckoutDetailsOccEndpoint, setDeliveryAddress: 'orgUsers/${userId}/carts…` | no | `feature-libs/checkout/b2b/occ/config/default-occ-checkout-b2b-config.ts:L16-L29` |
| `defaultOccCheckoutConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { setDeliveryAddress: DELIVERY_ENDPOINT, cardTypes: 'cardtypes', createDeliveryAddress: …` | no | `feature-libs/checkout/base/occ/config/default-occ-checkout-config.ts:L12-L35` |
| `defaultPlaceOrderSpinnerLayoutConfig` | `LayoutConfig` | `{ launch: { PLACE_ORDER_SPINNER: { inline: true, component: SpinnerComponent, dialogType: DIALOG_TYPE.POPOVER_CENTER_BA…` | no | `feature-libs/checkout/base/components/checkout-place-order/default-place-order-spinner-layout.config.ts:L13-L21` |

## @spartacus/core

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `AnonymousConsentsConfig` | abstract class; @Injectable; extends OccConfig; public API | `anonymousConsents` | `{ /** * Specify the consent template ID to be show on the registration page. */ registerConsent?: string; /** * Show the legal description at the top of the an…` | sì | `defaultAnonymousConsentsConfig` = `{ anonymousConsents: { registerConsent: 'MARKETING_NEWSLETTER', showLegalDescriptionInDialog: true, requiredConsents: […` (`core-libs/core/src/anonymous-consents/config/default-anonymous-consents-config.ts:L9-L19`) | `core-libs/core/src/anonymous-consents/config/anonymous-consents-config.ts:L11-L43` |
| `AuthConfig` | abstract class; @Injectable; public API | `authentication` | `{ /** * OAuth client id. */ client_id?: string; /** * Secret for client required by Hybris OAuth. */ client_secret?: string; /** * Base url for auth server (fo…` | sì | `defaultAuthConfig` = `{ authentication: { client_id: 'mobile_android_public', tokenEndpoint: '/oauth/token', revokeEndpoint: '/oauth/revoke',…` (`core-libs/core/src/auth/user-auth/config/default-auth-config.ts:L48-L74`) | `core-libs/core/src/auth/user-auth/config/auth-config.ts:L32-L143` |
| `BackendConfig` | interface; extends BackendHttpTimeoutConfig; declare module '../../occ/config/occ-config'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/http/http-timeout/http-timeout.config.ts:L40-L40` |
| `BackendConfig` | interface; public API | `occ` | `{ baseUrl?: string; prefix?: string; /** * Indicates whether or not cross-site Access-Control requests should be made * using credentials such as cookies, auth…` | sì |  | `core-libs/core/src/occ/config/occ-config.ts:L13-L40` |
| 〃 |  | `media` | `{ /** * Media URLs are typically relative, so that the host can be configured. * Configurable media baseURLs are useful for SEO, multi-site, * switching enviro…` | sì |  |  |
| 〃 |  | `loadingScopes` | `LoadingScopes` | sì |  |  |
| `BackendHttpTimeoutConfig` | abstract class; public API | `timeout` | `HttpTimeoutConfig` | sì | `defaultBackendHttpTimeoutConfig` = `{ backend: { timeout: { server: 20_000, }, }, }` (`core-libs/core/src/http/http-timeout/default-http-timeout.config.ts:L9-L15`) | `core-libs/core/src/http/http-timeout/http-timeout.config.ts:L35-L37` |
| `CaptchaConfig` | interface; public API | `enabled` | `boolean` | no |  | `core-libs/core/src/model/misc.model.ts:L135-L138` |
| 〃 |  | `publicKey` | `string` | sì |  |  |
| `CmsComponentChildRoutesConfig` | interface; public API | `parent` | `Pick<Route, 'data'>` | sì |  | `core-libs/core/src/cms/config/cms-config.ts:L48-L58` |
| 〃 |  | `children` | `Route[]` | sì |  |  |
| `CMSComponentConfig` | interface; extends StandardCmsComponentConfig, JspIncludeCmsComponentConfig; public API | `[componentType: string]` | `CmsComponentMapping \| undefined` | - |  | `core-libs/core/src/cms/config/cms-config.ts:L103-L107` |
| `CmsConfig` | abstract class; @Injectable; extends OccConfig; public API | `featureModules` | `{ [featureName: string]: FeatureModuleConfig \| string }` | sì |  | `core-libs/core/src/cms/config/cms-config.ts:L124-L134` |
| 〃 |  | `cmsComponents` | `CMSComponentConfig` | sì |  |  |
| 〃 |  | `componentsLoading` | `{ pageSize?: number; }` | sì |  |  |
| `CmsPageConfig` | interface; public API | `ignoreBackend` | `boolean` | sì |  | `core-libs/core/src/cms/config/cms-structure.config.ts:L19-L49` |
| 〃 |  | `pageId` | `string` | sì |  |  |
| 〃 |  | `type` | `string` | sì |  |  |
| 〃 |  | `title` | `string` | sì |  |  |
| 〃 |  | `template` | `string` | sì |  |  |
| 〃 |  | `slots` | `{ [key: string]: CmsPageSlotConfig }` | no |  |  |
| `CmsPageSlotConfig` | interface; public API | `componentIds` | `string[]` | sì |  | `core-libs/core/src/cms/config/cms-structure.config.ts:L63-L66` |
| 〃 |  | `properties` | `any` | sì |  |  |
| `CmsPageSlotsConfig` | interface; public API | `[key: string]` | `CmsPageSlotConfig` | - |  | `core-libs/core/src/cms/config/cms-structure.config.ts:L54-L56` |
| `CmsStructureConfig` | abstract class; @Injectable; extends CmsConfig; public API | `cmsStructure` | `{ components?: { [key: string]: ContentSlotComponentData \| any }; pages?: CmsPageConfig[]; slots?: CmsPageSlotsConfig; }` | sì |  | `core-libs/core/src/cms/config/cms-structure.config.ts:L75-L85` |
| `Config` | interface; extends AnonymousConsentsConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/anonymous-consents/config/anonymous-consents-config.ts:L46-L46` |
| `Config` | interface; extends AuthConfig; declare module '../../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/auth/user-auth/config/auth-config.ts:L146-L146` |
| `Config` | interface; extends CmsConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/cms/config/cms-config.ts:L137-L137` |
| `Config` | interface; extends CmsStructureConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/cms/config/cms-structure.config.ts:L88-L88` |
| `Config` | interface; extends PageMetaConfig; declare module '../../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/cms/page/config/page-meta.config.ts:L19-L19` |
| `Config` | abstract class; @Injectable; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/config/config-tokens.ts:L17-L21` |
| `Config` | interface; extends FeaturesConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/features-config/config/features-config.ts:L121-L121` |
| `Config` | interface; extends FederatedLoginConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/federated-login/config/federated-login-config.ts:L50-L50` |
| `Config` | interface; extends GlobalMessageConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/global-message/config/global-message-config.ts:L30-L30` |
| `Config` | interface; extends I18nConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/i18n/config/i18n-config.ts:L95-L95` |
| `Config` | interface; extends OccConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/occ/config/occ-config.ts:L51-L51` |
| `Config` | interface; extends RoutingConfig; declare module '../../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/routing/configurable-routes/config/routing-config.ts:L48-L48` |
| `Config` | interface; extends SiteContextConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/site-context/config/site-context-config.ts:L22-L22` |
| `Config` | interface; extends SiteThemeConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/site-theme/config/site-theme-config.ts:L22-L22` |
| `Config` | interface; extends StateConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/state/config/state-config.ts:L38-L38` |
| `Config` | interface; extends HierarchicalAddressConfig; declare module '../../config/config-tokens'; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/core/src/user/config/hierarchical-address-config.ts:L26-L26` |
| `ExternalRoutesConfig` | abstract class; @Injectable; public API | `routing` | `ExternalRoutesConfigDefinition` | sì |  | `core-libs/core/src/routing/external-routes/external-routes-config.ts:L14-L20` |
| `FeatureModuleConfig` | interface; public API | `module` | `() => Promise<any>` | sì |  | `core-libs/core/src/cms/config/cms-config.ts:L109-L122` |
| 〃 |  | `dependencies` | `((() => Promise<any>) \| string)[]` | sì |  |  |
| 〃 |  | `cmsComponents` | `string[]` | sì |  |  |
| `FeaturesConfig` | abstract class; @Injectable; public API | `features` | `{ /** * Configure feature level. * Value corresponds to a specific release version number: '1.0', '1.1', etc. * Each subsequent level contains all of the featu…` | sì |  | `core-libs/core/src/features-config/config/features-config.ts:L27-L118` |
| `FederatedLoginConfig` | abstract class; @Injectable; public API | `federatedLogin` | `{ enabled?: boolean; /** URL parameter name to use when passing context from an originating domain to a login domain. */ contextParameterName?: string; /** * L…` | sì |  | `core-libs/core/src/federated-login/config/federated-login-config.ts:L10-L47` |
| `GlobalMessageConfig` | abstract class; @Injectable; public API | `globalMessages` | `{ [GlobalMessageType.MSG_TYPE_CONFIRMATION]?: GlobalMessageTypeConfig; [GlobalMessageType.MSG_TYPE_INFO]?: GlobalMessageTypeConfig; [GlobalMessageType.MSG_TYPE…` | sì | `defaultGlobalMessageConfig` = `{ globalMessages: { [GlobalMessageType.MSG_TYPE_CONFIRMATION]: { timeout: 3000, }, [GlobalMessageType.MSG_TYPE_INFO]: {…` (`core-libs/core/src/global-message/config/default-global-message-config.ts:L10-L28`) | `core-libs/core/src/global-message/config/global-message-config.ts:L15-L27` |
| `HierarchicalAddressConfig` | abstract class; @Injectable; public API | `hierarchicalAddress` | `{ /** * Country isocodes whose addresses use a hierarchical (multi-level) * format: country → region → city → district. For these countries the * address form …` | sì | `defaultHierarchicalAddressConfig` = `{ hierarchicalAddress: { countriesUsingHierarchicalAddressFormat: ['CN'], }, }` (`core-libs/core/src/user/config/default-hierarchical-address-config.ts:L9-L13`) | `core-libs/core/src/user/config/hierarchical-address-config.ts:L10-L23` |
| `HttpTimeoutConfig` | interface; public API | `server` | `number` | sì |  | `core-libs/core/src/http/http-timeout/http-timeout.config.ts:L23-L33` |
| 〃 |  | `browser` | `number` | sì |  |  |
| `I18nConfig` | abstract class; @Injectable; public API | `i18n` | `{ /** * When there are missing translation resources for the active language, the fallback language will be used. */ fallbackLang?: string \| false; /** * Confi…` | sì | `defaultI18nConfig` = `{ i18n: { fallbackLang: undefined, debug: false, }, }` (`core-libs/core/src/i18n/config/default-i18n-config.ts:L9-L14`) | `core-libs/core/src/i18n/config/i18n-config.ts:L14-L92` |
| `JspIncludeCmsComponentConfig` | interface; public API | `AccountAddressBookComponent` | `CmsComponentMapping` | sì |  | `core-libs/core/src/cms/config/cms-config.ts:L33-L40` |
| 〃 |  | `ForgotPasswordComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `ResetPasswordComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `ProductDetailsTabComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `ProductSpecsTabComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `ProductReviewsTabComponent` | `CmsComponentMapping` | sì |  |  |
| `LoadingScopeConfig` | interface | `include` | `string[]` | sì |  | `core-libs/core/src/occ/config/loading-scopes-config.ts:L10-L23` |
| 〃 |  | `maxAge` | `number` | sì |  |  |
| 〃 |  | `reloadOn` | `Type<CxEvent>[]` | sì |  |  |
| `LoadingScopesConfig` | interface | `[scope: string]` | `LoadingScopeConfig \| undefined` | - |  | `core-libs/core/src/occ/config/loading-scopes-config.ts:L25-L27` |
| `OccConfig` | abstract class; @Injectable; extends SiteContextConfig; public API | `backend` | `BackendConfig` | sì | `defaultOccConfig` = `{ backend: { occ: { prefix: '/occ/v2/', }, }, }` (`core-libs/core/src/occ/config/default-occ-config.ts:L9-L15`) | `core-libs/core/src/occ/config/occ-config.ts:L42-L48` |
| `PageMetaConfig` | abstract class; @Injectable; public API | `pageMeta` | `PageMetaResolversConfig` | sì | `defaultPageMetaConfig` = `{ pageMeta: { resolvers: [ { property: 'title', method: 'resolveTitle', }, { property: 'heading', method: 'resolveHeadi…` (`core-libs/core/src/cms/page/config/default-page-meta.config.ts:L9-L48`) | `core-libs/core/src/cms/page/config/page-meta.config.ts:L10-L16` |
| `PageMetaResolverConfig` | interface; public API | `property` | `string` | no |  | `core-libs/core/src/cms/page/config/page-meta.config.ts:L31-L41` |
| 〃 |  | `method` | `string` | no |  |  |
| `PageMetaResolversConfig` | interface; public API | `resolvers` | `PageMetaResolverConfig[]` | sì |  | `core-libs/core/src/cms/page/config/page-meta.config.ts:L22-L29` |
| 〃 |  | `canonicalUrl` | `CanonicalUrlOptions` | sì |  |  |
| `ProductLoadingScopeConfig` | interface; extends LoadingScopeConfig | `include` | `(ProductScope \| string)[]` | sì |  | `core-libs/core/src/occ/adapters/product/product-occ-config.ts:L28-L30` |
| `ProductScopesConfig` | interface; extends LoadingScopesConfig | `list` | `ProductLoadingScopeConfig` | sì |  | `core-libs/core/src/occ/adapters/product/product-occ-config.ts:L20-L26` |
| 〃 |  | `details` | `ProductLoadingScopeConfig` | sì |  |  |
| 〃 |  | `attributes` | `ProductLoadingScopeConfig` | sì |  |  |
| 〃 |  | `variants` | `ProductLoadingScopeConfig` | sì |  |  |
| 〃 |  | `[scope: string]` | `ProductLoadingScopeConfig \| undefined` | - |  |  |
| `RouteBreadcrumbConfig` | interface; public API | `raw` | `string` | sì |  | `core-libs/core/src/cms/page/routing/route-page-meta.model.ts:L45-L55` |
| 〃 |  | `i18n` | `string` | sì |  |  |
| `RouteConfig` | interface; public API | `paths` | `string[]` | sì |  | `core-libs/core/src/routing/configurable-routes/routes-config.ts:L15-L57` |
| 〃 |  | `matchers` | `(UrlMatcher \| InjectionToken<UrlMatcherFactory>)[]` | sì |  |  |
| 〃 |  | `paramsMapping` | `ParamsMapping` | sì |  |  |
| 〃 |  | `disabled` | `boolean` | sì |  |  |
| 〃 |  | `protected` | `boolean` | sì |  |  |
| 〃 |  | `authFlow` | `boolean` | sì |  |  |
| `RoutePageMetaConfig` | interface; public API | `breadcrumb` | `string \| RouteBreadcrumbConfig` | sì |  | `core-libs/core/src/cms/page/routing/route-page-meta.model.ts:L30-L40` |
| 〃 |  | `resolver` | `Type<any>` | sì |  |  |
| `RoutesConfig` | interface; public API | `[routeName: string]` | `RouteConfig` | - |  | `core-libs/core/src/routing/configurable-routes/routes-config.ts:L11-L13` |
| `RoutingConfig` | abstract class; @Injectable; public API | `routing` | `RoutingConfigDefinition` | sì |  | `core-libs/core/src/routing/configurable-routes/config/routing-config.ts:L22-L28` |
| `SearchConfig` | interface; public API | `pageSize` | `number` | sì |  | `core-libs/core/src/product/model/search-config.ts:L8-L24` |
| 〃 |  | `currentPage` | `number` | sì |  |  |
| 〃 |  | `sort` | `string` | sì |  |  |
| 〃 |  | `filters` | `string` | sì |  |  |
| 〃 |  | `query` | `string` | sì |  |  |
| `SiteContextConfig` | abstract class; @Injectable; public API | `context` | `{ urlParameters?: string[]; [contextName: string]: string[] \| undefined; }` | sì |  | `core-libs/core/src/site-context/config/site-context-config.ts:L10-L19` |
| `SiteThemeConfig` | abstract class; @Injectable; public API | `siteTheme` | `{ optionalThemes?: Array<SiteTheme>; }` | sì | `defaultSiteThemeConfig` = `{ siteTheme: { optionalThemes: [ { i18nNameKey: 'siteThemeSwitcher.themes.highContrastDark', className: 'cx-theme-high-…` (`core-libs/core/src/site-theme/config/default-site-theme-config.ts:L9-L22`) | `core-libs/core/src/site-theme/config/site-theme-config.ts:L11-L19` |
| `StandardCmsComponentConfig` | interface; public API | `CMSSiteContextComponent` | `CmsComponentMapping` | sì |  | `core-libs/core/src/cms/config/cms-config.ts:L13-L31` |
| 〃 |  | `CMSLinkComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `SimpleResponsiveBannerComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `SimpleBannerComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `BannerComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `CMSParagraphComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `BreadcrumbComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `NavigationComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `FooterNavigationComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `CategoryNavigationComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `ProductAddToCartComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `MiniCartComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `ProductCarouselComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `SearchBoxComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `ProductReferencesComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `CMSTabParagraphComponent` | `CmsComponentMapping` | sì |  |  |
| 〃 |  | `LoginComponent` | `CmsComponentMapping` | sì |  |  |
| `StateConfig` | abstract class; @Injectable; public API | `state` | `{ ssrTransfer?: { keys?: { /** * A set of state keys that should be transferred from server. */ [key: string]: StateTransferType \| undefined; }; }; }` | sì |  | `core-libs/core/src/state/config/state-config.ts:L20-L35` |
| `TestConfig` | interface; extends Config; public API | `features` | `Config['features'] & FeatureTogglesInterface` | sì |  | `core-libs/core/src/config/test-config.module.ts:L27-L29` |
| `TranslationChunksConfig` | interface; public API | `[chunk: string]` | `string[]` | - |  | `core-libs/core/src/i18n/translation-resources.ts:L16-L18` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultAnonymousConsentsConfig` | `AnonymousConsentsConfig` | `{ anonymousConsents: { registerConsent: 'MARKETING_NEWSLETTER', showLegalDescriptionInDialog: true, requiredConsents: […` | sì | `core-libs/core/src/anonymous-consents/config/default-anonymous-consents-config.ts:L9-L19` |
| `defaultAuthConfig` | `AuthConfig` | `{ authentication: { client_id: 'mobile_android_public', tokenEndpoint: '/oauth/token', revokeEndpoint: '/oauth/revoke',…` | no | `core-libs/core/src/auth/user-auth/config/default-auth-config.ts:L48-L74` |
| `defaultBackendHttpTimeoutConfig` | `OccConfig` | `{ backend: { timeout: { server: 20_000, }, }, }` | sì | `core-libs/core/src/http/http-timeout/default-http-timeout.config.ts:L9-L15` |
| `defaultCmsModuleConfig` | `CmsConfig` | `{ backend: { occ: { endpoints: { component: 'users/${userId}/cms/components/${id}', components: 'users/${userId}/cms/co…` | sì | `core-libs/core/src/cms/config/default-cms-config.ts:L9-L24` |
| `defaultGlobalMessageConfig` | `GlobalMessageConfig` | `{ globalMessages: { [GlobalMessageType.MSG_TYPE_CONFIRMATION]: { timeout: 3000, }, [GlobalMessageType.MSG_TYPE_INFO]: {…` | no | `core-libs/core/src/global-message/config/default-global-message-config.ts:L10-L28` |
| `defaultHierarchicalAddressConfig` | `HierarchicalAddressConfig` | `{ hierarchicalAddress: { countriesUsingHierarchicalAddressFormat: ['CN'], }, }` | sì | `core-libs/core/src/user/config/default-hierarchical-address-config.ts:L9-L13` |
| `defaultI18nConfig` | `I18nConfig` | `{ i18n: { fallbackLang: undefined, debug: false, }, }` | no | `core-libs/core/src/i18n/config/default-i18n-config.ts:L9-L14` |
| `defaultOccConfig` | `OccConfig` | `{ backend: { occ: { prefix: '/occ/v2/', }, }, }` | sì | `core-libs/core/src/occ/config/default-occ-config.ts:L9-L15` |
| `defaultOccCostCentersConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { getActiveCostCenters: '/costcenters?fields=DEFAULT,unit(BASIC,addresses(DEFAULT))', },…` | no | `core-libs/core/src/occ/adapters/cost-center/default-occ-cost-centers-config.ts:L9-L18` |
| `defaultOccProductConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { product: { default: 'products/${productCode}?fields=DEFAULT,averageRating,images(FULL)…` | no | `core-libs/core/src/occ/adapters/product/default-occ-product-config.ts:L10-L60` |
| `defaultOccSiteContextConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { languages: 'languages', currencies: 'currencies', countries: 'countries', regions: 'co…` | no | `core-libs/core/src/occ/adapters/site-context/default-occ-site-context-config.ts:L9-L25` |
| `defaultOccUserConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { paymentDetailsAll: 'users/${userId}/paymentdetails', paymentDetail: 'users/${userId}/p…` | no | `core-libs/core/src/occ/adapters/user/default-occ-user-config.ts:L9-L34` |
| `defaultPageMetaConfig` | `PageMetaConfig` | `{ pageMeta: { resolvers: [ { property: 'title', method: 'resolveTitle', }, { property: 'heading', method: 'resolveHeadi…` | sì | `core-libs/core/src/cms/page/config/default-page-meta.config.ts:L9-L48` |
| `defaultSiteThemeConfig` | `SiteThemeConfig` | `{ siteTheme: { optionalThemes: [ { i18nNameKey: 'siteThemeSwitcher.themes.highContrastDark', className: 'cx-theme-high-…` | sì | `core-libs/core/src/site-theme/config/default-site-theme-config.ts:L9-L22` |

## @spartacus/customer-ticketing

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends CustomerTicketingConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/customer-ticketing/root/config/customer-ticketing-config.ts:L30-L30` |
| `CustomerTicketingConfig` | abstract class; @Injectable; public API | `customerTicketing` | `{ agentSessionTimer?: { startingDelayInSeconds?: number; }; attachmentRestrictions?: { maxSize?: number; allowedTypes?: string[]; }; inputCharactersLimit?: num…` | sì | `defaultCustomerTicketingConfig` = `{ customerTicketing: { attachmentRestrictions: { maxSize: MAX_SIZE_FOR_ATTACHMENT, allowedTypes: [ '.pdf', '.txt', '.pn…` (`feature-libs/customer-ticketing/root/config/default-customer-ticketing-config.ts:L15-L37`) | `feature-libs/customer-ticketing/root/config/customer-ticketing-config.ts:L10-L27` |
| `TicketSearchConfig` | interface; public API | `pageSize` | `number` | sì |  | `feature-libs/customer-ticketing/root/model/customer-ticketing.model.ts:L82-L86` |
| 〃 |  | `currentPage` | `number` | sì |  |  |
| 〃 |  | `sort` | `string` | sì |  |  |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultCustomerTicketingConfig` | `CustomerTicketingConfig` | `{ customerTicketing: { attachmentRestrictions: { maxSize: MAX_SIZE_FOR_ATTACHMENT, allowedTypes: [ '.pdf', '.txt', '.pn…` | sì | `feature-libs/customer-ticketing/root/config/default-customer-ticketing-config.ts:L15-L37` |
| `defaultCustomerTicketingFormLayoutConfig` | `LayoutConfig` | `{ launch: { CUSTOMER_TICKETING_REOPEN: { inline: true, component: CustomerTicketingReopenDialogComponent, dialogType: D…` | sì | `feature-libs/customer-ticketing/components/shared/customer-ticketing-dialog/default-customer-ticketing-form-layout.config.ts:L12-L32` |
| `defaultCustomerTicketingRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { supportTickets: { paths: ['my-account/support-tickets'], }, supportTicketDetails: { paths: ['my-…` | no | `feature-libs/customer-ticketing/root/config/default-customer-ticketing-routing-config.ts:L9-L21` |
| `defaultOccCustomerTicketingConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { getTicket: 'users/${customerId}/tickets/${ticketId}', getTickets: 'users/${customerId}…` | no | `feature-libs/customer-ticketing/occ/config/default-occ-customer-ticketing-config.ts:L9-L27` |

## @spartacus/digital-payments

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends DigitalPaymentsConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/digital-payments/src/checkout/adapters/config/occ-digital-payments-endpoint.config.ts:L50-L50` |
| `DigitalPaymentsConfig` | abstract class; @Injectable | `digitalPayments` | `{ occQueryParams?: { sessionId?: string; signature?: string; billingAddress?: string; country?: string; firstName?: string; lastName?: string; line1?: string; …` | sì | `defaultDigitalPaymentsConfig` = `{ digitalPayments: { occQueryParams: { sessionId: 'sid', signature: 'sign', billingAddress: 'billingAddress', country: …` (`integration-libs/digital-payments/src/checkout/adapters/config/default-digital-payments-endpoint.config.ts:L9-L25`) | `integration-libs/digital-payments/src/checkout/adapters/config/occ-digital-payments-endpoint.config.ts:L27-L47` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultDigitalPaymentsConfig` | `DigitalPaymentsConfig` | `{ digitalPayments: { occQueryParams: { sessionId: 'sid', signature: 'sign', billingAddress: 'billingAddress', country: …` | no | `integration-libs/digital-payments/src/checkout/adapters/config/default-digital-payments-endpoint.config.ts:L9-L25` |
| `defaultDpConfirmationDialogConfig` | `LayoutConfig` | `{ launch: { DP_SHOW_CONFIRMATION_DIALOG: { inlineRoot: true, component: DpConfirmationDialogComponent, dialogType: DIAL…` | no | `integration-libs/digital-payments/src/checkout/cms-components/dp-payment-method/dp-confirmation-dialog/default-dp-confirmation-dialog.config.ts:L10-L18` |

## @spartacus/epd-visualization

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends EpdVisualizationConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L110-L110` |
| `EpdVisualizationConfig` | abstract class; @Injectable; implements Config; public API | `epdVisualization` | `EpdVisualizationInnerConfig` | sì |  | `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L15-L24` |
| `EpdVisualizationInnerConfig` | interface; public API | `ui5` | `Ui5Config` | sì |  | `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L29-L46` |
| 〃 |  | `apis` | `VisualizationApiConfig` | sì |  |  |
| 〃 |  | `usageIds` | `UsageIdConfig` | sì |  |  |
| 〃 |  | `visualPicking` | `VisualPickingConfig` | sì |  |  |
| `Ui5Config` | interface; public API | `bootstrapUrl` | `string` | no |  | `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L51-L60` |
| `UsageIdConfig` | interface; public API | `folderUsageId` | `UsageId` | no |  | `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L77-L94` |
| 〃 |  | `productUsageId` | `UsageIdDefinition` | no |  |  |
| `VisualizationApiConfig` | interface; public API | `baseUrl` | `string` | no |  | `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L65-L72` |
| `VisualPickingConfig` | interface; public API | `productReferenceType` | `string` | no |  | `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L99-L104` |

## @spartacus/estimated-delivery-date

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccCartWithEddConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { /* eslint-disable max-len */ ...defaultEddOccEndpoints, /* eslint-enable */ }, }, }, }` | no | `feature-libs/estimated-delivery-date/show-estimated-delivery-date/config/default-occ-cart-with-edd.config.ts:L18-L28` |

## @spartacus/omf

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends OmfConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/omf/order/config/omf-config.ts:L20-L20` |
| `OmfConfig` | abstract class; @Injectable | `omf` | `OmfConfiguration` | sì | `defaultOmfConfig` = `{ omf: { guidHttpHeaderName: 'guid', }, }` (`integration-libs/omf/order/config/default-omf-config.ts:L9-L13`) | `integration-libs/omf/order/config/omf-config.ts:L11-L17` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOmfConfig` | `OmfConfig` | `{ omf: { guidHttpHeaderName: 'guid', }, }` | no | `integration-libs/omf/order/config/default-omf-config.ts:L9-L13` |

## @spartacus/opf

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `ApplePaySessionConfig` | interface; public API | `request` | `any` | no |  | `integration-libs/opf/quick-buy/root/model/opf-apple-pay.model.ts:L45-L52` |
| 〃 |  | `onValidateMerchant` | `(event: any) => Observable<any>` | no |  |  |
| 〃 |  | `onShippingContactSelected` | `(event: any) => Observable<any>` | no |  |  |
| 〃 |  | `onPaymentMethodSelected` | `(event: any) => Observable<any>` | no |  |  |
| 〃 |  | `onShippingMethodSelected` | `(event: any) => Observable<any>` | no |  |  |
| 〃 |  | `onPaymentAuthorized` | `(event: any) => Observable<any>` | no |  |  |
| `BackendConfig` | interface; extends OpfApiBackendConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/opf/base/root/config/opf-api-config.ts:L20-L20` |
| `Config` | interface; extends OpfConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/opf/base/root/config/opf-config.ts:L93-L93` |
| `Config` | interface; extends OpfQuickBuyConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/opf/quick-buy/root/config/opf-quick-buy-config.ts:L27-L27` |
| `OpfApiBackendConfig` | interface; public API | `opfApi` | `{ endpoints?: OpfApiEndpoints; }` | sì |  | `integration-libs/opf/base/root/model/opf-api-backend-config.model.ts:L9-L13` |
| `OpfApiConfig` | abstract class; @Injectable; extends Config; public API | `backend` | `OpfApiBackendConfig` | sì |  | `integration-libs/opf/base/root/config/opf-api-config.ts:L11-L17` |
| `OpfCheckoutReviewCardEditConfig` | interface; public API | `route` | `string` | sì |  | `integration-libs/opf/checkout/components/opf-checkout-review-card/opf-checkout-review-card.model.ts:L7-L10` |
| 〃 |  | `ariaLabelKey` | `string` | sì |  |  |
| `OpfConfig` | abstract class; @Injectable; public API | `opf` | `{ opfBaseUrl?: string; commerceCloudPublicKey?: string; paymentOption?: { /** * The map of info message translation keys for specific payment configuration IDs…` | sì | `defaultOpfConfig` = `{ opf: { opfBaseUrl: '', paymentOption: { enableInfoMessage: true, }, }, }` (`integration-libs/opf/base/root/config/default-opf-config.ts:L9-L16`) | `integration-libs/opf/base/root/config/opf-config.ts:L10-L90` |
| `OpfPaymentConfig` | interface; public API | `configurationId` | `string` | sì |  | `integration-libs/opf/payment/root/model/opf-payment.model.ts:L215-L223` |
| 〃 |  | `cartId` | `string` | sì |  |  |
| 〃 |  | `resultURL` | `string` | sì |  |  |
| 〃 |  | `cancelURL` | `string` | sì |  |  |
| 〃 |  | `channel` | `string` | sì |  |  |
| 〃 |  | `browserInfo` | `OpfPaymentBrowserInfo` | sì |  |  |
| `OpfPaymentInitiationConfig` | interface; public API | `otpKey` | `string` | sì |  | `integration-libs/opf/payment/root/model/opf-payment.model.ts:L195-L198` |
| 〃 |  | `config` | `OpfPaymentConfig` | sì |  |  |
| `OpfPaymentUpdateConfig` | interface; public API | `paymentSessionId` | `string` | no |  | `integration-libs/opf/payment/root/model/opf-payment.model.ts:L200-L204` |
| 〃 |  | `otpKey` | `string` | sì |  |  |
| 〃 |  | `config` | `OpfPaymentUpdatePayload` | sì |  |  |
| `OpfQuickBuyConfig` | abstract class; @Injectable; public API | `providers` | `{ googlePay: OpfQuickBuyGooglePayProvider; applePay: OpfQuickBuyApplePayProvider; [key: string]: unknown; }` | sì | `defaultOpfQuickBuyConfig` = `{ providers: { googlePay: { resourceUrl: 'https://pay.google.com/gp/p/js/pay.js', environment: 'TEST', paymentRequest: …` (`integration-libs/opf/quick-buy/root/config/default-opf-quick-buy-config.ts:L10-L63`) | `integration-libs/opf/quick-buy/root/config/opf-quick-buy-config.ts:L14-L24` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultGiftCardOccEndpointsConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { applyGiftCard: 'users/${userId}/carts/${cartId}/giftCards', removeGiftCard: 'users/${u…` | sì | `integration-libs/opf/gift-card/occ/config/default-occ-opf-gift-card-config.ts:L9-L19` |
| `defaultGlobalSpinnerLayoutConfig` | `LayoutConfig` | `{ launch: { PLACE_ORDER_SPINNER: { inlineRoot: true, component: SpinnerComponent, dialogType: DIALOG_TYPE.POPOVER_CENTE…` | no | `integration-libs/opf/global-functions/core/config/default-opf-global-layout.config.ts:L14-L27` |
| `defaultOccOpfCartConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...opfCartEndpoints, }, }, }, }` | sì | `integration-libs/opf/global-functions/root/config/default-occ-opf-cart-config.ts:L14-L22` |
| `defaultOccOpfCheckoutConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { cartUserEmail: 'users/${userId}/carts/${cartId}?fields=sapCustomerEmail', }, }, }, }` | sì | `integration-libs/opf/checkout/root/config/default-occ-opf-checkout-config.ts:L9-L18` |
| `defaultOccOpfGiftCardCartEndpointsConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...giftCardCartEndpoints, }, }, }, }` | sì | `integration-libs/opf/gift-card/root/config/default-occ-opf-gift-card-cart-config.ts:L16-L24` |
| `defaultOccOpfGiftCardOrderEndpointsConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...giftCardOrderEndpoints, }, }, }, }` | sì | `integration-libs/opf/gift-card/root/config/default-occ-opf-gift-card-order-config.ts:L17-L25` |
| `defaultOccOpfPaymentConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { setCartPaymentOption: 'users/${userId}/carts/${cartId}/paymentOption', }, }, }, }` | no | `integration-libs/opf/payment/occ/config/default-occ-opf-payment-config.ts:L9-L17` |
| `defaultOccOpfQuickBuyCartConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { quickBuyCreateDeliveryAddress: 'users/${userId}/carts/${cartId}/addresses/delivery', q…` | sì | `integration-libs/opf/quick-buy/occ/config/default-occ-opf-quick-buy-cart-config.ts:L9-L24` |
| `defaultOpfApiBaseConfig` | `OpfApiConfig` | `{ backend: { opfApi: { endpoints: { getActiveConfigurations: 'active-configurations', }, }, }, }` | no | `integration-libs/opf/base/opf-api/config/default-opf-api-base-config.ts:L9-L17` |
| `defaultOpfApiCtaConfig` | `OpfApiConfig` | `{ backend: { opfApi: { endpoints: { getCtaScripts: 'payments/cta-scripts-rendering', }, }, }, }` | no | `integration-libs/opf/cta/opf-api/config/default-opf-api-cta-config.ts:L9-L17` |
| `defaultOpfApiPaymentConfig` | `OpfApiConfig` | `{ backend: { opfApi: { endpoints: { verifyPayment: 'payments/${paymentSessionId}/verify', submitPayment: 'payments/${pa…` | no | `integration-libs/opf/payment/opf-api/config/default-opf-api-payment-config.ts:L9-L23` |
| `defaultOpfApiQuickBuyConfig` | `OpfApiConfig` | `{ backend: { opfApi: { endpoints: { getApplePayWebSession: 'payments/apple-pay-web-sessions', }, }, }, }` | no | `integration-libs/opf/quick-buy/opf-api/config/default-opf-api-quick-buy-config.ts:L9-L17` |
| `defaultOpfB2bCheckoutConfig` | `CheckoutConfig` | `{ checkout: { flows: { OPF: { steps: opfB2bCheckoutSteps, guest: false, }, }, }, }` | sì | `integration-libs/opf/b2b-checkout/root/config/default-opf-b2b-checkout-config.ts:L46-L55` |
| `defaultOpfB2bCheckoutOccEndpointsConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...orderEndpoints, }, }, }, }` | sì | `integration-libs/opf/b2b-checkout/root/config/default-opf-b2b-checkout-occ-endpoints-config.ts:L14-L22` |
| `defaultOpfCheckoutConfig` | `CheckoutConfig` | `{ checkout: { flows: { OPF: { steps: opfCheckoutSteps, guest: false, }, }, }, }` | sì | `integration-libs/opf/checkout/root/config/default-opf-checkout-config.ts:L36-L45` |
| `defaultOpfCheckoutRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { opfCheckoutPaymentType: { paths: ['checkout/opf-payment-type'], }, opfCheckoutDeliveryAddress: {…` | no | `integration-libs/opf/checkout/root/config/default-opf-checkout-routing-config.ts:L9-L29` |
| `defaultOpfConfig` | `OpfConfig` | `{ opf: { opfBaseUrl: '', paymentOption: { enableInfoMessage: true, }, }, }` | sì | `integration-libs/opf/base/root/config/default-opf-config.ts:L9-L16` |
| `defaultOpfErrorModalLayoutConfig` | `LayoutConfig` | `{ launch: { OPF_ERROR: { inline: true, component: OpfErrorModalComponent, dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDR…` | sì | `integration-libs/opf/base/components/opf-error-modal/default-opf-error-modal.layout.config.ts:L10-L18` |
| `defaultOpfGiftCardCartConfig` | `CartConfig` | `{ cart: { validation: { enabled: true, }, selectiveCart: { enabled: false, }, showRealTimeStockInPDP: { enabled: false,…` | sì | `integration-libs/opf/gift-card/root/config/default-gift-card-cart-config.ts:L9-L21` |
| `defaultOpfPaymentRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { paymentVerificationResult: { paths: ['opf/payment-verification-redirect/result'], }, paymentVeri…` | sì | `integration-libs/opf/payment/root/config/default-opf-payment-routing-config.ts:L9-L20` |
| `defaultOpfQuickBuyConfig` | `OpfQuickBuyConfig` | `{ providers: { googlePay: { resourceUrl: 'https://pay.google.com/gp/p/js/pay.js', environment: 'TEST', paymentRequest: …` | sì | `integration-libs/opf/quick-buy/root/config/default-opf-quick-buy-config.ts:L10-L63` |
| `defaultPlaceOrderSpinnerLayoutConfig` | `LayoutConfig` | `{ launch: { PLACE_ORDER_SPINNER: { inline: true, component: SpinnerComponent, dialogType: DIALOG_TYPE.POPOVER_CENTER_BA…` | no | `integration-libs/opf/gift-card/root/components/opf-gift-card-checkout/opf-gift-card-checkout.module.ts:L17-L25` |

## @spartacus/opps

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends OppsConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/opps/root/config/opps-config.ts:L28-L28` |
| `OppsConfig` | abstract class; @Injectable; public API | `opps` | `{ couponcodes?: { httpHeaderName?: string; urlParameter?: string; localStorageKey?: string; }; loginRequired?: { urlParameter?: string; }; }` | sì | `defaultOppsConfig` = `{ opps: { couponcodes: { httpHeaderName: 'couponcodes', urlParameter: 'couponcodes', localStorageKey: 'opps-couponcodes…` (`integration-libs/opps/root/config/default-opps-config.ts:L9-L20`) | `integration-libs/opps/root/config/opps-config.ts:L10-L25` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOppsConfig` | `OppsConfig` | `{ opps: { couponcodes: { httpHeaderName: 'couponcodes', urlParameter: 'couponcodes', localStorageKey: 'opps-couponcodes…` | sì | `integration-libs/opps/root/config/default-opps-config.ts:L9-L20` |

## @spartacus/order

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends OrderConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/order/root/config/order-config.ts:L22-L22` |
| `OrderConfig` | abstract class; @Injectable; public API | `orderAttachments` | `{ previewMimeTypes: string[]; }` | sì | `defaultOrderConfig` = `{ orderAttachments: { previewMimeTypes: [ 'text/plain', 'application/json', 'application/xml', 'application/xhtml+xml',…` (`feature-libs/order/root/config/default-order-config.ts:L9-L28`) | `feature-libs/order/root/config/order-config.ts:L10-L19` |
| 〃 |  | `showOrderQuoteLink` | `boolean` | sì |  |  |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultConsignmentTrackingLayoutConfig` | `LayoutConfig` | `{ launch: { CONSIGNMENT_TRACKING: { inlineRoot: true, component: TrackingEventsComponent, dialogType: DIALOG_TYPE.DIALO…` | no | `feature-libs/order/components/order-details/order-detail-items/default-consignment-tracking-layout.config.ts:L10-L18` |
| `defaultMyAccountV2DownloadInvoicesLayoutConfig` | `LayoutConfig` | `{ launch: { DOWNLOAD_ORDER_INVOICES: { inlineRoot: true, component: MyAccountV2DownloadInvoicesComponent, dialogType: D…` | sì | `feature-libs/order/components/order-details/my-account-v2/download-invoices/default-my-account-v2-download-invoices-layout.config.ts:L10-L18` |
| `defaultOccOrderConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { orderHistory: 'users/${userId}/orders', orderDetail: 'users/${userId}/orders/${orderId…` | no | `feature-libs/order/occ/config/default-occ-order-config.ts:L9-L50` |
| `defaultOrderAttachmentsDialogLayoutConfig` | `LayoutConfig` | `{ launch: { ORDER_ATTACHMENTS: { inline: true, component: OrderAttachmentsDialogComponent, dialogType: DIALOG_TYPE.DIAL…` | no | `feature-libs/order/components/order-details/order-attachments/default-order-attachments-dialog-layout.config.ts:L10-L18` |
| `defaultOrderConfig` | `OrderConfig` | `{ orderAttachments: { previewMimeTypes: [ 'text/plain', 'application/json', 'application/xml', 'application/xhtml+xml',…` | no | `feature-libs/order/root/config/default-order-config.ts:L9-L28` |
| `defaultOrderDocumentFlowDialogLayoutConfig` | `LayoutConfig` | `{ launch: { ORDER_DOCUMENT_FLOW: { inlineRoot: true, component: OrderDocumentFlowDialogComponent, dialogType: DIALOG_TY…` | no | `feature-libs/order/document-flow/components/default-order-document-flow-dialog-layout.config.ts:L10-L18` |
| `defaultOrderRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { orders: { paths: ['my-account/orders'], }, orderDetails: { paths: ['my-account/order/:orderCode'…` | no | `feature-libs/order/root/config/default-order-routing-config.ts:L9-L54` |
| `defaultReorderLayoutConfig` | `LayoutConfig` | `{ launch: { REORDER: { inline: true, component: ReorderDialogComponent, dialogType: DIALOG_TYPE.DIALOG, }, }, }` | no | `feature-libs/order/components/order-details/reoder-layout.config.ts:L10-L18` |
| `defaultReplenishmentOrderCancellationLayoutConfig` | `LayoutConfig` | `{ launch: { REPLENISHMENT_ORDER: { inline: true, component: ReplenishmentOrderCancellationDialogComponent, dialogType: …` | sì | `feature-libs/order/components/replenishment-order-details/default-replenishment-order-cancellation-layout.config.ts:L10-L18` |

## @spartacus/organization

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends OrganizationUIConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/organization/administration/root/config/organization-ui.config.ts:L33-L33` |
| `OrganizationUIConfig` | abstract class; @Injectable; public API | `organizationUI` | `{ /** * Configuration for list search functionality. */ listSearch?: { /** * Minimum number of characters required to trigger a search. * Default: 3 */ minChar…` | sì | `defaultOrganizationUIConfig` = `{ organizationUI: { listSearch: { minCharacters: 3, }, }, }` (`feature-libs/organization/administration/root/config/default-organization-ui.config.ts:L9-L15`) | `feature-libs/organization/administration/root/config/organization-ui.config.ts:L13-L30` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultAccountSummaryRoutingConfig` | `RoutingConfig` | `` { routing: { routes: { orgAccountSummary: { paths: [`${listPath}`], }, orgAccountSummaryDetails: { paths: [`${listPath}… `` | sì | `feature-libs/organization/account-summary/root/config/default-account-summary-routing.config.ts:L11-L23` |
| `defaultBudgetRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { orgBudget: { paths: ['organization/budgets'], }, orgBudgetCreate: { paths: ['organization/budget…` | sì | `feature-libs/organization/administration/root/config/default-budget-routing.config.ts:L15-L38` |
| `defaultCostCenterRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { orgCostCenter: { paths: ['organization/cost-centers'], }, orgCostCenterCreate: { paths: ['organi…` | sì | `feature-libs/organization/administration/root/config/default-cost-center-routing.config.ts:L15-L42` |
| `defaultOccAccountSummaryConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...accountSummaryHeaderOccEndpoints, }, }, }, }` | no | `feature-libs/organization/account-summary/occ/config/default-occ-account-summary-config.ts:L17-L25` |
| `defaultOccOrderApprovalConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { orderApprovals: '/users/${userId}/orderapprovals', orderApproval: '/users/${userId}/or…` | no | `feature-libs/organization/order-approval/occ/config/default-occ-organization-config.ts:L9-L21` |
| `defaultOccOrganizationConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { budgets: '/users/${userId}/budgets', budget: '/users/${userId}/budgets/${budgetCode}',…` | no | `feature-libs/organization/administration/occ/config/default-occ-organization-config.ts:L9-L75` |
| `defaultOccOrganizationUserRegistrationConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { organizationUserRegistration: '/orgUsers', }, }, }, }` | no | `feature-libs/organization/user-registration/occ/config/default-occ-organization-config.ts:L9-L17` |
| `defaultOccUnitOrderConfig` | `OccConfig` | `` { backend: { occ: { endpoints: { unitLevelOrderHistory: `/orgUsers/\${userId}/orgUnits/orders`, unitLevelOrderDetail: `… `` | no | `feature-libs/organization/unit-order/occ/config/default-occ-organization-config.ts:L9-L18` |
| `defaultOrganizationLayoutConfig` |  | `{ layoutSlots: { CompanyPageTemplate: { slots: ['BodyContent'], }, }, } as LayoutConfig` | sì | `feature-libs/organization/administration/root/config/default-organization-layout.config.ts:L9-L15` |
| `defaultOrganizationUIConfig` | `OrganizationUIConfig` | `{ organizationUI: { listSearch: { minCharacters: 3, }, }, }` | sì | `feature-libs/organization/administration/root/config/default-organization-ui.config.ts:L9-L15` |
| `defaultPermissionRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { orgPurchaseLimit: { paths: ['organization/purchase-limits'], }, orgPurchaseLimitCreate: { paths:…` | sì | `feature-libs/organization/administration/root/config/default-permission-routing.config.ts:L15-L34` |
| `defaultUnitsRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { orgUnits: { paths: ['organization/units'], }, orgUnitCreate: { paths: ['organization/units/creat…` | sì | `feature-libs/organization/administration/root/config/default-units-routing.config.ts:L17-L88` |
| `defaultUserGroupRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { orgUserGroup: { paths: ['organization/user-groups'], }, orgUserGroupCreate: { paths: ['organizat…` | sì | `feature-libs/organization/administration/root/config/default-user-group-routing.config.ts:L16-L51` |
| `defaultUserRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { orgUser: { paths: ['organization/users'], }, orgUserCreate: { paths: ['organization/users/create…` | sì | `feature-libs/organization/administration/root/config/default-user-routing.config.ts:L15-L62` |

## @spartacus/pdf-invoices

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccPDFInvoicesConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { pdfInvoicesListInvoices: 'users/${userId}/orders/${orderId}/invoices', pdfInvoicesDown…` | no | `feature-libs/pdf-invoices/occ/config/default-occ-pdf-invoices-config.ts:L9-L19` |

## @spartacus/pickup-in-store

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends PickupInStoreConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/pickup-in-store/core/config/pickup-in-store-config.ts:L21-L21` |
| `PickupInStoreConfig` | abstract class; @Injectable; public API | `pickupInStore` | `{ consentTemplateId?: string; }` | sì | `defaultPickupInStoreConfig` = `{ pickupInStore: { consentTemplateId: 'STORE_USER_INFORMATION', }, }` (`feature-libs/pickup-in-store/core/config/default-pickup-in-store-config.ts:L9-L13`) | `feature-libs/pickup-in-store/core/config/pickup-in-store-config.ts:L10-L18` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccPickupLocationConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { storeDetails: 'stores/${storeName}', }, }, }, }` | sì | `feature-libs/pickup-in-store/occ/adapters/default-occ-pickup-location-config.ts:L12-L20` |
| `defaultOccStockConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { stock: 'products/${productCode}/stock', stockAtStore: 'products/${productCode}/stock/$…` | sì | `feature-libs/pickup-in-store/occ/adapters/default-occ-stock-config.ts:L12-L21` |
| `defaultPickupInStoreConfig` | `PickupInStoreConfig` | `{ pickupInStore: { consentTemplateId: 'STORE_USER_INFORMATION', }, }` | sì | `feature-libs/pickup-in-store/core/config/default-pickup-in-store-config.ts:L9-L13` |
| `defaultPickupOptionsDialogLayoutConfig` | `LayoutConfig` | `{ launch: { PICKUP_IN_STORE: { inlineRoot: true, component: PickupOptionDialogComponent, dialogType: DIALOG_TYPE.DIALOG…` | sì | `feature-libs/pickup-in-store/components/container/pickup-option-dialog/pickup-option-dialog-layout.config.ts:L10-L18` |

## @spartacus/product

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccBulkPricingConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { product: { bulkPrices: 'orgProducts/${productCode}?fields=price(DEFAULT),volumePrices(…` | no | `feature-libs/product/bulk-pricing/occ/config/default-occ-bulk-pricing-config.ts:L9-L20` |
| `defaultOccFutureStockConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...futureStockEndpoints, }, }, }, }` | no | `feature-libs/product/future-stock/occ/config/default-occ-future-stock.config.ts:L15-L23` |
| `defaultOccProductVariantsConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { product: { variants: 'products/${productCode}?fields=name,purchasable,baseOptions(DEFA…` | no | `feature-libs/product/variants/occ/config/default-occ-product-variants-config.ts:L9-L20` |
| `defaultProductImageZoomLayoutConfig` | `LayoutConfig` | `{ launch: { PRODUCT_IMAGE_ZOOM: { inline: true, component: ProductImageZoomDialogComponent, dialogType: DIALOG_TYPE.DIA…` | sì | `feature-libs/product/image-zoom/components/product-image-zoom/default-product-image-zoom-layout.config.ts:L10-L18` |

## @spartacus/product-configurator

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `CommonConfiguratorUISettingsConfig` | abstract class; @Injectable; public API | `productConfigurator` | `CommonProductConfiguratorUISettingsConfig` | sì | `defaultCommonConfiguratorUISettingsConfig` = `{ productConfigurator: { cartEntryBundleLineItemsThreshold: 10, }, }` (`feature-libs/product-configurator/common/components/config/default-common-configurator-ui-settings.config.ts:L9-L14`) | `feature-libs/product-configurator/common/components/config/common-configurator-ui-settings.config.ts:L19-L25` |
| `CommonProductConfiguratorUISettingsConfig` | interface | `cartEntryBundleLineItemsThreshold` | `number` | sì |  | `feature-libs/product-configurator/common/components/config/common-configurator-ui-settings.config.ts:L10-L17` |
| `Config` | interface; declare module '@spartacus/core' | `productConfigurator` | `ProductConfiguratorConfig` | sì |  | `feature-libs/product-configurator/common/core/model/product-configurator.config.ts:L12-L14` |
| `ConfiguratorAttributeCompositionConfig` | abstract class; @Injectable; public API | `productConfigurator` | `ConfiguratorAttributeComposition` | sì |  | `feature-libs/product-configurator/rulebased/components/attribute/composition/configurator-attribute-composition.config.ts:L18-L24` |
| `ConfiguratorCoreConfig` | abstract class; @Injectable; public API | `productConfigurator` | `ProductConfiguratorCoreConfig` | sì | `defaultConfiguratorCoreConfig` = `{ productConfigurator: { enableVariantSearch: false, }, }` (`feature-libs/product-configurator/rulebased/core/config/default-configurator-core.config.ts:L9-L13`) | `feature-libs/product-configurator/rulebased/core/config/configurator-core.config.ts:L14-L20` |
| `ConfiguratorMessageConfig` | abstract class; public API | `productConfigurator` | `ProductConfiguratorMessageConfig` | sì | `defaultConfiguratorMessageConfig` = `{ productConfigurator: { updateConfigurationMessage: { waitingTime: 1000, }, }, }` (`feature-libs/product-configurator/rulebased/components/config/default-configurator-message.config.ts:L9-L15`) | `feature-libs/product-configurator/rulebased/components/config/configurator-message.config.ts:L13-L15` |
| `ConfiguratorUISettingsConfig` | abstract class; @Injectable; public API | `productConfigurator` | `ProductConfiguratorUISettingsConfig` | sì | `defaultConfiguratorUISettingsConfig` = `{ productConfigurator: { updateDebounceTime: { quantity: 750, input: 500, date: 1500, }, addRetractOption: false, descr…` (`feature-libs/product-configurator/rulebased/components/config/default-configurator-ui-settings.config.ts:L10-L33`) | `feature-libs/product-configurator/rulebased/components/config/configurator-ui-settings.config.ts:L51-L57` |
| `ProductConfiguratorConfig` | interface; extends CommonProductConfiguratorUISettingsConfig; declare module '../../core/model/product-configurator.config'; public API | `(nessuna chiave propria)` |  |  |  | `feature-libs/product-configurator/common/components/config/common-configurator-ui-settings.config.ts:L28-L29` |
| `ProductConfiguratorConfig` | interface; public API | `(nessuna chiave propria)` |  |  |  | `feature-libs/product-configurator/common/core/model/product-configurator.config.ts:L9-L9` |
| `ProductConfiguratorConfig` | interface; extends ProductConfiguratorUISettingsConfig, ProductConfiguratorMessageConfig, ConfiguratorAttributeComposition, ProductConfiguratorCoreConfig; declare module '@spartacus/product-configurator/common' | `(nessuna chiave propria)` |  |  |  | `feature-libs/product-configurator/rulebased/components/config/augmented-config.model.ts:L15-L19` |
| `ProductConfiguratorCoreConfig` | interface | `enableVariantSearch` | `boolean` | sì |  | `feature-libs/product-configurator/rulebased/core/config/configurator-core.config.ts:L10-L12` |
| `ProductConfiguratorMessageConfig` | interface | `updateConfigurationMessage` | `{ waitingTime?: number; }` | sì |  | `feature-libs/product-configurator/rulebased/components/config/configurator-message.config.ts:L7-L11` |
| `ProductConfiguratorUISettingsConfig` | interface | `updateDebounceTime` | `{ quantity?: number; input?: number; date?: number; }` | sì |  | `feature-libs/product-configurator/rulebased/components/config/configurator-ui-settings.config.ts:L10-L49` |
| 〃 |  | `addRetractOption` | `boolean` | sì |  |  |
| 〃 |  | `descriptions` | `{ attributeDescriptionLength?: number; valueDescriptionLength?: number; }` | sì |  |  |
| 〃 |  | `cpqContainerDropDownListThreshold` | `number` | sì |  |  |
| 〃 |  | `overviewHeaderSelectors` | `string[]` | sì |  |  |
| 〃 |  | `overviewMenuFilterTabVisible` | `Record<string, boolean>` | sì |  |  |
| 〃 |  | `cpqHideBasePriceAndSelectedOptions` | `boolean` | sì |  |  |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultCommonConfiguratorUISettingsConfig` | `CommonConfiguratorUISettingsConfig` | `{ productConfigurator: { cartEntryBundleLineItemsThreshold: 10, }, }` | no | `feature-libs/product-configurator/common/components/config/default-common-configurator-ui-settings.config.ts:L9-L14` |
| `defaultConfiguratorConflictSolverLayoutConfig` | `LayoutConfig` | `{ launch: { CONFLICT_SOLVER: { inlineRoot: true, component: ConfiguratorConflictSolverDialogComponent, dialogType: DIAL…` | no | `feature-libs/product-configurator/rulebased/components/conflict-solver-dialog/default-configurator-conflict-solver-layout.config.ts:L10-L18` |
| `defaultConfiguratorCoreConfig` | `ConfiguratorCoreConfig` | `{ productConfigurator: { enableVariantSearch: false, }, }` | no | `feature-libs/product-configurator/rulebased/core/config/default-configurator-core.config.ts:L9-L13` |
| `defaultConfiguratorMessageConfig` | `ConfiguratorMessageConfig` | `{ productConfigurator: { updateConfigurationMessage: { waitingTime: 1000, }, }, }` | no | `feature-libs/product-configurator/rulebased/components/config/default-configurator-message.config.ts:L9-L15` |
| `defaultConfiguratorOverviewFilterDialogLayoutConfig` | `LayoutConfig` | `{ launch: { CONFIGURATOR_OV_FILTER: { inlineRoot: true, component: ConfiguratorOverviewFilterDialogComponent, dialogTyp…` | no | `feature-libs/product-configurator/rulebased/components/overview-filter-dialog/default-configurator-overview-filer-dialog-layout.config.ts:L10-L19` |
| `defaultConfiguratorRestartDialogLayoutConfig` | `LayoutConfig` | `{ launch: { CONFIGURATOR_RESTART_DIALOG: { inlineRoot: true, component: ConfiguratorRestartDialogComponent, dialogType:…` | no | `feature-libs/product-configurator/rulebased/components/restart-dialog/default-configurator-restart-dialog-layout.config.ts:L10-L18` |
| `defaultConfiguratorUISettingsConfig` | `ConfiguratorUISettingsConfig` | `{ productConfigurator: { updateDebounceTime: { quantity: 750, input: 500, date: 1500, }, addRetractOption: false, descr…` | no | `feature-libs/product-configurator/rulebased/components/config/default-configurator-ui-settings.config.ts:L10-L33` |
| `defaultCpqInteractiveRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { configureCLOUDCPQCONFIGURATOR: { paths: ['configure/cpq/:ownerType/entityKey/:entityKey'], }, },…` | no | `feature-libs/product-configurator/rulebased/root/cpq/default-cpq-interactive-routing-config.ts:L9-L17` |
| `defaultCpqOverviewRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { configureOverviewCLOUDCPQCONFIGURATOR: { paths: [ 'configure-overview/cpq/:ownerType/entityKey/:…` | no | `feature-libs/product-configurator/rulebased/root/cpq/default-cpq-overview-routing-config.ts:L9-L20` |
| `defaultOccConfiguratorProductConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { product: { configurator: 'products/${productCode}?fields=code,configurable,configurato…` | no | `feature-libs/product-configurator/common/occ/default-occ-configurator-product-config.ts:L10-L30` |
| `defaultRulebasedRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { configureCPQCONFIGURATOR: { paths: ['configure/vc/:ownerType/entityKey/:entityKey'], }, configur…` | no | `feature-libs/product-configurator/rulebased/root/default-rulebased-routing-config.ts:L9-L28` |
| `defaultTextfieldRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { configureTEXTFIELD: { paths: ['configure/textfield/:ownerType/entityKey/:entityKey'], }, configu…` | no | `feature-libs/product-configurator/textfield/root/default-textfield-routing-config.ts:L9-L23` |

## @spartacus/product-multi-dimensional

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends ProductMultiDimensionalConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/product-multi-dimensional/selector/root/config/product-multi-dimensional-config.ts:L21-L21` |
| `ProductMultiDimensionalConfig` | class; @Injectable; public API | `multiDimensional` | `{ imageFormat?: VariantQualifier; }` | sì | `defaultProductMultiDimensionalConfig` = `{ multiDimensional: { imageFormat: VariantQualifier.STYLE_SWATCH, }, }` (`feature-libs/product-multi-dimensional/selector/root/config/default-product-multi-dimensional-config.ts:L10-L15`) | `feature-libs/product-multi-dimensional/selector/root/config/product-multi-dimensional-config.ts:L10-L18` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccProductMultiDimensionalSelectorConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { product: { multi_dimensional: 'products/${productCode}?fields=multidimensional,categor…` | no | `feature-libs/product-multi-dimensional/selector/occ/config/default-occ-product-multi-dimensional-selector-config.ts:L12-L26` |
| `defaultProductMultiDimensionalConfig` | `ProductMultiDimensionalConfig` | `{ multiDimensional: { imageFormat: VariantQualifier.STYLE_SWATCH, }, }` | sì | `feature-libs/product-multi-dimensional/selector/root/config/default-product-multi-dimensional-config.ts:L10-L15` |

## @spartacus/punchout

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends PunchoutNavigationGuardConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/punchout/root/config/punchout-guard-config.ts:L37-L37` |
| `PunchoutNavigationGuardConfig` | abstract class; @Injectable; public API | `punchoutNavigation` | `{ [PunchOutOperation.EDIT]: { allowedUrls?: string[]; allowedCxRoutes?: string[]; redirectPage: string \| LaunchRoute; }; [PunchOutOperation.CREATE]: { allowedU…` | sì | `defaultPunchoutNavigationGuardConfig` = `{ punchoutNavigation: { [PunchOutOperation.INSPECT]: { allowedCxRoutes: [...allowedCxRoutesForAll, 'punchoutInspect'], …` (`integration-libs/punchout/root/config/default-punchout-guard-config.ts:L22-L46`) | `integration-libs/punchout/root/config/punchout-guard-config.ts:L12-L34` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccPunchoutConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...punchoutOccEndpoints, }, }, }, }` | no | `integration-libs/punchout/occ/config/default-occ-punchout-config.ts:L15-L23` |
| `defaultPunchoutCmsComponentsConfig` | `CmsConfig` | `{ featureModules: { [PUNCHOUT_FEATURE]: { cmsComponents: [ 'PunchoutSessionComponent', 'PunchoutErrorComponent', 'Punch…` | sì | `integration-libs/punchout/root/config/default-punchout-cms-component-config.ts:L10-L23` |
| `defaultPunchoutNavigationGuardConfig` | `PunchoutNavigationGuardConfig` | `{ punchoutNavigation: { [PunchOutOperation.INSPECT]: { allowedCxRoutes: [...allowedCxRoutesForAll, 'punchoutInspect'], …` | sì | `integration-libs/punchout/root/config/default-punchout-guard-config.ts:L22-L46` |
| `defaultPunchoutRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { punchoutSession: { paths: ['punchout/cxml/session'], protected: false, authFlow: true, }, puncho…` | sì | `integration-libs/punchout/root/config/default-punchout-routing-config.ts:L9-L30` |

## @spartacus/qualtrics

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends QualtricsConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/qualtrics/components/qualtrics-loader/config/qualtrics-config.ts:L33-L33` |
| `QualtricsConfig` | abstract class; @Injectable; public API | `qualtrics` | `{ /** * Deployment script, loaded from a resource, to integrate the deployment of the qualtrics project. * You would typically store the file in the local asse…` | sì | `defaultQualtricsConfig` = `{ qualtrics: {}, }` (`feature-libs/qualtrics/components/qualtrics-loader/config/default-qualtrics-config.ts:L9-L11`) | `feature-libs/qualtrics/components/qualtrics-loader/config/qualtrics-config.ts:L14-L30` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultQualtricsConfig` | `QualtricsConfig` | `{ qualtrics: {}, }` | no | `feature-libs/qualtrics/components/qualtrics-loader/config/default-qualtrics-config.ts:L9-L11` |

## @spartacus/quote

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends QuoteUIConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/quote/components/config/quote-ui.config.ts:L56-L56` |
| `Config` | interface; extends QuoteCoreConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/quote/core/config/quote-core.config.ts:L32-L32` |
| `Config` | interface; declare module '@spartacus/core' | `quote` | `QuoteConfig` | sì |  | `feature-libs/quote/root/config/quote.config.ts:L12-L14` |
| `QuoteActionsConfig` | interface; public API | `primaryActions` | `QuoteActionType[]` | sì |  | `feature-libs/quote/core/config/quote-core.config.ts:L11-L16` |
| 〃 |  | `actionsOrderByState` | `Partial<QuoteActionsByState>` | sì |  |  |
| `QuoteConfig` | interface; public API | `(nessuna chiave propria)` |  |  |  | `feature-libs/quote/root/config/quote.config.ts:L9-L9` |
| `QuoteCoreConfig` | abstract class; @Injectable; public API | `quote` | `{ actions?: QuoteActionsConfig; }` | sì | `defaultQuoteCoreConfig` = `{ quote: { actions: { primaryActions: [ QuoteActionType.APPROVE, QuoteActionType.CHECKOUT, QuoteActionType.SUBMIT, Quot…` (`feature-libs/quote/core/config/default-quote.core.config.ts:L10-L37`) | `feature-libs/quote/core/config/quote-core.config.ts:L18-L29` |
| `QuoteUIConfig` | abstract class; @Injectable; public API | `quote` | `QuoteUIConfigFragment` | sì | `defaultQuoteUIConfig` = `{ quote: { maxCharsForComments: 1000, truncateCardTileContentAfterNumChars: 100, updateDebounceTime: { expiryDate: 500,…` (`feature-libs/quote/components/config/default-quote-ui.config.ts:L104-L115`) | `feature-libs/quote/components/config/quote-ui.config.ts:L47-L53` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultConfirmActionDialogConfig` |  | `{ showWarningNote: false, showExpirationDate: false, showSuccessMessage: true, showOnlyWhenCartIsNotEmpty: false, }` | no | `feature-libs/quote/components/config/default-quote-ui.config.ts:L15-L20` |
| `defaultOccQuoteConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { getQuotes: 'users/${userId}/quotes', createQuote: 'users/${userId}/quotes', getQuote: …` | no | `feature-libs/quote/occ/config/default-occ-quote-config.ts:L12-L34` |
| `defaultQuoteActionDialogConfig` | `LayoutConfig` | `{ launch: { QUOTE_ACTION_CONFIRMATION: { inline: true, component: QuoteConfirmDialogComponent, dialogType: DIALOG_TYPE.…` | no | `feature-libs/quote/components/confirm-dialog/default-quote-confirm-dialog.config.ts:L10-L18` |
| `defaultQuoteConfigLayoutConfig` | `LayoutConfig` | `{ layoutSlots: { QuoteDetailsPageTemplate: { slots: ['BodyContent', 'CenterRightContent'], }, }, }` | sì | `feature-libs/quote/root/quote-root.module.ts:L80-L86` |
| `defaultQuoteCoreConfig` | `QuoteCoreConfig` | `{ quote: { actions: { primaryActions: [ QuoteActionType.APPROVE, QuoteActionType.CHECKOUT, QuoteActionType.SUBMIT, Quot…` | no | `feature-libs/quote/core/config/default-quote.core.config.ts:L10-L37` |
| `defaultQuoteRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { quotes: { paths: ['my-account/quotes'], }, quoteDetails: { paths: ['my-account/quote/:quoteId'],…` | sì | `feature-libs/quote/root/quote-root.module.ts:L66-L78` |
| `defaultQuoteUIConfig` | `QuoteUIConfig` | `{ quote: { maxCharsForComments: 1000, truncateCardTileContentAfterNumChars: 100, updateDebounceTime: { expiryDate: 500,…` | no | `feature-libs/quote/components/config/default-quote-ui.config.ts:L104-L115` |

## @spartacus/requested-delivery-date

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccRequestedDeliveryDateConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { requestedDeliveryDate: 'users/${userId}/carts/${cartId}/requestedretrievaldate', }, },…` | no | `feature-libs/requested-delivery-date/occ/config/default-occ-requested-delivery-date-config.ts:L9-L18` |

## @spartacus/s4-service

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends S4ServiceDeliveryModeConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/s4-service/root/model/augmented-types.model.ts:L63-L63` |
| `S4ServiceDeliveryModeConfig` | abstract class; @Injectable; public API | `s4ServiceDeliveryMode` | `DeliveryMode` | sì |  | `integration-libs/s4-service/root/model/augmented-types.model.ts:L54-L60` |
| `ServiceOrderConfig` | interface; public API | `leadDays` | `number` | sì |  | `integration-libs/s4-service/root/model/checkout-service-details.model.ts:L13-L16` |
| 〃 |  | `serviceScheduleTimes` | `string[]` | sì |  |  |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccCheckoutServiceOrderConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...defaultServiceOrderCheckoutDetailsOccEndpoint, setServiceScheduleSlot: 'users/${use…` | no | `integration-libs/s4-service/checkout/occ/config/default-occ-checkout-s4-service-config.ts:L15-L25` |
| `defaultOccServiceOrderConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...s4ServiceOccEndpoints, }, }, }, }` | no | `integration-libs/s4-service/order/occ/config/default-occ-s4-service-config.ts:L17-L25` |
| `defaultServiceDeliveryModeConfig` | `S4ServiceDeliveryModeConfig` | `{ s4ServiceDeliveryMode: { code: 'service-delivery', deliveryCost: { currencyIso: 'USD', formattedValue: 'USD0.00', pri…` | no | `integration-libs/s4-service/root/config/default-service-delivery-mode-config.ts:L10-L22` |
| `defaultServiceDetailsCheckoutConfig` | `CheckoutConfig` | `{ checkout: { steps: [ { id: 'paymentType', name: 'checkoutB2B.progress.methodOfPayment', routeName: 'checkoutPaymentTy…` | sì | `integration-libs/s4-service/root/config/default-service-details-checkout-config.ts:L13-L57` |
| `defaultServiceOrdersRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { checkoutServiceDetails: { paths: ['checkout/service-details'] }, cancelServiceDetails: { paths: …` | sì | `integration-libs/s4-service/root/config/default-service-orders-routing-config.ts:L9-L23` |

## @spartacus/segment-refs

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends SegmentRefsConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `integration-libs/segment-refs/root/config/segment-refs-config.ts:L21-L21` |
| `SegmentRefsConfig` | abstract class; @Injectable | `segmentRefs` | `{ httpHeaderName: string; }` | sì | `defaultSegmentRefsConfig` = `{ segmentRefs: { httpHeaderName: 'Segmentrefs', }, }` (`integration-libs/segment-refs/root/config/default-segment-refs-config.ts:L9-L13`) | `integration-libs/segment-refs/root/config/segment-refs-config.ts:L10-L18` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultSegmentRefsConfig` | `SegmentRefsConfig` | `{ segmentRefs: { httpHeaderName: 'Segmentrefs', }, }` | no | `integration-libs/segment-refs/root/config/default-segment-refs-config.ts:L9-L13` |

## @spartacus/setup

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultB2bOccConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...defaultB2bUserAccountOccEndpoints, ...defaultB2bUserProfileOccEndpoints, ...default…` | sì | `core-libs/setup/recipes/b2b/config/default-b2b-occ-config.ts:L38-L49` |

## @spartacus/smartedit

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends SmartEditConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/smartedit/root/config/smart-edit-config.ts:L22-L22` |
| `SmartEditConfig` | abstract class; @Injectable; public API | `smartEdit` | `{ storefrontPreviewRoute?: string; allowOrigin?: string; }` | sì | `defaultSmartEditConfig` = `{ smartEdit: { storefrontPreviewRoute: 'cx-preview', allowOrigin: 'localhost:9002', }, }` (`feature-libs/smartedit/root/config/default-smart-edit-config.ts:L9-L14`) | `feature-libs/smartedit/root/config/smart-edit-config.ts:L10-L19` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultSmartEditConfig` | `SmartEditConfig` | `{ smartEdit: { storefrontPreviewRoute: 'cx-preview', allowOrigin: 'localhost:9002', }, }` | no | `feature-libs/smartedit/root/config/default-smart-edit-config.ts:L9-L14` |

## @spartacus/storefinder

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends StoreFinderConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/storefinder/core/config/store-finder-config.ts:L26-L26` |
| `StoreFinderConfig` | abstract class; @Injectable; public API | `googleMaps` | `{ apiUrl?: string; apiKey?: string; scale?: number; selectedMarkerScale?: number; radius?: number; mapId?: string; }` | sì | `defaultStoreFinderConfig` = `{ googleMaps: { apiUrl: 'https://maps.googleapis.com/maps/api/js', apiKey: '', scale: 5, selectedMarkerScale: 17, radiu…` (`feature-libs/storefinder/core/config/default-store-finder-config.ts:L9-L21`) | `feature-libs/storefinder/core/config/store-finder-config.ts:L10-L23` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccStoreFinderConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { store: 'stores/${storeId}?fields=FULL', stores: 'stores?fields=stores(name,displayName…` | no | `feature-libs/storefinder/occ/adapters/default-occ-store-finder-config.ts:L9-L20` |
| `defaultStoreFinderConfig` | `StoreFinderConfig` | `{ googleMaps: { apiUrl: 'https://maps.googleapis.com/maps/api/js', apiKey: '', scale: 5, selectedMarkerScale: 17, radiu…` | no | `feature-libs/storefinder/core/config/default-store-finder-config.ts:L9-L21` |
| `defaultStoreFinderLayoutConfig` | `LayoutConfig` | `{ layoutSlots: { StoreFinderPageTemplate: { slots: ['MiddleContent', 'SideContent'], }, }, }` | sì | `feature-libs/storefinder/root/config/default-store-finder-layout-config.ts:L9-L15` |
| `defaultStoreFinderRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { storeFinder: { paths: ['store-finder'], }, storeFinderFind: { paths: ['store-finder/find'], }, s…` | sì | `feature-libs/storefinder/root/config/default-store-finder-routing-config.ts:L9-L35` |

## @spartacus/storefront

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `AutoFocusConfig` | interface; extends EscapeFocusConfig | `autofocus` | `boolean \| string` | sì |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L72-L96` |
| 〃 |  | `refreshFocus` | `unknown` | sì |  |  |
| `BaseFocusConfig` | interface | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L17-L17` |
| `BlockFocusConfig` | interface; extends VisibleFocusConfig | `block` | `boolean` | sì |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L27-L29` |
| `CaptchaApiConfig` | abstract class; @Injectable; public API | `captchaRenderer` | `Type<CaptchaRenderer>` | sì |  | `core-libs/storefront/shared/components/captcha/captcha-api-config.ts:L11-L29` |
| 〃 |  | `apiUrl` | `string` | sì |  |  |
| 〃 |  | `fields` | `{ [key: string]: string }` | sì |  |  |
| `Config` | interface; extends IconConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/cms-components/misc/icon/icon.model.ts:L88-L88` |
| `Config` | interface; extends LogoutConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/cms-components/user/logout/config/logout-config.ts:L28-L28` |
| `Config` | interface; extends LcpCmsComponentsConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/cms-structure/cms-lcp-context/config/lcp-cms-components.config.ts:L51-L51` |
| `Config` | interface; extends PWAModuleConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/cms-structure/pwa/pwa.module-config.ts:L29-L29` |
| `Config` | interface; extends SeoConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/cms-structure/seo/config/seo.config.ts:L27-L27` |
| `Config` | interface; extends SkipLinkConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/layout/a11y/skip-link/config/skip-link.config.ts:L31-L31` |
| `Config` | interface; extends LayoutConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/layout/config/layout-config.ts:L128-L128` |
| `Config` | interface; extends DirectionConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/layout/direction/config/direction.config.ts:L34-L34` |
| `Config` | interface; extends OnNavigateConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/router/config/on-navigate-config.ts:L30-L30` |
| `Config` | interface; extends CaptchaApiConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/shared/components/captcha/captcha-api-config.ts:L32-L32` |
| `Config` | interface; extends PaginationConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/shared/components/list-navigation/pagination/config/pagination.config.ts:L20-L20` |
| `Config` | interface; extends MediaConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/shared/components/media/media.config.ts:L80-L80` |
| `Config` | interface; extends TableConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/shared/components/table/config/table.config.ts:L63-L63` |
| `Config` | interface; extends FormConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/shared/config/form-config.ts:L21-L21` |
| `Config` | interface; extends ViewConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/shared/config/view-config.ts:L29-L29` |
| `DirectionConfig` | abstract class; @Injectable; public API | `direction` | `Direction` | sì | `defaultDirectionConfig` = `{ direction: { detect: true, default: DirectionMode.LTR, // we're not polluting the system with all defaults for ltr, b…` (`core-libs/storefront/layout/direction/config/default-direction.config.ts:L10-L19`) | `core-libs/storefront/layout/direction/config/direction.config.ts:L25-L31` |
| `EscapeFocusConfig` | interface; extends PersistFocusConfig | `focusOnEscape` | `boolean` | sì |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L64-L70` |
| 〃 |  | `focusOnDoubleEscape` | `boolean` | sì |  |  |
| `FocusConfig` | interface; extends LockFocusConfig; public API | `(nessuna chiave propria)` |  |  |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L149-L149` |
| `FormConfig` | abstract class; @Injectable; public API | `form` | `{ passwordVisibilityToggle: boolean; }` | sì | `defaultFormConfig` = `{ form: { passwordVisibilityToggle: true, }, }` (`core-libs/storefront/shared/config/default-form-config.ts:L9-L13`) | `core-libs/storefront/shared/config/form-config.ts:L10-L18` |
| `IconConfig` | abstract class; @Injectable; public API | `icon` | `IconOptions` | sì | `defaultIconConfig` = `{ icon: { flipDirection: { CARET_RIGHT: DirectionMode.RTL, CARET_LEFT: DirectionMode.RTL, }, }, }` (`core-libs/storefront/cms-components/misc/icon/default-icon.config.ts:L10-L17`) | `core-libs/storefront/cms-components/misc/icon/icon.model.ts:L79-L85` |
| `LaunchConfig` | interface; public API | `[key: string]` | `LaunchOptions` | - |  | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L9-L11` |
| `LayoutConfig` | abstract class; @Injectable; public API | `breakpoints` | `LayoutBreakPoints` | sì | `defaultLayoutConfig` = `{ breakpoints: { xs: 576, sm: 768, md: 992, lg: 1200, xl: { min: 1200, }, }, }` (`core-libs/storefront/layout/config/default-layout.config.ts:L9-L19`) | `core-libs/storefront/layout/config/layout-config.ts:L90-L125` |
| 〃 |  | `layoutSlots` | `LayoutSlotConfig` | sì |  |  |
| 〃 |  | `deferredLoading` | `{ /** * The global strategy will be used as a fallback strategy for all DOM creation, * but can be overridden by local configuration, i.e. for cms components. …` | sì |  |  |
| 〃 |  | `launch` | `LaunchConfig` | sì |  |  |
| `LcpCmsComponentsConfig` | abstract class; @Injectable; public API | `lcpCmsComponents` | `{ /** * If a CMS component ID includes this substring, Spartacus treats it as containing * the LCP (Largest Contentful Paint) element. You can append this subs…` | sì | `defaultLcpCmsComponentsConfig` = `{ lcpCmsComponents: { idMarker: '__cxLCP__', ids: [], }, }` (`core-libs/storefront/cms-structure/cms-lcp-context/config/default-lcp-cms-components.config.ts:L9-L14`) | `core-libs/storefront/cms-structure/cms-lcp-context/config/lcp-cms-components.config.ts:L14-L48` |
| `LockFocusConfig` | interface; extends TrapFocusConfig | `lock` | `boolean` | sì |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L142-L147` |
| `LogoutConfig` | abstract class; @Injectable; public API | `logout` | `` { /** * Route to redirect to after a successful logout. * Accepts a semantic route name registered in the routing config (e.g. `'home'`, `'login'`), * or a raw… `` | sì | `defaultLogoutConfig` = `{ logout: { redirectRoute: 'home', }, }` (`core-libs/storefront/cms-components/user/logout/config/default-logout-config.ts:L9-L13`) | `core-libs/storefront/cms-components/user/logout/config/logout-config.ts:L10-L25` |
| `MediaConfig` | abstract class; @Injectable; public API | `media` | `{ /** * Picture element configuration holds the media queries assigned to * a format. * The order of formats matters. * <source> elements in <picture> will be …` | sì |  | `core-libs/storefront/shared/components/media/media.config.ts:L19-L77` |
| 〃 |  | `mediaFormats` | `{ /** * Represents the media format code, that is the key to distinguish different * media in a container. */ [format: string]: MediaFormatSize; }` | sì |  |  |
| 〃 |  | `imageLoadingStrategy` | `ImageLoadingStrategy` | sì |  |  |
| `OnNavigateConfig` | abstract class; @Injectable; public API | `enableResetViewOnNavigate` | `{ active?: boolean; ignoreQueryString?: boolean; ignoreRoutes?: string[]; /** * When set, finds the element with the tag name matching this string * to return …` | sì | `defaultOnNavigateConfig` = `{ enableResetViewOnNavigate: { active: true, ignoreQueryString: false, ignoreRoutes: [], selectedHostElement: 'body', }…` (`core-libs/storefront/router/config/default-on-navigate-config.ts:L9-L16`) | `core-libs/storefront/router/config/on-navigate-config.ts:L10-L27` |
| `PaginationConfig` | abstract class; @Injectable; public API | `pagination` | `PaginationOptions` | sì | `defaultPaginationConfig` = `{ pagination: { addStart: true, addEnd: true, }, }` (`core-libs/storefront/shared/components/list-navigation/pagination/config/default-pagination.config.ts:L9-L14`) | `core-libs/storefront/shared/components/list-navigation/pagination/config/pagination.config.ts:L11-L17` |
| `PersistFocusConfig` | interface; extends BlockFocusConfig | `key` | `string` | sì |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L31-L62` |
| 〃 |  | `group` | `string` | sì |  |  |
| 〃 |  | `focusTargetSelector` | `string` | sì |  |  |
| 〃 |  | `clearOnRestore` | `boolean` | sì |  |  |
| `PWAModuleConfig` | abstract class; @Injectable; public API | `pwa` | `{ enabled?: boolean; addToHomeScreen?: boolean; }` | sì | `defaultPWAModuleConfig` = `{ pwa: { enabled: false, addToHomeScreen: false, }, }` (`core-libs/storefront/cms-structure/pwa/pwa.module-config.ts:L21-L26`) | `core-libs/storefront/cms-structure/pwa/pwa.module-config.ts:L10-L19` |
| `SearchBoxConfig` | interface; public API | `displaySuggestions` | `boolean \| string` | sì |  | `core-libs/storefront/cms-components/navigation/search-box/search-box.model.ts:L7-L18` |
| 〃 |  | `displayProducts` | `boolean \| string` | sì |  |  |
| 〃 |  | `displayProductImages` | `boolean \| string` | sì |  |  |
| 〃 |  | `maxProducts` | `number` | sì |  |  |
| 〃 |  | `maxSuggestions` | `number` | sì |  |  |
| 〃 |  | `minCharactersBeforeRequest` | `number` | sì |  |  |
| 〃 |  | `recentSearches` | `boolean \| string` | sì |  |  |
| 〃 |  | `maxRecentSearches` | `number` | sì |  |  |
| 〃 |  | `trendingSearches` | `boolean \| string` | sì |  |  |
| 〃 |  | `maxTrendingSearches` | `number` | sì |  |  |
| `SeoConfig` | abstract class; @Injectable; public API | `seo` | `SeoOptions` | sì | `defaultSeoConfig` = `{ seo: { structuredData: { disableInDevMode: true, }, }, }` (`core-libs/storefront/cms-structure/seo/config/default-seo.config.ts:L9-L15`) | `core-libs/storefront/cms-structure/seo/config/seo.config.ts:L10-L16` |
| `SkipFocusConfig` | interface; public API | `isEnabled` | `boolean` | no |  | `core-libs/storefront/layout/a11y/keyboard-focus/skip-focus.directive.ts:L17-L24` |
| 〃 |  | `activeElementSelectors` | `string[]` | sì |  |  |
| `SkipLinkConfig` | abstract class; @Injectable; public API | `skipLinks` | `SkipLink[]` | sì | `defaultSkipLinkConfig` = `{ skipLinks: [ { key: 'cx-header', i18nKey: 'skipLink.labels.header', }, { key: 'cx-main', i18nKey: 'skipLink.labels.ma…` (`core-libs/storefront/layout/a11y/skip-link/config/default-skip-link.config.ts:L9-L21`) | `core-libs/storefront/layout/a11y/skip-link/config/skip-link.config.ts:L10-L16` |
| `TabConfig` | interface; public API | `label` | `Translatable \| string` | sì | `defaultTabConfig` = `{ openTabs: [0], breakpoint: BREAKPOINT.md, }` (`core-libs/storefront/cms-components/content/tab-paragraph-container/tab-paragraph-container.component.ts:L39-L42`) | `core-libs/storefront/cms-components/content/tab/tab.model.ts:L39-L63` |
| 〃 |  | `mode` | `TAB_MODE` | sì |  |  |
| 〃 |  | `breakpoint` | `BREAKPOINT` | sì |  |  |
| 〃 |  | `openTabs` | `number[]` | sì |  |  |
| 〃 |  | `restrictDirectionKeys` | `boolean` | sì |  |  |
| `TabFocusConfig` | interface; extends AutoFocusConfig | `tab` | `boolean \| 'scroll' \| string` | sì |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L98-L100` |
| `TableConfig` | abstract class; @Injectable; public API | `table` | `{ [tableType: string]: ResponsiveTableConfiguration; }` | sì | `defaultTableConfig` = `{ tableOptions: { headerComponent: TableHeaderCellComponent, dataComponent: TableDataCellComponent, }, }` (`core-libs/storefront/shared/components/table/config/default-table.config.ts:L11-L16`) | `core-libs/storefront/shared/components/table/config/table.config.ts:L20-L43` |
| 〃 |  | `tableOptions` | `` { /** * Global component to render table header _content_ (`<th>...</th>`). A specific component * can be configured alternatively per table or table field. */… `` | sì |  |  |
| `TrapFocusConfig` | interface; extends TabFocusConfig | `trap` | `TrapFocusType` | sì |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L135-L140` |
| 〃 |  | `trapTabOnly` | `TrapFocusType` | sì |  |  |
| `ViewConfig` | abstract class; @Injectable; public API | `view` | `{ /** * Configurations related to the view of the application */ defaultPageSize?: number; infiniteScroll?: { active?: boolean; productLimit?: number; showMore…` | sì | `defaultViewConfig` = `{ view: { defaultPageSize: 12, infiniteScroll: { active: false, productLimit: 0, showMoreButton: false, }, }, }` (`core-libs/storefront/cms-components/product/config/default-view-config.ts:L9-L18`) | `core-libs/storefront/shared/config/view-config.ts:L10-L26` |
| `VisibleFocusConfig` | interface | `disableMouseFocus` | `boolean` | sì |  | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L19-L25` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultAnonymousConsentLayoutConfig` | `LayoutConfig` | `{ launch: { ANONYMOUS_CONSENT: { inlineRoot: true, component: AnonymousConsentDialogComponent, dialogType: DIALOG_TYPE.…` | no | `core-libs/storefront/cms-components/anonymous-consent-management/default-anonymous-consent-layout.config.ts:L11-L19` |
| `defaultCouponLayoutConfig` | `LayoutConfig` | `{ launch: { COUPON: { inlineRoot: true, component: CouponDialogComponent, dialogType: DIALOG_TYPE.DIALOG, }, CLAIM_DIAL…` | no | `core-libs/storefront/cms-components/myaccount/my-coupons/default-coupon-card-layout.config.ts:L11-L24` |
| `defaultDirectionConfig` | `DirectionConfig` | `{ direction: { detect: true, default: DirectionMode.LTR, // we're not polluting the system with all defaults for ltr, b…` | no | `core-libs/storefront/layout/direction/config/default-direction.config.ts:L10-L19` |
| `defaultFormConfig` | `FormConfig` | `{ form: { passwordVisibilityToggle: true, }, }` | no | `core-libs/storefront/shared/config/default-form-config.ts:L9-L13` |
| `defaultIconConfig` | `IconConfig` | `{ icon: { flipDirection: { CARET_RIGHT: DirectionMode.RTL, CARET_LEFT: DirectionMode.RTL, }, }, }` | no | `core-libs/storefront/cms-components/misc/icon/default-icon.config.ts:L10-L17` |
| `defaultLayoutConfig` | `LayoutConfig` | `{ breakpoints: { xs: 576, sm: 768, md: 992, lg: 1200, xl: { min: 1200, }, }, }` | sì | `core-libs/storefront/layout/config/default-layout.config.ts:L9-L19` |
| `defaultLcpCmsComponentsConfig` | `LcpCmsComponentsConfig` | `{ lcpCmsComponents: { idMarker: '__cxLCP__', ids: [], }, }` | no | `core-libs/storefront/cms-structure/cms-lcp-context/config/default-lcp-cms-components.config.ts:L9-L14` |
| `defaultLogoutConfig` | `LogoutConfig` | `{ logout: { redirectRoute: 'home', }, }` | sì | `core-libs/storefront/cms-components/user/logout/config/default-logout-config.ts:L9-L13` |
| `defaultOnNavigateConfig` | `OnNavigateConfig` | `{ enableResetViewOnNavigate: { active: true, ignoreQueryString: false, ignoreRoutes: [], selectedHostElement: 'body', }…` | sì | `core-libs/storefront/router/config/default-on-navigate-config.ts:L9-L16` |
| `defaultPaginationConfig` | `PaginationConfig` | `{ pagination: { addStart: true, addEnd: true, }, }` | sì | `core-libs/storefront/shared/components/list-navigation/pagination/config/default-pagination.config.ts:L9-L14` |
| `defaultPWAModuleConfig` | `PWAModuleConfig` | `{ pwa: { enabled: false, addToHomeScreen: false, }, }` | sì | `core-libs/storefront/cms-structure/pwa/pwa.module-config.ts:L21-L26` |
| `defaultSeoConfig` | `SeoConfig` | `{ seo: { structuredData: { disableInDevMode: true, }, }, }` | sì | `core-libs/storefront/cms-structure/seo/config/default-seo.config.ts:L9-L15` |
| `defaultSkipLinkConfig` | `SkipLinkConfig` | `{ skipLinks: [ { key: 'cx-header', i18nKey: 'skipLink.labels.header', }, { key: 'cx-main', i18nKey: 'skipLink.labels.ma…` | sì | `core-libs/storefront/layout/a11y/skip-link/config/default-skip-link.config.ts:L9-L21` |
| `defaultStockNotificationLayoutConfig` | `LayoutConfig` | `{ launch: { STOCK_NOTIFICATION: { inlineRoot: true, component: StockNotificationDialogComponent, dialogType: DIALOG_TYP…` | no | `core-libs/storefront/cms-components/product/stock-notification/stock-notification-dialog/default-stock-notification-layout.config.ts:L11-L19` |
| `defaultTabConfig` |  | `{ openTabs: [0], breakpoint: BREAKPOINT.md, }` | no | `core-libs/storefront/cms-components/content/tab-paragraph-container/tab-paragraph-container.component.ts:L39-L42` |
| `defaultTableConfig` | `TableConfig` | `{ tableOptions: { headerComponent: TableHeaderCellComponent, dataComponent: TableDataCellComponent, }, }` | sì | `core-libs/storefront/shared/components/table/config/default-table.config.ts:L11-L16` |
| `defaultViewConfig` | `ViewConfig` | `{ view: { defaultPageSize: 12, infiniteScroll: { active: false, productLimit: 0, showMoreButton: false, }, }, }` | sì | `core-libs/storefront/cms-components/product/config/default-view-config.ts:L9-L18` |

## @spartacus/subscription-billing

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends ExtendSubscriptionFrequencyDropdownOptionsConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/subscription-billing/root/config/extend-subscription-dropdown-options-config.ts:L22-L22` |
| `ExtendSubscriptionFrequencyDropdownOptionsConfig` | abstract class; @Injectable; public API | `Months` | `number` | sì |  | `feature-libs/subscription-billing/root/config/extend-subscription-dropdown-options-config.ts:L10-L19` |
| 〃 |  | `Years` | `number` | sì |  |  |
| 〃 |  | `Days` | `number` | sì |  |  |
| 〃 |  | `Weeks` | `number` | sì |  |  |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultOccSubscriptionBillingConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { ...subscriptionBillingEndpoints, product: { subscription: 'products/${productCode}?fie…` | no | `feature-libs/subscription-billing/occ/config/default-occ-subscription-billing-config.ts:L31-L43` |
| `defaultSubscriptionBillingRoutingConfig` | `RoutingConfig` | `{ routing: { routes: { subscriptions: { paths: ['my-account/subscriptions'], }, subscriptionDetails: { paths: ['my-acco…` | sì | `feature-libs/subscription-billing/root/config/default-subscription-billing-routing-config.ts:L9-L28` |

## @spartacus/tracking

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `AepCollectorConfig` | interface; extends TmsCollectorConfig | `scriptUrl` | `string` | sì |  | `feature-libs/tracking/tms/aep/config/default-aep.config.ts:L10-L12` |
| `Config` | interface; extends PersonalizationConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/tracking/personalization/root/config/personalization-config.ts:L29-L29` |
| `Config` | interface; extends TmsConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/tracking/tms/core/config/tms-config.ts:L50-L50` |
| `GtmCollectorConfig` | interface; extends TmsCollectorConfig | `gtmId` | `string` | sì |  | `feature-libs/tracking/tms/gtm/config/default-gtm.config.ts:L10-L12` |
| `PersonalizationConfig` | abstract class; @Injectable; public API | `personalization` | `{ enabled?: boolean; httpHeaderName?: { id: string; timestamp: string; }; context?: { slotPosition: string; componentId: string; }; }` | sì | `defaultPersonalizationConfig` = `{ personalization: { enabled: false, httpHeaderName: { id: 'Occ-Personalization-Id', timestamp: 'Occ-Personalization-Ti…` (`feature-libs/tracking/personalization/root/config/default-personalization-config.ts:L9-L21`) | `feature-libs/tracking/personalization/root/config/personalization-config.ts:L10-L26` |
| `TmsCollectorConfig` | interface; public API | `debug` | `boolean` | sì |  | `feature-libs/tracking/tms/core/config/tms-config.ts:L14-L29` |
| 〃 |  | `dataLayerProperty` | `string` | sì |  |  |
| 〃 |  | `events` | `AbstractType<CxEvent>[]` | sì |  |  |
| 〃 |  | `collector` | `Type<TmsCollector>` | sì |  |  |
| `TmsConfig` | abstract class; @Injectable; public API | `tagManager` | `TmsCollectors` | sì |  | `feature-libs/tracking/tms/core/config/tms-config.ts:L38-L47` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultAdobeExperiencePlatformConfig` | `TmsConfig` | `{ tagManager: { aep: { collector: AepCollectorService, }, }, }` | no | `feature-libs/tracking/tms/aep/config/default-aep.config.ts:L20-L26` |
| `defaultGoogleTagManagerConfig` | `TmsConfig` | `{ tagManager: { gtm: { collector: GtmCollectorService, }, }, }` | no | `feature-libs/tracking/tms/gtm/config/default-gtm.config.ts:L20-L26` |
| `defaultPersonalizationConfig` | `PersonalizationConfig` | `{ personalization: { enabled: false, httpHeaderName: { id: 'Occ-Personalization-Id', timestamp: 'Occ-Personalization-Ti…` | no | `feature-libs/tracking/personalization/root/config/default-personalization-config.ts:L9-L21` |

## @spartacus/user

### Classi e interfacce `*Config`

| Config | Tipo | Chiave | Tipo chiave | Opzionale | Default (stessa radice) | Riferimento |
|---|---|---|---|---|---|---|
| `Config` | interface; extends UserAccountConfig; declare module '@spartacus/core' | `(nessuna chiave propria)` |  |  |  | `feature-libs/user/account/root/config/user-account-config.ts:L26-L26` |
| `UserAccountConfig` | abstract class; @Injectable; public API | `userAccount` | `{ /** * When enabled, applies the user's preferred currency (from OCC GET /users/{userId}) * on login, and reverts to the pre-login currency stored in localSto…` | sì | `defaultUserAccountConfig` = `{ userAccount: { enableUserCurrencySync: false, }, }` (`feature-libs/user/account/root/config/default-user-account-config.ts:L9-L13`) | `feature-libs/user/account/root/config/user-account-config.ts:L10-L23` |

### Costanti `default*Config`

| Costante | Tipo dichiarato | Valore (troncato 120) | public API | Riferimento |
|---|---|---|---|---|
| `defaultCloseDialogModalLayoutConfig` | `LayoutConfig` | `{ launch: { CLOSE_ACCOUNT: { inline: true, component: CloseAccountModalComponent, dialogType: DIALOG_TYPE.DIALOG, }, },…` | no | `feature-libs/user/profile/components/close-account/components/close-account-modal/default-close-account-modal-layout.config.ts:L10-L18` |
| `defaultOccUserAccountConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { user: 'users/${userId}', createVerificationToken: 'users/anonymous/verificationToken',…` | sì | `feature-libs/user/account/occ/adapters/config/default-occ-user-account-endpoint.config.ts:L9-L18` |
| `defaultOccUserProfileConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { userRegister: 'users', userForgotPassword: 'forgottenpasswordtokens', userRestoreToken…` | sì | `feature-libs/user/profile/occ/adapters/config/default-occ-user-profile-endpoint.config.ts:L9-L23` |
| `defaultOccUserWishlistConfig` | `OccConfig` | `{ backend: { occ: { endpoints: { getWishlists: 'users/${userId}/wishlists', getWishlistEntries: 'users/${userId}/wishli…` | sì | `feature-libs/user/wishlist/occ/adapters/config/default-occ-user-wishlist-endpoint.config.ts:L9-L21` |
| `defaultSuggestedAddressesDialogLayoutConfig` | `LayoutConfig` | `{ launch: { SUGGESTED_ADDRESSES: { inlineRoot: true, component: SuggestedAddressDialogComponent, dialogType: DIALOG_TYP…` | no | `feature-libs/user/profile/components/address-book/address-form/suggested-addresses-dialog/default-suggested-addresses-dialog-layout.config.ts:L10-L18` |
| `defaultUserAccountConfig` | `UserAccountConfig` | `{ userAccount: { enableUserCurrencySync: false, }, }` | sì | `feature-libs/user/account/root/config/default-user-account-config.ts:L9-L13` |
| `defaultVerificationTokenLayoutConfig` | `LayoutConfig` | `{ launch: { [LAUNCH_CALLER.ACCOUNT_VERIFICATION_TOKEN]: { inlineRoot: true, component: VerificationTokenDialogComponent…` | no | `feature-libs/user/account/components/verification-token-form/default-verification-token-layout.config.ts:L14-L22` |
