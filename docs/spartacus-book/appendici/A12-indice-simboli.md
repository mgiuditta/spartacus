# Appendice A12 - Indice dei simboli

> Generata da `tools/extract3/a12_indice_simboli.py` allo SHA 5b7a1c2b (`5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`). Non modificare a mano: rigenerare.

Indice dei simboli TypeScript citati in backtick nei capitoli e dichiarati come `export` nel codice. Per ogni simbolo: tipo e posizione della dichiarazione (`path:Lx-Ly`; se il nome è dichiarato in più file si mostra la dichiarazione di produzione più vicina alla radice e il numero di dichiarazioni ulteriori) e i capitoli che lo citano, con il numero di occorrenze tra parentesi.

Criteri: token = span inline in backtick fuori dai blocchi di codice; identificatore plausibile = PascalCase, CONSTANT_CASE di almeno 4 caratteri, o camelCase seguito da `()` (stesso criterio di `tools/check-refs.py`); dichiarazione = `export (abstract )?(class|interface|const|function|enum|type) NOME` in file `.ts` tracciati di `core-libs/`, `feature-libs/`, `integration-libs/`, esclusi `*.spec.ts`. I simboli citati solo dentro blocchi di codice, o dichiarati solo in Angular/dipendenze, non compaiono.

## Conteggi

- Simboli indicizzati: **2217**
- Occorrenze in backtick conteggiate: **8545**
- Capitoli scansionati: **51**
- Simboli per tipo di dichiarazione (prima dichiarazione): **class 1556, const 283, enum 73, function 26, interface 242, type 37**

## Come rigenerare

```bash
cd docs/spartacus-book
python3 tools/extract3/a12_indice_simboli.py
# oppure entrambe le appendici: bash tools/extract3/run_all.sh
```

## Indice per lettera

[A](#a) · [B](#b) · [C](#c) · [D](#d) · [E](#e) · [F](#f) · [G](#g) · [H](#h) · [I](#i) · [J](#j) · [K](#k) · [L](#l) · [M](#m) · [N](#n) · [O](#o) · [P](#p) · [Q](#q) · [R](#r) · [S](#s) · [T](#t) · [U](#u) · [V](#v) · [W](#w)

## A

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `AbstractBrowserTabNotificationService` | class | `core-libs/core/src/util/browser-tab-notification/abstract-browser-tab-notification.service.ts:L49-L135` | [46](../parte-2/46-util-modelli.md) (1) |
| `AbstractOrderContext` | class | `feature-libs/cart/base/components/abstract-order-context/abstract-order-context.model.ts:L16-L18` | [30](../parte-2/30-product-configurator.md) (1) |
| `AbstractOrderKey` | type | `feature-libs/cart/base/root/models/cart.model.ts:L133-L137` | [25](../parte-2/25-cart.md) (2) |
| `AbstractStoreItemComponent` | class | `feature-libs/storefinder/components/abstract-store-item/abstract-store-item.component.ts:L12-L24` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `AccountSummaryFacade` | class | `feature-libs/organization/account-summary/root/facade/account-summary.facade.ts:L30-L60` | [28](../parte-2/28-organization-b2b.md) (3) |
| `AccountSummaryModule` | class | `feature-libs/organization/account-summary/account-summary.module.ts:L21-L21` | [28](../parte-2/28-organization-b2b.md) (1) |
| `AccountSummaryPageMetaResolver` | class | `feature-libs/organization/account-summary/core/account-summary-page-meta.resolver.ts:L31-L104` | [28](../parte-2/28-organization-b2b.md) (1) |
| `AccountSummaryRootModule` | class | `feature-libs/organization/account-summary/root/account-summary-root.module.ts:L59-L59` | [28](../parte-2/28-organization-b2b.md) (1) |
| `AccountSummaryService` | class | `feature-libs/organization/account-summary/core/facade/account-summary.service.ts:L21-L83` | [28](../parte-2/28-organization-b2b.md) (2) |
| `AccountSummaryUnitListService` | class | `feature-libs/organization/account-summary/components/services/account-summary-unit-list.service.ts:L15-L17` | [28](../parte-2/28-organization-b2b.md) (1) |
| `ActionToEventMapping` | interface | `core-libs/core/src/state/event/action-to-event-mapping.ts:L9-L24` | [19](../parte-2/19-state-management.md) (2) |
| `ActivatedRouterStateSnapshot` | interface | `core-libs/core/src/routing/store/routing-state.ts:L18-L25` | [14](../parte-2/14-routing.md) (1), [20](../parte-2/20-facade-command-query-eventi.md) (1) |
| `ActivatedRoutesService` | class | `core-libs/core/src/routing/services/activated-routes.service.ts:L16-L40` | [14](../parte-2/14-routing.md) (1) |
| `ActiveCartFacade` | class | `feature-libs/cart/base/root/facade/active-cart.facade.ts:L46-L182` | [12](../parte-2/12-feature-module-lazy.md) (1), [20](../parte-2/20-facade-command-query-eventi.md) (2), [25](../parte-2/25-cart.md) (5), [50](../parte-3/50-ricette-config-di.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `ActiveCartOrderEntriesContext` | class | `feature-libs/cart/base/components/page-context/active-cart-order-entries.context.ts:L24-L58` | [25](../parte-2/25-cart.md) (2) |
| `ActiveCartOrderEntriesContextToken` | const | `feature-libs/cart/base/root/tokens/context.ts:L9-L11` | [14](../parte-2/14-routing.md) (1), [25](../parte-2/25-cart.md) (3) |
| `ActiveCartService` | class | `feature-libs/cart/base/core/facade/active-cart.service.ts:L50-L737` | [25](../parte-2/25-cart.md) (7) |
| `ActiveCartStatePersistenceService` | class | `feature-libs/cart/base/core/services/active-cart-state-persistence.service.ts:L23-L114` | [25](../parte-2/25-cart.md) (1) |
| `ActiveLinkCellComponent` | class | `feature-libs/organization/administration/components/shared/table/active-link/active-link-cell.component.ts:L19-L23` | [28](../parte-2/28-organization-b2b.md) (1) |
| `ADD_CONTAINER_ROW_SUCCESS` | const | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L31-L32` | [30](../parte-2/30-product-configurator.md) (1) |
| `ADD_MESSAGE` | const | `core-libs/core/src/global-message/store/actions/global-message.actions.ts:L13-L13` | [41](../parte-2/41-errori-global-message.md) (2) |
| `ADD_TO_CART_FEATURE` | const | `feature-libs/cart/base/root/feature-name.ts:L11-L11` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2), [47](../parte-2/47-app-demo.md) (2) |
| `ADD_TO_WISHLIST_FEATURE` | const | `feature-libs/cart/wish-list/root/feature-name.ts:L10-L10` | [47](../parte-2/47-app-demo.md) (1) |
| `AddedToCartDialogEventListener` | class | `feature-libs/cart/base/components/added-to-cart-dialog/added-to-cart-dialog-event.listener.ts:L22-L91` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [25](../parte-2/25-cart.md) (1) |
| `AddedToCartDialogModule` | class | `feature-libs/cart/base/components/added-to-cart-dialog/added-to-cart-dialog.module.ts:L50-L54` | [25](../parte-2/25-cart.md) (1) |
| `AdditionalFeatureConfiguration` | interface | `core-libs/schematics/src/shared/utils/feature-utils.ts:L71-L80` | [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `AdditionalProviders` | interface | `core-libs/schematics/src/shared/utils/feature-utils.ts:L63-L66` | [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `AddLocation` | const | `feature-libs/pickup-in-store/core/store/actions/pickup-location.action.ts:L49-L52` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `AddMessage` | class | `core-libs/core/src/global-message/store/actions/global-message.actions.ts:L18-L21` | [41](../parte-2/41-errori-global-message.md) (2) |
| `AddNextOwner` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-cart.action.ts:L107-L110` | [30](../parte-2/30-product-configurator.md) (1) |
| `AddOrderEntriesContext` | interface | `feature-libs/cart/base/root/context/add-order-entries.context.ts:L14-L31` | [25](../parte-2/25-cart.md) (1) |
| `Address` | interface | `core-libs/core/src/model/address.model.ts:L38-L67` (+1) | [46](../parte-2/46-util-modelli.md) (5), [52](../parte-3/52-ricette-occ-dati.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `ADDRESS_NORMALIZER` | const | `core-libs/core/src/user/connectors/address/converters.ts:L12-L14` | [23](../parte-2/23-user.md) (1) |
| `ADDRESS_SERIALIZER` | const | `core-libs/core/src/user/connectors/address/converters.ts:L20-L22` | [23](../parte-2/23-user.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (6) |
| `ADDRESS_VALIDATION_NORMALIZER` | const | `core-libs/core/src/user/connectors/address/converters.ts:L24-L26` | [23](../parte-2/23-user.md) (1) |
| `AddressBookComponentService` | class | `feature-libs/user/profile/components/address-book/address-book.component.service.ts:L14-L48` | [23](../parte-2/23-user.md) (1) |
| `AddressValidation` | interface | `core-libs/core/src/model/address.model.ts:L69-L74` (+1) | [46](../parte-2/46-util-modelli.md) (2) |
| `AddToCart` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-cart.action.ts:L91-L96` (+1) | [30](../parte-2/30-product-configurator.md) (1) |
| `AddToCartComponent` | class | `feature-libs/cart/base/components/add-to-cart/add-to-cart.component.ts:L77-L348` | [17](../parte-2/17-outlet.md) (1), [25](../parte-2/25-cart.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (2), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (9) |
| `AddToCartModule` | class | `feature-libs/cart/base/components/add-to-cart/add-to-cart.module.ts:L48-L48` | [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `AddToHomeScreenComponent` | class | `core-libs/storefront/cms-structure/pwa/components/add-to-home-screen.component.ts:L12-L23` | [40](../parte-2/40-seo-pwa.md) (3) |
| `AddToHomeScreenService` | class | `core-libs/storefront/cms-structure/pwa/services/add-to-home-screen.service.ts:L19-L72` | [40](../parte-2/40-seo-pwa.md) (5) |
| `AddUserAddress` | class | `core-libs/core/src/user/store/actions/user-addresses.action.ts:L56-L62` | [23](../parte-2/23-user.md) (1) |
| `AddUserAddressEvent` | class | `core-libs/core/src/user/events/user.events.ts:L25-L28` | [23](../parte-2/23-user.md) (2) |
| `AdminGuard` | class | `feature-libs/organization/administration/core/guards/admin.guard.ts:L20-L50` | [28](../parte-2/28-organization-b2b.md) (8) |
| `AdministrationComponentsModule` | class | `feature-libs/organization/administration/components/administration-components.module.ts:L25-L25` | [28](../parte-2/28-organization-b2b.md) (1) |
| `AdministrationModule` | class | `feature-libs/organization/administration/administration.module.ts:L19-L19` | [28](../parte-2/28-organization-b2b.md) (6), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `AdministrationOccModule` | class | `feature-libs/organization/administration/occ/administration-occ.module.ts:L168-L168` | [28](../parte-2/28-organization-b2b.md) (2) |
| `AdministrationRootModule` | class | `feature-libs/organization/administration/root/administration-root.module.ts:L64-L64` | [28](../parte-2/28-organization-b2b.md) (3) |
| `AepCollectorConfig` | interface | `feature-libs/tracking/tms/aep/config/default-aep.config.ts:L10-L12` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `AepCollectorService` | class | `feature-libs/tracking/tms/aep/services/aep-collector.service.ts:L20-L45` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (5) |
| `AepModule` | class | `feature-libs/tracking/tms/aep/aep.module.ts:L14-L14` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (3), [47](../parte-2/47-app-demo.md) (1) |
| `AmountCellComponent` | class | `feature-libs/organization/administration/components/shared/table/amount/amount-cell.component.ts:L19-L34` | [28](../parte-2/28-organization-b2b.md) (1) |
| `ANONYMOUS_CONSENT_NORMALIZER` | const | `core-libs/core/src/anonymous-consents/connectors/converters.ts:L11-L13` | [23](../parte-2/23-user.md) (1) |
| `ANONYMOUS_CONSENT_STATUS` | enum | `core-libs/core/src/model/consent.model.ts:L27-L30` | [46](../parte-2/46-util-modelli.md) (1) |
| `ANONYMOUS_CONSENTS_HEADER` | const | `core-libs/core/src/model/consent.model.ts:L32-L32` | [46](../parte-2/46-util-modelli.md) (1) |
| `AnonymousConsentCheckUpdatedVersions` | class | `core-libs/core/src/anonymous-consents/store/actions/anonymous-consents.action.ts:L121-L127` | [23](../parte-2/23-user.md) (1) |
| `AnonymousConsentManagementBannerComponent` | class | `core-libs/storefront/cms-components/anonymous-consent-management/banner/anonymous-consent-management-banner.component.ts:L20-L60` | [23](../parte-2/23-user.md) (1) |
| `AnonymousConsentsConfig` | class | `core-libs/core/src/anonymous-consents/config/anonymous-consents-config.ts:L15-L43` | [23](../parte-2/23-user.md) (2) |
| `AnonymousConsentsInterceptor` | class | `core-libs/core/src/anonymous-consents/http-interceptors/anonymous-consents-interceptor.ts:L28-L136` | [06](../parte-1/06-httpclient-interceptor.md) (7), [23](../parte-2/23-user.md) (1) |
| `AnonymousConsentsService` | class | `core-libs/core/src/anonymous-consents/facade/anonymous-consents.service.ts:L22-L377` | [23](../parte-2/23-user.md) (3) |
| `app()` | function | `core-libs/schematics/src/migrations/2211_36/ssr/ssr_spec.ts:L48-L55` (+9) | [47](../parte-2/47-app-demo.md) (2) |
| `AppComponent` | class | `core-libs/schematics/src/add-spartacus/add-imports-to-component-decorator_spec.ts:L28-L36` (+4) | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (4), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [43](../parte-2/43-schematics-migrazioni.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `Applicable` | interface | `core-libs/core/src/util/applicable.ts:L32-L45` | [37](../parte-2/37-i18n.md) (2), [40](../parte-2/40-seo-pwa.md) (2), [41](../parte-2/41-errori-global-message.md) (2), [46](../parte-2/46-util-modelli.md) (3) |
| `AppModule` | class | `core-libs/schematics/src/add-spartacus/create-app-module.ts:L64-L65` (+10) | [01](../parte-1/01-dependency-injection.md) (2), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (18), [04](../parte-1/04-change-detection-zone-signals.md) (4), [05](../parte-1/05-router.md) (1), [06](../parte-1/06-httpclient-interceptor.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [19](../parte-2/19-state-management.md) (2), [41](../parte-2/41-errori-global-message.md) (1), [47](../parte-2/47-app-demo.md) (5), [50](../parte-3/50-ricette-config-di.md) (5), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `AppRoutingModule` | class | `core-libs/storefront/router/app-routing.module.ts:L30-L30` (+1) | [01](../parte-1/01-dependency-injection.md) (1), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (10), [05](../parte-1/05-router.md) (6), [06](../parte-1/06-httpclient-interceptor.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (7), [14](../parte-2/14-routing.md) (4), [43](../parte-2/43-schematics-migrazioni.md) (2), [47](../parte-2/47-app-demo.md) (2) |
| `ApproverGuard` | class | `feature-libs/organization/order-approval/core/guards/approver.guard.ts:L22-L54` | [28](../parte-2/28-organization-b2b.md) (1) |
| `AppServerModule` | class | `core-libs/setup/ssr/providers/server-request-origin.ts:L52-L52` (+1) | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (3), [07](../parte-1/07-ssr-hydration-transferstate.md) (2), [41](../parte-2/41-errori-global-message.md) (1), [43](../parte-2/43-schematics-migrazioni.md) (1), [47](../parte-2/47-app-demo.md) (2) |
| `ASM_CUSTOMER_360_NORMALIZER` | const | `feature-libs/asm/customer-360/core/connectors/converters.ts:L11-L13` | [29](../parte-2/29-asm.md) (2) |
| `ASM_FEATURE` | const | `feature-libs/asm/root/feature-name.ts:L7-L7` (+2) | [29](../parte-2/29-asm.md) (1) |
| `AsmAdapter` | class | `feature-libs/asm/core/connectors/asm.adapter.ts:L18-L47` | [29](../parte-2/29-asm.md) (2) |
| `AsmAuthHttpHeaderService` | class | `feature-libs/asm/root/services/asm-auth-http-header.service.ts:L33-L168` | [06](../parte-1/06-httpclient-interceptor.md) (1), [22](../parte-2/22-auth.md) (1), [29](../parte-2/29-asm.md) (5) |
| `AsmAuthService` | class | `feature-libs/asm/root/services/asm-auth.service.ts:L41-L215` | [22](../parte-2/22-auth.md) (1), [29](../parte-2/29-asm.md) (8) |
| `AsmAuthStorageService` | class | `feature-libs/asm/root/services/asm-auth-storage.service.ts:L37-L139` | [22](../parte-2/22-auth.md) (1), [29](../parte-2/29-asm.md) (5), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `AsmBindCartComponent` | class | `feature-libs/asm/components/asm-bind-cart/asm-bind-cart.component.ts:L76-L361` | [29](../parte-2/29-asm.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `AsmBindCartFacade` | class | `feature-libs/asm/root/facade/asm-bind-cart.facade.ts:L21-L26` | [29](../parte-2/29-asm.md) (2), [54](../parte-3/54-upgrade-safe.md) (2) |
| `AsmBindCartService` | class | `feature-libs/asm/core/facade/asm-bind-cart.service.ts:L16-L46` | [29](../parte-2/29-asm.md) (2), [54](../parte-3/54-upgrade-safe.md) (2) |
| `AsmComponentService` | class | `feature-libs/asm/components/services/asm-component.service.ts:L25-L119` | [29](../parte-2/29-asm.md) (1) |
| `AsmComponentsModule` | class | `feature-libs/asm/components/asm-components.module.ts:L107-L107` | [29](../parte-2/29-asm.md) (2) |
| `AsmConfig` | class | `feature-libs/asm/root/config/asm-config.ts:L15-L55` | [29](../parte-2/29-asm.md) (5) |
| `AsmConnector` | class | `feature-libs/asm/core/connectors/asm.connector.ts:L23-L47` | [29](../parte-2/29-asm.md) (1) |
| `AsmCoreModule` | class | `feature-libs/asm/core/asm-core.module.ts:L35-L35` | [01](../parte-1/01-dependency-injection.md) (2), [12](../parte-2/12-feature-module-lazy.md) (1), [29](../parte-2/29-asm.md) (2) |
| `AsmCreateCustomerFacade` | class | `feature-libs/asm/root/facade/asm-create-customer.facade.ts:L23-L25` | [29](../parte-2/29-asm.md) (2) |
| `AsmCreateCustomerFormComponent` | class | `feature-libs/asm/components/asm-create-customer-form/asm-create-customer-form.component.ts:L60-L191` | [29](../parte-2/29-asm.md) (1) |
| `AsmCustomer360Adapter` | class | `feature-libs/asm/customer-360/core/connectors/asm-customer-360.adapter.ts:L13-L20` | [29](../parte-2/29-asm.md) (1) |
| `AsmCustomer360Component` | class | `feature-libs/asm/customer-360/components/asm-customer-360/asm-customer-360.component.ts:L76-L329` | [29](../parte-2/29-asm.md) (2) |
| `AsmCustomer360Config` | class | `feature-libs/asm/customer-360/components/config/asm-customer-360-config.ts:L15-L17` | [29](../parte-2/29-asm.md) (1) |
| `AsmCustomer360CoreModule` | class | `feature-libs/asm/customer-360/core/asm-customer-360-core.module.ts:L16-L16` | [29](../parte-2/29-asm.md) (1) |
| `AsmCustomer360Module` | class | `feature-libs/asm/customer-360/asm-customer-360.module.ts:L24-L24` | [29](../parte-2/29-asm.md) (1) |
| `AsmCustomer360Query` | interface | `feature-libs/asm/customer-360/root/model/asm-customer-360.model.ts:L250-L253` | [29](../parte-2/29-asm.md) (1) |
| `AsmCustomer360RootModule` | class | `feature-libs/asm/customer-360/root/asm-customer-360-root.module.ts:L36-L36` | [06](../parte-1/06-httpclient-interceptor.md) (1), [29](../parte-2/29-asm.md) (2) |
| `AsmCustomer360SectionComponent` | class | `feature-libs/asm/customer-360/components/sections/asm-customer-360-section/asm-customer-360-section.component.ts:L35-L75` | [29](../parte-2/29-asm.md) (1) |
| `AsmCustomer360SectionContext` | class | `feature-libs/asm/customer-360/components/sections/asm-customer-360-section-context.model.ts:L15-L29` | [29](../parte-2/29-asm.md) (4) |
| `AsmCustomer360SectionContextSource` | class | `feature-libs/asm/customer-360/components/sections/asm-customer-360-section-context-source.model.ts:L17-L33` | [29](../parte-2/29-asm.md) (2) |
| `AsmCustomer360Service` | class | `feature-libs/asm/customer-360/core/services/asm-customer-360.service.ts:L22-L74` | [29](../parte-2/29-asm.md) (3) |
| `AsmCustomer360TabsConfig` | class | `feature-libs/asm/customer-360/root/model/asm-customer-360-tabs-config.ts:L9-L13` | [29](../parte-2/29-asm.md) (1) |
| `AsmCustomer360Type` | enum | `feature-libs/asm/customer-360/root/model/asm-customer-360.model.ts:L77-L90` | [29](../parte-2/29-asm.md) (1) |
| `AsmCustomerListFacade` | class | `feature-libs/asm/root/facade/asm-customer-list.facade.ts:L31-L39` | [29](../parte-2/29-asm.md) (2) |
| `AsmCustomerListService` | class | `feature-libs/asm/core/facade/asm-customer-list.service.ts:L23-L84` | [29](../parte-2/29-asm.md) (1) |
| `AsmDeepLinkService` | class | `feature-libs/asm/root/services/asm-deep-link.service.ts:L15-L80` | [29](../parte-2/29-asm.md) (2) |
| `AsmEnablerService` | class | `feature-libs/asm/root/services/asm-enabler.service.ts:L21-L89` | [29](../parte-2/29-asm.md) (3) |
| `AsmLoaderModule` | class | `feature-libs/asm/root/asm-loader.module.ts:L27-L27` | [29](../parte-2/29-asm.md) (3) |
| `AsmMainUiComponent` | class | `feature-libs/asm/components/asm-main-ui/asm-main-ui.component.ts:L97-L460` | [29](../parte-2/29-asm.md) (8) |
| `AsmModule` | class | `feature-libs/asm/asm.module.ts:L15-L15` | [29](../parte-2/29-asm.md) (4) |
| `AsmOccModule` | class | `feature-libs/asm/occ/asm-occ.module.ts:L24-L24` | [29](../parte-2/29-asm.md) (1) |
| `AsmProtectedRoutesService` | class | `feature-libs/asm/root/services/asm-protected-routes.service.ts:L24-L44` | [29](../parte-2/29-asm.md) (1) |
| `AsmRootModule` | class | `feature-libs/asm/root/asm-root.module.ts:L95-L95` | [06](../parte-1/06-httpclient-interceptor.md) (2), [29](../parte-2/29-asm.md) (5), [50](../parte-3/50-ricette-config-di.md) (2) |
| `AsmService` | class | `feature-libs/asm/core/facade/asm.service.ts:L23-L79` | [29](../parte-2/29-asm.md) (2) |
| `AsmSessionCreationAction` | class | `feature-libs/asm/core/store/actions/asm-session-actions.ts:L16-L21` | [29](../parte-2/29-asm.md) (1) |
| `AsmSessionEffects` | class | `feature-libs/asm/core/store/effects/asm-session.effect.ts:L15-L41` | [29](../parte-2/29-asm.md) (2) |
| `AsmSessionTimerComponent` | class | `feature-libs/asm/components/asm-session-timer/asm-session-timer.component.ts:L20-L104` | [29](../parte-2/29-asm.md) (1) |
| `AsmStatePersistenceService` | class | `feature-libs/asm/core/services/asm-state-persistence.service.ts:L31-L110` | [29](../parte-2/29-asm.md) (1) |
| `AsmStoreModule` | class | `feature-libs/asm/core/store/asm-store.module.ts:L25-L25` | [29](../parte-2/29-asm.md) (2) |
| `AsmUiUpdate` | class | `feature-libs/asm/core/store/actions/asm-ui.action.ts:L12-L15` | [29](../parte-2/29-asm.md) (1) |
| `AssignBudget` | class | `feature-libs/organization/administration/core/store/actions/cost-center.action.ts:L242-L254` | [28](../parte-2/28-organization-b2b.md) (1) |
| `Attribute` | interface | `feature-libs/product-configurator/rulebased/core/model/configurator.model.ts:L13-L54` (+2) | [30](../parte-2/30-product-configurator.md) (1) |
| `AttributesDirective` | class | `integration-libs/cds/src/merchandising/cms-components/directives/attributes/attributes.directive.ts:L16-L48` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `AuthConfig` | class | `core-libs/core/src/auth/user-auth/config/auth-config.ts:L36-L143` | [22](../parte-2/22-auth.md) (4) |
| `AuthConfigInitializer` | class | `core-libs/core/src/auth/user-auth/config/auth-config-initializer.ts:L19-L167` | [10](../parte-2/10-bootstrap-inizializzazione.md) (3), [11](../parte-2/11-configurazione.md) (1), [22](../parte-2/22-auth.md) (4) |
| `AuthConfigService` | class | `core-libs/core/src/auth/user-auth/services/auth-config.service.ts:L20-L165` | [22](../parte-2/22-auth.md) (4) |
| `AuthFlowRoutesService` | class | `core-libs/core/src/auth/user-auth/services/auth-flow-routes.service.ts:L12-L47` | [05](../parte-1/05-router.md) (1), [14](../parte-2/14-routing.md) (1) |
| `AuthGuard` | class | `core-libs/core/src/auth/user-auth/guards/auth.guard.ts:L22-L43` | [05](../parte-1/05-router.md) (1), [14](../parte-2/14-routing.md) (3), [22](../parte-2/22-auth.md) (5), [23](../parte-2/23-user.md) (1), [25](../parte-2/25-cart.md) (1), [27](../parte-2/27-order.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (4), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `AuthHttpHeaderService` | class | `core-libs/core/src/auth/user-auth/services/auth-http-header.service.ts:L90-L397` | [06](../parte-1/06-httpclient-interceptor.md) (2), [22](../parte-2/22-auth.md) (6), [29](../parte-2/29-asm.md) (4), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (10), [50](../parte-3/50-ricette-config-di.md) (10) |
| `AuthInterceptor` | class | `core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts:L25-L111` | [06](../parte-1/06-httpclient-interceptor.md) (10), [22](../parte-2/22-auth.md) (12), [29](../parte-2/29-asm.md) (3), [41](../parte-2/41-errori-global-message.md) (1), [50](../parte-3/50-ricette-config-di.md) (4) |
| `AuthLibConfig` | type | `core-libs/core/src/auth/user-auth/config/auth-config.ts:L20-L30` | [22](../parte-2/22-auth.md) (3) |
| `AuthModule` | class | `core-libs/core/src/auth/auth.module.ts:L18-L24` | [06](../parte-1/06-httpclient-interceptor.md) (5), [22](../parte-2/22-auth.md) (2) |
| `AuthNotificationService` | class | `core-libs/core/src/auth/user-auth/facade/auth-notification.service.ts:L27-L38` | [22](../parte-2/22-auth.md) (2), [46](../parte-2/46-util-modelli.md) (1) |
| `AuthNotificationType` | enum | `core-libs/core/src/auth/user-auth/models/auth-notification.model.ts:L7-L9` | [46](../parte-2/46-util-modelli.md) (1) |
| `AuthRedirectService` | class | `core-libs/core/src/auth/user-auth/services/auth-redirect.service.ts:L27-L162` | [22](../parte-2/22-auth.md) (3) |
| `AuthService` | class | `core-libs/core/src/auth/user-auth/facade/auth.service.ts:L47-L336` | [19](../parte-2/19-state-management.md) (1), [22](../parte-2/22-auth.md) (3), [29](../parte-2/29-asm.md) (6), [50](../parte-3/50-ricette-config-di.md) (1) |
| `AuthStatePersistenceService` | class | `core-libs/core/src/auth/user-auth/services/auth-state-persistence.service.ts:L31-L126` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [19](../parte-2/19-state-management.md) (1), [22](../parte-2/22-auth.md) (2) |
| `AuthStorageService` | class | `core-libs/core/src/auth/user-auth/services/auth-storage.service.ts:L18-L119` | [22](../parte-2/22-auth.md) (5), [29](../parte-2/29-asm.md) (4), [34](../parte-2/34-integration-cdc-cdp-cds.md) (2), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `AuthToken` | interface | `core-libs/core/src/auth/user-auth/models/auth-token.model.ts:L10-L35` | [22](../parte-2/22-auth.md) (2), [46](../parte-2/46-util-modelli.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `AutoFocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L72-L96` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `AutoFocusService` | class | `core-libs/storefront/layout/a11y/keyboard-focus/autofocus/auto-focus.service.ts:L18-L66` | [18](../parte-2/18-layout-breakpoint-a11y.md) (3), [54](../parte-3/54-upgrade-safe.md) (1) |
| `AVOID_STACKED_OUTLETS` | const | `core-libs/storefront/cms-structure/outlet/outlet.model.ts:L15-L15` | [17](../parte-2/17-outlet.md) (2) |

## B

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `B2BApprovalProcess` | interface | `core-libs/core/src/model/org-unit.model.ts:L41-L44` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `B2BCheckoutDeliveryAddressComponent` | class | `feature-libs/checkout/b2b/components/checkout-delivery-address/checkout-delivery-address.component.ts:L62-L198` | [26](../parte-2/26-checkout.md) (1) |
| `B2BCheckoutReviewSubmitComponent` | class | `feature-libs/checkout/b2b/components/checkout-review-submit/checkout-review-submit.component.ts:L69-L169` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `B2BUnit` | interface | `core-libs/core/src/model/org-unit.model.ts:L29-L34` (+1) | [28](../parte-2/28-organization-b2b.md) (1), [46](../parte-2/46-util-modelli.md) (6), [54](../parte-3/54-upgrade-safe.md) (1) |
| `B2BUser` | interface | `core-libs/core/src/model/org-unit.model.ts:L36-L39` (+1) | [28](../parte-2/28-organization-b2b.md) (1), [46](../parte-2/46-util-modelli.md) (3), [54](../parte-3/54-upgrade-safe.md) (1) |
| `B2BUserRight` | enum | `core-libs/core/src/model/org-unit.model.ts:L25-L27` | [46](../parte-2/46-util-modelli.md) (1) |
| `B2BUserRole` | enum | `core-libs/core/src/model/org-unit.model.ts:L18-L23` | [46](../parte-2/46-util-modelli.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `B2BUserService` | class | `feature-libs/organization/administration/core/services/b2b-user.service.ts:L36-L417` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `BackendConfig` | interface | `core-libs/core/src/occ/config/occ-config.ts:L13-L40` | [06](../parte-1/06-httpclient-interceptor.md) (2), [21](../parte-2/21-occ.md) (7), [35](../parte-2/35-integration-opf-payments.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `BackendHttpTimeoutConfig` | class | `core-libs/core/src/http/http-timeout/http-timeout.config.ts:L35-L37` | [21](../parte-2/21-occ.md) (2) |
| `BadCartRequestHandler` | class | `feature-libs/cart/base/core/http-interceptors/handlers/bad-cart-request.handler.ts:L21-L75` | [12](../parte-2/12-feature-module-lazy.md) (2), [25](../parte-2/25-cart.md) (4), [41](../parte-2/41-errori-global-message.md) (4), [50](../parte-3/50-ricette-config-di.md) (1) |
| `BadCostCenterRequestHandler` | class | `feature-libs/checkout/b2b/core/http-interceptors/bad-request/bad-cost-center-request.handler.ts:L22-L71` | [26](../parte-2/26-checkout.md) (3) |
| `BadGatewayHandler` | class | `core-libs/core/src/global-message/http-interceptors/handlers/bad-gateway/bad-gateway.handler.ts:L16-L29` | [41](../parte-2/41-errori-global-message.md) (1) |
| `BadRequestHandler` | class | `core-libs/core/src/global-message/http-interceptors/handlers/bad-request/bad-request.handler.ts:L22-L164` | [30](../parte-2/30-product-configurator.md) (1), [41](../parte-2/41-errori-global-message.md) (6) |
| `BadVoucherRequestHandler` | class | `feature-libs/cart/base/core/http-interceptors/handlers/bad-voucher-request.handler.ts:L25-L77` | [25](../parte-2/25-cart.md) (4) |
| `BannerCarouselComponent` | class | `core-libs/storefront/cms-components/content/banner-carousel/banner-carousel.component.ts:L29-L62` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `BannerCarouselModule` | class | `core-libs/storefront/cms-components/content/banner-carousel/banner-carousel.module.ts:L33-L33` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `BannerComponent` | class | `core-libs/storefront/cms-components/content/banner/banner.component.ts:L44-L190` | [45](../parte-2/45-componenti-storefront.md) (5) |
| `BannerModule` | class | `core-libs/storefront/cms-components/content/banner/banner.module.ts:L47-L47` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `BASE_SITE_CHANGE` | const | `core-libs/core/src/site-context/store/actions/base-site.action.ts:L20-L20` | [13](../parte-2/13-site-context-theme.md) (1) |
| `BASE_SITE_CONTEXT_ID` | const | `core-libs/core/src/site-context/providers/context-ids.ts:L9-L9` | [13](../parte-2/13-site-context-theme.md) (1), [19](../parte-2/19-state-management.md) (1), [22](../parte-2/22-auth.md) (1) |
| `BASE_SITE_NORMALIZER` | const | `core-libs/core/src/site-context/connectors/converters.ts:L36-L38` | [13](../parte-2/13-site-context-theme.md) (3), [21](../parte-2/21-occ.md) (2) |
| `BaseCoreModule` | class | `core-libs/core/src/base-core.module.ts:L47-L53` | [01](../parte-1/01-dependency-injection.md) (1), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (11), [05](../parte-1/05-router.md) (1), [06](../parte-1/06-httpclient-interceptor.md) (3), [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (7), [11](../parte-2/11-configurazione.md) (3), [12](../parte-2/12-feature-module-lazy.md) (2), [13](../parte-2/13-site-context-theme.md) (1), [15](../parte-2/15-cms-core.md) (1), [17](../parte-2/17-outlet.md) (1), [19](../parte-2/19-state-management.md) (1), [21](../parte-2/21-occ.md) (3), [22](../parte-2/22-auth.md) (1), [37](../parte-2/37-i18n.md) (1), [38](../parte-2/38-stili-theming.md) (1), [40](../parte-2/40-seo-pwa.md) (1), [41](../parte-2/41-errori-global-message.md) (4), [42](../parte-2/42-feature-toggle-deprecazioni.md) (1), [47](../parte-2/47-app-demo.md) (2), [50](../parte-3/50-ricette-config-di.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `BaseFocusService` | class | `core-libs/storefront/layout/a11y/keyboard-focus/base/base-focus.service.ts:L12-L12` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `BaseItem` | type | `feature-libs/organization/administration/components/shared/organization.model.ts:L37-L50` | [28](../parte-2/28-organization-b2b.md) (1) |
| `BaseMessageComponent` | class | `feature-libs/organization/administration/components/shared/message/base-message.component.ts:L21-L76` | [28](../parte-2/28-organization-b2b.md) (1) |
| `BaseOccModule` | class | `core-libs/core/src/occ/base-occ.module.ts:L20-L35` | [06](../parte-1/06-httpclient-interceptor.md) (1), [13](../parte-2/13-site-context-theme.md) (1), [15](../parte-2/15-cms-core.md) (1), [21](../parte-2/21-occ.md) (2) |
| `BaseOccUrlProperties` | interface | `core-libs/core/src/occ/services/occ-endpoints.service.ts:L19-L23` | [21](../parte-2/21-occ.md) (1) |
| `BasePageMetaResolver` | class | `core-libs/core/src/cms/page/base-page-meta.resolver.ts:L28-L108` | [40](../parte-2/40-seo-pwa.md) (11), [52](../parte-3/52-ricette-occ-dati.md) (5) |
| `BaseSite` | interface | `core-libs/core/src/model/misc.model.ts:L116-L133` (+1) | [13](../parte-2/13-site-context-theme.md) (2), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [46](../parte-2/46-util-modelli.md) (6) |
| `BaseSiteChange` | class | `core-libs/core/src/site-context/store/actions/base-site.action.ts:L66-L68` | [13](../parte-2/13-site-context-theme.md) (1) |
| `BaseSiteInitializer` | class | `core-libs/core/src/site-context/services/base-site-initializer.ts:L18-L66` | [10](../parte-2/10-bootstrap-inizializzazione.md) (4), [13](../parte-2/13-site-context-theme.md) (1) |
| `BaseSiteNormalizer` | class | `core-libs/core/src/occ/adapters/site-context/converters/base-site-normalizer.ts:L13-L29` | [13](../parte-2/13-site-context-theme.md) (3), [21](../parte-2/21-occ.md) (2) |
| `BaseSiteService` | class | `core-libs/core/src/site-context/facade/base-site.service.ts:L22-L109` | [13](../parte-2/13-site-context-theme.md) (6), [21](../parte-2/21-occ.md) (2), [46](../parte-2/46-util-modelli.md) (1) |
| `BaseSiteState` | interface | `core-libs/core/src/site-context/store/state.ts:L37-L41` | [13](../parte-2/13-site-context-theme.md) (1) |
| `BaseStore` | interface | `core-libs/core/src/model/misc.model.ts:L108-L114` (+1) | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [46](../parte-2/46-util-modelli.md) (1) |
| `BaseStorefrontModule` | class | `core-libs/storefront/base-storefront.module.ts:L49-L49` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (14), [06](../parte-1/06-httpclient-interceptor.md) (3), [10](../parte-2/10-bootstrap-inizializzazione.md) (8), [14](../parte-2/14-routing.md) (1), [16](../parte-2/16-cms-rendering.md) (1), [17](../parte-2/17-outlet.md) (2), [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [20](../parte-2/20-facade-command-query-eventi.md) (1), [38](../parte-2/38-stili-theming.md) (2), [40](../parte-2/40-seo-pwa.md) (2), [41](../parte-2/41-errori-global-message.md) (2), [43](../parte-2/43-schematics-migrazioni.md) (1), [45](../parte-2/45-componenti-storefront.md) (2), [47](../parte-2/47-app-demo.md) (4), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `BaseTmsModule` | class | `feature-libs/tracking/tms/core/base-tms.module.ts:L19-L33` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4) |
| `BEFORE_CMS_PAGE_GUARD` | const | `core-libs/storefront/cms-structure/guards/before-cms-page-guard.token.ts:L22-L24` | [01](../parte-1/01-dependency-injection.md) (1), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [05](../parte-1/05-router.md) (7), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [14](../parte-2/14-routing.md) (7), [22](../parte-2/22-auth.md) (1), [35](../parte-2/35-integration-opf-payments.md) (5), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `BeforeCmsPageGuardService` | class | `core-libs/storefront/cms-structure/guards/before-cms-page-guard.service.ts:L18-L33` | [05](../parte-1/05-router.md) (3), [14](../parte-2/14-routing.md) (2) |
| `BlobErrorInterceptor` | class | `feature-libs/organization/account-summary/root/http-interceptors/blob-error.interceptor.ts:L23-L57` | [06](../parte-1/06-httpclient-interceptor.md) (3), [28](../parte-2/28-organization-b2b.md) (3) |
| `BlockFocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L27-L29` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `BrandPageVisitedEvent` | class | `integration-libs/cds/src/profiletag/model/profile-tag.model.ts:L112-L118` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `Breadcrumb` | interface | `core-libs/core/src/model/product-search.model.ts:L26-L33` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `BreadcrumbComponent` | class | `core-libs/storefront/cms-components/navigation/breadcrumb/breadcrumb.component.ts:L32-L67` | [45](../parte-2/45-componenti-storefront.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `BreadcrumbMeta` | interface | `core-libs/core/src/cms/model/page.model.ts:L80-L83` | [15](../parte-2/15-cms-core.md) (1), [40](../parte-2/40-seo-pwa.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `BreadcrumbSchemaBuilder` | class | `core-libs/storefront/cms-structure/seo/structured-data/builders/breadcrumb/breadcrumb-schema.builder.ts:L16-L57` | [40](../parte-2/40-seo-pwa.md) (2) |
| `BREAKPOINT` | enum | `core-libs/storefront/layout/config/layout-config.ts:L22-L28` | [16](../parte-2/16-cms-rendering.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (6), [54](../parte-3/54-upgrade-safe.md) (2) |
| `BreakPoint` | interface | `core-libs/storefront/layout/config/layout-config.ts:L63-L73` | [18](../parte-2/18-layout-breakpoint-a11y.md) (2) |
| `BreakpointService` | class | `core-libs/storefront/layout/breakpoint/breakpoint.service.ts:L37-L207` | [16](../parte-2/16-cms-rendering.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (6), [38](../parte-2/38-stili-theming.md) (2), [46](../parte-2/46-util-modelli.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `BtnLikeLinkDirective` | class | `core-libs/storefront/layout/a11y/btn-like-link/btn-like-link.directive.ts:L31-L36` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `BUDGET_ENTITIES` | const | `feature-libs/organization/administration/core/store/organization-state.ts:L25-L25` | [28](../parte-2/28-organization-b2b.md) (1) |
| `BUDGET_NORMALIZER` | const | `feature-libs/organization/administration/core/connectors/budget/converters.ts:L11-L13` | [28](../parte-2/28-organization-b2b.md) (2) |
| `BUDGET_SERIALIZER` | const | `feature-libs/organization/administration/core/connectors/budget/converters.ts:L18-L20` | [28](../parte-2/28-organization-b2b.md) (2) |
| `BudgetAdapter` | class | `feature-libs/organization/administration/core/connectors/budget/budget.adapter.ts:L11-L34` | [28](../parte-2/28-organization-b2b.md) (2) |
| `BudgetConnector` | class | `feature-libs/organization/administration/core/connectors/budget/budget.connector.ts:L16-L41` | [28](../parte-2/28-organization-b2b.md) (1) |
| `BudgetDetailsComponent` | class | `feature-libs/organization/administration/components/budget/details/budget-details.component.ts:L48-L60` | [28](../parte-2/28-organization-b2b.md) (2) |
| `BudgetFormComponent` | class | `feature-libs/organization/administration/components/budget/form/budget-form.component.ts:L66-L103` | [28](../parte-2/28-organization-b2b.md) (3) |
| `BudgetItemService` | class | `feature-libs/organization/administration/components/budget/services/budget-item.service.ts:L22-L63` | [28](../parte-2/28-organization-b2b.md) (2) |
| `BudgetListService` | class | `feature-libs/organization/administration/components/budget/services/budget-list.service.ts:L30-L69` | [28](../parte-2/28-organization-b2b.md) (2) |
| `BudgetRoutePageMetaResolver` | class | `feature-libs/organization/administration/components/budget/services/budget-route-page-meta.resolver.ts:L17-L28` | [28](../parte-2/28-organization-b2b.md) (1) |
| `BudgetService` | class | `feature-libs/organization/administration/core/services/budget.service.ts:L29-L150` | [28](../parte-2/28-organization-b2b.md) (2) |
| `BulkPricingService` | class | `feature-libs/product/bulk-pricing/core/services/bulk-pricing.service.ts:L16-L81` | [24](../parte-2/24-product-search.md) (2) |

## C

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `CacheEntrySizeCalculator` | interface | `core-libs/setup/ssr/optimized-engine/rendering-cache/rendering-cache.model.ts:L26-L28` | [39](../parte-2/39-ssr-ottimizzato.md) (3) |
| `CanActivate` | type | `core-libs/storefront/cms-structure/services/guards-composer.ts:L19-L19` | [05](../parte-1/05-router.md) (1), [16](../parte-2/16-cms-rendering.md) (2) |
| `CanActivateObservable` | type | `core-libs/storefront/cms-structure/services/guards-composer.ts:L24-L24` | [16](../parte-2/16-cms-rendering.md) (1) |
| `CANCEL_REPLENISHMENT_ORDER_SUCCESS` | const | `feature-libs/order/core/store/actions/replenishment-order-details.action.ts:L24-L25` | [27](../parte-2/27-order.md) (1) |
| `CancelOrder` | class | `feature-libs/order/core/store/actions/order-details.action.ts:L60-L71` | [27](../parte-2/27-order.md) (1) |
| `CancelServiceOrderComponent` | class | `integration-libs/s4-service/order/components/cancel-service-order/cancel-service-order.component.ts:L46-L115` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CancelServiceOrderFacade` | class | `integration-libs/s4-service/root/facade/cancel-service-order.facade.ts:L15-L30` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `CancelServiceOrderGuard` | class | `integration-libs/s4-service/order/components/guards/cancel-service-order.guard.ts:L16-L38` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CanonicalPageResolver` | interface | `core-libs/core/src/cms/page/page.resolvers.ts:L92-L101` | [40](../parte-2/40-seo-pwa.md) (1) |
| `CanonicalUrlOptions` | interface | `core-libs/core/src/cms/page/config/page-meta.config.ts:L43-L71` | [15](../parte-2/15-cms-core.md) (1), [40](../parte-2/40-seo-pwa.md) (3) |
| `CaptchaComponent` | class | `core-libs/storefront/shared/components/captcha/captcha.component.ts:L29-L75` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `CaptchaConfig` | interface | `core-libs/core/src/model/misc.model.ts:L135-L138` | [46](../parte-2/46-util-modelli.md) (1) |
| `CaptchaModule` | class | `core-libs/storefront/shared/components/captcha/captcha.module.ts:L25-L25` | [23](../parte-2/23-user.md) (1), [45](../parte-2/45-componenti-storefront.md) (1) |
| `Card` | interface | `core-libs/storefront/shared/components/card/card.component.ts:L36-L49` | [27](../parte-2/27-order.md) (1) |
| `CardComponent` | class | `core-libs/storefront/shared/components/card/card.component.ts:L69-L193` (+1) | [28](../parte-2/28-organization-b2b.md) (3) |
| `CardType` | interface | `core-libs/core/src/model/payment.model.ts:L9-L12` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `CarouselComponent` | class | `core-libs/storefront/shared/components/carousel/carousel.component.ts:L78-L300` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1) |
| `CarouselService` | class | `core-libs/storefront/shared/components/carousel/carousel.service.ts:L15-L61` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `Cart` | interface | `core-libs/core/src/occ/occ-models/occ.models.ts:L1040-L1112` (+1) | [25](../parte-2/25-cart.md) (4), [32](../parte-2/32-pickup-storefinder-delivery.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (5), [54](../parte-3/54-upgrade-safe.md) (1) |
| `CART_ACCESS_CODE_NORMALIZER` | const | `feature-libs/cart/base/core/connectors/access-code/converters.ts:L10-L12` | [25](../parte-2/25-cart.md) (1) |
| `CART_ADD_ENTRY_SUCCESS` | const | `feature-libs/cart/base/core/store/actions/cart-entry.action.ts:L12-L12` | [25](../parte-2/25-cart.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `CART_ADD_VOUCHER` | const | `feature-libs/cart/base/core/store/actions/cart-voucher.action.ts:L10-L10` | [25](../parte-2/25-cart.md) (1) |
| `CART_ADD_VOUCHER_SUCCESS` | const | `feature-libs/cart/base/core/store/actions/cart-voucher.action.ts:L12-L13` | [25](../parte-2/25-cart.md) (1) |
| `CART_BASE_CORE_FEATURE` | const | `feature-libs/cart/base/root/feature-name.ts:L8-L8` | [20](../parte-2/20-facade-command-query-eventi.md) (1) |
| `CART_BASE_FEATURE` | const | `feature-libs/cart/base/root/feature-name.ts:L7-L7` | [12](../parte-2/12-feature-module-lazy.md) (1), [26](../parte-2/26-checkout.md) (1), [27](../parte-2/27-order.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (2), [47](../parte-2/47-app-demo.md) (2), [50](../parte-3/50-ricette-config-di.md) (1) |
| `CART_BASE_MODULE` | const | `core-libs/schematics/src/shared/lib-configs/cart-schematics-config.ts:L42-L42` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CART_GUEST_USER_NORMALIZER` | const | `feature-libs/cart/base/core/connectors/guest-user/converters.ts:L11-L13` | [25](../parte-2/25-cart.md) (1) |
| `CART_MODIFICATION_NORMALIZER` | const | `feature-libs/cart/base/root/tokens/converters.ts:L25-L27` | [25](../parte-2/25-cart.md) (2), [30](../parte-2/30-product-configurator.md) (1) |
| `CART_NORMALIZER` | const | `feature-libs/cart/base/root/tokens/converters.ts:L17-L19` | [25](../parte-2/25-cart.md) (4), [35](../parte-2/35-integration-opf-payments.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (10) |
| `CART_VALIDATION_NORMALIZER` | const | `feature-libs/cart/base/core/connectors/validation/converters.ts:L11-L13` | [25](../parte-2/25-cart.md) (3) |
| `CART_VOUCHER_NORMALIZER` | const | `feature-libs/cart/base/root/tokens/converters.ts:L33-L35` | [25](../parte-2/25-cart.md) (2) |
| `CART_WISH_LIST_FEATURE` | const | `feature-libs/cart/wish-list/root/feature-name.ts:L7-L7` | [47](../parte-2/47-app-demo.md) (1) |
| `CartAccessCodeAdapter` | class | `feature-libs/cart/base/core/connectors/access-code/cart-access-code.adapter.ts:L9-L21` | [25](../parte-2/25-cart.md) (1) |
| `CartAccessCodeConnector` | class | `feature-libs/cart/base/core/connectors/access-code/cart-access-code.connector.ts:L12-L21` | [25](../parte-2/25-cart.md) (1) |
| `CartAccessCodeFacade` | class | `feature-libs/cart/base/root/facade/cart-access-code.facade.ts:L21-L29` | [25](../parte-2/25-cart.md) (3) |
| `CartAccessCodeService` | class | `feature-libs/cart/base/core/facade/cart-access-code.service.ts:L14-L35` | [25](../parte-2/25-cart.md) (2) |
| `CartAdapter` | class | `feature-libs/cart/base/core/connectors/cart/cart.adapter.ts:L10-L69` | [25](../parte-2/25-cart.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (7) |
| `CartAddEntry` | class | `feature-libs/cart/base/core/store/actions/cart-entry.action.ts:L22-L36` | [25](../parte-2/25-cart.md) (2) |
| `CartAddEntryFail` | class | `feature-libs/cart/base/core/store/actions/cart-entry.action.ts:L59-L79` | [30](../parte-2/30-product-configurator.md) (1) |
| `CartAddEntryFailEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L78-L86` | [25](../parte-2/25-cart.md) (2) |
| `CartAddEntrySuccess` | class | `feature-libs/cart/base/core/store/actions/cart-entry.action.ts:L38-L57` | [25](../parte-2/25-cart.md) (1), [30](../parte-2/30-product-configurator.md) (2) |
| `CartAddEntrySuccessEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L66-L76` | [25](../parte-2/25-cart.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [50](../parte-3/50-ricette-config-di.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (5) |
| `CartAddVoucher` | class | `feature-libs/cart/base/core/store/actions/cart-voucher.action.ts:L23-L31` | [25](../parte-2/25-cart.md) (4) |
| `CartAddVoucherFail` | class | `feature-libs/cart/base/core/store/actions/cart-voucher.action.ts:L33-L49` | [25](../parte-2/25-cart.md) (1) |
| `CartBaseComponentsModule` | class | `feature-libs/cart/base/components/cart-base-components.module.ts:L53-L53` | [16](../parte-2/16-cms-rendering.md) (1), [17](../parte-2/17-outlet.md) (2), [25](../parte-2/25-cart.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `CartBaseCoreModule` | class | `feature-libs/cart/base/core/cart-base-core.module.ts:L49-L49` | [12](../parte-2/12-feature-module-lazy.md) (1), [25](../parte-2/25-cart.md) (4), [41](../parte-2/41-errori-global-message.md) (1), [50](../parte-3/50-ricette-config-di.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (4) |
| `CartBaseEventModule` | class | `feature-libs/cart/base/root/events/cart-base-event.module.ts:L11-L15` | [25](../parte-2/25-cart.md) (1) |
| `CartBaseModule` | class | `feature-libs/cart/base/cart-base.module.ts:L15-L15` | [17](../parte-2/17-outlet.md) (1), [25](../parte-2/25-cart.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3), [47](../parte-2/47-app-demo.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (3), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (3) |
| `CartBaseOccModule` | class | `feature-libs/cart/base/occ/cart-base-occ.module.ts:L72-L72` | [25](../parte-2/25-cart.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (5) |
| `CartBaseRootModule` | class | `feature-libs/cart/base/root/cart-base-root.module.ts:L83-L83` | [12](../parte-2/12-feature-module-lazy.md) (2), [25](../parte-2/25-cart.md) (1), [47](../parte-2/47-app-demo.md) (2) |
| `CartConfig` | class | `feature-libs/cart/base/root/config/cart-config.ts:L16-L28` | [25](../parte-2/25-cart.md) (3), [35](../parte-2/35-integration-opf-payments.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `CartConfigService` | class | `feature-libs/cart/base/core/services/cart-config.service.ts:L13-L23` | [25](../parte-2/25-cart.md) (1) |
| `CartConnector` | class | `feature-libs/cart/base/core/connectors/cart/cart.connector.ts:L15-L54` | [25](../parte-2/25-cart.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `CartEffects` | class | `feature-libs/cart/base/core/store/effects/cart.effect.ts:L43-L472` | [25](../parte-2/25-cart.md) (3) |
| `CartEntryAdapter` | class | `feature-libs/cart/base/core/connectors/entry/cart-entry.adapter.ts:L10-L57` | [25](../parte-2/25-cart.md) (1) |
| `CartEntryEffects` | class | `feature-libs/cart/base/core/store/effects/cart-entry.effect.ts:L24-L165` | [25](../parte-2/25-cart.md) (4) |
| `CartEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L14-L33` | [20](../parte-2/20-facade-command-query-eventi.md) (2), [25](../parte-2/25-cart.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (4) |
| `CartEventBuilder` | class | `feature-libs/cart/base/core/event/cart-event.builder.ts:L47-L250` | [20](../parte-2/20-facade-command-query-eventi.md) (1), [25](../parte-2/25-cart.md) (2), [50](../parte-3/50-ricette-config-di.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `CartEventModule` | class | `feature-libs/cart/base/core/event/cart-event.module.ts:L11-L15` | [25](../parte-2/25-cart.md) (2), [50](../parte-3/50-ricette-config-di.md) (1) |
| `CartGuestUserAdapter` | class | `feature-libs/cart/base/core/connectors/guest-user/cart-guest-user.adapter.ts:L10-L38` | [25](../parte-2/25-cart.md) (1) |
| `CartGuestUserConnector` | class | `feature-libs/cart/base/core/connectors/guest-user/cart-guest-user.connector.ts:L13-L31` | [25](../parte-2/25-cart.md) (1) |
| `CartGuestUserFacade` | class | `feature-libs/cart/base/root/facade/cart-guest-user.facade.ts:L22-L40` | [25](../parte-2/25-cart.md) (3) |
| `CartGuestUserService` | class | `feature-libs/cart/base/core/facade/cart-guest-user.service.ts:L14-L72` | [25](../parte-2/25-cart.md) (2) |
| `CartItemContext` | class | `feature-libs/cart/base/root/models/cart-item-context.model.ts:L17-L29` | [25](../parte-2/25-cart.md) (4), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (5) |
| `CartItemListComponentService` | class | `feature-libs/cart/base/components/cart-shared/cart-item-list-row/cart-item-list-row.component.service.ts:L12-L16` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (7) |
| `CartItemListRowComponent` | class | `feature-libs/cart/base/components/cart-shared/cart-item-list-row/cart-item-list-row.component.ts:L46-L53` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CartItemQuantityService` | class | `feature-libs/cart/base/root/services/cart-item-quantity.service.ts:L20-L43` | [25](../parte-2/25-cart.md) (1) |
| `CartItemValidationService` | class | `feature-libs/cart/base/core/services/cart-item-validation.service.ts:L21-L102` | [25](../parte-2/25-cart.md) (1) |
| `CartModification` | interface | `core-libs/core/src/occ/occ-models/occ.models.ts:L1135-L1147` (+1) | [25](../parte-2/25-cart.md) (1) |
| `CartNotEmptyGuard` | class | `feature-libs/checkout/base/components/guards/cart-not-empty.guard.ts:L17-L40` | [26](../parte-2/26-checkout.md) (6), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `CartOccEndpoints` | interface | `feature-libs/cart/base/occ/model/occ-cart-endpoints.model.ts:L9-L95` | [25](../parte-2/25-cart.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `CartOutlets` | enum | `feature-libs/cart/base/root/models/cart-outlets.model.ts:L10-L31` | [17](../parte-2/17-outlet.md) (2), [25](../parte-2/25-cart.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (4) |
| `CartPageEvent` | class | `feature-libs/cart/base/root/events/cart-page.events.ts:L12-L15` | [25](../parte-2/25-cart.md) (3), [50](../parte-3/50-ricette-config-di.md) (1) |
| `CartPageEventBuilder` | class | `feature-libs/cart/base/core/event/cart-page-event.builder.ts:L17-L36` | [25](../parte-2/25-cart.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `CartPageEventModule` | class | `feature-libs/cart/base/core/event/cart-page-event.module.ts:L11-L15` | [25](../parte-2/25-cart.md) (1) |
| `CartPageLayoutHandler` | class | `feature-libs/cart/base/components/cart-page-layout-handler.ts:L21-L68` | [16](../parte-2/16-cms-rendering.md) (1), [25](../parte-2/25-cart.md) (3), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `CartPersistenceModule` | class | `feature-libs/cart/base/core/cart-persistence.module.ts:L74-L74` | [12](../parte-2/12-feature-module-lazy.md) (2), [19](../parte-2/19-state-management.md) (1), [25](../parte-2/25-cart.md) (2) |
| `CartPickupOptionsContainerComponent` | class | `feature-libs/pickup-in-store/components/container/cart-pickup-options-container/cart-pickup-options-container.component.ts:L83-L311` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `CartProceedToCheckoutComponent` | class | `feature-libs/cart/base/components/cart-proceed-to-checkout/cart-proceed-to-checkout.component.ts:L55-L121` | [25](../parte-2/25-cart.md) (1) |
| `CartProcessesDecrement` | class | `feature-libs/cart/base/core/store/actions/multi-cart.action.ts:L37-L42` | [25](../parte-2/25-cart.md) (2) |
| `CartQuickOrderFormComponent` | class | `feature-libs/cart/quick-order/components/cart-quick-order-form/cart-quick-order-form.component.ts:L57-L180` | [25](../parte-2/25-cart.md) (1) |
| `CartRemoveEntry` | class | `feature-libs/cart/base/core/store/actions/cart-entry.action.ts:L81-L89` | [25](../parte-2/25-cart.md) (1) |
| `CartRemoveEntrySuccessEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L96-L102` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `CartRemoveVoucher` | class | `feature-libs/cart/base/core/store/actions/cart-voucher.action.ts:L73-L81` | [25](../parte-2/25-cart.md) (1) |
| `CartType` | enum | `feature-libs/cart/base/root/models/cart.model.ts:L197-L202` | [25](../parte-2/25-cart.md) (2) |
| `CartUiEventAddToCart` | class | `feature-libs/cart/base/root/events/cart.events.ts:L122-L136` | [25](../parte-2/25-cart.md) (4), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (9) |
| `CartUpdateEntry` | class | `feature-libs/cart/base/core/store/actions/cart-entry.action.ts:L121-L136` | [25](../parte-2/25-cart.md) (1) |
| `CartUpdateEntrySuccess` | class | `feature-libs/cart/base/core/store/actions/cart-entry.action.ts:L138-L153` | [30](../parte-2/30-product-configurator.md) (1) |
| `CartUpdateEntrySuccessEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L104-L111` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `CartValidationAdapter` | class | `feature-libs/cart/base/core/connectors/validation/cart-validation.adapter.ts:L10-L15` | [25](../parte-2/25-cart.md) (1) |
| `CartValidationFacade` | class | `feature-libs/cart/base/root/facade/cart-validation.facade.ts:L22-L32` | [25](../parte-2/25-cart.md) (3) |
| `CartValidationGuard` | class | `feature-libs/cart/base/core/guards/cart-validation.guard.ts:L29-L103` | [25](../parte-2/25-cart.md) (3), [26](../parte-2/26-checkout.md) (1) |
| `CartValidationService` | class | `feature-libs/cart/base/core/facade/cart-validation.service.ts:L26-L67` | [25](../parte-2/25-cart.md) (2) |
| `CartValidationStateService` | class | `feature-libs/cart/base/core/services/cart-validation-state.service.ts:L16-L80` | [25](../parte-2/25-cart.md) (3) |
| `CartValidationStatusCode` | enum | `feature-libs/cart/base/root/models/cart.model.ts:L208-L216` | [25](../parte-2/25-cart.md) (2) |
| `CartVoucherAdapter` | class | `feature-libs/cart/base/core/connectors/voucher/cart-voucher.adapter.ts:L9-L35` | [25](../parte-2/25-cart.md) (1) |
| `CartVoucherEffects` | class | `feature-libs/cart/base/core/store/effects/cart-voucher.effect.ts:L21-L121` | [25](../parte-2/25-cart.md) (3) |
| `CartVoucherFacade` | class | `feature-libs/cart/base/root/facade/cart-voucher.facade.ts:L29-L53` | [25](../parte-2/25-cart.md) (3) |
| `CartVoucherService` | class | `feature-libs/cart/base/core/facade/cart-voucher.service.ts:L21-L99` | [25](../parte-2/25-cart.md) (2) |
| `Catalog` | interface | `core-libs/core/src/model/unused.model.ts:L25-L31` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `CategoryNavigationComponent` | class | `core-libs/storefront/cms-components/navigation/category-navigation/category-navigation.component.ts:L22-L33` | [45](../parte-2/45-componenti-storefront.md) (4) |
| `CategoryPageMetaResolver` | class | `core-libs/core/src/product/services/category-page-meta.resolver.ts:L36-L143` | [24](../parte-2/24-product-search.md) (1), [40](../parte-2/40-seo-pwa.md) (4) |
| `CategoryPageResultsEvent` | class | `core-libs/storefront/events/product/product-page.events.ts:L25-L31` | [20](../parte-2/20-facade-command-query-eventi.md) (3) |
| `CDC_FEATURE` | const | `integration-libs/cdc/root/feature-name.ts:L7-L7` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CDC_PREFERENCE_SERIALIZER` | const | `integration-libs/cdc/root/consent-management/converters/converter.ts:L11-L13` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (4), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `CdcAdministrationModule` | class | `integration-libs/cdc/organization/administration/cdc-administration.module.ts:L62-L62` | [28](../parte-2/28-organization-b2b.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (8) |
| `CdcAuthFacade` | class | `integration-libs/cdc/root/facade/cdc-auth.facade.ts:L21-L33` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (4) |
| `CdcAuthModule` | class | `integration-libs/cdc/core/auth/cdc-auth.module.ts:L16-L16` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdcAuthService` | class | `integration-libs/cdc/core/auth/facade/cdc-auth.service.ts:L29-L146` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `CDCB2BRegisterComponentService` | class | `integration-libs/cdc/organization/user-registration/cdc-b2b-register-component.service.ts:L32-L138` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CDCB2BRegisterModule` | class | `integration-libs/cdc/organization/user-registration/cdc-b2b-register.module.ts:L40-L40` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `CdcComponentsModule` | class | `integration-libs/cdc/components/cdc-components.module.ts:L15-L15` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CdcConfig` | class | `integration-libs/cdc/root/config/cdc-config.ts:L14-L20` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CdcConsentManagementComponentService` | class | `integration-libs/cdc/root/consent-management/services/cdc-consent-management-component.service.ts:L16-L53` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdcConsentManagementModule` | class | `integration-libs/cdc/root/consent-management/cdc-consent.module.ts:L31-L31` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `CdcConsentsLocalStorageService` | class | `integration-libs/cdc/root/consent-management/services/cdc-consents-local-storage.service.ts:L20-L82` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdcCoreModule` | class | `integration-libs/cdc/core/cdc-core.module.ts:L17-L17` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (5) |
| `CdcEventBuilder` | class | `integration-libs/cdc/core/events/cdc-event.builder.ts:L15-L39` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdcEventModule` | class | `integration-libs/cdc/core/events/cdc-event.module.ts:L11-L15` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CDCForgotPasswordModule` | class | `integration-libs/cdc/user-profile/forgot-password/cdc-forgot-password.module.ts:L50-L50` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdcJsService` | class | `integration-libs/cdc/root/service/cdc-js.service.ts:L48-L860` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (6) |
| `CdcLoadUserTokenFailEvent` | class | `integration-libs/cdc/root/events/cdc-event.ts:L13-L18` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (4) |
| `CdcLoginAsGuestGuard` | class | `integration-libs/cdc/root/guards/cdc-login-as-guest.guard.ts:L13-L17` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `CdcLoginFormComponentService` | class | `integration-libs/cdc/user-account/login-form/cdc-login-form-component.service.ts:L19-L75` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CDCLoginFormModule` | class | `integration-libs/cdc/user-account/login-form/cdc-login-form.module.ts:L71-L71` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `CdcLoginGuard` | class | `integration-libs/cdc/root/guards/cdc-login.guard.ts:L20-L32` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `CdcLogoutGuard` | class | `integration-libs/cdc/root/guards/cdc-logout.guard.ts:L26-L56` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `CdcModule` | class | `integration-libs/cdc/cdc.module.ts:L14-L14` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (6) |
| `CdcPreferenceSerializer` | class | `integration-libs/cdc/root/consent-management/converters/cdc-preference.serializer.ts:L12-L39` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CdcReconsentDialogEventListener` | class | `integration-libs/cdc/user-account/login-form/reconsent/cdc-reconsent-dialogue-event.listener.ts:L16-L56` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdcReConsentEvent` | class | `integration-libs/cdc/root/events/cdc-event.ts:L20-L31` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `CdcReconsentModule` | class | `integration-libs/cdc/user-account/login-form/reconsent/cdc-reconsent.module.ts:L35-L41` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CDCRegisterModule` | class | `integration-libs/cdc/user-profile/register/cdc-register.module.ts:L53-L53` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CdcRootModule` | class | `integration-libs/cdc/root/cdc-root.module.ts:L69-L69` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (7) |
| `CdcStoreModule` | class | `integration-libs/cdc/core/store/cdc-store.module.ts:L18-L18` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CDCUpdateEmailModule` | class | `integration-libs/cdc/user-profile/update-email/cdc-update-email.module.ts:L52-L52` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CDCUpdatePasswordModule` | class | `integration-libs/cdc/user-profile/update-password/cdc-update-password.module.ts:L52-L52` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CDCUpdateProfileModule` | class | `integration-libs/cdc/user-profile/update-profile/cdc-update-profile.module.ts:L54-L54` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CDCUserAccountModule` | class | `integration-libs/cdc/user-account/cdc-user-account.module.ts:L13-L13` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CdcUserAddressesEffects` | class | `integration-libs/cdc/core/store/effects/cdc-user-addresses.effect.ts:L24-L121` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CdcUserConsentAdapter` | class | `integration-libs/cdc/root/consent-management/cdc-user-consent.adapter.ts:L21-L90` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `CDCUserProfileModule` | class | `integration-libs/cdc/user-profile/cdc-user-profile.module.ts:L23-L23` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdcUserTokenEffects` | class | `integration-libs/cdc/core/store/effects/cdc-user-token.effect.ts:L22-L67` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdpCustomerTicketingModule` | class | `integration-libs/cdp/customer-ticketing/cdp-customer-ticketing.module.ts:L35-L35` | [31](../parte-2/31-quote-ticketing-subscription.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (7), [47](../parte-2/47-app-demo.md) (1) |
| `CdsBackendNotificationAdapter` | class | `integration-libs/cds/src/profiletag/adapters/cds-backend-notification-adapter.ts:L9-L11` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdsConfig` | class | `integration-libs/cds/src/config/cds-config.ts:L17-L27` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CdsEndpoints` | interface | `integration-libs/cds/src/cds-models/cds-endpoints.model.ts:L7-L15` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdsEndpointsService` | class | `integration-libs/cds/src/services/cds-endpoints.service.ts:L15-L90` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CdsModule` | class | `integration-libs/cds/src/cds.module.ts:L35-L47` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CellComponent` | class | `feature-libs/organization/administration/components/shared/table/cell.component.ts:L31-L111` | [28](../parte-2/28-organization-b2b.md) (3) |
| `CHANGE_NEXT_PAGE_CONTEXT` | const | `core-libs/core/src/routing/store/actions/router.action.ts:L10-L10` | [14](../parte-2/14-routing.md) (1) |
| `ChangeGroup` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L349-L365` | [30](../parte-2/30-product-configurator.md) (2) |
| `ChangeNextPageContext` | class | `core-libs/core/src/routing/store/actions/router.action.ts:L12-L15` | [05](../parte-1/05-router.md) (1), [14](../parte-2/14-routing.md) (2) |
| `CheckConflictDialoge` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L504-L510` | [30](../parte-2/30-product-configurator.md) (1) |
| `checkOAuthParamsInUrl()` | function | `core-libs/core/src/auth/user-auth/user-auth.module.ts:L39-L56` | [29](../parte-2/29-asm.md) (2) |
| `CHECKOUT_B2B_CMS_COMPONENTS` | const | `feature-libs/checkout/b2b/root/checkout-b2b-root.module.ts:L23-L31` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `CHECKOUT_B2B_MODULE` | const | `core-libs/schematics/src/shared/lib-configs/checkout-schematics-config.ts:L77-L77` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CHECKOUT_B2B_SCHEMATICS_CONFIG` | const | `core-libs/schematics/src/shared/lib-configs/checkout-schematics-config.ts:L83-L125` | [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `CHECKOUT_BASE_CMS_COMPONENTS` | const | `feature-libs/checkout/base/root/checkout-root.module.ts:L20-L35` | [26](../parte-2/26-checkout.md) (2), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (3) |
| `CHECKOUT_BASE_SCHEMATICS_CONFIG` | const | `core-libs/schematics/src/shared/lib-configs/checkout-schematics-config.ts:L40-L75` | [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `CHECKOUT_CORE_FEATURE` | const | `feature-libs/checkout/base/root/feature-name.ts:L8-L8` | [35](../parte-2/35-integration-opf-payments.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `CHECKOUT_FEATURE` | const | `feature-libs/checkout/base/root/feature-name.ts:L7-L7` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [43](../parte-2/43-schematics-migrazioni.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `CHECKOUT_NORMALIZER` | const | `feature-libs/checkout/base/core/connectors/checkout/converters.ts:L11-L13` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutAdapter` | class | `feature-libs/checkout/base/core/connectors/checkout/checkout.adapter.ts:L10-L21` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutAuthGuard` | class | `feature-libs/checkout/base/components/guards/checkout-auth.guard.ts:L25-L78` | [26](../parte-2/26-checkout.md) (7), [29](../parte-2/29-asm.md) (1), [35](../parte-2/35-integration-opf-payments.md) (5), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `CheckoutB2BAuthGuard` | class | `feature-libs/checkout/b2b/components/guards/checkout-b2b-auth.guard.ts:L30-L89` | [26](../parte-2/26-checkout.md) (2) |
| `CheckoutB2BComponentsModule` | class | `feature-libs/checkout/b2b/components/checkout-b2b-components.module.ts:L39-L39` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutB2BModule` | class | `feature-libs/checkout/b2b/checkout-b2b.module.ts:L19-L19` | [26](../parte-2/26-checkout.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [43](../parte-2/43-schematics-migrazioni.md) (2), [47](../parte-2/47-app-demo.md) (1) |
| `CheckoutB2BRootModule` | class | `feature-libs/checkout/b2b/root/checkout-b2b-root.module.ts:L52-L52` | [26](../parte-2/26-checkout.md) (3), [47](../parte-2/47-app-demo.md) (1) |
| `CheckoutB2BStepsSetGuard` | class | `feature-libs/checkout/b2b/components/guards/checkout-b2b-steps-set.guard.ts:L32-L178` | [26](../parte-2/26-checkout.md) (2), [35](../parte-2/35-integration-opf-payments.md) (4), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (3) |
| `CheckoutBillingAddressAdapter` | class | `feature-libs/checkout/base/core/connectors/checkout-billing-address/checkout-billing-address.adapter.ts:L10-L23` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutBillingAddressService` | class | `feature-libs/checkout/base/core/facade/checkout-billing-address.service.ts:L25-L81` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutCartInterceptor` | class | `feature-libs/checkout/base/root/http-interceptors/checkout-cart.interceptor.ts:L27-L95` | [06](../parte-1/06-httpclient-interceptor.md) (3), [26](../parte-2/26-checkout.md) (3), [54](../parte-3/54-upgrade-safe.md) (1) |
| `CheckoutConfig` | class | `feature-libs/checkout/base/root/config/checkout-config.ts:L22-L51` | [26](../parte-2/26-checkout.md) (2), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (11), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `CheckoutConfigService` | class | `feature-libs/checkout/base/components/services/checkout-config.service.ts:L18-L113` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutCoreModule` | class | `feature-libs/checkout/base/core/checkout-core.module.ts:L33-L33` | [26](../parte-2/26-checkout.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `CheckoutCostCenterComponent` | class | `feature-libs/checkout/b2b/components/checkout-cost-center/checkout-cost-center.component.ts:L33-L93` | [26](../parte-2/26-checkout.md) (3) |
| `CheckoutDeliveryAddressAdapter` | class | `feature-libs/checkout/base/core/connectors/checkout-delivery-address/checkout-delivery-address.adapter.ts:L10-L47` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutDeliveryAddressClearedEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L86-L91` | [26](../parte-2/26-checkout.md) (2) |
| `CheckoutDeliveryAddressCreatedEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L58-L67` | [20](../parte-2/20-facade-command-query-eventi.md) (1), [26](../parte-2/26-checkout.md) (3) |
| `CheckoutDeliveryAddressService` | class | `feature-libs/checkout/base/core/facade/checkout-delivery-address.service.ts:L31-L173` | [20](../parte-2/20-facade-command-query-eventi.md) (1), [35](../parte-2/35-integration-opf-payments.md) (1) |
| `CheckoutDeliveryAddressSetEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L72-L81` | [26](../parte-2/26-checkout.md) (4) |
| `CheckoutDeliveryModeClearedErrorEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L125-L130` | [26](../parte-2/26-checkout.md) (2) |
| `CheckoutDeliveryModeClearedEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L115-L120` | [26](../parte-2/26-checkout.md) (3) |
| `CheckoutDeliveryModeComponent` | class | `feature-libs/checkout/base/components/checkout-delivery-mode/checkout-delivery-mode.component.ts:L61-L194` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CheckoutDeliveryModesAdapter` | class | `feature-libs/checkout/base/core/connectors/checkout-delivery-modes/checkout-delivery-modes.adapter.ts:L10-L45` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutDeliveryModeSetEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L101-L110` | [26](../parte-2/26-checkout.md) (3) |
| `CheckoutDeliveryModesFacade` | class | `feature-libs/checkout/base/root/facade/checkout-delivery-modes.facade.ts:L30-L55` | [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (3) |
| `CheckoutEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L32-L48` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutEventModule` | class | `feature-libs/checkout/base/root/events/checkout-event.module.ts:L16-L27` | [26](../parte-2/26-checkout.md) (3) |
| `CheckoutFlow` | interface | `feature-libs/checkout/base/root/model/checkout-flow.model.ts:L10-L31` | [26](../parte-2/26-checkout.md) (4), [35](../parte-2/35-integration-opf-payments.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `CheckoutFlowOrchestratorService` | class | `feature-libs/checkout/base/components/services/checkout-flow-orchestrator.service.ts:L16-L45` | [26](../parte-2/26-checkout.md) (2), [35](../parte-2/35-integration-opf-payments.md) (2) |
| `CheckoutGuard` | class | `feature-libs/checkout/base/components/guards/checkout.guard.ts:L21-L71` | [26](../parte-2/26-checkout.md) (5) |
| `CheckoutLegacyStoreEventListener` | class | `feature-libs/checkout/base/root/events/checkout-legacy-store-event.listener.ts:L25-L75` | [23](../parte-2/23-user.md) (1) |
| `CheckoutModule` | class | `feature-libs/checkout/base/checkout.module.ts:L15-L15` | [26](../parte-2/26-checkout.md) (3), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [43](../parte-2/43-schematics-migrazioni.md) (3), [47](../parte-2/47-app-demo.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (4) |
| `CheckoutOccModule` | class | `feature-libs/checkout/base/occ/checkout-occ.module.ts:L50-L50` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutOrchestratorComponent` | class | `feature-libs/checkout/base/components/checkout-orchestrator/checkout-orchestrator.component.ts:L14-L18` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutPageMetaResolver` | class | `feature-libs/checkout/base/core/services/checkout-page-meta.resolver.ts:L32-L77` | [26](../parte-2/26-checkout.md) (2), [40](../parte-2/40-seo-pwa.md) (1) |
| `CheckoutPaymentAdapter` | class | `feature-libs/checkout/base/core/connectors/checkout-payment/checkout-payment.adapter.ts:L10-L52` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutPaymentCardTypesQueryReloadEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L188-L193` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutPaymentDetailsCreatedEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L160-L169` | [26](../parte-2/26-checkout.md) (3) |
| `CheckoutPaymentDetailsSetEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L174-L183` | [26](../parte-2/26-checkout.md) (3) |
| `CheckoutPaymentMethodModule` | class | `feature-libs/checkout/base/components/checkout-payment-method/checkout-payment-method.module.ts:L45-L45` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `CheckoutPaymentService` | class | `feature-libs/checkout/base/core/facade/checkout-payment.service.ts:L37-L185` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `CheckoutPaymentTypeComponent` | class | `feature-libs/checkout/b2b/components/checkout-payment-type/checkout-payment-type.component.ts:L48-L214` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutPaymentTypeFacade` | class | `feature-libs/checkout/b2b/root/facade/checkout-payment-type.facade.ts:L29-L67` | [35](../parte-2/35-integration-opf-payments.md) (7) |
| `CheckoutPaymentTypeSetEvent` | class | `feature-libs/checkout/b2b/root/events/checkout-b2b.events.ts:L57-L72` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `CheckoutPlaceOrderEventListener` | class | `feature-libs/checkout/base/root/events/checkout-place-order-event.listener.ts:L17-L46` | [27](../parte-2/27-order.md) (1) |
| `CheckoutQueryEventListener` | class | `feature-libs/checkout/base/root/events/checkout-query-event.listener.ts:L30-L67` | [20](../parte-2/20-facade-command-query-eventi.md) (1) |
| `CheckoutQueryFacade` | class | `feature-libs/checkout/base/root/facade/checkout-query.facade.ts:L22-L29` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutQueryReloadEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L12-L17` | [26](../parte-2/26-checkout.md) (4) |
| `CheckoutQueryResetEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L22-L27` | [26](../parte-2/26-checkout.md) (6), [27](../parte-2/27-order.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `CheckoutQueryService` | class | `feature-libs/checkout/base/core/facade/checkout-query.service.ts:L28-L89` | [20](../parte-2/20-facade-command-query-eventi.md) (2), [26](../parte-2/26-checkout.md) (1) |
| `CheckoutReplenishmentFormService` | class | `feature-libs/checkout/scheduled-replenishment/components/services/checkout-replenishment-form.service.ts:L33-L126` | [26](../parte-2/26-checkout.md) (2) |
| `CheckoutReviewOverviewComponent` | class | `feature-libs/checkout/base/components/checkout-review/checkout-review-overview/checkout-review-overview.component.ts:L25-L77` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutReviewSubmitComponent` | class | `feature-libs/checkout/base/components/checkout-review-submit/checkout-review-submit.component.ts:L73-L217` | [26](../parte-2/26-checkout.md) (1), [35](../parte-2/35-integration-opf-payments.md) (1) |
| `CheckoutRootModule` | class | `feature-libs/checkout/base/root/checkout-root.module.ts:L60-L60` | [06](../parte-1/06-httpclient-interceptor.md) (1), [26](../parte-2/26-checkout.md) (4), [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `CheckoutScheduledReplenishmentModule` | class | `feature-libs/checkout/scheduled-replenishment/checkout-scheduled-replenishment.module.ts:L13-L13` | [26](../parte-2/26-checkout.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `CheckoutScheduledReplenishmentPlaceOrderComponent` | class | `feature-libs/checkout/scheduled-replenishment/components/checkout-place-order/checkout-place-order.component.ts:L60-L176` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutScheduledReplenishmentRootModule` | class | `feature-libs/checkout/scheduled-replenishment/root/checkout-scheduled-replenishment-root.module.ts:L37-L37` | [26](../parte-2/26-checkout.md) (2), [47](../parte-2/47-app-demo.md) (1) |
| `CheckoutServiceDetailsAdapter` | class | `integration-libs/s4-service/checkout/core/connector/checkout-service-details.adapter.ts:L10-L23` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CheckoutServiceDetailsComponent` | class | `integration-libs/s4-service/checkout/components/checkout-service-details/checkout-service-details.component.ts:L57-L169` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CheckoutServiceDetailsEventListener` | class | `integration-libs/s4-service/root/events/checkout-service-details-event.listener.ts:L16-L34` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CheckoutServiceDetailsEventModule` | class | `integration-libs/s4-service/root/events/checkout-service-details-event.module.ts:L11-L17` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `CheckoutServiceDetailsFacade` | class | `integration-libs/s4-service/root/facade/checkout-service-details.facade.ts:L28-L57` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `CheckoutServiceDetailsSetEvent` | class | `integration-libs/s4-service/root/events/checkout-service-details.events.ts:L18-L28` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (4) |
| `CheckoutServiceOrderStepsSetGuard` | class | `integration-libs/s4-service/checkout/components/guards/checkout-service-order-steps-set.guard.ts:L21-L100` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `CheckoutServiceSchedulePickerService` | class | `integration-libs/s4-service/root/facade/checkout-service-schedule-picker.service.ts:L16-L113` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `CheckoutState` | interface | `feature-libs/checkout/base/root/model/checkout-state.model.ts:L10-L14` | [26](../parte-2/26-checkout.md) (4), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `CheckoutStep` | interface | `feature-libs/checkout/base/root/model/checkout-step.model.ts:L20-L27` | [26](../parte-2/26-checkout.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (4) |
| `CheckoutStepService` | class | `feature-libs/checkout/base/components/services/checkout-step.service.ts:L22-L204` | [26](../parte-2/26-checkout.md) (4), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (6) |
| `CheckoutStepsSetGuard` | class | `feature-libs/checkout/base/components/guards/checkout-steps-set.guard.ts:L36-L187` | [26](../parte-2/26-checkout.md) (8), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (6), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (6) |
| `CheckoutStepState` | enum | `feature-libs/checkout/base/root/model/checkout-step.model.ts:L14-L18` | [26](../parte-2/26-checkout.md) (1) |
| `CheckoutStepType` | enum | `feature-libs/checkout/base/root/model/checkout-step.model.ts:L7-L12` | [26](../parte-2/26-checkout.md) (4), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (7) |
| `CheckoutSupportedDeliveryModesQueryReloadEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L135-L140` | [26](../parte-2/26-checkout.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `CheckoutSupportedDeliveryModesQueryResetEvent` | class | `feature-libs/checkout/base/root/events/checkout.events.ts:L145-L150` | [26](../parte-2/26-checkout.md) (2) |
| `CLEAR_CART_STATE` | const | `feature-libs/cart/base/core/store/actions/multi-cart.action.ts:L17-L17` (+1) | [25](../parte-2/25-cart.md) (1) |
| `CLEAR_ORGANIZATION_DATA` | const | `feature-libs/organization/administration/core/store/actions/organization.action.ts:L9-L9` | [28](../parte-2/28-organization-b2b.md) (2) |
| `CLEAR_STOCK_DATA` | const | `feature-libs/pickup-in-store/core/store/actions/stock.action.ts:L21-L21` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `CLEAR_STORE_FINDER_DATA` | const | `feature-libs/storefinder/core/store/actions/view-all-stores.action.ts:L14-L14` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `ClearCartState` | class | `feature-libs/cart/base/core/store/actions/multi-cart.action.ts:L55-L60` | [25](../parte-2/25-cart.md) (4) |
| `ClearCmsComponent` | class | `core-libs/core/src/cms/store/actions/components.action.ts:L82-L88` | [15](../parte-2/15-cms-core.md) (2), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1) |
| `ClearMiscsDataEffect` | class | `core-libs/core/src/user/store/effects/clear-miscs-data.effect.ts:L16-L30` | [23](../parte-2/23-user.md) (1) |
| `ClearProductPrice` | class | `core-libs/core/src/product/store/actions/product.action.ts:L66-L72` | [24](../parte-2/24-product-search.md) (1) |
| `ClearProductSearchByCodeState` | class | `core-libs/core/src/product/store/actions/product-search-by-code.action.ts:L61-L66` | [24](../parte-2/24-product-search.md) (1) |
| `ClearSearch` | interface | `core-libs/core/src/model/product-search.model.ts:L85-L88` | [46](../parte-2/46-util-modelli.md) (2) |
| `ClearStockData` | class | `feature-libs/pickup-in-store/core/store/actions/stock.action.ts:L67-L73` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `ClearStoreFinderData` | class | `feature-libs/storefinder/core/store/actions/view-all-stores.action.ts:L43-L45` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `ClearUserMiscsData` | class | `core-libs/core/src/user/store/actions/user-misc.action.ts:L10-L12` | [23](../parte-2/23-user.md) (2) |
| `ClientAuthenticationTokenService` | class | `core-libs/core/src/auth/client-auth/services/client-authentication-token.service.ts:L20-L49` | [22](../parte-2/22-auth.md) (1) |
| `ClientAuthModule` | class | `core-libs/core/src/auth/client-auth/client-auth.module.ts:L22-L29` | [06](../parte-1/06-httpclient-interceptor.md) (2), [22](../parte-2/22-auth.md) (4) |
| `ClientTokenEffect` | class | `core-libs/core/src/auth/client-auth/store/effects/client-token.effect.ts:L18-L48` | [22](../parte-2/22-auth.md) (2) |
| `ClientTokenInterceptor` | class | `core-libs/core/src/auth/client-auth/http-interceptors/client-token.interceptor.ts:L32-L112` | [06](../parte-1/06-httpclient-interceptor.md) (12), [21](../parte-2/21-occ.md) (1), [22](../parte-2/22-auth.md) (10) |
| `CloneSavedCartSuccess` | class | `feature-libs/cart/saved-cart/core/store/actions/saved-cart.action.ts:L301-L313` | [25](../parte-2/25-cart.md) (1) |
| `CMS_COMPONENT_NORMALIZER` | const | `core-libs/core/src/cms/connectors/component/converters.ts:L11-L13` | [15](../parte-2/15-cms-core.md) (4) |
| `CMS_FEATURE` | const | `core-libs/core/src/cms/store/cms-state.ts:L12-L12` | [15](../parte-2/15-cms-core.md) (3) |
| `CMS_GET_COMPONENT_FROM_PAGE` | const | `core-libs/core/src/cms/store/actions/components.action.ts:L16-L16` (+1) | [15](../parte-2/15-cms-core.md) (1) |
| `CMS_PAGE_NORMALIZER` | const | `core-libs/core/src/cms/connectors/page/converters.ts:L11-L13` | [15](../parte-2/15-cms-core.md) (5), [21](../parte-2/21-occ.md) (1) |
| `CmsActivatedRouteSnapshot` | interface | `core-libs/core/src/routing/models/cms-route.ts:L19-L21` | [14](../parte-2/14-routing.md) (1) |
| `CmsBreadcrumbsComponent` | interface | `core-libs/core/src/model/cms.model.ts:L168-L168` | [46](../parte-2/46-util-modelli.md) (1) |
| `CmsComponent` | interface | `core-libs/core/src/model/cms.model.ts:L7-L32` | [15](../parte-2/15-cms-core.md) (1), [46](../parte-2/46-util-modelli.md) (4), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `CmsComponentAdapter` | class | `core-libs/core/src/cms/connectors/component/cms-component.adapter.ts:L11-L35` | [15](../parte-2/15-cms-core.md) (3), [21](../parte-2/21-occ.md) (2) |
| `CmsComponentChildRoutesConfig` | interface | `core-libs/core/src/cms/config/cms-config.ts:L48-L58` | [15](../parte-2/15-cms-core.md) (1) |
| `CMSComponentConfig` | interface | `core-libs/core/src/cms/config/cms-config.ts:L103-L107` | [15](../parte-2/15-cms-core.md) (3), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `CmsComponentConnector` | class | `core-libs/core/src/cms/connectors/component/cms-component.connector.ts:L19-L87` | [15](../parte-2/15-cms-core.md) (2) |
| `CmsComponentData` | class | `core-libs/storefront/cms-structure/page/model/cms-component-data.ts:L10-L13` | [01](../parte-1/01-dependency-injection.md) (1), [12](../parte-2/12-feature-module-lazy.md) (1), [16](../parte-2/16-cms-rendering.md) (4), [45](../parte-2/45-componenti-storefront.md) (7), [51](../parte-3/51-ricette-cms-outlet-layout.md) (13) |
| `CmsComponentMapping` | interface | `core-libs/core/src/cms/config/cms-config.ts:L60-L93` | [15](../parte-2/15-cms-core.md) (3), [28](../parte-2/28-organization-b2b.md) (1), [45](../parte-2/45-componenti-storefront.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `CmsComponentsService` | class | `core-libs/storefront/cms-structure/services/cms-components.service.ts:L39-L277` | [03](../parte-1/03-lazy-loading.md) (1), [11](../parte-2/11-configurazione.md) (2), [12](../parte-2/12-feature-module-lazy.md) (2), [16](../parte-2/16-cms-rendering.md) (3), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [50](../parte-3/50-ricette-config-di.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `CmsConfig` | class | `core-libs/core/src/cms/config/cms-config.ts:L128-L134` | [12](../parte-2/12-feature-module-lazy.md) (4), [15](../parte-2/15-cms-core.md) (4), [23](../parte-2/23-user.md) (3), [26](../parte-2/26-checkout.md) (1), [27](../parte-2/27-order.md) (3), [50](../parte-3/50-ricette-config-di.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (5), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (5) |
| `CmsFeaturesService` | class | `core-libs/storefront/cms-structure/services/cms-features.service.ts:L33-L206` | [03](../parte-1/03-lazy-loading.md) (2), [11](../parte-2/11-configurazione.md) (1), [12](../parte-2/12-feature-module-lazy.md) (9), [16](../parte-2/16-cms-rendering.md) (4), [24](../parte-2/24-product-search.md) (3), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2), [47](../parte-2/47-app-demo.md) (3), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `CmsGetComponentFromPage` | class | `core-libs/core/src/cms/store/actions/components.action.ts:L65-L80` | [15](../parte-2/15-cms-core.md) (4) |
| `CmsGuardsService` | class | `core-libs/storefront/cms-structure/services/cms-guards.service.ts:L22-L49` | [05](../parte-1/05-router.md) (1), [12](../parte-2/12-feature-module-lazy.md) (1), [16](../parte-2/16-cms-rendering.md) (3), [26](../parte-2/26-checkout.md) (3) |
| `CmsI18nService` | class | `core-libs/storefront/cms-structure/services/cms-i18n.service.ts:L14-L29` | [16](../parte-2/16-cms-rendering.md) (1), [37](../parte-2/37-i18n.md) (2) |
| `CmsInjectorService` | class | `core-libs/storefront/cms-structure/page/component/services/cms-injector.service.ts:L22-L51` | [03](../parte-1/03-lazy-loading.md) (1), [12](../parte-2/12-feature-module-lazy.md) (1), [16](../parte-2/16-cms-rendering.md) (4) |
| `CmsLcpModule` | class | `core-libs/storefront/cms-structure/cms-lcp-context/cms-lcp.module.ts:L12-L19` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (2), [16](../parte-2/16-cms-rendering.md) (1) |
| `CmsLcpService` | class | `core-libs/storefront/cms-structure/cms-lcp-context/cms-lcp.service.ts:L14-L66` | [16](../parte-2/16-cms-rendering.md) (4) |
| `CmsModule` | class | `core-libs/core/src/cms/cms.module.ts:L17-L24` | [15](../parte-2/15-cms-core.md) (3), [40](../parte-2/40-seo-pwa.md) (1) |
| `CmsOccModule` | class | `core-libs/core/src/occ/adapters/cms/cms-occ.module.ts:L34-L34` | [15](../parte-2/15-cms-core.md) (2), [21](../parte-2/21-occ.md) (3) |
| `CmsPageAction` | type | `core-libs/core/src/cms/store/actions/page.action.ts:L72-L76` | [15](../parte-2/15-cms-core.md) (1) |
| `CmsPageAdapter` | class | `core-libs/core/src/cms/connectors/page/cms-page.adapter.ts:L15-L24` | [15](../parte-2/15-cms-core.md) (4), [21](../parte-2/21-occ.md) (3) |
| `CmsPageConfig` | interface | `core-libs/core/src/cms/config/cms-structure.config.ts:L19-L49` | [15](../parte-2/15-cms-core.md) (3), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `CmsPageConnector` | class | `core-libs/core/src/cms/connectors/page/cms-page.connector.ts:L19-L71` | [15](../parte-2/15-cms-core.md) (4) |
| `CmsPageGuard` | class | `core-libs/storefront/cms-structure/guards/cms-page.guard.ts:L26-L92` | [05](../parte-1/05-router.md) (16), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [12](../parte-2/12-feature-module-lazy.md) (2), [14](../parte-2/14-routing.md) (14), [15](../parte-2/15-cms-core.md) (3), [16](../parte-2/16-cms-rendering.md) (2), [23](../parte-2/23-user.md) (1), [24](../parte-2/24-product-search.md) (1), [25](../parte-2/25-cart.md) (2), [27](../parte-2/27-order.md) (1), [28](../parte-2/28-organization-b2b.md) (1), [29](../parte-2/29-asm.md) (1), [30](../parte-2/30-product-configurator.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (3), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (8), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `CmsPageGuardService` | class | `core-libs/storefront/cms-structure/guards/cms-page-guard.service.ts:L38-L144` | [05](../parte-1/05-router.md) (1), [14](../parte-2/14-routing.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [37](../parte-2/37-i18n.md) (2), [41](../parte-2/41-errori-global-message.md) (1) |
| `CmsPageNotFoundOutboundHttpError` | class | `core-libs/core/src/error-handling/http-error-handler/outbound-http-error.ts:L20-L25` | [06](../parte-1/06-httpclient-interceptor.md) (2), [39](../parte-2/39-ssr-ottimizzato.md) (3), [41](../parte-2/41-errori-global-message.md) (7), [47](../parte-2/47-app-demo.md) (1) |
| `CmsPageSlotConfig` | interface | `core-libs/core/src/cms/config/cms-structure.config.ts:L63-L66` | [15](../parte-2/15-cms-core.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `CmsPageSlotsConfig` | interface | `core-libs/core/src/cms/config/cms-structure.config.ts:L54-L56` | [15](../parte-2/15-cms-core.md) (3) |
| `CmsParagraphComponent` | interface | `core-libs/core/src/model/cms.model.ts:L88-L92` | [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `CmsParagraphModule` | class | `core-libs/storefront/cms-components/content/paragraph/paragraph.module.ts:L35-L35` | [45](../parte-2/45-componenti-storefront.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `CmsRoute` | interface | `core-libs/core/src/routing/models/cms-route.ts:L15-L17` | [14](../parte-2/14-routing.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (4) |
| `CmsRouteData` | interface | `core-libs/core/src/routing/models/cms-route.ts:L10-L13` | [14](../parte-2/14-routing.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `CmsRouteModule` | class | `core-libs/storefront/cms-structure/routing/cms-route/cms-route.module.ts:L20-L20` | [05](../parte-1/05-router.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [14](../parte-2/14-routing.md) (3) |
| `CmsRoutesImplService` | class | `core-libs/storefront/cms-structure/services/cms-routes-impl.service.ts:L33-L183` | [03](../parte-1/03-lazy-loading.md) (2), [05](../parte-1/05-router.md) (1), [12](../parte-2/12-feature-module-lazy.md) (1), [14](../parte-2/14-routing.md) (2), [16](../parte-2/16-cms-rendering.md) (5), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2), [54](../parte-3/54-upgrade-safe.md) (2) |
| `CmsRoutesService` | class | `core-libs/storefront/cms-structure/services/cms-routes.service.ts:L17-L24` | [05](../parte-1/05-router.md) (2), [14](../parte-2/14-routing.md) (1), [16](../parte-2/16-cms-rendering.md) (4), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `CmsService` | class | `core-libs/core/src/cms/facade/cms.service.ts:L36-L310` | [14](../parte-2/14-routing.md) (1), [15](../parte-2/15-cms-core.md) (9), [16](../parte-2/16-cms-rendering.md) (1), [40](../parte-2/40-seo-pwa.md) (1) |
| `CmsSetPageFailIndex` | class | `core-libs/core/src/cms/store/actions/page.action.ts:L53-L69` | [15](../parte-2/15-cms-core.md) (2) |
| `CmsSetPageSuccessIndex` | class | `core-libs/core/src/cms/store/actions/page.action.ts:L45-L51` | [15](../parte-2/15-cms-core.md) (3) |
| `CmsStoreModule` | class | `core-libs/core/src/cms/store/cms-store.module.ts:L45-L45` | [15](../parte-2/15-cms-core.md) (3) |
| `CmsStructureConfig` | class | `core-libs/core/src/cms/config/cms-structure.config.ts:L79-L85` | [15](../parte-2/15-cms-core.md) (3), [51](../parte-3/51-ricette-cms-outlet-layout.md) (5) |
| `CmsStructureConfigService` | class | `core-libs/core/src/cms/services/cms-structure-config.service.ts:L30-L193` | [15](../parte-2/15-cms-core.md) (6) |
| `CmsStructureModel` | interface | `core-libs/core/src/cms/model/page.model.ts:L31-L34` | [15](../parte-2/15-cms-core.md) (1) |
| `CmsStructureOptions` | interface | `core-libs/storefront/cms-structure/utils/cms-structure.model.ts:L15-L36` | [16](../parte-2/16-cms-rendering.md) (1) |
| `CMSTabParagraphContainer` | interface | `core-libs/core/src/model/cms.model.ts:L94-L97` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `CmsTicketInterceptor` | class | `feature-libs/smartedit/root/http-interceptors/cms-ticket.interceptor.ts:L20-L73` | [06](../parte-1/06-httpclient-interceptor.md) (4), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4) |
| `CombinedInjector` | class | `core-libs/core/src/util/combined-injector.ts:L27-L72` | [01](../parte-1/01-dependency-injection.md) (5), [03](../parte-1/03-lazy-loading.md) (9), [12](../parte-2/12-feature-module-lazy.md) (6), [46](../parte-2/46-util-modelli.md) (9), [54](../parte-3/54-upgrade-safe.md) (1) |
| `Command` | class | `core-libs/core/src/util/command-query/command.service.ts:L27-L29` | [20](../parte-2/20-facade-command-query-eventi.md) (2), [23](../parte-2/23-user.md) (7), [26](../parte-2/26-checkout.md) (1), [28](../parte-2/28-organization-b2b.md) (1), [29](../parte-2/29-asm.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (3), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [35](../parte-2/35-integration-opf-payments.md) (2) |
| `CommandService` | class | `core-libs/core/src/util/command-query/command.service.ts:L43-L140` | [20](../parte-2/20-facade-command-query-eventi.md) (6), [24](../parte-2/24-product-search.md) (2), [25](../parte-2/25-cart.md) (2) |
| `CommandStrategy` | enum | `core-libs/core/src/util/command-query/command.service.ts:L31-L38` | [20](../parte-2/20-facade-command-query-eventi.md) (2) |
| `CommonConfiguratorComponentsModule` | class | `feature-libs/product-configurator/common/components/common-configurator-components.module.ts:L26-L26` | [30](../parte-2/30-product-configurator.md) (2) |
| `CommonConfiguratorModule` | class | `feature-libs/product-configurator/common/common-configurator.module.ts:L14-L14` | [30](../parte-2/30-product-configurator.md) (3) |
| `CommonConfiguratorOccModule` | class | `feature-libs/product-configurator/common/occ/common-configurator-occ.module.ts:L14-L14` | [30](../parte-2/30-product-configurator.md) (1) |
| `CommonConfiguratorUISettingsConfig` | class | `feature-libs/product-configurator/common/components/config/common-configurator-ui-settings.config.ts:L23-L25` | [30](../parte-2/30-product-configurator.md) (2) |
| `CommonConfiguratorUtilsService` | class | `feature-libs/product-configurator/common/shared/utils/common-configurator-utils.service.ts:L36-L195` | [30](../parte-2/30-product-configurator.md) (1) |
| `CompactAddToCartComponent` | class | `integration-libs/epd-visualization/components/visual-picking/visual-picking-tab/product-list/compact-add-to-cart/compact-add-to-cart.component.ts:L29-L29` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `COMPONENT_ENTITY` | const | `core-libs/core/src/cms/store/cms-state.ts:L14-L14` | [15](../parte-2/15-cms-core.md) (1) |
| `ComponentCreateEvent` | class | `core-libs/storefront/cms-structure/page/component/events/component.event.ts:L29-L38` | [16](../parte-2/16-cms-rendering.md) (5), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `ComponentData` | interface | `core-libs/schematics/src/shared/utils/file-utils.ts:L70-L79` | [43](../parte-2/43-schematics-migrazioni.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `ComponentDataProvider` | class | `core-libs/storefront/cms-structure/page/component/services/component-data.provider.ts:L22-L60` | [16](../parte-2/16-cms-rendering.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `ComponentDecorator` | class | `core-libs/core/src/cms/decorators/component-decorator.ts:L11-L23` | [12](../parte-2/12-feature-module-lazy.md) (1), [15](../parte-2/15-cms-core.md) (3), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (3) |
| `ComponentDestroyEvent` | class | `core-libs/storefront/cms-structure/page/component/events/component.event.ts:L43-L48` | [16](../parte-2/16-cms-rendering.md) (4) |
| `ComponentEvent` | class | `core-libs/storefront/cms-structure/page/component/events/component.event.ts:L15-L24` | [16](../parte-2/16-cms-rendering.md) (1) |
| `ComponentHandler` | class | `core-libs/storefront/cms-structure/page/component/handlers/component-handler.ts:L21-L45` | [16](../parte-2/16-cms-rendering.md) (5) |
| `ComponentHandlerService` | class | `core-libs/storefront/cms-structure/page/component/services/component-handler.service.ts:L33-L89` | [16](../parte-2/16-cms-rendering.md) (2), [46](../parte-2/46-util-modelli.md) (2) |
| `ComponentsContext` | interface | `core-libs/core/src/cms/store/cms-state.ts:L22-L62` | [15](../parte-2/15-cms-core.md) (3) |
| `ComponentsEffects` | class | `core-libs/core/src/cms/store/effects/components.effect.ts:L25-L120` | [15](../parte-2/15-cms-core.md) (2) |
| `ComponentWrapperDirective` | class | `core-libs/storefront/cms-structure/page/component/component-wrapper.directive.ts:L43-L151` | [01](../parte-1/01-dependency-injection.md) (1), [04](../parte-1/04-change-detection-zone-signals.md) (1), [12](../parte-2/12-feature-module-lazy.md) (1), [15](../parte-2/15-cms-core.md) (2), [16](../parte-2/16-cms-rendering.md) (6), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `Config` | class | `core-libs/core/src/config/config-tokens.ts:L21-L21` (+1) | [01](../parte-1/01-dependency-injection.md) (8), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (7), [11](../parte-2/11-configurazione.md) (27), [12](../parte-2/12-feature-module-lazy.md) (8), [13](../parte-2/13-site-context-theme.md) (1), [14](../parte-2/14-routing.md) (1), [15](../parte-2/15-cms-core.md) (4), [18](../parte-2/18-layout-breakpoint-a11y.md) (2), [19](../parte-2/19-state-management.md) (2), [21](../parte-2/21-occ.md) (4), [22](../parte-2/22-auth.md) (2), [25](../parte-2/25-cart.md) (3), [26](../parte-2/26-checkout.md) (2), [27](../parte-2/27-order.md) (2), [29](../parte-2/29-asm.md) (2), [30](../parte-2/30-product-configurator.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (4), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2), [35](../parte-2/35-integration-opf-payments.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [37](../parte-2/37-i18n.md) (2), [40](../parte-2/40-seo-pwa.md) (2), [41](../parte-2/41-errori-global-message.md) (2), [42](../parte-2/42-feature-toggle-deprecazioni.md) (16), [46](../parte-2/46-util-modelli.md) (2), [47](../parte-2/47-app-demo.md) (1), [50](../parte-3/50-ricette-config-di.md) (18), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (3), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1), [54](../parte-3/54-upgrade-safe.md) (11) |
| `CONFIG_INITIALIZER` | const | `core-libs/core/src/config/config-initializer/config-initializer.ts:L33-L35` | [01](../parte-1/01-dependency-injection.md) (11), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [06](../parte-1/06-httpclient-interceptor.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (12), [11](../parte-2/11-configurazione.md) (12), [13](../parte-2/13-site-context-theme.md) (4), [14](../parte-2/14-routing.md) (1), [37](../parte-2/37-i18n.md) (2), [50](../parte-3/50-ricette-config-di.md) (1) |
| `CONFIG_INITIALIZER_FORROOT_GUARD` | const | `core-libs/core/src/config/config-initializer/config-initializer.ts:L37-L39` | [01](../parte-1/01-dependency-injection.md) (2), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [11](../parte-2/11-configurazione.md) (4), [50](../parte-3/50-ricette-config-di.md) (1) |
| `ConfigChunk` | const | `core-libs/core/src/config/config-tokens.ts:L53-L53` | [01](../parte-1/01-dependency-injection.md) (9), [03](../parte-1/03-lazy-loading.md) (2), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [11](../parte-2/11-configurazione.md) (18), [12](../parte-2/12-feature-module-lazy.md) (4), [16](../parte-2/16-cms-rendering.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [42](../parte-2/42-feature-toggle-deprecazioni.md) (6), [47](../parte-2/47-app-demo.md) (4), [50](../parte-3/50-ricette-config-di.md) (9), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (4), [54](../parte-3/54-upgrade-safe.md) (2) |
| `ConfigDeprecation` | interface | `core-libs/schematics/src/shared/utils/file-utils.ts:L107-L110` | [43](../parte-2/43-schematics-migrazioni.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `ConfigFactory` | type | `core-libs/core/src/config/config-factory.ts:L9-L9` | [11](../parte-2/11-configurazione.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `configFactory()` | function | `core-libs/core/src/config/config-tokens.ts:L10-L12` | [01](../parte-1/01-dependency-injection.md) (3), [10](../parte-2/10-bootstrap-inizializzazione.md) (3), [11](../parte-2/11-configurazione.md) (1) |
| `ConfigInitializer` | interface | `core-libs/core/src/config/config-initializer/config-initializer.ts:L18-L28` | [01](../parte-1/01-dependency-injection.md) (2), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [11](../parte-2/11-configurazione.md) (4), [13](../parte-2/13-site-context-theme.md) (2), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `ConfigInitializerModule` | class | `core-libs/core/src/config/config-initializer/config-initializer.module.ts:L42-L68` | [05](../parte-1/05-router.md) (2), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [11](../parte-2/11-configurazione.md) (3), [13](../parte-2/13-site-context-theme.md) (1) |
| `ConfigInitializerService` | class | `core-libs/core/src/config/config-initializer/config-initializer.service.ts:L24-L176` | [01](../parte-1/01-dependency-injection.md) (2), [10](../parte-2/10-bootstrap-inizializzazione.md) (3), [11](../parte-2/11-configurazione.md) (8), [13](../parte-2/13-site-context-theme.md) (1), [37](../parte-2/37-i18n.md) (1), [50](../parte-3/50-ricette-config-di.md) (2) |
| `ConfigModule` | class | `core-libs/core/src/config/config.module.ts:L14-L67` | [01](../parte-1/01-dependency-injection.md) (3), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (5), [10](../parte-2/10-bootstrap-inizializzazione.md) (3), [11](../parte-2/11-configurazione.md) (7), [50](../parte-3/50-ricette-config-di.md) (1) |
| `ConfigurableRoutesService` | class | `core-libs/core/src/routing/configurable-routes/configurable-routes.service.ts:L22-L186` | [03](../parte-1/03-lazy-loading.md) (1), [05](../parte-1/05-router.md) (4), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [14](../parte-2/14-routing.md) (3) |
| `ConfigurationService` | class | `core-libs/core/src/config/services/configuration.service.ts:L24-L114` | [01](../parte-1/01-dependency-injection.md) (4), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (3), [10](../parte-2/10-bootstrap-inizializzazione.md) (5), [11](../parte-2/11-configurazione.md) (9), [12](../parte-2/12-feature-module-lazy.md) (2), [29](../parte-2/29-asm.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [42](../parte-2/42-feature-toggle-deprecazioni.md) (2), [50](../parte-3/50-ricette-config-di.md) (3), [54](../parte-3/54-upgrade-safe.md) (2) |
| `ConfiguratorActions` | type | `feature-libs/product-configurator/textfield/core/state/actions/configurator-textfield.action.ts:L183-L195` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorAttributeBaseComponent` | class | `feature-libs/product-configurator/rulebased/components/attribute/types/base/configurator-attribute-base.component.ts:L20-L615` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorAttributeCompositionConfig` | class | `feature-libs/product-configurator/rulebased/components/attribute/composition/configurator-attribute-composition.config.ts:L22-L24` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorAttributeCompositionContext` | class | `feature-libs/product-configurator/rulebased/components/attribute/composition/configurator-attribute-composition.model.ts:L12-L21` | [30](../parte-2/30-product-configurator.md) (3) |
| `ConfiguratorAttributePriceChangeService` | class | `feature-libs/product-configurator/rulebased/components/attribute/price-change/configurator-attribute-price-change.service.ts:L31-L113` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorAttributeSelectionBaseComponent` | class | `feature-libs/product-configurator/rulebased/components/attribute/types/base/configurator-attribute-selection-base.component.ts:L24-L61` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorAttributeSingleSelectionBaseComponent` | class | `feature-libs/product-configurator/rulebased/components/attribute/types/base/configurator-attribute-single-selection-base.component.ts:L23-L252` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorBadRequestHandler` | class | `feature-libs/product-configurator/rulebased/root/http-interceptors/configurator-bad-request.handler.ts:L22-L126` | [30](../parte-2/30-product-configurator.md) (4) |
| `ConfiguratorBasicEffectService` | class | `feature-libs/product-configurator/rulebased/core/state/effects/configurator-basic-effect.service.ts:L17-L190` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorCartEntryBundleInfoComponent` | class | `feature-libs/product-configurator/common/components/configurator-cart-entry-bundle-info/configurator-cart-entry-bundle-info.component.ts:L66-L420` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorCartEntryInfoComponent` | class | `feature-libs/product-configurator/common/components/configurator-cart-entry-info/configurator-cart-entry-info.component.ts:L26-L79` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorCartService` | class | `feature-libs/product-configurator/rulebased/core/facade/configurator-cart.service.ts:L25-L293` | [30](../parte-2/30-product-configurator.md) (3) |
| `ConfiguratorCommonsService` | class | `feature-libs/product-configurator/rulebased/core/facade/configurator-commons.service.ts:L25-L539` | [30](../parte-2/30-product-configurator.md) (2) |
| `ConfiguratorConflictSolverDialogLauncherService` | class | `feature-libs/product-configurator/rulebased/components/conflict-solver-dialog/configurator-conflict-solver-dialog-launcher.service.ts:L34-L114` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorCoreConfig` | class | `feature-libs/product-configurator/rulebased/core/config/configurator-core.config.ts:L18-L20` | [30](../parte-2/30-product-configurator.md) (2) |
| `ConfiguratorExpertModeService` | class | `feature-libs/product-configurator/rulebased/core/services/configurator-expert-mode.service.ts:L18-L57` | [30](../parte-2/30-product-configurator.md) (4) |
| `ConfiguratorFormComponent` | class | `feature-libs/product-configurator/rulebased/components/form/configurator-form.component.ts:L50-L213` | [30](../parte-2/30-product-configurator.md) (2) |
| `ConfiguratorFormModule` | class | `feature-libs/product-configurator/rulebased/components/form/configurator-form.module.ts:L33-L33` | [30](../parte-2/30-product-configurator.md) (2) |
| `ConfiguratorGroupComponent` | class | `feature-libs/product-configurator/rulebased/components/group/configurator-group.component.ts:L35-L140` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorGroupModule` | class | `feature-libs/product-configurator/rulebased/components/group/configurator-group.module.ts:L72-L72` | [30](../parte-2/30-product-configurator.md) (3) |
| `ConfiguratorGroupsService` | class | `feature-libs/product-configurator/rulebased/core/facade/configurator-groups.service.ts:L24-L485` | [30](../parte-2/30-product-configurator.md) (2) |
| `ConfiguratorIssuesNotificationComponent` | class | `feature-libs/product-configurator/common/components/configurator-issues-notification/configurator-issues-notification.component.ts:L38-L97` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorMessageConfig` | class | `feature-libs/product-configurator/rulebased/components/config/configurator-message.config.ts:L13-L15` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorModelUtils` | class | `feature-libs/product-configurator/common/shared/utils/configurator-model-utils.ts:L13-L69` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorOverviewFormComponent` | class | `feature-libs/product-configurator/rulebased/components/overview-form/configurator-overview-form.component.ts:L72-L558` | [04](../parte-1/04-change-detection-zone-signals.md) (1) |
| `ConfiguratorQuantityService` | class | `feature-libs/product-configurator/rulebased/core/services/configurator-quantity.service.ts:L16-L36` | [30](../parte-2/30-product-configurator.md) (3) |
| `ConfiguratorRouterExtractorService` | class | `feature-libs/product-configurator/common/components/service/configurator-router-extractor.service.ts:L20-L114` | [30](../parte-2/30-product-configurator.md) (4) |
| `ConfiguratorRouterListener` | class | `feature-libs/product-configurator/rulebased/core/facade/routing/configurator-router.listener.ts:L14-L43` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorRouterModule` | class | `feature-libs/product-configurator/rulebased/core/facade/routing/configurator-router.module.ts:L11-L15` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorTextfieldAdapter` | class | `feature-libs/product-configurator/textfield/core/connectors/configurator-textfield.adapter.ts:L12-L66` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorTextfieldConnector` | class | `feature-libs/product-configurator/textfield/core/connectors/configurator-textfield.connector.ts:L15-L72` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorType` | enum | `feature-libs/product-configurator/common/core/model/common-configurator.model.ts:L60-L64` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfiguratorUISettingsConfig` | class | `feature-libs/product-configurator/rulebased/components/config/configurator-ui-settings.config.ts:L55-L57` | [30](../parte-2/30-product-configurator.md) (2) |
| `ConfiguratorUpdateMessageModule` | class | `feature-libs/product-configurator/rulebased/components/update-message/configurator-update-message.module.ts:L35-L35` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfigureCartEntryComponent` | class | `feature-libs/product-configurator/common/components/configure-cart-entry/configure-cart-entry.component.ts:L50-L347` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfigureProductComponent` | class | `feature-libs/product-configurator/common/components/configure-product/configure-product.component.ts:L38-L160` | [30](../parte-2/30-product-configurator.md) (2) |
| `ConfigureProductModule` | class | `feature-libs/product-configurator/common/components/configure-product/configure-product.module.ts:L46-L46` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConfigValidator` | type | `core-libs/core/src/config/config-validator/config-validator.ts:L20-L20` | [11](../parte-2/11-configurazione.md) (5), [50](../parte-3/50-ricette-config-di.md) (2) |
| `ConfigValidatorModule` | class | `core-libs/core/src/config/config-validator/config-validator.module.ts:L46-L63` | [01](../parte-1/01-dependency-injection.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [11](../parte-2/11-configurazione.md) (2) |
| `ConfigValidatorToken` | const | `core-libs/core/src/config/config-validator/config-validator.ts:L11-L13` | [01](../parte-1/01-dependency-injection.md) (2), [11](../parte-2/11-configurazione.md) (3), [50](../parte-3/50-ricette-config-di.md) (1) |
| `ConfirmActionDialogMappingConfig` | type | `feature-libs/quote/components/config/quote-ui.config.ts:L41-L45` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `ConfirmationMessageComponent` | class | `feature-libs/organization/administration/components/shared/message/confirmation/confirmation-message.component.ts:L31-L64` | [28](../parte-2/28-organization-b2b.md) (1) |
| `ConflictHandler` | class | `core-libs/core/src/global-message/http-interceptors/handlers/conflict/conflict.handler.ts:L16-L29` | [41](../parte-2/41-errori-global-message.md) (1), [50](../parte-3/50-ricette-config-di.md) (2) |
| `ConflictHeaderId` | const | `feature-libs/product-configurator/rulebased/core/model/configurator.model.ts:L387-L387` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConflictIdPrefix` | const | `feature-libs/product-configurator/rulebased/core/model/configurator.model.ts:L386-L386` | [30](../parte-2/30-product-configurator.md) (1) |
| `ConsentManagementComponent` | class | `core-libs/storefront/cms-components/myaccount/consent-management/components/consent-management.component.ts:L64-L403` | [04](../parte-1/04-change-detection-zone-signals.md) (1), [23](../parte-2/23-user.md) (2) |
| `ConsentManagementComponentService` | class | `core-libs/storefront/cms-components/myaccount/consent-management/consent-management-component.service.ts:L11-L25` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `ConsentManagementModule` | class | `core-libs/storefront/cms-components/myaccount/consent-management/consent-management.module.ts:L63-L63` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `ConsentReferenceInterceptor` | class | `integration-libs/cds/src/profiletag/http-interceptors/consent-reference-interceptor.ts:L19-L46` | [06](../parte-1/06-httpclient-interceptor.md) (3), [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `ConsentService` | class | `core-libs/core/src/user/facade/consent.service.ts:L18-L126` | [23](../parte-2/23-user.md) (3) |
| `Consignment` | interface | `feature-libs/order/root/model/order.model.ts:L74-L82` (+1) | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `CONSIGNMENT_TRACKING_NORMALIZER` | const | `feature-libs/order/root/tokens/converters.ts:L40-L42` | [27](../parte-2/27-order.md) (1) |
| `ConstructorDeprecation` | interface | `core-libs/schematics/src/shared/utils/file-utils.ts:L81-L91` | [43](../parte-2/43-schematics-migrazioni.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `ContainerRowGroupIdPrefix` | const | `feature-libs/product-configurator/rulebased/core/model/configurator.model.ts:L388-L388` | [30](../parte-2/30-product-configurator.md) (1) |
| `ContentPageMetaResolver` | class | `core-libs/core/src/cms/page/content-page-meta.resolver.ts:L32-L65` | [40](../parte-2/40-seo-pwa.md) (5), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `ContentSlotComponentData` | interface | `core-libs/core/src/cms/model/content-slot-component-data.model.ts:L7-L12` | [15](../parte-2/15-cms-core.md) (3), [16](../parte-2/16-cms-rendering.md) (1) |
| `ContentSlotData` | interface | `core-libs/core/src/cms/model/content-slot-data.model.ts:L9-L12` | [15](../parte-2/15-cms-core.md) (3) |
| `ContextService` | class | `core-libs/storefront/context/context.service.ts:L17-L38` | [14](../parte-2/14-routing.md) (4) |
| `ContextServiceMap` | class | `core-libs/core/src/site-context/providers/context-service-map.ts:L18-L20` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [13](../parte-2/13-site-context-theme.md) (10) |
| `ContextToken` | type | `core-libs/storefront/context/context.model.ts:L7-L7` | [54](../parte-3/54-upgrade-safe.md) (1) |
| `Converter` | interface | `core-libs/core/src/util/converter.service.ts:L21-L30` | [01](../parte-1/01-dependency-injection.md) (1), [21](../parte-2/21-occ.md) (1), [46](../parte-2/46-util-modelli.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (5) |
| `ConverterService` | class | `core-libs/core/src/util/converter.service.ts:L35-L142` | [01](../parte-1/01-dependency-injection.md) (5), [12](../parte-2/12-feature-module-lazy.md) (1), [21](../parte-2/21-occ.md) (8), [24](../parte-2/24-product-search.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [44](../parte-2/44-test-tooling.md) (2), [46](../parte-2/46-util-modelli.md) (10), [52](../parte-3/52-ricette-occ-dati.md) (5) |
| `COST_CENTER_NORMALIZER` | const | `core-libs/core/src/cost-center/connectors/cost-center/converters.ts:L12-L14` | [28](../parte-2/28-organization-b2b.md) (1) |
| `COST_CENTER_SERIALIZER` | const | `core-libs/core/src/cost-center/connectors/cost-center/converters.ts:L20-L22` | [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `CostCenter` | interface | `core-libs/core/src/model/org-unit.model.ts:L11-L16` (+1) | [28](../parte-2/28-organization-b2b.md) (1), [46](../parte-2/46-util-modelli.md) (3), [54](../parte-3/54-upgrade-safe.md) (1) |
| `CostCenterOccModule` | class | `core-libs/core/src/occ/adapters/cost-center/cost-center-occ.module.ts:L40-L40` | [21](../parte-2/21-occ.md) (1), [28](../parte-2/28-organization-b2b.md) (3), [43](../parte-2/43-schematics-migrazioni.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `Country` | interface | `core-libs/core/src/model/address.model.ts:L9-L12` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `CountryType` | enum | `core-libs/core/src/model/address.model.ts:L14-L17` | [46](../parte-2/46-util-modelli.md) (2) |
| `CouponClaimComponent` | class | `core-libs/storefront/cms-components/myaccount/my-coupons/coupon-claim/coupon-claim.component.ts:L20-L59` | [23](../parte-2/23-user.md) (2) |
| `CouponSearchPageResolver` | class | `core-libs/core/src/product/services/coupon-search-page-meta.resolver.ts:L33-L96` | [24](../parte-2/24-product-search.md) (3), [40](../parte-2/40-seo-pwa.md) (6), [54](../parte-3/54-upgrade-safe.md) (1) |
| `CPQ_CONFIGURATOR_NORMALIZER` | const | `feature-libs/product-configurator/rulebased/cpq/common/converters/cpq-configurator.converters.ts:L12-L14` | [30](../parte-2/30-product-configurator.md) (1) |
| `CPQ_QUOTE_MODULE` | const | `core-libs/schematics/src/shared/lib-configs/integration-libs/cpq-quote-schematics-config.ts:L23-L23` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `CpqConfiguratorCommonModule` | class | `feature-libs/product-configurator/rulebased/cpq/common/cpq-configurator-common.module.ts:L45-L45` | [30](../parte-2/30-product-configurator.md) (1) |
| `CpqConfiguratorOccAdapter` | class | `feature-libs/product-configurator/rulebased/cpq/occ/cpq-configurator-occ.adapter.ts:L23-L161` | [30](../parte-2/30-product-configurator.md) (2) |
| `CpqConfiguratorOccModule` | class | `feature-libs/product-configurator/rulebased/cpq/occ/cpq-configurator-occ.module.ts:L41-L41` | [30](../parte-2/30-product-configurator.md) (2) |
| `CpqConfiguratorOccService` | class | `feature-libs/product-configurator/rulebased/cpq/occ/cpq-configurator-occ.service.ts:L31-L455` | [30](../parte-2/30-product-configurator.md) (2) |
| `CpqConfiguratorPageLayoutHandler` | class | `feature-libs/product-configurator/rulebased/root/cpq/cpq-configurator-page-layout-handler.ts:L31-L161` | [30](../parte-2/30-product-configurator.md) (3) |
| `CpqConfiguratorRootModule` | class | `feature-libs/product-configurator/rulebased/root/cpq/cpq-configurator-root.module.ts:L21-L21` | [30](../parte-2/30-product-configurator.md) (5) |
| `CpqDiscountModule` | class | `integration-libs/cpq-quote/cpq-quote-discount/cpq-discount.module.ts:L59-L59` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `CpqQuoteDiscountComponent` | class | `integration-libs/cpq-quote/cpq-quote-discount/components/cpq-quote-discount-tbody/cpq-quote.component.ts:L23-L72` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CpqQuoteHeadingComponent` | class | `integration-libs/cpq-quote/cpq-quote-discount/components/cpq-quote-heading/cpq-quote-heading.component.ts:L27-L80` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `CpqQuoteModule` | class | `integration-libs/cpq-quote/cpq-quote.module.ts:L13-L13` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (5), [47](../parte-2/47-app-demo.md) (2) |
| `CpqQuoteOfferComponent` | class | `integration-libs/cpq-quote/cpq-quote-discount/components/cpq-quote/cpq-quote-offer.component.ts:L24-L75` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CpqQuoteRootModule` | class | `integration-libs/cpq-quote/root/cpq-quote-root.module.ts:L10-L10` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `CpqQuoteService` | class | `integration-libs/cpq-quote/cpq-quote-discount/cpq-qute.service.ts:L13-L23` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `CpqQuoteSharedService` | class | `integration-libs/cpq-quote/cpq-quote-discount/cpq-qute-shared.service.ts:L16-L24` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (6) |
| `CREATE_CART` | const | `feature-libs/cart/base/core/store/actions/cart.action.ts:L12-L12` | [25](../parte-2/25-cart.md) (1) |
| `CREATE_CART_SUCCESS` | const | `feature-libs/cart/base/core/store/actions/cart.action.ts:L14-L14` | [25](../parte-2/25-cart.md) (2) |
| `CreateB2BUser` | class | `feature-libs/organization/administration/core/store/actions/b2b-user.action.ts:L128-L134` | [28](../parte-2/28-organization-b2b.md) (1) |
| `CreateB2BUserSuccess` | class | `feature-libs/organization/administration/core/store/actions/b2b-user.action.ts:L147-L153` | [28](../parte-2/28-organization-b2b.md) (2) |
| `CreateBudgetSuccess` | class | `feature-libs/organization/administration/core/store/actions/budget.action.ts:L124-L130` | [28](../parte-2/28-organization-b2b.md) (1) |
| `CreateCart` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L52-L57` | [25](../parte-2/25-cart.md) (4) |
| `CreateCartEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L35-L40` | [25](../parte-2/25-cart.md) (2), [35](../parte-2/35-integration-opf-payments.md) (1) |
| `CreateCartSuccess` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L78-L83` | [25](../parte-2/25-cart.md) (3) |
| `CreateConfiguration` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L91-L103` (+1) | [30](../parte-2/30-product-configurator.md) (2) |
| `CreateConfigurationSuccess` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L121-L127` (+1) | [30](../parte-2/30-product-configurator.md) (1) |
| `createStylePreprocessorOptions()` | function | `core-libs/schematics/src/add-spartacus/index.ts:L371-L439` | [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `CreateWishList` | class | `feature-libs/cart/wish-list/core/store/actions/wish-list.action.ts:L20-L30` | [25](../parte-2/25-cart.md) (1) |
| `CsAgentAuthService` | class | `feature-libs/asm/root/services/csagent-auth.service.ts:L31-L210` | [29](../parte-2/29-asm.md) (3) |
| `CSAgentLoginFormComponent` | class | `feature-libs/asm/components/csagent-login-form/csagent-login-form.component.ts:L37-L65` | [29](../parte-2/29-asm.md) (1) |
| `CsrfStateService` | class | `core-libs/core/src/auth/user-auth/facade/csrf-state.service.ts:L16-L26` | [22](../parte-2/22-auth.md) (2) |
| `Currency` | interface | `core-libs/core/src/model/misc.model.ts:L10-L15` (+1) | [46](../parte-2/46-util-modelli.md) (2) |
| `CURRENCY_CHANGE` | const | `core-libs/core/src/site-context/store/actions/currencies.action.ts:L15-L15` | [13](../parte-2/13-site-context-theme.md) (1), [23](../parte-2/23-user.md) (1), [24](../parte-2/24-product-search.md) (1), [25](../parte-2/25-cart.md) (1), [27](../parte-2/27-order.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `CURRENCY_CONTEXT_ID` | const | `core-libs/core/src/site-context/providers/context-ids.ts:L8-L8` | [13](../parte-2/13-site-context-theme.md) (1) |
| `CurrencyChange` | class | `core-libs/core/src/site-context/store/actions/currencies.action.ts:L39-L44` | [13](../parte-2/13-site-context-theme.md) (2) |
| `CurrencyInitializer` | class | `core-libs/core/src/site-context/services/currency-initializer.ts:L19-L69` | [10](../parte-2/10-bootstrap-inizializzazione.md) (2) |
| `CurrencyService` | class | `core-libs/core/src/site-context/facade/currency.service.ts:L26-L104` | [06](../parte-1/06-httpclient-interceptor.md) (1), [13](../parte-2/13-site-context-theme.md) (4) |
| `CurrencySetEvent` | class | `core-libs/core/src/site-context/events/site-context.events.ts:L23-L29` | [13](../parte-2/13-site-context-theme.md) (5), [23](../parte-2/23-user.md) (1), [26](../parte-2/26-checkout.md) (3) |
| `CurrencyStatePersistenceService` | class | `core-libs/core/src/site-context/services/currency-state-persistence.service.ts:L15-L43` | [13](../parte-2/13-site-context-theme.md) (1) |
| `CURRENT_CONTEXT_KEY` | const | `core-libs/core/src/cms/utils/cms-utils.ts:L10-L10` | [15](../parte-2/15-cms-core.md) (1) |
| `CurrentBudgetService` | class | `feature-libs/organization/administration/components/budget/services/current-budget.service.ts:L20-L43` | [28](../parte-2/28-organization-b2b.md) (1) |
| `CurrentItemService` | class | `feature-libs/organization/administration/components/shared/current-item.service.ts:L19-L70` | [28](../parte-2/28-organization-b2b.md) (3) |
| `CurrentLocationService` | class | `feature-libs/pickup-in-store/components/services/current-location.service.ts:L16-L39` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `CurrentProductService` | class | `core-libs/storefront/cms-components/product/current-product.service.ts:L21-L58` | [24](../parte-2/24-product-search.md) (2), [25](../parte-2/25-cart.md) (1), [30](../parte-2/30-product-configurator.md) (1) |
| `CUSTOMER_LISTS_NORMALIZER` | const | `feature-libs/asm/core/connectors/converters.ts:L15-L17` | [29](../parte-2/29-asm.md) (1) |
| `CUSTOMER_SEARCH_PAGE_NORMALIZER` | const | `feature-libs/asm/core/connectors/converters.ts:L11-L13` (+1) | [29](../parte-2/29-asm.md) (1) |
| `CustomerCouponAdapter` | class | `core-libs/core/src/user/connectors/customer-coupon/customer-coupon.adapter.ts:L14-L46` | [23](../parte-2/23-user.md) (1) |
| `CustomerCouponSearchResult` | interface | `core-libs/core/src/model/customer-coupon.model.ts:L27-L31` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `CustomerEffects` | class | `feature-libs/asm/core/store/effects/customer.effect.ts:L17-L74` | [29](../parte-2/29-asm.md) (1) |
| `CustomerEmulationComponent` | class | `feature-libs/asm/components/customer-emulation/customer-emulation.component.ts:L29-L99` | [29](../parte-2/29-asm.md) (1) |
| `CustomerListColumnActionType` | enum | `feature-libs/asm/root/model/customer-list.model.ts:L28-L33` | [29](../parte-2/29-asm.md) (1) |
| `CustomerListComponent` | class | `feature-libs/asm/components/customer-list/customer-list.component.ts:L78-L440` | [29](../parte-2/29-asm.md) (1) |
| `CustomerSearch` | class | `feature-libs/asm/core/store/actions/customer.action.ts:L28-L33` | [29](../parte-2/29-asm.md) (1) |
| `CustomerSearchFail` | class | `feature-libs/asm/core/store/actions/customer.action.ts:L35-L43` | [29](../parte-2/29-asm.md) (4) |
| `CustomerSelectionComponent` | class | `feature-libs/asm/components/customer-selection/customer-selection.component.ts:L61-L434` | [29](../parte-2/29-asm.md) (1) |
| `CustomerTicketingCloseComponentService` | class | `feature-libs/customer-ticketing/components/details/customer-ticketing-close/customer-ticketing-close-component.service.ts:L15-L31` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CustomerTicketingConfig` | class | `feature-libs/customer-ticketing/root/config/customer-ticketing-config.ts:L14-L27` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `CustomerTicketingDialogComponent` | class | `feature-libs/customer-ticketing/components/shared/customer-ticketing-dialog/customer-ticketing-dialog.component.ts:L27-L123` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `CustomerTicketingEventModule` | class | `feature-libs/customer-ticketing/root/events/customer-ticketing-event.module.ts:L11-L15` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `CustomerTicketingFacade` | class | `feature-libs/customer-ticketing/root/facade/customer-ticketing.facade.ts:L41-L85` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `CustomerTicketingMessagesComponentService` | class | `feature-libs/customer-ticketing/components/details/customer-ticketing-messages/customer-ticketing-messages-component.service.ts:L11-L15` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CustomerTicketingModule` | class | `feature-libs/customer-ticketing/customer-ticketing.module.ts:L19-L19` | [31](../parte-2/31-quote-ticketing-subscription.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (4) |
| `CustomerTicketingPageMetaResolver` | class | `feature-libs/customer-ticketing/core/services/customer-ticketing-page-meta.resolver.ts:L30-L102` | [31](../parte-2/31-quote-ticketing-subscription.md) (2), [40](../parte-2/40-seo-pwa.md) (2) |
| `CustomerTicketingReopenComponentService` | class | `feature-libs/customer-ticketing/components/details/customer-ticketing-reopen/customer-ticketing-reopen-component.service.ts:L15-L32` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `CustomerTicketingService` | class | `feature-libs/customer-ticketing/core/facade/customer-ticketing.service.ts:L56-L373` | [31](../parte-2/31-quote-ticketing-subscription.md) (3) |
| `CustomFormValidators` | class | `core-libs/storefront/shared/utils/validators/custom-form-validators.ts:L26-L433` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `CustomLoginGuard` | class | `core-libs/core/src/auth/user-auth/guards/custom-login.guard.ts:L50-L138` | [22](../parte-2/22-auth.md) (7), [23](../parte-2/23-user.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `CustomSerializer` | class | `core-libs/core/src/routing/store/reducers/router.reducer.ts:L109-L240` | [05](../parte-1/05-router.md) (11), [14](../parte-2/14-routing.md) (5), [20](../parte-2/20-facade-command-query-eventi.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3) |
| `CX_KEY` | const | `core-libs/core/src/state/reducers/transfer-state.reducer.ts:L16-L16` | [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [13](../parte-2/13-site-context-theme.md) (1), [19](../parte-2/19-state-management.md) (3), [54](../parte-3/54-upgrade-safe.md) (1) |
| `CxApiService` | class | `core-libs/storefront/cms-structure/page/component/services/cx-api.service.ts:L36-L76` | [04](../parte-1/04-change-detection-zone-signals.md) (1), [16](../parte-2/16-cms-rendering.md) (3), [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `CxCommonEngine` | class | `core-libs/setup/ssr/engine/cx-common-engine.ts:L20-L67` | [04](../parte-1/04-change-detection-zone-signals.md) (1), [07](../parte-1/07-ssr-hydration-transferstate.md) (8), [39](../parte-2/39-ssr-ottimizzato.md) (5), [47](../parte-2/47-app-demo.md) (2) |
| `CxDatePipe` | class | `core-libs/core/src/i18n/date.pipe.ts:L14-L56` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [37](../parte-2/37-i18n.md) (6) |
| `CxErrorHandler` | class | `core-libs/core/src/error-handling/cx-error-handler.ts:L19-L31` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [39](../parte-2/39-ssr-ottimizzato.md) (3), [41](../parte-2/41-errori-global-message.md) (15) |
| `CxErrorHandlerEffect` | class | `core-libs/core/src/error-handling/effects-error-handler/cx-error-handler.effect.ts:L19-L33` | [32](../parte-2/32-pickup-storefinder-delivery.md) (3), [41](../parte-2/41-errori-global-message.md) (6) |
| `CxEvent` | class | `core-libs/core/src/event/cx-event.ts:L12-L17` | [12](../parte-2/12-feature-module-lazy.md) (2), [20](../parte-2/20-facade-command-query-eventi.md) (12), [24](../parte-2/24-product-search.md) (1), [25](../parte-2/25-cart.md) (1), [26](../parte-2/26-checkout.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2), [50](../parte-3/50-ricette-config-di.md) (8), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `CxNumericPipe` | class | `core-libs/core/src/i18n/numeric.pipe.ts:L13-L53` | [37](../parte-2/37-i18n.md) (6) |
| `CxRovingTabindexDirective` | class | `core-libs/storefront/shared/directives/roving-tabindex/roving-tabindex.directive.ts:L59-L430` | [45](../parte-2/45-componenti-storefront.md) (2) |

## D

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `Data` | interface | `feature-libs/product-configurator/common/components/service/configurator-router-data.ts:L13-L29` | [30](../parte-2/30-product-configurator.md) (1) |
| `DatePickerComponent` | class | `core-libs/storefront/shared/components/form/date-picker/date-picker.component.ts:L38-L69` | [37](../parte-2/37-i18n.md) (1) |
| `DatePickerService` | class | `core-libs/storefront/shared/components/form/date-picker/date-picker.service.ts:L24-L77` | [37](../parte-2/37-i18n.md) (2) |
| `DateRangeModalComponent` | class | `feature-libs/subscription-billing/components/list/billing/date-range-modal/date-range-modal.component.ts:L36-L95` | [31](../parte-2/31-quote-ticketing-subscription.md) (3) |
| `DateValidationService` | class | `feature-libs/requested-delivery-date/root/components/shared/date-validation.service.ts:L12-L52` | [32](../parte-2/32-pickup-storefinder-delivery.md) (4) |
| `DebugInterceptor` | class | `integration-libs/cds/src/profiletag/http-interceptors/debug-interceptor.ts:L19-L42` | [06](../parte-1/06-httpclient-interceptor.md) (3), [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `DEFAULT_AUTH_HTTP_HEADER_SERVICE` | const | `core-libs/core/src/auth/user-auth/services/auth-http-header.service.ts:L55-L71` | [22](../parte-2/22-auth.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT` | const | `core-libs/core/src/util/occ-http-error-handlers.ts:L31-L31` | [35](../parte-2/35-integration-opf-payments.md) (1), [46](../parte-2/46-util-modelli.md) (2) |
| `DEFAULT_LCP_PRESENCE` | const | `core-libs/storefront/shared/lcp-context/lcp-presence.token.ts:L11-L13` | [16](../parte-2/16-cms-rendering.md) (1) |
| `DEFAULT_SCOPE` | const | `core-libs/core/src/occ/occ-models/occ-endpoints.model.ts:L7-L7` | [21](../parte-2/21-occ.md) (3), [24](../parte-2/24-product-search.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `DEFAULT_SERVER_ERROR_RETRIES_COUNT` | const | `core-libs/core/src/util/occ-http-error-handlers.ts:L30-L30` | [46](../parte-2/46-util-modelli.md) (1) |
| `DEFAULT_URL_MATCHER` | const | `core-libs/core/src/routing/url-matcher/default-url-matcher.ts:L35-L45` | [05](../parte-1/05-router.md) (3), [14](../parte-2/14-routing.md) (3), [16](../parte-2/16-cms-rendering.md) (1) |
| `DefaultCacheEntrySizeCalculator` | class | `core-libs/setup/ssr/optimized-engine/rendering-cache/default-cache-entry-size-calculator.ts:L24-L75` | [39](../parte-2/39-ssr-ottimizzato.md) (4) |
| `defaultCheckoutComponentsConfig()` | function | `feature-libs/checkout/b2b/root/checkout-b2b-root.module.ts:L33-L42` (+2) | [26](../parte-2/26-checkout.md) (2) |
| `DefaultComponentHandler` | class | `core-libs/storefront/cms-structure/page/component/handlers/default-component.handler.ts:L27-L86` | [03](../parte-1/03-lazy-loading.md) (3), [12](../parte-2/12-feature-module-lazy.md) (1), [16](../parte-2/16-cms-rendering.md) (8), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3) |
| `DefaultConfig` | const | `core-libs/core/src/config/config-tokens.ts:L32-L35` | [01](../parte-1/01-dependency-injection.md) (6), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [11](../parte-2/11-configurazione.md) (9), [12](../parte-2/12-feature-module-lazy.md) (1), [42](../parte-2/42-feature-toggle-deprecazioni.md) (3), [50](../parte-3/50-ricette-config-di.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `DefaultConfigChunk` | const | `core-libs/core/src/config/config-tokens.ts:L60-L62` | [01](../parte-1/01-dependency-injection.md) (10), [03](../parte-1/03-lazy-loading.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [11](../parte-2/11-configurazione.md) (14), [12](../parte-2/12-feature-module-lazy.md) (4), [16](../parte-2/16-cms-rendering.md) (1), [29](../parte-2/29-asm.md) (1), [30](../parte-2/30-product-configurator.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [42](../parte-2/42-feature-toggle-deprecazioni.md) (4), [47](../parte-2/47-app-demo.md) (1), [50](../parte-3/50-ricette-config-di.md) (4), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `DefaultExpressServerLogger` | class | `core-libs/setup/ssr/logger/loggers/default-express-server-logger.ts:L28-L133` | [39](../parte-2/39-ssr-ottimizzato.md) (6) |
| `DefaultFeatureToggles` | const | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L33-L43` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (4), [44](../parte-2/44-test-tooling.md) (1) |
| `DefaultFeatureTogglesChunk` | const | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L75-L78` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (4) |
| `defaultOrderComponentsConfig()` | function | `feature-libs/order/root/order-root.module.ts:L68-L80` | [27](../parte-2/27-order.md) (1) |
| `DefaultRoutePageMetaResolver` | class | `core-libs/core/src/cms/page/routing/default-route-page-meta.resolver.ts:L22-L79` | [40](../parte-2/40-seo-pwa.md) (4) |
| `DeferLoaderService` | class | `core-libs/storefront/layout/loading/defer-loader.service.ts:L22-L65` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [16](../parte-2/16-cms-rendering.md) (1), [17](../parte-2/17-outlet.md) (4), [18](../parte-2/18-layout-breakpoint-a11y.md) (5) |
| `DeferLoadingStrategy` | enum | `core-libs/core/src/cms/config/cms-config.ts:L96-L101` | [15](../parte-2/15-cms-core.md) (1), [16](../parte-2/16-cms-rendering.md) (2), [17](../parte-2/17-outlet.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3) |
| `DELEGATED_AUTH_HTTP_HEADER_SERVICE` | const | `core-libs/core/src/auth/user-auth/services/auth-http-header.service.ts:L79-L82` | [22](../parte-2/22-auth.md) (1), [29](../parte-2/29-asm.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `DELETE_CART` | const | `feature-libs/cart/base/core/store/actions/cart.action.ts:L35-L35` | [20](../parte-2/20-facade-command-query-eventi.md) (1) |
| `DELETE_CART_SUCCESS` | const | `feature-libs/cart/base/core/store/actions/cart.action.ts:L36-L36` | [25](../parte-2/25-cart.md) (1) |
| `DeleteCart` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L270-L273` | [25](../parte-2/25-cart.md) (1) |
| `DeleteCartEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L180-L185` | [19](../parte-2/19-state-management.md) (1), [26](../parte-2/26-checkout.md) (1) |
| `DeleteCartFail` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L282-L288` | [25](../parte-2/25-cart.md) (2) |
| `DeleteCartFailEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L194-L199` | [25](../parte-2/25-cart.md) (1) |
| `DeleteCartSuccess` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L275-L280` | [25](../parte-2/25-cart.md) (1) |
| `DeleteCartSuccessEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L187-L192` | [25](../parte-2/25-cart.md) (1) |
| `DeleteItemComponent` | class | `feature-libs/organization/administration/components/shared/detail/delete-item-action/delete-item.component.ts:L28-L122` | [28](../parte-2/28-organization-b2b.md) (1) |
| `DeleteUserAddress` | class | `core-libs/core/src/user/store/actions/user-addresses.action.ts:L114-L120` | [23](../parte-2/23-user.md) (1) |
| `DeleteUserAddressEvent` | class | `core-libs/core/src/user/events/user.events.ts:L20-L23` | [23](../parte-2/23-user.md) (2), [26](../parte-2/26-checkout.md) (1) |
| `DELIVERY_MODE_NORMALIZER` | const | `feature-libs/checkout/base/core/connectors/checkout-delivery-modes/converters.ts:L11-L13` | [26](../parte-2/26-checkout.md) (1) |
| `DeliveryMode` | interface | `core-libs/core/src/occ/occ-models/occ.models.ts:L516-L524` (+1) | [25](../parte-2/25-cart.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `DeliveryModeDatePickerComponent` | class | `feature-libs/requested-delivery-date/root/components/delivery-mode-date-picker/delivery-mode-date-picker.component.ts:L53-L181` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `DeliveryModePreferences` | enum | `feature-libs/checkout/base/root/config/checkout-config.ts:L12-L16` | [26](../parte-2/26-checkout.md) (1) |
| `DeliveryPointsService` | class | `feature-libs/pickup-in-store/components/services/delivery-points.service.ts:L25-L161` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `DeprecatedNode` | interface | `core-libs/schematics/src/shared/utils/file-utils.ts:L101-L105` | [43](../parte-2/43-schematics-migrazioni.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `DIALOG_TYPE` | enum | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L81-L88` | [18](../parte-2/18-layout-breakpoint-a11y.md) (3) |
| `DigitalPaymentsModule` | class | `integration-libs/digital-payments/src/digital-payments.module.ts:L13-L13` | [35](../parte-2/35-integration-opf-payments.md) (5), [47](../parte-2/47-app-demo.md) (3) |
| `Direction` | interface | `core-libs/storefront/layout/direction/config/direction.model.ts:L29-L56` | [38](../parte-2/38-stili-theming.md) (1) |
| `DirectionConfig` | class | `core-libs/storefront/layout/direction/config/direction.config.ts:L29-L31` | [38](../parte-2/38-stili-theming.md) (2) |
| `DirectionMode` | enum | `core-libs/storefront/layout/direction/config/direction.model.ts:L14-L23` | [38](../parte-2/38-stili-theming.md) (3) |
| `DirectionModule` | class | `core-libs/storefront/layout/direction/direction.module.ts:L35-L35` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [38](../parte-2/38-stili-theming.md) (1) |
| `DirectionService` | class | `core-libs/storefront/layout/direction/direction.service.ts:L31-L118` | [11](../parte-2/11-configurazione.md) (1), [38](../parte-2/38-stili-theming.md) (7) |
| `DirectiveStateTransferService` | class | `core-libs/storefront/utils/directive-state-transfer.service.ts:L18-L42` | [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [39](../parte-2/39-ssr-ottimizzato.md) (1), [46](../parte-2/46-util-modelli.md) (1) |
| `DissmissConflictDialoge` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L496-L502` | [30](../parte-2/30-product-configurator.md) (1) |
| `DOCUMENT` | const | `core-libs/schematics/src/shared/constants.ts:L1004-L1004` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [46](../parte-2/46-util-modelli.md) (3) |
| `DomChangeDirective` | class | `core-libs/storefront/layout/a11y/on-dom-change/dom-change.directive.ts:L29-L66` | [18](../parte-2/18-layout-breakpoint-a11y.md) (2) |
| `DownloadOrderInvoicesEvent` | class | `feature-libs/order/root/events/order.events.ts:L63-L72` | [27](../parte-2/27-order.md) (2) |
| `DP_DETAILS_NORMALIZER` | const | `integration-libs/digital-payments/src/checkout/adapters/converters.ts:L11-L13` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `DP_REQUEST_NORMALIZER` | const | `integration-libs/digital-payments/src/checkout/adapters/converters.ts:L15-L17` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `DpCheckoutModule` | class | `integration-libs/digital-payments/src/checkout/dp-checkout.module.ts:L42-L42` | [35](../parte-2/35-integration-opf-payments.md) (4) |
| `DpCheckoutPaymentService` | class | `integration-libs/digital-payments/src/checkout/facade/dp-checkout-payment.service.ts:L27-L115` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `DpPaymentFormComponent` | class | `integration-libs/digital-payments/src/checkout/cms-components/dp-payment-method/dp-payment-form/dp-payment-form.component.ts:L23-L58` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `DpPaymentMethodComponent` | class | `integration-libs/digital-payments/src/checkout/cms-components/dp-payment-method/dp-payment-method.component.ts:L46-L94` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `DpPaymentMethodModule` | class | `integration-libs/digital-payments/src/checkout/cms-components/dp-payment-method/dp-payment-method.module.ts:L45-L45` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `DynamicAttributeService` | class | `core-libs/core/src/cms/services/dynamic-attribute.service.ts:L23-L65` | [12](../parte-2/12-feature-module-lazy.md) (1), [15](../parte-2/15-cms-core.md) (3), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `DynamicTemplate` | class | `integration-libs/cds/src/utils/dynamic-template.ts:L7-L18` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |

## E

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `EditSavedCart` | class | `feature-libs/cart/saved-cart/core/store/actions/saved-cart.action.ts:L238-L251` | [25](../parte-2/25-cart.md) (4) |
| `EffectsErrorHandlerModule` | class | `core-libs/core/src/error-handling/effects-error-handler/effects-error-handler.module.ts:L15-L22` | [41](../parte-2/41-errori-global-message.md) (2) |
| `EMAIL_PATTERN` | const | `core-libs/core/src/util/regex-pattern.ts:L8-L9` | [46](../parte-2/46-util-modelli.md) (1) |
| `ENDS_WITH_LEGAL_CHARACTER_PATTERN` | const | `core-libs/core/src/util/regex-pattern.ts:L35-L36` | [46](../parte-2/46-util-modelli.md) (1) |
| `EntitiesModel` | interface | `core-libs/core/src/model/misc.model.ts:L67-L71` | [46](../parte-2/46-util-modelli.md) (1) |
| `EntityFailAction` | class | `core-libs/core/src/state/utils/entity-loader/entity-loader.action.ts:L79-L88` | [41](../parte-2/41-errori-global-message.md) (1) |
| `EntityLoadAction` | class | `core-libs/core/src/state/utils/entity-loader/entity-loader.action.ts:L71-L77` | [19](../parte-2/19-state-management.md) (1), [23](../parte-2/23-user.md) (1), [25](../parte-2/25-cart.md) (1), [27](../parte-2/27-order.md) (1) |
| `EntityLoaderResetAction` | class | `core-libs/core/src/state/utils/entity-loader/entity-loader.action.ts:L102-L108` | [15](../parte-2/15-cms-core.md) (1), [30](../parte-2/30-product-configurator.md) (1) |
| `EntityLoaderState` | type | `core-libs/core/src/state/utils/entity-loader/entity-loader-state.ts:L10-L10` | [19](../parte-2/19-state-management.md) (2) |
| `EntityMeta` | interface | `core-libs/core/src/state/utils/entity/entity.action.ts:L14-L18` | [19](../parte-2/19-state-management.md) (1) |
| `EntityProcessesDecrementAction` | class | `core-libs/core/src/state/utils/entity-processes-loader/entity-processes-loader.action.ts:L80-L88` | [25](../parte-2/25-cart.md) (1), [30](../parte-2/30-product-configurator.md) (1) |
| `EntityProcessesIncrementAction` | class | `core-libs/core/src/state/utils/entity-processes-loader/entity-processes-loader.action.ts:L70-L78` | [19](../parte-2/19-state-management.md) (1), [25](../parte-2/25-cart.md) (1), [30](../parte-2/30-product-configurator.md) (1) |
| `EntityProcessesLoaderResetAction` | class | `core-libs/core/src/state/utils/entity-processes-loader/entity-processes-loader.action.ts:L60-L68` | [19](../parte-2/19-state-management.md) (1) |
| `EntityProcessesLoaderState` | type | `core-libs/core/src/state/utils/entity-processes-loader/entity-processes-loader-state.ts:L10-L12` | [30](../parte-2/30-product-configurator.md) (1) |
| `EntityRemoveAction` | class | `core-libs/core/src/state/utils/entity/entity.action.ts:L48-L54` | [25](../parte-2/25-cart.md) (1) |
| `EntityRemoveAllAction` | class | `core-libs/core/src/state/utils/entity/entity.action.ts:L56-L62` | [25](../parte-2/25-cart.md) (1) |
| `EntityScopedResetAction` | class | `core-libs/core/src/state/utils/scoped-loader/entity-scoped-loader.actions.ts:L117-L124` | [24](../parte-2/24-product-search.md) (1) |
| `EntityState` | interface | `core-libs/core/src/state/utils/entity/entity-state.ts:L7-L11` | [19](../parte-2/19-state-management.md) (1) |
| `EntitySuccessAction` | class | `core-libs/core/src/state/utils/entity-loader/entity-loader.action.ts:L90-L100` | [25](../parte-2/25-cart.md) (2) |
| `EpdVisualizationApiModule` | class | `integration-libs/epd-visualization/epd-visualization-api/epd-visualization-api.module.ts:L24-L24` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `EpdVisualizationConfig` | class | `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L19-L24` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `EpdVisualizationRootModule` | class | `integration-libs/epd-visualization/root/epd-visualization-root.module.ts:L38-L38` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `ErrorAction` | interface | `core-libs/core/src/error-handling/effects-error-handler/error-action.ts:L9-L11` | [19](../parte-2/19-state-management.md) (1), [41](../parte-2/41-errori-global-message.md) (3) |
| `ErrorActionService` | class | `core-libs/core/src/error-handling/effects-error-handler/error-action.service.ts:L20-L57` | [41](../parte-2/41-errori-global-message.md) (9) |
| `ErrorHandlingModule` | class | `core-libs/core/src/error-handling/error-handling.module.ts:L19-L32` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (2), [06](../parte-1/06-httpclient-interceptor.md) (3), [41](../parte-2/41-errori-global-message.md) (4) |
| `ErrorModel` | interface | `core-libs/core/src/model/misc.model.ts:L92-L98` (+1) | [41](../parte-2/41-errori-global-message.md) (2), [46](../parte-2/46-util-modelli.md) (2) |
| `EscapeFocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L64-L70` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `EscapeFocusService` | class | `core-libs/storefront/layout/a11y/keyboard-focus/escape/escape-focus.service.ts:L15-L43` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `EstimatedDeliveryDateComponent` | class | `feature-libs/estimated-delivery-date/show-estimated-delivery-date/components/estimated-delivery-date.component.ts:L25-L74` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `EstimatedDeliveryDateModule` | class | `feature-libs/estimated-delivery-date/estimated-delivery-date.module.ts:L13-L13` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2), [47](../parte-2/47-app-demo.md) (1) |
| `EstimatedDeliveryDateRootModule` | class | `feature-libs/estimated-delivery-date/root/estimated-delivery-date-root.module.ts:L10-L10` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `EventService` | class | `core-libs/core/src/event/event.service.ts:L47-L223` | [12](../parte-2/12-feature-module-lazy.md) (1), [13](../parte-2/13-site-context-theme.md) (1), [16](../parte-2/16-cms-rendering.md) (1), [19](../parte-2/19-state-management.md) (1), [20](../parte-2/20-facade-command-query-eventi.md) (13), [22](../parte-2/22-auth.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [45](../parte-2/45-componenti-storefront.md) (1), [50](../parte-3/50-ricette-config-di.md) (5), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (3), [54](../parte-3/54-upgrade-safe.md) (1) |
| `EXPIRED_REFRESH_TOKEN_HANDLERS` | const | `core-libs/core/src/auth/user-auth/services/auth-http-header-handler.ts:L21-L23` | [22](../parte-2/22-auth.md) (5), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (6) |
| `ExpiredRefreshTokenHandler` | interface | `core-libs/core/src/auth/user-auth/services/auth-http-header-handler.ts:L17-L19` | [22](../parte-2/22-auth.md) (5) |
| `EXPRESS_SERVER_LOGGER` | const | `core-libs/setup/ssr/logger/loggers/express-server-logger.ts:L46-L48` | [39](../parte-2/39-ssr-ottimizzato.md) (7) |
| `ExpressCheckoutService` | class | `feature-libs/checkout/base/components/services/express-checkout.service.ts:L30-L176` | [26](../parte-2/26-checkout.md) (2) |
| `ExpressLoggerService` | class | `core-libs/setup/ssr/logger/services/express-logger.service.ts:L25-L62` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [39](../parte-2/39-ssr-ottimizzato.md) (7), [41](../parte-2/41-errori-global-message.md) (1) |
| `ExpressServerLogger` | interface | `core-libs/setup/ssr/logger/loggers/express-server-logger.ts:L30-L36` | [39](../parte-2/39-ssr-ottimizzato.md) (5) |
| `ExpressServerLoggerContext` | interface | `core-libs/setup/ssr/logger/loggers/express-server-logger.ts:L14-L17` | [39](../parte-2/39-ssr-ottimizzato.md) (1) |
| `ExtendSubscriptionFrequencyDropdownOptionsConfig` | class | `feature-libs/subscription-billing/root/config/extend-subscription-dropdown-options-config.ts:L14-L19` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `ExternalRoutesConfig` | class | `core-libs/core/src/routing/external-routes/external-routes-config.ts:L18-L20` | [14](../parte-2/14-routing.md) (2) |
| `ExternalRoutesGuard` | class | `core-libs/core/src/routing/external-routes/external-routes.guard.ts:L13-L42` | [05](../parte-1/05-router.md) (1), [14](../parte-2/14-routing.md) (1) |
| `ExternalRoutesModule` | class | `core-libs/core/src/routing/external-routes/external-routes.module.ts:L15-L29` | [05](../parte-1/05-router.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `ExternalRoutesService` | class | `core-libs/core/src/routing/external-routes/external-routes.service.ts:L19-L71` | [14](../parte-2/14-routing.md) (1) |

## F

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `FacadeDescriptor` | interface | `core-libs/core/src/lazy-loading/facade-factory/facade-descriptor.ts:L10-L37` | [12](../parte-2/12-feature-module-lazy.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `facadeFactory()` | function | `core-libs/core/src/lazy-loading/facade-factory/facade-factory.ts:L20-L24` | [12](../parte-2/12-feature-module-lazy.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `FacadeFactoryService` | class | `core-libs/core/src/lazy-loading/facade-factory/facade-factory.service.ts:L32-L141` | [03](../parte-1/03-lazy-loading.md) (1), [12](../parte-2/12-feature-module-lazy.md) (2), [20](../parte-2/20-facade-command-query-eventi.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `Facet` | interface | `core-libs/core/src/model/product-search.model.ts:L35-L61` (+1) | [46](../parte-2/46-util-modelli.md) (4), [54](../parte-3/54-upgrade-safe.md) (1) |
| `FacetChangedEvent` | class | `core-libs/core/src/product/event/product.events.ts:L12-L37` | [24](../parte-2/24-product-search.md) (3) |
| `FacetService` | class | `core-libs/storefront/cms-components/product/product-list/product-facet-navigation/services/facet.service.ts:L27-L160` | [24](../parte-2/24-product-search.md) (3) |
| `FEATURE_TOGGLES_COPIED_FROM_CORE_LIB_PATH` | const | `core-libs/schematics/src/shared/constants.ts:L1176-L1177` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `FeatureConfigService` | class | `core-libs/core/src/features-config/services/feature-config.service.ts:L21-L34` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (14), [44](../parte-2/44-test-tooling.md) (1), [54](../parte-3/54-upgrade-safe.md) (7) |
| `FeatureDirective` | class | `core-libs/core/src/features-config/directives/feature.directive.ts:L12-L30` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (3), [44](../parte-2/44-test-tooling.md) (1) |
| `FeatureLevelDirective` | class | `core-libs/core/src/features-config/directives/feature-level.directive.ts:L14-L32` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (4), [54](../parte-3/54-upgrade-safe.md) (1) |
| `FeatureModuleConfig` | interface | `core-libs/core/src/cms/config/cms-config.ts:L109-L122` | [03](../parte-1/03-lazy-loading.md) (2), [12](../parte-2/12-feature-module-lazy.md) (2), [15](../parte-2/15-cms-core.md) (2), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [47](../parte-2/47-app-demo.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `FeatureModulesService` | class | `core-libs/core/src/lazy-loading/feature-modules.service.ts:L16-L124` | [03](../parte-1/03-lazy-loading.md) (4), [12](../parte-2/12-feature-module-lazy.md) (8), [16](../parte-2/16-cms-rendering.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [47](../parte-2/47-app-demo.md) (2), [50](../parte-3/50-ricette-config-di.md) (1) |
| `FeaturesConfig` | class | `core-libs/core/src/features-config/config/features-config.ts:L31-L118` | [11](../parte-2/11-configurazione.md) (1), [42](../parte-2/42-feature-toggle-deprecazioni.md) (11) |
| `FeaturesConfigModule` | class | `core-libs/core/src/features-config/features-config.module.ts:L27-L53` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (3) |
| `FeatureStylesService` | class | `core-libs/core/src/features-config/services/feature-styles.service.ts:L26-L163` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [38](../parte-2/38-stili-theming.md) (7), [42](../parte-2/42-feature-toggle-deprecazioni.md) (8) |
| `FeatureToggleExpression` | type | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L28-L28` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (3) |
| `FeatureToggleKey` | type | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L27-L27` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (2) |
| `FeatureToggles` | class | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L24-L24` (+1) | [42](../parte-2/42-feature-toggle-deprecazioni.md) (24), [44](../parte-2/44-test-tooling.md) (3), [47](../parte-2/47-app-demo.md) (3), [54](../parte-3/54-upgrade-safe.md) (7) |
| `FeatureTogglesChunk` | const | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L64-L67` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (6), [44](../parte-2/44-test-tooling.md) (1), [47](../parte-2/47-app-demo.md) (2) |
| `FeatureTogglesFactory` | type | `core-libs/core/src/features-config/feature-toggles/feature-toggles-providers.ts:L14-L14` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (2) |
| `FeatureTogglesInterface` | interface | `core-libs/core/src/features-config/feature-toggles/config/feature-toggles.ts:L11-L1011` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (6) |
| `FederatedLoginConfig` | class | `core-libs/core/src/federated-login/config/federated-login-config.ts:L14-L47` | [22](../parte-2/22-auth.md) (2) |
| `FederatedLoginContextSerializerService` | class | `core-libs/core/src/federated-login/services/federated-login-context-serializer.service.ts:L13-L72` | [46](../parte-2/46-util-modelli.md) (1) |
| `FederatedLoginGuard` | class | `core-libs/core/src/auth/user-auth/guards/federated-login.guard.ts:L32-L105` | [05](../parte-1/05-router.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [14](../parte-2/14-routing.md) (2), [22](../parte-2/22-auth.md) (4) |
| `FederatedLoginModule` | class | `core-libs/core/src/federated-login/federated-login.module.ts:L17-L17` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [22](../parte-2/22-auth.md) (1) |
| `FederatedLoginService` | class | `core-libs/core/src/federated-login/services/federated-login.service.ts:L17-L106` | [22](../parte-2/22-auth.md) (1) |
| `FileDownloadService` | class | `core-libs/storefront/shared/services/file/file-download.service.ts:L12-L30` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `FilesFormValidators` | class | `core-libs/storefront/shared/services/file/files-form-validators.ts:L13-L86` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `FIND_STORE_BY_ID_SUCCESS` | const | `feature-libs/storefinder/core/store/actions/find-stores.action.ts:L22-L23` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `FIND_STORES_SUCCESS` | const | `feature-libs/storefinder/core/store/actions/find-stores.action.ts:L18-L18` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `FindStores` | class | `feature-libs/storefinder/core/store/actions/find-stores.action.ts:L33-L48` | [32](../parte-2/32-pickup-storefinder-delivery.md) (3) |
| `FindStoresOnHold` | class | `feature-libs/storefinder/core/store/actions/find-stores.action.ts:L25-L31` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `FocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L149-L149` | [18](../parte-2/18-layout-breakpoint-a11y.md) (3) |
| `FocusDirective` | class | `core-libs/storefront/layout/a11y/keyboard-focus/focus.directive.ts:L13-L25` | [18](../parte-2/18-layout-breakpoint-a11y.md) (6) |
| `FocusFirstInvalidFieldDirective` | class | `core-libs/storefront/layout/a11y/focus-first-invalid-field/focus-first-invalid-field.directive.ts:L34-L53` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `FooterNavigationComponent` | class | `core-libs/storefront/cms-components/navigation/footer-navigation/footer-navigation.component.ts:L23-L36` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `ForbiddenHandler` | class | `core-libs/core/src/global-message/http-interceptors/handlers/forbidden/forbidden.handler.ts:L20-L50` | [41](../parte-2/41-errori-global-message.md) (6) |
| `ForgotPasswordComponent` | class | `feature-libs/user/profile/components/forgot-password/forgot-password.component.ts:L45-L62` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `FormComponent` | class | `feature-libs/organization/administration/components/shared/form/form.component.ts:L50-L143` | [28](../parte-2/28-organization-b2b.md) (6) |
| `FormConfig` | class | `core-libs/storefront/shared/config/form-config.ts:L14-L18` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `FormErrorsComponent` | class | `core-libs/storefront/shared/components/form/form-errors/form-errors.component.ts:L39-L143` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `FormModule` | class | `feature-libs/organization/administration/components/shared/form/form.module.ts:L32-L32` | [28](../parte-2/28-organization-b2b.md) (1) |
| `FormService` | class | `feature-libs/organization/administration/components/shared/form/form.service.ts:L12-L58` | [28](../parte-2/28-organization-b2b.md) (2) |
| `FutureStockFacade` | class | `feature-libs/product/future-stock/root/facade/future-stock.facade.ts:L24-L29` | [24](../parte-2/24-product-search.md) (1) |
| `FutureStockService` | class | `feature-libs/product/future-stock/core/services/future-stock.service.ts:L20-L48` | [24](../parte-2/24-product-search.md) (1) |

## G

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `GatewayTimeoutHandler` | class | `core-libs/core/src/global-message/http-interceptors/handlers/gateway/gateway-timeout.handler.ts:L16-L29` | [41](../parte-2/41-errori-global-message.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `generateMappings()` | function | `core-libs/schematics/src/shared/schematics-config-mappings.ts:L262-L267` | [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `GenericLinkComponentService` | class | `core-libs/storefront/shared/components/generic-link/generic-link-component.service.ts:L12-L39` | [45](../parte-2/45-componenti-storefront.md) (4) |
| `GeoPoint` | interface | `core-libs/core/src/model/misc.model.ts:L23-L26` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `getAddressesLoading()` | const | `core-libs/core/src/user/store/selectors/user-addresses.selectors.ts:L24-L27` | [23](../parte-2/23-user.md) (1) |
| `GetConfigurationOverview` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L383-L389` | [30](../parte-2/30-product-configurator.md) (1) |
| `getCostCenterState()` | const | `feature-libs/organization/administration/core/store/selectors/cost-center.selector.ts:L92-L102` | [26](../parte-2/26-checkout.md) (1) |
| `getNextPageContext()` | const | `core-libs/core/src/routing/store/selectors/routing.selector.ts:L34-L41` | [14](../parte-2/14-routing.md) (2), [15](../parte-2/15-cms-core.md) (1) |
| `getOrderDetails()` | const | `feature-libs/order/core/store/selectors/order-details.selectors.ts:L18-L21` (+1) | [27](../parte-2/27-order.md) (2) |
| `GetOrderEntriesContext` | interface | `feature-libs/cart/base/root/context/get-order-entries.context.ts:L13-L20` | [25](../parte-2/25-cart.md) (1) |
| `getReducers()` | function | `feature-libs/asm/core/store/reducers/index.ts:L24-L34` (+16) | [15](../parte-2/15-cms-core.md) (1), [27](../parte-2/27-order.md) (1) |
| `getRouterState()` | const | `core-libs/core/src/routing/store/selectors/routing.selector.ts:L18-L19` | [28](../parte-2/28-organization-b2b.md) (1) |
| `getServerRequestProviders()` | function | `core-libs/setup/ssr/providers/ssr-providers.ts:L53-L66` | [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [39](../parte-2/39-ssr-ottimizzato.md) (1), [46](../parte-2/46-util-modelli.md) (2), [47](../parte-2/47-app-demo.md) (1) |
| `GetSubscriptionByCodeReloadEvent` | class | `feature-libs/subscription-billing/root/events/subscription-billing.events.ts:L9-L11` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `GetTicketQueryReloadEvent` | class | `feature-libs/customer-ticketing/root/events/customer-ticketing.events.ts:L13-L15` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `GigyaRaasComponent` | class | `integration-libs/cdc/components/gigya-raas/gigya-raas.component.ts:L35-L148` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (6) |
| `GigyaRaasComponentData` | interface | `integration-libs/cdc/core/models/cms.model.ts:L9-L42` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `GigyaRaasGuard` | class | `integration-libs/cdc/components/gigya-raas/gigya-raas.guard.ts:L32-L123` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `GigyaRaasModule` | class | `integration-libs/cdc/components/gigya-raas/gigya-raas.module.ts:L35-L35` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `GIVE_USER_CONSENT` | const | `core-libs/core/src/user/store/actions/user-consents.action.ts:L22-L22` | [23](../parte-2/23-user.md) (1) |
| `GiveUserConsent` | class | `core-libs/core/src/user/store/actions/user-consents.action.ts:L71-L83` | [19](../parte-2/19-state-management.md) (1) |
| `GiveUserConsentFail` | class | `core-libs/core/src/user/store/actions/user-consents.action.ts:L85-L94` | [19](../parte-2/19-state-management.md) (1) |
| `GiveUserConsentSuccess` | class | `core-libs/core/src/user/store/actions/user-consents.action.ts:L96-L102` | [19](../parte-2/19-state-management.md) (1) |
| `GLOBAL_MESSAGE_FEATURE` | const | `core-libs/core/src/global-message/store/global-message-state.ts:L9-L9` | [41](../parte-2/41-errori-global-message.md) (2) |
| `GlobalMessage` | interface | `core-libs/core/src/global-message/models/global-message.model.ts:L17-L21` | [41](../parte-2/41-errori-global-message.md) (1), [50](../parte-3/50-ricette-config-di.md) (2) |
| `GlobalMessageComponent` | class | `core-libs/storefront/cms-components/misc/global-message/global-message.component.ts:L33-L51` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [41](../parte-2/41-errori-global-message.md) (2), [45](../parte-2/45-componenti-storefront.md) (2) |
| `GlobalMessageComponentModule` | class | `core-libs/storefront/cms-components/misc/global-message/global-message.module.ts:L17-L17` | [41](../parte-2/41-errori-global-message.md) (2), [45](../parte-2/45-componenti-storefront.md) (1) |
| `GlobalMessageConfig` | class | `core-libs/core/src/global-message/config/global-message-config.ts:L19-L27` | [41](../parte-2/41-errori-global-message.md) (3) |
| `GlobalMessageEffect` | class | `core-libs/core/src/global-message/store/effects/global-message.effect.ts:L30-L114` | [41](../parte-2/41-errori-global-message.md) (2) |
| `GlobalMessageModule` | class | `core-libs/core/src/global-message/global-message.module.ts:L26-L33` | [06](../parte-1/06-httpclient-interceptor.md) (1), [41](../parte-2/41-errori-global-message.md) (2) |
| `GlobalMessageService` | class | `core-libs/core/src/global-message/facade/global-message.service.ts:L24-L73` | [25](../parte-2/25-cart.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [35](../parte-2/35-integration-opf-payments.md) (7), [41](../parte-2/41-errori-global-message.md) (2) |
| `GlobalMessageStoreModule` | class | `core-libs/core/src/global-message/store/global-message-store.module.ts:L21-L21` | [41](../parte-2/41-errori-global-message.md) (1) |
| `GlobalMessageType` | enum | `core-libs/core/src/global-message/models/global-message.model.ts:L9-L15` | [41](../parte-2/41-errori-global-message.md) (1), [45](../parte-2/45-componenti-storefront.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `GlobalMessageTypeConfig` | type | `core-libs/core/src/global-message/config/global-message-config.ts:L11-L13` | [41](../parte-2/41-errori-global-message.md) (2) |
| `GlobService` | class | `core-libs/core/src/util/glob.service.ts:L11-L33` | [05](../parte-1/05-router.md) (1), [46](../parte-2/46-util-modelli.md) (2) |
| `GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG` | const | `feature-libs/storefinder/root/config/constants.ts:L7-L7` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2), [47](../parte-2/47-app-demo.md) (1) |
| `GoogleMapRendererService` | class | `feature-libs/storefinder/core/service/google-map-renderer.service.ts:L19-L292` | [32](../parte-2/32-pickup-storefinder-delivery.md) (3) |
| `GroupType` | enum | `feature-libs/product-configurator/rulebased/core/model/configurator.model.ts:L295-L302` (+1) | [30](../parte-2/30-product-configurator.md) (1) |
| `GtmCollectorConfig` | interface | `feature-libs/tracking/tms/gtm/config/default-gtm.config.ts:L10-L12` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `GtmCollectorService` | class | `feature-libs/tracking/tms/gtm/services/gtm-collector.service.ts:L20-L63` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (6) |
| `GtmModule` | class | `feature-libs/tracking/tms/gtm/gtm.module.ts:L14-L14` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (5), [47](../parte-2/47-app-demo.md) (1) |
| `GuardsComposer` | class | `core-libs/storefront/cms-structure/services/guards-composer.ts:L31-L94` | [05](../parte-1/05-router.md) (5), [14](../parte-2/14-routing.md) (3), [16](../parte-2/16-cms-rendering.md) (3), [24](../parte-2/24-product-search.md) (1), [28](../parte-2/28-organization-b2b.md) (1), [46](../parte-2/46-util-modelli.md) (1) |

## H

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `HamburgerMenuComponent` | class | `core-libs/storefront/layout/header/hamburger-menu/hamburger-menu.component.ts:L19-L29` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [15](../parte-2/15-cms-core.md) (2), [18](../parte-2/18-layout-breakpoint-a11y.md) (3) |
| `HamburgerMenuModule` | class | `core-libs/storefront/layout/header/hamburger-menu/hamburger-menu.module.ts:L25-L25` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `HamburgerMenuService` | class | `core-libs/storefront/layout/header/hamburger-menu/hamburger-menu.service.ts:L15-L36` | [18](../parte-2/18-layout-breakpoint-a11y.md) (2) |
| `HierarchicalAddressConfig` | class | `core-libs/core/src/user/config/hierarchical-address-config.ts:L14-L23` | [23](../parte-2/23-user.md) (2) |
| `HighlightPipe` | class | `core-libs/storefront/cms-components/navigation/search-box/highlight.pipe.ts:L10-L31` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `HOME_PAGE_CONTEXT` | const | `core-libs/core/src/routing/models/page-context.model.ts:L15-L15` | [05](../parte-1/05-router.md) (1), [14](../parte-2/14-routing.md) (2), [15](../parte-2/15-cms-core.md) (1) |
| `HomePageEvent` | class | `core-libs/storefront/events/home/home-page.events.ts:L12-L15` | [20](../parte-2/20-facade-command-query-eventi.md) (8) |
| `HomePageEventBuilder` | class | `core-libs/storefront/events/home/home-page-event.builder.ts:L17-L36` | [20](../parte-2/20-facade-command-query-eventi.md) (4) |
| `HomePageEventModule` | class | `core-libs/storefront/events/home/home-page-event.module.ts:L11-L15` | [20](../parte-2/20-facade-command-query-eventi.md) (2) |
| `HTTP_TIMEOUT_CONFIG` | const | `core-libs/core/src/http/http-timeout/http-timeout.config.ts:L16-L18` | [06](../parte-1/06-httpclient-interceptor.md) (8), [21](../parte-2/21-occ.md) (5), [50](../parte-3/50-ricette-config-di.md) (1) |
| `HttpErrorHandler` | class | `core-libs/core/src/global-message/http-interceptors/handlers/http-error.handler.ts:L15-L74` | [06](../parte-1/06-httpclient-interceptor.md) (4), [25](../parte-2/25-cart.md) (3), [26](../parte-2/26-checkout.md) (1), [28](../parte-2/28-organization-b2b.md) (5), [30](../parte-2/30-product-configurator.md) (3), [31](../parte-2/31-quote-ticketing-subscription.md) (5), [32](../parte-2/32-pickup-storefinder-delivery.md) (6), [41](../parte-2/41-errori-global-message.md) (7), [46](../parte-2/46-util-modelli.md) (1), [50](../parte-3/50-ricette-config-di.md) (11), [54](../parte-3/54-upgrade-safe.md) (4) |
| `HttpErrorHandlerInterceptor` | class | `core-libs/core/src/error-handling/http-error-handler/http-error-handler.interceptor.ts:L41-L99` | [04](../parte-1/04-change-detection-zone-signals.md) (1), [06](../parte-1/06-httpclient-interceptor.md) (11), [39](../parte-2/39-ssr-ottimizzato.md) (1), [41](../parte-2/41-errori-global-message.md) (20) |
| `HttpErrorInterceptor` | class | `core-libs/core/src/global-message/http-interceptors/http-error.interceptor.ts:L23-L66` | [06](../parte-1/06-httpclient-interceptor.md) (8), [12](../parte-2/12-feature-module-lazy.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [41](../parte-2/41-errori-global-message.md) (11), [46](../parte-2/46-util-modelli.md) (3), [50](../parte-3/50-ricette-config-di.md) (1), [54](../parte-3/54-upgrade-safe.md) (3) |
| `HttpErrorModel` | class | `core-libs/core/src/model/misc.model.ts:L100-L106` | [21](../parte-2/21-occ.md) (3), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [41](../parte-2/41-errori-global-message.md) (5), [46](../parte-2/46-util-modelli.md) (9) |
| `HttpModule` | class | `core-libs/core/src/http/http.module.ts:L13-L19` | [06](../parte-1/06-httpclient-interceptor.md) (1), [21](../parte-2/21-occ.md) (1) |
| `HttpParamsURIEncoder` | class | `core-libs/core/src/util/http-params-uri.encoder.ts:L16-L32` | [06](../parte-1/06-httpclient-interceptor.md) (6), [21](../parte-2/21-occ.md) (2), [35](../parte-2/35-integration-opf-payments.md) (1), [46](../parte-2/46-util-modelli.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `HttpResponseStatus` | enum | `core-libs/core/src/global-message/models/response-status.model.ts:L7-L17` | [41](../parte-2/41-errori-global-message.md) (3), [50](../parte-3/50-ricette-config-di.md) (1) |
| `HttpTimeoutConfig` | interface | `core-libs/core/src/http/http-timeout/http-timeout.config.ts:L23-L33` | [21](../parte-2/21-occ.md) (1) |
| `HttpTimeoutInterceptor` | class | `core-libs/core/src/http/http-timeout/http-timeout.interceptor.ts:L27-L125` | [06](../parte-1/06-httpclient-interceptor.md) (9), [21](../parte-2/21-occ.md) (5), [41](../parte-2/41-errori-global-message.md) (4) |
| `HttpTimeoutModule` | class | `core-libs/core/src/http/http-timeout/http-timeout.module.ts:L23-L23` | [06](../parte-1/06-httpclient-interceptor.md) (1), [21](../parte-2/21-occ.md) (1) |

## I

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `I18nConfig` | class | `core-libs/core/src/i18n/config/i18n-config.ts:L18-L92` | [11](../parte-2/11-configurazione.md) (1), [37](../parte-2/37-i18n.md) (4), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (3) |
| `I18nConfigInitializer` | class | `core-libs/core/src/i18n/config/i18n-config-initializer.ts:L15-L34` | [11](../parte-2/11-configurazione.md) (4), [37](../parte-2/37-i18n.md) (4) |
| `I18NEXT_HTTP_BACKEND_CLIENT` | const | `core-libs/core/src/i18n/i18next/i18next-backend/i18next-http-backend-client.ts:L16-L44` | [06](../parte-1/06-httpclient-interceptor.md) (4), [37](../parte-2/37-i18n.md) (4) |
| `I18NEXT_INSTANCE` | const | `core-libs/core/src/i18n/i18next/i18next-instance.ts:L19-L22` | [37](../parte-2/37-i18n.md) (5) |
| `I18NEXT_LOGGER_PLUGIN` | const | `core-libs/core/src/i18n/i18next/i18next-plugins/i18next-logger-plugin.ts:L17-L40` | [37](../parte-2/37-i18n.md) (3), [54](../parte-3/54-upgrade-safe.md) (1) |
| `I18nextBackendInitializer` | class | `core-libs/core/src/i18n/i18next/i18next-backend/i18next-backend.initializer.ts:L15-L27` | [37](../parte-2/37-i18n.md) (2) |
| `I18nextBackendService` | class | `core-libs/core/src/i18n/i18next/i18next-backend/i18next-backend.service.ts:L21-L39` | [37](../parte-2/37-i18n.md) (2), [46](../parte-2/46-util-modelli.md) (2) |
| `I18nextHttpBackendInitializer` | class | `core-libs/core/src/i18n/i18next/i18next-backend/i18next-http-backend.initializer.ts:L24-L92` | [37](../parte-2/37-i18n.md) (4) |
| `I18nextInitializer` | class | `core-libs/core/src/i18n/i18next/i18next-initializer.ts:L21-L111` | [37](../parte-2/37-i18n.md) (3) |
| `I18nextResourcesToBackendInitializer` | class | `core-libs/core/src/i18n/i18next/i18next-backend/i18next-resources-to-backend.initializer.ts:L15-L38` | [37](../parte-2/37-i18n.md) (4) |
| `I18nextTranslationService` | class | `core-libs/core/src/i18n/i18next/i18next-translation.service.ts:L17-L124` | [37](../parte-2/37-i18n.md) (3) |
| `I18nModule` | class | `core-libs/core/src/i18n/i18n.module.ts:L40-L57` | [37](../parte-2/37-i18n.md) (3), [40](../parte-2/40-seo-pwa.md) (1) |
| `I18nTestingModule` | class | `core-libs/core/src/i18n/testing/i18n-testing.module.ts:L20-L20` | [37](../parte-2/37-i18n.md) (4), [54](../parte-3/54-upgrade-safe.md) (1) |
| `ICON_TYPE` | enum | `core-libs/storefront/cms-components/misc/icon/icon.model.ts:L11-L77` | [45](../parte-2/45-componenti-storefront.md) (5), [54](../parte-3/54-upgrade-safe.md) (2) |
| `IconComponent` | class | `core-libs/storefront/cms-components/misc/icon/icon.component.ts:L47-L131` | [38](../parte-2/38-stili-theming.md) (1), [45](../parte-2/45-componenti-storefront.md) (2) |
| `IconConfig` | class | `core-libs/storefront/cms-components/misc/icon/icon.model.ts:L83-L85` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `IconLoaderService` | class | `core-libs/storefront/cms-components/misc/icon/icon-loader.service.ts:L22-L171` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `IconModule` | class | `core-libs/storefront/cms-components/misc/icon/icon.module.ts:L23-L23` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `IconOptions` | interface | `core-libs/storefront/cms-components/misc/icon/icon.model.ts:L91-L121` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `IconResourceType` | enum | `core-libs/storefront/cms-components/misc/icon/icon.model.ts:L133-L149` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `IconTestingModule` | class | `core-libs/storefront/cms-components/misc/icon/testing/icon-testing.module.ts:L50-L50` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `Image` | interface | `core-libs/core/src/model/image.model.ts:L11-L34` (+3) | [45](../parte-2/45-componenti-storefront.md) (1), [46](../parte-2/46-util-modelli.md) (1) |
| `ImageGroup` | interface | `core-libs/core/src/model/image.model.ts:L41-L43` | [45](../parte-2/45-componenti-storefront.md) (1), [46](../parte-2/46-util-modelli.md) (2) |
| `ImageLoadingStrategy` | enum | `core-libs/storefront/shared/components/media/media.model.ts:L94-L107` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `Images` | interface | `core-libs/core/src/model/image.model.ts:L7-L9` | [46](../parte-2/46-util-modelli.md) (2) |
| `ImageType` | enum | `core-libs/core/src/model/image.model.ts:L36-L39` (+3) | [46](../parte-2/46-util-modelli.md) (1) |
| `ImportCsvFileService` | class | `core-libs/storefront/shared/services/file/csv/import-csv-file.service.ts:L17-L121` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `ImportExportConfig` | class | `feature-libs/cart/import-export/core/config/import-export-config.ts:L16-L22` | [25](../parte-2/25-cart.md) (1) |
| `ImportExportRootModule` | class | `feature-libs/cart/import-export/root/import-export-root.module.ts:L26-L26` | [25](../parte-2/25-cart.md) (1) |
| `ImportOrderEntriesComponent` | class | `feature-libs/cart/import-export/components/import-to-cart/import-entries/import-order-entries.component.ts:L32-L51` | [25](../parte-2/25-cart.md) (1) |
| `ImportProductsFromCsvService` | class | `feature-libs/cart/import-export/components/import-to-cart/import-products-from-csv.service.ts:L13-L29` | [25](../parte-2/25-cart.md) (1) |
| `IndexType` | type | `core-libs/core/src/cms/store/cms-state.ts:L64-L69` | [15](../parte-2/15-cms-core.md) (1) |
| `INJECTOR` | const | `core-libs/schematics/src/shared/constants.ts:L47-L47` | [01](../parte-1/01-dependency-injection.md) (1), [03](../parte-1/03-lazy-loading.md) (1) |
| `InlineRootRenderStrategy` | class | `core-libs/storefront/layout/launch-dialog/services/inline-root-render.strategy.ts:L22-L70` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `InnerComponentsHostDirective` | class | `core-libs/storefront/cms-structure/page/component/inner-components-host.directive.ts:L29-L87` | [16](../parte-2/16-cms-rendering.md) (3) |
| `installPackageJsonDependencies()` | function | `core-libs/schematics/src/shared/utils/lib-utils.ts:L736-L741` | [08](../parte-1/08-schematics-builder.md) (3), [43](../parte-2/43-schematics-migrazioni.md) (2) |
| `IntendedPickupLocationFacade` | class | `feature-libs/pickup-in-store/root/facade/intended-pickup-location.facade.ts:L35-L74` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `InteractionState` | interface | `feature-libs/product-configurator/rulebased/core/model/configurator.model.ts:L177-L187` | [30](../parte-2/30-product-configurator.md) (1) |
| `InterceptorUtil` | class | `core-libs/core/src/occ/utils/interceptor-util.ts:L13-L47` | [06](../parte-1/06-httpclient-interceptor.md) (5), [21](../parte-2/21-occ.md) (2), [22](../parte-2/22-auth.md) (1) |
| `InternalServerErrorHandler` | class | `core-libs/core/src/global-message/http-interceptors/handlers/internal-server/internal-server.handler.ts:L16-L29` | [41](../parte-2/41-errori-global-message.md) (1), [50](../parte-3/50-ricette-config-di.md) (2) |
| `IntersectionOptions` | interface | `core-libs/storefront/layout/loading/intersection.model.ts:L9-L21` | [17](../parte-2/17-outlet.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `IntersectionService` | class | `core-libs/storefront/layout/loading/intersection.service.ts:L26-L132` | [17](../parte-2/17-outlet.md) (3), [18](../parte-2/18-layout-breakpoint-a11y.md) (4) |
| `InvalidTraceparentFormatError` | class | `core-libs/setup/ssr/logger/loggers/w3c-trace-context/errors/invalid-traceparent-format-error.ts:L10-L14` | [39](../parte-2/39-ssr-ottimizzato.md) (1) |
| `InvalidTraceparentLengthError` | class | `core-libs/setup/ssr/logger/loggers/w3c-trace-context/errors/invalid-traceparent-length-error.ts:L11-L17` | [39](../parte-2/39-ssr-ottimizzato.md) (1) |
| `InvoicesListComponent` | class | `feature-libs/pdf-invoices/components/invoices-list/invoices-list.component.ts:L63-L214` | [27](../parte-2/27-order.md) (2) |
| `IS_GUEST_USER_CHECKOUT_KEY` | const | `core-libs/storefront/cms-components/user/utils/user-constants.ts:L7-L7` | [26](../parte-2/26-checkout.md) (1) |
| `isSsr()` | function | `core-libs/core/src/state/utils/browser-storage.ts:L73-L75` | [41](../parte-2/41-errori-global-message.md) (2), [50](../parte-3/50-ricette-config-di.md) (1) |
| `ItemActiveDirective` | class | `feature-libs/organization/administration/components/shared/item-active.directive.ts:L16-L52` | [28](../parte-2/28-organization-b2b.md) (1) |
| `ItemExistsDirective` | class | `feature-libs/organization/administration/components/shared/item-exists.directive.ts:L16-L42` | [28](../parte-2/28-organization-b2b.md) (1) |
| `ItemService` | class | `feature-libs/organization/administration/components/shared/item.service.ts:L24-L132` | [28](../parte-2/28-organization-b2b.md) (8), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |

## J

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `JavaRegExpConverter` | class | `core-libs/core/src/util/java-reg-exp-converter/java-reg-exp-converter.ts:L11-L59` | [46](../parte-2/46-util-modelli.md) (4) |
| `JSONLD_PRODUCT_BUILDER` | const | `core-libs/storefront/cms-structure/seo/structured-data/builders/tokens.ts:L21-L23` | [40](../parte-2/40-seo-pwa.md) (3) |
| `JsonLdBaseProductBuilder` | class | `core-libs/storefront/cms-structure/seo/structured-data/builders/product/jsonld-base-product.builder.ts:L19-L61` | [40](../parte-2/40-seo-pwa.md) (1) |
| `JsonLdBuilder` | interface | `core-libs/storefront/cms-structure/seo/structured-data/builders/schema.interface.ts:L13-L15` | [40](../parte-2/40-seo-pwa.md) (1) |
| `JsonLdBuilderModule` | class | `core-libs/storefront/cms-structure/seo/structured-data/builders/json-ld-builder.module.ts:L52-L52` | [40](../parte-2/40-seo-pwa.md) (6), [47](../parte-2/47-app-demo.md) (1) |
| `JsonLdDirective` | class | `core-libs/storefront/cms-structure/seo/structured-data/json-ld.directive.ts:L22-L47` | [40](../parte-2/40-seo-pwa.md) (4) |
| `JsonLdProductOfferBuilder` | class | `core-libs/storefront/cms-structure/seo/structured-data/builders/product/jsonld-product-offer.builder.ts:L19-L37` | [40](../parte-2/40-seo-pwa.md) (1) |
| `JsonLdProductReviewBuilder` | class | `core-libs/storefront/cms-structure/seo/structured-data/builders/product/jsonld-product-review.builder.ts:L21-L83` | [40](../parte-2/40-seo-pwa.md) (1) |
| `JsonLdScriptFactory` | class | `core-libs/storefront/cms-structure/seo/structured-data/json-ld-script.factory.ts:L22-L89` | [40](../parte-2/40-seo-pwa.md) (3) |
| `JspIncludeCmsComponentConfig` | interface | `core-libs/core/src/cms/config/cms-config.ts:L33-L40` | [15](../parte-2/15-cms-core.md) (1) |

## K

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `KeyboardFocusModule` | class | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.module.ts:L29-L29` | [18](../parte-2/18-layout-breakpoint-a11y.md) (3) |
| `KeyboardFocusService` | class | `core-libs/storefront/layout/a11y/keyboard-focus/services/keyboard-focus.service.ts:L13-L13` | [18](../parte-2/18-layout-breakpoint-a11y.md) (4) |
| `KeyboardFocusTestingModule` | class | `core-libs/storefront/layout/a11y/keyboard-focus/focus-testing.module.ts:L19-L19` | [18](../parte-2/18-layout-breakpoint-a11y.md) (3), [54](../parte-3/54-upgrade-safe.md) (1) |

## L

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `Language` | interface | `core-libs/core/src/model/misc.model.ts:L28-L33` (+1) | [46](../parte-2/46-util-modelli.md) (2) |
| `LANGUAGE_CHANGE` | const | `core-libs/core/src/site-context/store/actions/languages.action.ts:L15-L15` | [13](../parte-2/13-site-context-theme.md) (4), [14](../parte-2/14-routing.md) (2), [15](../parte-2/15-cms-core.md) (3), [23](../parte-2/23-user.md) (3), [24](../parte-2/24-product-search.md) (1), [25](../parte-2/25-cart.md) (1), [27](../parte-2/27-order.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `LANGUAGE_CONTEXT_ID` | const | `core-libs/core/src/site-context/providers/context-ids.ts:L7-L7` | [13](../parte-2/13-site-context-theme.md) (1) |
| `LANGUAGE_NORMALIZER` | const | `core-libs/core/src/site-context/connectors/converters.ts:L12-L14` | [13](../parte-2/13-site-context-theme.md) (1) |
| `LanguageChange` | class | `core-libs/core/src/site-context/store/actions/languages.action.ts:L42-L48` | [13](../parte-2/13-site-context-theme.md) (4) |
| `LanguageCurrencyComponent` | class | `core-libs/storefront/cms-components/misc/site-context-selector/language-currency.component.ts:L20-L22` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `LanguageInitializer` | class | `core-libs/core/src/site-context/services/language-initializer.ts:L20-L80` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1) |
| `LanguageService` | class | `core-libs/core/src/site-context/facade/language.service.ts:L25-L96` | [06](../parte-1/06-httpclient-interceptor.md) (1), [13](../parte-2/13-site-context-theme.md) (4), [37](../parte-2/37-i18n.md) (1) |
| `LanguageSetEvent` | class | `core-libs/core/src/site-context/events/site-context.events.ts:L12-L18` | [13](../parte-2/13-site-context-theme.md) (7), [23](../parte-2/23-user.md) (1), [26](../parte-2/26-checkout.md) (3), [30](../parte-2/30-product-configurator.md) (2) |
| `LanguageStatePersistenceService` | class | `core-libs/core/src/site-context/services/language-state-persistence.service.ts:L15-L48` | [13](../parte-2/13-site-context-theme.md) (1) |
| `LAUNCH_CALLER` | enum | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L93-L103` | [18](../parte-2/18-layout-breakpoint-a11y.md) (6), [25](../parte-2/25-cart.md) (3), [27](../parte-2/27-order.md) (1), [29](../parte-2/29-asm.md) (2), [30](../parte-2/30-product-configurator.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (4), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [54](../parte-3/54-upgrade-safe.md) (6) |
| `LaunchConfig` | interface | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L9-L11` | [18](../parte-2/18-layout-breakpoint-a11y.md) (3) |
| `LaunchDialog` | interface | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L22-L32` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `LaunchDialogModule` | class | `core-libs/storefront/layout/launch-dialog/launch-dialog.module.ts:L42-L49` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `LaunchDialogService` | class | `core-libs/storefront/layout/launch-dialog/services/launch-dialog.service.ts:L25-L186` | [18](../parte-2/18-layout-breakpoint-a11y.md) (6), [27](../parte-2/27-order.md) (2), [29](../parte-2/29-asm.md) (2), [30](../parte-2/30-product-configurator.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [46](../parte-2/46-util-modelli.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `LaunchInlineDialog` | interface | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L52-L54` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `LaunchInlineRootDialog` | interface | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L60-L62` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `LaunchOptions` | type | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L13-L17` | [18](../parte-2/18-layout-breakpoint-a11y.md) (2) |
| `LaunchOutletDialog` | interface | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L38-L47` | [17](../parte-2/17-outlet.md) (3), [18](../parte-2/18-layout-breakpoint-a11y.md) (2) |
| `LaunchRenderStrategy` | class | `core-libs/storefront/layout/launch-dialog/services/launch-render.strategy.ts:L24-L158` | [18](../parte-2/18-layout-breakpoint-a11y.md) (3) |
| `LaunchRoute` | interface | `core-libs/storefront/layout/launch-dialog/config/launch-config.ts:L67-L76` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `LayoutBreakPoints` | type | `core-libs/storefront/layout/config/layout-config.ts:L80-L82` | [16](../parte-2/16-cms-rendering.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (3), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `LayoutConfig` | class | `core-libs/storefront/layout/config/layout-config.ts:L94-L125` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [16](../parte-2/16-cms-rendering.md) (5), [17](../parte-2/17-outlet.md) (2), [18](../parte-2/18-layout-breakpoint-a11y.md) (7), [26](../parte-2/26-checkout.md) (1), [27](../parte-2/27-order.md) (3), [30](../parte-2/30-product-configurator.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [50](../parte-3/50-ricette-config-di.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (4) |
| `layoutConfigFactory()` | function | `core-libs/storefront/recipes/config/layout-config.ts:L190-L198` | [10](../parte-2/10-bootstrap-inizializzazione.md) (3), [18](../parte-2/18-layout-breakpoint-a11y.md) (3), [50](../parte-3/50-ricette-config-di.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `LayoutModule` | class | `core-libs/storefront/layout/layout.module.ts:L25-L25` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [13](../parte-2/13-site-context-theme.md) (1), [16](../parte-2/16-cms-rendering.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (3), [38](../parte-2/38-stili-theming.md) (3) |
| `LayoutSections` | type | `core-libs/storefront/layout/config/layout-config.ts:L30-L34` | [18](../parte-2/18-layout-breakpoint-a11y.md) (2) |
| `LayoutSlotConfig` | type | `core-libs/storefront/layout/config/layout-config.ts:L59-L61` | [16](../parte-2/16-cms-rendering.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (3), [50](../parte-3/50-ricette-config-di.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `LazyComponentHandler` | class | `core-libs/storefront/cms-structure/page/component/handlers/lazy-component.handler.ts:L30-L82` | [03](../parte-1/03-lazy-loading.md) (3), [04](../parte-1/04-change-detection-zone-signals.md) (4), [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [12](../parte-2/12-feature-module-lazy.md) (1), [16](../parte-2/16-cms-rendering.md) (8), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3) |
| `LazyLoadingModule` | class | `core-libs/core/src/lazy-loading/lazy-loading.module.ts:L39-L53` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [12](../parte-2/12-feature-module-lazy.md) (5), [54](../parte-3/54-upgrade-safe.md) (1) |
| `LazyModulesService` | class | `core-libs/core/src/lazy-loading/lazy-modules.service.ts:L41-L246` | [01](../parte-1/01-dependency-injection.md) (2), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [03](../parte-1/03-lazy-loading.md) (6), [12](../parte-2/12-feature-module-lazy.md) (10), [17](../parte-2/17-outlet.md) (1), [20](../parte-2/20-facade-command-query-eventi.md) (1), [46](../parte-2/46-util-modelli.md) (2) |
| `LCP_PRESENCE` | const | `core-libs/storefront/shared/lcp-context/lcp-presence.token.ts:L26-L32` | [16](../parte-2/16-cms-rendering.md) (6) |
| `LcpCmsComponentsConfig` | class | `core-libs/storefront/cms-structure/cms-lcp-context/config/lcp-cms-components.config.ts:L18-L48` | [16](../parte-2/16-cms-rendering.md) (2) |
| `LcpContextDirective` | class | `core-libs/storefront/shared/lcp-context/lcp-context.directive.ts:L46-L84` | [16](../parte-2/16-cms-rendering.md) (1) |
| `LcpPresence` | enum | `core-libs/storefront/shared/lcp-context/lcp-presence.model.ts:L10-L13` | [16](../parte-2/16-cms-rendering.md) (1) |
| `LcpPresenceMappingService` | class | `core-libs/storefront/shared/lcp-context/lcp-presence-mapping.service.ts:L15-L22` | [16](../parte-2/16-cms-rendering.md) (2) |
| `LegacyOccCmsComponentAdapter` | class | `core-libs/core/src/occ/adapters/cms/legacy-occ-cms-component.adapter.ts:L29-L58` | [15](../parte-2/15-cms-core.md) (3), [21](../parte-2/21-occ.md) (4) |
| `LibraryOptions` | interface | `core-libs/schematics/src/shared/utils/lib-utils.ts:L85-L110` | [08](../parte-1/08-schematics-builder.md) (3), [43](../parte-2/43-schematics-migrazioni.md) (3) |
| `LinkComponent` | class | `core-libs/storefront/cms-components/content/link/link.component.ts:L26-L54` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `LinkModule` | class | `core-libs/storefront/cms-components/content/link/link.module.ts:L25-L25` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `ListComponent` | class | `feature-libs/organization/administration/components/shared/list/list.component.ts:L75-L251` | [28](../parte-2/28-organization-b2b.md) (9), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `Listener` | interface | `integration-libs/epd-visualization/root/util/event-listener-utils.ts:L12-L16` | [04](../parte-1/04-change-detection-zone-signals.md) (2) |
| `ListModel` | interface | `core-libs/core/src/model/misc.model.ts:L60-L64` | [46](../parte-2/46-util-modelli.md) (1) |
| `ListModule` | class | `feature-libs/organization/administration/components/shared/list/list.module.ts:L44-L44` | [28](../parte-2/28-organization-b2b.md) (1) |
| `ListService` | class | `feature-libs/organization/administration/components/shared/list/list.service.ts:L43-L243` | [28](../parte-2/28-organization-b2b.md) (11), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `LOAD_BASE_SITES_SUCCESS` | const | `core-libs/core/src/site-context/store/actions/base-site.action.ts:L17-L17` | [13](../parte-2/13-site-context-theme.md) (1) |
| `LOAD_CART` | const | `feature-libs/cart/base/core/store/actions/cart.action.ts:L16-L16` | [25](../parte-2/25-cart.md) (1) |
| `LOAD_CART_SUCCESS` | const | `feature-libs/cart/base/core/store/actions/cart.action.ts:L18-L18` | [25](../parte-2/25-cart.md) (3) |
| `LOAD_CARTS_SUCCESS` | const | `feature-libs/cart/base/core/store/actions/cart.action.ts:L20-L20` | [25](../parte-2/25-cart.md) (1) |
| `LOAD_CDC_USER_TOKEN_FAIL` | const | `integration-libs/cdc/core/store/actions/cdc-user-token.action.ts:L11-L11` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `LOAD_PRODUCT` | const | `core-libs/core/src/product/store/actions/product.action.ts:L15-L15` | [19](../parte-2/19-state-management.md) (1), [21](../parte-2/21-occ.md) (1), [24](../parte-2/24-product-search.md) (1) |
| `LOAD_USER_ADDRESSES_FAIL` | const | `core-libs/core/src/user/store/actions/user-addresses.action.ts:L13-L13` | [23](../parte-2/23-user.md) (1) |
| `LOAD_USER_ADDRESSES_SUCCESS` | const | `core-libs/core/src/user/store/actions/user-addresses.action.ts:L14-L14` | [23](../parte-2/23-user.md) (1) |
| `LoadAnonymousConsentTemplates` | class | `core-libs/core/src/anonymous-consents/store/actions/anonymous-consents.action.ts:L42-L48` | [23](../parte-2/23-user.md) (1) |
| `LoadAnonymousConsentTemplatesSuccess` | class | `core-libs/core/src/anonymous-consents/store/actions/anonymous-consents.action.ts:L50-L56` | [23](../parte-2/23-user.md) (1) |
| `LoadBaseSite` | class | `core-libs/core/src/site-context/store/actions/base-site.action.ts:L22-L24` | [13](../parte-2/13-site-context-theme.md) (1) |
| `LoadBaseSites` | class | `core-libs/core/src/site-context/store/actions/base-site.action.ts:L41-L43` | [13](../parte-2/13-site-context-theme.md) (1), [35](../parte-2/35-integration-opf-payments.md) (1) |
| `LoadBudgets` | class | `feature-libs/organization/administration/core/store/actions/budget.action.ts:L64-L75` | [28](../parte-2/28-organization-b2b.md) (1) |
| `LoadBudgetSuccess` | class | `feature-libs/organization/administration/core/store/actions/budget.action.ts:L51-L62` | [28](../parte-2/28-organization-b2b.md) (1) |
| `LoadCart` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L130-L135` | [25](../parte-2/25-cart.md) (15) |
| `LoadCartEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L162-L167` | [25](../parte-2/25-cart.md) (3), [26](../parte-2/26-checkout.md) (3) |
| `LoadCartFail` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L141-L149` | [25](../parte-2/25-cart.md) (2) |
| `LoadCartSuccess` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L155-L160` | [25](../parte-2/25-cart.md) (3) |
| `LoadCdcUserToken` | class | `integration-libs/cdc/core/store/actions/cdc-user-token.action.ts:L35-L39` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `LoadCdcUserTokenFail` | class | `integration-libs/cdc/core/store/actions/cdc-user-token.action.ts:L26-L33` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `LoadClientToken` | class | `core-libs/core/src/auth/client-auth/store/actions/client-token.action.ts:L16-L22` | [22](../parte-2/22-auth.md) (1) |
| `LoadCmsComponent` | class | `core-libs/core/src/cms/store/actions/components.action.ts:L19-L30` | [15](../parte-2/15-cms-core.md) (4), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1) |
| `LoadCmsComponentFail` | class | `core-libs/core/src/cms/store/actions/components.action.ts:L32-L47` | [15](../parte-2/15-cms-core.md) (2) |
| `LoadCmsComponentSuccess` | class | `core-libs/core/src/cms/store/actions/components.action.ts:L49-L63` | [15](../parte-2/15-cms-core.md) (2) |
| `LoadCmsNavigationItems` | class | `core-libs/core/src/cms/store/actions/navigation-entry-item.action.ts:L17-L23` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `LoadCmsPageData` | class | `core-libs/core/src/cms/store/actions/page.action.ts:L18-L24` | [15](../parte-2/15-cms-core.md) (4), [40](../parte-2/40-seo-pwa.md) (1) |
| `LoadCmsPageDataFail` | class | `core-libs/core/src/cms/store/actions/page.action.ts:L26-L35` | [15](../parte-2/15-cms-core.md) (2) |
| `LoadCmsPageDataSuccess` | class | `core-libs/core/src/cms/store/actions/page.action.ts:L37-L43` | [15](../parte-2/15-cms-core.md) (2) |
| `LoadDefaultPointOfService` | const | `feature-libs/pickup-in-store/core/store/actions/default-point-of-service-name.action.ts:L17-L19` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `LoadDeliveryCountriesFail` | class | `core-libs/core/src/user/store/actions/delivery-countries.action.ts:L25-L32` | [41](../parte-2/41-errori-global-message.md) (1) |
| `LoaderFailAction` | class | `core-libs/core/src/state/utils/loader/loader.action.ts:L74-L83` | [19](../parte-2/19-state-management.md) (1), [41](../parte-2/41-errori-global-message.md) (1) |
| `LoaderLoadAction` | class | `core-libs/core/src/state/utils/loader/loader.action.ts:L65-L72` | [30](../parte-2/30-product-configurator.md) (1) |
| `LoaderResetAction` | class | `core-libs/core/src/state/utils/loader/loader.action.ts:L94-L101` | [19](../parte-2/19-state-management.md) (1), [23](../parte-2/23-user.md) (1) |
| `LoaderState` | interface | `core-libs/core/src/state/utils/loader/loader-state.ts:L7-L12` | [19](../parte-2/19-state-management.md) (3), [30](../parte-2/30-product-configurator.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `LoadingScopeConfig` | interface | `core-libs/core/src/occ/config/loading-scopes-config.ts:L10-L23` | [21](../parte-2/21-occ.md) (2), [24](../parte-2/24-product-search.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (3) |
| `LoadingScopes` | interface | `core-libs/core/src/occ/config/loading-scopes-config.ts:L29-L31` | [21](../parte-2/21-occ.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (3) |
| `LoadingScopesConfig` | interface | `core-libs/core/src/occ/config/loading-scopes-config.ts:L25-L27` | [21](../parte-2/21-occ.md) (1) |
| `LoadingScopesService` | class | `core-libs/core/src/occ/services/loading-scopes.service.ts:L14-L78` | [21](../parte-2/21-occ.md) (2), [24](../parte-2/24-product-search.md) (1) |
| `LoadOrderById` | class | `feature-libs/order/core/store/actions/order-by-id.action.ts:L14-L19` | [27](../parte-2/27-order.md) (1) |
| `LoadOrderByIdSuccess` | class | `feature-libs/order/core/store/actions/order-by-id.action.ts:L31-L36` | [27](../parte-2/27-order.md) (1) |
| `LoadOrderDetailsSuccess` | class | `feature-libs/order/core/store/actions/order-details.action.ts:L46-L51` (+1) | [27](../parte-2/27-order.md) (1) |
| `LoadProduct` | class | `core-libs/core/src/product/store/actions/product.action.ts:L29-L38` | [19](../parte-2/19-state-management.md) (1), [24](../parte-2/24-product-search.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `LoadProductFail` | class | `core-libs/core/src/product/store/actions/product.action.ts:L40-L53` | [21](../parte-2/21-occ.md) (3), [24](../parte-2/24-product-search.md) (2) |
| `LoadProductReviews` | class | `core-libs/core/src/product/store/actions/product-reviews.action.ts:L21-L25` | [24](../parte-2/24-product-search.md) (1) |
| `LoadProductSuccess` | class | `core-libs/core/src/product/store/actions/product.action.ts:L55-L64` | [21](../parte-2/21-occ.md) (1) |
| `LoadSavedCarts` | class | `feature-libs/cart/saved-cart/core/store/actions/saved-cart.action.ts:L82-L92` | [25](../parte-2/25-cart.md) (1) |
| `LoadSavedCartsSuccess` | class | `feature-libs/cart/saved-cart/core/store/actions/saved-cart.action.ts:L94-L104` | [25](../parte-2/25-cart.md) (1) |
| `LoadStatus` | enum | `feature-libs/organization/administration/core/model/organization-item-status.ts:L7-L10` | [28](../parte-2/28-organization-b2b.md) (1) |
| `LoadUserAddresses` | class | `core-libs/core/src/user/store/actions/user-addresses.action.ts:L28-L34` | [23](../parte-2/23-user.md) (1) |
| `LoadUserAddressesEvent` | class | `core-libs/core/src/user/events/user.events.ts:L30-L32` | [23](../parte-2/23-user.md) (1), [26](../parte-2/26-checkout.md) (2) |
| `LoadUserOrders` | class | `feature-libs/order/core/store/actions/orders.action.ts:L16-L30` | [27](../parte-2/27-order.md) (1) |
| `LoadUserPaymentMethods` | class | `core-libs/core/src/user/store/actions/payment-methods.action.ts:L31-L37` | [23](../parte-2/23-user.md) (2) |
| `LoadUserPaymentMethodsEvent` | class | `core-libs/core/src/user/events/user.events.ts:L34-L36` | [23](../parte-2/23-user.md) (1), [26](../parte-2/26-checkout.md) (2) |
| `LoadWishListSuccess` | class | `feature-libs/cart/wish-list/core/store/actions/wish-list.action.ts:L70-L76` | [25](../parte-2/25-cart.md) (1) |
| `Locals` | interface | `core-libs/setup/ssr/optimized-engine/request-context.ts:L106-L110` | [39](../parte-2/39-ssr-ottimizzato.md) (1) |
| `LOCATION_INITIALIZED_MULTI` | const | `core-libs/core/src/routing/location-initialized-multi/location-initialized-multi.ts:L36-L38` | [01](../parte-1/01-dependency-injection.md) (5), [05](../parte-1/05-router.md) (5), [10](../parte-2/10-bootstrap-inizializzazione.md) (10), [11](../parte-2/11-configurazione.md) (6), [14](../parte-2/14-routing.md) (4), [22](../parte-2/22-auth.md) (1), [35](../parte-2/35-integration-opf-payments.md) (1) |
| `LocationInitializer` | type | `core-libs/core/src/routing/location-initialized-multi/location-initialized-multi.ts:L22-L22` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [14](../parte-2/14-routing.md) (1) |
| `LockFocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L142-L147` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `LockFocusDirective` | class | `core-libs/storefront/layout/a11y/keyboard-focus/lock/lock-focus.directive.ts:L33-L222` | [18](../parte-2/18-layout-breakpoint-a11y.md) (2) |
| `LockFocusService` | class | `core-libs/storefront/layout/a11y/keyboard-focus/lock/lock-focus.service.ts:L13-L13` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `LoggerService` | class | `core-libs/core/src/logger/logger.service.ts:L18-L39` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [11](../parte-2/11-configurazione.md) (1), [12](../parte-2/12-feature-module-lazy.md) (1), [20](../parte-2/20-facade-command-query-eventi.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [37](../parte-2/37-i18n.md) (4), [39](../parte-2/39-ssr-ottimizzato.md) (7), [41](../parte-2/41-errori-global-message.md) (9), [46](../parte-2/46-util-modelli.md) (2), [47](../parte-2/47-app-demo.md) (1) |
| `LoggerTestingModule` | class | `core-libs/core/src/logger/testing/logger-testing.module.ts:L14-L14` | [41](../parte-2/41-errori-global-message.md) (3) |
| `LoggingErrorHandler` | class | `core-libs/core/src/error-handling/multi-error-handler/logging-error-handler.ts:L20-L26` | [41](../parte-2/41-errori-global-message.md) (9) |
| `LOGIN` | const | `core-libs/core/src/auth/user-auth/store/actions/login-logout.action.ts:L9-L9` | [14](../parte-2/14-routing.md) (2), [15](../parte-2/15-cms-core.md) (3), [24](../parte-2/24-product-search.md) (1) |
| `Login` | class | `core-libs/core/src/auth/user-auth/store/actions/login-logout.action.ts:L12-L14` | [22](../parte-2/22-auth.md) (1), [29](../parte-2/29-asm.md) (4) |
| `LOGIN_EVENTS` | const | `integration-libs/cds/src/profiletag/tokens/login-events.token.ts:L20-L22` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `LOGIN_FORM_SERIALIZER` | const | `feature-libs/user/account/core/connectors/converters.ts:L27-L29` | [23](../parte-2/23-user.md) (1) |
| `LoginAsGuestGuard` | class | `feature-libs/user/account/components/guards/login-as-guest.guard.ts:L20-L46` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `LoginComponent` | class | `feature-libs/user/account/components/login/login.component.ts:L34-L68` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [15](../parte-2/15-cms-core.md) (2), [23](../parte-2/23-user.md) (1) |
| `LoginEvent` | class | `core-libs/core/src/auth/user-auth/events/user-auth.events.ts:L28-L33` | [20](../parte-2/20-facade-command-query-eventi.md) (1), [22](../parte-2/22-auth.md) (5), [23](../parte-2/23-user.md) (3), [26](../parte-2/26-checkout.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (2), [35](../parte-2/35-integration-opf-payments.md) (1) |
| `LoginFormComponent` | class | `feature-libs/user/account/components/login-form/login-form.component.ts:L53-L70` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [23](../parte-2/23-user.md) (1) |
| `LoginFormComponentService` | class | `feature-libs/user/account/components/login-form/login-form-component.service.ts:L43-L325` | [23](../parte-2/23-user.md) (2), [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `LoginGuard` | class | `core-libs/storefront/cms-components/user/login-route/login.guard.ts:L27-L66` | [23](../parte-2/23-user.md) (6), [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `LoginRouteModule` | class | `core-libs/storefront/cms-components/user/login-route/login-route.module.ts:L36-L36` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [23](../parte-2/23-user.md) (3), [43](../parte-2/43-schematics-migrazioni.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `LOGOUT` | const | `core-libs/core/src/auth/user-auth/store/actions/login-logout.action.ts:L10-L10` (+1) | [14](../parte-2/14-routing.md) (2), [15](../parte-2/15-cms-core.md) (3), [22](../parte-2/22-auth.md) (2), [23](../parte-2/23-user.md) (1), [24](../parte-2/24-product-search.md) (1), [46](../parte-2/46-util-modelli.md) (1) |
| `Logout` | class | `core-libs/core/src/auth/user-auth/store/actions/login-logout.action.ts:L16-L18` | [29](../parte-2/29-asm.md) (4) |
| `LogoutConfig` | class | `core-libs/storefront/cms-components/user/logout/config/logout-config.ts:L14-L25` | [23](../parte-2/23-user.md) (1) |
| `LogoutCustomerSupportAgent` | class | `feature-libs/asm/core/store/actions/logout-agent.action.ts:L15-L17` | [29](../parte-2/29-asm.md) (1) |
| `LogoutEvent` | class | `core-libs/core/src/auth/user-auth/events/user-auth.events.ts:L15-L20` | [20](../parte-2/20-facade-command-query-eventi.md) (1), [22](../parte-2/22-auth.md) (8), [23](../parte-2/23-user.md) (4), [26](../parte-2/26-checkout.md) (2), [30](../parte-2/30-product-configurator.md) (2), [50](../parte-3/50-ricette-config-di.md) (1) |
| `LogoutGuard` | class | `core-libs/storefront/cms-components/user/logout/logout.guard.ts:L31-L111` | [22](../parte-2/22-auth.md) (2), [23](../parte-2/23-user.md) (3), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `LogoutModule` | class | `core-libs/storefront/cms-components/user/logout/logout.module.ts:L33-L33` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [23](../parte-2/23-user.md) (3), [43](../parte-2/43-schematics-migrazioni.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER` | const | `integration-libs/epd-visualization/core/connectors/visualization/converters.ts:L14-L16` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |

## M

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `MAX_OCC_INTEGER_VALUE` | const | `feature-libs/organization/administration/components/constants.ts:L9-L9` | [28](../parte-2/28-organization-b2b.md) (1) |
| `Media` | interface | `core-libs/storefront/shared/components/media/media.model.ts:L9-L47` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `MediaComponent` | class | `core-libs/storefront/shared/components/media/media.component.ts:L55-L223` | [44](../parte-2/44-test-tooling.md) (1), [45](../parte-2/45-componenti-storefront.md) (1), [46](../parte-2/46-util-modelli.md) (1) |
| `MediaConfig` | class | `core-libs/storefront/shared/components/media/media.config.ts:L23-L77` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [45](../parte-2/45-componenti-storefront.md) (1) |
| `MediaModule` | class | `core-libs/storefront/shared/components/media/media.module.ts:L29-L43` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [45](../parte-2/45-componenti-storefront.md) (1) |
| `MediaPreconnectService` | class | `core-libs/storefront/cms-structure/seo/media-preconnect.service.ts:L15-L35` | [40](../parte-2/40-seo-pwa.md) (3) |
| `MediaService` | class | `core-libs/storefront/shared/components/media/media.service.ts:L33-L429` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `MediaSourcesPipe` | class | `core-libs/storefront/shared/components/media/media-sources.pipe.ts:L10-L28` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `MerchandisingCarouselComponent` | class | `integration-libs/cds/src/merchandising/cms-components/merchandising-carousel/merchandising-carousel.component.ts:L47-L144` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `MerchandisingModule` | class | `integration-libs/cds/src/merchandising/merchandising.module.ts:L21-L21` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `MerchandisingStrategyAdapter` | class | `integration-libs/cds/src/merchandising/connectors/strategy/merchandising-strategy.adapter.ts:L11-L21` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `MergeCart` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L186-L189` | [25](../parte-2/25-cart.md) (2) |
| `MergeCartAbort` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L226-L236` | [25](../parte-2/25-cart.md) (3) |
| `MergeCartAndIncrementProcessesCount` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L195-L200` | [25](../parte-2/25-cart.md) (3) |
| `MergeCartSuccess` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L210-L215` | [25](../parte-2/25-cart.md) (1) |
| `MergeCartSuccessEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L141-L157` | [26](../parte-2/26-checkout.md) (1) |
| `MergingSubject` | class | `core-libs/core/src/event/utils/merging-subject.ts:L24-L141` | [20](../parte-2/20-facade-command-query-eventi.md) (8), [50](../parte-3/50-ricette-config-di.md) (4), [54](../parte-3/54-upgrade-safe.md) (4) |
| `MessageComponent` | class | `core-libs/storefront/cms-components/misc/message/message.component.ts:L26-L90` (+1) | [28](../parte-2/28-organization-b2b.md) (1), [45](../parte-2/45-componenti-storefront.md) (2) |
| `MessageComponentModule` | class | `core-libs/storefront/cms-components/misc/message/message.module.ts:L25-L25` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `MessageData` | class | `feature-libs/organization/administration/components/shared/message/message.model.ts:L13-L53` | [28](../parte-2/28-organization-b2b.md) (1) |
| `MessageRenderService` | class | `feature-libs/organization/administration/components/shared/message/services/message-render.service.ts:L19-L39` | [28](../parte-2/28-organization-b2b.md) (1) |
| `MessageService` | class | `feature-libs/organization/administration/components/shared/message/services/message.service.ts:L15-L56` | [28](../parte-2/28-organization-b2b.md) (8) |
| `META_REDUCERS` | const | `core-libs/schematics/src/shared/constants.ts:L609-L609` | [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [13](../parte-2/13-site-context-theme.md) (1), [19](../parte-2/19-state-management.md) (13), [25](../parte-2/25-cart.md) (3) |
| `MetaTagConfigModule` | class | `core-libs/core/src/occ/config/meta-tag-config.module.ts:L11-L18` | [21](../parte-2/21-occ.md) (1) |
| `MethodPropertyDeprecation` | interface | `core-libs/schematics/src/shared/utils/file-utils.ts:L93-L99` | [43](../parte-2/43-schematics-migrazioni.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `migrate()` | function | `core-libs/schematics/src/modernize-app-migrated-from-2211_32-to-2211_36/index.ts:L29-L48` (+35) | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [43](../parte-2/43-schematics-migrazioni.md) (3) |
| `MINI_CART_FEATURE` | const | `feature-libs/cart/base/root/feature-name.ts:L10-L10` | [47](../parte-2/47-app-demo.md) (2) |
| `MiniCartComponent` | class | `feature-libs/cart/base/components/mini-cart/mini-cart.component.ts:L29-L43` | [12](../parte-2/12-feature-module-lazy.md) (1), [25](../parte-2/25-cart.md) (2), [47](../parte-2/47-app-demo.md) (1) |
| `MiniCartComponentService` | class | `feature-libs/cart/base/components/mini-cart/mini-cart-component.service.ts:L40-L177` | [25](../parte-2/25-cart.md) (1) |
| `MockDatePipe` | class | `core-libs/core/src/i18n/testing/mock-date.pipe.ts:L11-L22` | [37](../parte-2/37-i18n.md) (1) |
| `MockFeatureDirective` | class | `core-libs/storefront/shared/test/mock-feature-directive.ts:L10-L23` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (1), [44](../parte-2/44-test-tooling.md) (6) |
| `MockFeatureDirectivesModule` | class | `core-libs/storefront/shared/test/mock-feature-directives.module.ts:L14-L14` | [44](../parte-2/44-test-tooling.md) (3) |
| `MockFeatureLevelDirective` | class | `core-libs/storefront/shared/test/mock-feature-level-directive.ts:L10-L19` | [44](../parte-2/44-test-tooling.md) (3) |
| `MockFeatureTogglesController` | class | `core-libs/core/src/features-config/feature-toggles/testing/mock-feature-toggles.ts:L48-L79` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (4), [44](../parte-2/44-test-tooling.md) (3) |
| `MockLoggerService` | class | `core-libs/core/src/logger/testing/mock-logger.service.ts:L12-L22` | [41](../parte-2/41-errori-global-message.md) (3) |
| `MockMediaComponent` | class | `core-libs/storefront/shared/test/mock-media.component.ts:L15-L26` | [44](../parte-2/44-test-tooling.md) (4) |
| `MockOccEndpointsService` | class | `core-libs/core/src/occ/adapters/user/unit-test.helper.ts:L23-L36` | [21](../parte-2/21-occ.md) (1) |
| `MockTranslatePipe` | class | `core-libs/core/src/i18n/testing/mock-translate.pipe.ts:L12-L33` | [37](../parte-2/37-i18n.md) (1) |
| `MockTranslationService` | class | `core-libs/core/src/i18n/testing/mock-translation.service.ts:L13-L29` | [37](../parte-2/37-i18n.md) (2) |
| `MockUrlPipe` | class | `core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts:L41-L104` | [14](../parte-2/14-routing.md) (2) |
| `MockWinRef` | class | `core-libs/storefront/shared/test/mock-window-ref.ts:L9-L23` | [44](../parte-2/44-test-tooling.md) (5) |
| `Module` | interface | `core-libs/schematics/src/shared/utils/lib-utils.ts:L201-L212` | [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `MODULE_INITIALIZER` | const | `core-libs/core/src/lazy-loading/tokens.ts:L19-L20` | [01](../parte-1/01-dependency-injection.md) (10), [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (2), [03](../parte-1/03-lazy-loading.md) (12), [10](../parte-2/10-bootstrap-inizializzazione.md) (11), [12](../parte-2/12-feature-module-lazy.md) (17), [17](../parte-2/17-outlet.md) (6), [25](../parte-2/25-cart.md) (4), [27](../parte-2/27-order.md) (2), [29](../parte-2/29-asm.md) (2), [50](../parte-3/50-ricette-config-di.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (5) |
| `ModuleInitializedEvent` | class | `core-libs/core/src/lazy-loading/events/module-initialized-event.ts:L16-L32` | [03](../parte-1/03-lazy-loading.md) (5), [11](../parte-2/11-configurazione.md) (1), [12](../parte-2/12-feature-module-lazy.md) (8), [20](../parte-2/20-facade-command-query-eventi.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `MOVE_FOCUS` | enum | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L12-L15` | [18](../parte-2/18-layout-breakpoint-a11y.md) (2) |
| `MULTI_CART_DATA` | const | `feature-libs/cart/base/core/store/multi-cart-state.ts:L11-L11` | [25](../parte-2/25-cart.md) (2), [30](../parte-2/30-product-configurator.md) (1) |
| `MULTI_CART_FEATURE` | const | `feature-libs/cart/base/core/store/multi-cart-state.ts:L10-L10` | [25](../parte-2/25-cart.md) (1) |
| `MULTI_ERROR_HANDLER` | const | `core-libs/core/src/error-handling/multi-error-handler/multi-error-handler.ts:L25-L27` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [39](../parte-2/39-ssr-ottimizzato.md) (3), [41](../parte-2/41-errori-global-message.md) (10), [47](../parte-2/47-app-demo.md) (1), [54](../parte-3/54-upgrade-safe.md) (3) |
| `MultiCartEffects` | class | `feature-libs/cart/base/core/store/effects/multi-cart.effect.ts:L19-L144` | [25](../parte-2/25-cart.md) (3) |
| `MultiCartEffectsService` | class | `feature-libs/cart/base/core/store/effects/multi-cart-effect.service.ts:L12-L35` | [25](../parte-2/25-cart.md) (5) |
| `MultiCartEventListener` | class | `feature-libs/cart/base/root/events/multi-cart-event.listener.ts:L16-L48` | [25](../parte-2/25-cart.md) (2) |
| `MultiCartFacade` | class | `feature-libs/cart/base/root/facade/multi-cart.facade.ts:L43-L255` | [25](../parte-2/25-cart.md) (4) |
| `MultiCartService` | class | `feature-libs/cart/base/core/facade/multi-cart.service.ts:L34-L410` | [25](../parte-2/25-cart.md) (5) |
| `MultiCartStatePersistenceService` | class | `feature-libs/cart/base/core/services/multi-cart-state-persistence.service.ts:L24-L76` | [19](../parte-2/19-state-management.md) (1) |
| `MultiCartStoreModule` | class | `feature-libs/cart/base/core/store/multi-cart-store.module.ts:L32-L32` | [25](../parte-2/25-cart.md) (2) |
| `MultiErrorHandler` | interface | `core-libs/core/src/error-handling/multi-error-handler/multi-error-handler.ts:L16-L18` | [41](../parte-2/41-errori-global-message.md) (4) |
| `MyAccountV2ConsignmentTrackingComponent` | class | `feature-libs/order/components/order-details/my-account-v2/consignment-tracking/my-account-v2-consignment-tracking.component.ts:L19-L35` | [27](../parte-2/27-order.md) (2) |
| `MyAccountV2DownloadInvoicesComponent` | class | `feature-libs/order/components/order-details/my-account-v2/download-invoices/my-account-v2-download-invoices.component.ts:L41-L70` | [27](../parte-2/27-order.md) (1) |
| `MyAccountV2DownloadInvoicesEventListener` | class | `feature-libs/order/components/order-details/my-account-v2/download-invoices/my-account-v2-download-invoices-event.listener.ts:L17-L45` | [27](../parte-2/27-order.md) (1) |
| `MyAccountV2OrderConsignmentsService` | class | `feature-libs/order/components/order-details/my-account-v2-order-consignments.service.ts:L18-L82` | [27](../parte-2/27-order.md) (1) |
| `MyAccountV2OrderDetailsActionsComponent` | class | `feature-libs/order/components/order-details/my-account-v2/order-details-actions/my-account-v2-order-details-actions.component.ts:L19-L36` | [27](../parte-2/27-order.md) (2) |
| `MyAccountV2OrderHistoryComponent` | class | `feature-libs/order/components/order-history/my-account-v2/my-account-v2-order-history.component.ts:L36-L53` | [27](../parte-2/27-order.md) (1) |
| `MyAccountV2OrderHistoryService` | class | `feature-libs/order/core/facade/my-account-v2-order-history.service.ts:L37-L270` | [27](../parte-2/27-order.md) (1) |
| `MyPreferredStoreComponent` | class | `feature-libs/pickup-in-store/components/container/my-preferred-store/my-preferred-store.component.ts:L70-L184` | [32](../parte-2/32-pickup-storefinder-delivery.md) (3) |

## N

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `NativeSelectSpaceDirective` | class | `core-libs/storefront/layout/a11y/native-select-space/native-select-space.directive.ts:L26-L49` | [18](../parte-2/18-layout-breakpoint-a11y.md) (3) |
| `NAVIGATION_DETAIL_ENTITY` | const | `core-libs/core/src/cms/store/cms-state.ts:L13-L13` | [15](../parte-2/15-cms-core.md) (1) |
| `NavigationComponent` | class | `core-libs/storefront/cms-components/navigation/navigation/navigation.component.ts:L23-L40` | [45](../parte-2/45-componenti-storefront.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `NavigationEntryItemEffects` | class | `core-libs/core/src/cms/store/effects/navigation-entry-item.effect.ts:L19-L109` | [15](../parte-2/15-cms-core.md) (2) |
| `NavigationEvent` | class | `core-libs/storefront/events/navigation/navigation.event.ts:L13-L34` | [20](../parte-2/20-facade-command-query-eventi.md) (13), [25](../parte-2/25-cart.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [50](../parte-3/50-ricette-config-di.md) (7) |
| `NavigationEventBuilder` | class | `core-libs/storefront/events/navigation/navigation-event.builder.ts:L26-L65` | [20](../parte-2/20-facade-command-query-eventi.md) (3) |
| `NavigationEventModule` | class | `core-libs/storefront/events/navigation/navigation-event.module.ts:L11-L15` | [20](../parte-2/20-facade-command-query-eventi.md) (3), [50](../parte-3/50-ricette-config-di.md) (2) |
| `NavigationNode` | interface | `core-libs/storefront/cms-components/navigation/navigation/navigation-node.model.ts:L7-L33` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `NavigationService` | class | `core-libs/storefront/cms-components/navigation/navigation/navigation.service.ts:L21-L224` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `NavigationUIComponent` | class | `core-libs/storefront/cms-components/navigation/navigation/navigation-ui.component.ts:L53-L408` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `NewMessageEvent` | class | `feature-libs/customer-ticketing/root/events/customer-ticketing.events.ts:L25-L27` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `NewSavedCartOrderEntriesContext` | class | `feature-libs/cart/saved-cart/components/page-context/saved-carts-page/new-saved-cart-order-entries.context.ts:L35-L107` | [25](../parte-2/25-cart.md) (1) |
| `NewSavedCartOrderEntriesContextToken` | const | `feature-libs/cart/saved-cart/root/tokens/context.ts:L13-L15` | [25](../parte-2/25-cart.md) (1) |
| `NgExpressEngine` | type | `core-libs/setup/ssr/engine-decorator/ng-express-engine-decorator.ts:L28-L30` | [39](../parte-2/39-ssr-ottimizzato.md) (2) |
| `NgExpressEngineDecorator` | class | `core-libs/setup/ssr/engine-decorator/ng-express-engine-decorator.ts:L36-L49` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [39](../parte-2/39-ssr-ottimizzato.md) (2), [43](../parte-2/43-schematics-migrazioni.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `NgExpressEngineInstance` | type | `core-libs/setup/ssr/engine-decorator/ng-express-engine-decorator.ts:L22-L26` | [39](../parte-2/39-ssr-ottimizzato.md) (2) |
| `NgSelectA11yDirective` | class | `core-libs/storefront/shared/components/ng-select-a11y/ng-select-a11y.directive.ts:L41-L267` | [04](../parte-1/04-change-detection-zone-signals.md) (1) |
| `NgSetupOptions` | type | `core-libs/setup/ssr/engine/ng-express-engine.ts:L24-L28` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1) |
| `NodeItem` | interface | `core-libs/core/src/cms/model/node-item.model.ts:L9-L11` | [15](../parte-2/15-cms-core.md) (2) |
| `NODES_RESPONSE_NORMALIZER` | const | `integration-libs/epd-visualization/core/connectors/scene/converters.ts:L14-L16` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `NotAuthGuard` | class | `core-libs/core/src/auth/user-auth/guards/not-auth.guard.ts:L21-L41` | [22](../parte-2/22-auth.md) (4), [23](../parte-2/23-user.md) (1), [28](../parte-2/28-organization-b2b.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `NotCheckoutAuthGuard` | class | `feature-libs/checkout/base/components/guards/not-checkout-auth.guard.ts:L21-L45` | [26](../parte-2/26-checkout.md) (3) |
| `NotFoundHandler` | class | `core-libs/core/src/global-message/http-interceptors/handlers/not-found/not-found.handler.ts:L15-L25` | [41](../parte-2/41-errori-global-message.md) (2) |
| `NotFoundTicketRequestHandler` | class | `feature-libs/customer-ticketing/core/http-interceptors/handlers/not-found-ticket-request.handler.ts:L23-L75` | [31](../parte-2/31-quote-ticketing-subscription.md) (3) |

## O

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `OAUTH_REDIRECT_FLOW_KEY` | const | `core-libs/core/src/auth/user-auth/utils/oauth-constants.ts:L7-L7` | [22](../parte-2/22-auth.md) (1) |
| `OAuthCallbackGuard` | class | `core-libs/core/src/auth/user-auth/guards/oauth-callback.guard.ts:L25-L53` | [22](../parte-2/22-auth.md) (4) |
| `OAuthFlow` | enum | `core-libs/core/src/auth/user-auth/models/oauth-flow.ts:L10-L23` | [22](../parte-2/22-auth.md) (1) |
| `OAuthLibWrapperService` | class | `core-libs/core/src/auth/user-auth/services/oauth-lib-wrapper.service.ts:L32-L308` | [11](../parte-2/11-configurazione.md) (1), [22](../parte-2/22-auth.md) (4) |
| `ObjectComparisonUtils` | class | `core-libs/core/src/util/object-comparison-utils.ts:L7-L93` | [46](../parte-2/46-util-modelli.md) (1) |
| `OCC_CART_ID_CURRENT` | const | `core-libs/core/src/occ/utils/occ-constants.ts:L7-L7` | [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OCC_HTTP_TOKEN` | const | `core-libs/core/src/occ/utils/occ-http-token.ts:L20-L20` | [06](../parte-1/06-httpclient-interceptor.md) (7), [21](../parte-2/21-occ.md) (3), [29](../parte-2/29-asm.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `OCC_USER_ID_CONSTANTS` | const | `core-libs/core/src/occ/utils/index.ts:L19-L24` | [21](../parte-2/21-occ.md) (2) |
| `OCC_USER_ID_CURRENT` | const | `core-libs/core/src/occ/utils/occ-user-ids.ts:L7-L7` | [30](../parte-2/30-product-configurator.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `OccAddressListNormalizer` | class | `core-libs/core/src/occ/adapters/user/converters/occ-address-list-normalizer.ts:L20-L39` | [21](../parte-2/21-occ.md) (1) |
| `OccAsmAdapter` | class | `feature-libs/asm/occ/adapters/occ-asm.adapter.ts:L47-L240` | [29](../parte-2/29-asm.md) (4) |
| `OccAsmCustomer360Adapter` | class | `feature-libs/asm/customer-360/occ/adapters/occ-asm-customer-360.adapter.ts:L30-L90` | [29](../parte-2/29-asm.md) (1) |
| `OccBackendNotification` | class | `integration-libs/cds/src/profiletag/adapters/occ-backend-notification-adapter.ts:L15-L36` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `OccBudgetAdapter` | class | `feature-libs/organization/administration/occ/adapters/occ-budget.adapter.ts:L26-L87` | [28](../parte-2/28-organization-b2b.md) (2) |
| `OccCancelServiceOrderAdapter` | class | `integration-libs/s4-service/order/occ/adapters/occ-cancel-service-order.adapter.ts:L16-L33` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `OccCartAccessCodeAdapter` | class | `feature-libs/cart/base/occ/adapters/occ-cart-access-code.adapter.ts:L24-L58` | [25](../parte-2/25-cart.md) (1), [46](../parte-2/46-util-modelli.md) (1) |
| `OccCartAdapter` | class | `feature-libs/cart/base/occ/adapters/occ-cart.adapter.ts:L28-L146` | [25](../parte-2/25-cart.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (5) |
| `OccCartEntryAdapter` | class | `feature-libs/cart/base/occ/adapters/occ-cart-entry.adapter.ts:L18-L126` | [25](../parte-2/25-cart.md) (3) |
| `OccCartGuestUserAdapter` | class | `feature-libs/cart/base/occ/adapters/occ-cart-guest-user.adapter.ts:L29-L99` | [25](../parte-2/25-cart.md) (1) |
| `OccCartNormalizer` | class | `feature-libs/cart/base/occ/adapters/converters/occ-cart-normalizer.ts:L20-L87` | [25](../parte-2/25-cart.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (7), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `OccCartValidationAdapter` | class | `feature-libs/cart/base/occ/adapters/occ-cart-validation.adapter.ts:L24-L45` | [25](../parte-2/25-cart.md) (1) |
| `OccCartVoucherAdapter` | class | `feature-libs/cart/base/occ/adapters/occ-cart-voucher.adapter.ts:L25-L125` | [25](../parte-2/25-cart.md) (3) |
| `OccCheckoutAdapter` | class | `feature-libs/checkout/base/occ/adapters/occ-checkout.adapter.ts:L26-L63` | [26](../parte-2/26-checkout.md) (1) |
| `OccCheckoutDeliveryAddressAdapter` | class | `feature-libs/checkout/base/occ/adapters/occ-checkout-delivery-address.adapter.ts:L26-L133` | [26](../parte-2/26-checkout.md) (1) |
| `OccCheckoutDeliveryModesAdapter` | class | `feature-libs/checkout/base/occ/adapters/occ-checkout-delivery-modes.adapter.ts:L27-L117` | [26](../parte-2/26-checkout.md) (1) |
| `OccCheckoutServiceDetailsAdapter` | class | `integration-libs/s4-service/checkout/occ/adapter/occ-checkout-service-details.adapter.ts:L21-L45` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `OccCmsComponentAdapter` | class | `core-libs/core/src/occ/adapters/cms/occ-cms-component.adapter.ts:L23-L153` | [15](../parte-2/15-cms-core.md) (1), [21](../parte-2/21-occ.md) (2) |
| `OccCmsPageAdapter` | class | `core-libs/core/src/occ/adapters/cms/occ-cms-page.adapter.ts:L34-L103` | [15](../parte-2/15-cms-core.md) (1), [21](../parte-2/21-occ.md) (2) |
| `OccCmsPageNormalizer` | class | `core-libs/core/src/occ/adapters/cms/converters/occ-cms-page-normalizer.ts:L23-L223` | [15](../parte-2/15-cms-core.md) (4), [21](../parte-2/21-occ.md) (2) |
| `OccConfig` | class | `core-libs/core/src/occ/config/occ-config.ts:L46-L48` | [15](../parte-2/15-cms-core.md) (1), [21](../parte-2/21-occ.md) (9), [24](../parte-2/24-product-search.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (6), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `OccConfiguratorTextfieldAdapter` | class | `feature-libs/product-configurator/textfield/occ/occ-configurator-textfield.adapter.ts:L27-L158` | [30](../parte-2/30-product-configurator.md) (1) |
| `OccCostCenterSerializer` | class | `core-libs/core/src/occ/adapters/cost-center/converters/occ-cost-center-serializer.ts:L15-L26` | [21](../parte-2/21-occ.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OccDpRequestNormalizer` | class | `integration-libs/digital-payments/src/checkout/adapters/occ-digital-payment-request.normalizer.ts:L15-L34` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OccEndpoint` | interface | `core-libs/core/src/occ/occ-models/occ-endpoints.model.ts:L9-L12` | [21](../parte-2/21-occ.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (3) |
| `OccEndpoints` | interface | `core-libs/core/src/occ/occ-models/occ-endpoints.model.ts:L21-L299` | [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [21](../parte-2/21-occ.md) (6), [23](../parte-2/23-user.md) (1), [25](../parte-2/25-cart.md) (2), [26](../parte-2/26-checkout.md) (1), [27](../parte-2/27-order.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (7), [54](../parte-3/54-upgrade-safe.md) (2) |
| `OccEndpointsService` | class | `core-libs/core/src/occ/services/occ-endpoints.service.ts:L34-L249` | [06](../parte-1/06-httpclient-interceptor.md) (1), [13](../parte-2/13-site-context-theme.md) (2), [21](../parte-2/21-occ.md) (7), [46](../parte-2/46-util-modelli.md) (1), [50](../parte-3/50-ricette-config-di.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (5) |
| `OccFieldsService` | class | `core-libs/core/src/occ/services/occ-fields.service.ts:L45-L134` | [21](../parte-2/21-occ.md) (1) |
| `OccHttpContext` | interface | `core-libs/core/src/occ/utils/occ-http-token.ts:L9-L18` | [06](../parte-1/06-httpclient-interceptor.md) (2), [21](../parte-2/21-occ.md) (1) |
| `OccHttpErrorReason` | enum | `core-libs/core/src/util/occ-http-error-constants.ts:L14-L16` | [21](../parte-2/21-occ.md) (2), [46](../parte-2/46-util-modelli.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `OccHttpErrorType` | enum | `core-libs/core/src/util/occ-http-error-constants.ts:L9-L12` | [21](../parte-2/21-occ.md) (2), [46](../parte-2/46-util-modelli.md) (3), [54](../parte-3/54-upgrade-safe.md) (1) |
| `OccOmfOrderHistoryAdapter` | class | `integration-libs/omf/order/occ-omf-order-history.adapter.ts:L26-L87` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (4) |
| `OccOpfTokenisationUserPaymentAdapter` | class | `integration-libs/opf/tokenisation/root/adapters/occ-opf-tokenisation-user-payment.adapter.ts:L27-L128` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OccOppsCouponCodesInterceptor` | class | `integration-libs/opps/root/coupon-codes/http-interceptors/occ-opps-coupon-codes.interceptor.ts:L20-L65` | [06](../parte-1/06-httpclient-interceptor.md) (4), [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OccOrderAdapter` | class | `feature-libs/order/occ/adapters/occ-order.adapter.ts:L29-L127` | [46](../parte-2/46-util-modelli.md) (2) |
| `OccOrderHistoryAdapter` | class | `feature-libs/order/occ/adapters/occ-order-history.adapter.ts:L46-L232` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OccOrderNormalizer` | class | `feature-libs/order/occ/adapters/converters/occ-order-normalizer.ts:L22-L82` | [27](../parte-2/27-order.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OccOrgUnitAdapter` | class | `feature-libs/organization/administration/occ/adapters/occ-org-unit.adapter.ts:L36-L309` | [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OccPersonalizationIdInterceptor` | class | `feature-libs/tracking/personalization/root/http-interceptors/occ-personalization-id.interceptor.ts:L21-L99` | [06](../parte-1/06-httpclient-interceptor.md) (2), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `OccPersonalizationTimeInterceptor` | class | `feature-libs/tracking/personalization/root/http-interceptors/occ-personalization-time.interceptor.ts:L21-L99` | [06](../parte-1/06-httpclient-interceptor.md) (2), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `OccProductAdapter` | class | `core-libs/core/src/occ/adapters/product/occ-product.adapter.ts:L21-L60` | [21](../parte-2/21-occ.md) (3), [24](../parte-2/24-product-search.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (8) |
| `OccProductAvailabilityAdapter` | class | `core-libs/core/src/occ/adapters/product/occ-product-availability-adapter.ts:L15-L46` | [21](../parte-2/21-occ.md) (1) |
| `OccProductReferencesAdapter` | class | `core-libs/core/src/occ/adapters/product/occ-product-references.adapter.ts:L17-L44` | [21](../parte-2/21-occ.md) (1) |
| `OccProductReferencesListNormalizer` | class | `core-libs/core/src/occ/adapters/product/converters/occ-product-references-list-normalizer.ts:L17-L40` | [21](../parte-2/21-occ.md) (1), [24](../parte-2/24-product-search.md) (1) |
| `OccProductSearchPageNormalizer` | class | `core-libs/core/src/occ/adapters/product/converters/occ-product-search-page-normalizer.ts:L20-L103` | [21](../parte-2/21-occ.md) (1), [24](../parte-2/24-product-search.md) (2) |
| `OccQuote` | interface | `feature-libs/quote/root/model/quote.model.ts:L11-L39` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `OccQuoteActionNormalizer` | class | `feature-libs/quote/occ/converters/occ-quote-action-normalizer.ts:L21-L91` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `OccQuoteEntryNormalizer` | class | `feature-libs/quote/occ/converters/occ-quote-entry-normalizer.ts:L16-L36` | [31](../parte-2/31-quote-ticketing-subscription.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OccReorderOrderAdapter` | class | `feature-libs/order/occ/adapters/occ-reorder-order.adapter.ts:L22-L52` | [27](../parte-2/27-order.md) (2) |
| `OccReorderOrderNormalizer` | class | `feature-libs/order/occ/adapters/converters/occ-reorder-order-normalizer.ts:L12-L21` | [27](../parte-2/27-order.md) (1) |
| `OccReplenishmentOrderNormalizer` | class | `feature-libs/order/occ/adapters/converters/occ-replenishment-order-normalizer.ts:L18-L44` | [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OccRequestedDeliveryDateAdapter` | class | `feature-libs/requested-delivery-date/occ/adapters/occ-requested-delivery-date.adapter.ts:L17-L45` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `OccRequestsOptimizerService` | class | `core-libs/core/src/occ/services/occ-requests-optimizer.service.ts:L22-L80` | [21](../parte-2/21-occ.md) (2), [24](../parte-2/24-product-search.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OccReturnRequestNormalizer` | class | `feature-libs/order/occ/adapters/converters/occ-return-request-normalizer.ts:L18-L44` | [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OccSavedCartAdapter` | class | `feature-libs/cart/saved-cart/occ/adapters/occ-saved-cart.adapter.ts:L20-L103` | [25](../parte-2/25-cart.md) (2) |
| `OccSegmentRefsInterceptor` | class | `integration-libs/segment-refs/root/http-interceptors/occ-segment-refs.interceptor.ts:L19-L87` | [06](../parte-1/06-httpclient-interceptor.md) (4), [34](../parte-2/34-integration-cdc-cdp-cds.md) (3), [50](../parte-3/50-ricette-config-di.md) (2) |
| `OccSiteAdapter` | class | `core-libs/core/src/occ/adapters/site-context/occ-site.adapter.ts:L34-L141` | [13](../parte-2/13-site-context-theme.md) (3), [21](../parte-2/21-occ.md) (3) |
| `OccUserAccountAdapter` | class | `feature-libs/user/account/occ/adapters/occ-user-account.adapter.ts:L35-L80` | [23](../parte-2/23-user.md) (1) |
| `OccUserConsentAdapter` | class | `core-libs/core/src/occ/adapters/user/occ-user-consent.adapter.ts:L21-L79` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `OccUserCostCenterAdapter` | class | `core-libs/core/src/occ/adapters/user/occ-user-cost-centers.adapter.ts:L22-L56` | [21](../parte-2/21-occ.md) (1) |
| `OccUserProfileAdapter` | class | `feature-libs/user/profile/occ/adapters/occ-user-profile.adapter.ts:L38-L204` | [23](../parte-2/23-user.md) (1) |
| `OMF_ORDER_MODULE` | const | `core-libs/schematics/src/shared/lib-configs/integration-libs/omf-schematics-config.ts:L20-L20` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `OmfConfig` | class | `integration-libs/omf/order/config/omf-config.ts:L15-L17` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (5), [50](../parte-3/50-ricette-config-di.md) (1) |
| `OmfConfiguration` | class | `integration-libs/omf/root/model/omf-configuration.ts:L7-L9` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `OmfOrderHistoryService` | class | `integration-libs/omf/order/omf-order-history.service.ts:L13-L24` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (7) |
| `OmfOrderModule` | class | `integration-libs/omf/order/omf-order.module.ts:L26-L26` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (8), [47](../parte-2/47-app-demo.md) (2), [50](../parte-3/50-ricette-config-di.md) (3) |
| `OmfRootModule` | class | `integration-libs/omf/root/omf-root.module.ts:L10-L10` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [47](../parte-2/47-app-demo.md) (1) |
| `OneTimePasswordLoginFormComponent` | class | `feature-libs/user/account/components/otp-login-form/otp-login-form.component.ts:L69-L189` | [23](../parte-2/23-user.md) (1) |
| `OneTimePasswordLoginFormModeule` | class | `feature-libs/user/account/components/otp-login-form/otp-login-form.module.ts:L55-L55` | [23](../parte-2/23-user.md) (1) |
| `OnNavigateConfig` | class | `core-libs/storefront/router/config/on-navigate-config.ts:L14-L27` | [05](../parte-1/05-router.md) (1), [14](../parte-2/14-routing.md) (2) |
| `OnNavigateService` | class | `core-libs/storefront/router/on-navigate.service.ts:L30-L211` | [05](../parte-1/05-router.md) (5), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [14](../parte-2/14-routing.md) (3) |
| `OpeningSchedule` | interface | `core-libs/core/src/model/point-of-service.model.ts:L44-L49` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `OPF_ACTIVE_CONFIGURATIONS_NORMALIZER` | const | `integration-libs/opf/base/core/tokens/tokens.ts:L11-L13` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OPF_BASE_FEATURE` | const | `integration-libs/opf/base/root/feature-name.ts:L7-L7` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OPF_CTA_SCRIPTS_NORMALIZER` | const | `integration-libs/opf/cta/core/tokens/tokens.ts:L11-L13` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OPF_PAYMENT_CONFIG_SERIALIZER` | const | `integration-libs/opf/payment/core/connectors/converters.ts:L11-L13` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OPF_QUICK_BUY_FEATURE` | const | `integration-libs/opf/quick-buy/root/feature-name.ts:L7-L7` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfActiveConfiguration` | interface | `integration-libs/opf/base/root/model/opf-base.model.ts:L12-L23` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfApiBaseAdapter` | class | `integration-libs/opf/base/opf-api/adapters/opf-api-base.adapter.ts:L36-L119` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfApiConfig` | class | `integration-libs/opf/base/root/config/opf-api-config.ts:L15-L17` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfApiCtaAdapter` | class | `integration-libs/opf/cta/opf-api/adapters/opf-api-cta.adapter.ts:L35-L89` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfApiEndpoint` | interface | `integration-libs/opf/base/root/model/opf-api-endpoint.model.ts:L7-L10` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfApiEndpoints` | interface | `integration-libs/opf/base/root/model/opf-api-endpoints.model.ts:L7-L7` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `OpfApiPaymentAdapter` | class | `integration-libs/opf/payment/opf-api/adapters/opf-api-payment.adapter.ts:L52-L309` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfApiQuickBuyAdapter` | class | `integration-libs/opf/quick-buy/opf-api/adapters/opf-api-quick-buy.adapter.ts:L35-L90` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfB2bCheckoutPaymentTypeService` | class | `integration-libs/opf/b2b-checkout/core/facade/opf-b2b-checkout-payment-type.service.ts:L32-L153` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfB2bCheckoutRootModule` | class | `integration-libs/opf/b2b-checkout/root/opf-b2b-checkout-root.module.ts:L48-L48` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `OpfB2bCheckoutStepsSetGuard` | class | `integration-libs/opf/b2b-checkout/root/guards/opf-b2b-checkout-steps-set.guard.ts:L42-L193` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `OpfBaseAdapter` | class | `integration-libs/opf/base/core/connectors/opf-base.adapter.ts:L13-L20` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfBaseFacade` | class | `integration-libs/opf/base/root/facade/opf-base.facade.ts:L25-L32` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfBaseModule` | class | `integration-libs/opf/base/opf-base.module.ts:L15-L15` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfBaseRootModule` | class | `integration-libs/opf/base/root/opf-base-root.module.ts:L32-L32` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `OpfCheckoutAuthGuard` | class | `integration-libs/opf/checkout/root/checkout-guard/opf-checkout-auth.guard.ts:L21-L63` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfCheckoutOutlets` | enum | `integration-libs/opf/checkout/root/model/opf-checkout-outlets.model.ts:L7-L11` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfCheckoutPaymentAndReviewComponent` | class | `integration-libs/opf/checkout/components/opf-checkout-payment-and-review/opf-checkout-payment-and-review.component.ts:L74-L167` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `OpfCheckoutPaymentsComponent` | class | `integration-libs/opf/checkout/components/opf-checkout-payments/opf-checkout-payments.component.ts:L75-L394` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfCheckoutRootModule` | class | `integration-libs/opf/checkout/root/opf-checkout-root.module.ts:L63-L63` | [35](../parte-2/35-integration-opf-payments.md) (4) |
| `OpfConfig` | class | `integration-libs/opf/base/root/config/opf-config.ts:L14-L90` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfCtaAdapter` | class | `integration-libs/opf/cta/core/connectors/opf-cta.adapter.ts:L13-L20` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfCtaComponentsModule` | class | `integration-libs/opf/cta/components/opf-cta-components.module.ts:L25-L25` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfCtaElementComponent` | class | `integration-libs/opf/cta/components/opf-cta-element/opf-cta-element.component.ts:L26-L51` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfCtaFacade` | class | `integration-libs/opf/cta/root/facade/opf-cta.facade.ts:L26-L35` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfCtaRootModule` | class | `integration-libs/opf/cta/root/opf-cta-root.module.ts:L25-L25` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfCtaScriptsComponent` | class | `integration-libs/opf/cta/components/opf-cta-scripts/opf-cta-scripts.component.ts:L20-L28` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfCtaScriptsService` | class | `integration-libs/opf/cta/components/opf-cta-scripts/opf-cta-scripts.service.ts:L33-L265` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfDynamicCtaService` | class | `integration-libs/opf/cta/core/services/opf-dynamic-cta.service.ts:L47-L252` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfEndpointsService` | class | `integration-libs/opf/base/core/services/opf-endpoints.service.ts:L21-L115` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfEventListenerService` | class | `integration-libs/opf/base/root/events/opf-event.listener.ts:L17-L40` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfEventModule` | class | `integration-libs/opf/base/root/events/opf-event.module.ts:L11-L15` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfGiftCardCartOccNormalizer` | class | `integration-libs/opf/gift-card/root/normalizers/opf-gift-card-cart-occ-normalizer.ts:L21-L74` | [35](../parte-2/35-integration-opf-payments.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OpfGiftCardCoreModule` | class | `integration-libs/opf/gift-card/core/opf-gift-card-core.module.ts:L14-L14` | [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OpfGiftCardModule` | class | `integration-libs/opf/gift-card/opf-gift-card.module.ts:L21-L21` | [06](../parte-1/06-httpclient-interceptor.md) (2), [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfGiftCardOrderOccNormalizer` | class | `integration-libs/opf/gift-card/root/normalizers/opf-gift-card-order-occ-normalizer.ts:L20-L44` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfGiftCardPaymentApiInterceptor` | class | `integration-libs/opf/gift-card/root/http-interceptors/opf-gift-card-payment-api.interceptor.ts:L33-L66` | [06](../parte-1/06-httpclient-interceptor.md) (4), [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfGiftCardRootModule` | class | `integration-libs/opf/gift-card/root/opf-gift-card-root.module.ts:L65-L65` | [06](../parte-1/06-httpclient-interceptor.md) (2), [35](../parte-2/35-integration-opf-payments.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OpfGlobalFunctionsDomain` | enum | `integration-libs/opf/global-functions/root/model/opf-global-functions.model.ts:L10-L14` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfGlobalFunctionsFacade` | class | `integration-libs/opf/global-functions/root/facade/opf-global-functions.facade.ts:L24-L40` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfGlobalFunctionsRootModule` | class | `integration-libs/opf/global-functions/root/opf-global-functions-root.module.ts:L14-L14` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfGlobalMessageService` | class | `integration-libs/opf/base/root/services/opf-global-message.service.ts:L19-L61` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfMetadataStoreService` | class | `integration-libs/opf/base/root/services/opf-metadata-store.service.ts:L12-L39` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfOccOrderNormalizer` | class | `integration-libs/opf/order/opf-occ-order-normalizer.ts:L13-L28` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfOrderModule` | class | `integration-libs/opf/order/opf-order.module.ts:L20-L20` | [35](../parte-2/35-integration-opf-payments.md) (2), [47](../parte-2/47-app-demo.md) (1) |
| `OpfPaymentAdapter` | class | `integration-libs/opf/payment/core/connectors/opf-payment.adapter.ts:L20-L77` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfPaymentErrorHandlerService` | class | `integration-libs/opf/payment/core/services/opf-payment-error-handler.service.ts:L23-L78` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfPaymentFacade` | class | `integration-libs/opf/payment/root/facade/opf-payment.facade.ts:L39-L119` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OpfPaymentHostedFieldsService` | class | `integration-libs/opf/payment/core/services/opf-payment-hosted-fields.service.ts:L48-L258` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfPaymentProviderType` | enum | `integration-libs/opf/base/root/model/opf-base.model.ts:L84-L88` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfPaymentRootModule` | class | `integration-libs/opf/payment/root/opf-payment-root.module.ts:L49-L49` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `OpfPaymentService` | class | `integration-libs/opf/payment/core/facade/opf-payment.service.ts:L27-L172` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfPaymentVerificationComponent` | class | `integration-libs/opf/payment/root/components/opf-payment-verification/opf-payment-verification.component.ts:L30-L154` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfQuickBuyCartAdapter` | class | `integration-libs/opf/quick-buy/core/connectors/opf-quick-buy-cart.adapter.ts:L11-L39` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfQuickBuyConfig` | class | `integration-libs/opf/quick-buy/root/config/opf-quick-buy-config.ts:L18-L24` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfQuickBuyModule` | class | `integration-libs/opf/quick-buy/opf-quick-buy.module.ts:L21-L21` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfQuickBuyPickupInStoreModule` | class | `integration-libs/opf/quick-buy/pickup-in-store/opf-quick-buy-pickup-in-store.module.ts:L22-L22` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfQuickBuyRootModule` | class | `integration-libs/opf/quick-buy/root/opf-quick-buy-root.module.ts:L33-L33` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfQuickBuySingleProductCartOptionsFacade` | class | `integration-libs/opf/quick-buy/root/facade/opf-quick-buy-single-product-cart-options.facade.ts:L22-L26` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `OpfQuickBuyTransactionService` | class | `integration-libs/opf/quick-buy/core/services/opf-quick-buy-transaction.service.ts:L24-L198` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `OpfResourceLoaderService` | class | `integration-libs/opf/base/root/services/opf-resource-loader.service.ts:L33-L437` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfTokenisationModule` | class | `integration-libs/opf/tokenisation/opf-tokenisation.module.ts:L18-L18` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OpfTokenisationRootModule` | class | `integration-libs/opf/tokenisation/root/opf-tokenisation-root.module.ts:L58-L58` | [35](../parte-2/35-integration-opf-payments.md) (2) |
| `OppsConfig` | class | `integration-libs/opps/root/config/opps-config.ts:L14-L25` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OppsCouponCodesModule` | class | `integration-libs/opps/root/coupon-codes/opps-coupon-codes.module.ts:L29-L29` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OppsLoginRequiredGuard` | class | `integration-libs/opps/root/login-required/opps-login-required.guard.ts:L22-L62` | [35](../parte-2/35-integration-opf-payments.md) (4) |
| `OppsLoginRequiredModule` | class | `integration-libs/opps/root/login-required/opps-login-required.module.ts:L20-L20` | [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OppsRootModule` | class | `integration-libs/opps/root/opps-root.module.ts:L17-L17` | [35](../parte-2/35-integration-opf-payments.md) (3) |
| `OptimizedSsrEngine` | class | `core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts:L37-L475` | [07](../parte-1/07-ssr-hydration-transferstate.md) (6), [39](../parte-2/39-ssr-ottimizzato.md) (8), [47](../parte-2/47-app-demo.md) (5) |
| `Order` | interface | `feature-libs/order/root/model/order.model.ts:L103-L146` (+1) | [27](../parte-2/27-order.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (3), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3), [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `ORDER_CMS_COMPONENTS` | const | `feature-libs/order/root/order-root.module.ts:L28-L65` | [27](../parte-2/27-order.md) (2) |
| `ORDER_CORE_FEATURE` | const | `feature-libs/order/root/feature-name.ts:L8-L8` | [50](../parte-3/50-ricette-config-di.md) (1) |
| `ORDER_ENTRIES_CONTEXT` | const | `feature-libs/cart/base/root/context/order-entires.context.ts:L10-L10` | [14](../parte-2/14-routing.md) (2), [25](../parte-2/25-cart.md) (4), [28](../parte-2/28-organization-b2b.md) (1) |
| `ORDER_ENTRY_PROMOTIONS_NORMALIZER` | const | `feature-libs/cart/base/root/tokens/converters.ts:L21-L23` | [25](../parte-2/25-cart.md) (3), [27](../parte-2/27-order.md) (1) |
| `ORDER_FEATURE` | const | `feature-libs/order/root/feature-name.ts:L7-L7` (+1) | [28](../parte-2/28-organization-b2b.md) (1), [50](../parte-3/50-ricette-config-di.md) (2) |
| `ORDER_HISTORY_NORMALIZER` | const | `feature-libs/order/root/tokens/converters.ts:L36-L38` | [27](../parte-2/27-order.md) (1) |
| `ORDER_MODULE` | const | `core-libs/schematics/src/shared/lib-configs/order-schematics-config.ts:L24-L24` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `ORDER_NORMALIZER` | const | `feature-libs/order/root/tokens/converters.ts:L24-L26` | [27](../parte-2/27-order.md) (3), [35](../parte-2/35-integration-opf-payments.md) (4), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `ORDER_RETURN_REQUEST_INPUT_SERIALIZER` | const | `feature-libs/order/root/tokens/converters.ts:L48-L50` | [27](../parte-2/27-order.md) (2) |
| `ORDER_RETURN_REQUEST_NORMALIZER` | const | `feature-libs/order/root/tokens/converters.ts:L44-L46` | [27](../parte-2/27-order.md) (1) |
| `ORDER_RETURNS_NORMALIZER` | const | `feature-libs/order/root/tokens/converters.ts:L52-L54` | [27](../parte-2/27-order.md) (1) |
| `ORDER_TYPE` | enum | `feature-libs/order/root/model/scheduled-replenishment.model.ts:L32-L35` | [27](../parte-2/27-order.md) (1) |
| `OrderAdapter` | class | `feature-libs/order/core/connectors/order.adapter.ts:L10-L36` | [27](../parte-2/27-order.md) (1) |
| `OrderAmendService` | class | `feature-libs/order/components/amend-order/amend-order.service.ts:L35-L153` | [27](../parte-2/27-order.md) (3) |
| `OrderApprovalDetailService` | class | `feature-libs/organization/order-approval/components/details/order-approval-detail.service.ts:L18-L66` | [28](../parte-2/28-organization-b2b.md) (2) |
| `OrderApprovalService` | class | `feature-libs/organization/order-approval/core/services/order-approval.service.ts:L31-L181` | [28](../parte-2/28-organization-b2b.md) (2) |
| `OrderAttachmentsDialogComponent` | class | `feature-libs/order/components/order-details/order-attachments/attachments-dialog/order-attachments-dialog.component.ts:L55-L188` | [04](../parte-1/04-change-detection-zone-signals.md) (1) |
| `OrderAttachmentsFacade` | class | `feature-libs/order/root/facade/order-attachments.facade.ts:L22-L35` | [27](../parte-2/27-order.md) (1) |
| `OrderAttachmentsService` | class | `feature-libs/order/core/facade/order-attachments.service.ts:L17-L45` | [27](../parte-2/27-order.md) (1) |
| `OrderCancellationGuard` | class | `feature-libs/order/components/amend-order/cancellations/order-cancellation.guard.ts:L17-L40` | [27](../parte-2/27-order.md) (1) |
| `OrderCancellationService` | class | `feature-libs/order/components/amend-order/cancellations/order-cancellation.service.ts:L27-L94` | [27](../parte-2/27-order.md) (1) |
| `OrderComponentsModule` | class | `feature-libs/order/components/order-components.module.ts:L43-L43` | [27](../parte-2/27-order.md) (1) |
| `OrderConfig` | class | `feature-libs/order/root/config/order-config.ts:L14-L19` | [27](../parte-2/27-order.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `OrderConfirmationGuard` | class | `feature-libs/order/components/guards/order-confirmation.guard.ts:L17-L37` | [27](../parte-2/27-order.md) (4) |
| `OrderConfirmationModule` | class | `feature-libs/order/components/order-confirmation/order-confirmation.module.ts:L143-L143` | [17](../parte-2/17-outlet.md) (1), [27](../parte-2/27-order.md) (2), [40](../parte-2/40-seo-pwa.md) (3) |
| `OrderConfirmationOrderEntriesContextToken` | const | `feature-libs/order/root/tokens/context.ts:L13-L15` | [27](../parte-2/27-order.md) (1) |
| `OrderConfirmationShippingComponent` | class | `feature-libs/order/components/order-confirmation/order-confirmation-shipping/order-confirmation-shipping.component.ts:L59-L136` | [27](../parte-2/27-order.md) (1) |
| `OrderConsignedEntriesComponent` | class | `feature-libs/order/components/order-details/order-detail-items/order-consigned-entries/order-consigned-entries.component.ts:L42-L69` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `OrderCoreModule` | class | `feature-libs/order/core/order-core.module.ts:L29-L29` | [27](../parte-2/27-order.md) (2), [50](../parte-3/50-ricette-config-di.md) (1) |
| `OrderDetailBillingComponent` | class | `feature-libs/order/components/order-details/order-detail-billing/order-detail-billing.component.ts:L27-L66` | [27](../parte-2/27-order.md) (1) |
| `OrderDetailItemsComponent` | class | `feature-libs/order/components/order-details/order-detail-items/order-detail-items.component.ts:L45-L105` | [27](../parte-2/27-order.md) (2) |
| `OrderDetailReorderComponent` | class | `feature-libs/order/components/order-details/order-detail-reorder/order-detail-reorder.component.ts:L31-L81` | [27](../parte-2/27-order.md) (1) |
| `OrderDetailsModule` | class | `feature-libs/order/components/order-details/order-details.module.ts:L191-L191` | [12](../parte-2/12-feature-module-lazy.md) (1), [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `OrderDetailsOrderEntriesContextToken` | const | `feature-libs/order/root/tokens/context.ts:L9-L11` | [27](../parte-2/27-order.md) (1) |
| `OrderDetailsService` | class | `feature-libs/order/components/order-details/order-details.service.ts:L22-L56` | [27](../parte-2/27-order.md) (12), [28](../parte-2/28-organization-b2b.md) (3) |
| `OrderDocumentFlowDialogComponent` | class | `feature-libs/order/document-flow/components/order-document-flow-dialog/order-document-flow-dialog.component.ts:L68-L178` | [27](../parte-2/27-order.md) (1) |
| `OrderDocumentFlowFacade` | class | `feature-libs/order/document-flow/root/facade/order-document-flow.facade.ts:L29-L45` | [27](../parte-2/27-order.md) (1) |
| `OrderDocumentFlowService` | class | `feature-libs/order/document-flow/core/services/order-document-flow.service.ts:L19-L56` | [27](../parte-2/27-order.md) (1) |
| `OrderEntriesSource` | enum | `feature-libs/cart/base/root/models/import-export.model.ts:L7-L15` | [25](../parte-2/25-cart.md) (1) |
| `OrderEntry` | interface | `core-libs/core/src/occ/occ-models/occ.models.ts:L904-L924` (+1) | [25](../parte-2/25-cart.md) (2), [30](../parte-2/30-product-configurator.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (7), [54](../parte-3/54-upgrade-safe.md) (1) |
| `OrderEntryPromotionsNormalizer` | class | `feature-libs/cart/base/occ/adapters/converters/order-entry-promotions-normalizer.ts:L15-L18` | [25](../parte-2/25-cart.md) (2) |
| `OrderEvent` | class | `feature-libs/order/root/events/order.events.ts:L14-L30` | [27](../parte-2/27-order.md) (1) |
| `OrderFacade` | class | `feature-libs/order/root/facade/order.facade.ts:L31-L64` | [27](../parte-2/27-order.md) (6) |
| `OrderFeatureModule` | class | `core-libs/schematics/src/shared/utils/config-utils_spec.ts:L120-L121` | [27](../parte-2/27-order.md) (1) |
| `OrderGuestRegisterFormComponent` | class | `feature-libs/order/components/order-confirmation/order-guest-register-form/order-guest-register-form.component.ts:L44-L92` | [27](../parte-2/27-order.md) (1) |
| `OrderHistory` | interface | `feature-libs/order/root/model/order.model.ts:L84-L95` (+1) | [27](../parte-2/27-order.md) (1) |
| `OrderHistoryAdapter` | class | `feature-libs/order/core/connectors/order-history.adapter.ts:L19-L112` | [27](../parte-2/27-order.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (4), [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `OrderHistoryComponent` | class | `feature-libs/order/components/order-history/order-history.component.ts:L53-L156` | [27](../parte-2/27-order.md) (2) |
| `OrderHistoryFacade` | class | `feature-libs/order/root/facade/order-history.facade.ts:L49-L149` | [27](../parte-2/27-order.md) (4), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (6), [50](../parte-3/50-ricette-config-di.md) (6) |
| `OrderHistoryService` | class | `feature-libs/order/core/facade/order-history.service.ts:L30-L226` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [50](../parte-3/50-ricette-config-di.md) (2) |
| `OrderModule` | class | `feature-libs/order/order.module.ts:L15-L15` | [27](../parte-2/27-order.md) (4), [35](../parte-2/35-integration-opf-payments.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (4), [47](../parte-2/47-app-demo.md) (1), [50](../parte-3/50-ricette-config-di.md) (4), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `OrderOccEndpoints` | interface | `feature-libs/order/occ/model/occ-order-endpoints.model.ts:L9-L102` | [27](../parte-2/27-order.md) (1) |
| `OrderOccModule` | class | `feature-libs/order/occ/order-occ.module.ts:L90-L90` | [27](../parte-2/27-order.md) (1) |
| `OrderOutlets` | enum | `feature-libs/order/root/model/order-outlets.model.ts:L10-L14` | [27](../parte-2/27-order.md) (1) |
| `OrderOverviewComponent` | class | `feature-libs/order/components/order-details/order-overview/order-overview.component.ts:L57-L303` | [27](../parte-2/27-order.md) (4) |
| `OrderOverviewComponentService` | class | `feature-libs/order/components/order-details/order-overview/order-overview-component.service.ts:L11-L15` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `OrderOverviewDeliveryDateComponent` | class | `feature-libs/requested-delivery-date/root/components/order-overview-delivery-date/order-overview-delivery-date.component.ts:L21-L66` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `OrderPlacedEvent` | class | `feature-libs/order/root/events/order.events.ts:L35-L44` | [26](../parte-2/26-checkout.md) (5), [27](../parte-2/27-order.md) (2), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [35](../parte-2/35-integration-opf-payments.md) (1) |
| `OrderReturnGuard` | class | `feature-libs/order/components/amend-order/returns/order-return.guard.ts:L17-L40` | [27](../parte-2/27-order.md) (1) |
| `OrderReturnRequestFacade` | class | `feature-libs/order/root/facade/order-return-request.facade.ts:L45-L127` | [27](../parte-2/27-order.md) (2) |
| `OrderReturnService` | class | `feature-libs/order/components/amend-order/returns/order-return.service.ts:L27-L100` | [27](../parte-2/27-order.md) (1) |
| `OrderRootModule` | class | `feature-libs/order/root/order-root.module.ts:L180-L180` | [27](../parte-2/27-order.md) (5) |
| `OrdersEffect` | class | `feature-libs/order/core/store/effects/orders.effect.ts:L24-L79` | [27](../parte-2/27-order.md) (2) |
| `OrderService` | class | `feature-libs/order/core/facade/order.service.ts:L23-L191` | [26](../parte-2/26-checkout.md) (1), [27](../parte-2/27-order.md) (1) |
| `OrderState` | interface | `feature-libs/order/core/store/order-state.ts:L37-L47` | [27](../parte-2/27-order.md) (1) |
| `OrderStoreModule` | class | `feature-libs/order/core/store/order-store.module.ts:L21-L21` | [27](../parte-2/27-order.md) (1) |
| `OrderSummaryComponent` | class | `feature-libs/cart/base/components/cart-shared/order-summary/order-summary.component.ts:L20-L39` | [17](../parte-2/17-outlet.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `ORGANIZATION_ADMINISTRATION_FEATURE` | const | `feature-libs/organization/administration/root/feature-name.ts:L7-L7` | [28](../parte-2/28-organization-b2b.md) (2) |
| `OrganizationBadRequestHandler` | class | `feature-libs/organization/administration/core/http-interceptors/bad-request/bad-request.handler.ts:L20-L94` | [28](../parte-2/28-organization-b2b.md) (3) |
| `OrganizationClearData` | class | `feature-libs/organization/administration/core/store/actions/organization.action.ts:L11-L13` | [28](../parte-2/28-organization-b2b.md) (4) |
| `OrganizationConflictHandler` | class | `feature-libs/organization/administration/core/http-interceptors/conflict/conflict.handler.ts:L20-L97` | [28](../parte-2/28-organization-b2b.md) (3) |
| `OrganizationPageMetaResolver` | class | `feature-libs/organization/administration/core/services/organization-page-meta.resolver.ts:L41-L131` | [28](../parte-2/28-organization-b2b.md) (2) |
| `OrganizationsGuardsModule` | class | `feature-libs/organization/administration/core/guards/organization-guards.module.ts:L21-L21` | [28](../parte-2/28-organization-b2b.md) (1) |
| `OrganizationStoreModule` | class | `feature-libs/organization/administration/core/store/organization-store.module.ts:L23-L23` | [28](../parte-2/28-organization-b2b.md) (1) |
| `OrganizationTableType` | enum | `feature-libs/organization/administration/components/shared/organization.model.ts:L9-L35` | [28](../parte-2/28-organization-b2b.md) (8) |
| `OrganizationUIConfig` | class | `feature-libs/organization/administration/root/config/organization-ui.config.ts:L17-L30` | [28](../parte-2/28-organization-b2b.md) (3) |
| `OrgUnitEffects` | class | `feature-libs/organization/administration/core/store/effects/org-unit.effect.ts:L30-L476` | [54](../parte-3/54-upgrade-safe.md) (1) |
| `OrgUnitGuard` | class | `feature-libs/organization/administration/core/guards/org-unit.guard.ts:L17-L38` | [28](../parte-2/28-organization-b2b.md) (4) |
| `OrgUnitService` | class | `feature-libs/organization/administration/core/services/org-unit.service.ts:L40-L504` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `OriginValidationOptions` | interface | `core-libs/setup/ssr/express-utils/express-origin-validation-middleware.ts:L10-L12` | [39](../parte-2/39-ssr-ottimizzato.md) (1) |
| `OutboundHttpError` | class | `core-libs/core/src/error-handling/http-error-handler/outbound-http-error.ts:L10-L14` | [06](../parte-1/06-httpclient-interceptor.md) (2), [39](../parte-2/39-ssr-ottimizzato.md) (1), [41](../parte-2/41-errori-global-message.md) (6) |
| `OutletContextData` | class | `core-libs/storefront/cms-structure/outlet/outlet.model.ts:L21-L44` | [17](../parte-2/17-outlet.md) (9), [32](../parte-2/32-pickup-storefinder-delivery.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (5) |
| `OutletDirective` | class | `core-libs/storefront/cms-structure/outlet/outlet.directive.ts:L34-L236` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [04](../parte-1/04-change-detection-zone-signals.md) (1), [16](../parte-2/16-cms-rendering.md) (3), [17](../parte-2/17-outlet.md) (3), [18](../parte-2/18-layout-breakpoint-a11y.md) (3) |
| `OutletModule` | class | `core-libs/storefront/cms-structure/outlet/outlet.module.ts:L53-L89` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (8), [17](../parte-2/17-outlet.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `OutletPosition` | enum | `core-libs/storefront/cms-structure/outlet/outlet.model.ts:L9-L13` | [17](../parte-2/17-outlet.md) (5), [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (6), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `OutletRefDirective` | class | `core-libs/storefront/cms-structure/outlet/outlet-ref/outlet-ref.directive.ts:L18-L36` | [17](../parte-2/17-outlet.md) (4), [51](../parte-3/51-ricette-cms-outlet-layout.md) (4) |
| `OutletRefModule` | class | `core-libs/storefront/cms-structure/outlet/outlet-ref/outlet-ref.module.ts:L16-L16` | [17](../parte-2/17-outlet.md) (2), [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `OutletRendererService` | class | `core-libs/storefront/cms-structure/outlet/outlet-renderer.service.ts:L16-L49` | [17](../parte-2/17-outlet.md) (12), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `OutletRenderStrategy` | class | `core-libs/storefront/layout/launch-dialog/services/outlet-render.strategy.ts:L27-L99` | [17](../parte-2/17-outlet.md) (4), [29](../parte-2/29-asm.md) (1) |
| `OutletService` | class | `core-libs/storefront/cms-structure/outlet/outlet.service.ts:L13-L98` | [17](../parte-2/17-outlet.md) (10), [18](../parte-2/18-layout-breakpoint-a11y.md) (3), [24](../parte-2/24-product-search.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (4) |
| `Owner` | interface | `feature-libs/product-configurator/common/core/model/common-configurator.model.ts:L11-L29` | [30](../parte-2/30-product-configurator.md) (1) |
| `OwnerType` | enum | `feature-libs/product-configurator/common/core/model/common-configurator.model.ts:L48-L54` | [30](../parte-2/30-product-configurator.md) (2) |

## P

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `Page` | interface | `core-libs/core/src/cms/model/page.model.ts:L10-L26` | [15](../parte-2/15-cms-core.md) (4), [40](../parte-2/40-seo-pwa.md) (2) |
| `PAGE_LAYOUT_HANDLER` | const | `core-libs/storefront/cms-structure/page/page-layout/page-layout-handler.ts:L11-L13` (+1) | [12](../parte-2/12-feature-module-lazy.md) (1), [16](../parte-2/16-cms-rendering.md) (3), [25](../parte-2/25-cart.md) (2), [30](../parte-2/30-product-configurator.md) (4), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `PageBreadcrumbResolver` | interface | `core-libs/core/src/cms/page/page.resolvers.ts:L53-L58` | [40](../parte-2/40-seo-pwa.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `PageComponentModule` | class | `core-libs/storefront/cms-structure/page/component/page-component.module.ts:L23-L41` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [16](../parte-2/16-cms-rendering.md) (1) |
| `PageContext` | class | `core-libs/core/src/routing/models/page-context.model.ts:L22-L30` | [05](../parte-1/05-router.md) (2), [14](../parte-2/14-routing.md) (8), [15](../parte-2/15-cms-core.md) (4), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (7) |
| `PageDescriptionResolver` | interface | `core-libs/core/src/cms/page/page.resolvers.ts:L42-L47` | [40](../parte-2/40-seo-pwa.md) (1) |
| `PageEffects` | class | `core-libs/core/src/cms/store/effects/page.effect.ts:L31-L115` | [13](../parte-2/13-site-context-theme.md) (2), [15](../parte-2/15-cms-core.md) (2) |
| `PageEvent` | class | `core-libs/storefront/events/page/page.events.ts:L13-L18` | [20](../parte-2/20-facade-command-query-eventi.md) (7) |
| `PageHeadingResolver` | interface | `core-libs/core/src/cms/page/page.resolvers.ts:L20-L25` | [40](../parte-2/40-seo-pwa.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `PageImageResolver` | interface | `core-libs/core/src/cms/page/page.resolvers.ts:L65-L70` | [40](../parte-2/40-seo-pwa.md) (1) |
| `PageLayoutComponent` | class | `core-libs/storefront/cms-structure/page/page-layout/page-layout.component.ts:L30-L58` | [05](../parte-1/05-router.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [15](../parte-2/15-cms-core.md) (1), [16](../parte-2/16-cms-rendering.md) (10), [17](../parte-2/17-outlet.md) (2), [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [25](../parte-2/25-cart.md) (1), [28](../parte-2/28-organization-b2b.md) (1), [29](../parte-2/29-asm.md) (1), [30](../parte-2/30-product-configurator.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (6), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `PageLayoutHandler` | interface | `core-libs/storefront/cms-structure/page/page-layout/page-layout-handler.ts:L15-L22` | [16](../parte-2/16-cms-rendering.md) (1) |
| `PageLayoutModule` | class | `core-libs/storefront/cms-structure/page/page-layout/page-layout.module.ts:L24-L24` | [16](../parte-2/16-cms-rendering.md) (2), [29](../parte-2/29-asm.md) (1) |
| `PageLayoutService` | class | `core-libs/storefront/cms-structure/page/page-layout/page-layout.service.ts:L29-L278` | [12](../parte-2/12-feature-module-lazy.md) (1), [16](../parte-2/16-cms-rendering.md) (5), [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [30](../parte-2/30-product-configurator.md) (1) |
| `PageLinkService` | class | `core-libs/core/src/cms/page/routing/page-link.service.ts:L19-L103` | [40](../parte-2/40-seo-pwa.md) (4) |
| `PageMeta` | interface | `core-libs/core/src/cms/model/page.model.ts:L40-L78` | [15](../parte-2/15-cms-core.md) (1), [40](../parte-2/40-seo-pwa.md) (8), [52](../parte-3/52-ricette-occ-dati.md) (3) |
| `PageMetaConfig` | class | `core-libs/core/src/cms/page/config/page-meta.config.ts:L14-L16` | [40](../parte-2/40-seo-pwa.md) (3) |
| `PageMetaLinkService` | class | `core-libs/storefront/cms-structure/seo/page-meta-link.service.ts:L19-L72` | [40](../parte-2/40-seo-pwa.md) (3) |
| `PageMetaModule` | class | `core-libs/core/src/cms/page/page-meta.module.ts:L22-L29` | [40](../parte-2/40-seo-pwa.md) (2) |
| `PageMetaResolver` | class | `core-libs/core/src/cms/page/page-meta.resolver.ts:L17-L54` | [12](../parte-2/12-feature-module-lazy.md) (1), [15](../parte-2/15-cms-core.md) (1), [24](../parte-2/24-product-search.md) (3), [26](../parte-2/26-checkout.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (2), [40](../parte-2/40-seo-pwa.md) (12), [46](../parte-2/46-util-modelli.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (8) |
| `PageMetaResolversConfig` | interface | `core-libs/core/src/cms/page/config/page-meta.config.ts:L22-L29` | [40](../parte-2/40-seo-pwa.md) (1) |
| `PageMetaService` | class | `core-libs/core/src/cms/facade/page-meta.service.ts:L32-L140` | [12](../parte-2/12-feature-module-lazy.md) (1), [15](../parte-2/15-cms-core.md) (3), [40](../parte-2/40-seo-pwa.md) (9), [45](../parte-2/45-componenti-storefront.md) (1), [46](../parte-2/46-util-modelli.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `PageRobotsMeta` | enum | `core-libs/core/src/cms/model/page.model.ts:L85-L90` | [15](../parte-2/15-cms-core.md) (2), [40](../parte-2/40-seo-pwa.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `PageRobotsResolver` | interface | `core-libs/core/src/cms/page/page.resolvers.ts:L78-L90` | [40](../parte-2/40-seo-pwa.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `PageSection` | enum | `core-libs/storefront/cms-structure/utils/cms-structure.model.ts:L9-L13` | [16](../parte-2/16-cms-rendering.md) (2) |
| `PageSlotComponent` | class | `core-libs/storefront/cms-structure/page/slot/page-slot.component.ts:L54-L218` | [04](../parte-1/04-change-detection-zone-signals.md) (2), [15](../parte-2/15-cms-core.md) (2), [16](../parte-2/16-cms-rendering.md) (4), [17](../parte-2/17-outlet.md) (4), [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `PageSlotModule` | class | `core-libs/storefront/cms-structure/page/slot/page-slot.module.ts:L18-L23` | [16](../parte-2/16-cms-rendering.md) (4) |
| `PageSlotService` | class | `core-libs/storefront/cms-structure/page/slot/page-slot.service.ts:L16-L74` | [16](../parte-2/16-cms-rendering.md) (6) |
| `PageTemplateDirective` | class | `core-libs/storefront/cms-structure/page/page-layout/page-template.directive.ts:L47-L156` | [07](../parte-1/07-ssr-hydration-transferstate.md) (2), [16](../parte-2/16-cms-rendering.md) (4), [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `PageTitleComponent` | class | `core-libs/storefront/cms-components/navigation/page-header/page-title.component.ts:L25-L45` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `PageTitleResolver` | interface | `core-libs/core/src/cms/page/page.resolvers.ts:L31-L36` | [40](../parte-2/40-seo-pwa.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `PageType` | enum | `core-libs/core/src/model/cms.model.ts:L38-L43` (+2) | [14](../parte-2/14-routing.md) (1), [15](../parte-2/15-cms-core.md) (5), [30](../parte-2/30-product-configurator.md) (1), [46](../parte-2/46-util-modelli.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `Pagination` | interface | `core-libs/core/src/model/unused.model.ts:L33-L38` (+1) | [46](../parte-2/46-util-modelli.md) (4) |
| `PaginationBuilder` | class | `core-libs/storefront/shared/components/list-navigation/pagination/pagination.builder.ts:L52-L376` | [45](../parte-2/45-componenti-storefront.md) (4) |
| `PaginationComponent` | class | `core-libs/storefront/shared/components/list-navigation/pagination/pagination.component.ts:L47-L224` | [45](../parte-2/45-componenti-storefront.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `PaginationConfig` | class | `core-libs/storefront/shared/components/list-navigation/pagination/config/pagination.config.ts:L15-L17` | [29](../parte-2/29-asm.md) (1), [45](../parte-2/45-componenti-storefront.md) (1) |
| `PaginationModel` | interface | `core-libs/core/src/model/misc.model.ts:L73-L79` (+1) | [46](../parte-2/46-util-modelli.md) (5) |
| `PaginationModule` | class | `core-libs/storefront/shared/components/list-navigation/pagination/pagination.module.ts:L31-L31` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `PaginationOptions` | interface | `core-libs/storefront/shared/components/list-navigation/pagination/pagination.model.ts:L33-L96` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `ParagraphComponent` | class | `core-libs/storefront/cms-components/content/paragraph/paragraph.component.ts:L26-L52` | [45](../parte-2/45-componenti-storefront.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3) |
| `ParamsMapping` | interface | `core-libs/core/src/routing/configurable-routes/routes-config.ts:L59-L61` | [14](../parte-2/14-routing.md) (2) |
| `PASSWORD_PATTERN` | const | `core-libs/core/src/util/regex-pattern.ts:L11-L12` | [46](../parte-2/46-util-modelli.md) (1) |
| `PasswordVisibilityToggleDirective` | class | `core-libs/storefront/shared/components/form/password-visibility-toggle/password-visibility-toggle.directive.ts:L23-L64` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `PasswordVisibilityToggleModule` | class | `core-libs/storefront/shared/components/form/password-visibility-toggle/password-visibility-toggle.module.ts:L29-L29` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `PAYMENT_CARD_TYPE_NORMALIZER` | const | `feature-libs/checkout/base/core/connectors/checkout-payment/converters.ts:L14-L16` | [26](../parte-2/26-checkout.md) (1) |
| `PAYMENT_DETAILS_NORMALIZER` | const | `core-libs/core/src/checkout/connectors/payment/converters.ts:L11-L13` | [26](../parte-2/26-checkout.md) (4) |
| `PAYMENT_DETAILS_SERIALIZER` | const | `feature-libs/checkout/base/core/connectors/checkout-payment/converters.ts:L10-L12` | [26](../parte-2/26-checkout.md) (1) |
| `PaymentDetails` | interface | `core-libs/core/src/model/payment.model.ts:L13-L28` (+1) | [46](../parte-2/46-util-modelli.md) (2) |
| `PDFComponent` | class | `core-libs/storefront/cms-components/content/pdf/pdf.component.ts:L22-L44` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `PDFInvoicesBadRequestHandler` | class | `feature-libs/pdf-invoices/core/http-interceptors/bad-request/pdf-invoices-badrequest.handler.ts:L20-L91` | [27](../parte-2/27-order.md) (1) |
| `PDFInvoicesComponentsModule` | class | `feature-libs/pdf-invoices/components/pdf-invoices-components.module.ts:L53-L53` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PDFInvoicesFacade` | class | `feature-libs/pdf-invoices/root/facade/pdf-invoices.facade.ts:L28-L54` | [27](../parte-2/27-order.md) (1) |
| `PDFInvoicesService` | class | `feature-libs/pdf-invoices/core/services/pdf-invoices.service.ts:L19-L81` | [27](../parte-2/27-order.md) (2) |
| `PdpPickupOptionsContainerComponent` | class | `feature-libs/pickup-in-store/components/container/pdp-pickup-options-container/pdp-pickup-options-container.component.ts:L61-L197` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `PersistFocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L31-L62` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `PersistFocusService` | class | `core-libs/storefront/layout/a11y/keyboard-focus/persist/persist-focus.service.ts:L22-L58` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `PERSONALIZATION_FEATURE` | const | `feature-libs/tracking/personalization/root/feature-name.ts:L7-L7` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (3) |
| `PersonalizationAction` | interface | `feature-libs/tracking/personalization/core/model/personalization-context.model.ts:L7-L14` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1) |
| `PersonalizationConfig` | class | `feature-libs/tracking/personalization/root/config/personalization-config.ts:L14-L26` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (3) |
| `PersonalizationContext` | interface | `feature-libs/tracking/personalization/core/model/personalization-context.model.ts:L16-L19` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `PersonalizationContextService` | class | `feature-libs/tracking/personalization/core/services/personalization-context.service.ts:L22-L70` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4) |
| `PersonalizationCoreModule` | class | `feature-libs/tracking/personalization/core/personalization-core.module.ts:L10-L10` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4) |
| `PersonalizationModule` | class | `feature-libs/tracking/personalization/personalization.module.ts:L13-L13` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (5) |
| `PersonalizationRootModule` | class | `feature-libs/tracking/personalization/root/personalization-root.module.ts:L37-L37` | [06](../parte-1/06-httpclient-interceptor.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `PickupInfoContainerComponent` | class | `feature-libs/pickup-in-store/components/container/pickup-info-container/pickup-info-container.component.ts:L21-L68` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `PickupInStoreComponentsModule` | class | `feature-libs/pickup-in-store/components/pickup-in-store-components.module.ts:L34-L34` | [17](../parte-2/17-outlet.md) (1) |
| `PickupInStoreCoreModule` | class | `feature-libs/pickup-in-store/core/pickup-in-store-core.module.ts:L23-L23` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PickupInStoreRootModule` | class | `feature-libs/pickup-in-store/root/pickup-in-store-root.module.ts:L60-L60` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PickUpItemsDetailsComponent` | class | `feature-libs/pickup-in-store/components/container/pickup-items-details/pickup-items-details.component.ts:L47-L73` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PickupLocationAdapter` | class | `feature-libs/pickup-in-store/core/connectors/pickup-location.adapter.ts:L13-L19` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PickupLocationConnector` | class | `feature-libs/pickup-in-store/core/connectors/pickup-location.connector.ts:L16-L28` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PickupLocationsSearchFacade` | class | `feature-libs/pickup-in-store/root/facade/pickup-locations-search.facade.ts:L46-L67` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PickupOptionDialogComponent` | class | `feature-libs/pickup-in-store/components/container/pickup-option-dialog/pickup-option-dialog.component.ts:L55-L207` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `PickupOptionFacade` | class | `feature-libs/pickup-in-store/root/facade/pickup-option.facade.ts:L28-L38` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PLACE_ORDER` | const | `core-libs/schematics/src/shared/constants.ts:L1052-L1052` | [26](../parte-2/26-checkout.md) (2) |
| `PLATFORM_ID` | const | `core-libs/schematics/src/shared/constants.ts:L20-L20` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [07](../parte-1/07-ssr-hydration-transferstate.md) (2), [19](../parte-2/19-state-management.md) (1), [40](../parte-2/40-seo-pwa.md) (1), [46](../parte-2/46-util-modelli.md) (3) |
| `POINT_OF_SERVICE_NORMALIZER` | const | `core-libs/core/src/checkout/connectors/checkout/converters.ts:L11-L13` | [26](../parte-2/26-checkout.md) (2), [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PointOfService` | interface | `core-libs/core/src/model/point-of-service.model.ts:L11-L25` (+1) | [46](../parte-2/46-util-modelli.md) (3) |
| `PointOfServiceNames` | type | `feature-libs/pickup-in-store/root/model/point-of-service-names.model.ts:L10-L13` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PointOfServiceStock` | interface | `core-libs/core/src/model/product.model.ts:L232-L247` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `PopoverComponent` | class | `core-libs/storefront/shared/components/popover/popover.component.ts:L45-L290` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `PopoverOptions` | interface | `core-libs/storefront/shared/components/popover/popover.model.ts:L38-L84` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `PopoverService` | class | `core-libs/storefront/shared/components/popover/popover.service.ts:L14-L39` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `PositioningService` | class | `core-libs/storefront/shared/services/positioning/positioning.service.ts:L27-L349` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `POST_PRODUCT_REVIEW_SUCCESS` | const | `core-libs/core/src/product/store/actions/product-reviews.action.ts:L18-L19` | [24](../parte-2/24-product-search.md) (1) |
| `PreferredStoreFacade` | class | `feature-libs/pickup-in-store/root/facade/preferred-store.facade.ts:L31-L57` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PreferredStoreService` | class | `feature-libs/pickup-in-store/core/services/preferred-store.service.ts:L33-L98` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `PrerenderingLoggerService` | class | `core-libs/setup/ssr/logger/services/prerendering-logger.service.ts:L18-L39` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [39](../parte-2/39-ssr-ottimizzato.md) (3), [41](../parte-2/41-errori-global-message.md) (1) |
| `Price` | interface | `core-libs/core/src/model/product.model.ts:L68-L75` (+1) | [46](../parte-2/46-util-modelli.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `PriceType` | enum | `core-libs/core/src/model/product.model.ts:L63-L66` (+2) | [46](../parte-2/46-util-modelli.md) (2) |
| `Principal` | interface | `core-libs/core/src/model/misc.model.ts:L35-L38` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `Priority` | enum | `core-libs/core/src/util/applicable.ts:L7-L24` | [41](../parte-2/41-errori-global-message.md) (2), [46](../parte-2/46-util-modelli.md) (3), [50](../parte-3/50-ricette-config-di.md) (4), [54](../parte-3/54-upgrade-safe.md) (1) |
| `PROCESS_FEATURE` | const | `core-libs/core/src/process/store/process-state.ts:L9-L9` | [19](../parte-2/19-state-management.md) (1), [23](../parte-2/23-user.md) (1), [25](../parte-2/25-cart.md) (1), [27](../parte-2/27-order.md) (1) |
| `ProcessesLoaderResetAction` | class | `core-libs/core/src/state/utils/processes-loader/processes-loader.action.ts:L57-L63` | [19](../parte-2/19-state-management.md) (1) |
| `ProcessesLoaderState` | interface | `core-libs/core/src/state/utils/processes-loader/processes-loader-state.ts:L9-L11` | [19](../parte-2/19-state-management.md) (1) |
| `ProcessModule` | class | `core-libs/core/src/process/process.module.ts:L13-L20` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [19](../parte-2/19-state-management.md) (5) |
| `ProcessStoreModule` | class | `core-libs/core/src/process/store/process-store.module.ts:L17-L17` | [19](../parte-2/19-state-management.md) (3) |
| `Product` | interface | `core-libs/core/src/model/product.model.ts:L167-L210` (+1) | [30](../parte-2/30-product-configurator.md) (2), [31](../parte-2/31-quote-ticketing-subscription.md) (2), [46](../parte-2/46-util-modelli.md) (7), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (8), [54](../parte-3/54-upgrade-safe.md) (2) |
| `PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE` | const | `feature-libs/product-configurator/textfield/root/feature-name.ts:L7-L8` (+1) | [30](../parte-2/30-product-configurator.md) (1) |
| `PRODUCT_DETAIL_ENTITY` | const | `core-libs/core/src/product/store/product-state.ts:L15-L15` | [24](../parte-2/24-product-search.md) (1) |
| `PRODUCT_DETAILS_URL_MATCHER` | const | `core-libs/storefront/cms-pages/product-details-page/product-details-url-matcher.ts:L42-L50` | [05](../parte-1/05-router.md) (3), [14](../parte-2/14-routing.md) (4), [16](../parte-2/16-cms-rendering.md) (2), [24](../parte-2/24-product-search.md) (1) |
| `PRODUCT_FEATURE` | const | `core-libs/core/src/product/store/product-state.ts:L14-L14` | [24](../parte-2/24-product-search.md) (1) |
| `PRODUCT_LISTING_URL_MATCHER` | const | `core-libs/storefront/cms-pages/product-listing-page/product-listing-url-matcher.ts:L42-L50` | [05](../parte-1/05-router.md) (2), [16](../parte-2/16-cms-rendering.md) (2) |
| `PRODUCT_MULTI_DIMENSIONAL_LIST_FEATURE` | const | `feature-libs/product-multi-dimensional/list/root/feature-name.ts:L7-L8` | [47](../parte-2/47-app-demo.md) (1) |
| `PRODUCT_NORMALIZER` | const | `core-libs/core/src/product/connectors/product/converters.ts:L11-L13` | [01](../parte-1/01-dependency-injection.md) (2), [21](../parte-2/21-occ.md) (5), [24](../parte-2/24-product-search.md) (4), [25](../parte-2/25-cart.md) (1), [27](../parte-2/27-order.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (2), [46](../parte-2/46-util-modelli.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (7) |
| `PRODUCT_REFERENCES_NORMALIZER` | const | `core-libs/core/src/product/connectors/references/converters.ts:L11-L13` | [24](../parte-2/24-product-search.md) (1) |
| `PRODUCT_REVIEW_NORMALIZER` | const | `core-libs/core/src/product/connectors/reviews/converters.ts:L11-L13` | [24](../parte-2/24-product-search.md) (1) |
| `PRODUCT_REVIEW_SERIALIZER` | const | `core-libs/core/src/product/connectors/reviews/converters.ts:L15-L17` | [21](../parte-2/21-occ.md) (1), [24](../parte-2/24-product-search.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `PRODUCT_SEARCH_PAGE_NORMALIZER` | const | `core-libs/core/src/product/connectors/search/converters.ts:L14-L16` | [24](../parte-2/24-product-search.md) (1) |
| `PRODUCT_SUGGESTION_NORMALIZER` | const | `core-libs/core/src/product/connectors/search/converters.ts:L18-L20` | [24](../parte-2/24-product-search.md) (1) |
| `ProductAdapter` | class | `core-libs/core/src/product/connectors/product/product.adapter.ts:L11-L30` | [01](../parte-1/01-dependency-injection.md) (2), [21](../parte-2/21-occ.md) (6), [24](../parte-2/24-product-search.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (6) |
| `ProductAttributesComponent` | class | `core-libs/storefront/cms-components/product/product-tabs/product-attributes/product-attributes.component.ts:L19-L25` | [24](../parte-2/24-product-search.md) (1) |
| `ProductAvailabilityAdapter` | class | `core-libs/core/src/product/connectors/product/prduct-availability.adapter.ts:L10-L22` | [21](../parte-2/21-occ.md) (2), [24](../parte-2/24-product-search.md) (3) |
| `ProductAvailabilityService` | class | `core-libs/core/src/product/facade/product-availability.service.ts:L27-L60` | [24](../parte-2/24-product-search.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `ProductCarouselComponent` | class | `core-libs/storefront/cms-components/product/carousel/product-carousel/product-carousel.component.ts:L41-L121` | [24](../parte-2/24-product-search.md) (4) |
| `ProductCarouselModule` | class | `core-libs/storefront/cms-components/product/carousel/product-carousel/product-carousel.module.ts:L53-L53` | [24](../parte-2/24-product-search.md) (1) |
| `ProductCarouselService` | class | `core-libs/storefront/cms-components/product/carousel/product-carousel.service.ts:L21-L64` | [24](../parte-2/24-product-search.md) (1) |
| `ProductCatalogService` | class | `core-libs/core/src/product/services/product-catalog.service.ts:L13-L23` | [24](../parte-2/24-product-search.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (4) |
| `ProductConfiguratorConfig` | interface | `feature-libs/product-configurator/common/core/model/product-configurator.config.ts:L9-L9` | [30](../parte-2/30-product-configurator.md) (2) |
| `ProductConnector` | class | `core-libs/core/src/product/connectors/product/product.connector.ts:L16-L33` | [21](../parte-2/21-occ.md) (2), [24](../parte-2/24-product-search.md) (1), [25](../parte-2/25-cart.md) (1) |
| `ProductDetailOutlets` | enum | `core-libs/storefront/cms-components/product/product-outlets.model.ts:L7-L12` | [24](../parte-2/24-product-search.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3) |
| `ProductDetailsPageEvent` | class | `core-libs/storefront/events/product/product-page.events.ts:L13-L20` | [20](../parte-2/20-facade-command-query-eventi.md) (5) |
| `ProductDetailsPageModule` | class | `core-libs/storefront/cms-pages/product-details-page/product-details-page.module.ts:L38-L38` | [16](../parte-2/16-cms-rendering.md) (2) |
| `ProductEffects` | class | `core-libs/core/src/product/store/effects/product.effect.ts:L23-L105` | [24](../parte-2/24-product-search.md) (2) |
| `ProductEventBuilder` | class | `core-libs/core/src/product/event/product-event.builder.ts:L22-L117` | [24](../parte-2/24-product-search.md) (2) |
| `ProductEventModule` | class | `core-libs/core/src/product/event/product-event.module.ts:L11-L15` | [24](../parte-2/24-product-search.md) (1) |
| `ProductFacetService` | class | `core-libs/storefront/cms-components/product/product-list/product-facet-navigation/services/product-facet.service.ts:L27-L120` | [24](../parte-2/24-product-search.md) (1) |
| `ProductImageNormalizer` | class | `core-libs/core/src/occ/adapters/product/converters/product-image-normalizer.ts:L15-L106` | [21](../parte-2/21-occ.md) (5), [24](../parte-2/24-product-search.md) (4) |
| `ProductImagesComponent` | class | `core-libs/storefront/cms-components/product/product-images/product-images.component.ts:L33-L113` | [24](../parte-2/24-product-search.md) (5), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `ProductImagesModule` | class | `core-libs/storefront/cms-components/product/product-images/product-images.module.ts:L40-L40` | [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `ProductImageZoomProductImagesComponent` | class | `feature-libs/product/image-zoom/components/product-image-zoom/product-image-zoom-product-images/product-image-zoom-product-images.component.ts:L36-L57` | [24](../parte-2/24-product-search.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `ProductImageZoomViewComponent` | class | `feature-libs/product/image-zoom/components/product-image-zoom/product-image-zoom-view/product-image-zoom-view.component.ts:L73-L429` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `ProductImportInfo` | interface | `feature-libs/cart/base/root/models/import-to-cart.model.ts:L21-L27` | [25](../parte-2/25-cart.md) (2) |
| `ProductImportInfoService` | class | `feature-libs/cart/base/core/services/product-import-info.service.ts:L22-L91` | [25](../parte-2/25-cart.md) (1) |
| `ProductInterestSearchResult` | interface | `core-libs/core/src/model/product-interest.model.ts:L21-L25` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `ProductList` | interface | `core-libs/core/src/model/unused.model.ts:L63-L70` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `ProductListComponent` | class | `core-libs/storefront/cms-components/product/product-list/container/product-list.component.ts:L46-L106` | [24](../parte-2/24-product-search.md) (3) |
| `ProductListComponentService` | class | `core-libs/storefront/cms-components/product/product-list/container/product-list-component.service.ts:L40-L302` | [24](../parte-2/24-product-search.md) (2) |
| `ProductListingPageModule` | class | `core-libs/storefront/cms-pages/product-listing-page/product-listing-page.module.ts:L53-L53` | [16](../parte-2/16-cms-rendering.md) (2) |
| `ProductListItemContext` | class | `core-libs/storefront/cms-components/product/product-list/model/product-list-item-context.model.ts:L15-L17` | [24](../parte-2/24-product-search.md) (2), [25](../parte-2/25-cart.md) (1), [30](../parte-2/30-product-configurator.md) (1) |
| `ProductListItemContextSource` | class | `core-libs/storefront/cms-components/product/product-list/model/product-list-item-context-source.model.ts:L18-L20` | [24](../parte-2/24-product-search.md) (1) |
| `ProductListModule` | class | `core-libs/storefront/cms-components/product/product-list/product-list.module.ts:L103-L103` | [24](../parte-2/24-product-search.md) (2) |
| `ProductListOutlets` | enum | `core-libs/storefront/cms-components/product/product-outlets.model.ts:L13-L16` | [24](../parte-2/24-product-search.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `ProductLoadingService` | class | `core-libs/core/src/product/services/product-loading.service.ts:L36-L243` | [21](../parte-2/21-occ.md) (1), [24](../parte-2/24-product-search.md) (4), [46](../parte-2/46-util-modelli.md) (2) |
| `ProductModule` | class | `core-libs/core/src/product/product.module.ts:L42-L49` | [24](../parte-2/24-product-search.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `ProductMultiDimensionalSelectorGuard` | class | `feature-libs/product-multi-dimensional/selector/components/guards/product-multi-dimensional-selector.guard.ts:L33-L111` | [24](../parte-2/24-product-search.md) (1) |
| `ProductNameNormalizer` | class | `core-libs/core/src/occ/adapters/product/converters/product-name-normalizer.ts:L14-L65` | [21](../parte-2/21-occ.md) (5), [24](../parte-2/24-product-search.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `ProductOccEndpoint` | interface | `core-libs/core/src/occ/occ-models/occ-endpoints.model.ts:L14-L19` | [21](../parte-2/21-occ.md) (2) |
| `ProductOccModule` | class | `core-libs/core/src/occ/adapters/product/product-occ.module.ts:L76-L76` | [21](../parte-2/21-occ.md) (8), [24](../parte-2/24-product-search.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (7) |
| `ProductPageEventBuilder` | class | `core-libs/storefront/events/product/product-page-event.builder.ts:L26-L125` | [20](../parte-2/20-facade-command-query-eventi.md) (3) |
| `ProductPageEventModule` | class | `core-libs/storefront/events/product/product-page-event.module.ts:L11-L15` | [20](../parte-2/20-facade-command-query-eventi.md) (2) |
| `ProductPageMetaResolver` | class | `core-libs/core/src/product/services/product-page-meta.resolver.ts:L40-L210` | [24](../parte-2/24-product-search.md) (1), [40](../parte-2/40-seo-pwa.md) (4), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `ProductReferenceNormalizer` | class | `core-libs/core/src/occ/adapters/product/converters/product-reference-normalizer.ts:L13-L49` | [21](../parte-2/21-occ.md) (1) |
| `ProductReferences` | interface | `core-libs/core/src/model/product.model.ts:L157-L159` | [46](../parte-2/46-util-modelli.md) (1) |
| `ProductReferencesAdapter` | class | `core-libs/core/src/product/connectors/references/product-references.adapter.ts:L10-L25` | [21](../parte-2/21-occ.md) (1), [24](../parte-2/24-product-search.md) (2) |
| `ProductReferencesComponent` | class | `core-libs/storefront/cms-components/product/carousel/product-references/product-references.component.ts:L42-L109` | [24](../parte-2/24-product-search.md) (3) |
| `ProductReferencesEffects` | class | `core-libs/core/src/product/store/effects/product-references.effect.ts:L17-L52` | [24](../parte-2/24-product-search.md) (2) |
| `ProductReferenceService` | class | `core-libs/core/src/product/facade/product-reference.service.ts:L18-L52` | [24](../parte-2/24-product-search.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `ProductReviewsAdapter` | class | `core-libs/core/src/product/connectors/reviews/product-reviews.adapter.ts:L10-L28` | [21](../parte-2/21-occ.md) (1), [24](../parte-2/24-product-search.md) (2) |
| `ProductReviewsEffects` | class | `core-libs/core/src/product/store/effects/product-reviews.effect.ts:L21-L111` | [24](../parte-2/24-product-search.md) (2) |
| `ProductReviewService` | class | `core-libs/core/src/product/facade/product-review.service.ts:L19-L44` | [24](../parte-2/24-product-search.md) (1) |
| `ProductSchemaBuilder` | class | `core-libs/storefront/cms-structure/seo/structured-data/builders/product/product-schema.builder.ts:L23-L59` | [40](../parte-2/40-seo-pwa.md) (3) |
| `ProductScope` | enum | `core-libs/core/src/product/model/product-scope.ts:L7-L21` | [21](../parte-2/21-occ.md) (1), [24](../parte-2/24-product-search.md) (6), [46](../parte-2/46-util-modelli.md) (2), [52](../parte-3/52-ricette-occ-dati.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `ProductScopesConfig` | interface | `core-libs/core/src/occ/adapters/product/product-occ-config.ts:L20-L26` | [21](../parte-2/21-occ.md) (1) |
| `ProductSearchAdapter` | class | `core-libs/core/src/product/connectors/search/product-search.adapter.ts:L16-L37` | [21](../parte-2/21-occ.md) (1), [24](../parte-2/24-product-search.md) (2) |
| `ProductSearchByCategoryEffects` | class | `core-libs/core/src/product/store/effects/product-search-by-category.effect.ts:L21-L105` | [24](../parte-2/24-product-search.md) (2) |
| `ProductSearchByCodeEffects` | class | `core-libs/core/src/product/store/effects/product-search-by-code.effect.ts:L22-L114` | [24](../parte-2/24-product-search.md) (2) |
| `ProductSearchByCodeService` | class | `core-libs/core/src/product/facade/product-search-by-code.service.ts:L18-L62` | [24](../parte-2/24-product-search.md) (1) |
| `ProductSearchLoadByCode` | class | `core-libs/core/src/product/store/actions/product-search-by-code.action.ts:L22-L32` | [24](../parte-2/24-product-search.md) (1) |
| `ProductSearchPage` | interface | `core-libs/core/src/model/product-search.model.ts:L68-L79` (+1) | [46](../parte-2/46-util-modelli.md) (4), [54](../parte-3/54-upgrade-safe.md) (1) |
| `ProductSearchService` | class | `core-libs/core/src/product/facade/product-search.service.ts:L19-L43` | [20](../parte-2/20-facade-command-query-eventi.md) (1), [24](../parte-2/24-product-search.md) (2), [40](../parte-2/40-seo-pwa.md) (1) |
| `ProductService` | class | `core-libs/core/src/product/facade/product.service.ts:L20-L89` | [20](../parte-2/20-facade-command-query-eventi.md) (1), [24](../parte-2/24-product-search.md) (5), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `ProductsSearchEffects` | class | `core-libs/core/src/product/store/effects/product-search.effect.ts:L22-L107` | [24](../parte-2/24-product-search.md) (2) |
| `ProductStoreModule` | class | `core-libs/core/src/product/store/product-store.module.ts:L43-L43` | [24](../parte-2/24-product-search.md) (1) |
| `ProductSummaryComponent` | class | `core-libs/storefront/cms-components/product/product-summary/product-summary.component.ts:L28-L43` | [24](../parte-2/24-product-search.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `ProductTypes` | enum | `core-libs/core/src/model/product.model.ts:L267-L271` | [46](../parte-2/46-util-modelli.md) (2) |
| `ProductURLPipe` | class | `core-libs/core/src/routing/configurable-routes/url-translation/product-url.pipe.ts:L11-L16` | [14](../parte-2/14-routing.md) (1) |
| `ProductVariantsContainerComponent` | class | `feature-libs/product/variants/components/product-variants-container/product-variants-container.component.ts:L35-L59` | [24](../parte-2/24-product-search.md) (1) |
| `ProductVariantsGuard` | class | `feature-libs/product/variants/components/guards/product-variants.guard.ts:L26-L81` | [24](../parte-2/24-product-search.md) (3) |
| `ProfileTagComponent` | class | `integration-libs/cds/src/profiletag/cms-components/profile-tag.component.ts:L18-L21` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `ProfileTagConfig` | interface | `integration-libs/cds/src/config/profile-tag.config.ts:L7-L14` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `ProfileTagModule` | class | `integration-libs/cds/src/profiletag/profile-tag.module.ts:L32-L32` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `ProfileTagPushEventsService` | class | `integration-libs/cds/src/profiletag/services/profile-tag-push-events.service.ts:L71-L409` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `PromotionLocation` | enum | `feature-libs/cart/base/root/models/cart.model.ts:L25-L31` | [25](../parte-2/25-cart.md) (2) |
| `PromotionsComponent` | class | `core-libs/storefront/cms-components/misc/promotions/promotions.component.ts:L17-L24` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `PromotionsModule` | class | `core-libs/storefront/cms-components/misc/promotions/promotions.module.ts:L15-L15` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `PROPAGATE_ERROR_TO_SERVER` | const | `core-libs/setup/ssr/error-handling/error-response/propagate-error-to-server.ts:L20-L22` | [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [39](../parte-2/39-ssr-ottimizzato.md) (6), [41](../parte-2/41-errori-global-message.md) (1) |
| `PropagatingToServerErrorHandler` | class | `core-libs/setup/ssr/error-handling/multi-error-handlers/propagating-to-server-error-handler.ts:L29-L38` | [07](../parte-1/07-ssr-hydration-transferstate.md) (2), [39](../parte-2/39-ssr-ottimizzato.md) (4), [41](../parte-2/41-errori-global-message.md) (5) |
| `ProtectedRoutesGuard` | class | `core-libs/core/src/routing/protected-routes/protected-routes.guard.ts:L14-L34` | [05](../parte-1/05-router.md) (3), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [14](../parte-2/14-routing.md) (5) |
| `ProtectedRoutesService` | class | `core-libs/core/src/routing/protected-routes/protected-routes.service.ts:L12-L90` | [05](../parte-1/05-router.md) (1), [14](../parte-2/14-routing.md) (2), [29](../parte-2/29-asm.md) (2) |
| `PROVIDE_OUTLET_OPTIONS` | const | `core-libs/storefront/cms-structure/outlet/outlet.providers.ts:L13-L15` | [17](../parte-2/17-outlet.md) (5), [51](../parte-3/51-ricette-cms-outlet-layout.md) (5), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (3) |
| `provideCmsStructure()` | function | `core-libs/storefront/cms-structure/utils/cms-structure.util.ts:L31-L38` | [15](../parte-2/15-cms-core.md) (2) |
| `provideConfig()` | function | `core-libs/core/src/config/config-providers.ts:L18-L27` | [11](../parte-2/11-configurazione.md) (2) |
| `provideConfigFactory()` | function | `core-libs/core/src/config/config-providers.ts:L37-L48` | [11](../parte-2/11-configurazione.md) (1) |
| `provideConfigFromMetaTags()` | function | `core-libs/core/src/occ/config/config-from-meta-tag-factory.ts:L37-L42` | [21](../parte-2/21-occ.md) (1) |
| `provideDefaultConfig()` | function | `core-libs/core/src/config/config-providers.ts:L55-L61` | [01](../parte-1/01-dependency-injection.md) (1) |
| `provideDefaultConfigFactory()` | function | `core-libs/core/src/config/config-providers.ts:L69-L79` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `provideDefaultFeatureToggles()` | function | `core-libs/core/src/features-config/feature-toggles/feature-toggles-providers.ts:L61-L69` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `ProvideLcpPresenceDirective` | class | `core-libs/storefront/shared/lcp-context/provide-lcp-presence.directive.ts:L34-L47` | [16](../parte-2/16-cms-rendering.md) (2) |
| `provideLcpPresenceForCmsComponent()` | const | `core-libs/storefront/cms-structure/cms-lcp-context/provide-lcp-presence-for-cms-component.ts:L20-L36` | [16](../parte-2/16-cms-rendering.md) (2), [45](../parte-2/45-componenti-storefront.md) (1) |
| `provideLoginEventsTracking()` | function | `integration-libs/cds/src/profiletag/providers/login-events.provider.ts:L20-L48` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `provideMultiErrorHandler()` | function | `core-libs/core/src/error-handling/multi-error-handler/provide-multi-error-handler.ts:L11-L19` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [41](../parte-2/41-errori-global-message.md) (2), [54](../parte-3/54-upgrade-safe.md) (2) |
| `provideOutlet()` | function | `core-libs/storefront/cms-structure/outlet/outlet.providers.ts:L41-L47` | [17](../parte-2/17-outlet.md) (3) |
| `ProvideOutletOptions` | interface | `core-libs/storefront/cms-structure/outlet/outlet.providers.ts:L17-L32` | [17](../parte-2/17-outlet.md) (4), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `provideServer()` | function | `core-libs/setup/ssr/providers/ssr-providers.ts:L27-L47` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [41](../parte-2/41-errori-global-message.md) (3), [46](../parte-2/46-util-modelli.md) (3) |
| `PUNCHOUT_REQUISITION_NORMALIZER` | const | `integration-libs/punchout/core/connectors/converters.ts:L15-L17` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PUNCHOUT_SESSION_NORMALIZER` | const | `integration-libs/punchout/core/connectors/converters.ts:L11-L13` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutAdapter` | class | `integration-libs/punchout/core/connectors/punchout.adapter.ts:L10-L25` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutAuthHttpHeaderService` | class | `integration-libs/punchout/root/services/punchout-auth-http-header.service.ts:L24-L67` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `PunchoutAuthService` | class | `integration-libs/punchout/core/services/punchout-auth.service.ts:L31-L98` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutCartInterceptor` | class | `integration-libs/punchout/root/interceptors/punchout-cart.interceptor.ts:L23-L50` | [06](../parte-1/06-httpclient-interceptor.md) (3), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (4) |
| `PunchoutConnector` | class | `integration-libs/punchout/core/connectors/punchout.connector.ts:L13-L29` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutDetectionService` | class | `integration-libs/punchout/root/services/punchout-detection.service.ts:L13-L35` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutExpiredRefreshTokenHandler` | class | `integration-libs/punchout/root/services/punchout-expired-refresh-token-handler.service.ts:L17-L46` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (4) |
| `PunchoutFacade` | class | `integration-libs/punchout/root/facade/punchout.facade.ts:L37-L79` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `PunchoutModule` | class | `integration-libs/punchout/punchout.module.ts:L15-L15` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutNavigationGuard` | class | `integration-libs/punchout/root/guards/punchout-navigation.guard.ts:L26-L141` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `PunchoutNavigationGuardConfig` | class | `integration-libs/punchout/root/config/punchout-guard-config.ts:L16-L34` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `PunchoutNavigationModule` | class | `integration-libs/punchout/root/guards/punchout-navigation.module.ts:L21-L21` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutRequisitionComponent` | class | `integration-libs/punchout/components/punchout-requisition/punchout-requisition.component.ts:L31-L96` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutRootModule` | class | `integration-libs/punchout/root/punchout.root.module.ts:L84-L84` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutService` | class | `integration-libs/punchout/core/facade/punchout.service.ts:L43-L369` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `PunchoutSessionComponent` | class | `integration-libs/punchout/components/punchout-session/punchout-session.component.ts:L22-L52` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutStatePersistenceService` | class | `integration-libs/punchout/root/services/punchout-state-persistence.service.ts:L15-L82` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `PunchoutStoreService` | class | `integration-libs/punchout/root/services/punchout-store.service.ts:L12-L49` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `PunchoutUiRestrictionService` | class | `integration-libs/punchout/root/services/punchout-ui-restriction.service.ts:L19-L59` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `PwaModule` | class | `core-libs/storefront/cms-structure/pwa/pwa.module.ts:L56-L56` | [40](../parte-2/40-seo-pwa.md) (10) |
| `PWAModuleConfig` | class | `core-libs/storefront/cms-structure/pwa/pwa.module-config.ts:L14-L19` | [40](../parte-2/40-seo-pwa.md) (3) |

## Q

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `QUALTRICS_FEATURE` | const | `feature-libs/qualtrics/root/feature-name.ts:L7-L7` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `QualtricsComponent` | class | `feature-libs/qualtrics/components/qualtrics-loader/qualtrics.component.ts:L19-L34` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (8) |
| `QualtricsComponentsModule` | class | `feature-libs/qualtrics/components/qualtrics-components.module.ts:L35-L35` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `QualtricsConfig` | class | `feature-libs/qualtrics/components/qualtrics-loader/config/qualtrics-config.ts:L18-L30` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (3) |
| `QualtricsEmbeddedFeedbackComponent` | class | `feature-libs/qualtrics/components/qualtrics-embedded-feedback/qualtrics-embedded-feedback.component.ts:L13-L13` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4) |
| `QualtricsLoaderService` | class | `feature-libs/qualtrics/components/qualtrics-loader/qualtrics-loader.service.ts:L42-L154` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (6) |
| `QualtricsModule` | class | `feature-libs/qualtrics/qualtrics.module.ts:L13-L13` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (3) |
| `QualtricsRootModule` | class | `feature-libs/qualtrics/root/qualtrics-root.module.ts:L27-L27` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1) |
| `Query` | interface | `core-libs/core/src/util/command-query/query.service.ts:L39-L42` | [20](../parte-2/20-facade-command-query-eventi.md) (2), [23](../parte-2/23-user.md) (10), [35](../parte-2/35-integration-opf-payments.md) (2) |
| `QueryNotifier` | type | `core-libs/core/src/util/command-query/query.service.ts:L31-L31` | [20](../parte-2/20-facade-command-query-eventi.md) (1) |
| `QueryService` | class | `core-libs/core/src/util/command-query/query.service.ts:L47-L160` | [20](../parte-2/20-facade-command-query-eventi.md) (3), [29](../parte-2/29-asm.md) (1) |
| `QueryState` | interface | `core-libs/core/src/util/command-query/query.service.ts:L33-L37` | [20](../parte-2/20-facade-command-query-eventi.md) (1) |
| `QuickOrderComponent` | class | `feature-libs/cart/quick-order/components/quick-order/quick-order.component.ts:L57-L264` | [25](../parte-2/25-cart.md) (2) |
| `QuickOrderConfig` | class | `feature-libs/cart/quick-order/root/config/quick-order-config.ts:L14-L25` | [25](../parte-2/25-cart.md) (1) |
| `QuickOrderOrderEntriesContextToken` | const | `feature-libs/cart/quick-order/root/tokens/context.ts:L9-L11` | [25](../parte-2/25-cart.md) (1) |
| `QuickOrderRootModule` | class | `feature-libs/cart/quick-order/root/quick-order-root.module.ts:L69-L69` | [25](../parte-2/25-cart.md) (1) |
| `QuickOrderService` | class | `feature-libs/cart/quick-order/core/services/quick-order.service.ts:L40-L460` | [25](../parte-2/25-cart.md) (2) |
| `Quote` | type | `feature-libs/quote/root/model/quote.model.ts:L41-L44` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QUOTE_NORMALIZER` | const | `feature-libs/quote/core/connectors/converters.ts:L20-L22` | [31](../parte-2/31-quote-ticketing-subscription.md) (3) |
| `QuoteAction` | interface | `feature-libs/quote/root/model/quote.model.ts:L46-L49` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `QuoteActionType` | enum | `feature-libs/quote/root/model/quote.model.ts:L58-L73` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteAdapter` | class | `feature-libs/quote/core/connectors/quote.adapter.ts:L19-L138` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `QuoteBadRequestHandler` | class | `feature-libs/quote/root/http-interceptors/quote-bad-request.handler.ts:L21-L181` | [31](../parte-2/31-quote-ticketing-subscription.md) (4) |
| `QuoteCartEventListener` | class | `feature-libs/quote/core/event/quote-cart-event.listener.ts:L21-L54` | [31](../parte-2/31-quote-ticketing-subscription.md) (4), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `QuoteCartGuard` | class | `feature-libs/quote/components/cart-guard/quote-cart.guard.ts:L28-L81` | [31](../parte-2/31-quote-ticketing-subscription.md) (4) |
| `QuoteCartGuardComponent` | class | `feature-libs/quote/components/cart-guard/quote-cart-guard.component.ts:L17-L17` | [31](../parte-2/31-quote-ticketing-subscription.md) (3) |
| `QuoteCartService` | class | `feature-libs/quote/core/services/quote-cart.service.ts:L15-L64` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteComponentsModule` | class | `feature-libs/quote/components/quote-components.module.ts:L42-L42` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `QuoteConfig` | interface | `feature-libs/quote/root/config/quote.config.ts:L9-L9` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteConfirmDialogComponent` | class | `feature-libs/quote/components/confirm-dialog/quote-confirm-dialog.component.ts:L41-L115` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteConnector` | class | `feature-libs/quote/core/connectors/quote.connector.ts:L22-L167` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteCoreConfig` | class | `feature-libs/quote/core/config/quote-core.config.ts:L22-L29` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `QuoteCoreModule` | class | `feature-libs/quote/core/quote-core.module.ts:L21-L25` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteDetailsReloadQueryEvent` | class | `feature-libs/quote/core/event/quote.events.ts:L9-L14` | [31](../parte-2/31-quote-ticketing-subscription.md) (7) |
| `QuoteDiscountType` | enum | `feature-libs/quote/root/model/quote.model.ts:L95-L98` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteFacade` | class | `feature-libs/quote/root/facade/quote.facade.ts:L39-L135` | [31](../parte-2/31-quote-ticketing-subscription.md) (5) |
| `QuoteLinksComponent` | class | `feature-libs/quote/components/links/quote-links.component.ts:L37-L104` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `QuoteListModule` | class | `feature-libs/quote/components/list/quote-list.module.ts:L53-L53` | [31](../parte-2/31-quote-ticketing-subscription.md) (3) |
| `QuoteMetadata` | interface | `feature-libs/quote/root/model/quote.model.ts:L120-L128` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteModule` | class | `feature-libs/quote/quote.module.ts:L15-L15` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteNotFoundHandler` | class | `feature-libs/quote/root/http-interceptors/quote-not-found.handler.ts:L21-L61` | [31](../parte-2/31-quote-ticketing-subscription.md) (4) |
| `QuoteOccModule` | class | `feature-libs/quote/occ/quote-occ.module.ts:L37-L37` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteRequestButtonComponent` | class | `feature-libs/quote/components/request-button/quote-request-button.component.ts:L25-L62` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteRoleType` | enum | `feature-libs/quote/root/model/quote.model.ts:L100-L105` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteService` | class | `feature-libs/quote/core/facade/quote.service.ts:L65-L570` | [31](../parte-2/31-quote-ticketing-subscription.md) (6) |
| `QuotesStateParams` | interface | `feature-libs/quote/root/model/quote.model.ts:L137-L140` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `QuoteStarter` | interface | `feature-libs/quote/root/model/quote.model.ts:L130-L133` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteState` | enum | `feature-libs/quote/root/model/quote.model.ts:L75-L93` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `QuoteSummaryActionsComponent` | class | `feature-libs/quote/components/summary/actions/quote-summary-actions.component.ts:L54-L426` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `QuoteSummaryComponent` | class | `feature-libs/quote/components/summary/quote-summary.component.ts:L28-L32` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `QuoteUIConfig` | class | `feature-libs/quote/components/config/quote-ui.config.ts:L51-L53` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |

## R

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `ReadConfiguration` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L129-L140` | [30](../parte-2/30-product-configurator.md) (2) |
| `ReadConfigurationSuccess` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L153-L159` | [30](../parte-2/30-product-configurator.md) (1) |
| `ReadOnlyPostfix` | const | `feature-libs/product-configurator/common/core/model/common-configurator.model.ts:L70-L70` | [30](../parte-2/30-product-configurator.md) (1) |
| `ReadOrderEntryConfiguration` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-cart.action.ts:L65-L72` (+1) | [30](../parte-2/30-product-configurator.md) (1) |
| `RecentSearchesComponent` | class | `integration-libs/cds/src/recent-searches/recent-searches.component.ts:L60-L140` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `RecentSearchesHeaderComponent` | class | `integration-libs/cds/src/recent-searches/recent-searches-header.component.ts:L18-L34` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `RecentSearchesModule` | class | `integration-libs/cds/src/recent-searches/recent-searches.module.ts:L47-L47` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `RecentSearchesService` | class | `integration-libs/cds/src/recent-searches/recent-searches.service.ts:L14-L80` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `Region` | interface | `core-libs/core/src/model/address.model.ts:L19-L24` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `REGISTER_USER_SUCCESS` | const | `core-libs/core/src/user/store/actions/user-register.action.ts:L11-L11` | [23](../parte-2/23-user.md) (3) |
| `RegisterComponentService` | class | `feature-libs/user/profile/components/register/register-component.service.ts:L20-L86` | [23](../parte-2/23-user.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `RegisterUserSuccess` | class | `core-libs/core/src/user/store/actions/user-register.action.ts:L13-L18` | [23](../parte-2/23-user.md) (1) |
| `REMOVE_CART` | const | `feature-libs/cart/base/core/store/actions/cart.action.ts:L33-L33` | [25](../parte-2/25-cart.md) (1) |
| `RemoveCart` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L263-L268` | [25](../parte-2/25-cart.md) (3) |
| `RemoveCartEvent` | class | `feature-libs/cart/base/root/events/cart.events.ts:L170-L175` | [25](../parte-2/25-cart.md) (3), [26](../parte-2/26-checkout.md) (3), [27](../parte-2/27-order.md) (1) |
| `RemoveConfiguration` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L375-L381` (+1) | [30](../parte-2/30-product-configurator.md) (5) |
| `RemoveLocation` | const | `feature-libs/pickup-in-store/core/store/actions/pickup-location.action.ts:L57-L60` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `RemoveMessage` | class | `core-libs/core/src/global-message/store/actions/global-message.actions.ts:L23-L26` | [41](../parte-2/41-errori-global-message.md) (3) |
| `RemoveMessagesByType` | class | `core-libs/core/src/global-message/store/actions/global-message.actions.ts:L28-L31` | [41](../parte-2/41-errori-global-message.md) (2) |
| `RemovePickupOption` | const | `feature-libs/pickup-in-store/core/store/actions/pickup-option.action.ts:L21-L24` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `RenamedSymbol` | interface | `core-libs/schematics/src/shared/utils/file-utils.ts:L112-L117` | [43](../parte-2/43-schematics-migrazioni.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `RenderingCache` | class | `core-libs/setup/ssr/optimized-engine/rendering-cache/rendering-cache.ts:L11-L128` | [39](../parte-2/39-ssr-ottimizzato.md) (5) |
| `RenderingCacheSizeManager` | class | `core-libs/setup/ssr/optimized-engine/rendering-cache/rendering-cache-size-manager.ts:L14-L110` | [39](../parte-2/39-ssr-ottimizzato.md) (4) |
| `RenderingEntry` | interface | `core-libs/setup/ssr/optimized-engine/rendering-cache/rendering-cache.model.ts:L10-L20` | [39](../parte-2/39-ssr-ottimizzato.md) (2) |
| `RenderingStrategy` | enum | `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts:L183-L187` | [39](../parte-2/39-ssr-ottimizzato.md) (1) |
| `RenderingStrategyResolverOptions` | interface | `core-libs/setup/ssr/optimized-engine/rendering-strategy-resolver-options.ts:L7-L10` | [39](../parte-2/39-ssr-ottimizzato.md) (1) |
| `ReorderOrderFacade` | class | `feature-libs/order/root/facade/reorder-order.facade.ts:L22-L27` | [27](../parte-2/27-order.md) (1) |
| `ReorderOrderService` | class | `feature-libs/order/core/facade/reorder-order.service.ts:L25-L93` | [27](../parte-2/27-order.md) (1) |
| `REPLENISHMENT_ORDER_FORM_SERIALIZER` | const | `feature-libs/order/root/tokens/converters.ts:L60-L62` | [27](../parte-2/27-order.md) (1) |
| `REPLENISHMENT_ORDER_HISTORY_NORMALIZER` | const | `feature-libs/order/root/tokens/converters.ts:L56-L58` | [27](../parte-2/27-order.md) (1) |
| `ReplenishmentOrder` | interface | `feature-libs/order/root/model/replenishment-order.model.ts:L26-L70` (+1) | [27](../parte-2/27-order.md) (1) |
| `ReplenishmentOrderDetailsService` | class | `feature-libs/order/components/replenishment-order-details/replenishment-order-details.service.ts:L25-L56` | [27](../parte-2/27-order.md) (2) |
| `ReplenishmentOrderHistoryFacade` | class | `feature-libs/order/root/facade/replenishment-order-history.facade.ts:L47-L145` | [27](../parte-2/27-order.md) (2) |
| `ReplenishmentOrderHistoryService` | class | `feature-libs/order/core/facade/replenishment-order-history.service.ts:L29-L249` | [27](../parte-2/27-order.md) (1) |
| `ReplenishmentOrderScheduledEvent` | class | `feature-libs/order/root/events/order.events.ts:L49-L58` | [26](../parte-2/26-checkout.md) (1), [27](../parte-2/27-order.md) (3) |
| `REQUEST` | const | `core-libs/setup/ssr/tokens/express.tokens.ts:L15-L17` | [07](../parte-1/07-ssr-hydration-transferstate.md) (6), [39](../parte-2/39-ssr-ottimizzato.md) (6), [41](../parte-2/41-errori-global-message.md) (1), [46](../parte-2/46-util-modelli.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `RequestContext` | interface | `core-libs/setup/ssr/optimized-engine/request-context.ts:L17-L21` | [39](../parte-2/39-ssr-ottimizzato.md) (2) |
| `RequestedDeliveryDateAdapter` | class | `feature-libs/requested-delivery-date/core/connectors/requested-delivery-date.adapter.ts:L9-L18` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `RequestedDeliveryDateBadRequestHandler` | class | `feature-libs/requested-delivery-date/core/http-interceptors/bad-request/requested-delivery-date-badrequest.handler.ts:L20-L49` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `RequestedDeliveryDateComponentsModule` | class | `feature-libs/requested-delivery-date/root/components/requested-delivery-date-components.module.ts:L30-L30` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `RequestedDeliveryDateFacade` | class | `feature-libs/requested-delivery-date/root/facade/requested-delivery-date.facade.ts:L24-L33` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `RequestedDeliveryDateModule` | class | `feature-libs/requested-delivery-date/requested-delivery-date.module.ts:L14-L14` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `RequiredPick` | type | `core-libs/core/src/util/type-utils.ts:L7-L11` | [46](../parte-2/46-util-modelli.md) (1) |
| `RescheduleServiceOrderComponent` | class | `integration-libs/s4-service/order/components/reschedule-service-order/reschedule-service-order.component.ts:L66-L169` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `RescheduleServiceOrderFacade` | class | `integration-libs/s4-service/root/facade/reschedule-service-order.facade.ts:L14-L24` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `ResetCartDetails` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L242-L247` | [19](../parte-2/19-state-management.md) (1), [25](../parte-2/25-cart.md) (2) |
| `ResetCartDetailsByIds` | class | `feature-libs/cart/base/core/store/actions/cart.action.ts:L252-L257` | [25](../parte-2/25-cart.md) (2) |
| `ResetGiveUserConsentProcess` | class | `core-libs/core/src/user/store/actions/user-consents.action.ts:L104-L110` | [19](../parte-2/19-state-management.md) (1) |
| `ResetSubscribeCustomerCouponProcess` | class | `core-libs/core/src/user/store/actions/customer-coupon.action.ts:L136-L141` | [19](../parte-2/19-state-management.md) (1) |
| `RESPONSE` | const | `core-libs/setup/ssr/tokens/express.tokens.ts:L24-L26` | [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [39](../parte-2/39-ssr-ottimizzato.md) (2) |
| `RestoreSavedCart` | class | `feature-libs/cart/saved-cart/core/store/actions/saved-cart.action.ts:L130-L141` | [25](../parte-2/25-cart.md) (1) |
| `RestoreSavedCartSuccess` | class | `feature-libs/cart/saved-cart/core/store/actions/saved-cart.action.ts:L143-L154` | [25](../parte-2/25-cart.md) (1) |
| `RestoreSavedCartSuccessEvent` | class | `feature-libs/cart/saved-cart/root/events/saved-cart.events.ts:L54-L61` | [26](../parte-2/26-checkout.md) (1) |
| `RetractValueCode` | const | `feature-libs/product-configurator/rulebased/core/model/configurator.model.ts:L390-L390` | [30](../parte-2/30-product-configurator.md) (1) |
| `RETURN_REQUEST_DETAILS` | const | `feature-libs/order/core/store/order-state.ts:L24-L24` | [27](../parte-2/27-order.md) (1) |
| `ReturnOrderComponent` | class | `feature-libs/order/components/amend-order/returns/return-order/return-order.component.ts:L31-L76` | [27](../parte-2/27-order.md) (2) |
| `ReturnRequest` | interface | `feature-libs/order/root/model/order.model.ts:L49-L62` (+1) | [27](../parte-2/27-order.md) (2) |
| `ReturnRequestService` | class | `feature-libs/order/components/return-request-detail/return-request.service.ts:L20-L95` | [27](../parte-2/27-order.md) (2) |
| `RootConfig` | const | `core-libs/core/src/config/config-tokens.ts:L44-L47` | [01](../parte-1/01-dependency-injection.md) (6), [10](../parte-2/10-bootstrap-inizializzazione.md) (2), [11](../parte-2/11-configurazione.md) (10), [12](../parte-2/12-feature-module-lazy.md) (1), [42](../parte-2/42-feature-toggle-deprecazioni.md) (2), [50](../parte-3/50-ricette-config-di.md) (3), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (3) |
| `RootFeatureToggles` | const | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L48-L58` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (4), [44](../parte-2/44-test-tooling.md) (1) |
| `ROUTE_PARAMS` | const | `feature-libs/organization/administration/root/route-params.ts:L10-L18` | [28](../parte-2/28-organization-b2b.md) (3) |
| `RouteBreadcrumbConfig` | interface | `core-libs/core/src/cms/page/routing/route-page-meta.model.ts:L45-L55` | [40](../parte-2/40-seo-pwa.md) (1) |
| `RouteConfig` | interface | `core-libs/core/src/routing/configurable-routes/routes-config.ts:L15-L57` | [05](../parte-1/05-router.md) (2), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [14](../parte-2/14-routing.md) (3), [51](../parte-3/51-ricette-cms-outlet-layout.md) (3) |
| `RouteLoadStrategy` | enum | `core-libs/core/src/routing/configurable-routes/config/routing-config.ts:L11-L20` | [05](../parte-1/05-router.md) (2), [14](../parte-2/14-routing.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `RoutePageMetaConfig` | interface | `core-libs/core/src/cms/page/routing/route-page-meta.model.ts:L30-L40` | [40](../parte-2/40-seo-pwa.md) (3) |
| `RouterEffects` | class | `core-libs/core/src/routing/store/effects/router.effect.ts:L18-L43` | [05](../parte-1/05-router.md) (1) |
| `RouterState` | interface | `core-libs/core/src/routing/store/routing-state.ts:L13-L16` | [14](../parte-2/14-routing.md) (1), [20](../parte-2/20-facade-command-query-eventi.md) (1) |
| `RoutesConfig` | interface | `core-libs/core/src/routing/configurable-routes/routes-config.ts:L11-L13` | [14](../parte-2/14-routing.md) (3), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `ROUTING_FEATURE` | const | `core-libs/core/src/routing/store/routing-state.ts:L11-L11` | [14](../parte-2/14-routing.md) (1) |
| `RoutingConfig` | class | `core-libs/core/src/routing/configurable-routes/config/routing-config.ts:L26-L28` | [01](../parte-1/01-dependency-injection.md) (1), [05](../parte-1/05-router.md) (1), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [14](../parte-2/14-routing.md) (2), [22](../parte-2/22-auth.md) (1), [26](../parte-2/26-checkout.md) (1), [27](../parte-2/27-order.md) (1), [29](../parte-2/29-asm.md) (2), [30](../parte-2/30-product-configurator.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (3), [35](../parte-2/35-integration-opf-payments.md) (2), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2), [51](../parte-3/51-ricette-cms-outlet-layout.md) (4), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `RoutingConfigDefinition` | interface | `core-libs/core/src/routing/configurable-routes/config/routing-config.ts:L30-L45` | [14](../parte-2/14-routing.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `RoutingConfigService` | class | `core-libs/core/src/routing/configurable-routes/routing-config.service.ts:L13-L93` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [14](../parte-2/14-routing.md) (2) |
| `RoutingContextService` | class | `core-libs/storefront/context/routing-context.service.ts:L19-L64` | [14](../parte-2/14-routing.md) (2) |
| `RoutingModule` | class | `core-libs/core/src/routing/routing.module.ts:L83-L109` (+1) | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (2), [05](../parte-1/05-router.md) (5), [10](../parte-2/10-bootstrap-inizializzazione.md) (4), [11](../parte-2/11-configurazione.md) (1), [14](../parte-2/14-routing.md) (4) |
| `RoutingPageMetaResolver` | class | `core-libs/core/src/cms/page/routing/routing-page-meta.resolver.ts:L38-L199` | [40](../parte-2/40-seo-pwa.md) (1) |
| `RoutingParamsService` | class | `core-libs/core/src/routing/facade/routing-params.service.ts:L19-L45` | [14](../parte-2/14-routing.md) (3) |
| `RoutingService` | class | `core-libs/core/src/routing/facade/routing.service.ts:L28-L170` | [14](../parte-2/14-routing.md) (4) |
| `RulebasedConfiguratorAdapter` | class | `feature-libs/product-configurator/rulebased/core/connectors/rulebased-configurator.adapter.ts:L12-L161` | [30](../parte-2/30-product-configurator.md) (3) |
| `RulebasedConfiguratorComponentsModule` | class | `feature-libs/product-configurator/rulebased/components/rulebased-configurator-components.module.ts:L60-L60` | [30](../parte-2/30-product-configurator.md) (2) |
| `RulebasedConfiguratorConnector` | class | `feature-libs/product-configurator/rulebased/core/connectors/rulebased-configurator.connector.ts:L20-L191` | [30](../parte-2/30-product-configurator.md) (5) |
| `RulebasedConfiguratorCoreModule` | class | `feature-libs/product-configurator/rulebased/core/rulebased-configurator-core.module.ts:L27-L34` | [30](../parte-2/30-product-configurator.md) (1) |
| `RulebasedConfiguratorModule` | class | `feature-libs/product-configurator/rulebased/rulebased-configurator.module.ts:L19-L19` | [30](../parte-2/30-product-configurator.md) (3) |
| `RulebasedConfiguratorRootModule` | class | `feature-libs/product-configurator/rulebased/root/rulebased-configurator-root.module.ts:L38-L44` | [30](../parte-2/30-product-configurator.md) (3) |
| `RulebasedCpqConfiguratorModule` | class | `feature-libs/product-configurator/rulebased/cpq/rulebased-cpq-configurator.module.ts:L17-L17` | [30](../parte-2/30-product-configurator.md) (4), [47](../parte-2/47-app-demo.md) (1) |

## S

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `S4_SERVICE_CMS_COMPONENTS` | const | `integration-libs/s4-service/root/s4-service-root.module.ts:L31-L34` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `S4_SERVICE_FEATURE` | const | `integration-libs/s4-service/root/feature-name.ts:L7-L7` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `S4_SERVICE_ORDER_CMS_COMPONENTS` | const | `integration-libs/s4-service/root/s4-service-root.module.ts:L35-L39` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `S4omModule` | class | `integration-libs/s4om/s4om.module.ts:L12-L12` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `S4omProductCatalogService` | class | `integration-libs/s4om/root/services/s4om-product-catalog.service.ts:L13-L38` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `S4omRootModule` | class | `integration-libs/s4om/root/s4om-root.module.ts:L35-L35` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `S4ServiceCheckoutModule` | class | `integration-libs/s4-service/checkout/s4-service-checkout.module.ts:L19-L19` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (5), [47](../parte-2/47-app-demo.md) (1) |
| `S4ServiceDeliveryModeConfig` | class | `integration-libs/s4-service/root/model/augmented-types.model.ts:L58-L60` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `S4ServiceModule` | class | `integration-libs/s4-service/s4-service.module.ts:L12-L12` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `S4ServiceOrderCoreModule` | class | `integration-libs/s4-service/order/core/s4-service-order-core.module.ts:L39-L39` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `S4ServiceOrderModule` | class | `integration-libs/s4-service/order/s4-service-order.module.ts:L19-L19` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3), [47](../parte-2/47-app-demo.md) (1) |
| `S4ServiceRootModule` | class | `integration-libs/s4-service/root/s4-service-root.module.ts:L83-L83` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `SAVE_CART_NORMALIZER` | const | `feature-libs/cart/base/root/tokens/converters.ts:L29-L31` | [25](../parte-2/25-cart.md) (2) |
| `SaveCartEvent` | class | `feature-libs/cart/saved-cart/root/events/saved-cart.events.ts:L16-L23` | [25](../parte-2/25-cart.md) (1) |
| `SaveCartSuccessEvent` | class | `feature-libs/cart/saved-cart/root/events/saved-cart.events.ts:L25-L33` | [26](../parte-2/26-checkout.md) (1) |
| `SavedCartAdapter` | class | `feature-libs/cart/saved-cart/core/connectors/saved-cart.adapter.ts:L10-L35` | [25](../parte-2/25-cart.md) (1) |
| `SavedCartOrderEntriesContextToken` | const | `feature-libs/cart/saved-cart/root/tokens/context.ts:L9-L11` | [25](../parte-2/25-cart.md) (1) |
| `SavedCartService` | class | `feature-libs/cart/saved-cart/core/facade/saved-cart.service.ts:L44-L477` | [25](../parte-2/25-cart.md) (2) |
| `SavedCartStoreModule` | class | `feature-libs/cart/saved-cart/core/store/saved-cart-store.module.ts:L14-L14` | [25](../parte-2/25-cart.md) (1) |
| `SceneAdapter` | class | `integration-libs/epd-visualization/core/connectors/scene/scene.adapter.ts:L13-L30` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `SceneNodeToProductLookupService` | class | `integration-libs/epd-visualization/core/services/scene-node-to-product-lookup/scene-node-to-product-lookup.service.ts:L34-L235` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `ScheduledReplenishmentOrderFacade` | class | `feature-libs/order/root/facade/scheduled-replenishment-order.facade.ts:L23-L31` | [27](../parte-2/27-order.md) (1) |
| `ScheduledReplenishmentOrderService` | class | `feature-libs/order/core/facade/scheduled-replenishment-order.service.ts:L29-L111` | [27](../parte-2/27-order.md) (1) |
| `ScheduleLinesComponent` | class | `integration-libs/s4om/root/components/schedule-lines/schedule-lines.component.ts:L19-L52` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `ScheduleReplenishmentForm` | interface | `feature-libs/order/root/model/scheduled-replenishment.model.ts:L23-L30` (+1) | [27](../parte-2/27-order.md) (1) |
| `Schema` | interface | `core-libs/schematics/src/add-spartacus/schema.ts:L11-L27` (+2) | [43](../parte-2/43-schematics-migrazioni.md) (2) |
| `SCHEMA_BUILDER` | const | `core-libs/storefront/cms-structure/seo/structured-data/builders/tokens.ts:L15-L15` | [40](../parte-2/40-seo-pwa.md) (8) |
| `SchemaBuilder` | interface | `core-libs/storefront/cms-structure/seo/structured-data/builders/schema.interface.ts:L9-L11` | [40](../parte-2/40-seo-pwa.md) (2) |
| `SchematicConfig` | interface | `core-libs/schematics/src/shared/utils/lib-utils.ts:L115-L199` | [08](../parte-1/08-schematics-builder.md) (4), [43](../parte-2/43-schematics-migrazioni.md) (7) |
| `SCHEMATICS_CONFIGS` | const | `core-libs/schematics/src/shared/schematics-config-mappings.ts:L104-L198` | [43](../parte-2/43-schematics-migrazioni.md) (3) |
| `ScopedProductData` | interface | `core-libs/core/src/product/connectors/product/scoped-product-data.ts:L13-L15` | [21](../parte-2/21-occ.md) (2), [46](../parte-2/46-util-modelli.md) (1), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `ScriptLoader` | class | `core-libs/core/src/util/script-loader.service.ts:L18-L122` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4), [46](../parte-2/46-util-modelli.md) (6) |
| `ScriptPlacement` | enum | `core-libs/core/src/util/script-loader.service.ts:L10-L13` | [46](../parte-2/46-util-modelli.md) (3) |
| `ScrollToTopComponent` | class | `core-libs/storefront/cms-components/navigation/scroll-to-top/scroll-to-top.component.ts:L34-L124` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `SEARCH_VARIANTS_FAIL` | const | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-variant.action.ts:L12-L12` | [30](../parte-2/30-product-configurator.md) (1) |
| `SearchBoxComponent` | class | `core-libs/storefront/cms-components/navigation/search-box/search-box.component.ts:L94-L951` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [45](../parte-2/45-componenti-storefront.md) (2) |
| `SearchBoxComponentService` | class | `core-libs/storefront/cms-components/navigation/search-box/search-box-component.service.ts:L39-L429` | [24](../parte-2/24-product-search.md) (1), [45](../parte-2/45-componenti-storefront.md) (2) |
| `SearchBoxConfig` | interface | `core-libs/storefront/cms-components/navigation/search-box/search-box.model.ts:L7-L18` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `SearchBoxOutlets` | enum | `core-libs/storefront/cms-components/navigation/search-box/search-box-outlets.model.ts:L7-L11` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `SearchBoxProductSelectedEvent` | class | `core-libs/storefront/cms-components/navigation/search-box/search-box.events.ts:L25-L32` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `SearchboxService` | class | `core-libs/core/src/product/facade/searchbox.service.ts:L19-L100` | [24](../parte-2/24-product-search.md) (2) |
| `SearchBoxSuggestionSelectedEvent` | class | `core-libs/storefront/cms-components/navigation/search-box/search-box.events.ts:L12-L20` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `SearchConfig` | interface | `core-libs/core/src/product/model/search-config.ts:L8-L24` | [24](../parte-2/24-product-search.md) (2), [28](../parte-2/28-organization-b2b.md) (1) |
| `SearchPageMetaResolver` | class | `core-libs/core/src/product/services/search-page-meta.resolver.ts:L31-L88` | [24](../parte-2/24-product-search.md) (2), [40](../parte-2/40-seo-pwa.md) (4) |
| `SearchPageResultsEvent` | class | `core-libs/storefront/events/product/product-page.events.ts:L37-L42` | [20](../parte-2/20-facade-command-query-eventi.md) (2) |
| `SearchProducts` | class | `core-libs/core/src/product/store/actions/product-search.action.ts:L27-L33` | [24](../parte-2/24-product-search.md) (2) |
| `SearchVariants` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-variant.action.ts:L15-L20` | [30](../parte-2/30-product-configurator.md) (4) |
| `SearchVariantsSuccess` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-variant.action.ts:L32-L39` | [30](../parte-2/30-product-configurator.md) (1) |
| `SECURE_PASSWORD_PATTERN` | const | `core-libs/core/src/util/regex-pattern.ts:L32-L33` | [46](../parte-2/46-util-modelli.md) (1) |
| `SecurePortalConfigInitializer` | class | `core-libs/core/src/routing/configurable-routes/secure-portal-config/secure-portal-config-initializer.ts:L17-L51` | [05](../parte-1/05-router.md) (2), [10](../parte-2/10-bootstrap-inizializzazione.md) (6), [11](../parte-2/11-configurazione.md) (3), [14](../parte-2/14-routing.md) (2) |
| `SEGMENT_REFS_FEATURE` | const | `integration-libs/segment-refs/root/feature-name.ts:L7-L7` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `SegmentRefsConfig` | class | `integration-libs/segment-refs/root/config/segment-refs-config.ts:L14-L18` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3), [50](../parte-3/50-ricette-config-di.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `SegmentRefsRootModule` | class | `integration-libs/segment-refs/root/segment-refs-root.module.ts:L20-L20` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `SelectFocusUtility` | class | `core-libs/storefront/layout/a11y/keyboard-focus/services/select-focus.util.ts:L13-L93` | [18](../parte-2/18-layout-breakpoint-a11y.md) (4) |
| `SelectionDisplayMode` | enum | `integration-libs/epd-visualization/components/visual-viewer/models/selection-display-mode.ts:L12-L22` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `SelectiveCartFacade` | class | `feature-libs/cart/base/root/facade/selective-cart.facade.ts:L31-L48` | [25](../parte-2/25-cart.md) (3) |
| `SelectiveCartService` | class | `feature-libs/cart/base/core/facade/selective-cart.service.ts:L33-L133` | [25](../parte-2/25-cart.md) (2) |
| `SemanticPathService` | class | `core-libs/core/src/routing/configurable-routes/url-translation/semantic-path.service.ts:L15-L172` | [14](../parte-2/14-routing.md) (3) |
| `SeoConfig` | class | `core-libs/storefront/cms-structure/seo/config/seo.config.ts:L14-L16` | [40](../parte-2/40-seo-pwa.md) (2) |
| `SeoMetaService` | class | `core-libs/storefront/cms-structure/seo/seo-meta.service.ts:L22-L94` | [40](../parte-2/40-seo-pwa.md) (8), [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `SeoModule` | class | `core-libs/storefront/cms-structure/seo/seo.module.ts:L35-L35` | [40](../parte-2/40-seo-pwa.md) (7) |
| `SERVER_REQUEST_ORIGIN` | const | `core-libs/core/src/util/ssr.tokens.ts:L19-L21` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [07](../parte-1/07-ssr-hydration-transferstate.md) (8), [14](../parte-2/14-routing.md) (1), [39](../parte-2/39-ssr-ottimizzato.md) (2), [40](../parte-2/40-seo-pwa.md) (1), [43](../parte-2/43-schematics-migrazioni.md) (1), [46](../parte-2/46-util-modelli.md) (6), [47](../parte-2/47-app-demo.md) (6) |
| `SERVER_REQUEST_URL` | const | `core-libs/core/src/util/ssr.tokens.ts:L12-L14` | [07](../parte-1/07-ssr-hydration-transferstate.md) (5), [13](../parte-2/13-site-context-theme.md) (2), [14](../parte-2/14-routing.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1), [40](../parte-2/40-seo-pwa.md) (1), [45](../parte-2/45-componenti-storefront.md) (1), [46](../parte-2/46-util-modelli.md) (6), [47](../parte-2/47-app-demo.md) (1) |
| `ServerOptions` | interface | `core-libs/setup/ssr/providers/model.ts:L10-L23` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [39](../parte-2/39-ssr-ottimizzato.md) (1), [46](../parte-2/46-util-modelli.md) (1) |
| `ServiceDetailsCardComponent` | class | `integration-libs/s4-service/order/components/order-summary/service-details-card.component.ts:L24-L82` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `ServiceDetailsCardModule` | class | `integration-libs/s4-service/order/components/order-summary/service-details-card.module.ts:L31-L31` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `ServiceOrderGuard` | class | `integration-libs/s4-service/order/components/guards/service-order.guard.ts:L16-L35` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `ServiceOrderOverviewComponentService` | class | `integration-libs/s4-service/order/components/order-summary/service-order-overview-component.service.ts:L13-L20` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `SET_ACTIVE_BASE_SITE` | const | `core-libs/core/src/site-context/store/actions/base-site.action.ts:L19-L19` | [13](../parte-2/13-site-context-theme.md) (2) |
| `SET_ACTIVE_CART_ID` | const | `feature-libs/cart/base/core/store/actions/multi-cart.action.ts:L15-L15` | [25](../parte-2/25-cart.md) (1) |
| `SET_ACTIVE_CURRENCY` | const | `core-libs/core/src/site-context/store/actions/currencies.action.ts:L14-L14` | [13](../parte-2/13-site-context-theme.md) (1) |
| `SET_ACTIVE_LANGUAGE` | const | `core-libs/core/src/site-context/store/actions/languages.action.ts:L14-L14` | [13](../parte-2/13-site-context-theme.md) (2) |
| `SET_ACTIVE_SITE_THEME` | const | `core-libs/core/src/site-theme/store/actions/site-themes.action.ts:L9-L9` | [13](../parte-2/13-site-context-theme.md) (2) |
| `SET_ANONYMOUS_CONSENTS` | const | `core-libs/core/src/anonymous-consents/store/actions/anonymous-consents.action.ts:L28-L29` | [23](../parte-2/23-user.md) (1) |
| `SET_CART_DATA` | const | `feature-libs/cart/base/core/store/actions/multi-cart.action.ts:L20-L20` | [25](../parte-2/25-cart.md) (1) |
| `SET_CART_TYPE_INDEX` | const | `feature-libs/cart/base/core/store/actions/multi-cart.action.ts:L19-L19` | [25](../parte-2/25-cart.md) (1) |
| `SET_NEXT_OWNER_CART_ENTRY` | const | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-cart.action.ts:L33-L34` | [30](../parte-2/30-product-configurator.md) (1) |
| `SetActiveBaseSite` | class | `core-libs/core/src/site-context/store/actions/base-site.action.ts:L60-L64` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1) |
| `SetActiveCartId` | class | `feature-libs/cart/base/core/store/actions/multi-cart.action.ts:L47-L50` | [25](../parte-2/25-cart.md) (2) |
| `SetActiveSiteTheme` | class | `core-libs/core/src/site-theme/store/actions/site-themes.action.ts:L12-L15` | [13](../parte-2/13-site-context-theme.md) (1), [38](../parte-2/38-stili-theming.md) (1) |
| `SetCartData` | class | `feature-libs/cart/base/core/store/actions/multi-cart.action.ts:L69-L74` | [25](../parte-2/25-cart.md) (2) |
| `SetCartTypeIndex` | class | `feature-libs/cart/base/core/store/actions/multi-cart.action.ts:L62-L67` | [25](../parte-2/25-cart.md) (1) |
| `SetCurrentGroup` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L454-L462` | [30](../parte-2/30-product-configurator.md) (1) |
| `SetInteractionState` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L441-L452` | [30](../parte-2/30-product-configurator.md) (1) |
| `SetMenuParentGroup` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L464-L478` | [30](../parte-2/30-product-configurator.md) (1) |
| `SetNextOwnerCartEntry` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-cart.action.ts:L119-L130` | [30](../parte-2/30-product-configurator.md) (1) |
| `SetPickupOption` | const | `feature-libs/pickup-in-store/core/store/actions/pickup-location.action.ts:L66-L69` (+1) | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `SetPreferredStoreComponent` | class | `feature-libs/pickup-in-store/components/container/set-preferred-store/set-preferred-store.component.ts:L27-L64` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `SetStoreDetailsFailure` | const | `feature-libs/pickup-in-store/core/store/actions/pickup-location.action.ts:L92-L102` | [32](../parte-2/32-pickup-storefinder-delivery.md) (3) |
| `SetStoreDetailsSuccess` | const | `feature-libs/pickup-in-store/core/store/actions/pickup-location.action.ts:L79-L82` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `SharedOrganizationModule` | class | `feature-libs/organization/administration/components/shared/shared-organization.module.ts:L15-L15` | [28](../parte-2/28-organization-b2b.md) (1) |
| `ShowEstimatedDeliveryDateModule` | class | `feature-libs/estimated-delivery-date/show-estimated-delivery-date/show-estimated-delivery-date.module.ts:L37-L37` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `SITE_THEME_CHANGE` | const | `core-libs/core/src/site-theme/store/actions/site-themes.action.ts:L10-L10` | [13](../parte-2/13-site-context-theme.md) (1) |
| `SITE_THEME_ID` | const | `core-libs/core/src/site-theme/providers/site-theme-id.ts:L7-L7` | [13](../parte-2/13-site-context-theme.md) (1) |
| `SiteAdapter` | class | `core-libs/core/src/site-context/connectors/site.adapter.ts:L17-L57` | [13](../parte-2/13-site-context-theme.md) (3), [21](../parte-2/21-occ.md) (2) |
| `SiteConnector` | class | `core-libs/core/src/site-context/connectors/site.connector.ts:L22-L56` | [13](../parte-2/13-site-context-theme.md) (4), [23](../parte-2/23-user.md) (1) |
| `SiteContextComponentService` | class | `core-libs/storefront/cms-components/misc/site-context-selector/site-context-component.service.ts:L28-L137` | [45](../parte-2/45-componenti-storefront.md) (4) |
| `SiteContextConfig` | class | `core-libs/core/src/site-context/config/site-context-config.ts:L14-L19` | [11](../parte-2/11-configurazione.md) (4), [13](../parte-2/13-site-context-theme.md) (3), [21](../parte-2/21-occ.md) (1), [38](../parte-2/38-stili-theming.md) (1) |
| `SiteContextConfigInitializer` | class | `core-libs/core/src/site-context/config/config-loader/site-context-config-initializer.ts:L25-L152` | [01](../parte-1/01-dependency-injection.md) (3), [10](../parte-2/10-bootstrap-inizializzazione.md) (4), [11](../parte-2/11-configurazione.md) (5), [13](../parte-2/13-site-context-theme.md) (6), [21](../parte-2/21-occ.md) (2), [37](../parte-2/37-i18n.md) (1) |
| `SiteContextEventBuilder` | class | `core-libs/core/src/site-context/events/site-context-event.builder.ts:L22-L73` | [13](../parte-2/13-site-context-theme.md) (2) |
| `SiteContextEventModule` | class | `core-libs/core/src/site-context/events/site-context-event.module.ts:L11-L15` | [13](../parte-2/13-site-context-theme.md) (3) |
| `SiteContextInterceptor` | class | `feature-libs/asm/customer-360/root/interceptors/site-context.interceptor.ts:L26-L73` (+1) | [06](../parte-1/06-httpclient-interceptor.md) (14), [13](../parte-2/13-site-context-theme.md) (7), [21](../parte-2/21-occ.md) (6), [29](../parte-2/29-asm.md) (4), [52](../parte-3/52-ricette-occ-dati.md) (2) |
| `SiteContextModule` | class | `core-libs/core/src/site-context/site-context.module.ts:L46-L66` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [13](../parte-2/13-site-context-theme.md) (2) |
| `SiteContextOccModule` | class | `core-libs/core/src/occ/adapters/site-context/site-context-occ.module.ts:L38-L38` | [06](../parte-1/06-httpclient-interceptor.md) (1), [13](../parte-2/13-site-context-theme.md) (2), [21](../parte-2/21-occ.md) (3) |
| `SiteContextParamsService` | class | `core-libs/core/src/site-context/services/site-context-params.service.ts:L20-L108` | [13](../parte-2/13-site-context-theme.md) (6) |
| `SiteContextRoutesHandler` | class | `core-libs/core/src/site-context/services/site-context-routes-handler.ts:L25-L173` | [13](../parte-2/13-site-context-theme.md) (9), [54](../parte-3/54-upgrade-safe.md) (1) |
| `SiteContextSelectorComponent` | class | `core-libs/storefront/cms-components/misc/site-context-selector/site-context-selector.component.ts:L42-L83` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `SiteContextSelectorModule` | class | `core-libs/storefront/cms-components/misc/site-context-selector/site-context-selector.module.ts:L55-L55` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `SiteContextStoreModule` | class | `core-libs/core/src/site-context/store/site-context-store.module.ts:L43-L43` | [13](../parte-2/13-site-context-theme.md) (2) |
| `SiteContextUrlSerializer` | class | `core-libs/core/src/site-context/services/site-context-url-serializer.ts:L31-L160` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (3), [05](../parte-1/05-router.md) (5), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [13](../parte-2/13-site-context-theme.md) (8), [54](../parte-3/54-upgrade-safe.md) (1) |
| `SiteTheme` | interface | `core-libs/core/src/model/misc.model.ts:L140-L143` | [13](../parte-2/13-site-context-theme.md) (1), [46](../parte-2/46-util-modelli.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (1) |
| `SiteThemeChange` | class | `core-libs/core/src/site-theme/store/actions/site-themes.action.ts:L17-L22` | [13](../parte-2/13-site-context-theme.md) (1) |
| `SiteThemeConfig` | class | `core-libs/core/src/site-theme/config/site-theme-config.ts:L15-L19` | [13](../parte-2/13-site-context-theme.md) (3), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `SiteThemeInitializer` | class | `core-libs/core/src/site-theme/services/site-theme-initializer.ts:L23-L157` | [13](../parte-2/13-site-context-theme.md) (3) |
| `SiteThemePersistenceService` | class | `core-libs/core/src/site-theme/services/site-theme-persistence.service.ts:L15-L44` | [13](../parte-2/13-site-context-theme.md) (1) |
| `SiteThemeService` | class | `core-libs/core/src/site-theme/facade/site-theme.service.ts:L28-L138` | [13](../parte-2/13-site-context-theme.md) (4), [38](../parte-2/38-stili-theming.md) (1), [45](../parte-2/45-componenti-storefront.md) (1) |
| `SiteThemeStoreModule` | class | `core-libs/core/src/site-theme/store/site-theme-store.module.ts:L42-L42` | [13](../parte-2/13-site-context-theme.md) (1) |
| `SiteThemeSwitcherComponent` | class | `core-libs/storefront/cms-components/misc/site-theme-switcher/site-theme-switcher.component.ts:L40-L78` | [38](../parte-2/38-stili-theming.md) (1), [45](../parte-2/45-componenti-storefront.md) (1) |
| `SiteThemeSwitcherComponentService` | class | `core-libs/storefront/cms-components/misc/site-theme-switcher/site-theme-switcher.component.service.ts:L12-L26` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `SkipFocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/skip-focus.directive.ts:L17-L24` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `SkipFocusDirective` | class | `core-libs/storefront/layout/a11y/keyboard-focus/skip-focus.directive.ts:L31-L78` | [18](../parte-2/18-layout-breakpoint-a11y.md) (7) |
| `SkipLink` | class | `core-libs/storefront/layout/a11y/skip-link/config/skip-link.config.ts:L18-L23` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `SkipLinkComponent` | class | `core-libs/storefront/layout/a11y/skip-link/component/skip-link.component.ts:L21-L29` | [18](../parte-2/18-layout-breakpoint-a11y.md) (4) |
| `SkipLinkConfig` | class | `core-libs/storefront/layout/a11y/skip-link/config/skip-link.config.ts:L14-L16` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `SkipLinkDirective` | class | `core-libs/storefront/layout/a11y/skip-link/directive/skip-link.directive.ts:L11-L26` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `SkipLinkModule` | class | `core-libs/storefront/layout/a11y/skip-link/skip-link.module.ts:L45-L45` | [18](../parte-2/18-layout-breakpoint-a11y.md) (3) |
| `SkipLinkService` | class | `core-libs/storefront/layout/a11y/skip-link/service/skip-link.service.ts:L15-L112` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `SlotConfig` | type | `core-libs/storefront/layout/config/layout-config.ts:L36-L46` | [18](../parte-2/18-layout-breakpoint-a11y.md) (2), [50](../parte-3/50-ricette-config-di.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `SlotDecorator` | class | `core-libs/core/src/cms/decorators/slot-decorator.ts:L11-L23` | [12](../parte-2/12-feature-module-lazy.md) (1), [15](../parte-2/15-cms-core.md) (3), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (3) |
| `SlotGroup` | type | `core-libs/storefront/layout/config/layout-config.ts:L48-L57` | [16](../parte-2/16-cms-rendering.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (4), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2) |
| `SMART_EDIT_CONTEXT` | const | `core-libs/core/src/routing/models/page-context.model.ts:L20-L20` | [14](../parte-2/14-routing.md) (1), [15](../parte-2/15-cms-core.md) (1) |
| `SMART_EDIT_FEATURE` | const | `feature-libs/smartedit/root/feature-name.ts:L7-L7` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `SmartEditComponentDecorator` | class | `feature-libs/smartedit/core/decorators/smart-edit-component-decorator.ts:L14-L32` | [15](../parte-2/15-cms-core.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `SmartEditConfig` | class | `feature-libs/smartedit/root/config/smart-edit-config.ts:L14-L19` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `SmartEditCoreModule` | class | `feature-libs/smartedit/core/smart-edit-core.module.ts:L14-L18` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (5) |
| `SmartEditLauncherService` | class | `feature-libs/smartedit/root/services/smart-edit-launcher.service.ts:L24-L119` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (3) |
| `SmartEditModule` | class | `feature-libs/smartedit/smart-edit.module.ts:L13-L13` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4) |
| `SmartEditRootModule` | class | `feature-libs/smartedit/root/smart-edit-root.module.ts:L34-L34` | [06](../parte-1/06-httpclient-interceptor.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (3) |
| `SmartEditService` | class | `feature-libs/smartedit/core/services/smart-edit.service.ts:L22-L192` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (5) |
| `SmartEditSlotDecorator` | class | `feature-libs/smartedit/core/decorators/smart-edit-slot-decorator.ts:L14-L28` | [15](../parte-2/15-cms-core.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `Sort` | interface | `core-libs/core/src/model/unused.model.ts:L40-L43` (+1) | [46](../parte-2/46-util-modelli.md) (4) |
| `SortingComponent` | class | `core-libs/storefront/shared/components/list-navigation/sorting/sorting.component.ts:L37-L106` | [04](../parte-1/04-change-detection-zone-signals.md) (1), [45](../parte-2/45-componenti-storefront.md) (1) |
| `SortModel` | interface | `core-libs/core/src/model/misc.model.ts:L81-L85` (+1) | [46](../parte-2/46-util-modelli.md) (4) |
| `SpinnerComponent` | class | `core-libs/storefront/shared/components/spinner/spinner.component.ts:L17-L21` | [22](../parte-2/22-auth.md) (2), [26](../parte-2/26-checkout.md) (1) |
| `SsrCallbackFn` | type | `core-libs/setup/ssr/optimized-engine/optimized-ssr-engine.ts:L22-L31` | [39](../parte-2/39-ssr-ottimizzato.md) (1) |
| `SsrOptimizationOptions` | interface | `core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts:L18-L181` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [39](../parte-2/39-ssr-ottimizzato.md) (4), [44](../parte-2/44-test-tooling.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `StandardCmsComponentConfig` | interface | `core-libs/core/src/cms/config/cms-config.ts:L13-L31` | [15](../parte-2/15-cms-core.md) (1) |
| `State` | interface | `core-libs/core/src/routing/store/routing-state.ts:L27-L29` | [05](../parte-1/05-router.md) (2), [19](../parte-2/19-state-management.md) (5) |
| `StateConfig` | class | `core-libs/core/src/state/config/state-config.ts:L24-L35` | [19](../parte-2/19-state-management.md) (4), [24](../parte-2/24-product-search.md) (1) |
| `StateEventService` | class | `core-libs/core/src/state/event/state-event.service.ts:L22-L77` | [19](../parte-2/19-state-management.md) (4), [20](../parte-2/20-facade-command-query-eventi.md) (9), [22](../parte-2/22-auth.md) (1), [50](../parte-3/50-ricette-config-di.md) (3) |
| `StateModule` | class | `core-libs/core/src/state/state.module.ts:L11-L18` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [13](../parte-2/13-site-context-theme.md) (2), [19](../parte-2/19-state-management.md) (6) |
| `StatePersistenceService` | class | `core-libs/core/src/state/services/state-persistence.service.ts:L21-L132` | [19](../parte-2/19-state-management.md) (7), [25](../parte-2/25-cart.md) (3), [34](../parte-2/34-integration-cdc-cdp-cds.md) (2), [35](../parte-2/35-integration-opf-payments.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (3) |
| `StateTransferType` | enum | `core-libs/core/src/state/config/state-config.ts:L16-L18` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [13](../parte-2/13-site-context-theme.md) (2), [15](../parte-2/15-cms-core.md) (1), [19](../parte-2/19-state-management.md) (4), [24](../parte-2/24-product-search.md) (1) |
| `StateWithAsm` | interface | `feature-libs/asm/core/store/asm-state.ts:L15-L17` | [29](../parte-2/29-asm.md) (1) |
| `StateWithCms` | interface | `core-libs/core/src/cms/store/cms-state.ts:L16-L18` | [15](../parte-2/15-cms-core.md) (1) |
| `StateWithProcess` | interface | `core-libs/core/src/process/store/process-state.ts:L11-L13` | [19](../parte-2/19-state-management.md) (1) |
| `STATUS` | enum | `feature-libs/customer-ticketing/root/model/customer-ticketing.model.ts:L14-L18` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `STATUS_NAME` | enum | `feature-libs/customer-ticketing/root/model/customer-ticketing.model.ts:L20-L24` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `Stock` | interface | `core-libs/core/src/model/product.model.ts:L77-L81` (+1) | [46](../parte-2/46-util-modelli.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `StockAdapter` | class | `feature-libs/pickup-in-store/core/connectors/stock.adapter.ts:L14-L34` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StockConnector` | class | `feature-libs/pickup-in-store/core/connectors/stock.connector.ts:L17-L43` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StockLevel` | class | `feature-libs/pickup-in-store/core/store/actions/stock.action.ts:L27-L33` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StockLevelAtStore` | const | `feature-libs/pickup-in-store/core/store/actions/stock.action.ts:L87-L90` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StockLevelFail` | class | `feature-libs/pickup-in-store/core/store/actions/stock.action.ts:L43-L52` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StockLevelOnHold` | class | `feature-libs/pickup-in-store/core/store/actions/stock.action.ts:L35-L41` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StockNotificationComponent` | class | `core-libs/storefront/cms-components/product/stock-notification/stock-notification.component.ts:L52-L202` | [24](../parte-2/24-product-search.md) (1) |
| `StorageSyncType` | enum | `core-libs/core/src/state/config/state-config.ts:L10-L14` | [19](../parte-2/19-state-management.md) (4) |
| `STORE` | const | `core-libs/schematics/src/shared/constants.ts:L50-L50` | [14](../parte-2/14-routing.md) (1) |
| `STORE_COUNT_NORMALIZER` | const | `feature-libs/storefinder/core/connectors/converters.ts:L15-L17` (+1) | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `STORE_FINDER_DATA` | const | `feature-libs/storefinder/core/store/store-finder-state.ts:L11-L11` (+1) | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `STORE_FINDER_FEATURE` | const | `feature-libs/storefinder/root/feature-name.ts:L7-L7` (+2) | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `STORE_FINDER_SEARCH_PAGE_NORMALIZER` | const | `feature-libs/storefinder/core/connectors/converters.ts:L11-L13` (+1) | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `StoreEntities` | interface | `feature-libs/storefinder/root/model/store-entities.model.ts:L13-L15` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderAdapter` | class | `feature-libs/storefinder/core/connectors/store-finder.adapter.ts:L11-L22` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderComponent` | class | `feature-libs/storefinder/components/store-finder/store-finder.component.ts:L16-L16` | [32](../parte-2/32-pickup-storefinder-delivery.md) (4) |
| `StoreFinderComponentsModule` | class | `feature-libs/storefinder/components/store-finder-components.module.ts:L117-L117` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderConfig` | class | `feature-libs/storefinder/core/config/store-finder-config.ts:L14-L23` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderCoreModule` | class | `feature-libs/storefinder/core/store-finder-core.module.ts:L22-L22` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderFacade` | class | `feature-libs/storefinder/root/facade/store-finder.facade.ts:L43-L73` | [32](../parte-2/32-pickup-storefinder-delivery.md) (3) |
| `StoreFinderGridComponent` | class | `feature-libs/storefinder/components/store-finder-grid/store-finder-grid.component.ts:L29-L53` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `StoreFinderListComponent` | class | `feature-libs/storefinder/components/store-finder-search-result/store-finder-list/store-finder-list.component.ts:L53-L123` | [04](../parte-1/04-change-detection-zone-signals.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `StoreFinderListItemComponent` | class | `feature-libs/storefinder/components/store-finder-list-item/store-finder-list-item.component.ts:L21-L52` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderMapComponent` | class | `feature-libs/storefinder/components/store-finder-map/store-finder-map.component.ts:L23-L61` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `StoreFinderModule` | class | `feature-libs/storefinder/store-finder.module.ts:L19-L19` | [29](../parte-2/29-asm.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderRootModule` | class | `feature-libs/storefinder/root/store-finder-root.module.ts:L38-L38` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderSearchComponent` | class | `feature-libs/storefinder/components/store-finder-search/store-finder-search.component.ts:L41-L72` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderSearchResultComponent` | class | `feature-libs/storefinder/components/store-finder-search-result/store-finder-search-result.component.ts:L32-L111` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `StoreFinderService` | class | `feature-libs/storefinder/core/facade/store-finder.service.ts:L29-L260` | [32](../parte-2/32-pickup-storefinder-delivery.md) (3) |
| `StoreFinderStoreComponent` | class | `feature-libs/storefinder/components/store-finder-store/store-finder-store.component.ts:L32-L63` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `StoreFinderStoreModule` | class | `feature-libs/storefinder/core/store/store-finder-store.module.ts:L27-L27` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreFinderStoresCountComponent` | class | `feature-libs/storefinder/components/store-finder-stores-count/store-finder-stores-count.component.ts:L32-L51` | [32](../parte-2/32-pickup-storefinder-delivery.md) (2) |
| `StorefrontComponent` | class | `core-libs/storefront/layout/main/storefront.component.ts:L67-L229` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (8), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (4), [38](../parte-2/38-stili-theming.md) (2), [42](../parte-2/42-feature-toggle-deprecazioni.md) (3), [43](../parte-2/43-schematics-migrazioni.md) (1), [45](../parte-2/45-componenti-storefront.md) (1) |
| `StorefrontComponentModule` | class | `core-libs/storefront/layout/main/storefront-component.module.ts:L34-L34` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (3), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (2) |
| `StorefrontOutlets` | enum | `core-libs/storefront/layout/main/storefront-outlets.model.ts:L7-L9` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `StoreLocationService` | class | `feature-libs/storefinder/core/service/store-location.service.ts:L13-L41` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `StoreModule` | class | `feature-libs/pickup-in-store/components/presentational/store/store.module.ts:L29-L29` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1) |
| `StrategyRequest` | interface | `integration-libs/cds/src/cds-models/cds-strategy-request.model.ts:L12-L28` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `StringTemplate` | class | `core-libs/core/src/config/utils/string-template.ts:L7-L32` | [11](../parte-2/11-configurazione.md) (3) |
| `STRONG_PASSWORD_PATTERN` | const | `core-libs/core/src/util/regex-pattern.ts:L29-L30` | [46](../parte-2/46-util-modelli.md) (1) |
| `StructuredDataFactory` | class | `core-libs/storefront/cms-structure/seo/structured-data/structured-data.factory.ts:L20-L54` | [40](../parte-2/40-seo-pwa.md) (3) |
| `StructuredDataModule` | class | `core-libs/storefront/cms-structure/seo/structured-data/structured-data.module.ts:L36-L36` | [40](../parte-2/40-seo-pwa.md) (5) |
| `SubListComponent` | class | `feature-libs/organization/administration/components/shared/sub-list/sub-list.component.ts:L43-L73` | [28](../parte-2/28-organization-b2b.md) (2) |
| `SubListModule` | class | `feature-libs/organization/administration/components/shared/sub-list/sub-list.module.ts:L34-L34` | [28](../parte-2/28-organization-b2b.md) (1) |
| `SubListService` | class | `feature-libs/organization/administration/components/shared/sub-list/sub-list.service.ts:L19-L64` | [28](../parte-2/28-organization-b2b.md) (2) |
| `SubscriptionActionMode` | type | `feature-libs/subscription-billing/root/model/subscription.model.ts:L54-L58` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionActionsFacade` | class | `feature-libs/subscription-billing/root/facade/subscription-actions.facade.ts:L33-L56` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `SubscriptionActionsModalComponent` | class | `feature-libs/subscription-billing/components/actions-modal/subscription-actions-modal.component.ts:L61-L270` | [04](../parte-1/04-change-detection-zone-signals.md) (3), [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionActionsService` | class | `feature-libs/subscription-billing/core/facade/subscription-actions.service.ts:L25-L160` | [31](../parte-2/31-quote-ticketing-subscription.md) (3) |
| `SubscriptionBillingDetailsPageMetaResolver` | class | `feature-libs/subscription-billing/core/services/subscription-billing-details-page-meta.resolver.ts:L24-L72` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionBillingFacade` | class | `feature-libs/subscription-billing/root/facade/subscription-billing.facade.ts:L29-L53` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `SubscriptionBillingModule` | class | `feature-libs/subscription-billing/subscription-billing.module.ts:L18-L18` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionBillingService` | class | `feature-libs/subscription-billing/core/facade/subscription-billing.service.ts:L35-L166` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionCartPriceBodyComponent` | class | `feature-libs/subscription-billing/root/components/cart/price-body/subscription-cart-price-body.component.ts:L21-L34` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionCartPriceHeadingComponent` | class | `feature-libs/subscription-billing/root/components/cart/price-heading/subscription-cart-price-heading.component.ts:L22-L31` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionDetail` | interface | `feature-libs/subscription-billing/root/model/subscription.model.ts:L11-L28` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionDetailsComponent` | class | `feature-libs/subscription-billing/components/details/subscription-details.component.ts:L43-L75` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `SubscriptionDetailsPageMetaResolver` | class | `feature-libs/subscription-billing/core/services/subscription-details-page-meta.resolver.ts:L24-L70` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionFacade` | class | `feature-libs/subscription-billing/root/facade/subscription.facade.ts:L28-L50` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `SubscriptionListComponent` | class | `feature-libs/subscription-billing/components/list/subscription-list.component.ts:L39-L79` | [04](../parte-1/04-change-detection-zone-signals.md) (2) |
| `SubscriptionProductPriceComponent` | class | `feature-libs/subscription-billing/components/product/price/subscription-product-price.component.ts:L29-L52` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionProductService` | class | `feature-libs/subscription-billing/root/services/subscription-product.service.ts:L15-L29` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `SubscriptionService` | class | `feature-libs/subscription-billing/core/facade/subscription.service.ts:L27-L147` | [31](../parte-2/31-quote-ticketing-subscription.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `SupplementHashAnchorsPipe` | class | `core-libs/storefront/shared/pipes/suplement-hash-anchors/supplement-hash-anchors.pipe.ts:L22-L50` | [45](../parte-2/45-componenti-storefront.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |

## T

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `Tab` | interface | `core-libs/storefront/cms-components/content/tab/tab.model.ts:L11-L37` (+1) | [45](../parte-2/45-componenti-storefront.md) (1) |
| `TabConfig` | interface | `core-libs/storefront/cms-components/content/tab/tab.model.ts:L39-L63` | [45](../parte-2/45-componenti-storefront.md) (2) |
| `TabFocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L98-L100` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `TabFocusService` | class | `core-libs/storefront/layout/a11y/keyboard-focus/tab/tab-focus.service.ts:L14-L160` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `TableConfig` | class | `core-libs/storefront/shared/components/table/config/table.config.ts:L24-L43` | [28](../parte-2/28-organization-b2b.md) (2), [45](../parte-2/45-componenti-storefront.md) (1) |
| `TableModule` | class | `core-libs/storefront/shared/components/table/table.module.ts:L30-L30` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `TableService` | class | `core-libs/storefront/shared/components/table/table.service.ts:L34-L186` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `TabModule` | class | `core-libs/storefront/cms-components/content/tab/tab.module.ts:L17-L17` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `TabParagraphContainerComponent` | class | `core-libs/storefront/cms-components/content/tab-paragraph-container/tab-paragraph-container.component.ts:L57-L220` | [45](../parte-2/45-componenti-storefront.md) (3) |
| `TEST_CONFIG` | const | `core-libs/core/src/config/test-config.module.ts:L42-L55` | [11](../parte-2/11-configurazione.md) (4), [39](../parte-2/39-ssr-ottimizzato.md) (1), [42](../parte-2/42-feature-toggle-deprecazioni.md) (1), [47](../parte-2/47-app-demo.md) (2) |
| `TEST_CONFIG_COOKIE_NAME` | const | `core-libs/core/src/config/test-config.module.ts:L31-L33` | [11](../parte-2/11-configurazione.md) (3), [47](../parte-2/47-app-demo.md) (1) |
| `TestConfig` | interface | `core-libs/core/src/config/test-config.module.ts:L27-L29` | [11](../parte-2/11-configurazione.md) (1) |
| `TestConfigModule` | class | `core-libs/core/src/config/test-config.module.ts:L75-L106` | [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [11](../parte-2/11-configurazione.md) (6), [42](../parte-2/42-feature-toggle-deprecazioni.md) (1), [44](../parte-2/44-test-tooling.md) (4), [47](../parte-2/47-app-demo.md) (6), [50](../parte-3/50-ricette-config-di.md) (1) |
| `TestConfigModuleOptions` | interface | `core-libs/core/src/config/test-config.module.ts:L65-L67` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1) |
| `TestConfigServerModule` | class | `core-libs/setup/ssr/testing/test-config-server.module.ts:L37-L58` | [07](../parte-1/07-ssr-hydration-transferstate.md) (1), [39](../parte-2/39-ssr-ottimizzato.md) (2), [47](../parte-2/47-app-demo.md) (2) |
| `TestingTimeUtils` | class | `core-libs/core/src/util/testing-time-utils.ts:L7-L21` | [46](../parte-2/46-util-modelli.md) (3) |
| `TextfieldConfiguratorModule` | class | `feature-libs/product-configurator/textfield/textfield-configurator.module.ts:L23-L23` | [30](../parte-2/30-product-configurator.md) (2) |
| `TextfieldConfiguratorRootModule` | class | `feature-libs/product-configurator/textfield/root/textfield-configurator-root.module.ts:L58-L64` | [30](../parte-2/30-product-configurator.md) (1) |
| `THEME_CONTEXT_ID` | const | `core-libs/core/src/site-context/providers/context-ids.ts:L10-L10` | [13](../parte-2/13-site-context-theme.md) (1), [38](../parte-2/38-stili-theming.md) (1) |
| `ThemeModule` | class | `core-libs/storefront/layout/theme/theme.module.ts:L25-L25` | [13](../parte-2/13-site-context-theme.md) (1), [18](../parte-2/18-layout-breakpoint-a11y.md) (1), [38](../parte-2/38-stili-theming.md) (4) |
| `ThemeService` | class | `core-libs/storefront/layout/theme/theme.service.ts:L19-L62` | [13](../parte-2/13-site-context-theme.md) (2), [38](../parte-2/38-stili-theming.md) (9) |
| `TicketClosedEvent` | class | `feature-libs/customer-ticketing/root/events/customer-ticketing.events.ts:L33-L35` | [31](../parte-2/31-quote-ticketing-subscription.md) (1) |
| `TicketCreatedEvent` | class | `feature-libs/customer-ticketing/root/events/customer-ticketing.events.ts:L52-L54` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `TicketDetails` | interface | `feature-libs/customer-ticketing/root/model/customer-ticketing.model.ts:L26-L35` | [31](../parte-2/31-quote-ticketing-subscription.md) (3) |
| `TicketEvent` | interface | `feature-libs/customer-ticketing/root/model/customer-ticketing.model.ts:L61-L69` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `TicketReopenedEvent` | class | `feature-libs/customer-ticketing/root/events/customer-ticketing.events.ts:L29-L31` | [31](../parte-2/31-quote-ticketing-subscription.md) (2) |
| `Time` | interface | `core-libs/core/src/model/misc.model.ts:L17-L21` (+1) | [46](../parte-2/46-util-modelli.md) (1) |
| `TimeUtils` | class | `core-libs/core/src/util/time-utils.ts:L7-L39` | [46](../parte-2/46-util-modelli.md) (1) |
| `Title` | interface | `core-libs/core/src/model/misc.model.ts:L87-L90` (+2) | [46](../parte-2/46-util-modelli.md) (1) |
| `TITLE_NORMALIZER` | const | `feature-libs/user/profile/core/connectors/converters.ts:L28-L30` (+1) | [23](../parte-2/23-user.md) (1) |
| `TmsCollector` | interface | `feature-libs/tracking/tms/core/model/tms.model.ts:L21-L40` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (4) |
| `TmsCollectorConfig` | interface | `feature-libs/tracking/tms/core/config/tms-config.ts:L14-L29` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `TmsCollectors` | interface | `feature-libs/tracking/tms/core/config/tms-config.ts:L31-L33` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (7) |
| `TmsConfig` | class | `feature-libs/tracking/tms/core/config/tms-config.ts:L42-L47` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (6) |
| `TmsService` | class | `feature-libs/tracking/tms/core/services/tms.service.ts:L28-L116` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (5) |
| `ToggleAnonymousConsentsBannerDissmissed` | class | `core-libs/core/src/anonymous-consents/store/actions/anonymous-consents.action.ts:L109-L113` | [23](../parte-2/23-user.md) (1) |
| `TokenRevocationInterceptor` | class | `core-libs/core/src/auth/user-auth/http-interceptors/token-revocation.interceptor.ts:L23-L59` | [06](../parte-1/06-httpclient-interceptor.md) (6), [22](../parte-2/22-auth.md) (6) |
| `TokenTarget` | enum | `feature-libs/asm/root/services/asm-auth-storage.service.ts:L18-L21` | [29](../parte-2/29-asm.md) (2) |
| `TrackingModule` | class | `integration-libs/cds/src/profiletag/tracking/tracking.module.ts:L20-L20` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (3) |
| `TRANSFER_ANONYMOUS_CONSENT` | const | `core-libs/core/src/user/store/actions/user-consents.action.ts:L27-L27` | [23](../parte-2/23-user.md) (1) |
| `TRANSFER_STATE_META_REDUCER` | const | `core-libs/core/src/state/reducers/index.ts:L23-L25` | [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [19](../parte-2/19-state-management.md) (4), [54](../parte-3/54-upgrade-safe.md) (2) |
| `TransferAnonymousConsent` | class | `core-libs/core/src/user/store/actions/user-consents.action.ts:L112-L122` | [23](../parte-2/23-user.md) (1) |
| `Translatable` | interface | `core-libs/core/src/i18n/translatable.ts:L7-L11` | [37](../parte-2/37-i18n.md) (3), [41](../parte-2/41-errori-global-message.md) (1) |
| `TranslatePipe` | class | `core-libs/core/src/i18n/translate.pipe.ts:L29-L96` | [37](../parte-2/37-i18n.md) (5), [45](../parte-2/45-componenti-storefront.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (7) |
| `TranslationChunksConfig` | interface | `core-libs/assets/src/translations/translation-chunks-config.ts:L7-L9` (+1) | [26](../parte-2/26-checkout.md) (1), [27](../parte-2/27-order.md) (2), [29](../parte-2/29-asm.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [37](../parte-2/37-i18n.md) (4), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (4) |
| `TranslationChunkService` | class | `core-libs/core/src/i18n/translation-chunk.service.ts:L14-L66` | [37](../parte-2/37-i18n.md) (4), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `TranslationResourceKey` | interface | `core-libs/core/src/i18n/translation-resources.ts:L7-L9` | [37](../parte-2/37-i18n.md) (1) |
| `TranslationResources` | interface | `core-libs/core/src/i18n/translation-resources.ts:L11-L15` | [37](../parte-2/37-i18n.md) (2), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (4) |
| `TranslationService` | class | `core-libs/core/src/i18n/translation.service.ts:L9-L35` | [37](../parte-2/37-i18n.md) (6), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `TrapFocus` | enum | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L102-L117` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `TrapFocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L135-L140` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `TrapFocusDirective` | class | `core-libs/storefront/layout/a11y/keyboard-focus/trap/trap-focus.directive.ts:L17-L66` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `TrapFocusService` | class | `core-libs/storefront/layout/a11y/keyboard-focus/trap/trap-focus.service.ts:L19-L74` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `TreeFileSystem` | class | `core-libs/schematics/src/shared/utils/tree-file-system.ts:L12-L157` | [08](../parte-1/08-schematics-builder.md) (3), [43](../parte-2/43-schematics-migrazioni.md) (1) |
| `TrendingSearchesComponent` | class | `integration-libs/cds/src/trending-searches/trending-searches.component.ts:L33-L74` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `TrendingSearchesModule` | class | `integration-libs/cds/src/trending-searches/trending-searches.module.ts:L37-L37` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `TrendingSearchesService` | class | `integration-libs/cds/src/trending-searches/trending-searches.service.ts:L37-L94` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `Trigger` | interface | `feature-libs/order/root/model/replenishment-order.model.ts:L78-L81` (+1) | [27](../parte-2/27-order.md) (1) |
| `TruncationTooltipDirective` | class | `core-libs/storefront/layout/a11y/truncation-tooltip/truncation-tooltip.directive.ts:L30-L65` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `Type` | enum | `core-libs/core/src/occ/occ-models/occ.models.ts:L2949-L2953` | [02](../parte-1/02-ngmodule-standalone-bootstrap.md) (1), [03](../parte-1/03-lazy-loading.md) (3), [45](../parte-2/45-componenti-storefront.md) (2) |

## U

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `UiType` | enum | `feature-libs/product-configurator/rulebased/core/model/configurator.model.ts:L317-L343` (+1) | [30](../parte-2/30-product-configurator.md) (2) |
| `UnifiedInjector` | class | `core-libs/core/src/lazy-loading/unified-injector.ts:L27-L94` | [01](../parte-1/01-dependency-injection.md) (7), [03](../parte-1/03-lazy-loading.md) (11), [05](../parte-1/05-router.md) (2), [11](../parte-2/11-configurazione.md) (3), [12](../parte-2/12-feature-module-lazy.md) (7), [14](../parte-2/14-routing.md) (1), [16](../parte-2/16-cms-rendering.md) (2), [21](../parte-2/21-occ.md) (1), [26](../parte-2/26-checkout.md) (2), [28](../parte-2/28-organization-b2b.md) (4), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [40](../parte-2/40-seo-pwa.md) (2), [41](../parte-2/41-errori-global-message.md) (1), [46](../parte-2/46-util-modelli.md) (1), [50](../parte-3/50-ricette-config-di.md) (1), [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) (2) |
| `UnitAddressItemService` | class | `feature-libs/organization/administration/components/unit/links/addresses/services/unit-address-item.service.ts:L23-L106` | [28](../parte-2/28-organization-b2b.md) (1), [54](../parte-3/54-upgrade-safe.md) (1) |
| `UnitLevelOrdersViewerGuard` | class | `feature-libs/organization/unit-order/core/guards/unit-level-orders-viewer.guard.ts:L23-L55` | [28](../parte-2/28-organization-b2b.md) (1) |
| `UnitListComponent` | class | `feature-libs/organization/administration/components/unit/list/unit-list.component.ts:L19-L36` | [28](../parte-2/28-organization-b2b.md) (1) |
| `UnitListService` | class | `feature-libs/organization/administration/components/unit/services/unit-list.service.ts:L36-L190` | [28](../parte-2/28-organization-b2b.md) (2) |
| `UnitOrderFacade` | class | `feature-libs/organization/unit-order/root/facade/unit-order.facade.ts:L34-L82` | [28](../parte-2/28-organization-b2b.md) (4) |
| `UnitTreeService` | class | `feature-libs/organization/administration/components/unit/services/unit-tree.service.ts:L22-L139` | [28](../parte-2/28-organization-b2b.md) (1) |
| `UnitUserListComponent` | class | `feature-libs/organization/administration/components/unit/links/users/list/unit-user-list.component.ts:L40-L53` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UnitUserRolesCellComponent` | class | `feature-libs/organization/administration/components/unit/links/users/list/unit-user-link-cell.component.ts:L36-L49` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UnknownErrorHandler` | class | `core-libs/core/src/global-message/http-interceptors/handlers/unknown-error/unknown-error.handler.ts:L22-L51` | [41](../parte-2/41-errori-global-message.md) (11), [50](../parte-3/50-ricette-config-di.md) (1) |
| `UPDATE_CART_ENTRY` | const | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-cart.action.ts:L28-L28` | [30](../parte-2/30-product-configurator.md) (2) |
| `UPDATE_CART_ENTRY_SUCCESS` | const | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-cart.action.ts:L29-L30` | [30](../parte-2/30-product-configurator.md) (1) |
| `UPDATE_CONFIGURATION` | const | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L23-L23` (+1) | [30](../parte-2/30-product-configurator.md) (1) |
| `UPDATE_CONFIGURATION_FINALIZE_SUCCESS` | const | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L45-L46` | [30](../parte-2/30-product-configurator.md) (1) |
| `UPDATE_USER_ADDRESS` | const | `core-libs/core/src/user/store/actions/user-addresses.action.ts:L20-L20` | [23](../parte-2/23-user.md) (1) |
| `UpdateBudget` | class | `feature-libs/organization/administration/core/store/actions/budget.action.ts:L132-L140` | [28](../parte-2/28-organization-b2b.md) (2) |
| `UpdateCartEntry` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator-cart.action.ts:L98-L105` | [30](../parte-2/30-product-configurator.md) (1) |
| `UpdateConfiguration` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L178-L185` (+1) | [30](../parte-2/30-product-configurator.md) (3) |
| `UpdateConfigurationFail` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L187-L201` | [30](../parte-2/30-product-configurator.md) (1) |
| `UpdateConfigurationFinalizeFail` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L311-L320` | [30](../parte-2/30-product-configurator.md) (2) |
| `UpdateConfigurationFinalizeSuccess` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L303-L309` | [30](../parte-2/30-product-configurator.md) (2) |
| `UpdateConfigurationSuccess` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L203-L209` | [30](../parte-2/30-product-configurator.md) (1) |
| `UpdateEmailComponent` | class | `feature-libs/user/profile/components/update-email/update-email.component.ts:L55-L67` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UpdatePasswordComponent` | class | `feature-libs/user/profile/components/update-password/update-password.component.ts:L55-L74` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UpdatePriceSummary` | class | `feature-libs/product-configurator/rulebased/core/state/actions/configurator.action.ts:L322-L328` | [30](../parte-2/30-product-configurator.md) (4) |
| `UpdateProfileComponent` | class | `feature-libs/user/profile/components/update-profile/update-profile.component.ts:L62-L82` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UpdateProfileComponentService` | class | `feature-libs/user/profile/components/update-profile/update-profile-component.service.ts:L20-L83` | [23](../parte-2/23-user.md) (1) |
| `UpdateType` | enum | `feature-libs/product-configurator/rulebased/core/model/configurator.model.ts:L364-L368` | [30](../parte-2/30-product-configurator.md) (1) |
| `UpdateUserAddress` | class | `core-libs/core/src/user/store/actions/user-addresses.action.ts:L84-L92` | [23](../parte-2/23-user.md) (2) |
| `UpdateUserAddressEvent` | class | `core-libs/core/src/user/events/user.events.ts:L14-L18` | [23](../parte-2/23-user.md) (3), [26](../parte-2/26-checkout.md) (1) |
| `UploadAttachmentSuccessEvent` | class | `feature-libs/customer-ticketing/root/events/customer-ticketing.events.ts:L59-L61` | [31](../parte-2/31-quote-ticketing-subscription.md) (3) |
| `URL` | const | `core-libs/schematics/src/shared/constants.ts:L520-L520` | [41](../parte-2/41-errori-global-message.md) (1) |
| `URL_TESTING_ALLOWLISTED_PARAMS` | const | `core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe.ts:L16-L18` | [14](../parte-2/14-routing.md) (1) |
| `UrlCommand` | type | `core-libs/core/src/routing/configurable-routes/url-translation/url-command.ts:L12-L12` | [14](../parte-2/14-routing.md) (1) |
| `UrlCommandRoute` | interface | `core-libs/core/src/routing/configurable-routes/url-translation/url-command.ts:L7-L10` | [14](../parte-2/14-routing.md) (1) |
| `UrlCommands` | type | `core-libs/core/src/routing/configurable-routes/url-translation/url-command.ts:L14-L14` | [14](../parte-2/14-routing.md) (1) |
| `UrlMatcherFactory` | type | `core-libs/core/src/routing/url-matcher/url-matcher-factory.ts:L9-L9` | [05](../parte-1/05-router.md) (2), [14](../parte-2/14-routing.md) (1), [16](../parte-2/16-cms-rendering.md) (1) |
| `UrlMatcherService` | class | `core-libs/core/src/routing/services/url-matcher.service.ts:L18-L198` | [05](../parte-1/05-router.md) (2), [14](../parte-2/14-routing.md) (3) |
| `UrlModule` | class | `core-libs/core/src/routing/configurable-routes/url-translation/url.module.ts:L16-L16` | [14](../parte-2/14-routing.md) (1) |
| `UrlParsingService` | class | `core-libs/core/src/routing/configurable-routes/url-translation/url-parsing.service.ts:L12-L64` | [14](../parte-2/14-routing.md) (1) |
| `UrlPipe` | class | `core-libs/core/src/routing/configurable-routes/url-translation/url.pipe.ts:L12-L18` | [14](../parte-2/14-routing.md) (1), [51](../parte-3/51-ricette-cms-outlet-layout.md) (1) |
| `UrlTestingModule` | class | `core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module.ts:L15-L29` | [14](../parte-2/14-routing.md) (2) |
| `UrlTreeWithSiteContext` | interface | `core-libs/core/src/site-context/services/site-context-url-serializer.ts:L22-L24` | [13](../parte-2/13-site-context-theme.md) (2) |
| `UsageIdConfig` | interface | `integration-libs/epd-visualization/root/config/epd-visualization-config.ts:L77-L94` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT` | const | `core-libs/core/src/auth/user-auth/config/default-auth-config.ts:L15-L19` | [22](../parte-2/22-auth.md) (2), [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `USE_CAPTCHA_TOKEN` | const | `core-libs/core/src/occ/utils/interceptor-util.ts:L11-L11` | [06](../parte-1/06-httpclient-interceptor.md) (1), [21](../parte-2/21-occ.md) (2) |
| `USE_CLIENT_TOKEN` | const | `core-libs/core/src/occ/utils/interceptor-util.ts:L9-L9` | [06](../parte-1/06-httpclient-interceptor.md) (1), [21](../parte-2/21-occ.md) (2), [22](../parte-2/22-auth.md) (2), [23](../parte-2/23-user.md) (4), [25](../parte-2/25-cart.md) (4), [27](../parte-2/27-order.md) (2), [28](../parte-2/28-organization-b2b.md) (1), [32](../parte-2/32-pickup-storefinder-delivery.md) (3), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `USE_CUSTOMER_SUPPORT_AGENT_TOKEN` | const | `core-libs/core/src/occ/utils/interceptor-util.ts:L10-L10` | [06](../parte-1/06-httpclient-interceptor.md) (1), [21](../parte-2/21-occ.md) (1), [29](../parte-2/29-asm.md) (1) |
| `USE_MY_ACCOUNT_V2_CONSENT` | const | `core-libs/storefront/cms-components/myaccount/my-account-v2/use-my-account-v2-consent-notification-perference.ts:L15-L18` | [23](../parte-2/23-user.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `USE_MY_ACCOUNT_V2_EMAIL` | const | `feature-libs/user/profile/components/update-email/use-my-account-v2-email.ts:L9-L12` | [23](../parte-2/23-user.md) (1) |
| `USE_MY_ACCOUNT_V2_NOTIFICATION_PREFERENCE` | const | `core-libs/storefront/cms-components/myaccount/my-account-v2/use-my-account-v2-consent-notification-perference.ts:L9-L13` | [23](../parte-2/23-user.md) (1), [47](../parte-2/47-app-demo.md) (1) |
| `USE_MY_ACCOUNT_V2_ORDER` | const | `feature-libs/order/root/tokens/context.ts:L17-L20` | [27](../parte-2/27-order.md) (4) |
| `USE_MY_ACCOUNT_V2_PASSWORD` | const | `feature-libs/user/profile/components/update-password/use-my-account-v2-password.ts:L9-L12` | [23](../parte-2/23-user.md) (1) |
| `USE_MY_ACCOUNT_V2_PROFILE` | const | `feature-libs/user/profile/components/update-profile/use-my-account-v2-profile.ts:L9-L12` | [23](../parte-2/23-user.md) (1) |
| `USE_STACKED_OUTLETS` | const | `core-libs/storefront/cms-structure/outlet/outlet.model.ts:L16-L16` | [17](../parte-2/17-outlet.md) (4) |
| `useFeatureStyles()` | function | `core-libs/core/src/features-config/utils/use-feature-styles.ts:L32-L40` | [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `User` | interface | `core-libs/core/src/model/misc.model.ts:L40-L58` (+3) | [23](../parte-2/23-user.md) (2), [29](../parte-2/29-asm.md) (4), [46](../parte-2/46-util-modelli.md) (3) |
| `USER_ACCOUNT_FEATURE` | const | `feature-libs/user/account/root/feature-name.ts:L7-L7` | [23](../parte-2/23-user.md) (1) |
| `USER_ACCOUNT_NORMALIZER` | const | `feature-libs/user/account/core/connectors/converters.ts:L15-L17` (+1) | [23](../parte-2/23-user.md) (1) |
| `USER_ADDRESSES` | const | `core-libs/core/src/user/store/user-state.ts:L33-L33` | [23](../parte-2/23-user.md) (1) |
| `USER_FEATURE` | const | `core-libs/core/src/user/store/user-state.ts:L22-L22` | [23](../parte-2/23-user.md) (1) |
| `USER_SIGN_UP_SERIALIZER` | const | `feature-libs/user/profile/core/connectors/converters.ts:L24-L26` (+1) | [23](../parte-2/23-user.md) (1) |
| `UserAccountAdapter` | class | `feature-libs/user/account/core/connectors/user-account.adapter.ts:L14-L20` | [23](../parte-2/23-user.md) (1) |
| `UserAccountChangedEvent` | class | `feature-libs/user/account/root/events/user-account.events.ts:L14-L16` | [23](../parte-2/23-user.md) (6) |
| `UserAccountComponentsModule` | class | `feature-libs/user/account/components/user-account-component.module.ts:L27-L27` | [23](../parte-2/23-user.md) (1) |
| `UserAccountConfig` | class | `feature-libs/user/account/root/config/user-account-config.ts:L14-L23` | [23](../parte-2/23-user.md) (1) |
| `UserAccountCoreModule` | class | `feature-libs/user/account/core/user-account-core.module.ts:L14-L14` | [23](../parte-2/23-user.md) (1) |
| `UserAccountEventListener` | class | `feature-libs/user/account/root/events/user-account-event.listener.ts:L22-L49` | [23](../parte-2/23-user.md) (1) |
| `UserAccountEventModule` | class | `feature-libs/user/account/root/events/user-account-event.module.ts:L12-L18` | [23](../parte-2/23-user.md) (2) |
| `UserAccountFacade` | class | `feature-libs/user/account/root/facade/user-account.facade.ts:L22-L25` | [23](../parte-2/23-user.md) (3) |
| `UserAccountModule` | class | `feature-libs/user/account/user-account.module.ts:L19-L19` | [23](../parte-2/23-user.md) (2), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UserAccountOccModule` | class | `feature-libs/user/account/occ/user-account-occ.module.ts:L19-L19` | [23](../parte-2/23-user.md) (1) |
| `UserAccountRootModule` | class | `feature-libs/user/account/root/user-account-root.module.ts:L75-L75` | [23](../parte-2/23-user.md) (2) |
| `UserAccountService` | class | `feature-libs/user/account/core/facade/user-account.service.ts:L25-L57` | [23](../parte-2/23-user.md) (4) |
| `UserAddressAdapter` | class | `core-libs/core/src/user/connectors/address/user-address.adapter.ts:L10-L27` | [23](../parte-2/23-user.md) (1) |
| `UserAddressService` | class | `core-libs/core/src/user/facade/user-address.service.ts:L33-L319` | [23](../parte-2/23-user.md) (3) |
| `UserAuthEventBuilder` | class | `core-libs/core/src/auth/user-auth/events/user-auth-event.builder.ts:L20-L64` | [20](../parte-2/20-facade-command-query-eventi.md) (1), [22](../parte-2/22-auth.md) (2) |
| `UserAuthEventModule` | class | `core-libs/core/src/auth/user-auth/events/user-auth-event.module.ts:L11-L15` | [22](../parte-2/22-auth.md) (1) |
| `UserAuthModule` | class | `core-libs/core/src/auth/user-auth/user-auth.module.ts:L101-L124` | [05](../parte-1/05-router.md) (1), [06](../parte-1/06-httpclient-interceptor.md) (3), [10](../parte-2/10-bootstrap-inizializzazione.md) (1), [22](../parte-2/22-auth.md) (4), [42](../parte-2/42-feature-toggle-deprecazioni.md) (1) |
| `UserComponentModule` | class | `core-libs/storefront/cms-components/user/user.module.ts:L23-L23` | [23](../parte-2/23-user.md) (1) |
| `UserConsentAdapter` | class | `core-libs/core/src/user/connectors/consent/user-consent.adapter.ts:L10-L24` | [23](../parte-2/23-user.md) (1), [34](../parte-2/34-integration-cdc-cdp-cds.md) (3), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `UserConsentService` | class | `core-libs/core/src/user/facade/user-consent.service.ts:L40-L308` | [23](../parte-2/23-user.md) (2) |
| `UserCostCenterAdapter` | class | `core-libs/core/src/user/connectors/cost-center/user-cost-center.adapter.ts:L11-L19` | [23](../parte-2/23-user.md) (1) |
| `UserCurrencyPreferenceSaverService` | class | `feature-libs/user/profile/root/services/user-currency-preference-saver.service.ts:L22-L62` | [23](../parte-2/23-user.md) (2) |
| `UserDetailsComponent` | class | `feature-libs/organization/administration/components/user/details/user-details.component.ts:L54-L81` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `UserEmailFacade` | class | `feature-libs/user/profile/root/facade/user-email.facade.ts:L21-L29` | [23](../parte-2/23-user.md) (2) |
| `UserEventBuilder` | class | `core-libs/core/src/user/events/user-event.builder.ts:L17-L54` | [23](../parte-2/23-user.md) (4), [50](../parte-3/50-ricette-config-di.md) (1) |
| `UserEventModule` | class | `core-libs/core/src/user/events/user-event.module.ts:L11-L15` | [23](../parte-2/23-user.md) (3) |
| `UserGroupItemService` | class | `feature-libs/organization/administration/components/user-group/services/user-group-item.service.ts:L22-L67` | [28](../parte-2/28-organization-b2b.md) (1) |
| `UserGuard` | class | `feature-libs/organization/administration/core/guards/user.guard.ts:L17-L38` | [28](../parte-2/28-organization-b2b.md) (5), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UserIdHttpHeaderInterceptor` | class | `feature-libs/asm/root/interceptors/user-id-http-header.interceptor.ts:L30-L85` | [06](../parte-1/06-httpclient-interceptor.md) (5), [21](../parte-2/21-occ.md) (2), [29](../parte-2/29-asm.md) (4), [54](../parte-3/54-upgrade-safe.md) (1) |
| `UserIdService` | class | `core-libs/core/src/auth/user-auth/facade/user-id.service.ts:L24-L89` | [21](../parte-2/21-occ.md) (1), [22](../parte-2/22-auth.md) (4), [23](../parte-2/23-user.md) (4), [29](../parte-2/29-asm.md) (2) |
| `UserInterestsAdapter` | class | `core-libs/core/src/user/connectors/interests/user-interests.adapter.ts:L14-L57` | [23](../parte-2/23-user.md) (1) |
| `UserListService` | class | `feature-libs/organization/administration/components/user/services/user-list.service.ts:L41-L96` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UserLoginCurrencyService` | class | `feature-libs/user/account/root/services/user-login-currency.service.ts:L25-L80` | [23](../parte-2/23-user.md) (1) |
| `UserModule` | class | `core-libs/core/src/user/user.module.ts:L21-L27` | [23](../parte-2/23-user.md) (3) |
| `UserNotificationPreferenceAdapter` | class | `core-libs/core/src/user/connectors/notification-preference/user-notification-preference.adapter.ts:L10-L28` | [23](../parte-2/23-user.md) (1) |
| `UserOccModule` | class | `core-libs/core/src/occ/adapters/user/user-occ.module.ts:L72-L72` | [21](../parte-2/21-occ.md) (2), [23](../parte-2/23-user.md) (4), [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UserPasswordFacade` | class | `feature-libs/user/profile/root/facade/user-password.facade.ts:L21-L48` | [23](../parte-2/23-user.md) (2) |
| `UserPaymentAdapter` | class | `core-libs/core/src/user/connectors/payment/user-payment.adapter.ts:L10-L16` | [23](../parte-2/23-user.md) (1), [35](../parte-2/35-integration-opf-payments.md) (4), [52](../parte-3/52-ricette-occ-dati.md) (1) |
| `UserPaymentService` | class | `core-libs/core/src/user/facade/user-payment.service.ts:L20-L98` | [23](../parte-2/23-user.md) (1) |
| `UserProfileAdapter` | class | `feature-libs/user/profile/core/connectors/user-profile.adapter.ts:L11-L42` | [23](../parte-2/23-user.md) (1) |
| `UserProfileFacade` | class | `feature-libs/user/profile/root/facade/user-profile.facade.ts:L23-L42` | [23](../parte-2/23-user.md) (4), [25](../parte-2/25-cart.md) (1) |
| `UserProfileFacadeTransitionalToken` | class | `core-libs/core/src/user/user-transitional-tokens.ts:L10-L12` | [23](../parte-2/23-user.md) (3) |
| `UserProfileModule` | class | `feature-libs/user/profile/user-profile.module.ts:L21-L21` | [23](../parte-2/23-user.md) (2) |
| `UserProfileRootModule` | class | `feature-libs/user/profile/root/user-profile-root.module.ts:L54-L58` | [23](../parte-2/23-user.md) (1) |
| `UserRegisterFacade` | class | `feature-libs/user/profile/root/facade/user-register.facade.ts:L23-L43` | [23](../parte-2/23-user.md) (2) |
| `UserRegisterService` | class | `feature-libs/user/profile/core/facade/user-register.service.ts:L29-L97` | [23](../parte-2/23-user.md) (2) |
| `UserRegistrationFacade` | class | `feature-libs/organization/user-registration/root/facade/user-registration.facade.ts:L22-L31` | [28](../parte-2/28-organization-b2b.md) (1) |
| `UserRegistrationFormService` | class | `feature-libs/organization/user-registration/components/form/user-registration-form.service.ts:L38-L209` | [34](../parte-2/34-integration-cdc-cdp-cds.md) (2) |
| `UserRegistrationService` | class | `feature-libs/organization/user-registration/core/facade/user-registration.service.ts:L17-L42` | [28](../parte-2/28-organization-b2b.md) (1) |
| `UserSignUp` | interface | `feature-libs/user/profile/root/model/user-profile.model.ts:L33-L41` (+1) | [34](../parte-2/34-integration-cdc-cdp-cds.md) (1) |
| `UserState` | interface | `core-libs/core/src/user/store/user-state.ts:L52-L65` | [23](../parte-2/23-user.md) (2) |
| `UserStoreModule` | class | `core-libs/core/src/user/store/user-store.module.ts:L27-L27` | [23](../parte-2/23-user.md) (3) |

## V

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `VARIANT_CONFIGURATOR_NORMALIZER` | const | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L12-L14` | [30](../parte-2/30-product-configurator.md) (1) |
| `VARIANT_CONFIGURATOR_SERIALIZER` | const | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L16-L18` | [30](../parte-2/30-product-configurator.md) (1) |
| `VariantConfiguratorOccAdapter` | class | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.adapter.ts:L40-L407` | [30](../parte-2/30-product-configurator.md) (1) |
| `VariantConfiguratorOccModule` | class | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.module.ts:L85-L85` | [30](../parte-2/30-product-configurator.md) (4) |
| `VariantConfiguratorPageLayoutHandler` | class | `feature-libs/product-configurator/rulebased/root/variant/variant-configurator-page-layout-handler.ts:L23-L72` | [30](../parte-2/30-product-configurator.md) (3) |
| `VariantQualifier` | enum | `core-libs/core/src/model/product.model.ts:L222-L230` | [24](../parte-2/24-product-search.md) (1), [46](../parte-2/46-util-modelli.md) (1) |
| `VariantType` | enum | `core-libs/core/src/model/product.model.ts:L57-L61` | [46](../parte-2/46-util-modelli.md) (2) |
| `VerificationTokenFacade` | class | `feature-libs/user/account/root/facade/verification-token.facade.ts:L22-L26` | [23](../parte-2/23-user.md) (2) |
| `VerificationTokenService` | class | `feature-libs/user/account/core/facade/verification-token.service.ts:L18-L39` | [23](../parte-2/23-user.md) (1) |
| `VideoComponent` | class | `core-libs/storefront/cms-components/content/video/video.component.ts:L39-L124` | [45](../parte-2/45-componenti-storefront.md) (1) |
| `VIEW_ALL_STORES` | const | `feature-libs/storefinder/core/store/actions/view-all-stores.action.ts:L11-L11` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `ViewAllStoresSuccess` | class | `feature-libs/storefinder/core/store/actions/view-all-stores.action.ts:L35-L41` | [32](../parte-2/32-pickup-storefinder-delivery.md) (1) |
| `ViewConfig` | class | `core-libs/storefront/shared/config/view-config.ts:L14-L26` | [24](../parte-2/24-product-search.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [45](../parte-2/45-componenti-storefront.md) (3) |
| `VisibleFocusConfig` | interface | `core-libs/storefront/layout/a11y/keyboard-focus/keyboard-focus.model.ts:L19-L25` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `VisibleFocusDirective` | class | `core-libs/storefront/layout/a11y/keyboard-focus/visible/visible-focus.directive.ts:L25-L87` | [18](../parte-2/18-layout-breakpoint-a11y.md) (1) |
| `VisualizationAdapter` | class | `integration-libs/epd-visualization/core/connectors/visualization/visualization.adapter.ts:L14-L28` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `VisualPickingProductListService` | class | `integration-libs/epd-visualization/components/visual-picking/visual-picking-tab/product-list/visual-picking-product-list.service.ts:L37-L197` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `VisualPickingTabComponent` | class | `integration-libs/epd-visualization/components/visual-picking/visual-picking-tab/visual-picking-tab.component.ts:L36-L72` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (2) |
| `VisualPickingTabService` | class | `integration-libs/epd-visualization/components/visual-picking/visual-picking-tab/visual-picking-tab.service.ts:L33-L234` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `VisualViewerComponent` | class | `integration-libs/epd-visualization/components/visual-viewer/visual-viewer.component.ts:L40-L307` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1) |
| `VisualViewerService` | class | `integration-libs/epd-visualization/components/visual-viewer/visual-viewer.service.ts:L77-L1639` | [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (5) |

## W

| Simbolo | Tipo | Dichiarazione | Capitoli (occorrenze) |
|---|---|---|---|
| `W3cTraceContext` | interface | `core-libs/setup/ssr/logger/loggers/w3c-trace-context/w3c-trace-context.model.ts:L18-L23` | [39](../parte-2/39-ssr-ottimizzato.md) (2) |
| `WebComponentHandler` | class | `core-libs/storefront/cms-structure/page/component/handlers/web-component.handler.ts:L30-L137` | [16](../parte-2/16-cms-rendering.md) (6), [51](../parte-3/51-ricette-cms-outlet-layout.md) (2), [54](../parte-3/54-upgrade-safe.md) (1) |
| `WindowObject` | interface | `feature-libs/tracking/tms/core/model/tms.model.ts:L14-L16` | [33](../parte-2/33-tracking-smartedit-qualtrics.md) (2) |
| `WindowRef` | class | `core-libs/core/src/window/window-ref.ts:L16-L108` | [07](../parte-1/07-ssr-hydration-transferstate.md) (4), [13](../parte-2/13-site-context-theme.md) (1), [19](../parte-2/19-state-management.md) (2), [23](../parte-2/23-user.md) (1), [31](../parte-2/31-quote-ticketing-subscription.md) (1), [33](../parte-2/33-tracking-smartedit-qualtrics.md) (1), [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) (1), [46](../parte-2/46-util-modelli.md) (11), [50](../parte-3/50-ricette-config-di.md) (1) |
| `Wishlist` | interface | `feature-libs/user/wishlist/root/model/wishlist.model.ts:L16-L19` | [25](../parte-2/25-cart.md) (1) |
| `WishListFacade` | class | `feature-libs/cart/wish-list/root/facade/wish-list.facade.ts:L30-L46` | [25](../parte-2/25-cart.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `WishListService` | class | `feature-libs/cart/wish-list/core/facade/wish-list.service.ts:L33-L122` | [25](../parte-2/25-cart.md) (1) |
| `WishListV2Module` | class | `feature-libs/cart/wish-list/wish-list-v2.module.ts:L50-L50` | [25](../parte-2/25-cart.md) (3), [50](../parte-3/50-ricette-config-di.md) (1) |
| `WishListV2Service` | class | `feature-libs/cart/wish-list/core/facade/wish-list-v2.service.ts:L30-L138` | [25](../parte-2/25-cart.md) (3) |
| `WishListWithV2Module` | class | `feature-libs/cart/wish-list/wish-list-with-v2.module.ts:L14-L14` | [47](../parte-2/47-app-demo.md) (1), [50](../parte-3/50-ricette-config-di.md) (1) |
| `WithCredentialsInterceptor` | class | `core-libs/core/src/occ/interceptors/with-credentials.interceptor.ts:L21-L53` | [06](../parte-1/06-httpclient-interceptor.md) (4), [21](../parte-2/21-occ.md) (5) |

---

Legenda capitoli:

- [01](../parte-1/01-dependency-injection.md) Dependency Injection in Angular e in Spartacus
- [02](../parte-1/02-ngmodule-standalone-bootstrap.md) NgModule, standalone e bootstrap dell'applicazione
- [03](../parte-1/03-lazy-loading.md) Lazy loading: router e moduli caricati a runtime
- [04](../parte-1/04-change-detection-zone-signals.md) Change detection, Zone, zoneless e signals
- [05](../parte-1/05-router.md) Il Router di Angular
- [06](../parte-1/06-httpclient-interceptor.md) HttpClient e interceptor
- [07](../parte-1/07-ssr-hydration-transferstate.md) SSR, hydration e TransferState
- [08](../parte-1/08-schematics-builder.md) Schematics e builder
- [10](../parte-2/10-bootstrap-inizializzazione.md) Bootstrap e ordine di inizializzazione
- [11](../parte-2/11-configurazione.md) Configurazione: provideConfig, default, merge, validator, initializer
- [12](../parte-2/12-feature-module-lazy.md) Feature module e lazy loading in Spartacus
- [13](../parte-2/13-site-context-theme.md) Site context e site theme
- [14](../parte-2/14-routing.md) Routing: route semantiche, URL, page guard, contesto
- [15](../parte-2/15-cms-core.md) CMS (core): pagine, slot, componenti, caricamento
- [16](../parte-2/16-cms-rendering.md) CMS (storefront): rendering dinamico delle pagine
- [17](../parte-2/17-outlet.md) Outlet
- [18](../parte-2/18-layout-breakpoint-a11y.md) Layout, breakpoint, launch dialog e accessibilità
- [19](../parte-2/19-state-management.md) State management: NgRx, loader/entity/process state
- [20](../parte-2/20-facade-command-query-eventi.md) Facade, command & query, eventi
- [21](../parte-2/21-occ.md) Livello OCC: adapter, connector, converter, endpoint
- [22](../parte-2/22-auth.md) Autenticazione: OAuth, token, interceptor, refresh
- [23](../parte-2/23-user.md) Utente, profilo, consensi
- [24](../parte-2/24-product-search.md) Prodotto e ricerca
- [25](../parte-2/25-cart.md) Carrello
- [26](../parte-2/26-checkout.md) Checkout
- [27](../parte-2/27-order.md) Ordini
- [28](../parte-2/28-organization-b2b.md) B2B: organization
- [29](../parte-2/29-asm.md) ASM (Assisted Service Module)
- [30](../parte-2/30-product-configurator.md) Product configurator
- [31](../parte-2/31-quote-ticketing-subscription.md) Quote, customer ticketing, subscription billing
- [32](../parte-2/32-pickup-storefinder-delivery.md) Pickup in store, store finder, delivery date
- [33](../parte-2/33-tracking-smartedit-qualtrics.md) Tracking, SmartEdit, Qualtrics
- [34](../parte-2/34-integration-cdc-cdp-cds.md) Integration libs: CDC, CDP, CDS, segment-refs
- [35](../parte-2/35-integration-opf-payments.md) Integration libs: OPF, digital payments, OPPS
- [36](../parte-2/36-integration-s4-omf-cpq-punchout-epd.md) Integration libs: S/4, OMF, CPQ quote, punchout, EPD
- [37](../parte-2/37-i18n.md) Internazionalizzazione (i18n)
- [38](../parte-2/38-stili-theming.md) Stili e theming
- [39](../parte-2/39-ssr-ottimizzato.md) SSR ottimizzato
- [40](../parte-2/40-seo-pwa.md) SEO e PWA
- [41](../parte-2/41-errori-global-message.md) Errori HTTP, error handling, logger e global message
- [42](../parte-2/42-feature-toggle-deprecazioni.md) Feature toggle e deprecazioni
- [43](../parte-2/43-schematics-migrazioni.md) Schematics e migrazioni di Spartacus
- [44](../parte-2/44-test-tooling.md) Strategia di test e tooling del monorepo
- [45](../parte-2/45-componenti-storefront.md) Componenti CMS e shared components di storefront
- [46](../parte-2/46-util-modelli.md) Utility, window e modelli di dominio
- [47](../parte-2/47-app-demo.md) L'app demo storefrontapp
- [50](../parte-3/50-ricette-config-di.md) Ricette: configurazione, DI, interceptor, eventi
- [51](../parte-3/51-ricette-cms-outlet-layout.md) Ricette: componenti CMS, outlet, route e layout
- [52](../parte-3/52-ricette-occ-dati.md) Ricette: OCC, adapter, converter, endpoint, meta resolver
- [53](../parte-3/53-ricette-feature-cart-checkout-stili-i18n.md) Ricette: feature lib lazy, carrello/checkout, stili, traduzioni
- [54](../parte-3/54-upgrade-safe.md) API pubblica vs interna, upgrade, anti-pattern, checklist
