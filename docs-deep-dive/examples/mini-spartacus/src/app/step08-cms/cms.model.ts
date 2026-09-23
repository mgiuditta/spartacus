/**
 * STEP 08 - Modelli CMS
 * Ispirato a:
 *  - core-libs/core/src/model/cms.model.ts               (PageType, CmsComponent, ContentSlotComponentData)
 *  - core-libs/core/src/cms/model/page.model.ts          (Page, ContentSlotData, CmsStructureModel)
 *  - core-libs/core/src/routing/models/page-context.model.ts (PageContext, HOME_PAGE_CONTEXT)
 *  - core-libs/core/src/occ/occ-models/occ.models.ts     (Occ.CMSPage, Occ.ContentSlot, Occ.Component)
 */

export enum PageType {
  CONTENT_PAGE = 'ContentPage',
  PRODUCT_PAGE = 'ProductPage',
  CATEGORY_PAGE = 'CategoryPage',
  CATALOG_PAGE = 'CatalogPage',
}

/** "Quale pagina CMS mi serve?": id + tipo. */
export interface PageContext {
  id: string;
  type?: PageType;
}

export const HOME_PAGE_CONTEXT = '__HOMEPAGE__';
export const NOT_FOUND_CONTEXT: PageContext = { id: 'notFound', type: PageType.CONTENT_PAGE };

/** Dati di un componente CMS. Le proprieta' dipendono dal tipo (content, media, productCodes...). */
export interface CmsComponent {
  uid?: string;
  typeCode?: string;
  name?: string;
  flexType?: string;
  [property: string]: unknown;
}

/** Riferimento a un componente dentro uno slot. */
export interface ContentSlotComponentData {
  uid: string;
  typeCode: string;
  /** Per i CMSFlexComponent il "vero" tipo e' flexType; per gli altri coincide con typeCode. */
  flexType: string;
}

export interface ContentSlotData {
  components: ContentSlotComponentData[];
}

export interface Page {
  pageId: string;
  type: PageType;
  template: string;
  title: string;
  label?: string;
  /** position -> slot */
  slots: { [position: string]: ContentSlotData };
}

/** Risultato normalizzato del caricamento: la pagina + i dati dei componenti trovati. */
export interface CmsStructureModel {
  page: Page;
  components: CmsComponent[];
}

// ---- Formato OCC -----------------------------------------------------------------
export interface OccCmsComponent extends CmsComponent {
  uid: string;
  typeCode: string;
}

export interface OccContentSlot {
  slotId?: string;
  position?: string;
  components?: { component?: OccCmsComponent[] };
}

export interface OccCmsPage {
  uid?: string;
  typeCode?: string;
  template?: string;
  title?: string;
  name?: string;
  label?: string;
  contentSlots?: { contentSlot?: OccContentSlot[] };
}

export interface OccCmsComponentList {
  component?: OccCmsComponent[];
}
