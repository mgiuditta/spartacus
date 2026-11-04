# Appendice A05 — Guard

> Generata da `tools/extract2/a05_guards.py` allo SHA 5b7a1c2b. Non modificare a mano: rigenerare.

Tabella 1: classi che (a) dichiarano `implements CanActivate|CanActivateChild|CanDeactivate|CanMatch|CanLoad`, oppure (b) definiscono a primo livello un metodo `canActivate()`/`canActivateChild()`/`canDeactivate()`/`canMatch()`/`canLoad()` senza `implements` (guard "strutturali": la maggior parte delle guard Spartacus, perché le interfacce class-based sono deprecate in Angular), oppure (c) estendono ricorsivamente una delle precedenti. "Usi" conta le occorrenze del nome come elemento di array `guards: [...]` (config `cmsComponents`) o `canActivate|canActivateChild|canDeactivate|canMatch: [...]` (route) nell'ambito.

Tabella 2: funzioni guard tipizzate (`const x: CanActivateFn = ...` o funzioni che ritornano `Can*Fn`).

## Conteggi

- Classi guard (righe tabella 1): **43**
- di cui con `implements Can*` esplicito: **4**
- di cui solo strutturali (metodo `canActivate()` ecc. senza `implements`): **36**
- di cui solo per ereditarietà (`extends` di una guard): **3**
- Classi con `CanActivate` (implements o metodo): **40**
- Funzioni guard tipizzate `Can*Fn` (tabella 2): **0**
- Entry point coinvolti: **21**

## Come rigenerare

```bash
cd docs/spartacus-book
python3 tools/extract2/a05_guards.py
# oppure tutte le appendici: bash tools/extract2/run_all.sh
```

Ambito: `git ls-files core-libs feature-libs integration-libs | grep '\.ts$' | grep -vE '\.spec\.ts$|/testing/|\.mock\.ts$|/schematics/'`. La colonna "Libreria" è l'entry point npm ricavato dal `package.json`/`ng-package.json` più vicino.

## Tabella 1 — Classi guard

