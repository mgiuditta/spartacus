# Inventario: `integration-libs/*`

> SHA `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`. Tutti i path sono relativi alla root del repo.
> Conteggi = `git ls-files <dir> | grep -E '\.(ts|scss|html)$' | grep -v spec | wc -l` (include `schematics/`, `assets/translations`, `styles/`).
> ⚠️ DA VERIFICARE: i `package.json` delle integration libs dichiarano `"version": "221121.22.0"` (es. `integration-libs/cdc/package.json:L3-L3`) e peer `@spartacus/*` `221121.22.0`, non `2612.0.0` come indicato in AGENT_RULES. Il numero di versione "2612" non compare in questi file.

## 1. Vista d'insieme

| lib | scopo (README/codice) | backend / addon richiesto | entry point secondari | file non-spec |
|---|---|---|---|---|
| `cdc` | Identity management via SAP Customer Data Cloud (Gigya) | CDC (JS SDK caricato da `cdc[].javascriptUrl`) + OCC | `assets`, `components`, `core`, `organization/administration`, `organization/user-registration`, `root`, `user-account`, `user-profile` | 115 |
| `cdp` | Integrazione SAP Customer Data Platform (customer ticketing) | CDP ⚠️ DA VERIFICARE (nessuna config/endpoint nella lib: solo override di component service) | `customer-ticketing` | 9 |
| `cds` | Merchandising carousel, ProfileTag/tracking, recent & trending searches | CDS (`cds.tenant`, `cds.baseUrl`, `endpoints.strategyProducts/searchIntelligence`) | `assets` | 110 |
| `cpq-quote` | Percentuale di sconto CPQ nella tabella Quote | Quote CPQ lato Commerce ⚠️ DA VERIFICARE (nessun adapter/endpoint nella lib) | `assets`, `cpq-quote-discount`, `root` | 40 |
| `digital-payments` | Pagamento tramite SAP Digital Payments (PSP) | Endpoint OCC `.../payment/digitalPayments/request|response` | `assets` | 57 |
| `epd-visualization` | **DEPRECATA**. Viewer 2D/3D e visual picking ricambi | SAP EPD Visualization services + SAPUI5; sample data `epdvisualizationspartacussampledata` (README) | `assets`, `components`, `core`, `epd-visualization-api`, `root` | 129 |
| `omf` | Order Management Foundation: storico ordini con `guid` | OMF; header `guid` | `order`, `root` | 15 |
| `opf` | Open Payment Framework: checkout/pagamenti/CTA/quick-buy/gift-card/tokenisation | OPF (`opf.opfBaseUrl`, `opf.commerceCloudPublicKey`) + OCC | `base`(+`components`,`core`,`opf-api`,`root`), `checkout`(+`assets`,`components`,`root`), `b2b-checkout`(+`components`,`core`,`root`), `cta`(+`components`,`core`,`opf-api`,`root`), `gift-card`(+`assets`,`components`,`core`,`occ`,`root`), `global-functions`(+`core`,`root`), `order`, `payment`(+`assets`,`core`,`occ`,`opf-api`,`root`), `quick-buy`(+`components`,`core`,`occ`,`opf-api`,`pickup-in-store`,`root`), `tokenisation`(+`components`,`core`,`root`) | 582 |
| `opps` | Omnichannel Promotion Pricing Service (coupon codes, login-required) | OPPS; richiede Personalization (README) | `root` | 17 |
| `punchout` | Sessioni punchout (procurement B2B): sessione, requisition, restrizioni UI | Endpoint OCC `punchout/sessions/${sessionId}` | `assets`, `components`, `core`, `occ`, `root` | 82 |
| `s4-service` | Service order S/4HANA Service: checkout con dettagli servizio, cancel/reschedule | S/4HANA Service via OCC | `assets`, `checkout`, `order`, `root` | 118 |
| `s4om` | S/4HANA Synchronous Order Management: schedule lines (+ RDD, PDF invoices) | S/4HANA OM ⚠️ DA VERIFICARE (nessun adapter proprio) | `assets`, `root` | 40 |
| `segment-refs` | Personalizzazione per segmenti esterni (Emarsys) | Header configurabile `segmentRefs.httpHeaderName` | `root` | 11 |

Entry point = cartelle con `ng-package.json` annidato (ricavate via glob `integration-libs/*/**/ng-package.json`); il nome pubblico è `@spartacus/<lib>/<path>` (es. import `@spartacus/cdc/components` in `integration-libs/cdc/cdc.module.ts:L8-L8`).

## 2. Override di servizi core/feature-libs tramite DI (tabella trasversale)

Legenda tipo: **S** = sostituzione di un token esistente (`useClass`/`useExisting`/`useValue`/`useFactory` su classe/token di altra lib); **C** = rimappatura CMS (`cmsComponents.<chiave esistente>` → nuovo componente o nuovi providers); **M** = contributo a token `multi` di core/feature (aggiunge, non sostituisce).

