# Appendice A06 — HTTP interceptor

> Generata da `tools/extract2/a06_interceptors.py` allo SHA 5b7a1c2b. Non modificare a mano: rigenerare.

Tabella 1: classi che dichiarano `implements HttpInterceptor`, o che definiscono a primo livello un metodo `intercept()`, o che estendono (ricorsivamente) una di queste. La colonna "Registrazioni" rimanda alla tabella 2 (numero di provider `HTTP_INTERCEPTORS` con quella classe come `useExisting`/`useClass`).

Tabella 2: ogni object literal provider con `provide: HTTP_INTERCEPTORS`. "Contenitore" è la dichiarazione top-level che lo contiene (es. `const interceptors: Provider[]` poi importata da un modulo, o la classe `@NgModule`). L'ordine di registrazione determina l'ordine della catena: vedi i capitoli sul modulo HTTP.

## Conteggi

- Classi interceptor (righe tabella 1): **22**
- di cui con `implements HttpInterceptor`: **22**
- di cui solo con metodo `intercept()` senza `implements`: **0**
- di cui solo per ereditarietà: **0**
- Registrazioni `{ provide: HTTP_INTERCEPTORS, ... }` (righe tabella 2): **22**
- Classi interceptor senza registrazione `HTTP_INTERCEPTORS` in ambito: **0**
- Interceptor funzionali (`HttpInterceptorFn` / `withInterceptors`): **0**

## Come rigenerare

```bash
cd docs/spartacus-book
python3 tools/extract2/a06_interceptors.py
# oppure tutte le appendici: bash tools/extract2/run_all.sh
```

Ambito: `git ls-files core-libs feature-libs integration-libs | grep '\.ts$' | grep -vE '\.spec\.ts$|/testing/|\.mock\.ts$|/schematics/'`. La colonna "Libreria" è l'entry point npm ricavato dal `package.json`/`ng-package.json` più vicino.

## Tabella 1 — Classi interceptor

| # | Classe | `implements HttpInterceptor` | `intercept()` proprio | Classe padre | Registrazioni | Libreria | Riferimento |
|---|---|---|---|---|---|---|---|
| 1 | `AnonymousConsentsInterceptor` | sì | sì |  | 1 | `@spartacus/core` | `core-libs/core/src/anonymous-consents/http-interceptors/anonymous-consents-interceptor.ts:L28-L136` |
| 2 | `AuthInterceptor` | sì | sì |  | 1 | `@spartacus/core` | `core-libs/core/src/auth/user-auth/http-interceptors/auth.interceptor.ts:L25-L111` |
| 3 | `BlobErrorInterceptor` | sì | sì |  | 1 | `@spartacus/organization/account-summary/root` | `feature-libs/organization/account-summary/root/http-interceptors/blob-error.interceptor.ts:L23-L57` |
| 4 | `CheckoutCartInterceptor` | sì | sì |  | 1 | `@spartacus/checkout/base/root` | `feature-libs/checkout/base/root/http-interceptors/checkout-cart.interceptor.ts:L27-L95` |
| 5 | `ClientTokenInterceptor` | sì | sì |  | 1 | `@spartacus/core` | `core-libs/core/src/auth/client-auth/http-interceptors/client-token.interceptor.ts:L32-L112` |
| 6 | `CmsTicketInterceptor` | sì | sì |  | 1 | `@spartacus/smartedit/root` | `feature-libs/smartedit/root/http-interceptors/cms-ticket.interceptor.ts:L20-L73` |
| 7 | `ConsentReferenceInterceptor` | sì | sì |  | 1 | `@spartacus/cds` | `integration-libs/cds/src/profiletag/http-interceptors/consent-reference-interceptor.ts:L19-L46` |
| 8 | `DebugInterceptor` | sì | sì |  | 1 | `@spartacus/cds` | `integration-libs/cds/src/profiletag/http-interceptors/debug-interceptor.ts:L19-L42` |
| 9 | `HttpErrorHandlerInterceptor` | sì | sì |  | 1 | `@spartacus/core` | `core-libs/core/src/error-handling/http-error-handler/http-error-handler.interceptor.ts:L41-L99` |
| 10 | `HttpErrorInterceptor` | sì | sì |  | 1 | `@spartacus/core` | `core-libs/core/src/global-message/http-interceptors/http-error.interceptor.ts:L23-L66` |
| 11 | `HttpTimeoutInterceptor` | sì | sì |  | 1 | `@spartacus/core` | `core-libs/core/src/http/http-timeout/http-timeout.interceptor.ts:L27-L125` |
| 12 | `OccOppsCouponCodesInterceptor` | sì | sì |  | 1 | `@spartacus/opps/root` | `integration-libs/opps/root/coupon-codes/http-interceptors/occ-opps-coupon-codes.interceptor.ts:L20-L65` |
| 13 | `OccPersonalizationIdInterceptor` | sì | sì |  | 1 | `@spartacus/tracking/personalization/root` | `feature-libs/tracking/personalization/root/http-interceptors/occ-personalization-id.interceptor.ts:L21-L99` |
| 14 | `OccPersonalizationTimeInterceptor` | sì | sì |  | 1 | `@spartacus/tracking/personalization/root` | `feature-libs/tracking/personalization/root/http-interceptors/occ-personalization-time.interceptor.ts:L21-L99` |
| 15 | `OccSegmentRefsInterceptor` | sì | sì |  | 1 | `@spartacus/segment-refs/root` | `integration-libs/segment-refs/root/http-interceptors/occ-segment-refs.interceptor.ts:L19-L87` |
| 16 | `OpfGiftCardPaymentApiInterceptor` | sì | sì |  | 1 | `@spartacus/opf/gift-card/root` | `integration-libs/opf/gift-card/root/http-interceptors/opf-gift-card-payment-api.interceptor.ts:L33-L66` |
| 17 | `PunchoutCartInterceptor` | sì | sì |  | 1 | `@spartacus/punchout/root` | `integration-libs/punchout/root/interceptors/punchout-cart.interceptor.ts:L23-L50` |
| 18 | `SiteContextInterceptor` | sì | sì |  | 2 | `@spartacus/core` | `core-libs/core/src/occ/adapters/site-context/site-context.interceptor.ts:L26-L69` |
| 19 | `SiteContextInterceptor` | sì | sì |  | 2 | `@spartacus/asm/customer-360/root` | `feature-libs/asm/customer-360/root/interceptors/site-context.interceptor.ts:L26-L73` |
| 20 | `TokenRevocationInterceptor` | sì | sì |  | 1 | `@spartacus/core` | `core-libs/core/src/auth/user-auth/http-interceptors/token-revocation.interceptor.ts:L23-L59` |
| 21 | `UserIdHttpHeaderInterceptor` | sì | sì |  | 1 | `@spartacus/asm/root` | `feature-libs/asm/root/interceptors/user-id-http-header.interceptor.ts:L30-L85` |
| 22 | `WithCredentialsInterceptor` | sì | sì |  | 1 | `@spartacus/core` | `core-libs/core/src/occ/interceptors/with-credentials.interceptor.ts:L21-L53` |