| # | Classe | `implements` | Metodi guard | Classe padre | Usi (`guards`/route) | Libreria | Riferimento |
|---|---|---|---|---|---|---|---|
| 1 | `AdminGuard` | — | `canActivate()` |  | guards: 9 | `@spartacus/organization/administration/core` | `feature-libs/organization/administration/core/guards/admin.guard.ts:L20-L50` |
| 2 | `ApproverGuard` | — | `canActivate()` |  | guards: 6 | `@spartacus/organization/order-approval` | `feature-libs/organization/order-approval/core/guards/approver.guard.ts:L22-L54` |
| 3 | `AuthGuard` | — | `canActivate()` |  | canActivate: 18, guards: 77 | `@spartacus/core` | `core-libs/core/src/auth/user-auth/guards/auth.guard.ts:L22-L43` |
| 4 | `BeforeCmsPageGuardService` | — | `canActivate()` |  |  | `@spartacus/storefront` | `core-libs/storefront/cms-structure/guards/before-cms-page-guard.service.ts:L18-L33` |
| 5 | `CancelServiceOrderGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/s4-service/order` | `integration-libs/s4-service/order/components/guards/cancel-service-order.guard.ts:L16-L38` |
| 6 | `CartNotEmptyGuard` | — | `canActivate()` |  | guards: 24 | `@spartacus/checkout/base/components` | `feature-libs/checkout/base/components/guards/cart-not-empty.guard.ts:L17-L40` |
| 7 | `CartValidationGuard` | — | `canActivate()` |  | guards: 5 | `@spartacus/cart/base/core` | `feature-libs/cart/base/core/guards/cart-validation.guard.ts:L29-L103` |
| 8 | `CdcLoginAsGuestGuard` | eredita da LoginAsGuestGuard |  | `LoginAsGuestGuard` |  | `@spartacus/cdc/root` | `integration-libs/cdc/root/guards/cdc-login-as-guest.guard.ts:L13-L17` |
| 9 | `CdcLoginGuard` | eredita da LoginGuard |  | `LoginGuard` |  | `@spartacus/cdc/root` | `integration-libs/cdc/root/guards/cdc-login.guard.ts:L20-L32` |
| 10 | `CdcLogoutGuard` | eredita da LogoutGuard |  | `LogoutGuard` |  | `@spartacus/cdc/root` | `integration-libs/cdc/root/guards/cdc-logout.guard.ts:L26-L56` |
| 11 | `CheckoutAuthGuard` | — | `canActivate()` |  | guards: 24 | `@spartacus/checkout/base/components` | `feature-libs/checkout/base/components/guards/checkout-auth.guard.ts:L25-L78` |
| 12 | `CheckoutB2BAuthGuard` | — | `canActivate()` | `CheckoutAuthGuard` |  | `@spartacus/checkout/b2b/components` | `feature-libs/checkout/b2b/components/guards/checkout-b2b-auth.guard.ts:L30-L89` |
| 13 | `CheckoutB2BStepsSetGuard` | — | `canActivate()` | `CheckoutStepsSetGuard` |  | `@spartacus/checkout/b2b/components` | `feature-libs/checkout/b2b/components/guards/checkout-b2b-steps-set.guard.ts:L32-L178` |
| 14 | `CheckoutGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/checkout/base/components` | `feature-libs/checkout/base/components/guards/checkout.guard.ts:L21-L71` |
| 15 | `CheckoutServiceOrderStepsSetGuard` | — | `canActivate()` | `CheckoutB2BStepsSetGuard` |  | `@spartacus/s4-service/checkout` | `integration-libs/s4-service/checkout/components/guards/checkout-service-order-steps-set.guard.ts:L21-L100` |
| 16 | `CheckoutStepsSetGuard` | — | `canActivate()` |  | guards: 3 | `@spartacus/checkout/base/components` | `feature-libs/checkout/base/components/guards/checkout-steps-set.guard.ts:L36-L187` |
| 17 | `CmsPageGuard` | — | `canActivate()` |  | canActivate: 41 | `@spartacus/storefront` | `core-libs/storefront/cms-structure/guards/cms-page.guard.ts:L26-L92` |
| 18 | `CustomLoginGuard` | `CanActivate` | `canActivate()` |  | guards: 2 | `@spartacus/core` | `core-libs/core/src/auth/user-auth/guards/custom-login.guard.ts:L50-L138` |
| 19 | `ExternalRoutesGuard` | — | `canActivate()` |  | canActivate: 1 | `@spartacus/core` | `core-libs/core/src/routing/external-routes/external-routes.guard.ts:L13-L42` |
| 20 | `FederatedLoginGuard` | `CanActivate` | `canActivate()` |  |  | `@spartacus/core` | `core-libs/core/src/auth/user-auth/guards/federated-login.guard.ts:L32-L105` |
| 21 | `GigyaRaasGuard` | `CanActivate` | `canActivate()` |  | guards: 1 | `@spartacus/cdc/components` | `integration-libs/cdc/components/gigya-raas/gigya-raas.guard.ts:L32-L123` |
| 22 | `GuardsComposer` | — | `canActivate()` |  |  | `@spartacus/storefront` | `core-libs/storefront/cms-structure/services/guards-composer.ts:L31-L94` |
| 23 | `LoginAsGuestGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/user/account/components` | `feature-libs/user/account/components/guards/login-as-guest.guard.ts:L20-L46` |
| 24 | `LoginGuard` | — | `canActivate()` |  | canActivate: 1 | `@spartacus/storefront` | `core-libs/storefront/cms-components/user/login-route/login.guard.ts:L27-L66` |
| 25 | `LogoutGuard` | — | `canActivate()` |  | canActivate: 1 | `@spartacus/storefront` | `core-libs/storefront/cms-components/user/logout/logout.guard.ts:L31-L111` |
| 26 | `NotAuthGuard` | — | `canActivate()` |  | guards: 14 | `@spartacus/core` | `core-libs/core/src/auth/user-auth/guards/not-auth.guard.ts:L21-L41` |
| 27 | `NotCheckoutAuthGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/checkout/base/components` | `feature-libs/checkout/base/components/guards/not-checkout-auth.guard.ts:L21-L45` |
| 28 | `OAuthCallbackGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/core` | `core-libs/core/src/auth/user-auth/guards/oauth-callback.guard.ts:L25-L53` |
| 29 | `OpfB2bCheckoutStepsSetGuard` | — | `canActivate()` | `CheckoutStepsSetGuard` |  | `@spartacus/opf/b2b-checkout/root` | `integration-libs/opf/b2b-checkout/root/guards/opf-b2b-checkout-steps-set.guard.ts:L42-L193` |
| 30 | `OpfCheckoutAuthGuard` | — | `canActivate()` | `CheckoutAuthGuard` |  | `@spartacus/opf/checkout/root` | `integration-libs/opf/checkout/root/checkout-guard/opf-checkout-auth.guard.ts:L21-L63` |
| 31 | `OppsLoginRequiredGuard` | — | `canActivate()` |  |  | `@spartacus/opps/root` | `integration-libs/opps/root/login-required/opps-login-required.guard.ts:L22-L62` |
| 32 | `OrderCancellationGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/order/components` | `feature-libs/order/components/amend-order/cancellations/order-cancellation.guard.ts:L17-L40` |
| 33 | `OrderConfirmationGuard` | — | `canActivate()` |  | guards: 11 | `@spartacus/order/components` | `feature-libs/order/components/guards/order-confirmation.guard.ts:L17-L37` |
| 34 | `OrderReturnGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/order/components` | `feature-libs/order/components/amend-order/returns/order-return.guard.ts:L17-L40` |
| 35 | `OrgUnitGuard` | — | `canActivate()` |  | canActivate: 3 | `@spartacus/organization/administration/core` | `feature-libs/organization/administration/core/guards/org-unit.guard.ts:L17-L38` |
| 36 | `ProductMultiDimensionalSelectorGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/product-multi-dimensional/selector/components` | `feature-libs/product-multi-dimensional/selector/components/guards/product-multi-dimensional-selector.guard.ts:L33-L111` |
| 37 | `ProductVariantsGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/product/variants/components` | `feature-libs/product/variants/components/guards/product-variants.guard.ts:L26-L81` |
| 38 | `ProtectedRoutesGuard` | — | `canActivate()` |  |  | `@spartacus/core` | `core-libs/core/src/routing/protected-routes/protected-routes.guard.ts:L14-L34` |
| 39 | `PunchoutNavigationGuard` | — | `canActivate()` |  |  | `@spartacus/punchout/root` | `integration-libs/punchout/root/guards/punchout-navigation.guard.ts:L26-L141` |
| 40 | `QuoteCartGuard` | `CanActivate` | `canActivate()` |  | guards: 1 | `@spartacus/quote/components/cart-guard` | `feature-libs/quote/components/cart-guard/quote-cart.guard.ts:L28-L81` |
| 41 | `ServiceOrderGuard` | — | `canActivate()` |  | guards: 1 | `@spartacus/s4-service/order` | `integration-libs/s4-service/order/components/guards/service-order.guard.ts:L16-L35` |
| 42 | `UnitLevelOrdersViewerGuard` | — | `canActivate()` |  | guards: 4 | `@spartacus/organization/unit-order/core` | `feature-libs/organization/unit-order/core/guards/unit-level-orders-viewer.guard.ts:L23-L55` |
| 43 | `UserGuard` | — | `canActivate()` |  | canActivate: 5 | `@spartacus/organization/administration/core` | `feature-libs/organization/administration/core/guards/user.guard.ts:L17-L38` |