| lib | token sostituito (origine import) | sostituto | tipo | dove |
|---|---|---|---|---|
| cdc | `LogoutGuard`, `LoginGuard` (`@spartacus/storefront`); `LoginAsGuestGuard` (`@spartacus/user/account/components`) | `CdcLogoutGuard`, `CdcLoginGuard`, `CdcLoginAsGuestGuard` | S | `integration-libs/cdc/root/cdc-root.module.ts:L57-L59` |
| cdc | `UserConsentAdapter` (`@spartacus/core`) | `CdcUserConsentAdapter` (extends `OccUserConsentAdapter`) | S | `integration-libs/cdc/root/consent-management/cdc-consent.module.ts:L19-L19` |
| cdc | `ConsentManagementComponentService` (`@spartacus/storefront`) | `CdcConsentManagementComponentService` | S | `integration-libs/cdc/root/consent-management/cdc-consent.module.ts:L20-L23` |
| cdc | `B2BUserService`, `OrgUnitService` (`@spartacus/organization/administration/core`) | `CdcB2BUserService`, `CdcOrgUnitService` (root injector **e** providers CMS) | S+C | `integration-libs/cdc/organization/administration/cdc-administration.module.ts:L26-L59` |
| cdc | `UserListService` (`@spartacus/organization/administration/components`) | `CdcUserListService` (solo in `ManageUsersListComponent.providers`) | C | `integration-libs/cdc/organization/administration/cdc-administration.module.ts:L28-L37` |
| cdc | `UserRegistrationFormService` (`@spartacus/organization/user-registration/components`) | `CDCB2BRegisterComponentService` | S | `integration-libs/cdc/organization/user-registration/cdc-b2b-register.module.ts:L33-L38` |
| cdc | `LoginFormComponentService` (`@spartacus/user/account/components`) in `ReturningCustomerLoginComponent` | `CdcLoginFormComponentService`; anche `authentication.customLoginPage: undefined` | C | `integration-libs/cdc/user-account/login-form/cdc-login-form.module.ts:L44-L68` |
| cdc | `RegisterComponentService` in `RegisterCustomerComponent` (`@spartacus/user/profile/components`) | `CDCRegisterComponentService` | C | `integration-libs/cdc/user-profile/register/cdc-register.module.ts:L39-L50` |
| cdc | `UpdateProfileComponentService` in `UpdateProfileComponent` | `CDCUpdateProfileComponentService` | C | `integration-libs/cdc/user-profile/update-profile/cdc-update-profile.module.ts:L40-L51` |
| cdc | `UpdateEmailComponentService` in `UpdateEmailComponent` | `CDCUpdateEmailComponentService` | C | `integration-libs/cdc/user-profile/update-email/cdc-update-email.module.ts:L38-L49` |
| cdc | `UpdatePasswordComponentService` in `UpdatePasswordComponent` | `CDCUpdatePasswordComponentService` | C | `integration-libs/cdc/user-profile/update-password/cdc-update-password.module.ts:L38-L49` |
| cdc | `ForgotPasswordComponentService` in `ForgotPasswordComponent` | `CDCForgotPasswordComponentService` | C | `integration-libs/cdc/user-profile/forgot-password/cdc-forgot-password.module.ts:L35-L47` |
| cdp | `CustomerTicketingCloseComponentService`, `...ReopenComponentService`, `...MessagesComponentService` (`@spartacus/customer-ticketing/components`) | `CdpCustomerTicketing{Close,Reopen,Messages}ComponentService` | S | `integration-libs/cdp/customer-ticketing/cdp-customer-ticketing.module.ts:L20-L31` |
| cds | `HTTP_INTERCEPTORS` (`@angular/common/http`) | `ConsentReferenceInterceptor`, `DebugInterceptor` | M | `integration-libs/cds/src/profiletag/profile-tag.module.ts:L19-L24` |
| cpq-quote | `CartItemListComponentService` (`@spartacus/cart/base/components`) | `CpqQuoteSharedService` | S | `integration-libs/cpq-quote/cpq-quote-discount/cpq-discount.module.ts:L41-L41` |
| digital-payments | CMS `CheckoutPaymentDetails` (checkout base) | `DpPaymentMethodComponent` (extends `CorePaymentMethodComponent`) | C | `integration-libs/digital-payments/src/checkout/cms-components/dp-payment-method/dp-payment-method.module.ts:L32-L38` |
| omf | `OrderHistoryAdapter` (`@spartacus/order/core`) | `OccOmfOrderHistoryAdapter` (extends `OccOrderHistoryAdapter`) | S | `integration-libs/omf/order/omf-order.module.ts:L19-L19` |
| omf | `OrderHistoryFacade` (`@spartacus/order/root`) | `OmfOrderHistoryService` (extends `OrderHistoryService`) | S | `integration-libs/omf/order/omf-order.module.ts:L20-L23` |
| opf/base | `GlobalMessageService` (`@spartacus/core`) | `OpfGlobalMessageService` (extends `GlobalMessageService`) | S | `integration-libs/opf/base/root/opf-base-root.module.ts:L25-L28` |
| opf/checkout | `CheckoutAuthGuard` (`@spartacus/checkout/base/components`) | `OpfCheckoutAuthGuard` | S | `integration-libs/opf/checkout/root/opf-checkout-root.module.ts:L44-L47` |
| opf/b2b-checkout | `CheckoutB2BStepsSetGuard` (`@spartacus/checkout/b2b/components`) | `OpfB2bCheckoutStepsSetGuard` (extends `CheckoutStepsSetGuard`) | S | `integration-libs/opf/b2b-checkout/root/opf-b2b-checkout-root.module.ts:L39-L42` |
| opf/b2b-checkout | `CheckoutPaymentTypeFacade` (`@spartacus/checkout/b2b/root`) | `OpfB2bCheckoutPaymentTypeService` | S | `integration-libs/opf/b2b-checkout/core/facade/facade-providers.ts:L11-L17` |
| opf/tokenisation | `UserPaymentAdapter` (`@spartacus/core`) | `OccOpfTokenisationUserPaymentAdapter` (extends `OccUserPaymentAdapter`) | S | `integration-libs/opf/tokenisation/root/opf-tokenisation-root.module.ts:L37-L40` |
| opf/tokenisation | CMS `CheckoutPaymentDetails`, `AccountPaymentDetailsComponent` | `OpfTokenisationPaymentMethodComponent`, `OpfTokenisationAccountPaymentMethodsComponent` | C | `.../opf-tokenisation-payment-method/opf-tokenisation-payment-method.module.ts:L38-L45`, `.../opf-tokenisation-account-payment-methods/opf-tokenisation-account-payment-methods.module.ts:L34-L41` (sotto `integration-libs/opf/tokenisation/root/components/`) |
| opf/gift-card | `ORDER_NORMALIZER` (`@spartacus/order/root`), `CART_NORMALIZER` (`@spartacus/cart/base/root`), `HTTP_INTERCEPTORS` | `OpfGiftCardOrderOccNormalizer`, `OpfGiftCardCartOccNormalizer`, `OpfGiftCardPaymentApiInterceptor` | M | `integration-libs/opf/gift-card/root/opf-gift-card-root.module.ts:L47-L61` |
| opf/gift-card | CMS `CheckoutOrderSummary`, `AccountOrderDetailsTotalsComponent`, `OrderConfirmationTotalsComponent` | `OpfGiftCard{CheckoutOrderSummary,OrderDetailTotals,OrderConfirmationTotals}Component` | C | `integration-libs/opf/gift-card/root/components/opf-gift-card-checkout/opf-gift-card-checkout.module.ts:L35-L41`, `.../opf-gift-card-order-details/opf-gift-card-order-details.module.ts:L23-L30`, `.../opf-gift-card-order-confirmation/opf-gift-card-order-confirmation.module.ts:L15-L22` |
| opf/gift-card | (OCC cart) | `OccOpfGiftCardAdapter` extends `OccCartAdapter` | estende | `integration-libs/opf/gift-card/occ/adapters/occ-opf-gift-card.adapter.ts:L28-L83` |
| opf/order | `ORDER_NORMALIZER` | `OpfOccOrderNormalizer` | M | `integration-libs/opf/order/opf-order.module.ts:L13-L17` |
| opps | `BEFORE_CMS_PAGE_GUARD` (`@spartacus/storefront`) | `OppsLoginRequiredGuard` | M | `integration-libs/opps/root/login-required/opps-login-required.module.ts:L13-L17` |
| opps | `HTTP_INTERCEPTORS` | `OccOppsCouponCodesInterceptor` | M | `integration-libs/opps/root/coupon-codes/http-interceptors/index.ts:L13-L14` |
| punchout | `AuthHttpHeaderService` (`@spartacus/core`) | factory: con toggle `enableExpiredRefreshTokenHandlers` → `DELEGATED_`/`DEFAULT_AUTH_HTTP_HEADER_SERVICE`, altrimenti `PunchoutAuthHttpHeaderService` | S | `integration-libs/punchout/root/punchout.root.module.ts:L50-L66` |
| punchout | `EXPIRED_REFRESH_TOKEN_HANDLERS` (`@spartacus/core`) | `PunchoutExpiredRefreshTokenHandler` | M | `integration-libs/punchout/root/punchout.root.module.ts:L67-L71` |
| punchout | `BEFORE_CMS_PAGE_GUARD`, `HTTP_INTERCEPTORS`, `APP_BOOTSTRAP_LISTENER` | `PunchoutNavigationGuard`, `PunchoutCartInterceptor`, `PunchoutUiRestrictionService.init` | M | `integration-libs/punchout/root/guards/punchout-navigation.module.ts:L14-L18`, `integration-libs/punchout/root/interceptors/index.ts:L13-L14`, `integration-libs/punchout/root/punchout.root.module.ts:L73-L81` |
| s4-service | `CheckoutConfig` (`@spartacus/checkout/base/root`) | `useValue: defaultServiceDetailsCheckoutConfig` (sostituisce il token, non merge di config) | S | `integration-libs/s4-service/root/s4-service-root.module.ts:L75-L75` |
| s4-service | `CheckoutStepsSetGuard` (`@spartacus/checkout/base/components`) | `CheckoutServiceOrderStepsSetGuard` (extends `CheckoutB2BStepsSetGuard`) | S | `integration-libs/s4-service/checkout/components/s4-service-checkout-component.module.ts:L20-L25` |
| s4-service | `OrderOverviewComponentService` (`@spartacus/order/components`) | `ServiceOrderOverviewComponentService` | S | `integration-libs/s4-service/order/components/order-summary/service-details-card.module.ts:L20-L23` |
| s4-service | CMS `CheckoutReviewOrder`, `CheckoutDeliveryMode`, `AccountOrderDetailsActionsComponent` | `ServiceCheckoutReviewSubmitComponent`, `ServiceCheckoutDeliveryModeComponent`, `S4ServiceOrderDetailActionsComponent` | C | `integration-libs/s4-service/checkout/components/checkout-review-submit/service-checkout-review-submit.module.ts:L41-L48`, `.../checkout-delivery-mode/service-checkout-delivery-mode.module.ts:L35-L41`, `integration-libs/s4-service/order/components/s4-service-order-detail-actions/s4-service-order-detail-actions.module.ts:L29-L36` |
| s4om | `ProductCatalogService` (`@spartacus/core`) | `S4omProductCatalogService` (extends, aggiunge `isProductInCatalog`) | S | `integration-libs/s4om/root/s4om-root.module.ts:L29-L32` |
| segment-refs | `HTTP_INTERCEPTORS` | `OccSegmentRefsInterceptor` | M | `integration-libs/segment-refs/root/http-interceptors/index.ts:L13-L14` |

