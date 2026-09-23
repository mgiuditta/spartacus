/**
 * STEP 05 - Normalizer del prodotto (token PRODUCT_NORMALIZER multi)
 * Ispirato a:
 *  - core-libs/core/src/product/connectors/product/converters.ts (PRODUCT_NORMALIZER)
 *  - core-libs/core/src/occ/adapters/product/converters/product-image-normalizer.ts (ProductImageNormalizer)
 *  - core-libs/core/src/occ/adapters/product/converters/product-name-normalizer.ts  (ProductNameNormalizer)
 *  - core-libs/core/src/occ/adapters/product/product-occ.module.ts (registrazione multi dei normalizer)
 */
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Config } from '../step01-config/config';
import { Converter } from './converter.service';
import { Images, OccImage, OccProduct, Product } from './product.model';

/** Copia superficiale senza le immagini OCC (che hanno un formato diverso da Product.images). */
function copyWithoutImages(source: OccProduct): Product {
  const { images: _occImages, ...rest } = source;
  return { ...rest };
}

export const PRODUCT_NORMALIZER = new InjectionToken<Converter<OccProduct, Product>[]>('ProductNormalizer');

/** Da lista piatta di immagini a mappa per tipo/formato; URL resi assoluti. */
@Injectable({ providedIn: 'root' })
export class ProductImageNormalizer implements Converter<OccProduct, Product> {
  private readonly config = inject(Config);

  convert(source: OccProduct, target?: Product): Product {
    const result: Product = target ?? copyWithoutImages(source);
    if (source.images) {
      result.images = this.normalize(source.images);
    }
    return result;
  }

  normalize(source: OccImage[]): Images {
    const images: Images = {};
    for (const image of source) {
      if (!image.imageType || !image.format) {
        continue;
      }
      const normalized = { ...image, url: this.normalizeImageUrl(image.url ?? '') };
      if (image.imageType === 'GALLERY') {
        const gallery = (images.GALLERY ??= []);
        const index = image.galleryIndex ?? 0;
        gallery[index] = { ...(gallery[index] ?? {}), [image.format]: normalized };
      } else {
        images.PRIMARY = { ...(images.PRIMARY ?? {}), [image.format]: normalized };
      }
    }
    return images;
  }

  private normalizeImageUrl(url: string): string {
    if (/^(https?:)?\/\//.test(url)) {
      return url;
    }
    const base = this.config.backend?.media?.baseUrl ?? this.config.backend?.occ?.baseUrl ?? '';
    return base + url;
  }
}

/** Toglie l'HTML dal nome e calcola lo slug per l'URL del prodotto. */
@Injectable({ providedIn: 'root' })
export class ProductNameNormalizer implements Converter<OccProduct, Product> {
  convert(source: OccProduct, target?: Product): Product {
    const result: Product = target ?? copyWithoutImages(source);
    if (source.name) {
      result.nameHtml = source.name;
      result.name = source.name.replace(/<[^>]*>/g, '');
      result.slug = result.name
        .toLowerCase()
        .replace(/[ !*'();:@&=+$,/?%#[\]]/g, '-')
        .replace(/-+/g, '-');
    }
    return result;
  }
}
