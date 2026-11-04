# Inventario feature-libs (parte B)

Ambito: `organization`, `product-configurator`, `product-multi-dimensional`, `quote`, `pickup-in-store`, `storefinder`, `customer-ticketing`, `subscription-billing`, `requested-delivery-date`, `estimated-delivery-date`.

SHA `5b7a1c2bf2808d7380bc20596d10f4fa710c3da1`. Path relativi alla root del repo; i path dei simboli sono abbreviati togliendo il prefisso `feature-libs/`.

Conteggi: file non-spec `.ts|.scss|.html`, ottenuti con `git ls-files <dir> | grep -E '\.(ts|scss|html)$' | grep -v spec | wc -l`.

⚠️ DA VERIFICARE: in `AGENT_RULES.md` la versione indicata è Spartacus 2612.0.0, ma i `package.json` di queste librerie dichiarano `"version": "221121.22.0"` (es. `feature-libs/organization/package.json:L3-L3`, `feature-libs/quote/package.json:L3-L3`), e anche le peerDependencies `@spartacus/*` puntano a `221121.22.0`. Probabilmente è un numero di versione di sviluppo e non quello di rilascio.

## Schema comune osservato

- Quasi tutte le librerie seguono lo schema a entry point `root/`, `core/`, `occ/`, `components/`, `assets/` più l'entry point principale (`public_api.ts` alla radice). Ciascuno è un `ng-package.json` annidato.
- `root/` contiene il `*RootModule`. Questo modulo registra il lazy loading tramite `featureModules: { [FEATURE]: { cmsComponents: [...] } }` e definisce le facade astratte, il routing config e i model.
- `core/` contiene il `*CoreModule`, i connector e gli adapter astratti, le implementazioni delle facade (`facadeProviders`) e, quando c'è, lo store NgRx.
- `occ/` contiene `Occ*Adapter`, normalizer/serializer e la config degli endpoint OCC (`default-occ-*-config.ts`).
- `components/` contiene i moduli dei componenti con il mapping `cmsComponents: { NomeCms: { component } }`.
- Schematics: ogni lib ha `schematics/collection.json` con due voci, `ng-add` e `add`, che puntano alla stessa factory. La factory, in `schematics/add-*/index.ts`, chiama `analyzeCrossFeatureDependencies` e poi `addFeatures` (es. `organization/schematics/add-organization/index.ts:L25-L45`).

---

## 1. `@spartacus/organization` (825 file)