Nota: gli adapter con `useClass` interni alla stessa lib (es. `SceneAdapter → StorageV1Adapter` in EPD, `OpfPaymentAdapter → OpfApiPaymentAdapter` in OPF) non sono override di core: sono il normale binding astratto→concreto e sono elencati nelle sezioni di libreria.

---

## 3. Schede per libreria

### 3.1 `cdc` — `@spartacus/cdc`
- **Scopo**: "integrates SAP Customer Data Cloud for enhanced identity management" (`integration-libs/cdc/README.md`). Inizializza lo script Gigya in `APP_INITIALIZER` dopo `configInit.getStable('context','cdc')` (`integration-libs/cdc/root/cdc-root.module.ts:L26-L38`, `L60-L65`).
- **Backend**: CDC; config `cdc: { baseSite, javascriptUrl, sessionExpiration }[]` (`integration-libs/cdc/root/config/cdc-config.ts:L14-L20`). Addon Commerce lato server ⚠️ DA VERIFICARE (non dichiarato nel codice della lib).
- **public_api**: `export * from './cdc.module'` (`integration-libs/cdc/public_api.ts:L7-L7`).
- **peerDependencies**: `integration-libs/cdc/package.json:L25-L41` (core, storefront, user, organization, asm, ngrx, ng-select).

| cartella | tema | note |
|---|---|---|
| `root/` (3 + config 3, consent-management 12, events 2, facade 2, guards 4, service 2) | entry eager: `CdcRootModule`, config, guard override, consent, `CdcJsService` | `CdcRootModule` `integration-libs/cdc/root/cdc-root.module.ts:L53-L69`; `CdcJsService` `integration-libs/cdc/root/service/cdc-js.service.ts:L48-L860`; `CdcAuthFacade` `integration-libs/cdc/root/facade/cdc-auth.facade.ts:L21-L33` |
| `core/` (2 + auth 8, events 3, models 1, store 7) | lazy core: auth service, store, eventi | `CdcCoreModule` `integration-libs/cdc/core/cdc-core.module.ts:L13-L17`; `CdcAuthService` `integration-libs/cdc/core/auth/facade/cdc-auth.service.ts:L29-L146`; `CdcUserAuthenticationTokenService` `integration-libs/cdc/core/auth/services/user-authentication/cdc-user-authentication-token.service.ts:L19-L62`; `CdcStoreModule` `integration-libs/cdc/core/store/cdc-store.module.ts:L14-L18` |
| `components/` (2 + gigya-raas 6) | CMS `GigyaRaasComponent` (+ `GigyaLoginPageTemplate`) | `GigyaRaasModule` `integration-libs/cdc/components/gigya-raas/gigya-raas.module.ts:L14-L35`; `GigyaRaasComponent` `integration-libs/cdc/components/gigya-raas/gigya-raas.component.ts:L35-L148` |
| `user-account/` (2 + login-form 10) | login form + reconsent dialog | `CDCLoginFormModule` `integration-libs/cdc/user-account/login-form/cdc-login-form.module.ts:L31-L71`; `CdcReconsentComponent` `integration-libs/cdc/user-account/login-form/reconsent/cdc-reconsent.component.ts:L54-L191` |
| `user-profile/` (2 + forgot-password 3, register 3, update-email 2, update-password 2, update-profile 2) | override dei component service del profilo | `CDCUserProfileModule` `integration-libs/cdc/user-profile/cdc-user-profile.module.ts:L14-L23`; `CDCRegisterComponentService` `integration-libs/cdc/user-profile/register/cdc-register-component.service.ts:L42-L216` |
| `organization/administration/` (5) | override B2B user/unit per CDC | `CdcAdministrationModule` `integration-libs/cdc/organization/administration/cdc-administration.module.ts:L23-L62` |
| `organization/user-registration/` (3) | registrazione B2B via CDC | `CDCB2BRegisterModule` `integration-libs/cdc/organization/user-registration/cdc-b2b-register.module.ts:L21-L40` |
| `assets/` (1 + translations 18) | i18n | — |
| `schematics/add-cdc` (1) | `ng add` | — |