## Tabella 2 — Funzioni guard (`CanActivateFn` & co.)

Nessuna `const`/`function` tipizzata `CanActivateFn`/`CanActivateChildFn`/`CanDeactivateFn`/`CanMatchFn` trovata in ambito. `CanActivateFn` compare solo come tipo nell'infrastruttura (es. `BEFORE_CMS_PAGE_GUARD`, `CmsRoutesImplService`, `GuardsComposer`).

Occorrenze del tipo (non commenti): `core-libs/storefront/cms-structure/guards/before-cms-page-guard.token.ts:L8-L8` (CanActivateFn), `core-libs/storefront/cms-structure/guards/before-cms-page-guard.token.ts:L23-L23` (CanActivateFn), `core-libs/storefront/cms-structure/services/cms-routes-impl.service.ts:L10-L10` (CanActivateFn), `core-libs/storefront/cms-structure/services/cms-routes-impl.service.ts:L165-L165` (CanActivateFn), `core-libs/storefront/cms-structure/services/cms-routes-impl.service.ts:L179-L179` (CanActivateFn), `core-libs/storefront/cms-structure/services/guards-composer.ts:L9-L9` (CanActivateFn), `core-libs/storefront/cms-structure/services/guards-composer.ts:L19-L19` (CanActivateFn)