**peerDependencies**: `feature-libs/organization/package.json:L28-L45`. Contiene @angular/*, @ng-select/ng-select, @ngrx/effects, @ngrx/store, @spartacus/cart, core, order, schematics, storefront, styles, user, rxjs.

**Entry point principale**: `feature-libs/organization/public_api.ts`. Riesporta solo `@spartacus/organization/administration`.

**Schematics**: la factory è `addSpartacusOrganization` (`organization/schematics/add-organization/index.ts:L25-L45`).

### Entry point secondari

| entry point | public_api | contenuto |
|---|---|---|
| `organization/administration` | `administration/public_api.ts` | `AdministrationModule` |
| `organization/administration/root` | `administration/root/public_api.ts` | `AdministrationRootModule`, config, feature-name, route-params |
| `organization/administration/core` | `administration/core/public_api.ts` | core module, connectors, guards, http-interceptors, model, services, store |
| `organization/administration/occ` | `administration/occ/public_api.ts` | adapters, `AdministrationOccModule`, converters, model |
| `organization/administration/components` | `administration/components/public_api.ts` | budget, cost-center, permission, shared, unit, user, user-group |
| `organization/administration/assets` | `administration/assets/public_api.ts` | translations |
| `organization/account-summary` (+`/root` `/core` `/occ` `/components` `/assets`) | `account-summary/*/public_api.ts` | facade `AccountSummaryFacade`, page meta resolver, list/details |
| `organization/unit-order` (+`/root` `/core` `/occ` `/components` `/assets`) | `unit-order/*/public_api.ts` | facade, context, store, history/detail |
| `organization/order-approval` (+`/root` `/assets`) | `order-approval/public_api.ts` | l'entry point principale esporta components, core/connectors, guards, model, services, store e occ, perché non esistono gli entry point `/core` e `/occ` |
| `organization/user-registration` (+`/root` `/core` `/occ` `/components` `/assets`) | `user-registration/*/public_api.ts` | form, OTP form, verification token |

### Albero cartelle

| cartella | tema | note |
|---|---|---|
| `administration/` (513) | Gestione B2B: unità, utenti, gruppi, budget, cost center, permessi | sotto-feature più grande |
| `administration/components/` (355) | UI di gestione delle entità | una cartella per entità più `shared/` |
| `administration/components/shared/` (81) | Framework condiviso list/form/card/detail | vedi la sezione dedicata più sotto |
| `administration/components/unit/` (102) | Unità organizzative (albero, figli, indirizzi, approver, utenti) | sottocartelle `details`, `details-cell`, `form`, `links`, `list`, `services` |
| `administration/components/user/` (53) | Utenti B2B | |
| `administration/components/user-group/` (39) | Gruppi di utenti | |
| `administration/components/cost-center/` (30) | Cost center | |
| `administration/components/budget/` (26) | Budget | è l'entità usata come esempio dello schema |
| `administration/components/permission/` (21) | Permessi/limiti di ordine | |
| `administration/core/` (84) | Connector, servizi-facade, store | |
| `administration/core/connectors/` (24) | 6 coppie Adapter/Connector | b2b-user, budget, cost-center, org-unit, permission, user-group |
| `administration/core/store/` (33) | NgRx | actions 8, effects 7, reducers 7, selectors 8 |
| `administration/core/services/` (9) | Servizi per entità e page meta | |
| `administration/core/guards/` (5) | Guard (es. AdminGuard, usato nelle config CMS) | |
| `administration/core/http-interceptors/` (3) | Gestione degli errori HTTP | |
| `administration/occ/` (29) | Adapter OCC (7) e converters (17) | |
| `administration/root/` (14) | Root module e routing config (10 file in `config/`) | |
| `account-summary/` (79) | Riepilogo account per unità (documenti, filtri, download allegati) | components 25, core 9, occ 7, root 11 |
| `unit-order/` (86) | Storico ordini a livello di unità | core/store 14 |
| `order-approval/` (76) | Approvazione ordini | core/store 11, occ/converters 4 |
| `user-registration/` (66) | Registrazione utente B2B, anche con OTP | components 17 |
| `*/assets/` (19 per ognuna) | Translations | |
| `*/styles/` | SCSS delle sotto-feature | |

### administration: framework condiviso (`administration/components/shared/`)

Sottocartelle e numero di file: `card` 5, `detail` 14, `form` 6, `list` 5, `message` 19, `sub-list` 7, `table` 15, `utility` 1, file alla radice 9.

| simbolo | file:righe | ruolo |
|---|---|---|
| `ItemService<T>` (abstract) | `organization/administration/components/shared/item.service.ts:L23-L132` | CRUD generico per entità, basato su `CurrentItemService` e `FormService` (vedi il commento a L18-L21) |
| `CurrentItemService` | `organization/administration/components/shared/current-item.service.ts:L18-L70` | elemento corrente ricavato dai parametri di route |
| `ListService` | `organization/administration/components/shared/list/list.service.ts:L42-L243` | sorgente dati della lista |
| `ListComponent` | `organization/administration/components/shared/list/list.component.ts:L51-L251` | componente CMS generico per le liste |
| `ListModule` | `organization/administration/components/shared/list/list.module.ts:L24-L44` | |
| `FormComponent` / `FormService` | `organization/administration/components/shared/form/form.component.ts:L34-L143`, `.../form/form.service.ts:L11-L58` | form generico |
| `CardComponent` / `CardModule` | `organization/administration/components/shared/card/card.component.ts:L29-L99`, `.../card/card.module.ts:L24-L39` | card per dettaglio e form |
| `SubListComponent` / `SubListService` / `AssignCellComponent` | `.../sub-list/sub-list.component.ts:L28-L73`, `.../sub-list/sub-list.service.ts:L18-L64`, `.../sub-list/assign-cell.component.ts:L26-L121` | liste annidate con assegnazione |
| `CellComponent` (+ celle `Amount`, `DateRange`, `Limit`, `Roles`, `Status`, `Unit`, `ActiveLink`) | `.../table/cell.component.ts:L25-L111` | celle della tabella |
| `DeleteItemComponent`, `ToggleStatusComponent`, `DisableInfoComponent` | `.../detail/delete-item-action/delete-item.component.ts:L22-L122`, `.../detail/toggle-status-action/toggle-status.component.ts:L24-L154`, `.../detail/disable-info/disable-info.component.ts:L16-L101` | azioni nel dettaglio |
| `MessageService` / `MessageComponent` | `.../message/services/message.service.ts:L14-L56`, `.../message/message.component.ts:L24-L84` | messaggi di conferma e notifica |
| `ItemActiveModule`, `ItemExistsModule` | `.../item-active.module.ts:L11-L15`, `.../item-exists.module.ts:L11-L15` | moduli per le guard di elemento |

**Schema per entità** (esempio budget): `budgetCmsConfig` in `organization/administration/components/budget/budget.config.ts:L30-L80` mappa `ManageBudgetsListComponent` su `ListComponent`. I provider `ListService` e `ItemService` vengono sostituiti con `useExisting` da `BudgetListService` e `BudgetItemService`. La config definisce poi `childRoutes` (`create`, `:budgetCode`, `edit`, `cost-centers`) e `guards: [AuthGuard, AdminGuard]`.

Classi della singola entità:
- `BudgetItemService`: `organization/administration/components/budget/services/budget-item.service.ts:L19-L63`
- `BudgetListService`: `.../budget/services/budget-list.service.ts:L27-L69`
- `BudgetComponentsModule`: `.../budget/budget-components.module.ts:L18-L30`

### Simboli chiave organization

| simbolo | file:righe |
|---|---|
| `AdministrationRootModule` | `organization/administration/root/administration-root.module.ts:L44-L64` |
| `defaultOrganizationAdministrationComponentsConfig` (lista cms per il lazy loading) | `organization/administration/root/administration-root.module.ts:L25-L42` |
| `AdministrationModule` | `organization/administration/administration.module.ts:L12-L19` |
| `AdministrationCoreModule` | `organization/administration/core/administration-core.module.ts:L21-L54` |
| `OrganizationStoreModule` | `organization/administration/core/store/organization-store.module.ts:L14-L23` |
| `AdministrationOccModule` | `organization/administration/occ/administration-occ.module.ts:L58-L168` |
| `defaultOccOrganizationConfig` (endpoint) | `organization/administration/occ/config/default-occ-organization-config.ts:L9-L75` |
| `AdministrationComponentsModule` | `organization/administration/components/administration-components.module.ts:L15-L25` |
| Servizi-facade: `B2BUserService`, `BudgetService`, `CostCenterService`, `OrgUnitService`, `PermissionService`, `UserGroupService` | `organization/administration/core/services/b2b-user.service.ts:L35-L417`, `budget.service.ts:L28-L150`, `cost-center.service.ts:L31-L231`, `org-unit.service.ts:L39-L504`, `permission.service.ts:L31-L192`, `user-group.service.ts:L33-L350` |
| Connector: `B2BUserConnector`, `BudgetConnector`, `CostCenterConnector`, `OrgUnitConnector`, `PermissionConnector`, `UserGroupConnector` | `organization/administration/core/connectors/b2b-user/b2b-user.connector.ts:L14-L114`, `budget/budget.connector.ts:L13-L41`, `cost-center/cost-center.connector.ts:L13-L65`, `org-unit/org-unit.connector.ts:L20-L138`, `permission/permission.connector.ts:L17-L49`, `user-group/user-group.connector.ts:L14-L110` |
| Adapter OCC: `OccB2BUserAdapter`, `OccBudgetAdapter`, `OccCostCenterAdapter`, `OccOrgUnitAdapter`, `OccPermissionAdapter`, `OccUserGroupAdapter` | `organization/administration/occ/adapters/occ-b2b-users.adapter.ts:L28-L267`, `occ-budget.adapter.ts:L25-L87`, `occ-cost-center.adapter.ts:L27-L157`, `occ-org-unit.adapter.ts:L35-L309`, `occ-permission.adapter.ts:L27-L104`, `occ-user-group.adapter.ts:L29-L249` |
| Converter (17 file), es. `OccBudgetNormalizer`, `OccBudgetSerializer`, `OccOrgUnitNodeListNormalizer` | `organization/administration/occ/converters/occ-budget-normalizer.ts:L11-L30`, `occ-budget-serializer.ts:L11-L32`, `occ-org-unit-node-list-normalizer.ts:L11-L23` |
| Routing config per entità | `organization/administration/root/config/default-budget-routing.config.ts:L15-L38`, `default-units-routing.config.ts:L17-L88`, `default-user-routing.config.ts:L15-L62` |
| `AccountSummaryRootModule` | `organization/account-summary/root/account-summary-root.module.ts:L37-L59` |
| `AccountSummaryFacade` / `AccountSummaryService` | `organization/account-summary/root/facade/account-summary.facade.ts:L17-L60`, `organization/account-summary/core/facade/account-summary.service.ts:L18-L83` |
| `AccountSummaryConnector` / `OccAccountSummaryAdapter` | `organization/account-summary/core/connectors/account-summary.connector.ts:L16-L52`, `organization/account-summary/occ/adapters/occ-account-summary.adapter.ts:L28-L125` |
| `defaultOccAccountSummaryConfig` | `organization/account-summary/occ/config/default-occ-account-summary-config.ts:L17-L25` |
| `UnitOrderRootModule` | `organization/unit-order/root/unit-order-root.module.ts:L41-L82` |
| `UnitOrderFacade` / `UnitOrderService` | `organization/unit-order/root/facade/unit-order.facade.ts:L30-L82`, `organization/unit-order/core/services/unit-order.service.ts:L20-L122` |
| `UnitOrderConnector` / `OccUnitOrderAdapter` / `defaultOccUnitOrderConfig` | `organization/unit-order/core/connectors/unit-order.connector.ts:L12-L40`, `organization/unit-order/occ/adapters/occ-unit-order.adapter.ts:L19-L70`, `organization/unit-order/occ/config/default-occ-organization-config.ts:L9-L18` |
| `UnitOrderStoreModule` | `organization/unit-order/core/store/unit-order-store.module.ts:L14-L21` |
| `OrderApprovalRootModule` | `organization/order-approval/root/order-approval-root.module.ts:L42-L72` |
| `OrderApprovalService` (nessuna facade astratta in root) | `organization/order-approval/core/services/order-approval.service.ts:L30-L181` |
| `OrderApprovalConnector` / `OccOrderApprovalAdapter` / `defaultOccOrderApprovalConfig` | `organization/order-approval/core/connectors/order-approval.connector.ts:L16-L44`, `organization/order-approval/occ/adapters/occ-order-approval.adapter.ts:L28-L101`, `organization/order-approval/occ/config/default-occ-organization-config.ts:L9-L21` |
| `OrderApprovalStoreModule` | `organization/order-approval/core/store/order-approval-store.module.ts:L14-L23` |
| `OrganizationUserRegistrationRootModule` | `organization/user-registration/root/user-registration-root.module.ts:L27-L34` |
| `UserRegistrationFacade` / `UserRegistrationService` | `organization/user-registration/root/facade/user-registration.facade.ts:L13-L31`, `organization/user-registration/core/facade/user-registration.service.ts:L16-L42` |
| `UserRegistrationConnector` / `OccUserRegistrationAdapter` / `defaultOccOrganizationUserRegistrationConfig` | `organization/user-registration/core/connectors/user-registration.connector.ts:L12-L21`, `organization/user-registration/occ/adapters/occ-user-registration.adapter.ts:L25-L62`, `organization/user-registration/occ/config/default-occ-organization-config.ts:L9-L17` |

### Componenti CMS registrati (organization)

| sotto-feature | nomi CMS | lista lazy (root) | mapping (components) |
|---|---|---|---|
| administration | ManageBudgetsListComponent, ManageCostCentersListComponent, ManagePermissionsListComponent, ManageUnitsListComponent, ManageUsersListComponent, ManageUserGroupsListComponent | `organization/administration/root/administration-root.module.ts:L29-L36` | `budget/budget.config.ts:L30-L80`, `cost-center/cost-center.config.ts:L31-L93`, `permission/permission.config.ts:L26-L72`, `unit/units.config.ts:L52-L194`, `user/user.config.ts:L42-L141`, `user-group/user-group.config.ts:L33-L111` (tutti sotto `organization/administration/components/`) |
| account-summary | ManageAccountSummaryListComponent, AccountSummaryHeaderComponent, AccountSummaryDocumentComponent | `organization/account-summary/root/account-summary-root.module.ts:L25-L29` | `account-summary/components/list/account-summary-list.config.ts:L48-L83`, `.../details/header/account-summary-header.module.ts:L20-L25`, `.../details/document/account-summary-document.module.ts:L26-L31` |
| unit-order | UnitLevelOrderHistoryComponent, UnitLevelOrderDetailsOverviewComponent, UnitLevelOrderDetailsItemsComponent, UnitLevelOrderDetailsTotalsComponent | `organization/unit-order/root/unit-order-root.module.ts:L27-L32` | `unit-order/components/unit-level-order-history/unit-level-order-history.module.ts:L42-L47`, `.../unit-level-order-detail/unit-level-order-detail.module.ts:L26-L51` |
| order-approval | OrderApprovalListComponent, OrderApprovalDetailTotalsComponent, OrderApprovalDetailApprovalDetailsComponent, OrderApprovalDetailShippingComponent, OrderApprovalDetailItemsComponent, OrderApprovalDetailFormComponent, AccountOrderDetailsApprovalDetailsComponent | `organization/order-approval/root/order-approval-root.module.ts:L25-L33` | `order-approval/components/list/order-approval-list.module.ts:L26-L31`, `.../details/order-approval-details.module.ts:L46-L94` |
| user-registration | OrganizationUserRegistrationComponent, RegisterB2BCustomerWithOTPComponent, VerifyOTPForB2BRegistrationComponent | `organization/user-registration/root/user-registration-root.module.ts:L15-L19` | `user-registration/components/form/user-registration-form.module.ts:L44-L49`, `.../registration-otp-form/user-registration-otp-form.module.ts:L40-L45`, `.../verification-token-form/verification-token-form.module.ts:L52-L69` |

---

## 2. `@spartacus/product-configurator` (557 file)

**peerDependencies**: `feature-libs/product-configurator/package.json:L28-L45`. Contiene @angular/*, @ng-select/ng-select, @ngrx/effects, @ngrx/store, @spartacus/cart, checkout, core, order, schematics, storefront, styles, rxjs.

**Entry point principale**: `feature-libs/product-configurator/public_api.ts` contiene solo `export {}` (vuoto).

**Schematics**: la factory è `addProductConfiguratorFeatures` (`product-configurator/schematics/add-product-configurator/index.ts:L25-L45`).

### Entry point secondari

| entry point | contenuto public_api |
|---|---|
| `product-configurator/common` | `CommonConfiguratorModule`, components, core/model, occ, shared, `ProductConfiguratorConfig` |
| `product-configurator/common/assets` | translations |
| `product-configurator/rulebased` | components, core, occ, `RulebasedConfiguratorModule`, `Configurator` (model) |
| `product-configurator/rulebased/root` | cpq, feature-name, http-interceptors, root feature module, root module, routing |
| `product-configurator/rulebased/cpq` | common (converter CPQ), occ, rest, `RulebasedCpqConfiguratorModule` |
| `product-configurator/textfield` | components, core, occ, `TextfieldConfiguratorModule` |
| `product-configurator/textfield/root` | feature-name, root-feature, root, routing module |

### Albero cartelle

| cartella | tema | note |
|---|---|---|
| `common/` (70) | Parti condivise da rulebased e textfield: model `CommonConfigurator`, utils, router extractor, componenti carrello | components 30, assets 19 |
| `common/components/` (30) | `configure-product`, `configure-cart-entry`, `configurator-cart-entry-info`, `configurator-cart-entry-bundle-info`, `configurator-issues-notification`, `service`, `config` | |
| `common/occ/` (3) | endpoint configurazione prodotto | |
| `common/shared/utils/` (3) | `CommonConfiguratorUtilsService` | |
| `rulebased/` (424) | Configuratore basato su regole: VC (variant, via OCC) e CPQ | |
| `rulebased/components/` (230) | UI del configuratore | `attribute/` 91 (tipi di attributo), più form, group, group-menu, overview-*, conflict-*, price-summary, tab-bar, variant-carousel, ecc. |
| `rulebased/core/` (44) | facade services, connector, NgRx state (19), events, config | |
| `rulebased/occ/variant/` (15) | adapter OCC per Variant Configurator (VC) e relativi converter | |
| `rulebased/cpq/` (26) | binding CPQ: `common/` (converter CPQ, 10), `occ/` (adapter CPQ via OCC, 12), `rest/` (2, solo utils) | |
| `rulebased/root/` (22) | root module, routing, `cpq/` (8), `variant/` (6), bad request handler | |
| `rulebased/styles/` (78) | SCSS (mixins 23, pages 5) | |
| `textfield/` (58) | Configuratore textfield (attributi a testo libero) | core/state 13, occ/converters 4 |
| `textfield/components/` (10) | add-to-cart-button, form, input-field, input-field-readonly | |

### Simboli chiave product-configurator

| simbolo | file:righe |
|---|---|
| `CommonConfiguratorModule` | `product-configurator/common/common-configurator.module.ts:L11-L14` |
| `CommonConfiguratorUtilsService` | `product-configurator/common/shared/utils/common-configurator-utils.service.ts:L35-L195` |
| `ConfiguratorRouterExtractorService` | `product-configurator/common/components/service/configurator-router-extractor.service.ts:L19-L114` |
| `defaultOccConfiguratorProductConfig` | `product-configurator/common/occ/default-occ-configurator-product-config.ts:L10-L30` |
| `RulebasedConfiguratorRootModule` | `product-configurator/rulebased/root/rulebased-configurator-root.module.ts:L21-L44` |
| `RulebasedConfiguratorRootFeatureModule` + `defaultProductConfiguratorRulebasedComponentsConfig` | `product-configurator/rulebased/root/rulebased-configurator-root-feature.module.ts:L48-L56`, `:L33-L43` |
| `RulebasedConfiguratorRoutingModule` / `defaultRulebasedRoutingConfig` | `product-configurator/rulebased/root/rulebased-configurator-routing.module.ts:L14-L22`, `product-configurator/rulebased/root/default-rulebased-routing-config.ts:L9-L28` |
| `CpqConfiguratorRootModule` | `product-configurator/rulebased/root/cpq/cpq-configurator-root.module.ts:L16-L21` |
| `RulebasedConfiguratorModule` (feature module lazy) | `product-configurator/rulebased/rulebased-configurator.module.ts:L12-L19` |
| `RulebasedConfiguratorCoreModule` | `product-configurator/rulebased/core/rulebased-configurator-core.module.ts:L20-L34` |
| Facade services: `ConfiguratorCommonsService`, `ConfiguratorGroupsService`, `ConfiguratorCartService` | `product-configurator/rulebased/core/facade/configurator-commons.service.ts:L24-L539`, `configurator-groups.service.ts:L23-L485`, `configurator-cart.service.ts:L24-L293` |
| `RulebasedConfiguratorConnector` / `RulebasedConfiguratorAdapter` | `product-configurator/rulebased/core/connectors/rulebased-configurator.connector.ts:L19-L191`, `rulebased-configurator.adapter.ts:L12-L161` |
| `VariantConfiguratorOccModule` / `VariantConfiguratorOccAdapter` | `product-configurator/rulebased/occ/variant/variant-configurator-occ.module.ts:L32-L85`, `variant-configurator-occ.adapter.ts:L39-L407` |
| `defaultOccVariantConfiguratorConfigFactory` (endpoint VC) | `product-configurator/rulebased/occ/variant/default-occ-configurator-variant-config.ts:L9-L50` |
| Converter VC, es. `OccConfiguratorVariantNormalizer`, `OccConfiguratorVariantSerializer` | `product-configurator/rulebased/occ/variant/converters/occ-configurator-variant-normalizer.ts:L15-L591`, `occ-configurator-variant-serializer.ts:L12-L251` |
| `RulebasedCpqConfiguratorModule` | `product-configurator/rulebased/cpq/rulebased-cpq-configurator.module.ts:L14-L17` |
| `CpqConfiguratorOccModule` / `CpqConfiguratorOccAdapter` | `product-configurator/rulebased/cpq/occ/cpq-configurator-occ.module.ts:L20-L41`, `cpq-configurator-occ.adapter.ts:L22-L161` |
| `defaultOccCpqConfiguratorConfigFactory` (endpoint CPQ) | `product-configurator/rulebased/cpq/occ/default-occ-configurator-cpq-config.ts:L9-L50` |
| Converter CPQ: `CpqConfiguratorNormalizer`, `CpqConfiguratorSerializer`, `CpqConfiguratorOverviewNormalizer` | `product-configurator/rulebased/cpq/common/converters/cpq-configurator-normalizer.ts:L33-L1197`, `cpq-configurator-serializer.ts:L15-L119`, `cpq-configurator-overview-normalizer.ts:L21-L317` |
| `TextfieldConfiguratorRootModule` / `TextfieldConfiguratorRootFeatureModule` | `product-configurator/textfield/root/textfield-configurator-root.module.ts:L19-L64`, `textfield-configurator-root-feature.module.ts:L29-L37` |
| `TextfieldConfiguratorModule` / `TextfieldConfiguratorCoreModule` | `product-configurator/textfield/textfield-configurator.module.ts:L16-L23`, `product-configurator/textfield/core/textfield-configurator-core.module.ts:L15-L19` |
| `ConfiguratorTextfieldService` (facade) | `product-configurator/textfield/core/facade/configurator-textfield.service.ts:L23-L281` |
| `ConfiguratorTextfieldConnector` / `ConfiguratorTextfieldAdapter` | `product-configurator/textfield/core/connectors/configurator-textfield.connector.ts:L14-L72`, `configurator-textfield.adapter.ts:L12-L66` |
| `OccConfiguratorTextfieldAdapter` / `TextfieldConfiguratorOccModule` | `product-configurator/textfield/occ/occ-configurator-textfield.adapter.ts:L26-L158`, `textfield-configurator-occ.module.ts:L22-L52` |
| `defaultOccConfiguratorTextfieldConfigFactory` | `product-configurator/textfield/occ/default-occ-configurator-textfield-config.ts:L9-L32` |

Nota CPQ: in questo SHA la cartella `rulebased/cpq/rest/` contiene solo `cpq-configurator-utils.ts` e `index.ts`. Il binding CPQ passa dall'adapter OCC `CpqConfiguratorOccAdapter`. Non c'è un adapter REST diretto verso CPQ.

### Componenti CMS registrati (product-configurator)

| feature | nomi CMS (lista lazy) | dove |
|---|---|---|
| rulebased | ConfiguratorForm, ConfiguratorOverviewForm, ConfiguratorOverviewMenu, ConfiguratorUpdateMessage, ConfiguratorAddToCartButton, ConfiguratorMenu, ConfiguratorGroupTitle, ConfiguratorOverviewBanner, ConfiguratorPrevNext, ConfiguratorPriceSummary, ConfiguratorProductTitle, ConfiguratorTabBar, ConfiguratorExitButton, ConfiguratorVariantCarousel, CpqConfiguratorConflictAndErrorMessagesComponent, ConfiguratorOverviewFilterButton, ConfiguratorOverviewFilter, ConfiguratorOverviewSidebar | `product-configurator/rulebased/root/rulebased-configurator-root-feature.module.ts:L11-L30` |
| rulebased (mapping) | es. `ConfiguratorForm`, `ConfiguratorTabBar`, `ConfiguratorPrevNext` | `product-configurator/rulebased/components/form/configurator-form.module.ts:L24-L28`, `tab-bar/configurator-tab-bar.module.ts:L30-L34`, `previous-next-buttons/configurator-previous-next-buttons.module.ts:L22-L26` |
| textfield | TextfieldConfigurationForm | lista: `product-configurator/textfield/root/textfield-configurator-root-feature.module.ts:L11-L11`; mapping: `product-configurator/textfield/components/textfield-configurator-components.module.ts:L34-L38` |
| common | ConfigureProductComponent | `product-configurator/common/components/configure-product/configure-product.module.ts:L25-L29` |

---

## 3. `@spartacus/product-multi-dimensional` (58 file)

**peerDependencies**: `feature-libs/product-multi-dimensional/package.json:L28-L40`. Contiene @angular/*, @ng-select/ng-select, @spartacus/core, schematics, storefront, styles, rxjs.

**Entry point**: `.` (esporta `ProductMultiDimensionalSelectorModule`), `list` (`export {}`), `list/root`, `selector`, `selector/root`, `selector/core`, `selector/occ`, `selector/components`, `selector/assets`.

**Schematics**: la factory è `addSpartacusProductMultiDimensional` (`product-multi-dimensional/schematics/add-product-multi-dimensional/index.ts:L25-L45`).

| cartella | tema | note |
|---|---|---|
| `selector/` (46) | Selettore delle varianti multidimensionali nella PDP | assets 19, components 7, core 6, occ 3, root 6, styles 2 |
| `selector/core/services/` | `ProductMultiDimensionalSelectorService`, `...ImagesService` | `product-multi-dimensional/selector/core/services/product-multi-dimensional-selector.service.ts:L12-L170` |
| `selector/components/` | componente selettore e guard | `ProductMultiDimensionalSelectorComponent` `...selector/components/selector/product-multi-dimensional-selector.component.ts:L42-L154`; `ProductMultiDimensionalSelectorGuard` `...selector/components/guards/product-multi-dimensional-selector.guard.ts:L30-L111` |
| `list/` (7) | Dettagli multidimensionali nelle liste prodotto | `list/root/` 6 |

| simbolo | file:righe |
|---|---|
| `ProductMultiDimensionalSelectorRootModule` | `product-multi-dimensional/selector/root/product-multi-dimensional-selector-root.module.ts:L25-L33` |
| `defaultProductMultiDimensionalSelectorComponentsConfig` (cms: ProductMultiDimensionalSelectorComponent) | `product-multi-dimensional/selector/root/product-multi-dimensional-selector-root.module.ts:L15-L23` |
| `ProductMultiDimensionalSelectorModule` | `product-multi-dimensional/selector/product-multi-dimensional-selector.module.ts:L11-L17` |
| `ProductMultiDimensionalSelectorOccModule` / `defaultOccProductMultiDimensionalSelectorConfig` | `product-multi-dimensional/selector/occ/product-multi-dimensional-selector-occ.module.ts:L12-L18`, `selector/occ/config/default-occ-product-multi-dimensional-selector-config.ts:L12-L26` |
| `ProductMultiDimensionalConfig` | `product-multi-dimensional/selector/root/config/product-multi-dimensional-config.ts:L14-L18` |
| `ProductMultiDimensionalListRootModule` + `defaultProductMultiDimensionalListConfig` | `product-multi-dimensional/list/root/product-multi-dimensional-list-root.module.ts:L33-L44`, `:L19-L31` |
| Mapping CMS selettore | `product-multi-dimensional/selector/components/selector/product-multi-dimensional-selector-component.module.ts:L42-L47` |

Nota: la lista lazy di `list/root` contiene nomi CMS core (`CMSProductListComponent`, `ProductGridComponent`, `SearchResultsListComponent`), in `product-multi-dimensional/list/root/product-multi-dimensional-list-root.module.ts:L23-L27`. Non sono stati verificati né il meccanismo di override né l'uso di `ProductMultiDimensionalListItemDetailsComponent` (⚠️ DA VERIFICARE).

---

## 4. `@spartacus/quote` (151 file)

**peerDependencies**: `feature-libs/quote/package.json:L30-L43`. Contiene @angular/*, @spartacus/cart, core, order, schematics, storefront, styles, rxjs.

**Entry point**: `.`, `root`, `core`, `occ`, `components`, `components/cart-guard`, `components/request-button`, `assets`.

**Schematics**: la factory è `addQuoteFeatures` (`quote/schematics/add-quote/index.ts:L25-L43`); c'è anche `quote/schematics/constants.ts`.

| cartella | tema | note |
|---|---|---|
| `components/` (65) | UI preventivi: comments, confirm-dialog, header (overview, buyer-edit), items, links, list, summary (actions, prices, seller-edit), request-button, cart-guard | summary 17, header 9 |
| `components/cart-guard/` (5) | entry point separato: `QuoteCartGuardComponent` e `quote-cart.guard` | |
| `components/request-button/` (4) | entry point separato: `QuoteRequestButtonModule` | |
| `core/` (20) | config, connectors, event, facade, services | |
| `occ/` (9) | adapter, config, converters | |
| `root/` (13) | facade, http-interceptors, model, config | |
| `styles/` (18) | layout e mixins | |

| simbolo | file:righe |
|---|---|
| `QuoteRootModule` | `quote/root/quote-root.module.ts:L94-L126` |
| `defaultQuoteComponentsConfig` / `defaultQuoteCartGuardComponentConfig` / `defaultQuoteRequestComponentsConfig` | `quote/root/quote-root.module.ts:L29-L44`, `:L46-L54`, `:L56-L64` |
| `defaultQuoteRoutingConfig` | `quote/root/quote-root.module.ts:L66-L78` |
| `QuoteModule` / `QuoteCoreModule` / `QuoteOccModule` / `QuoteComponentsModule` | `quote/quote.module.ts:L12-L15`, `quote/core/quote-core.module.ts:L14-L25`, `quote/occ/quote-occ.module.ts:L17-L37`, `quote/components/quote-components.module.ts:L24-L42` |
| `QuoteFacade` / `QuoteService` | `quote/root/facade/quote.facade.ts:L39-L135`, `quote/core/facade/quote.service.ts:L64-L570` |
| `QuoteConnector` / `QuoteAdapter` / `OccQuoteAdapter` | `quote/core/connectors/quote.connector.ts:L22-L167`, `quote/core/connectors/quote.adapter.ts:L19-L138`, `quote/occ/adapters/occ-quote.adapter.ts:L43-L285` |
| `defaultOccQuoteConfig` (endpoint) | `quote/occ/config/default-occ-quote-config.ts:L12-L34` |
| Converter: `OccQuoteActionNormalizer`, `OccQuoteEntryNormalizer` | `quote/occ/converters/occ-quote-action-normalizer.ts:L21-L91`, `quote/occ/converters/occ-quote-entry-normalizer.ts:L16-L36` |
| `defaultQuoteCoreConfig` / `defaultQuoteUIConfig` | `quote/core/config/default-quote.core.config.ts:L10-L37`, `quote/components/config/default-quote-ui.config.ts:L104-L115` |

**CMS**:
- lista lazy: AccountMyQuotesComponent, QuoteLinksComponent, QuoteCommentsComponent, QuoteHeaderOverviewComponent, QuoteItemsComponent, QuoteSummaryComponent (`quote/root/quote-root.module.ts:L33-L40`); QuoteCartGuardComponent (`:L50-L50`); QuoteRequestComponent (`:L60-L60`).
- mapping: es. `quote/components/list/quote-list.module.ts:L42-L47`, `quote/components/request-button/quote-request-button.module.ts:L17-L21`, `quote/components/cart-guard/quote-cart-guard.component.module.ts:L17-L22`.

---

## 5. `@spartacus/pickup-in-store` (183 file)

**peerDependencies**: `feature-libs/pickup-in-store/package.json:L28-L45`. Contiene @angular/*, @ngrx/effects, @ngrx/store, @spartacus/cart, core, order, schematics, storefinder, storefront, styles, user, rxjs.

**Entry point**: `.`, `root`, `core`, `occ`, `components`, `assets`.

**Schematics**: la factory è `addPickupInStoreFeatures` (`pickup-in-store/schematics/add-pickup-in-store/index.ts:L25-L45`).

| cartella | tema | note |
|---|---|---|
| `components/container/` (41) | Contenitori smart: cart/pdp pickup options, pickup-option-dialog, store-list, store-search, my-preferred-store, set-preferred-store, pickup-items-details, order consignment | molti vengono iniettati via `provideOutlet` |
| `components/presentational/` (20) | pickup-info, pickup-options, store | |
| `core/store/` (35) | NgRx (stock, punti vendita di default, ecc.) | |
| `core/facade/` (5), `core/services/` (2), `core/connectors/` (5), `core/config/` (3) | facade implementate, connector stock e pickup-location | |
| `occ/` (10) | adapter OCC stock e pickup-location più le relative config | |
| `root/` (18) | facade astratte (4), model, utils | |

| simbolo | file:righe |
|---|---|
| `PickupInStoreRootModule` / `defaultPickupInStoreComponentsConfig` | `pickup-in-store/root/pickup-in-store-root.module.ts:L39-L60`, `:L23-L37` |
| `PickupInStoreModule` / `PickupInStoreCoreModule` / `PickupInStoreStoreModule` / `PickupInStoreOccModule` / `PickupInStoreComponentsModule` | `pickup-in-store/pickup-in-store.module.ts:L12-L19`, `core/pickup-in-store-core.module.ts:L14-L23`, `core/store/pickup-in-store-store.module.ts:L29-L53`, `occ/pickup-in-store-occ.module.ts:L21-L29`, `components/pickup-in-store-components.module.ts:L21-L34` |
| Facade: `IntendedPickupLocationFacade`, `PickupLocationsSearchFacade`, `PickupOptionFacade`, `PreferredStoreFacade` | `pickup-in-store/root/facade/intended-pickup-location.facade.ts:L35-L74`, `pickup-locations-search.facade.ts:L46-L67`, `pickup-option.facade.ts:L28-L38`, `preferred-store.facade.ts:L31-L57` |
| Implementazioni: `IntendedPickupLocationService`, `PickupLocationsSearchService`, `PickupOptionService`; `facadeProviders` | `pickup-in-store/core/facade/intended-pickup-location.service.ts:L22-L70`, `pickup-locations-search.service.ts:L28-L133`, `pickup-option.service.ts:L23-L54`, `facade-providers.ts:L19-L37` |
| `StockConnector` / `StockAdapter` / `OccStockAdapter` | `pickup-in-store/core/connectors/stock.connector.ts:L17-L43`, `stock.adapter.ts:L14-L34`, `pickup-in-store/occ/adapters/occ-stock.adapter.ts:L25-L69` |
| `PickupLocationConnector` / `PickupLocationAdapter` / `OccPickupLocationAdapter` | `pickup-in-store/core/connectors/pickup-location.connector.ts:L16-L28`, `pickup-location.adapter.ts:L13-L19`, `pickup-in-store/occ/adapters/occ-pickup-location.adapter.ts:L20-L44` |
| Endpoint: `defaultOccStockConfig`, `defaultOccPickupLocationConfig` | `pickup-in-store/occ/adapters/default-occ-stock-config.ts:L12-L21`, `default-occ-pickup-location-config.ts:L12-L20` |
| `defaultPickupInStoreConfig` | `pickup-in-store/core/config/default-pickup-in-store-config.ts:L9-L13` |

**CMS**:
- lista lazy: CheckoutReviewPickup, MyPreferredStoreComponent, OrderConfirmationPickUpComponent, PickupInStoreDeliveryModeComponent (`pickup-in-store/root/pickup-in-store-root.module.ts:L27-L32`).
- mapping: `pickup-in-store/components/container/pickup-items-details/pickup-items-details.module.ts:L34-L56`, `.../my-preferred-store/my-preferred-store.module.ts:L21-L25`.
- outlet:
  - `CartOutlets.ITEM_DELIVERY_DETAILS`: `.../cart-pickup-options-container/cart-pickup-options-container.module.ts:L23-L24`
  - `CartOutlets.ADD_TO_CART_PICKUP_OPTION`: `.../pdp-pickup-options-container/pdp-pickup-options-container.module.ts:L23-L24`
  - `CartOutlets.PICKUP_INFO`: `.../pickup-info-container/pickup-info-container.module.ts:L19-L20`
  - `OrderOutlets.ORDER_CONSIGNMENT`: `.../pickup-in-store-order-consignment/pickup-in-store-order-consignment-container.module.ts:L22-L23`
  - `StoreFinderOutlets.PREFERRED_STORE`: `.../set-preferred-store/set-preferred-store.module.ts:L28-L29`

---

## 6. `@spartacus/storefinder` (123 file)

**peerDependencies**: `feature-libs/storefinder/package.json:L28-L41`. Contiene @angular/*, @ngrx/effects, @ngrx/store, @spartacus/core, schematics, storefront, styles, rxjs.

**Entry point**: `.`, `root`, `core`, `occ`, `components`, `assets`.

**Schematics**: la factory è `addStorefinderFeatures` (`storefinder/schematics/add-storefinder/index.ts:L25-L45`).

| cartella | tema | note |
|---|---|---|
| `components/` (30) | 13 sottocartelle: store-finder, grid, header, list-item, map, pagination-details, search, search-result (5), store, store-description, stores-count, schedule, abstract-store-item | |
| `core/store/` (18) | NgRx per ricerca negozi | |
| `core/service/` (3) | `GoogleMapRendererService`, `StoreLocationService` | |
| `core/facade/`, `core/connectors/`, `core/config/`, `core/model/` | facade, connector, config | |
| `occ/` (7) | adapter OCC | |
| `root/` (11) | config (layout, routing), facade, model | |
| `styles/` (15) | components 12, layout 2 | |

| simbolo | file:righe |
|---|---|
| `StoreFinderRootModule` / `defaultStoreFinderComponentsConfig` | `storefinder/root/store-finder-root.module.ts:L30-L38`, `:L18-L28` |
| `defaultStoreFinderRoutingConfig` / `defaultStoreFinderLayoutConfig` | `storefinder/root/config/default-store-finder-routing-config.ts:L9-L35`, `default-store-finder-layout-config.ts:L9-L15` |
| `StoreFinderModule` / `StoreFinderCoreModule` / `StoreFinderStoreModule` / `StoreFinderOccModule` / `StoreFinderComponentsModule` | `storefinder/store-finder.module.ts:L12-L19`, `core/store-finder-core.module.ts:L14-L22`, `core/store/store-finder-store.module.ts:L17-L27`, `occ/store-finder-occ.module.ts:L14-L20`, `components/store-finder-components.module.ts:L38-L117` |
| `StoreFinderFacade` / `StoreFinderService` | `storefinder/root/facade/store-finder.facade.ts:L43-L73`, `storefinder/core/facade/store-finder.service.ts:L26-L260` |
| `StoreFinderConnector` / `StoreFinderAdapter` / `OccStoreFinderAdapter` | `storefinder/core/connectors/store-finder.connector.ts:L14-L33`, `store-finder.adapter.ts:L11-L22`, `storefinder/occ/adapters/occ-store-finder.adapter.ts:L29-L104` |
| `defaultOccStoreFinderConfig` (endpoint) / `defaultStoreFinderConfig` | `storefinder/occ/adapters/default-occ-store-finder-config.ts:L9-L20`, `storefinder/core/config/default-store-finder-config.ts:L9-L21` |

**CMS**: StoreFinderComponent, con lista lazy in `storefinder/root/store-finder-root.module.ts:L22-L22`. Il mapping, con `childRoutes`, è in `storefinder/components/store-finder-components.module.ts:L68-L98`.

---

## 7. `@spartacus/customer-ticketing` (114 file)

**peerDependencies**: `feature-libs/customer-ticketing/package.json:L28-L41`. Contiene @angular/*, @ng-select/ng-select, @spartacus/cart, core, schematics, storefront, styles, rxjs.

**Entry point**: `.`, `root`, `core`, `occ`, `components`, `assets`.

**Schematics**: la factory è `addCustomerTicketingFeatures` (`customer-ticketing/schematics/add-customer-ticketing/index.ts:L25-L45`).

| cartella | tema | note |
|---|---|---|
| `components/details/` (24) | close, details, messages, reopen | |
| `components/list/` (11) | create, list | |
| `components/my-account-v2/` (4) | vista richieste per My Account v2 | |
| `components/shared/` (4) | dialog con form layout | |
| `core/` (13) | connectors, facade, http-interceptors, services, utils | |
| `occ/` (7) | adapter, config, model | |
| `root/` (17) | config (4), events (4), facade, model | |

| simbolo | file:righe |
|---|---|
| `CustomerTicketingRootModule` / `defaultCustomerTicketingComponentsConfig` | `customer-ticketing/root/customer-ticketing-root.module.ts:L44-L74`, `:L24-L43` |
| `CustomerTicketingEventModule` | `customer-ticketing/root/events/customer-ticketing-event.module.ts:L10-L15` |
| `defaultCustomerTicketingConfig` / `defaultCustomerTicketingRoutingConfig` | `customer-ticketing/root/config/default-customer-ticketing-config.ts:L15-L37`, `default-customer-ticketing-routing-config.ts:L9-L21` |
| `CustomerTicketingModule` / `CustomerTicketingCoreModule` / `CustomerTicketingOccModule` / `CustomerTicketingComponentsModule` | `customer-ticketing/customer-ticketing.module.ts:L12-L19`, `core/customer-ticketing-core.module.ts:L14-L31`, `occ/customer-ticketing-occ.module.ts:L14-L24`, `components/customer-ticketing-components.module.ts:L20-L34` |
| `CustomerTicketingFacade` / `CustomerTicketingService` | `customer-ticketing/root/facade/customer-ticketing.facade.ts:L41-L85`, `customer-ticketing/core/facade/customer-ticketing.service.ts:L55-L373` |
| `CustomerTicketingConnector` / `CustomerTicketingAdapter` / `OccCustomerTicketingAdapter` | `customer-ticketing/core/connectors/customer-ticketing.connector.ts:L20-L86`, `customer-ticketing.adapter.ts:L17-L60`, `customer-ticketing/occ/adapters/occ-customer-ticketing.adapter.ts:L39-L284` |
| `defaultOccCustomerTicketingConfig` (endpoint) | `customer-ticketing/occ/config/default-occ-customer-ticketing-config.ts:L9-L27` |

**CMS**:
- lista lazy: SupportTicketHistoryComponent, SupportTicketUpdateComponent, SupportTicketDetailsComponent, SupportTicketReopenComponent, SupportTicketCloseComponent, MyAccountViewRequestsComponent (`customer-ticketing/root/customer-ticketing-root.module.ts:L28-L35`).
- mapping: es. `customer-ticketing/components/list/customer-ticketing-list/customer-ticketing-list.module.ts:L41-L46`, `customer-ticketing/components/my-account-v2/my-account-v2-customer-ticketing.module.ts:L24-L29`.

---

## 8. `@spartacus/subscription-billing` (99 file)

**peerDependencies**: `feature-libs/subscription-billing/package.json:L29-L42`. Contiene @angular/*, @ng-select/ng-select, @spartacus/cart, core, schematics, storefront, styles, rxjs.

**Entry point**: `.`, `root`, `core`, `occ`, `components`, `assets`.

**Schematics**: la factory è `addSubscriptionBillingFeature` (`subscription-billing/schematics/add-subscription-billing/index.ts:L25-L45`).

| cartella | tema | note |
|---|---|---|
| `components/` (28) | list (abbonamenti e bollette, date-range modal), details, billing-details, actions-modal, product (price, usage charge) | |
| `core/connector/` (7) | 3 coppie Adapter/Connector: subscription, subscription-billing, subscription-actions | il nome della cartella è al singolare (`connector`) |
| `core/facade/` (5), `core/services/` (3) | implementazioni delle facade | |
| `occ/` (9) | 3 adapter OCC più config | |
| `root/` (25) | components (5, usati fuori dal CMS), config, events, facade (3), model, services | |
| `assets/` (3) | translations | solo 3 file, contro i 19 delle altre lib |
| `styles/` (11) | billing-details, cart, details, list, modal, product | |

| simbolo | file:righe |
|---|---|
| `SubscriptionBillingRootModule` / `defaultSubscriptionBillingComponentsConfig` | `subscription-billing/root/subscription-billing-root.module.ts:L42-L59`, `:L24-L40` |
| `SubscriptionBillingEventModule` / `defaultSubscriptionBillingRoutingConfig` | `subscription-billing/root/events/subscription-billing-event.module.ts:L10-L17`, `root/config/default-subscription-billing-routing-config.ts:L9-L28` |
| `SubscriptionBillingModule` / `...CoreModule` / `...OccModule` / `...ComponentsModule` | `subscription-billing/subscription-billing.module.ts:L11-L18`, `core/subscription-billing-core.module.ts:L15-L24`, `occ/subscription-billing-occ.module.ts:L21-L38`, `components/subscription-billing-components.module.ts:L17-L28` |
| Facade: `SubscriptionFacade`, `SubscriptionBillingFacade`, `SubscriptionActionsFacade` | `subscription-billing/root/facade/subscription.facade.ts:L28-L50`, `subscription-billing.facade.ts:L29-L53`, `subscription-actions.facade.ts:L33-L56` |
| Implementazioni: `SubscriptionService`, `SubscriptionBillingService`, `SubscriptionActionsService`; `facadeProviders` | `subscription-billing/core/facade/subscription.service.ts:L26-L147`, `subscription-billing.service.ts:L34-L166`, `subscription-actions.service.ts:L24-L160`, `facade-provider.ts:L20-L46` |
| Connector | `subscription-billing/core/connector/subscription.connector.ts:L16-L37`, `subscription-billing.connector.ts:L17-L42`, `subscription-actions.connector.ts:L19-L83` |
| Adapter OCC | `subscription-billing/occ/adapters/occ-subscription.adapter.ts:L22-L65`, `occ-subscription-billing.adapter.ts:L23-L71`, `occ-subscription-actions.adapter.ts:L24-L155` |
| `defaultOccSubscriptionBillingConfig` (endpoint) | `subscription-billing/occ/config/default-occ-subscription-billing-config.ts:L31-L43` |

**CMS**:
- lista lazy: SubscriptionHistoryComponent, SubscriptionProductPriceComponent, SubscriptionDetailsComponent, SubscriptionBillsHistoryComponent, SubscriptionBillDetailsComponent (`subscription-billing/root/subscription-billing-root.module.ts:L28-L34`).
- mapping: es. `subscription-billing/components/list/subscription-list.module.ts:L33-L38`.
- outlet: `CartOutlets.SUBSCRIPTION_PRICE_HEADING`, `CartOutlets.SUBSCRIPTION_PRICE_BODY` e altri, a partire da `subscription-billing/root/subscription-billing-root.module.ts:L47-L53`.

---

## 9. `@spartacus/requested-delivery-date` (57 file)

**peerDependencies**: `feature-libs/requested-delivery-date/package.json:L28-L41`. Contiene @angular/common, core, forms, @spartacus/cart, checkout, core, order, schematics, storefront, styles, rxjs.

**Entry point**: `.`, `root`, `core`, `occ`, `assets`. Non esiste un entry point `components`: i componenti stanno in `root/components` e sono esportati da `root/public_api.ts`, che lo commenta così: "Make components available without being CMS driven".

**Schematics**: la factory è `addRequestedDeliveryDateFeature` (`requested-delivery-date/schematics/add-requested-delivery-date/index.ts:L25-L45`).

| cartella | tema | note |
|---|---|---|
| `root/components/` (7) | `DeliveryModeDatePickerComponent`, `OrderOverviewDeliveryDateComponent`, `DateValidationService` | `requested-delivery-date/root/components/delivery-mode-date-picker/delivery-mode-date-picker.component.ts:L38-L181`, `.../order-overview-delivery-date/order-overview-delivery-date.component.ts:L16-L66` |
| `core/` (9) | connectors, services, http-interceptors (bad request) | |
| `occ/` (7) | adapter, config, model | |

| simbolo | file:righe |
|---|---|
| `RequestedDeliveryDateRootModule` / `defaultRequestedDeliveryDateComponentsConfig` | `requested-delivery-date/root/requested-delivery-date-root.module.ts:L35-L50`, `:L18-L33` |
| `RequestedDeliveryDateComponentsModule` | `requested-delivery-date/root/components/requested-delivery-date-components.module.ts:L15-L30` |
| `RequestedDeliveryDateModule` / `...CoreModule` / `...OccModule` | `requested-delivery-date/requested-delivery-date.module.ts:L11-L14`, `core/requested-delivery-date-core.module.ts:L14-L30`, `occ/requested-delivery-date-occ.module.ts:L14-L24` |
| `RequestedDeliveryDateFacade` / `RequestedDeliveryDateService` | `requested-delivery-date/root/facade/requested-delivery-date.facade.ts:L24-L33`, `requested-delivery-date/core/services/requested-delivery-date.service.ts:L12-L34` |
| `RequestedDeliveryDateConnector` / `...Adapter` / `OccRequestedDeliveryDateAdapter` | `requested-delivery-date/core/connectors/requested-delivery-date.connector.ts:L14-L24`, `requested-delivery-date.adapter.ts:L9-L18`, `requested-delivery-date/occ/adapters/occ-requested-delivery-date.adapter.ts:L17-L45` |
| `defaultOccRequestedDeliveryDateConfig` | `requested-delivery-date/occ/config/default-occ-requested-delivery-date-config.ts:L9-L18` |
| `RequestedDeliveryDateBadRequestHandler` | `requested-delivery-date/core/http-interceptors/bad-request/requested-delivery-date-badrequest.handler.ts:L17-L49` |

**CMS e outlet**:
- lista lazy: DeliveryModeDatePickerComponent, OrderOverviewDeliveryDateComponent (`requested-delivery-date/root/requested-delivery-date-root.module.ts:L22-L25`).
- outlet `CartOutlets.DELIVERY_MODE` e `CartOutlets.ORDER_OVERVIEW` (`:L37-L43`).
- In questa lib non è stato trovato un mapping `cmsComponents: {}`.

---

## 10. `@spartacus/estimated-delivery-date` (38 file)

**peerDependencies**: `feature-libs/estimated-delivery-date/package.json:L28-L39`. Contiene @angular/common, core, @spartacus/cart, core, order, schematics, storefront, styles, rxjs.

**Entry point**: `.` (riesporta `show-estimated-delivery-date/public_api`), `root`, `show-estimated-delivery-date`, `assets`.

**Schematics**: la factory è `addEstimatedDeliveryDateFeature` (`estimated-delivery-date/schematics/add-estimated-delivery-date/index.ts:L25-L45`).

| cartella | tema | note |
|---|---|---|
| `show-estimated-delivery-date/` (5) | componente data stimata e config OCC del carrello | |
| `root/` (6) | root module (vuoto), model, feature-name | |
| `assets/` (19) | translations | |

| simbolo | file:righe |
|---|---|
| `EstimatedDeliveryDateRootModule` (`@NgModule({})` vuoto) | `estimated-delivery-date/root/estimated-delivery-date-root.module.ts:L9-L10` |
| `EstimatedDeliveryDateModule` | `estimated-delivery-date/estimated-delivery-date.module.ts:L10-L13` |
| `ShowEstimatedDeliveryDateModule` (registra l'outlet `CartOutlets.ITEM_DETAILS`) | `estimated-delivery-date/show-estimated-delivery-date/show-estimated-delivery-date.module.ts:L19-L37` (outlet a L30-L31) |
| `EstimatedDeliveryDateComponent` | `estimated-delivery-date/show-estimated-delivery-date/components/estimated-delivery-date.component.ts:L19-L74` |
| `defaultOccCartWithEddConfig` (override dell'endpoint carrello) | `estimated-delivery-date/show-estimated-delivery-date/config/default-occ-cart-with-edd.config.ts:L18-L28` |

Questa lib non ha né connector né adapter né facade. Non usa CMS e si aggancia solo tramite outlet e config OCC.

---

## Riepilogo conteggi

| lib | totale | entry point (ng-package.json) | facade astratte in root |
|---|---|---|---|
| organization | 825 | 28 | AccountSummaryFacade, UnitOrderFacade, UserRegistrationFacade (administration e order-approval espongono servizi da core) |
| product-configurator | 557 | 8 | nessuna: si usano servizi `Configurator*Service` in core |
| pickup-in-store | 183 | 6 | 4 |
| quote | 151 | 8 | 1 |
| storefinder | 123 | 6 | 1 |
| customer-ticketing | 114 | 6 | 1 |
| subscription-billing | 99 | 6 | 3 |
| product-multi-dimensional | 58 | 9 | nessuna |
| requested-delivery-date | 57 | 5 | 1 |
| estimated-delivery-date | 38 | 4 | nessuna |
