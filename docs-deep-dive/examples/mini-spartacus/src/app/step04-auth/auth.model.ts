/**
 * STEP 04 - Modelli e configurazione dell'autenticazione
 * Ispirato a:
 *  - core-libs/core/src/auth/user-auth/models/auth-token.model.ts (AuthToken)
 *  - core-libs/core/src/auth/user-auth/config/auth-config.ts       (AuthConfig)
 *  - core-libs/core/src/auth/user-auth/config/default-auth-config.ts (client_id 'mobile_android', tokenEndpoint '/oauth/token')
 *  - core-libs/core/src/auth/user-auth/facade/user-id.service.ts   (OCC_USER_ID_CURRENT / ANONYMOUS)
 */
export const OCC_USER_ID_CURRENT = 'current';
export const OCC_USER_ID_ANONYMOUS = 'anonymous';

/** Token salvato lato client. */
export interface AuthToken {
  access_token: string;
  refresh_token?: string;
  /** Istante di scadenza in millisecondi (Date.now() + expires_in * 1000). */
  expires_at?: number;
  token_type?: string;
  granted_scopes?: string[];
}

/** Risposta dell'Authorization Server di SAP Commerce (RFC 6749). */
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
}

export interface AuthConfig {
  authentication?: {
    client_id?: string;
    client_secret?: string;
    /** Base dell'Authorization Server. Default: backend.occ.baseUrl + '/authorizationserver'. */
    baseUrl?: string;
    tokenEndpoint?: string;
  };
}

declare module '../step01-config/config' {
  interface Config extends AuthConfig {}
}

export const defaultAuthConfig: AuthConfig = {
  authentication: {
    client_id: 'mobile_android',
    client_secret: 'secret',
    tokenEndpoint: '/oauth/token',
  },
};

/** Utente OCC (sottoinsieme di Occ.User in core-libs/core/src/occ/occ-models/occ.models.ts). */
export interface User {
  uid?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  displayUid?: string;
}