Simboli chiave aggiuntivi: `CdcModule` (aggrega components+core) `integration-libs/cdc/cdc.module.ts:L11-L14`; feature lazy `CDC_FEATURE`/`CDC_CORE_FEATURE` `integration-libs/cdc/root/cdc-root.module.ts:L40-L51`; `CdcUserConsentAdapter` `integration-libs/cdc/root/consent-management/cdc-user-consent.adapter.ts:L21-L90`; `CdcPreferenceSerializer` (multi `CDC_PREFERENCE_SERIALIZER`) `integration-libs/cdc/root/consent-management/cdc-consent.module.ts:L24-L28`; guard `CdcLogoutGuard` `integration-libs/cdc/root/guards/cdc-logout.guard.ts:L26-L56`.

### 3.2 `cdp` — `@spartacus/cdp`
- **Scopo**: "integrates SAP Customer Data Platform" (README). Nel codice: solo override di 3 component service di customer-ticketing.
- **Backend**: ⚠️ DA VERIFICARE (nessun adapter/config nella lib).
- **public_api**: `export * from './customer-ticketing/public_api'` (`integration-libs/cdp/public_api.ts:L7-L7`).
- **peerDependencies**: `integration-libs/cdp/package.json:L25-L31` (solo `@spartacus/customer-ticketing`).

| cartella | tema | note |
|---|---|---|
| `customer-ticketing/` (5) | override close/reopen/messages | `CdpCustomerTicketingModule` `integration-libs/cdp/customer-ticketing/cdp-customer-ticketing.module.ts:L17-L35`; servizi `cdp-customer-ticketing-{close,reopen,messages}-component.service.ts:L12-L16` |
| `.` (3) | public_api, module index | — |
| `schematics/add-cdp` (1) | `ng add` | — |

