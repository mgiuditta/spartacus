/**
 * STEP 03 - OccEndpointsService: da "nome endpoint" a URL completo
 * Ispirato a: core-libs/core/src/occ/services/occ-endpoints.service.ts
 *   (OccEndpointsService.buildUrl, getBaseUrl, getRawEndpointValue, getEndpointForScope)
 *
 * buildUrl('product', { urlParams: { productCode: '300938' }, scope: 'list' })
 *   -> http://localhost:9002/occ/v2/electronics-spa/products/300938?fields=code,name,...
 */
import { HttpParams } from '@angular/common/http';
import { inject, Injectable, isDevMode } from '@angular/core';
import { Config } from '../step01-config/config';
import { BASE_SITE_CONTEXT_ID } from '../step02-site-context/site-context.config';
import { SiteContextService } from '../step02-site-context/site-context.service';
import { DEFAULT_SCOPE } from './occ-config';
import { resolveTemplate, urlPathJoin } from './url-utils';

export interface DynamicAttributes {
  /** Valori per i segnaposto ${...} nel path. */
  urlParams?: Record<string, unknown>;
  /** Parametri di query aggiuntivi (undefined = ignorato, null = rimosso). */
  queryParams?: Record<string, string | number | boolean | null | undefined>;
  /** Variante dell'endpoint (es. 'list' vs 'default'): cambia i "fields" richiesti. */
  scope?: string;
}

export interface BaseOccUrlProperties {
  baseUrl?: boolean;
  prefix?: boolean;
  baseSite?: boolean;
}

@Injectable({ providedIn: 'root' })
export class OccEndpointsService {
  private readonly config = inject(Config);
  private readonly siteContext = inject(SiteContextService);

  /** http://host + /occ/v2/ + baseSite attivo. Ogni pezzo si puo' omettere. */
  getBaseUrl(props: BaseOccUrlProperties = { baseUrl: true, prefix: true, baseSite: true }): string {
    const occ = this.config.backend?.occ;
    const baseUrl = props.baseUrl === false ? '' : (occ?.baseUrl ?? '');
    const prefix = props.prefix === false ? '' : (occ?.prefix ?? '');
    const baseSite = props.baseSite === false ? '' : this.siteContext.getActiveValue(BASE_SITE_CONTEXT_ID);
    return urlPathJoin(baseUrl, prefix, baseSite);
  }

  /** Il template grezzo configurato, per lo scope richiesto. */
  getRawEndpointValue(endpoint: string, scope?: string): string {
    const value = this.config.backend?.occ?.endpoints?.[endpoint];
    if (typeof value === 'string') {
      return value;
    }
    if (scope && value?.[scope]) {
      return value[scope];
    }
    if (scope && isDevMode()) {
      console.warn(`${endpoint} endpoint configuration missing for scope "${scope}"`);
    }
    // fallback: scope di default, altrimenti il nome stesso dell'endpoint
    return value?.[DEFAULT_SCOPE] ?? endpoint;
  }

  buildUrl(endpoint: string, attributes: DynamicAttributes = {}, omit?: BaseOccUrlProperties): string {
    let url = this.getRawEndpointValue(endpoint, attributes.scope);

    if (attributes.urlParams) {
      url = resolveTemplate(url, attributes.urlParams, true);
    }

    if (attributes.queryParams) {
      // I parametri gia' presenti nel template (es. fields=...) vengono conservati.
      const [path, existingQuery] = url.split('?');
      let params = new HttpParams({ fromString: existingQuery ?? '' });
      for (const [key, value] of Object.entries(attributes.queryParams)) {
        if (value === null) {
          params = params.delete(key);
        } else if (value !== undefined) {
          params = params.set(key, String(value));
        }
      }
      const query = params.toString();
      url = query ? `${path}?${query}` : path;
    }

    return urlPathJoin(this.getBaseUrl(omit), url);
  }
}
