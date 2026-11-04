# Appendice A01 - InjectionToken

> Generata da `tools/extract/a01-injection-tokens.js` allo SHA 5b7a1c2b (`5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`). Non modificare a mano.
>
> Righe di tabella: **219**.
>
> Rigenerazione: `cd docs/spartacus-book/tools/extract && npm install && node a01-injection-tokens.js`
>
> Colonna *public API*: `sì` se la `const` è raggiungibile (anche via `export *`) dall'`entryFile` di almeno un `ng-package.json` (risoluzione ts-morph `getExportedDeclarations`). *export*: la `const` ha la keyword `export` nel file. Ambito: file `.ts` tracciati in core-libs, feature-libs, integration-libs esclusi spec, testing, mock e schematics.

## Conteggi per libreria

| Libreria | Token |
|---|---:|
| @spartacus/asm | 4 |
| @spartacus/cart | 13 |
| @spartacus/cdc | 1 |
| @spartacus/cds | 1 |
| @spartacus/checkout | 5 |
| @spartacus/core | 68 |
| @spartacus/customer-ticketing | 7 |
| @spartacus/digital-payments | 2 |
| @spartacus/epd-visualization | 2 |
| @spartacus/opf | 9 |
| @spartacus/order | 14 |
| @spartacus/organization | 29 |
| @spartacus/pdf-invoices | 1 |
| @spartacus/pickup-in-store | 3 |
| @spartacus/product | 2 |
| @spartacus/product-configurator | 20 |
| @spartacus/punchout | 2 |
| @spartacus/quote | 7 |
| @spartacus/setup | 4 |
| @spartacus/storefinder | 3 |
| @spartacus/storefront | 10 |
| @spartacus/user | 12 |
| **Totale** | **219** (public API: 186) |

## Elenco

