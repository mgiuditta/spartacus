/**
 * STEP 05 - Modelli: OCC (backend) vs App (frontend)
 * Ispirato a:
 *  - core-libs/core/src/occ/occ-models/occ.models.ts (Occ.Product, Occ.Image, Occ.Price, Occ.Stock)
 *  - core-libs/core/src/model/product.model.ts       (Product: images normalizzate, nameHtml, slug)
 *  - core-libs/core/src/model/image.model.ts         (Images, ImageGroup)
 */

// ---- Formato OCC (quello che arriva dal backend) -------------------------------
export interface OccPrice {
  currencyIso?: string;
  value?: number;
  formattedValue?: string;
}

export interface OccImage {
  imageType?: 'PRIMARY' | 'GALLERY';
  format?: string;
  url?: string;
  altText?: string;
  galleryIndex?: number;
}

export interface OccProduct {
  code?: string;
  name?: string;
  summary?: string;
  description?: string;
  url?: string;
  price?: OccPrice;
  images?: OccImage[];
  purchasable?: boolean;
  stock?: { stockLevel?: number; stockLevelStatus?: string };
}

export interface OccProductSearchPage {
  products?: OccProduct[];
  freeTextSearch?: string;
  pagination?: { currentPage?: number; pageSize?: number; totalPages?: number; totalResults?: number };
}

// ---- Formato APP (quello che usano componenti e store) -------------------------
export interface Image {
  url?: string;
  altText?: string;
  format?: string;
}

/** Immagini raggruppate per formato: images.PRIMARY.product.url */
export interface ImageGroup {
  [format: string]: Image;
}

export interface Images {
  PRIMARY?: ImageGroup;
  GALLERY?: ImageGroup[];
}

export interface Product extends Omit<OccProduct, 'images'> {
  images?: Images;
  /** Nome originale con eventuale HTML (es. <em> nei risultati di ricerca). */
  nameHtml?: string;
  /** Nome "url friendly" per le rotte: 'PowerShot A480' -> 'powershot-a480'. */
  slug?: string;
}

export interface ProductSearchPage {
  products: Product[];
  freeTextSearch?: string;
  totalResults: number;
}
