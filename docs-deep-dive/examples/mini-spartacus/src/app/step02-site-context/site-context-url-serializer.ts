/**
 * STEP 02 - URL con prefisso di contesto: /electronics-spa/en/USD/product/123
 * Ispirato a: core-libs/core/src/site-context/services/site-context-url-serializer.ts (SiteContextUrlSerializer)
 *
 * Il Router di Angular usa un UrlSerializer per passare da stringa a UrlTree e viceversa.
 * Noi lo estendiamo:
 *  - parse():     toglie il prefisso (/electronics-spa/en/USD) e lo salva in tree.siteContext
 *  - serialize(): rimette davanti il prefisso con i valori attivi
 * Cosi' le rotte dell'app NON devono sapere nulla del prefisso.
 */
import { inject, Injectable } from '@angular/core';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { SiteContextService } from './site-context.service';

export interface SiteContextUrlParams {
  [name: string]: string;
}

export interface UrlTreeWithSiteContext extends UrlTree {
  siteContext?: SiteContextUrlParams;
}

@Injectable({ providedIn: 'root' })
export class SiteContextUrlSerializer extends DefaultUrlSerializer {
  private readonly siteContext = inject(SiteContextService);
  /** Divide l'URL in path e parte query/fragment. */
  private readonly URL_SPLIT = /(^[^#?]*)(.*)/;

  override parse(url: string): UrlTreeWithSiteContext {
    const { url: shortUrl, params } = this.urlExtractContextParameters(url);
    const tree = super.parse(shortUrl) as UrlTreeWithSiteContext;
    tree.siteContext = params;
    return tree;
  }

  override serialize(tree: UrlTreeWithSiteContext): string {
    const params = tree.siteContext ?? {};
    const url = super.serialize(tree);
    const prefix = this.siteContext
      .getUrlEncodingParameters()
      .map((param) => params[param] ?? this.siteContext.getActiveValue(param))
      .filter((value) => !!value)
      .join('/');
    return prefix ? `/${prefix}${url === '/' ? '' : url}` : url;
  }

  /**
   * Riconosce i parametri nei primi segmenti. Un segmento e' accettato solo se
   * e' tra i valori configurati; altrimenti si passa al parametro successivo
   * (stesso algoritmo "a due indici" di Spartacus).
   */
  urlExtractContextParameters(url: string): { url: string; params: SiteContextUrlParams } {
    const [, pathPart = '', queryPart = ''] = this.URL_SPLIT.exec(url) ?? [];
    const segments = pathPart.split('/');
    if (segments[0] === '') {
      segments.shift();
    }
    const names = this.siteContext.getUrlEncodingParameters();
    const params: SiteContextUrlParams = {};
    let paramIndex = 0;
    let segmentIndex = 0;
    while (paramIndex < names.length && segmentIndex < segments.length) {
      const name = names[paramIndex];
      if (this.siteContext.getValues(name).includes(segments[segmentIndex])) {
        params[name] = segments[segmentIndex];
        segmentIndex++;
      }
      paramIndex++;
    }
    return { url: '/' + segments.slice(segmentIndex).join('/') + queryPart, params };
  }
}
