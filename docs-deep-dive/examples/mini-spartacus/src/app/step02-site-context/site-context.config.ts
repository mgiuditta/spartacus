/**
 * STEP 02 - Configurazione del Site Context
 * Ispirato a:
 *  - core-libs/core/src/site-context/config/site-context-config.ts (SiteContextConfig + declare module)
 *  - core-libs/core/src/site-context/providers/context-ids.ts      (BASE_SITE_CONTEXT_ID, ...)
 *  - core-libs/core/src/site-context/config/context-config-utils.ts (getContextParameterDefault)
 */
import { Config } from '../step01-config/config';

export const BASE_SITE_CONTEXT_ID = 'baseSite';
export const LANGUAGE_CONTEXT_ID = 'language';
export const CURRENCY_CONTEXT_ID = 'currency';

export interface SiteContextConfig {
  context?: {
    /** Quali parametri finiscono nel prefisso dell'URL e in che ordine: /electronics-spa/en/USD/... */
    urlParameters?: string[];
    /** Valori ammessi per ogni parametro. Il PRIMO e' il default. */
    [contextName: string]: string[] | undefined;
  };
}

// Declaration merging: da ora Config "conosce" anche la sezione context.
declare module '../step01-config/config' {
  interface Config extends SiteContextConfig {}
}

export const defaultSiteContextConfig: SiteContextConfig = {
  context: {
    urlParameters: [BASE_SITE_CONTEXT_ID, LANGUAGE_CONTEXT_ID, CURRENCY_CONTEXT_ID],
  },
};

/** Primo valore configurato = valore di default (come getContextParameterDefault). */
export function getContextParameterDefault(config: Config, param: string): string | undefined {
  return config.context?.[param]?.[0];
}