## Tabella 2 — Registrazioni `HTTP_INTERCEPTORS`

| # | Classe registrata | Importata da | Modalità | `multi` | Contenitore | Libreria | Riferimento |
|---|---|---|---|---|---|---|---|
| 1 | `AnonymousConsentsInterceptor` | `./anonymous-consents-interceptor` | `useExisting` | `true` | `interceptors` | `@spartacus/core` | `core-libs/core/src/anonymous-consents/http-interceptors/index.ts:L12-L16` |
| 2 | `ClientTokenInterceptor` | `./client-token.interceptor` | `useExisting` | `true` | `interceptors` | `@spartacus/core` | `core-libs/core/src/auth/client-auth/http-interceptors/index.ts:L12-L16` |
| 3 | `AuthInterceptor` | `./auth.interceptor` | `useExisting` | `true` | `interceptors` | `@spartacus/core` | `core-libs/core/src/auth/user-auth/http-interceptors/index.ts:L13-L17` |
| 4 | `TokenRevocationInterceptor` | `./token-revocation.interceptor` | `useExisting` | `true` | `interceptors` | `@spartacus/core` | `core-libs/core/src/auth/user-auth/http-interceptors/index.ts:L18-L22` |
| 5 | `HttpErrorHandlerInterceptor` | `./http-error-handler.interceptor` | `useExisting` | `true` | `HttpErrorHandlerModule` | `@spartacus/core` | `core-libs/core/src/error-handling/http-error-handler/http-error-handler.module.ts:L17-L21` |
| 6 | `HttpErrorInterceptor` | `./http-error.interceptor` | `useExisting` | `true` | `httpErrorInterceptors` | `@spartacus/core` | `core-libs/core/src/global-message/http-interceptors/index.ts:L66-L70` |
| 7 | `HttpTimeoutInterceptor` | `./http-timeout.interceptor` | `useExisting` | `true` | `HttpTimeoutModule` | `@spartacus/core` | `core-libs/core/src/http/http-timeout/http-timeout.module.ts:L15-L19` |
| 8 | `SiteContextInterceptor` | `./site-context.interceptor` | `useExisting` | `true` | `SiteContextOccModule` | `@spartacus/core` | `core-libs/core/src/occ/adapters/site-context/site-context-occ.module.ts:L26-L30` |
| 9 | `WithCredentialsInterceptor` | `./interceptors/with-credentials.interceptor` | `useExisting` | `true` | `BaseOccModule` | `@spartacus/core` | `core-libs/core/src/occ/base-occ.module.ts:L25-L29` |
| 10 | `SiteContextInterceptor` | `./interceptors/site-context.interceptor` | `useExisting` | `true` | `AsmCustomer360RootModule` | `@spartacus/asm/customer-360/root` | `feature-libs/asm/customer-360/root/asm-customer-360-root.module.ts:L29-L33` |
| 11 | `UserIdHttpHeaderInterceptor` | `./interceptors/user-id-http-header.interceptor` | `useExisting` | `true` | `AsmRootModule` | `@spartacus/asm/root` | `feature-libs/asm/root/asm-root.module.ts:L88-L92` |
| 12 | `CheckoutCartInterceptor` | `./checkout-cart.interceptor` | `useExisting` | `true` | `interceptors` | `@spartacus/checkout/base/root` | `feature-libs/checkout/base/root/http-interceptors/index.ts:L12-L16` |
| 13 | `BlobErrorInterceptor` | `./http-interceptors/blob-error.interceptor` | `useExisting` | `true` | `AccountSummaryRootModule` | `@spartacus/organization/account-summary/root` | `feature-libs/organization/account-summary/root/account-summary-root.module.ts:L52-L56` |
| 14 | `CmsTicketInterceptor` | `./cms-ticket.interceptor` | `useExisting` | `true` | `interceptors` | `@spartacus/smartedit/root` | `feature-libs/smartedit/root/http-interceptors/index.ts:L12-L16` |
| 15 | `OccPersonalizationIdInterceptor` | `./occ-personalization-id.interceptor` | `useExisting` | `true` | `interceptors` | `@spartacus/tracking/personalization/root` | `feature-libs/tracking/personalization/root/http-interceptors/index.ts:L14-L18` |
| 16 | `OccPersonalizationTimeInterceptor` | `./occ-personalization-time.interceptor` | `useExisting` | `true` | `interceptors` | `@spartacus/tracking/personalization/root` | `feature-libs/tracking/personalization/root/http-interceptors/index.ts:L19-L23` |
| 17 | `ConsentReferenceInterceptor` | `./http-interceptors/consent-reference-interceptor` | `useExisting` | `true` | `ProfileTagModule` | `@spartacus/cds` | `integration-libs/cds/src/profiletag/profile-tag.module.ts:L19-L23` |
| 18 | `DebugInterceptor` | `./http-interceptors/debug-interceptor` | `useExisting` | `true` | `ProfileTagModule` | `@spartacus/cds` | `integration-libs/cds/src/profiletag/profile-tag.module.ts:L24-L24` |
| 19 | `OpfGiftCardPaymentApiInterceptor` | `./http-interceptors` | `useClass` | `true` | `OpfGiftCardRootModule` | `@spartacus/opf/gift-card/root` | `integration-libs/opf/gift-card/root/opf-gift-card-root.module.ts:L57-L61` |
| 20 | `OccOppsCouponCodesInterceptor` | `./occ-opps-coupon-codes.interceptor` | `useExisting` | `true` | `oppsCouponCodesInterceptors` | `@spartacus/opps/root` | `integration-libs/opps/root/coupon-codes/http-interceptors/index.ts:L12-L16` |
| 21 | `PunchoutCartInterceptor` | `./punchout-cart.interceptor` | `useExisting` | `true` | `interceptors` | `@spartacus/punchout/root` | `integration-libs/punchout/root/interceptors/index.ts:L12-L16` |
| 22 | `OccSegmentRefsInterceptor` | `./occ-segment-refs.interceptor` | `useExisting` | `true` | `segmentRefsInterceptors` | `@spartacus/segment-refs/root` | `integration-libs/segment-refs/root/http-interceptors/index.ts:L12-L16` |

### Classi senza registrazione diretta in ambito

Classi base astratte/estese, interceptor registrati altrove (es. app) o non registrati: —

## Tabella 3 — Interceptor funzionali

Nessuna occorrenza di `HttpInterceptorFn` o `withInterceptors(` (esclusi commenti) in ambito: tutti gli interceptor Spartacus sono class-based e registrati via `HTTP_INTERCEPTORS`.