### 3.3 `cds` — `@spartacus/cds`
- **Scopo**: merchandising (carousel da strategie), ProfileTag (tracking eventi/consenso), recent & trending searches nel search box. Nessun README nella cartella.
- **Backend**: CDS; `CdsConfig.cds { baseSite, tenant, baseUrl, consentTemplateId, endpoints, merchandising, profileTag }` (`integration-libs/cds/src/config/cds-config.ts:L17-L27`); endpoint `strategyProducts`, `searchIntelligence` (`integration-libs/cds/src/cds-models/cds-endpoints.model.ts:L7-L15`). Default `tenant:''`, `baseUrl:''` (`integration-libs/cds/src/config/default-cds-config.ts:L9-L23`) + validator `integration-libs/cds/src/config/cds-config-validator.ts:L9-L44`.
- **Bootstrap**: `CdsModule.forRoot(config)` (non c'è RootModule/lazy) `integration-libs/cds/src/cds.module.ts:L26-L47`.
- **public_api**: cds-models, cds.module, config, merchandising, profiletag, trending-searches (`integration-libs/cds/public_api.ts:L10-L15`). `recent-searches` non è esportato.
- **peerDependencies**: `integration-libs/cds/package.json:L26-L39` (cart, order, tracking, ngrx store).

| cartella | tema | note |
|---|---|---|
| `src/merchandising/` (33) | strategy adapter/connector, facade prodotti, CMS carousel | `MerchandisingModule` (binding `MerchandisingStrategyAdapter→CdsMerchandisingStrategyAdapter`) `integration-libs/cds/src/merchandising/merchandising.module.ts:L12-L21`; `MerchandisingStrategyConnector` `integration-libs/cds/src/merchandising/connectors/strategy/merchandising-strategy.connector.ts:L16-L28`; `CdsMerchandisingProductService` `integration-libs/cds/src/merchandising/facade/cds-merchandising-product.service.ts:L22-L67`; CMS `MerchandisingCarouselComponent` `integration-libs/cds/src/merchandising/cms-components/merchandising-carousel-cms.module.ts:L26-L32` |
| `src/profiletag/` (27) | ProfileTag script, push eventi, interceptor consenso, notifica backend | `ProfileTagModule` `integration-libs/cds/src/profiletag/profile-tag.module.ts:L16-L32`; `ProfileTagPushEventsService` `integration-libs/cds/src/profiletag/services/profile-tag-push-events.service.ts:L71-L409`; `ProfileTagEventService` `integration-libs/cds/src/profiletag/services/profiletag-event.service.ts:L45-L218`; `CdsBackendNotificationAdapter→OccBackendNotification` `integration-libs/cds/src/profiletag/profile-tag.module.ts:L25-L28`; `TrackingModule` (APP_INITIALIZER `TrackingService.factory`) `integration-libs/cds/src/profiletag/tracking/tracking.module.ts:L10-L20` |
| `src/recent-searches/` (6) | outlet `SearchBoxOutlets.RECENT_SEARCHES(_HEADER)` | `RecentSearchesModule` `integration-libs/cds/src/recent-searches/recent-searches.module.ts:L21-L47` |
| `src/trending-searches/` (7) | outlet `SearchBoxOutlets.TRENDING_SEARCHES` | `TrendingSearchesModule` `integration-libs/cds/src/trending-searches/trending-searches.module.ts:L19-L37` |
| `src/config/` (6), `src/cds-models/` (4), `src/services/` (2), `src/utils/` (1) | config/modelli/utility | — |
| `assets/` (1 + 18), `src/schematics` (1) | i18n, schematics | — |

### 3.4 `cpq-quote` — `@spartacus/cpq-quote`
- **Scopo**: mostra la percentuale di sconto CPQ nella Quote table (README).
- **Backend**: ⚠️ DA VERIFICARE (nessun adapter: i dati arrivano dagli entry del carrello/quote).
- **public_api**: `cpq-quote.module`, `cpq-quote-discount/public_api` (`integration-libs/cpq-quote/public_api.ts:L10-L11`).
- **peerDependencies**: `integration-libs/cpq-quote/package.json:L23-L32`.

| cartella | tema | note |
|---|---|---|
| `cpq-quote-discount/` (4 + components 6) | 3 componenti in outlet `CartOutlets.CPQ_QUOTE_MODULE/CPQ_QUOTE_HEADING/CPQ_QUOTE` + override `CartItemListComponentService` | `CpqDiscountModule` `integration-libs/cpq-quote/cpq-quote-discount/cpq-discount.module.ts:L24-L59`; `CpqQuoteSharedService` `integration-libs/cpq-quote/cpq-quote-discount/cpq-qute-shared.service.ts:L16-L24`; `CpqQuoteService` `integration-libs/cpq-quote/cpq-quote-discount/cpq-qute.service.ts:L13-L23` |
| `root/` (3 + model 3) | `CpqQuoteRootModule` vuoto + modelli | `integration-libs/cpq-quote/root/cpq-quote-root.module.ts:L9-L10` |
| `.` (4), `assets/` (1+18), `schematics/add-cpq-quote` (1) | modulo aggregatore, i18n | `CpqQuoteModule` `integration-libs/cpq-quote/cpq-quote.module.ts:L10-L13` |

### 3.5 `digital-payments` — `@spartacus/digital-payments`
- **Scopo**: "integrates SAP Digital payments with ready-to-use payment service provider connectivity" (README). Sostituisce il componente CMS `CheckoutPaymentDetails`.
- **Backend**: endpoint OCC `paymentRequest`/`paymentDetails` `integration-libs/digital-payments/src/checkout/adapters/config/occ-digital-payments-endpoint.config.ts:L11-L25`; `DigitalPaymentsConfig.digitalPayments.occQueryParams` `L31-L47`.
- **public_api**: `src/checkout/index`, `src/digital-payments.module` (`integration-libs/digital-payments/public_api.ts:L10-L11`).
- **peerDependencies**: `integration-libs/digital-payments/package.json:L24-L37` (cart, checkout).

| cartella | tema | note |
|---|---|---|
| `src/checkout/` (32) | adapter OCC, normalizer, facade, CMS payment method/form/callback/dialog | `DpCheckoutModule` `integration-libs/digital-payments/src/checkout/dp-checkout.module.ts:L21-L42`; `DigitalPaymentsAdapter` `integration-libs/digital-payments/src/checkout/adapters/digital-payments.adapter.ts:L11-L23` → `OccDigitalPaymentsAdapter` `integration-libs/digital-payments/src/checkout/adapters/occ-digital-payments.adapter.ts:L26-L134`; `DpCheckoutPaymentService` `integration-libs/digital-payments/src/checkout/facade/dp-checkout-payment.service.ts:L27-L115`; `DpPaymentMethodModule extends CorePaymentMethodModule` `integration-libs/digital-payments/src/checkout/cms-components/dp-payment-method/dp-payment-method.module.ts:L23-L45`; `DpPaymentMethodComponent` `integration-libs/digital-payments/src/checkout/cms-components/dp-payment-method/dp-payment-method.component.ts:L46-L94` |
| `src/` (1), `src/utils` (1) | `DigitalPaymentsModule` | `integration-libs/digital-payments/src/digital-payments.module.ts:L10-L13` |
| `assets/` (1+18), `schematics/` (1), `.` (3) | i18n, schematics | — |

### 3.6 `epd-visualization` — `@spartacus/epd-visualization` (DEPRECATA)
- **Scopo**: viewer 2D/3D e visual picking (ricambi) da SAP EPD Visualization (README: "DEPRECATED"); `@deprecated since v221121.5.0` `integration-libs/epd-visualization/root/epd-visualization-root.module.ts:L28-L30`.
- **Backend**: EPD Visualization APIs + SAPUI5; `EpdVisualizationConfig.epdVisualization { ui5, apis, usageIds, visualPicking }` `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L19-L45`; default usage IDs `integration-libs/epd-visualization/root/config/epd-visualization-default-config.ts:L12-L35`. Peer `@sapui5/ts-types-esm`.
- **public_api**: `epd-visualization.module` (`integration-libs/epd-visualization/public_api.ts:L7-L7`).
- **peerDependencies**: `integration-libs/epd-visualization/package.json:L35-L48`.

| cartella | tema | note |
|---|---|---|
| `root/` (3 + config 4, models 7, testing 1, util 3) | root module lazy, config, validator | `EpdVisualizationRootModule` `integration-libs/epd-visualization/root/epd-visualization-root.module.ts:L31-L38` |
| `core/` (2 + connectors 11, services 5) | `SceneConnector`/`VisualizationConnector` + adapter astratti; lookup nodo→prodotto | `SceneAdapter` `integration-libs/epd-visualization/core/connectors/scene/scene.adapter.ts:L13-L30`; `VisualizationConnector` `integration-libs/epd-visualization/core/connectors/visualization/visualization.connector.ts:L19-L40`; `SceneNodeToProductLookupService` `integration-libs/epd-visualization/core/services/scene-node-to-product-lookup/scene-node-to-product-lookup.service.ts:L34-L235` |
| `epd-visualization-api/` (2 + adapters 2) | implementazioni REST v1 | `EpdVisualizationApiModule` (`SceneAdapter→StorageV1Adapter`, `VisualizationAdapter→VisualizationV1Adapter`) `integration-libs/epd-visualization/epd-visualization-api/epd-visualization-api.module.ts:L18-L24` |
| `components/visual-viewer/` (24) | viewer UI5 | `VisualViewerService` `integration-libs/epd-visualization/components/visual-viewer/visual-viewer.service.ts:L77-L1639` |
| `components/visual-picking/` (26) | CMS `VisualPickingTabComponent`, product list, compact add-to-cart (extends `AddToCartComponent`) | `VisualPickingTabModule` `integration-libs/epd-visualization/components/visual-picking/visual-picking-tab/visual-picking-tab.module.ts:L19-L40` |
| `styles/` (1+10), `assets/` (1+19), `schematics/` (1), `.` (5) | stili, i18n | — |

### 3.7 `omf` — `@spartacus/omf`
- **Scopo**: storico/dettaglio ordini via SAP Order Management Foundation (README); aggiunge `guid` ai query params (`integration-libs/omf/order/omf-order-history.service.ts:L13-L24`).
- **Backend**: OMF; `omf.guidHttpHeaderName: 'guid'` `integration-libs/omf/order/config/default-omf-config.ts:L9-L13`.
- **public_api**: `root/public_api` (`integration-libs/omf/public_api.ts:L7-L7`).
- **peerDependencies**: `integration-libs/omf/package.json:L23-L33` (order).

| cartella | tema | note |
|---|---|---|
| `order/` (4 + config 2) | override adapter+facade order history | `OmfOrderModule` `integration-libs/omf/order/omf-order.module.ts:L15-L26`; `OccOmfOrderHistoryAdapter` `integration-libs/omf/order/occ-omf-order-history.adapter.ts:L26-L87`; `OmfConfig` `integration-libs/omf/order/config/omf-config.ts:L15-L17` |
| `root/` (3 + model 2) | `OmfRootModule` vuoto + modelli | `integration-libs/omf/root/omf-root.module.ts:L9-L10` |
| `.` (3), `schematics/add-omf` (1) | — | — |

### 3.8 `opf` — `@spartacus/opf`
- **Scopo**: "integrates the SAP Commerce Open Payment Framework" (README). 10 sotto-feature, ciascuna con proprio entry point e tipicamente schema `root` (eager, lazy config) / `core` (facade impl + connector) / `opf-api` o `occ` (adapter) / `components`.
- **Backend**: OPF service (`opf.opfBaseUrl`, `opf.commerceCloudPublicKey`, `paymentOption…`) `integration-libs/opf/base/root/config/opf-config.ts:L14-L90`; `OpfApiConfig` `integration-libs/opf/base/root/config/opf-api-config.ts:L15-L17`; parte OCC per payment/quick-buy/gift-card/tokenisation.
- **public_api**: root vuoto, solo `/// <reference path="../../types.d.ts" />` + `export {}` (`integration-libs/opf/public_api.ts:L14-L16`): tutto passa dagli entry point secondari.
- **peerDependencies**: `integration-libs/opf/package.json:L28-L46` (cart, checkout, order, pickup-in-store, user, styles, platform-browser).

| cartella | tema | note |
|---|---|---|
| `base/` (2 + components 8, core 12, opf-api 7, root 26, styles 3) | facade base (active configs), `OpfGlobalMessageService`, persistenza metadata, error modal | `OpfBaseRootModule` `integration-libs/opf/base/root/opf-base-root.module.ts:L16-L32`; `OpfBaseFacade` `integration-libs/opf/base/root/facade/opf-base.facade.ts:L25-L32` → `OpfBaseService` `integration-libs/opf/base/core/facade/opf-base.service.ts:L18-L35`; `OpfBaseConnector` `integration-libs/opf/base/core/connectors/opf-base.connector.ts:L16-L24`; `OpfApiBaseModule` (`OpfBaseAdapter→OpfApiBaseAdapter`) `integration-libs/opf/base/opf-api/opf-api-base.module.ts:L14-L24`; `OpfMetadataStatePersistanceService` `integration-libs/opf/base/root/services/opf-metadata-state-persistence.service.ts:L26-L98` |
| `checkout/` (2 + assets 20, components 39, root 23, styles 9) | checkout B2C OPF: CMS `OpfCheckoutPaymentAndReview`, `OpfCheckoutEmailUpdateComponent`, payments wrapper | `OpfCheckoutRootModule` `integration-libs/opf/checkout/root/opf-checkout-root.module.ts:L42-L63`; `OpfCheckoutAdapter→OpfApiCheckoutAdapter` `L48-L51`; `OpfCheckoutPaymentWrapperComponent` `integration-libs/opf/checkout/components/opf-checkout-payment-wrapper/opf-checkout-payment-wrapper.component.ts:L77-L254`; outlet `OpfCheckoutOutlets` `integration-libs/opf/checkout/root/model/opf-checkout-outlets.model.ts:L7-L11` |
| `b2b-checkout/` (2 + components 26, core 5, root 8, styles 9) | checkout B2B OPF: payment type, delivery address, review | `OpfB2bCheckoutRootModule` `integration-libs/opf/b2b-checkout/root/opf-b2b-checkout-root.module.ts:L37-L48`; `OpfB2bCheckoutPaymentTypeService` `integration-libs/opf/b2b-checkout/core/facade/opf-b2b-checkout-payment-type.service.ts:L32-L153`; `OpfB2bCheckoutStepsSetGuard` `integration-libs/opf/b2b-checkout/root/guards/opf-b2b-checkout-steps-set.guard.ts:L42-L193` |
| `payment/` (2 + assets 20, core 18, occ 7, opf-api 7, root 24, styles 3) | verifica pagamento (route), submit/complete, OCC + OPF API | `OpfPaymentRootModule` `integration-libs/opf/payment/root/opf-payment-root.module.ts:L18-L49`; `OpfPaymentFacade` `integration-libs/opf/payment/root/facade/opf-payment.facade.ts:L39-L119` → `OpfPaymentService` `integration-libs/opf/payment/core/facade/opf-payment.service.ts:L27-L172`; `OpfApiPaymentAdapter` `integration-libs/opf/payment/opf-api/adapters/opf-api-payment.adapter.ts:L52-L309`; `OccOpfPaymentAdapter` `integration-libs/opf/payment/occ/adapters/occ-opf-payment.adapter.ts:L23-L72`; `OpfPaymentVerificationComponent` `integration-libs/opf/payment/root/components/opf-payment-verification/opf-payment-verification.component.ts:L30-L154` |
| `cta/` (2 + components 15, core 13, opf-api 7, root 7, styles 4) | Call-To-Action scripts: CMS `OpfCtaScriptsComponent`, `OpfCtaQuickBuyButtons` | `OpfCtaRootModule` `integration-libs/opf/cta/root/opf-cta-root.module.ts:L22-L25`; `OpfCtaFacade` `integration-libs/opf/cta/root/facade/opf-cta.facade.ts:L26-L35`; `OpfApiCtaAdapter` `integration-libs/opf/cta/opf-api/adapters/opf-api-cta.adapter.ts:L35-L89` |
| `quick-buy/` (2 + components 20, core 18, occ 8, opf-api 7, pickup-in-store 3, root 14, styles 5) | Apple Pay / Google Pay da PDP/carrello; variante pickup-in-store | `OpfQuickBuyRootModule` `integration-libs/opf/quick-buy/root/opf-quick-buy-root.module.ts:L27-L33`; `OpfQuickBuyFacade` `integration-libs/opf/quick-buy/root/facade/opf-quick-buy.facade.ts:L25-L34`; `OccOpfQuickBuyCartAdapter` `integration-libs/opf/quick-buy/occ/adapters/occ-opf-quick-buy-cart.adapter.ts:L28-L197`; `OpfQuickBuyPickupInStoreModule` (rebind `OpfQuickBuySingleProductCartOptionsFacade`) `integration-libs/opf/quick-buy/pickup-in-store/opf-quick-buy-pickup-in-store.module.ts:L12-L22` |
| `gift-card/` (2 + assets 4, components 2, core 8, occ 8, root 53, styles 9) | gift card in checkout/ordine; normalizer cart/order | `OpfGiftCardRootModule` `integration-libs/opf/gift-card/root/opf-gift-card-root.module.ts:L39-L65`; `OpfGiftCardFacade` `integration-libs/opf/gift-card/root/facade/opf-gift-card.facade.ts:L31-L75`; `OccOpfGiftCardAdapter` `integration-libs/opf/gift-card/occ/adapters/occ-opf-gift-card.adapter.ts:L28-L83` |
| `tokenisation/` (2 + components 2, core 10, root 31, styles 4) | carte salvate in checkout e account | `OpfTokenisationRootModule` `integration-libs/opf/tokenisation/root/opf-tokenisation-root.module.ts:L33-L58`; `OpfTokenisationFacade` `integration-libs/opf/tokenisation/root/facade/opf-tokenisation.facade.ts:L27-L55`; `OccOpfTokenisationUserPaymentAdapter` `integration-libs/opf/tokenisation/root/adapters/occ-opf-tokenisation-user-payment.adapter.ts:L27-L128` |
| `global-functions/` (2 + core 19, root 9) | funzioni JS globali esposte agli script PSP; spinner/error layout | `OpfGlobalFunctionsFacade` `integration-libs/opf/global-functions/root/facade/opf-global-functions.facade.ts:L24-L40` → `OpfGlobalFunctionsService` `integration-libs/opf/global-functions/core/facade/opf-global-functions.service.ts:L20-L103` |
| `order/` (3 + model 2) | normalizer ordine OPF | `OpfOrderModule` `integration-libs/opf/order/opf-order.module.ts:L11-L20`; `OpfOccOrderNormalizer` `integration-libs/opf/order/opf-occ-order-normalizer.ts:L13-L28` |
| `.` (4), `schematics/add-opf` (1) | public_api vuoto, `types.d.ts` | — |

### 3.9 `opps` — `@spartacus/opps`
- **Scopo**: Omnichannel Promotion Pricing Service; "enhancement to Personalization library" (README).
- **Backend**: OPPS; config `opps.couponcodes { httpHeaderName, urlParameter, localStorageKey }`, `opps.loginRequired.urlParameter` `integration-libs/opps/root/config/opps-config.ts:L14-L25`.
- **public_api**: `root/public_api` (`integration-libs/opps/public_api.ts:L7-L7`).
- **peerDependencies**: `integration-libs/opps/package.json:L28-L37`.

| cartella | tema | note |
|---|---|---|
| `root/coupon-codes/` (5) | salva coupon da URL (location initializer) e li invia in header | `OppsCouponCodesModule` `integration-libs/opps/root/coupon-codes/opps-coupon-codes.module.ts:L19-L29`; `OccOppsCouponCodesInterceptor` `integration-libs/opps/root/coupon-codes/http-interceptors/occ-opps-coupon-codes.interceptor.ts:L20-L65` |
| `root/login-required/` (3) | guard pre-CMS che forza il login se param in URL | `OppsLoginRequiredGuard` `integration-libs/opps/root/login-required/opps-login-required.guard.ts:L22-L62` |
| `root/` (2 + config 3) | `OppsRootModule` | `integration-libs/opps/root/opps-root.module.ts:L13-L17` |
| `.` (3), `schematics/add-opps` (1) | — | — |

### 3.10 `punchout` — `@spartacus/punchout`
- **Scopo**: gestione sessione punchout (README solo titolo). CMS: `PunchoutSession/Error/Buttons/Requisition/CloseSession/InspectCartComponent` `integration-libs/punchout/components/punchout-components.module.ts:L43-L64`.
- **Backend**: OCC `punchoutSession`, `punchoutSessionRequisition` `integration-libs/punchout/occ/config/default-occ-punchout-config.ts:L10-L23`; header `punchoutsid` aggiunto da `PunchoutCartInterceptor` `integration-libs/punchout/root/interceptors/punchout-cart.interceptor.ts:L23-L50`. Addon Commerce ⚠️ DA VERIFICARE.
- **public_api**: `punchout.module` (`integration-libs/punchout/public_api.ts:L10-L10`).
- **peerDependencies**: `integration-libs/punchout/package.json:L28-L41`.

| cartella | tema | note |
|---|---|---|
| `root/` (3 + config 5, facade 2, guards 3, interceptors 2, model 2, services 7) | root eager: guard navigazione, interceptor, auth header, persistenza stato, UI restriction | `PunchoutRootModule` `integration-libs/punchout/root/punchout.root.module.ts:L36-L84`; `PunchoutFacade` `integration-libs/punchout/root/facade/punchout.facade.ts:L37-L79`; `PunchoutNavigationGuard` `integration-libs/punchout/root/guards/punchout-navigation.guard.ts:L26-L141`; `PunchoutAuthHttpHeaderService` `integration-libs/punchout/root/services/punchout-auth-http-header.service.ts:L24-L67`; `PunchoutUiRestrictionService` `integration-libs/punchout/root/services/punchout-ui-restriction.service.ts:L19-L59`; `PunchoutNavigationGuardConfig` `integration-libs/punchout/root/config/punchout-guard-config.ts:L16-L34` |
| `core/` (2 + connectors 4, facade 3, services 2) | connector + `PunchoutService` | `PunchoutCoreModule` `integration-libs/punchout/core/punchout-core.module.ts:L12-L16`; `PunchoutConnector` `integration-libs/punchout/core/connectors/punchout.connector.ts:L13-L29`; `PunchoutService` `integration-libs/punchout/core/facade/punchout.service.ts:L43-L369` |
| `occ/` (2 + adapters 2, config 1, model 2) | adapter OCC | `PunchoutOccModule` (`PunchoutAdapter→OccPunchoutAdapter`) `integration-libs/punchout/occ/punchout-occ.module.ts:L15-L25`; `OccPunchoutAdapter` `integration-libs/punchout/occ/adapters/occ-punchout.adapter.ts:L28-L70` |
| `components/` (2 + 5 sottocartelle da 1-2) | componenti CMS | `PunchoutComponentsModule` `integration-libs/punchout/components/punchout-components.module.ts:L20-L67` |
| `styles/` (3), `assets/` (1+19), `schematics/` (1), `.` (5) | — | `PunchoutModule` `integration-libs/punchout/punchout.module.ts:L12-L15` |

### 3.11 `s4-service` — `@spartacus/s4-service`
- **Scopo**: replica service product/order con SAP S/4HANA Service (README); checkout con data/ora servizio, cancel/reschedule service order.
- **Backend**: S/4HANA Service via OCC (`defaultOccCheckoutServiceOrderConfig` `integration-libs/s4-service/checkout/occ/s4-service-checkout-occ.module.ts:L15-L15`, `defaultOccServiceOrderConfig` `integration-libs/s4-service/order/occ/s4-service-order-occ.module.ts:L21-L21`).
- **public_api**: `s4-service.module` (`integration-libs/s4-service/public_api.ts:L7-L7`).
- **peerDependencies**: `integration-libs/s4-service/package.json:L28-L41`.

| cartella | tema | note |
|---|---|---|
| `root/` (3 + config 4, events 4, facade 5, model 3) | featureModules estese di checkout e order, route cancel/reschedule, facade astratte | `S4ServiceRootModule` `integration-libs/s4-service/root/s4-service-root.module.ts:L56-L83`; `defaultS4ServiceComponentsConfig` (riusa `CHECKOUT_FEATURE`/`ORDER_FEATURE`) `L40-L55`; `CheckoutServiceDetailsFacade` `integration-libs/s4-service/root/facade/checkout-service-details.facade.ts:L28-L57`; `CheckoutServiceSchedulePickerService` `integration-libs/s4-service/root/facade/checkout-service-schedule-picker.service.ts:L16-L113` |
| `checkout/components/` (13) | CMS `CheckoutServiceDetails` + override review/delivery mode + steps guard | `S4ServiceCheckoutComponentModule` `integration-libs/s4-service/checkout/components/s4-service-checkout-component.module.ts:L14-L27`; `CheckoutServiceOrderStepsSetGuard` `integration-libs/s4-service/checkout/components/guards/checkout-service-order-steps-set.guard.ts:L21-L100` |
| `checkout/core/` (7), `checkout/occ/` (5) | facade impl + adapter | `CheckoutServiceDetailsService` `integration-libs/s4-service/checkout/core/facade/checkout-service-details.service.ts:L29-L132`; `OccCheckoutServiceDetailsAdapter` `integration-libs/s4-service/checkout/occ/adapter/occ-checkout-service-details.adapter.ts:L21-L45` |
| `order/components/` (21) | CMS `CancelServiceOrder(Headline)`, `RescheduleServiceOrder`, detail actions, service details card | `S4ServiceComponentsModule` `integration-libs/s4-service/order/components/s4-service-components.module.ts:L13-L22` |
| `order/core/` (10), `order/occ/` (8) | facade cancel/reschedule + adapter | `S4ServiceOrderCoreModule` `integration-libs/s4-service/order/core/s4-service-order-core.module.ts:L22-L39`; `S4ServiceOrderOccModule` `integration-libs/s4-service/order/occ/s4-service-order-occ.module.ts:L19-L32` |
| `styles/` (1+5), `assets/` (1+18), `schematics/` (1), `.` (5) | — | `S4ServiceModule` `integration-libs/s4-service/s4-service.module.ts:L9-L12` |

### 3.12 `s4om` — `@spartacus/s4om`
- **Scopo**: S/4HANA Synchronous Order Management: schedule lines, Requested Delivery Date, PDF Invoices (README). Importa `RequestedDeliveryDateComponentsModule` e `PDFInvoicesComponentsModule` per forzarne l'installazione (`integration-libs/s4om/root/s4om-root.module.ts:L18-L22`).
- **Backend**: S/4HANA OM lato Commerce ⚠️ DA VERIFICARE (nessun adapter nella lib).
- **public_api**: `s4om.module` (`integration-libs/s4om/public_api.ts:L10-L10`).
- **peerDependencies**: `integration-libs/s4om/package.json:L23-L35` (pdf-invoices, requested-delivery-date).

| cartella | tema | note |
|---|---|---|
| `root/components/` (3) | `ScheduleLinesComponent` in outlet `CartOutlets.ITEM_DETAILS` | `ScheduleLinesComponent` `integration-libs/s4om/root/components/schedule-lines/schedule-lines.component.ts:L19-L52`; outlet `integration-libs/s4om/root/s4om-root.module.ts:L24-L28` |
| `root/services/` (2) | override `ProductCatalogService` | `S4omProductCatalogService` `integration-libs/s4om/root/services/s4om-product-catalog.service.ts:L13-L38` |
| `root/` (3 + model 3) | `S4omRootModule` | `integration-libs/s4om/root/s4om-root.module.ts:L17-L35` |
| `styles/` (2), `assets/` (1+18), `schematics/` (2), `.` (6) | — | `S4omModule` `integration-libs/s4om/s4om.module.ts:L8-L12` |

### 3.13 `segment-refs` — `@spartacus/segment-refs`
- **Scopo**: personalizzazione basata su segmenti di sistema esterno (Emarsys); estensione di Personalization (README). Legge `segmentrefs` da query string, lo salva in localStorage e lo aggiunge come header (`integration-libs/segment-refs/root/http-interceptors/occ-segment-refs.interceptor.ts:L39-L60`).
- **Backend**: header configurabile `segmentRefs.httpHeaderName` `integration-libs/segment-refs/root/config/segment-refs-config.ts:L14-L18`.
- **public_api**: `root/public_api` (`integration-libs/segment-refs/public_api.ts:L10-L10`).
- **peerDependencies**: `integration-libs/segment-refs/package.json:L23-L30` (solo core).

| cartella | tema | note |
|---|---|---|
| `root/http-interceptors/` (2) | interceptor header | `OccSegmentRefsInterceptor` `integration-libs/segment-refs/root/http-interceptors/occ-segment-refs.interceptor.ts:L19-L87` |
| `root/config/` (2), `root/` (3) | config + root module | `SegmentRefsRootModule` `integration-libs/segment-refs/root/segment-refs-root.module.ts:L12-L20` |
| `.` (3), `schematics/add-segment-refs` (1) | — | — |

---

## 4. Pattern ricorrenti (osservati)
- **Root eager + feature lazy**: `*RootModule` registra `featureModules` via `provideDefaultConfigFactory` (cdc `integration-libs/cdc/root/cdc-root.module.ts:L40-L51`, epd `integration-libs/epd-visualization/root/epd-visualization-root.module.ts:L17-L26`, opf cta/quick-buy/tokenisation/gift-card/checkout/b2b-checkout, punchout `integration-libs/punchout/root/config/default-punchout-cms-component-config.ts:L10-L23`). Eccezione: `cds` usa `CdsModule.forRoot()` (`integration-libs/cds/src/cds.module.ts:L35-L47`).
- **Estensione di feature esistenti invece di nuova feature**: `s4-service` ridefinisce i `cmsComponents` delle feature `CHECKOUT_FEATURE` e `ORDER_FEATURE` (`integration-libs/s4-service/root/s4-service-root.module.ts:L40-L55`).
- **Override "scoped" al componente CMS**: cdc usa `cmsComponents.<X>.providers` per sostituire i component service solo nell'injector del componente (es. `integration-libs/cdc/user-profile/register/cdc-register.module.ts:L39-L50`); `CdcAdministrationModule` combina override globale e scoped (`integration-libs/cdc/organization/administration/cdc-administration.module.ts:L25-L59`).
- **Facade astratta in `root` + `useExisting` in `core/facade/facade-providers.ts`** (opf base/cta/payment/quick-buy/gift-card/tokenisation/global-functions, punchout `integration-libs/punchout/core/facade/facade-providers.ts:L14-L15`, cdc `integration-libs/cdc/core/auth/facade/facade-providers.ts:L14-L15`).
- **Interceptor per header di contesto** (opps, segment-refs, punchout, cds, opf gift-card): contribuiscono a `HTTP_INTERCEPTORS` multi (tabella §2).
