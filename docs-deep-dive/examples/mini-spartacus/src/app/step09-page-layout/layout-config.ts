/**
 * STEP 09 - Configurazione di layout e mapping dei componenti CMS
 * Ispirato a:
 *  - core-libs/storefront/layout/config/layout-config.ts (LayoutConfig.layoutSlots, LayoutSlotConfig)
 *  - core-libs/storefront/recipes/config/layout-config.ts (layout di default: header, footer, LandingPage2Template...)
 *  - core-libs/core/src/cms/config/cms-config.ts          (CmsConfig.cmsComponents, CmsComponentMapping)
 */
import { Provider, Type } from '@angular/core';

export interface LayoutSlotConfig {
  slots?: string[];
}

export interface CmsComponentMapping {
  /** Componente Angular da istanziare per questo typeCode/flexType. */
  component?: Type<unknown>;
  /** Provider extra dati solo a questa istanza (nell'injector creato dal wrapper). */
  providers?: Provider[];
}

export interface CmsComponentsMapping {
  [typeCode: string]: CmsComponentMapping | undefined;
}

export interface LayoutConfig {
  /** Nome template (o sezione) -> elenco ordinato degli slot da mostrare. */
  layoutSlots?: { [templateOrSection: string]: LayoutSlotConfig | undefined };
  cmsComponents?: CmsComponentsMapping;
}

declare module '../step01-config/config' {
  interface Config extends LayoutConfig {}
}

export const defaultLayoutConfig: LayoutConfig = {
  layoutSlots: {
    header: { slots: ['SiteContext', 'SiteLogo', 'SearchBox', 'SiteLogin', 'MiniCart'] },
    footer: { slots: ['Footer'] },
    LandingPage2Template: { slots: ['Section1', 'Section2A', 'Section3'] },
    ProductDetailsPageTemplate: { slots: ['Summary'] },
    CartPageTemplate: { slots: ['TopContent'] },
    LoginPageTemplate: { slots: ['LeftContentSlot'] },
    SearchResultsListPageTemplate: { slots: ['SearchResultsListSlot'] },
    ContentPage1Template: { slots: ['Section2A'] },
  },
};
