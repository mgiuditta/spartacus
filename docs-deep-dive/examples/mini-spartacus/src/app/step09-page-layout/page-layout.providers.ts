/**
 * STEP 09 - Layout di default + mapping dei componenti CMS "eager"
 * Ispirato a:
 *  - core-libs/storefront/cms-components/content/paragraph/paragraph.module.ts
 *    (ogni modulo di componente fa provideDefaultConfig({ cmsComponents: { CMSParagraphComponent: {...} } }))
 *  - core-libs/storefront/recipes/config/layout-config.ts (layoutSlots di default)
 *
 * La mappa usa il flexType: per i CMSFlexComponent e' il campo flexType, per gli altri il typeCode.
 */
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideDefaultConfig } from '../step01-config/config';
import { LoginFormComponent } from '../step04-auth/login-form.component';
import { LoginStatusComponent } from '../step04-auth/login-status.component';
import { BannerComponent, ParagraphComponent } from './components/content.components';
import {
  ProductCarouselComponent,
  ProductImagesComponent,
  ProductIntroComponent,
  ProductSummaryComponent,
} from './components/product.components';
import { SearchBoxComponent, SearchResultsComponent } from './components/search.components';
import { SiteContextSelectorComponent } from './components/site-context-selector.component';
import { defaultLayoutConfig } from './layout-config';

export function providePageLayout(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideDefaultConfig(defaultLayoutConfig),
    provideDefaultConfig({
      cmsComponents: {
        CMSParagraphComponent: { component: ParagraphComponent },
        SimpleBannerComponent: { component: BannerComponent },
        ProductCarouselComponent: { component: ProductCarouselComponent },
        ProductIntroComponent: { component: ProductIntroComponent },
        ProductImagesComponent: { component: ProductImagesComponent },
        ProductSummaryComponent: { component: ProductSummaryComponent },
        SearchBoxComponent: { component: SearchBoxComponent },
        SearchResultsListComponent: { component: SearchResultsComponent },
        CMSSiteContextComponent: { component: SiteContextSelectorComponent },
        ReturningCustomerLoginComponent: { component: LoginFormComponent },
        LoginComponent: { component: LoginStatusComponent },
      },
    }),
  ]);
}