| # | Nome const | Descrizione (stringa) | Tipo generico | Libreria | export | public API | Riferimento |
|---:|---|---|---|---|---|---|---|
| 1 | `ASM_CUSTOMER_360_NORMALIZER` | `AsmCustomer360Normalizer` | `Converter<any, AsmCustomer360Response>` | @spartacus/asm | sì | sì | `feature-libs/asm/customer-360/core/connectors/converters.ts:L11-L13` |
| 2 | `CUSTOMER_LISTS_NORMALIZER` | `CustomerListsNormalizer` | `Converter<any, CustomerListsPage>` | @spartacus/asm | sì | sì | `feature-libs/asm/core/connectors/converters.ts:L15-L17` |
| 3 | `CUSTOMER_SEARCH_PAGE_NORMALIZER` | `CustomerSearchPageNormalizer` | `Converter<any, CustomerSearchPage>` | @spartacus/asm | sì | sì | `feature-libs/asm/core/connectors/converters.ts:L11-L13` |
| 4 | `reducerToken` | `AsmReducers` | `ActionReducerMap<AsmState>` | @spartacus/asm | sì | no | `feature-libs/asm/core/store/reducers/index.ts:L36-L37` |
| 5 | `ActiveCartOrderEntriesContextToken` | `ActiveCartOrderEntriesContext` |  | @spartacus/cart | sì | sì | `feature-libs/cart/base/root/tokens/context.ts:L9-L11` |
| 6 | `CART_ACCESS_CODE_NORMALIZER` | `CartAccessCodeNormalizer` | `Converter<any, string>` | @spartacus/cart | sì | sì | `feature-libs/cart/base/core/connectors/access-code/converters.ts:L10-L12` |
| 7 | `CART_GUEST_USER_NORMALIZER` | `CartGuestUserNormalizer` | `Converter<any, CartGuestUser>` | @spartacus/cart | sì | sì | `feature-libs/cart/base/core/connectors/guest-user/converters.ts:L11-L13` |
| 8 | `CART_MODIFICATION_NORMALIZER` | `CartModificationNormalizer` | `Converter<any, CartModification>` | @spartacus/cart | sì | sì | `feature-libs/cart/base/root/tokens/converters.ts:L25-L27` |
| 9 | `CART_NORMALIZER` | `CartNormalizer` | `Converter<any, Cart>` | @spartacus/cart | sì | sì | `feature-libs/cart/base/root/tokens/converters.ts:L17-L19` |
| 10 | `CART_VALIDATION_NORMALIZER` | `CartValidationNormalizer` | `Converter<any, CartModificationList>` | @spartacus/cart | sì | sì | `feature-libs/cart/base/core/connectors/validation/converters.ts:L11-L13` |
| 11 | `CART_VOUCHER_NORMALIZER` | `CartVoucherNormalizer` | `Converter<any, Voucher>` | @spartacus/cart | sì | sì | `feature-libs/cart/base/root/tokens/converters.ts:L33-L35` |
| 12 | `multiCartReducerToken` | `MultiCartReducers` | `ActionReducerMap<MultiCartState>` | @spartacus/cart | sì | no | `feature-libs/cart/base/core/store/reducers/index.ts:L30-L32` |
| 13 | `NewSavedCartOrderEntriesContextToken` | `NewSavedCartOrderEntriesContext` |  | @spartacus/cart | sì | sì | `feature-libs/cart/saved-cart/root/tokens/context.ts:L13-L15` |
| 14 | `ORDER_ENTRY_PROMOTIONS_NORMALIZER` | `OrderEntryPromotionsNormalizer` | `Converter<any, PromotionResult[]>` | @spartacus/cart | sì | sì | `feature-libs/cart/base/root/tokens/converters.ts:L21-L23` |
| 15 | `QuickOrderOrderEntriesContextToken` | `QuickOrderOrderEntriesContext` |  | @spartacus/cart | sì | sì | `feature-libs/cart/quick-order/root/tokens/context.ts:L9-L11` |
| 16 | `SAVE_CART_NORMALIZER` | `SaveCartNormalizer` | `Converter<any, SaveCartResult>` | @spartacus/cart | sì | sì | `feature-libs/cart/base/root/tokens/converters.ts:L29-L31` |
| 17 | `SavedCartOrderEntriesContextToken` | `SavedCartOrderEntriesContext` |  | @spartacus/cart | sì | sì | `feature-libs/cart/saved-cart/root/tokens/context.ts:L9-L11` |
| 18 | `CDC_PREFERENCE_SERIALIZER` | `CdcPreferenceSerializer` | `Converter<CdcConsent[], any>` | @spartacus/cdc | sì | sì | `integration-libs/cdc/root/consent-management/converters/converter.ts:L11-L13` |
| 19 | `LOGIN_EVENTS` | `LOGIN_EVENTS` | `Observable<LoginEventEnvelope>` | @spartacus/cds | sì | no | `integration-libs/cds/src/profiletag/tokens/login-events.token.ts:L20-L22` |
| 20 | `CHECKOUT_NORMALIZER` | `CheckoutNormalizer` | `Converter<any, CheckoutState>` | @spartacus/checkout | sì | sì | `feature-libs/checkout/base/core/connectors/checkout/converters.ts:L11-L13` |
| 21 | `CHECKOUT_PAYMENT_TYPE_NORMALIZER` | `CheckoutPaymentTypeNormalizer` | `Converter<any, PaymentType>` | @spartacus/checkout | sì | sì | `feature-libs/checkout/b2b/core/connectors/checkout-payment-type/converters.ts:L11-L13` |
| 22 | `DELIVERY_MODE_NORMALIZER` | `DeliveryModeNormalizer` | `Converter<any, DeliveryMode>` | @spartacus/checkout | sì | sì | `feature-libs/checkout/base/core/connectors/checkout-delivery-modes/converters.ts:L11-L13` |
| 23 | `PAYMENT_CARD_TYPE_NORMALIZER` | `PaymentCardTypeNormalizer` | `Converter<any, CardType>` | @spartacus/checkout | sì | sì | `feature-libs/checkout/base/core/connectors/checkout-payment/converters.ts:L14-L16` |
| 24 | `PAYMENT_DETAILS_SERIALIZER` | `PaymentDetailsSerializer` | `Converter<PaymentDetails, any>` | @spartacus/checkout | sì | sì | `feature-libs/checkout/base/core/connectors/checkout-payment/converters.ts:L10-L12` |
| 25 | `ADDRESS_LIST_NORMALIZER` | `AddressesNormalizer` | `Converter<any, EntitiesModel<Address>>` | @spartacus/core | sì | sì | `core-libs/core/src/user/connectors/address/converters.ts:L16-L18` |
| 26 | `ADDRESS_NORMALIZER` | `AddressNormalizer` | `Converter<any, Address>` | @spartacus/core | sì | sì | `core-libs/core/src/user/connectors/address/converters.ts:L12-L14` |
| 27 | `ADDRESS_SERIALIZER` | `AddressSerializer` | `Converter<Address, any>` | @spartacus/core | sì | sì | `core-libs/core/src/user/connectors/address/converters.ts:L20-L22` |
| 28 | `ADDRESS_VALIDATION_NORMALIZER` | `AddressValidationNormalizer` | `Converter<any, AddressValidation>` | @spartacus/core | sì | sì | `core-libs/core/src/user/connectors/address/converters.ts:L24-L26` |
| 29 | `ANONYMOUS_CONSENT_NORMALIZER` | `AnonymousConsentNormalizer` | `Converter<string, AnonymousConsent[]>` | @spartacus/core | sì | sì | `core-libs/core/src/anonymous-consents/connectors/converters.ts:L11-L13` |
| 30 | `BASE_SITE_NORMALIZER` | `BaseSiteNormalizer` | `Converter<any, BaseSite>` | @spartacus/core | sì | sì | `core-libs/core/src/site-context/connectors/converters.ts:L36-L38` |
| 31 | `CITY_DISTRICT_NORMALIZER` | `CityDistrictNormalizer` | `Converter<any, CityDistrict>` | @spartacus/core | sì | sì | `core-libs/core/src/site-context/connectors/converters.ts:L32-L34` |
| 32 | `CITY_NORMALIZER` | `CityNormalizer` | `Converter<any, City>` | @spartacus/core | sì | sì | `core-libs/core/src/site-context/connectors/converters.ts:L28-L30` |
| 33 | `CMS_COMPONENT_NORMALIZER` | `CmsComponentNormalizer` | `Converter<any, CmsComponent>` | @spartacus/core | sì | sì | `core-libs/core/src/cms/connectors/component/converters.ts:L11-L13` |
| 34 | `CMS_PAGE_NORMALIZER` | `CmsPageNormalizer` | `Converter<any, CmsStructureModel>` | @spartacus/core | sì | sì | `core-libs/core/src/cms/connectors/page/converters.ts:L11-L13` |
| 35 | `CONFIG_INITIALIZER` | `ConfigInitializer` | `ConfigInitializer \| null` | @spartacus/core | sì | sì | `core-libs/core/src/config/config-initializer/config-initializer.ts:L33-L35` |
| 36 | `CONFIG_INITIALIZER_FORROOT_GUARD` | `CONFIG_INITIALIZER_FORROOT_GUARD` | `void` | @spartacus/core | sì | no | `core-libs/core/src/config/config-initializer/config-initializer.ts:L37-L39` |
| 37 | `ConfigChunk` | `ConfigurationChunk` | `Config[]` | @spartacus/core | sì | sì | `core-libs/core/src/config/config-tokens.ts:L53-L53` |
| 38 | `ConfigValidatorToken` | `ConfigurationValidator` |  | @spartacus/core | sì | sì | `core-libs/core/src/config/config-validator/config-validator.ts:L11-L13` |
| 39 | `CONSENT_TEMPLATE_NORMALIZER` | `ConsentTemplateNormalizer` | `Converter<any, ConsentTemplate>` | @spartacus/core | sì | sì | `core-libs/core/src/user/connectors/consent/converters.ts:L11-L13` |
| 40 | `COST_CENTER_NORMALIZER` | `CostCenterNormalizer` | `Converter<any, CostCenter>` | @spartacus/core | sì | sì | `core-libs/core/src/cost-center/connectors/cost-center/converters.ts:L12-L14` |
| 41 | `COST_CENTER_SERIALIZER` | `CostCenterSerializer` | `Converter<CostCenter, any>` | @spartacus/core | sì | sì | `core-libs/core/src/cost-center/connectors/cost-center/converters.ts:L20-L22` |
| 42 | `COST_CENTERS_NORMALIZER` | `CostCentersListNormalizer` | `Converter<any, EntitiesModel<CostCenter>>` | @spartacus/core | sì | sì | `core-libs/core/src/cost-center/connectors/cost-center/converters.ts:L16-L18` |
| 43 | `COUNTRY_NORMALIZER` | `CountryNormalizer` | `Converter<any, Country>` | @spartacus/core | sì | sì | `core-libs/core/src/site-context/connectors/converters.ts:L20-L22` |
| 44 | `CURRENCY_NORMALIZER` | `CurrencyNormalizer` | `Converter<any, Currency>` | @spartacus/core | sì | sì | `core-libs/core/src/site-context/connectors/converters.ts:L16-L18` |
| 45 | `CUSTOMER_COUPON_SEARCH_RESULT_NORMALIZER` | `CustomerCouponSearchResultNormalizer` | `Converter<any, CustomerCouponSearchResult>` | @spartacus/core | sì | sì | `core-libs/core/src/user/connectors/customer-coupon/converters.ts:L11-L13` |
| 46 | `DEFAULT_AUTH_HTTP_HEADER_SERVICE` | `DEFAULT_AUTH_HTTP_HEADER_SERVICE` | `AuthHttpHeaderService` | @spartacus/core | sì | sì | `core-libs/core/src/auth/user-auth/services/auth-http-header.service.ts:L55-L71` |
| 47 | `DEFAULT_URL_MATCHER` | `DEFAULT_URL_MATCHER` | `UrlMatcherFactory` | @spartacus/core | sì | sì | `core-libs/core/src/routing/url-matcher/default-url-matcher.ts:L35-L45` |
| 48 | `DefaultConfig` | `DefaultConfiguration` |  | @spartacus/core | sì | sì | `core-libs/core/src/config/config-tokens.ts:L32-L35` |
| 49 | `DefaultConfigChunk` | `DefaultConfigurationChunk` | `Config[]` | @spartacus/core | sì | sì | `core-libs/core/src/config/config-tokens.ts:L60-L62` |
| 50 | `DefaultFeatureToggles` | `DefaultFeatureToggles` | `FeatureToggles` | @spartacus/core | sì | sì | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L33-L43` |
| 51 | `DefaultFeatureTogglesChunk` | `DefaultFeatureTogglesChunk` | `FeatureToggles[]` | @spartacus/core | sì | sì | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L75-L78` |
| 52 | `DELEGATED_AUTH_HTTP_HEADER_SERVICE` | `DELEGATED_AUTH_HTTP_HEADER_SERVICE` | `AuthHttpHeaderService` | @spartacus/core | sì | sì | `core-libs/core/src/auth/user-auth/services/auth-http-header.service.ts:L79-L82` |
| 53 | `EXPIRED_REFRESH_TOKEN_HANDLERS` | `EXPIRED_REFRESH_TOKEN_HANDLERS` | `ExpiredRefreshTokenHandler[]` | @spartacus/core | sì | sì | `core-libs/core/src/auth/user-auth/services/auth-http-header-handler.ts:L21-L23` |
| 54 | `FeatureTogglesChunk` | `FeatureTogglesChunk` | `FeatureToggles[]` | @spartacus/core | sì | sì | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L64-L67` |
| 55 | `I18NEXT_HTTP_BACKEND_CLIENT` | `I18NEXT_HTTP_BACKEND_CLIENT` | `HttpBackendOptions['request']` | @spartacus/core | sì | sì | `core-libs/core/src/i18n/i18next/i18next-backend/i18next-http-backend-client.ts:L16-L44` |
| 56 | `I18NEXT_INSTANCE` | `I18NEXT_INSTANCE` | `i18n` | @spartacus/core | sì | sì | `core-libs/core/src/i18n/i18next/i18next-instance.ts:L19-L22` |
| 57 | `I18NEXT_LOGGER_PLUGIN` | `I18NEXT_LOGGER_PLUGIN` | `LoggerModule` | @spartacus/core | sì | no | `core-libs/core/src/i18n/i18next/i18next-plugins/i18next-logger-plugin.ts:L17-L40` |
| 58 | `LANGUAGE_NORMALIZER` | `LanguageNormalizer` | `Converter<any, Language>` | @spartacus/core | sì | sì | `core-libs/core/src/site-context/connectors/converters.ts:L12-L14` |
| 59 | `LOCATION_INITIALIZED_MULTI` | `MULTI_LOCATION_INITIALIZED` | `LocationInitializer[]` | @spartacus/core | sì | sì | `core-libs/core/src/routing/location-initialized-multi/location-initialized-multi.ts:L36-L38` |
| 60 | `MODULE_INITIALIZER` | `MODULE_INITIALIZER` | `(() => any)[]` | @spartacus/core | sì | sì | `core-libs/core/src/lazy-loading/tokens.ts:L19-L20` |
| 61 | `MULTI_ERROR_HANDLER` | `MULTI_ERROR_HANDLER` | `MultiErrorHandler[]` | @spartacus/core | sì | sì | `core-libs/core/src/error-handling/multi-error-handler/multi-error-handler.ts:L25-L27` |
| 62 | `NOTIFICATION_PREFERENCE_NORMALIZER` | `NotificationPreferenceNormalizer` | `Converter<any, NotificationPreference>` | @spartacus/core | sì | no | `core-libs/core/src/user/connectors/notification-preference/converters.ts:L15-L17` |
| 63 | `NOTIFICATION_PREFERENCE_SERIALIZER` | `NotificationPreferenceSerializer` | `Converter<NotificationPreference[], any>` | @spartacus/core | sì | no | `core-libs/core/src/user/connectors/notification-preference/converters.ts:L11-L13` |
| 64 | `OCC_USER_ID_CONSTANTS` | `List of OCC constants that pass for user IDs.` | `{ [identifier: string]: string; }` | @spartacus/core | sì | sì | `core-libs/core/src/occ/utils/index.ts:L19-L24` |
| 65 | `PAYMENT_DETAILS_NORMALIZER` | `PaymentDetailsNormalizer` | `Converter<any, PaymentDetails>` | @spartacus/core | sì | sì | `core-libs/core/src/checkout/connectors/payment/converters.ts:L11-L13` |
| 66 | `POINT_OF_SERVICE_NORMALIZER` | `PointOfServiceNormalizer` | `Converter<any, PointOfService>` | @spartacus/core | sì | sì | `core-libs/core/src/checkout/connectors/checkout/converters.ts:L11-L13` |
| 67 | `PRODUCT_INTERESTS_NORMALIZER` | `ProductInterestsNormalizer` | `Converter<any, ProductInterestSearchResult>` | @spartacus/core | sì | sì | `core-libs/core/src/user/connectors/interests/converters.ts:L11-L13` |
| 68 | `PRODUCT_NORMALIZER` | `ProductNormalizer` | `Converter<any, Product>` | @spartacus/core | sì | sì | `core-libs/core/src/product/connectors/product/converters.ts:L11-L13` |
| 69 | `PRODUCT_REFERENCES_NORMALIZER` | `ProductReferencesListNormalizer` | `Converter<any, ProductReference[]>` | @spartacus/core | sì | sì | `core-libs/core/src/product/connectors/references/converters.ts:L11-L13` |
| 70 | `PRODUCT_REVIEW_NORMALIZER` | `ProductReviewNormalizer` | `Converter<any, Review>` | @spartacus/core | sì | sì | `core-libs/core/src/product/connectors/reviews/converters.ts:L11-L13` |
| 71 | `PRODUCT_REVIEW_SERIALIZER` | `ProductReviewSerializer` | `Converter<Review, any>` | @spartacus/core | sì | sì | `core-libs/core/src/product/connectors/reviews/converters.ts:L15-L17` |
| 72 | `PRODUCT_SEARCH_PAGE_NORMALIZER` | `ProductSearchPageNormalizer` | `Converter<any, ProductSearchPage>` | @spartacus/core | sì | sì | `core-libs/core/src/product/connectors/search/converters.ts:L14-L16` |
| 73 | `PRODUCT_SUGGESTION_NORMALIZER` | `ProductSuggestionNormalizer` | `Converter<any, Suggestion>` | @spartacus/core | sì | sì | `core-libs/core/src/product/connectors/search/converters.ts:L18-L20` |
| 74 | `reducerToken` | `AnonymousConsentsReducers` | `ActionReducerMap<AnonymousConsentsState>` | @spartacus/core | sì | no | `core-libs/core/src/anonymous-consents/store/reducers/index.ts:L38-L42` |
| 75 | `reducerToken` | `ClientAuthReducers` | `ActionReducerMap<ClientAuthState>` | @spartacus/core | sì | no | `core-libs/core/src/auth/client-auth/store/reducers/index.ts:L19-L20` |
| 76 | `reducerToken` | `CmsReducers` | `ActionReducerMap<CmsState>` | @spartacus/core | sì | no | `core-libs/core/src/cms/store/reducers/index.ts:L67-L68` |
| 77 | `reducerToken` | `GlobalMessageReducers` | `ActionReducer<GlobalMessageState>` | @spartacus/core | sì | no | `core-libs/core/src/global-message/store/reducers/index.ts:L16-L19` |
| 78 | `reducerToken` | `ProcessReducers` | `ActionReducerMap<EntityLoaderState<any>>` | @spartacus/core | sì | no | `core-libs/core/src/process/store/reducers/index.ts:L17-L21` |
| 79 | `reducerToken` | `ProductReducers` | `ActionReducerMap<ProductsState>` | @spartacus/core | sì | no | `core-libs/core/src/product/store/reducers/index.ts:L37-L38` |
| 80 | `reducerToken` | `RouterReducers` | `ActionReducerMap<State>` | @spartacus/core | sì | no | `core-libs/core/src/routing/store/reducers/router.reducer.ts:L97-L98` |
| 81 | `reducerToken` | `SiteContextReducers` | `ActionReducerMap<SiteContextState>` | @spartacus/core | sì | no | `core-libs/core/src/site-context/store/reducers/index.ts:L22-L23` |
| 82 | `reducerToken` | `SiteThemeReducers` | `ActionReducerMap<SiteThemeState>` | @spartacus/core | sì | no | `core-libs/core/src/site-theme/store/reducers/index.ts:L19-L20` |
| 83 | `reducerToken` | `UserReducers` | `ActionReducerMap<UserState>` | @spartacus/core | sì | no | `core-libs/core/src/user/store/reducers/index.ts:L91-L92` |
| 84 | `REGION_NORMALIZER` | `RegionNormalizer` | `Converter<any, Region>` | @spartacus/core | sì | sì | `core-libs/core/src/site-context/connectors/converters.ts:L24-L26` |
| 85 | `RootConfig` | `RootConfiguration` |  | @spartacus/core | sì | sì | `core-libs/core/src/config/config-tokens.ts:L44-L47` |
| 86 | `RootFeatureToggles` | `RootFeatureToggles` | `FeatureToggles` | @spartacus/core | sì | sì | `core-libs/core/src/features-config/feature-toggles/feature-toggles-tokens.ts:L48-L58` |
| 87 | `SERVER_REQUEST_ORIGIN` | `SERVER_REQUEST_ORIGIN` | `string` | @spartacus/core | sì | sì | `core-libs/core/src/util/ssr.tokens.ts:L19-L21` |
| 88 | `SERVER_REQUEST_URL` | `SERVER_REQUEST_URL` | `string` | @spartacus/core | sì | sì | `core-libs/core/src/util/ssr.tokens.ts:L12-L14` |
| 89 | `TEST_CONFIG` | `TEST_CONFIG` | `any` | @spartacus/core | sì | sì | `core-libs/core/src/config/test-config.module.ts:L42-L55` |
| 90 | `TEST_CONFIG_COOKIE_NAME` | `TEST_CONFIG_COOKIE_NAME` | `string` | @spartacus/core | sì | sì | `core-libs/core/src/config/test-config.module.ts:L31-L33` |
| 91 | `TRANSFER_STATE_META_REDUCER` | `TransferStateMetaReducer` |  | @spartacus/core | sì | no | `core-libs/core/src/state/reducers/index.ts:L23-L25` |
| 92 | `USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT` | `USE_AUTHORIZATION_CODE_FLOW_BY_DEFAULT` | `boolean` | @spartacus/core | sì | sì | `core-libs/core/src/auth/user-auth/config/default-auth-config.ts:L15-L19` |
| 93 | `CUSTOMER_TICKETING_ASSOCIATED_OBJECTS_NORMALIZER` | `CustomerTicketingAssociatedObjectsNormalizer` | `Converter<any, AssociatedObject>` | @spartacus/customer-ticketing | sì | sì | `feature-libs/customer-ticketing/core/connectors/converters.ts:L38-L41` |
| 94 | `CUSTOMER_TICKETING_CATEGORY_NORMALIZER` | `CustomerTicketingCategoryNormalizer` | `Converter<any, Category>` | @spartacus/customer-ticketing | sì | sì | `feature-libs/customer-ticketing/core/connectors/converters.ts:L34-L36` |
| 95 | `CUSTOMER_TICKETING_CREATE_NORMALIZER` | `CustomerTicketingCreateNormalizer` | `Converter<any, TicketStarter>` | @spartacus/customer-ticketing | sì | sì | `feature-libs/customer-ticketing/core/connectors/converters.ts:L43-L45` |
| 96 | `CUSTOMER_TICKETING_DETAILS_NORMALIZER` | `CustomerTicketingDetailsNormalizer` | `Converter<any, TicketDetails>` | @spartacus/customer-ticketing | sì | sì | `feature-libs/customer-ticketing/core/connectors/converters.ts:L18-L20` |
| 97 | `CUSTOMER_TICKETING_EVENT_NORMALIZER` | `CustomerTicketingEventNormalizer` | `Converter<any, TicketEvent>` | @spartacus/customer-ticketing | sì | sì | `feature-libs/customer-ticketing/core/connectors/converters.ts:L22-L24` |
| 98 | `CUSTOMER_TICKETING_FILE_NORMALIZER` | `CustomerTicketingFileNormalizer` | `Converter<any, File>` | @spartacus/customer-ticketing | sì | sì | `feature-libs/customer-ticketing/core/connectors/converters.ts:L26-L28` |
| 99 | `CUSTOMER_TICKETING_LIST_NORMALIZER` | `CustomerTicketingListNormalizer` | `Converter<any, TicketList>` | @spartacus/customer-ticketing | sì | sì | `feature-libs/customer-ticketing/core/connectors/converters.ts:L30-L32` |
| 100 | `DP_DETAILS_NORMALIZER` | `DpDetailsNormalizer` | `Converter<any, PaymentDetails>` | @spartacus/digital-payments | sì | no | `integration-libs/digital-payments/src/checkout/adapters/converters.ts:L11-L13` |
| 101 | `DP_REQUEST_NORMALIZER` | `DpRequestNormalizer` | `Converter<any, DpPaymentRequest>` | @spartacus/digital-payments | sì | no | `integration-libs/digital-payments/src/checkout/adapters/converters.ts:L15-L17` |
| 102 | `LOOKUP_VISUALIZATIONS_RESPONSE_NORMALIZER` | `LookupVisualizationsResponseNormalizer` | `Converter<any, LookupVisualizationsResponse>` | @spartacus/epd-visualization | sì | sì | `integration-libs/epd-visualization/core/connectors/visualization/converters.ts:L14-L16` |
| 103 | `NODES_RESPONSE_NORMALIZER` | `NodesResponseNormalizer` | `Converter<any, NodesResponse>` | @spartacus/epd-visualization | sì | sì | `integration-libs/epd-visualization/core/connectors/scene/converters.ts:L14-L16` |
| 104 | `OPF_ACTIVE_CONFIGURATIONS_NORMALIZER` | `OpfActiveConfigurationsNormalizer` | `Converter<any, OpfActiveConfigurationsResponse>` | @spartacus/opf | sì | sì | `integration-libs/opf/base/core/tokens/tokens.ts:L11-L13` |
| 105 | `OPF_AFTER_REDIRECT_SCRIPTS_NORMALIZER` | `OpfAfterRedirectScriptsNormalizer` | `Converter<any, OpfPaymentAfterRedirectScriptResponse>` | @spartacus/opf | sì | sì | `integration-libs/opf/payment/core/tokens/tokens.ts:L28-L30` |
| 106 | `OPF_APPLE_PAY_WEB_SESSION_NORMALIZER` | `OpfApplePayWebSession` | `Converter<any, ApplePaySessionVerificationResponse>` | @spartacus/opf | sì | sì | `integration-libs/opf/quick-buy/core/tokens/tokens.ts:L11-L13` |
| 107 | `OPF_CTA_SCRIPTS_NORMALIZER` | `OpfCtaScriptsNormalizer` | `Converter<any, OpfCtaScriptsResponse>` | @spartacus/opf | sì | sì | `integration-libs/opf/cta/core/tokens/tokens.ts:L11-L13` |
| 108 | `OPF_GET_CART_USER_EMAIL_NORMALIZER` | `OpfGetCartUserEmailNormalizer` | `Converter<any, CartUserEmailResponse>` | @spartacus/opf | sì | no | `integration-libs/opf/checkout/root/tokens/tokens.ts:L11-L13` |
| 109 | `OPF_PAYMENT_CONFIG_SERIALIZER` | `OpfPaymentConfigSerializer` | `Converter<OpfPaymentInitiationConfig, any>` | @spartacus/opf | sì | sì | `integration-libs/opf/payment/core/connectors/converters.ts:L11-L13` |
| 110 | `OPF_PAYMENT_SUBMIT_COMPLETE_NORMALIZER` | `OpfPaymentSubmitCompleteNormalizer` | `Converter<any, OpfPaymentSubmitCompleteResponse>` | @spartacus/opf | sì | sì | `integration-libs/opf/payment/core/tokens/tokens.ts:L24-L26` |
| 111 | `OPF_PAYMENT_SUBMIT_NORMALIZER` | `OpfPaymentSubmitNormalizer` | `Converter<any, OpfPaymentSubmitResponse>` | @spartacus/opf | sì | sì | `integration-libs/opf/payment/core/tokens/tokens.ts:L20-L22` |
| 112 | `OPF_PAYMENT_VERIFICATION_NORMALIZER` | `OpfPaymentVerificationNormalizer` | `Converter<any, OpfPaymentVerificationResponse>` | @spartacus/opf | sì | sì | `integration-libs/opf/payment/core/tokens/tokens.ts:L16-L18` |
| 113 | `CONSIGNMENT_TRACKING_NORMALIZER` | `ConsignmentTrackingNormalizer` | `Converter<any, ConsignmentTracking>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L40-L42` |
| 114 | `ORDER_HISTORY_NORMALIZER` | `OrderHistoryNormalizer` | `Converter<any, OrderHistoryList>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L36-L38` |
| 115 | `ORDER_NORMALIZER` | `OrderNormalizer` | `Converter<any, Order>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L24-L26` |
| 116 | `ORDER_RETURN_REQUEST_INPUT_SERIALIZER` | `OrderReturnRequestInputSerializer` | `Converter<ReturnRequestEntryInputList, any>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L48-L50` |
| 117 | `ORDER_RETURN_REQUEST_NORMALIZER` | `OrderReturnRequestNormalizer` | `Converter<any, ReturnRequest>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L44-L46` |
| 118 | `ORDER_RETURNS_NORMALIZER` | `OrderReturnsNormalizer` | `Converter<any, ReturnRequestList>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L52-L54` |
| 119 | `OrderConfirmationOrderEntriesContextToken` | `OrderConfirmationOrderEntriesContext` |  | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/context.ts:L13-L15` |
| 120 | `OrderDetailsOrderEntriesContextToken` | `OrderDetailsOrderEntriesContext` |  | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/context.ts:L9-L11` |
| 121 | `reducerToken` | `OrderReducers` | `ActionReducerMap<OrderState>` | @spartacus/order | sì | no | `feature-libs/order/core/store/reducers/index.ts:L79-L80` |
| 122 | `REORDER_ORDER_NORMALIZER` | `ReorderOrderNormalizer` | `Converter<any, CartModificationList>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L32-L34` |
| 123 | `REPLENISHMENT_ORDER_FORM_SERIALIZER` | `ReplenishmentOrderFormSerializer` | `Converter<ScheduleReplenishmentForm, any>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L60-L62` |
| 124 | `REPLENISHMENT_ORDER_HISTORY_NORMALIZER` | `ReplenishmentOrderHistoryNormalizer` | `Converter<any, ReplenishmentOrderList>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L56-L58` |
| 125 | `REPLENISHMENT_ORDER_NORMALIZER` | `ReplenishmentOrderNormalizer` | `Converter<any, ReplenishmentOrder>` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/converters.ts:L28-L30` |
| 126 | `USE_MY_ACCOUNT_V2_ORDER` | `feature flag to enable enhanced UI for Order related pages under My-Account` | `boolean` | @spartacus/order | sì | sì | `feature-libs/order/root/tokens/context.ts:L17-L20` |
| 127 | `ACCOUNT_SUMMARY_DOCUMENT_NORMALIZER` | `AccountSummaryDocumentNormalizer` | `Converter<any, AccountSummaryList>` | @spartacus/organization | sì | sì | `feature-libs/organization/account-summary/core/connectors/converters.ts:L18-L20` |
| 128 | `ACCOUNT_SUMMARY_NORMALIZER` | `AccountSummaryNormalizer` | `Converter<any, AccountSummaryDetails>` | @spartacus/organization | sì | sì | `feature-libs/organization/account-summary/core/connectors/converters.ts:L14-L16` |
| 129 | `B2B_USER_NORMALIZER` | `B2BUserNormalizer` | `Converter<any, B2BUser>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/b2b-user/converters.ts:L10-L12` |
| 130 | `B2B_USER_SERIALIZER` | `B2BUserSerializer` | `Converter<B2BUser, any>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/b2b-user/converters.ts:L14-L16` |
| 131 | `B2B_USERS_NORMALIZER` | `UserListNormalizer` | `Converter<any, EntitiesModel<B2BUser>>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/b2b-user/converters.ts:L18-L20` |
| 132 | `B2BUNIT_APPROVAL_PROCESSES_NORMALIZER` | `B2BUnitApprovalProcessNormalizer` | `Converter<any, B2BApprovalProcess[]>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/org-unit/converters.ts:L27-L29` |
| 133 | `B2BUNIT_NODE_LIST_NORMALIZER` | `B2BUnitNodeListNormalizer` | `Converter<any, B2BUnitNode[]>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/org-unit/converters.ts:L15-L17` |
| 134 | `B2BUNIT_NODE_NORMALIZER` | `B2BUnitNodeNormalizer` | `Converter<any, B2BUnitNode>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/org-unit/converters.ts:L11-L13` |
| 135 | `B2BUNIT_NORMALIZER` | `B2BUnitNormalizer` | `Converter<any, B2BUnit>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/org-unit/converters.ts:L19-L21` |
| 136 | `B2BUNIT_SERIALIZER` | `B2BUnitSerializer` | `Converter<B2BUnit, any>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/org-unit/converters.ts:L23-L25` |
| 137 | `BUDGET_NORMALIZER` | `BudgetNormalizer` | `Converter<any, Budget>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/budget/converters.ts:L11-L13` |
| 138 | `BUDGET_SERIALIZER` | `BudgetSerializer` | `Converter<Budget, any>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/budget/converters.ts:L18-L20` |
| 139 | `BUDGETS_NORMALIZER` | `BudgetsListNormalizer` | `Converter<any, EntitiesModel<Budget>>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/budget/converters.ts:L14-L16` |
| 140 | `ORDER_APPROVAL_DECISION_NORMALIZER` | `OrderApprovalDecisionNormalizer` | `Converter<any, OrderApprovalDecision>` | @spartacus/organization | sì | sì | `feature-libs/organization/order-approval/core/connectors/converters.ts:L22-L24` |
| 141 | `ORDER_APPROVAL_NORMALIZER` | `OrderApprovalNormalizer` | `Converter<any, OrderApproval>` | @spartacus/organization | sì | sì | `feature-libs/organization/order-approval/core/connectors/converters.ts:L14-L16` |
| 142 | `ORDER_APPROVALS_NORMALIZER` | `OrderApprovalsListNormalizer` | `Converter<any, EntitiesModel<OrderApproval>>` | @spartacus/organization | sì | sì | `feature-libs/organization/order-approval/core/connectors/converters.ts:L18-L20` |
| 143 | `ORGANIZATION_USER_REGISTRATION_SERIALIZER` | `OrganizationUserRegistrationSerializer` | `Converter<OrganizationUserRegistration, any>` | @spartacus/organization | sì | sì | `feature-libs/organization/user-registration/core/connectors/converters.ts:L11-L13` |
| 144 | `PERMISSION_NORMALIZER` | `PermissionNormalizer` | `Converter<any, Permission>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/permission/converters.ts:L15-L17` |
| 145 | `PERMISSION_SERIALIZER` | `PermissionSerializer` | `Converter<Permission, any>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/permission/converters.ts:L31-L33` |
| 146 | `PERMISSION_TYPE_NORMALIZER` | `PermissionTypeNormalizer` | `Converter<any, OrderApprovalPermissionType>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/permission/converters.ts:L23-L25` |
| 147 | `PERMISSION_TYPES_NORMALIZER` | `PermissionTypesListNormalizer` | `Converter<any, OrderApprovalPermissionType[]>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/permission/converters.ts:L27-L29` |
| 148 | `PERMISSIONS_NORMALIZER` | `PermissionsListNormalizer` | `Converter<any, EntitiesModel<Permission>>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/permission/converters.ts:L19-L21` |
| 149 | `reducerToken` | `OrganizationReducers` | `ActionReducerMap<OrganizationState>` | @spartacus/organization | sì | no | `feature-libs/organization/administration/core/store/reducers/index.ts:L199-L202` |
| 150 | `reducerToken` | `OrganizationReducers` | `ActionReducerMap<OrderApprovalState>` | @spartacus/organization | sì | no | `feature-libs/organization/order-approval/core/store/reducers/index.ts:L43-L47` |
| 151 | `reducerToken` | `UnitOrderReducers` | `ActionReducerMap<UnitOrderState>` | @spartacus/organization | sì | no | `feature-libs/organization/unit-order/core/store/reducers/index.ts:L32-L33` |
| 152 | `UnitOrderDetailsOrderEntriesContextToken` | `OrderDetailsOrderEntriesContext` |  | @spartacus/organization | sì | sì | `feature-libs/organization/unit-order/root/context/context.ts:L9-L11` |
| 153 | `USER_GROUP_NORMALIZER` | `UserGroupNormalizer` | `Converter<any, UserGroup>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/user-group/converters.ts:L11-L13` |
| 154 | `USER_GROUP_SERIALIZER` | `UserGroupSerializer` | `Converter<UserGroup, any>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/user-group/converters.ts:L15-L17` |
| 155 | `USER_GROUPS_NORMALIZER` | `UserGroupListNormalizer` | `Converter<any, EntitiesModel<UserGroup>>` | @spartacus/organization | sì | sì | `feature-libs/organization/administration/core/connectors/user-group/converters.ts:L19-L21` |
| 156 | `PDF_INVOICES_LIST_INVOICES_NORMALIZER` | `PDFInvoicesListInvoices` | `Converter<any, OrderInvoiceList>` | @spartacus/pdf-invoices | sì | sì | `feature-libs/pdf-invoices/core/connectors/converters.ts:L11-L13` |
| 157 | `pickupLocationsReducersToken` | `PickupLocationsReducers` | `ActionReducerMap<PickupLocationsState>` | @spartacus/pickup-in-store | sì | sì | `feature-libs/pickup-in-store/core/store/reducers/pickup-locations/index.ts:L23-L27` |
| 158 | `pickupOptionReducersToken` | `PickupOptionReducers` | `ActionReducerMap<PickupOptionState>` | @spartacus/pickup-in-store | sì | sì | `feature-libs/pickup-in-store/core/store/reducers/pickup-option/index.ts:L21-L25` |
| 159 | `stockReducersToken` | `StockReducers` | `ActionReducerMap<StockState>` | @spartacus/pickup-in-store | sì | sì | `feature-libs/pickup-in-store/core/store/reducers/stock/index.ts:L34-L35` |
| 160 | `FUTURE_STOCK_LIST_NORMALIZER` | `FutureStockListNormalizer` | `Converter<any, ProductFutureStockList>` | @spartacus/product | sì | sì | `feature-libs/product/future-stock/core/connectors/converters.ts:L18-L20` |
| 161 | `FUTURE_STOCK_NORMALIZER` | `FutureStockNormalizer` | `Converter<any, ProductFutureStock>` | @spartacus/product | sì | sì | `feature-libs/product/future-stock/core/connectors/converters.ts:L14-L16` |
| 162 | `(inline) RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST` | `ConfiguratorAdapterList` | `RulebasedConfiguratorAdapter[]` | @spartacus/product-configurator | no | n/d | `feature-libs/product-configurator/rulebased/core/connectors/rulebased-configurator.connector.ts:L21-L23` |
| 163 | `CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER` | `ConfigurationAddToCartSerializer` | `Converter<ConfiguratorTextfield.AddToCartParameters, any>` | @spartacus/product-configurator | sì | no | `feature-libs/product-configurator/textfield/core/connectors/converters.ts:L15-L18` |
| 164 | `CONFIGURATION_TEXTFIELD_NORMALIZER` | `ConfigurationNormalizer` | `Converter<any, ConfiguratorTextfield.Configuration>` | @spartacus/product-configurator | sì | no | `feature-libs/product-configurator/textfield/core/connectors/converters.ts:L11-L13` |
| 165 | `CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER` | `ConfigurationUpdateCartEntrySerializer` | `Converter<ConfiguratorTextfield.UpdateCartEntryParameters, any>` | @spartacus/product-configurator | sì | no | `feature-libs/product-configurator/textfield/core/connectors/converters.ts:L20-L23` |
| 166 | `configuratorReducerToken` | `ConfiguratorReducers` | `ActionReducerMap<ConfiguratorState>` | @spartacus/product-configurator | sì | no | `feature-libs/product-configurator/rulebased/core/state/reducers/index.ts:L26-L30` |
| 167 | `configuratorTextfieldReducerToken` | `ConfiguratorReducers` | `ActionReducerMap<ConfigurationTextfieldState>` | @spartacus/product-configurator | sì | no | `feature-libs/product-configurator/textfield/core/state/reducers/index.ts:L27-L31` |
| 168 | `CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER` | `CpqConfiguratorAddToCartSerializer` | `Converter< Configurator.AddToCartParameters, OccCpqConfigurator.AddToCartParameters >` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/cpq/occ/converters/cpq-configurator-occ.converters.ts:L12-L17` |
| 169 | `CPQ_CONFIGURATOR_NORMALIZER` | `CpqConfiguratorNormalizer` | `Converter<Cpq.Configuration, Configurator.Configuration>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/cpq/common/converters/cpq-configurator.converters.ts:L12-L14` |
| 170 | `CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER` | `CpqConfiguratorOverviewNormalizer` | `Converter<Cpq.Configuration, Configurator.Overview>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/cpq/common/converters/cpq-configurator.converters.ts:L24-L26` |
| 171 | `CPQ_CONFIGURATOR_QUANTITY_SERIALIZER` | `CpqConfiguratorValueSerializer` | `Converter<Configurator.Configuration, Cpq.UpdateValue>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/cpq/common/converters/cpq-configurator.converters.ts:L20-L22` |
| 172 | `CPQ_CONFIGURATOR_SERIALIZER` | `CpqConfiguratorSerializer` | `Converter<Configurator.Configuration, Cpq.UpdateAttribute>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/cpq/common/converters/cpq-configurator.converters.ts:L16-L18` |
| 173 | `CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER` | `CpqConfiguratorUpdateCartEntrySerializer` | `Converter< Configurator.AddToCartParameters, OccCpqConfigurator.UpdateConfigurationForCartEntryParameters >` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/cpq/occ/converters/cpq-configurator-occ.converters.ts:L19-L24` |
| 174 | `VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER` | `VariantConfiguratorAddToCartSerializer` | `Converter< Configurator.AddToCartParameters, OccConfigurator.AddToCartParameters >` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L28-L33` |
| 175 | `VARIANT_CONFIGURATOR_NORMALIZER` | `VariantConfiguratorNormalizer` | `Converter<OccConfigurator.Configuration, Configurator.Configuration>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L12-L14` |
| 176 | `VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER` | `VariantConfiguratorOverviewNormalizer` | `Converter<OccConfigurator.Overview, Configurator.Overview>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L43-L45` |
| 177 | `VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER` | `VariantConfiguratorOverviewSerializer` | `Converter<Configurator.Overview, OccConfigurator.Overview>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L47-L49` |
| 178 | `VARIANT_CONFIGURATOR_PRICE_NORMALIZER` | `VariantConfiguratorPriceNormalizer` | `Converter<OccConfigurator.PriceSummary, Configurator.Configuration>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L24-L26` |
| 179 | `VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER` | `VariantConfiguratorPriceSummaryNormalizer` | `Converter<OccConfigurator.PriceSummary, Configurator.PriceSummary>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L20-L22` |
| 180 | `VARIANT_CONFIGURATOR_SERIALIZER` | `VariantConfiguratorSerializer` | `Converter<Configurator.Configuration, OccConfigurator.Configuration>` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L16-L18` |
| 181 | `VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER` | `VariantConfiguratorUpdateCartEntrySerializer` | `Converter< Configurator.UpdateConfigurationForCartEntryParameters, OccConfigurator.UpdateConfigurationForCartEntryParameters >` | @spartacus/product-configurator | sì | sì | `feature-libs/product-configurator/rulebased/occ/variant/variant-configurator-occ.converters.ts:L35-L41` |
| 182 | `PUNCHOUT_REQUISITION_NORMALIZER` | `PunchoutRequisitionNormalizer` | `Converter<any, PunchoutRequisition>` | @spartacus/punchout | sì | sì | `integration-libs/punchout/core/connectors/converters.ts:L15-L17` |
| 183 | `PUNCHOUT_SESSION_NORMALIZER` | `PunchoutSessionNormalizer` | `Converter<any, PunchoutSession>` | @spartacus/punchout | sì | sì | `integration-libs/punchout/core/connectors/converters.ts:L11-L13` |
| 184 | `QUOTE_ACTION_SERIALIZER` | `QuoteActionSerializer` | `Converter<any, QuoteActionType>` | @spartacus/quote | sì | sì | `feature-libs/quote/core/connectors/converters.ts:L36-L38` |
| 185 | `QUOTE_COMMENT_SERIALIZER` | `QuoteCommentSerializer` | `Converter<any, QuoteComment>` | @spartacus/quote | sì | sì | `feature-libs/quote/core/connectors/converters.ts:L40-L42` |
| 186 | `QUOTE_DISCOUNT_SERIALIZER` | `QuoteDiscountSerializer` | `Converter<any, QuoteDiscount>` | @spartacus/quote | sì | sì | `feature-libs/quote/core/connectors/converters.ts:L44-L46` |
| 187 | `QUOTE_LIST_NORMALIZER` | `QuoteListNormalizer` | `Converter<any, QuoteList>` | @spartacus/quote | sì | sì | `feature-libs/quote/core/connectors/converters.ts:L24-L26` |
| 188 | `QUOTE_METADATA_SERIALIZER` | `QuoteMetadataSerializer` | `Converter<any, QuoteMetadata>` | @spartacus/quote | sì | sì | `feature-libs/quote/core/connectors/converters.ts:L32-L34` |
| 189 | `QUOTE_NORMALIZER` | `QuoteNormalizer` | `Converter<OccQuote, Quote>` | @spartacus/quote | sì | sì | `feature-libs/quote/core/connectors/converters.ts:L20-L22` |
| 190 | `QUOTE_STARTER_SERIALIZER` | `QuoteStarterSerializer` | `Converter<any, QuoteStarter>` | @spartacus/quote | sì | sì | `feature-libs/quote/core/connectors/converters.ts:L28-L30` |
| 191 | `EXPRESS_SERVER_LOGGER` | `EXPRESS_SERVER_LOGGER` | `ExpressServerLogger` | @spartacus/setup | sì | sì | `core-libs/setup/ssr/logger/loggers/express-server-logger.ts:L46-L48` |
| 192 | `PROPAGATE_ERROR_TO_SERVER` | `PROPAGATE_ERROR_TO_SERVER` | `(error: unknown) => void` | @spartacus/setup | sì | sì | `core-libs/setup/ssr/error-handling/error-response/propagate-error-to-server.ts:L20-L22` |
| 193 | `REQUEST` | `REQUEST` | `Request` | @spartacus/setup | sì | sì | `core-libs/setup/ssr/tokens/express.tokens.ts:L15-L17` |
| 194 | `RESPONSE` | `RESPONSE` | `Response` | @spartacus/setup | sì | sì | `core-libs/setup/ssr/tokens/express.tokens.ts:L24-L26` |
| 195 | `reducerToken` | `StoreFinderReducers` | `ActionReducerMap<StoresState>` | @spartacus/storefinder | sì | no | `feature-libs/storefinder/core/store/reducers/index.ts:L31-L32` |
| 196 | `STORE_COUNT_NORMALIZER` | `StoreCountNormalizer` | `Converter<any, StoreCount>` | @spartacus/storefinder | sì | sì | `feature-libs/storefinder/core/connectors/converters.ts:L15-L17` |
| 197 | `STORE_FINDER_SEARCH_PAGE_NORMALIZER` | `StoreFinderSearchPageNormalizer` | `Converter<any, StoreFinderSearchPage>` | @spartacus/storefinder | sì | sì | `feature-libs/storefinder/core/connectors/converters.ts:L11-L13` |
| 198 | `BEFORE_CMS_PAGE_GUARD` | `BEFORE_CMS_PAGE_GUARD` | `{ canActivate: CanActivateFn }[]` | @spartacus/storefront | sì | sì | `core-libs/storefront/cms-structure/guards/before-cms-page-guard.token.ts:L22-L24` |
| 199 | `JSONLD_PRODUCT_BUILDER` | `JsonLdProductBuilderToken` |  | @spartacus/storefront | sì | sì | `core-libs/storefront/cms-structure/seo/structured-data/builders/tokens.ts:L21-L23` |
| 200 | `LCP_PRESENCE` | `LCP_PRESENCE` | `Observable<LcpPresence>` | @spartacus/storefront | sì | sì | `core-libs/storefront/shared/lcp-context/lcp-presence.token.ts:L26-L32` |
| 201 | `PAGE_LAYOUT_HANDLER` | `PageLayoutHandler` | `PageLayoutHandler` | @spartacus/storefront | sì | sì | `core-libs/storefront/cms-structure/page/page-layout/page-layout-handler.ts:L11-L13` |
| 202 | `PRODUCT_DETAILS_URL_MATCHER` | `PRODUCT_DETAILS_URL_MATCHER` | `UrlMatcherFactory` | @spartacus/storefront | sì | sì | `core-libs/storefront/cms-pages/product-details-page/product-details-url-matcher.ts:L42-L50` |
| 203 | `PRODUCT_LISTING_URL_MATCHER` | `PRODUCT_LISTING_URL_MATCHER` | `UrlMatcherFactory` | @spartacus/storefront | sì | sì | `core-libs/storefront/cms-pages/product-listing-page/product-listing-url-matcher.ts:L42-L50` |
| 204 | `PROVIDE_OUTLET_OPTIONS` | `PROVIDE_OUTLET_OPTIONS` | `ProvideOutletOptions` | @spartacus/storefront | sì | no | `core-libs/storefront/cms-structure/outlet/outlet.providers.ts:L13-L15` |
| 205 | `SCHEMA_BUILDER` | `SchemaBuilderToken` |  | @spartacus/storefront | sì | sì | `core-libs/storefront/cms-structure/seo/structured-data/builders/tokens.ts:L15-L15` |
| 206 | `USE_MY_ACCOUNT_V2_CONSENT` | `feature flag to enable enhanced UI for Consent Management pages under My-Account` | `boolean` | @spartacus/storefront | sì | sì | `core-libs/storefront/cms-components/myaccount/my-account-v2/use-my-account-v2-consent-notification-perference.ts:L15-L18` |
| 207 | `USE_MY_ACCOUNT_V2_NOTIFICATION_PREFERENCE` | `feature flag to enable enhanced UI for notification preference pages under My-Account` | `boolean` | @spartacus/storefront | sì | sì | `core-libs/storefront/cms-components/myaccount/my-account-v2/use-my-account-v2-consent-notification-perference.ts:L9-L13` |
| 208 | `LOGIN_FORM_SERIALIZER` | `LoginFormSerializer` | `Converter<VerificationTokenCreation, any>` | @spartacus/user | sì | sì | `feature-libs/user/account/core/connectors/converters.ts:L27-L29` |
| 209 | `TITLE_NORMALIZER` | `TitleNormalizer` | `Converter<any, Title>` | @spartacus/user | sì | sì | `feature-libs/user/profile/core/connectors/converters.ts:L28-L30` |
| 210 | `USE_MY_ACCOUNT_V2_EMAIL` | `feature flag to enable enhanced UI for email related pages under My-Account` | `boolean` | @spartacus/user | sì | sì | `feature-libs/user/profile/components/update-email/use-my-account-v2-email.ts:L9-L12` |
| 211 | `USE_MY_ACCOUNT_V2_PASSWORD` | `feature flag to enable enhanced UI for Update Password related pages under My-Account` | `boolean` | @spartacus/user | sì | sì | `feature-libs/user/profile/components/update-password/use-my-account-v2-password.ts:L9-L12` |
| 212 | `USE_MY_ACCOUNT_V2_PROFILE` | `feature flag to enable enhanced UI for profile related pages under My-Account` | `boolean` | @spartacus/user | sì | sì | `feature-libs/user/profile/components/update-profile/use-my-account-v2-profile.ts:L9-L12` |
| 213 | `USER_ACCOUNT_NORMALIZER` | `UserAccountNormalizer` | `Converter<any, User>` | @spartacus/user | sì | sì | `feature-libs/user/account/core/connectors/converters.ts:L15-L17` |
| 214 | `USER_ACCOUNT_SERIALIZER` | `UserAccountSerializer` | `Converter<User, any>` | @spartacus/user | sì | sì | `feature-libs/user/account/core/connectors/converters.ts:L19-L21` |
| 215 | `USER_PROFILE_NORMALIZER` | `UserProfileNormalizer` | `Converter<User, any>` | @spartacus/user | sì | sì | `feature-libs/user/profile/core/connectors/converters.ts:L12-L14` |
| 216 | `USER_PROFILE_SERIALIZER` | `UserProfileSerializer` | `Converter<User, any>` | @spartacus/user | sì | sì | `feature-libs/user/profile/core/connectors/converters.ts:L16-L18` |
| 217 | `USER_SERIALIZER` | `UserSerializer` | `Converter<User, any>` | @spartacus/user | sì | sì | `feature-libs/user/profile/core/connectors/converters.ts:L20-L22` |
| 218 | `USER_SIGN_UP_SERIALIZER` | `UserSignUpSerializer` | `Converter<UserSignUp, any>` | @spartacus/user | sì | sì | `feature-libs/user/profile/core/connectors/converters.ts:L24-L26` |
| 219 | `VERIFICATION_TOKEN_NORMALIZER` | `VerificationTokenNormalizer` | `Converter<any, VerificationToken>` | @spartacus/user | sì | sì | `feature-libs/user/account/core/connectors/converters.ts:L23-L25` |
