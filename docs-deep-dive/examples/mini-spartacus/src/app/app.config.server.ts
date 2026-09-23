/**
 * Configurazione aggiuntiva per il server (SSR).
 * Ispirato a: projects/storefrontapp/src/app/app.config.server.ts (mergeApplicationConfig + provideServerRendering)
 */
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
